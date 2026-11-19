import * as React from 'react';
import { Menu, Search, Bell } from 'lucide-react';
import { Button } from '../ui/button';
import { Breadcrumbs } from './Breadcrumbs';
import { ThemeToggle } from './ThemeToggle';
import { UserProfileMenu } from './UserProfileMenu';
import { GlobalSearchDialog } from './GlobalSearchDialog';

export interface TopNavbarProps {
  onToggleSidebar: () => void;
  onOpenMobileNav: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onToggleSidebar,
  onOpenMobileNav,
}) => {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur-md transition-all">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenMobileNav}
            className="md:hidden h-8 w-8 text-muted-foreground hover:text-foreground"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Desktop sidebar toggle button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="hidden md:flex h-8 w-8 text-muted-foreground hover:text-foreground"
            aria-label="Toggle sidebar collapse"
          >
            <Menu className="h-4 w-4" />
          </Button>

          {/* Breadcrumbs */}
          <div className="hidden sm:block pl-1">
            <Breadcrumbs />
          </div>
        </div>

        {/* Right side tools */}
        <div className="flex items-center gap-2">
          {/* Global search trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 h-8 px-3 rounded-lg border border-input bg-background/50 hover:bg-muted text-xs text-muted-foreground transition-colors"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden sm:inline-flex items-center rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono font-medium border border-border">
              ⌘K
            </kbd>
          </button>

          {/* Notification bell */}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-8 w-8 text-muted-foreground hover:text-foreground rounded-lg"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-brand-neon" />
          </Button>

          {/* Theme Selector */}
          <ThemeToggle />

          <div className="h-5 w-px bg-border mx-1" />

          {/* User Profile Menu */}
          <UserProfileMenu />
        </div>
      </header>

      <GlobalSearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};
