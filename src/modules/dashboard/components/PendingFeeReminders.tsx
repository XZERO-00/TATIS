import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, Send } from 'lucide-react';

export interface FeeReminder {
  id: string;
  studentName: string;
  batchName: string;
  amount: string;
  overdueDays: number;
}

export interface PendingFeeRemindersProps {
  reminders: FeeReminder[];
  isDemo?: boolean;
}

export const PendingFeeReminders: React.FC<PendingFeeRemindersProps> = ({
  reminders,
  isDemo = false,
}) => {
  return (
    <Card className="border-border/80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Pending Fee Reminders</CardTitle>
          {isDemo && (
            <Badge variant="outline" className="text-[10px] font-mono border-amber-500/30 text-amber-600 dark:text-amber-400">
              Demo
            </Badge>
          )}
        </div>
        <CardDescription className="text-xs">
          Overdue installments requiring follow-up
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {reminders.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border/70 bg-card hover:bg-muted/40 transition-colors"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-foreground">
                    {item.studentName}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    • {item.batchName}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-rose-600 dark:text-rose-400">
                  <AlertCircle className="h-3 w-3" />
                  <span>{item.overdueDays} days overdue</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-foreground font-mono">
                  {item.amount}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-2.5 text-[11px] gap-1"
                  disabled
                  title="Automated WhatsApp & Email Reminders will be active in M4"
                >
                  <Send className="h-3 w-3" />
                  <span>Send</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
