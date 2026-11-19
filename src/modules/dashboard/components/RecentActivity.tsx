import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, UserPlus, CheckSquare, BookOpen } from 'lucide-react';

export interface ActivityItem {
  id: string;
  type: 'payment' | 'enrollment' | 'attendance' | 'batch';
  title: string;
  description: string;
  timestamp: string;
}

export interface RecentActivityProps {
  activities: ActivityItem[];
  isDemo?: boolean;
}

const typeIconMap = {
  payment: CreditCard,
  enrollment: UserPlus,
  attendance: CheckSquare,
  batch: BookOpen,
};

export const RecentActivity: React.FC<RecentActivityProps> = ({
  activities,
  isDemo = false,
}) => {
  return (
    <Card className="border-border/80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Recent Activity</CardTitle>
          {isDemo && (
            <Badge variant="outline" className="text-[10px] font-mono border-amber-500/30 text-amber-600 dark:text-amber-400">
              Demo
            </Badge>
          )}
        </div>
        <CardDescription className="text-xs">
          Latest administrative logs and audit trace
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((item) => {
            const Icon = typeIconMap[item.type];
            return (
              <div key={item.id} className="flex items-start gap-3 text-xs">
                <div className="rounded-full bg-muted p-2 text-foreground shrink-0 mt-0.5">
                  <Icon className="h-3.5 w-3.5 text-brand-soft" />
                </div>
                <div className="flex-1 space-y-0.5 overflow-hidden">
                  <p className="font-semibold text-foreground truncate">{item.title}</p>
                  <p className="text-muted-foreground text-[11px] truncate">
                    {item.description}
                  </p>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0 font-mono">
                  {item.timestamp}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
