import * as React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { User, Sliders, Shield, Building2, ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useOrganizationStore } from '@/store/organizationStore';

export const SettingsPage: React.FC = () => {
  const { profile, user } = useAuthStore();
  const { currentOrg } = useOrganizationStore();

  const settingsLinks = [
    {
      title: 'My Profile',
      description: 'Manage personal details, contact information, and avatar.',
      icon: User,
      path: '/settings/profile',
    },
    {
      title: 'Preferences',
      description: 'Theme customization (Light/Dark/System), default language, and notifications.',
      icon: Sliders,
      path: '/settings/preferences',
    },
    {
      title: 'Account & Security',
      description: 'Password credentials, authentication sessions, and security logs.',
      icon: Shield,
      path: '/settings/account',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Settings & Administration"
        description="Configure your administrator profile, tuition centre preferences, and system parameters."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Organization Summary Card */}
        <Card className="md:col-span-1 border-border/80">
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-brand-midnight/5 dark:bg-brand-soft/15 text-brand-midnight dark:text-brand-neon">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-sm">Tuition Centre Entity</CardTitle>
                <CardDescription className="text-xs">Active Organization</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-muted/50 space-y-1">
              <span className="font-semibold text-foreground block">
                {currentOrg?.name || "Apex Tuition Centre"}
              </span>
              <span className="text-muted-foreground text-[11px] block">
                Owner: {profile?.full_name || user?.email || 'Administrator'}
              </span>
            </div>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              Multi-organization switching and tuition branch configurations are managed under the TATIS multi-tenant architecture.
            </p>
          </CardContent>
        </Card>

        {/* Setting Navigation Cards */}
        <div className="md:col-span-2 space-y-3">
          {settingsLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-brand-soft/40 hover:bg-muted/30 transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-muted text-foreground group-hover:bg-brand-midnight group-hover:text-white dark:group-hover:bg-brand-neon dark:group-hover:text-brand-deep transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
