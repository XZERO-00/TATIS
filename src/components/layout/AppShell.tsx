import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { ConfigBanner } from '../feedback/ConfigBanner';
import { X } from 'lucide-react';

export const AppShell: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tatis-sidebar-collapsed');
      return saved === 'true';
    }
    return false;
  });

  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

  const toggleSidebarCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('tatis-sidebar-collapsed', String(next));
      return next;
    });
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex shrink-0 h-full">
        <Sidebar
          isCollapsed={isCollapsed}
          onToggleCollapse={toggleSidebarCollapse}
        />
      </div>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden animate-fade-in">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileNavOpen(false)}
          />
          <div className="relative flex w-64 max-w-[80vw] flex-col bg-sidebar shadow-2xl z-10">
            <button
              onClick={() => setIsMobileNavOpen(false)}
              className="absolute right-3 top-4 rounded-md p-1 text-sidebar-foreground hover:bg-sidebar-accent"
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" />
            </button>
            <Sidebar
              isCollapsed={false}
              onToggleCollapse={() => {}}
              className="w-full h-full border-none"
              onItemClick={() => setIsMobileNavOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Supabase configuration helper banner if needed */}
        <ConfigBanner />

        {/* Top Navbar */}
        <TopNavbar
          onToggleSidebar={toggleSidebarCollapse}
          onOpenMobileNav={() => setIsMobileNavOpen(true)}
        />

        {/* Page Viewport Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
