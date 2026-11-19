import * as React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/forms/FormField';
import { Avatar } from '@/components/ui/avatar';
import { Alert } from '@/components/feedback/Alert';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/services/supabase/client';
import { isSupabaseConfigured } from '@/services/supabase/config';
import { Save, User } from 'lucide-react';

import type { UpdateTables } from '@/database/types/database.types';

export const ProfilePage: React.FC = () => {
  const { profile, user, setProfile } = useAuthStore();
  const [fullName, setFullName] = React.useState<string>(
    String(profile?.full_name || user?.user_metadata?.['full_name'] || '')
  );
  const [phone, setPhone] = React.useState<string>(profile?.phone || '');
  const [email] = React.useState<string>(profile?.email || user?.email || '');
  const [statusMessage, setStatusMessage] = React.useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    if (profile) {
      setFullName(profile.full_name);
      setPhone(profile.phone || '');
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    setIsSaving(true);

    try {
      if (isSupabaseConfigured && user) {
        const updatePayload: UpdateTables<'profiles'> = {
          full_name: fullName,
          phone: phone || null,
        };

        const { error } = await supabase
          .from('profiles')
          .update(updatePayload)
          .eq('id', user.id);

        if (error) throw error;
      }

      setProfile({
        id: profile?.id || user?.id || 'demo-id',
        full_name: fullName,
        email: email,
        phone: phone || null,
        avatar_url: profile?.avatar_url || null,
        created_at: profile?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      setStatusMessage({
        type: 'success',
        text: 'Profile details saved successfully.',
      });
    } catch (err: unknown) {
      const error = err as Error;
      setStatusMessage({
        type: 'error',
        text: error.message || 'Failed to update profile.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <PageHeader
        title="My Profile"
        description="Manage your identity, personal contact details, and display preferences."
      />

      {statusMessage && (
        <Alert
          variant={statusMessage.type === 'success' ? 'success' : 'destructive'}
          title={statusMessage.type === 'success' ? 'Success' : 'Error'}
        >
          {statusMessage.text}
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Avatar Card */}
        <Card className="border-border/80">
          <CardHeader>
            <CardTitle className="text-sm">Avatar</CardTitle>
            <CardDescription className="text-xs">
              Public display picture
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4 pt-2">
            <Avatar
              src={profile?.avatar_url}
              fallback={fullName || 'AD'}
              size="lg"
              className="h-24 w-24 text-xl ring-4 ring-muted"
            />
            <div className="text-center space-y-1">
              <p className="text-xs font-semibold text-foreground">
                {fullName || 'Administrator'}
              </p>
              <p className="text-[11px] text-muted-foreground">{email}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              disabled
              title="Image uploading via Supabase Storage will be configured in M2"
            >
              Upload Photo (M2)
            </Button>
          </CardContent>
        </Card>

        {/* Profile Details Form */}
        <Card className="md:col-span-2 border-border/80">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-brand-soft" />
              <CardTitle className="text-sm">Personal Information</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Update your registered administrator profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <FormField label="Full Name" htmlFor="fullName" required>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </FormField>

              <FormField label="Email Address" htmlFor="email">
                <Input
                  id="email"
                  value={email}
                  disabled
                  className="bg-muted/50 cursor-not-allowed"
                />
              </FormField>

              <FormField
                label="Contact Phone Number"
                htmlFor="phone"
                helperText="Used for automated administrative alerts and verification."
              >
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                />
              </FormField>

              <div className="pt-2 flex justify-end">
                <Button
                  type="submit"
                  size="sm"
                  className="text-xs gap-1.5"
                  isLoading={isSaving}
                >
                  <Save className="h-3.5 w-3.5" />
                  Save Profile Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
