import * as React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Settings, Sliders, LogOut, Building2, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useOrganizationStore } from '@/store/organizationStore';
import { authService } from '@/services/auth/authService';
import { Avatar } from '../ui/avatar';

export const UserProfileMenu: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, reset: resetAuth } = useAuthStore();
  const { currentOrg, reset: resetOrg } = useOrganizationStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await authService.signOut();
    } catch (err) {
      console.warn('Sign out warning:', err);
    } finally {
      resetAuth();
      resetOrg();
      setIsOpen(false);
      navigate('/auth/login', { replace: true });
    }
  };

  const displayName = profile?.full_name || user?.user_metadata?.['full_name'] || user?.email?.split('@')[0] || 'Administrator';
  const email = profile?.email || user?.email || 'admin@tatis.edu';
  const orgName = currentOrg?.name || 'Apex Tuition Centre';

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-muted/60 transition-colors focus:outline-none"
        aria-label="User menu"
      >
        <Avatar
          src={profile?.avatar_url}
          fallback={displayName}
          size="sm"
        />
        <div className="hidden md:flex flex-col text-left">
          <span className="text-xs font-semibold text-foreground truncate max-w-[120px]">
            {displayName}
          </span>
          <span className="text-[10px] text-muted-foreground truncate max-w-[120px]">
            {orgName}
          </span>
        </div>
        <ChevronDown className="h-3 w-3 text-muted-foreground hidden md:block" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-card p-1.5 shadow-xl ring-1 ring-black/5 z-50 animate-fade-in text-xs divide-y divide-border/60">
          <div className="px-3 py-2.5">
            <p className="font-semibold text-foreground truncate">{displayName}</p>
            <p className="text-[11px] text-muted-foreground truncate">{email}</p>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-brand-soft dark:text-brand-cyan">
              <Building2 className="h-3 w-3" />
              <span className="truncate">{orgName}</span>
            </div>
          </div>

          <div className="py-1">
            <Link
              to="/settings/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-md hover:bg-muted text-foreground transition-colors"
            >
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              <span>My Profile</span>
            </Link>
            <Link
              to="/settings/preferences"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-md hover:bg-muted text-foreground transition-colors"
            >
              <Sliders className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Preferences</span>
            </Link>
            <Link
              to="/settings/account"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-md hover:bg-muted text-foreground transition-colors"
            >
              <Settings className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Account Settings</span>
            </Link>
          </div>

          <div className="pt-1">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-2.5 px-3 py-1.5 rounded-md hover:bg-destructive/10 text-destructive transition-colors text-left font-medium"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
