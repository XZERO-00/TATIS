import * as React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/forms/FormField';
import { Alert } from '@/components/feedback/Alert';
import { useThemeStore, type ThemeMode } from '@/store/themeStore';
import { Sun, Moon, Laptop, Check, Sliders, Bell } from 'lucide-react';

export const PreferencesPage: React.FC = () => {
  const { theme, setTheme } = useThemeStore();
  const [language, setLanguage] = React.useState('en');
  const [timezone, setTimezone] = React.useState('UTC');
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [inAppNotifications, setInAppNotifications] = React.useState(true);
  const [savedSuccess, setSavedSuccess] = React.useState(false);

  const themeOptions: { mode: ThemeMode; label: string; desc: string; icon: typeof Sun }[] = [
    {
      mode: 'light',
      label: 'Light Mode',
      desc: 'Crisp high-contrast theme suited for bright daylight environments.',
      icon: Sun,
    },
    {
      mode: 'dark',
      label: 'Dark Mode',
      desc: 'Deep Midnight Indigo background for reduced eye strain.',
      icon: Moon,
    },
    {
      mode: 'system',
      label: 'System Preference',
      desc: 'Automatically synchronizes with your operating system settings.',
      icon: Laptop,
    },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <PageHeader
        title="User Preferences"
        description="Customize application theme, localization parameters, and notification channels."
      />

      {savedSuccess && (
        <Alert variant="success" title="Preferences Saved">
          Your personal visual and system preferences have been persisted.
        </Alert>
      )}

      {/* Theme Selection */}
      <Card className="border-border/80">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-brand-soft" />
            <CardTitle className="text-sm">Appearance & Theme</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Select your preferred visual style. Changes apply immediately.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {themeOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = theme === opt.mode;
              return (
                <button
                  key={opt.mode}
                  type="button"
                  onClick={() => setTheme(opt.mode)}
                  className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all relative ${
                    isSelected
                      ? 'border-brand-neon bg-brand-neon/5 ring-1 ring-brand-neon'
                      : 'border-border bg-card hover:border-brand-soft/40 hover:bg-muted/30'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <div className="p-2 rounded-lg bg-muted text-foreground">
                      <Icon className="h-4 w-4" />
                    </div>
                    {isSelected && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-neon text-brand-deep">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-foreground">
                    {opt.label}
                  </span>
                  <span className="text-[11px] text-muted-foreground mt-1 leading-snug">
                    {opt.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Localization and Notifications */}
      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-border/80">
            <CardHeader>
              <CardTitle className="text-sm">Localization</CardTitle>
              <CardDescription className="text-xs">
                Language and time configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField label="Interface Language">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="en">English (United States)</option>
                  <option value="en-gb">English (United Kingdom)</option>
                  <option value="hi" disabled>Hindi (Planned for M6)</option>
                </select>
              </FormField>

              <FormField label="Timezone">
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="UTC">UTC (Coordinated Universal Time)</option>
                  <option value="Asia/Kolkata">Asia/Kolkata (IST, UTC+5:30)</option>
                  <option value="America/New_York">America/New_York (EST, UTC-5)</option>
                  <option value="Europe/London">Europe/London (GMT/BST)</option>
                  <option value="Asia/Singapore">Asia/Singapore (SGT, UTC+8)</option>
                </select>
              </FormField>
            </CardContent>
          </Card>

          <Card className="border-border/80">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-brand-soft" />
                <CardTitle className="text-sm">Notification Channels</CardTitle>
              </div>
              <CardDescription className="text-xs">
                Choose how you receive administrative alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <label className="flex items-start gap-3 p-3 rounded-lg border border-border/70 bg-card cursor-pointer hover:bg-muted/30 transition-colors">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="rounded border-input text-primary mt-0.5"
                />
                <div className="space-y-0.5">
                  <span className="font-semibold text-foreground block">
                    Email Notifications
                  </span>
                  <span className="text-[11px] text-muted-foreground block">
                    Daily summaries, fee overdue reports, and urgent alerts.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-lg border border-border/70 bg-card cursor-pointer hover:bg-muted/30 transition-colors">
                <input
                  type="checkbox"
                  checked={inAppNotifications}
                  onChange={(e) => setInAppNotifications(e.target.checked)}
                  className="rounded border-input text-primary mt-0.5"
                />
                <div className="space-y-0.5">
                  <span className="font-semibold text-foreground block">
                    In-App Notification Center
                  </span>
                  <span className="text-[11px] text-muted-foreground block">
                    Activity badges and notifications in the top bar.
                  </span>
                </div>
              </label>

              <div className="pt-2 flex justify-end">
                <Button type="submit" size="sm" className="text-xs">
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};
