import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navItems } from './navigation';

export interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  className?: string;
  onItemClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  className,
  onItemClick,
}) => {
  return (
    <aside
      className={cn(
        'relative flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out select-none',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Branding Header */}
      <div className="flex h-14 items-center justify-between px-3 border-b border-sidebar-border/80">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary/20 text-sidebar-primary">
            <img src="/icons/logo.svg" alt="TATIS Logo" className="h-7 w-7" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="font-bold text-sm tracking-wide text-white uppercase">
                TATIS
              </span>
              <span className="text-[10px] text-brand-soft truncate leading-tight">
                Tuition Admin & Tracking
              </span>
            </div>
          )}
        </div>

        {/* Desktop collapse toggle icon button */}
        {!className?.includes('md:hidden') && (
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex h-6 w-6 items-center justify-center rounded text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onItemClick}
              className={({ isActive }) =>
                cn(
                  'group relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-xs font-medium transition-all',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground font-semibold shadow-sm'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-white',
                  isCollapsed ? 'justify-center px-0' : ''
                )
              }
              title={isCollapsed ? item.title : undefined}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={cn(
                      'h-4 w-4 shrink-0 transition-transform group-hover:scale-105',
                      isActive ? 'text-sidebar-primary-foreground' : 'text-sidebar-foreground/70'
                    )}
                  />
                  {!isCollapsed && (
                    <span className="truncate flex-1">{item.title}</span>
                  )}

                  {/* Tooltip on hover when collapsed */}
                  {isCollapsed && (
                    <div className="pointer-events-none absolute left-full ml-2 hidden rounded-md bg-brand-deep text-white text-[11px] font-medium py-1 px-2.5 shadow-md whitespace-nowrap z-50 group-hover:block border border-brand-soft/30">
                      {item.title}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Footer Details */}
      {!isCollapsed && (
        <div className="p-3 border-t border-sidebar-border/80 text-[11px] text-sidebar-foreground/60 space-y-1">
          <div className="flex items-center justify-between">
            <span>Milestone 1</span>
            <span className="px-1.5 py-0.5 rounded bg-sidebar-primary/20 text-sidebar-primary font-mono text-[10px]">
              v0.1.0-alpha
            </span>
          </div>
        </div>
      )}
    </aside>
  );
};
