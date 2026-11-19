import * as React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { ConfigBanner } from '@/components/feedback/ConfigBanner';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col bg-background text-foreground">
      {/* Configuration notification if Supabase credentials are not set */}
      <ConfigBanner />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">
        {/* Left Branding Showcase (Hidden on small mobile) */}
        <div className="hidden lg:flex flex-col justify-between bg-brand-midnight text-white p-12 relative overflow-hidden">
          {/* Subtle gradient pattern backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(74,222,222,0.12),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(118,108,156,0.15),transparent_50%)]" />

          {/* Top Branding */}
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                <img src="/icons/logo.svg" alt="TATIS" className="h-7 w-7" />
              </div>
              <span className="text-xl font-bold tracking-wider uppercase text-white">
                TATIS
              </span>
            </Link>
          </div>

          {/* Middle Value Proposition */}
          <div className="relative z-10 space-y-6 max-w-lg">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-neon/30 bg-brand-neon/10 px-3 py-1 text-xs text-brand-neon font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Next-Generation Tuition Operations</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              Tuition Administration & Tracking Information System
            </h1>

            <p className="text-sm text-brand-soft leading-relaxed">
              Empowering administrators, tutors, and tuition centres with a unified,
              auditable foundation for student lifecycle, attendance compliance,
              and transparent fee administration.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
              <div className="space-y-1">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-brand-neon" />
                  <span>Row Level Security</span>
                </div>
                <p className="text-[11px] text-white/70">
                  Strict tenant data isolation and role-based policies.
                </p>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-brand-neon" />
                  <span>Multi-Tenant Architecture</span>
                </div>
                <p className="text-[11px] text-white/70">
                  Ready for multi-branch tuition centre operations.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Footer Notice */}
          <div className="relative z-10 flex items-center justify-between text-xs text-white/50 border-t border-white/10 pt-6">
            <span>Milestone 1 — Architecture Foundation</span>
            <span>Enterprise Grade</span>
          </div>
        </div>

        {/* Right Authentication Container */}
        <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12 bg-background">
          {/* Top Bar inside Auth */}
          <div className="flex items-center justify-between">
            <div className="lg:hidden flex items-center gap-2.5">
              <img src="/icons/logo.svg" alt="TATIS" className="h-7 w-7" />
              <span className="font-bold text-base uppercase tracking-wider text-foreground">
                TATIS
              </span>
            </div>
            <div className="ml-auto">
              <ThemeToggle />
            </div>
          </div>

          {/* Center Form Wrapper */}
          <div className="flex flex-1 items-center justify-center py-8">
            <div className="w-full max-w-md">
              <Outlet />
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} TATIS. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};
