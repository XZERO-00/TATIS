import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin } from 'lucide-react';

export interface ClassSession {
  id: string;
  subject: string;
  batchName: string;
  tutor: string;
  room: string;
  time: string;
  status: 'ongoing' | 'upcoming' | 'completed';
}

export interface UpcomingClassesProps {
  sessions: ClassSession[];
  isDemo?: boolean;
}

export const UpcomingClasses: React.FC<UpcomingClassesProps> = ({
  sessions,
  isDemo = false,
}) => {
  return (
    <Card className="border-border/80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Upcoming Classes Today</CardTitle>
          {isDemo && (
            <Badge variant="outline" className="text-[10px] font-mono border-amber-500/30 text-amber-600 dark:text-amber-400">
              Demo
            </Badge>
          )}
        </div>
        <CardDescription className="text-xs">
          Schedule and classroom allocations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sessions.map((cls) => (
            <div
              key={cls.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border/70 bg-card hover:bg-muted/40 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-foreground">
                    {cls.subject}
                  </span>
                  <Badge variant="outline" className="text-[10px] py-0 px-1.5 h-4">
                    {cls.batchName}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {cls.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {cls.room}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-medium text-foreground block">
                  {cls.tutor}
                </span>
                {cls.status === 'ongoing' ? (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    In Session
                  </span>
                ) : (
                  <span className="text-[10px] text-muted-foreground">Scheduled</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
