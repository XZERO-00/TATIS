import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

export interface AttendanceBatchStat {
  batchName: string;
  grade: string;
  present: number;
  total: number;
}

export interface AttendanceOverviewProps {
  stats: AttendanceBatchStat[];
  isDemo?: boolean;
}

export const AttendanceOverview: React.FC<AttendanceOverviewProps> = ({
  stats,
  isDemo = false,
}) => {
  return (
    <Card className="border-border/80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Attendance Overview</CardTitle>
          {isDemo && (
            <Badge variant="outline" className="text-[10px] font-mono border-amber-500/30 text-amber-600 dark:text-amber-400">
              Demo
            </Badge>
          )}
        </div>
        <CardDescription className="text-xs">
          Today's session completion by batch
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick summary badges */}
        <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-muted/50 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="h-3 w-3" />
              <span>Present</span>
            </div>
            <div className="text-base font-bold text-foreground mt-0.5">94.2%</div>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 font-medium">
              <Clock className="h-3 w-3" />
              <span>Late</span>
            </div>
            <div className="text-base font-bold text-foreground mt-0.5">3.8%</div>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 font-medium">
              <XCircle className="h-3 w-3" />
              <span>Absent</span>
            </div>
            <div className="text-base font-bold text-foreground mt-0.5">2.0%</div>
          </div>
        </div>

        {/* Batch lists */}
        <div className="space-y-2.5">
          {stats.map((batch, idx) => {
            const percentage = Math.round((batch.present / batch.total) * 100);
            return (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground truncate max-w-[160px]">
                    {batch.batchName} ({batch.grade})
                  </span>
                  <span className="text-muted-foreground text-[11px]">
                    {batch.present}/{batch.total} ({percentage}%)
                  </span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-neon rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
