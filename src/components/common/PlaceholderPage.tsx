import * as React from 'react';
import { LucideIcon, CalendarClock, ShieldCheck, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { PageHeader } from './PageHeader';

export interface PlannedFeature {
  title: string;
  description: string;
}

export interface PlaceholderPageProps {
  moduleName: string;
  targetMilestone: string;
  icon: LucideIcon;
  summary: string;
  plannedFeatures: PlannedFeature[];
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  moduleName,
  targetMilestone,
  icon: Icon,
  summary,
  plannedFeatures,
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title={moduleName}
        description={`Module scheduled for implementation in ${targetMilestone}`}
        actions={
          <Badge variant="outline" className="gap-1.5 py-1 px-3 border-brand-soft/40">
            <CalendarClock className="h-3.5 w-3.5 text-brand-soft" />
            <span className="font-mono text-xs">{targetMilestone} Roadmap</span>
          </Badge>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/80 bg-card/60">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-brand-midnight/5 dark:bg-brand-soft/15 text-brand-midnight dark:text-brand-neon">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>{moduleName} Administration</CardTitle>
                <CardDescription className="mt-1">{summary}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Planned Capabilities in {targetMilestone}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {plannedFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg border border-border/60 bg-background/50 hover:border-brand-soft/30 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-brand-neon mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-foreground">
                          {feature.title}
                        </div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">
                          {feature.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-muted/50 p-4 border border-border/60 text-xs text-muted-foreground flex items-start gap-3">
              <ShieldCheck className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-foreground">Architecture Status:</span>{' '}
                Database schemas and multi-tenant RLS foundations for this business domain
                are aligned with the TATIS Master Data Model and will be activated alongside
                the respective module views.
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/60">
          <CardHeader>
            <CardTitle className="text-sm">Module Readiness</CardTitle>
            <CardDescription className="text-xs">
              M1 architectural boundaries
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="space-y-2">
              <div className="flex justify-between text-muted-foreground">
                <span>Core Shell & Routing</span>
                <span className="text-emerald-600 font-semibold">Ready</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-full" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-muted-foreground">
                <span>Multi-tenant Organization Model</span>
                <span className="text-emerald-600 font-semibold">Active</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-full" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-muted-foreground">
                <span>Domain Business Logic</span>
                <span className="text-brand-soft font-semibold">{targetMilestone}</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-brand-soft/40 rounded-full w-1/4" />
              </div>
            </div>

            <div className="pt-3 border-t border-border/60 text-[11px] text-muted-foreground">
              This route is locked under M1 design rules. It will transition to the full interactive workspace during {targetMilestone}.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
