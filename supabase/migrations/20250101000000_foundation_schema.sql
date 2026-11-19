-- =============================================================================
-- TATIS — Tuition Administration & Tracking Information System
-- Milestone 1: Database Foundation Schema & Row Level Security (RLS)
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -----------------------------------------------------------------------------
-- 1. UTILITY FUNCTIONS & TRIGGERS
-- -----------------------------------------------------------------------------

-- Automatically update updated_at timestamp column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -----------------------------------------------------------------------------
-- 2. ENUMS
-- -----------------------------------------------------------------------------

CREATE TYPE org_role AS ENUM ('owner', 'admin', 'teacher', 'staff');
CREATE TYPE member_status AS ENUM ('active', 'invited', 'suspended');

-- -----------------------------------------------------------------------------
-- 3. PROFILES TABLE (Extends Supabase auth.users)
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- 4. ORGANIZATIONS TABLE (Tuition Centres / Entities)
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    address TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_organizations_owner ON public.organizations(owner_id);

CREATE TRIGGER set_organizations_updated_at
    BEFORE UPDATE ON public.organizations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- 5. ORGANIZATION MEMBERS TABLE (Multi-tenant User Memberships & RBAC)
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.organization_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role org_role NOT NULL DEFAULT 'staff',
    status member_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_org_user UNIQUE (organization_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_org_members_org ON public.organization_members(organization_id);
CREATE INDEX IF NOT EXISTS idx_org_members_user ON public.organization_members(user_id);
CREATE INDEX IF NOT EXISTS idx_org_members_role ON public.organization_members(organization_id, role);

CREATE TRIGGER set_org_members_updated_at
    BEFORE UPDATE ON public.organization_members
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- 6. APP SETTINGS TABLE (Organization-scoped configurations)
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.app_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    setting_key TEXT NOT NULL,
    setting_value JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_org_setting_key UNIQUE (organization_id, setting_key)
);

CREATE INDEX IF NOT EXISTS idx_app_settings_org_key ON public.app_settings(organization_id, setting_key);

CREATE TRIGGER set_app_settings_updated_at
    BEFORE UPDATE ON public.app_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- 7. USER PREFERENCES TABLE (Per-user UI and System Preferences)
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.user_preferences (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    theme TEXT NOT NULL DEFAULT 'system',
    language TEXT NOT NULL DEFAULT 'en',
    timezone TEXT NOT NULL DEFAULT 'UTC',
    notification_preferences JSONB NOT NULL DEFAULT '{"email": true, "sms": false, "in_app": true}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_user_preferences_updated_at
    BEFORE UPDATE ON public.user_preferences
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- 8. AUDIT LOGS TABLE (Compliance & Traceability)
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    old_data JSONB,
    new_data JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_org_created ON public.audit_logs(organization_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON public.audit_logs(entity_type, entity_id);

-- -----------------------------------------------------------------------------
-- 9. HELPER FUNCTIONS FOR ROW LEVEL SECURITY (RLS)
-- -----------------------------------------------------------------------------

-- Check if current authenticated user is an active member of organization
CREATE OR REPLACE FUNCTION public.is_org_member(target_org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM public.organization_members
        WHERE organization_id = target_org_id
          AND user_id = auth.uid()
          AND status = 'active'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Check if current authenticated user is an owner or admin of organization
CREATE OR REPLACE FUNCTION public.is_org_admin(target_org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM public.organization_members
        WHERE organization_id = target_org_id
          AND user_id = auth.uid()
          AND role IN ('owner', 'admin')
          AND status = 'active'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- -----------------------------------------------------------------------------
-- 10. ROW LEVEL SECURITY (RLS) POLICIES
-- -----------------------------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 10.1 PROFILES POLICIES
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
    ON public.profiles
    FOR SELECT
    USING (auth.uid() = id);

-- Users can view fellow organization members' profiles
CREATE POLICY "Users can view profiles of co-members"
    ON public.profiles
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.organization_members m1
            JOIN public.organization_members m2 ON m1.organization_id = m2.organization_id
            WHERE m1.user_id = auth.uid()
              AND m2.user_id = public.profiles.id
              AND m1.status = 'active'
              AND m2.status = 'active'
        )
    );

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
    ON public.profiles
    FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- 10.2 ORGANIZATIONS POLICIES
-- Members can view their organizations
CREATE POLICY "Members can view their organizations"
    ON public.organizations
    FOR SELECT
    USING (public.is_org_member(id) OR owner_id = auth.uid());

-- Authenticated users can insert an organization (which makes them owner)
CREATE POLICY "Users can create organizations"
    ON public.organizations
    FOR INSERT
    WITH CHECK (auth.uid() = owner_id);

-- Owners and admins can update their organization
CREATE POLICY "Admins can update organization"
    ON public.organizations
    FOR UPDATE
    USING (public.is_org_admin(id) OR owner_id = auth.uid())
    WITH CHECK (public.is_org_admin(id) OR owner_id = auth.uid());

-- 10.3 ORGANIZATION MEMBERS POLICIES
-- Members can view members of their organization
CREATE POLICY "Members can view member roster"
    ON public.organization_members
    FOR SELECT
    USING (public.is_org_member(organization_id));

-- Admins/owners can add or update members
CREATE POLICY "Admins can manage organization members"
    ON public.organization_members
    FOR ALL
    USING (public.is_org_admin(organization_id))
    WITH CHECK (public.is_org_admin(organization_id));

-- Allow an organization creator to insert themselves as initial owner
CREATE POLICY "User can add self as initial org owner"
    ON public.organization_members
    FOR INSERT
    WITH CHECK (
        user_id = auth.uid() AND
        role = 'owner' AND
        EXISTS (
            SELECT 1 FROM public.organizations o
            WHERE o.id = organization_id AND o.owner_id = auth.uid()
        )
    );

-- 10.4 APP SETTINGS POLICIES
-- Members can read app settings
CREATE POLICY "Members can read app settings"
    ON public.app_settings
    FOR SELECT
    USING (public.is_org_member(organization_id));

-- Admins/owners can modify app settings
CREATE POLICY "Admins can manage app settings"
    ON public.app_settings
    FOR ALL
    USING (public.is_org_admin(organization_id))
    WITH CHECK (public.is_org_admin(organization_id));

-- 10.5 USER PREFERENCES POLICIES
-- Users have full control over their own preferences
CREATE POLICY "Users manage own preferences"
    ON public.user_preferences
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 10.6 AUDIT LOGS POLICIES
-- Admins/owners can view audit logs
CREATE POLICY "Admins can view organization audit logs"
    ON public.audit_logs
    FOR SELECT
    USING (public.is_org_admin(organization_id));

-- Inserting audit logs permitted for active organization members
CREATE POLICY "Members can record audit logs"
    ON public.audit_logs
    FOR INSERT
    WITH CHECK (public.is_org_member(organization_id) AND auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 11. AUTOMATIC PROFILE CREATION TRIGGER (auth.users -> public.profiles)
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    default_org_id UUID;
    user_name TEXT;
BEGIN
    user_name := COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1));

    -- 1. Insert profile
    INSERT INTO public.profiles (id, full_name, email, avatar_url)
    VALUES (
        NEW.id,
        user_name,
        NEW.email,
        NEW.raw_user_meta_data->>'avatar_url'
    )
    ON CONFLICT (id) DO NOTHING;

    -- 2. Insert default user preferences
    INSERT INTO public.user_preferences (user_id, theme, language, timezone)
    VALUES (NEW.id, 'system', 'en', 'UTC')
    ON CONFLICT (user_id) DO NOTHING;

    -- 3. Automatically create an initial organization for new administrator registrations
    INSERT INTO public.organizations (name, owner_id, contact_email)
    VALUES (user_name || '''s Tuition Centre', NEW.id, NEW.email)
    RETURNING id INTO default_org_id;

    -- 4. Add user as owner in organization_members
    INSERT INTO public.organization_members (organization_id, user_id, role, status)
    VALUES (default_org_id, NEW.id, 'owner', 'active')
    ON CONFLICT (organization_id, user_id) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger fired after an auth.users row is inserted
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();
