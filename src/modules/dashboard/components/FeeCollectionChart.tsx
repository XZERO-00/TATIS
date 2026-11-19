import * as React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/common/EmptyState';
import { BarChart3 } from 'lucide-react';

export interface FeeDataPoint {
  month: string;
  collected: number;
  expected: number;
}

export interface FeeCollectionChartProps {
  data: FeeDataPoint[];
  isDemo?: boolean;
}

export const FeeCollectionChart: React.FC<FeeCollectionChartProps> = ({
  data,
  isDemo = false,
}) => {
  if (!data || data.length === 0) {
    return (
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Fee Collection Analytics</CardTitle>
          <CardDescription>Monthly fees tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={BarChart3}
            title="No Collection History"
            description="Fee collections and payment reconciliations will appear here once invoices are generated."
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-1 lg:col-span-2 border-border/80">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle>Fee Collection Analytics</CardTitle>
            {isDemo && (
              <Badge variant="outline" className="text-[10px] font-mono border-amber-500/30 text-amber-600 dark:text-amber-400">
                Sample Projection
              </Badge>
            )}
          </div>
          <CardDescription className="text-xs mt-1">
            Expected versus collected revenue over the last 6 months
          </CardDescription>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-brand-neon" />
            <span className="text-muted-foreground text-[11px]">Collected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-brand-soft" />
            <span className="text-muted-foreground text-[11px]">Expected</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stop-color="#4ADEDE" stopOpacity={0.4} />
                  <stop offset="95%" stop-color="#4ADEDE" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorExpected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stop-color="#766C9C" stopOpacity={0.25} />
                  <stop offset="95%" stop-color="#766C9C" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-border/50"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: 'currentColor', fontSize: 11 }}
                className="text-muted-foreground"
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: 'currentColor', fontSize: 11 }}
                className="text-muted-foreground"
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => `$${val / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '0.5rem',
                  fontSize: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              />
              <Area
                type="monotone"
                dataKey="expected"
                name="Expected Revenue"
                stroke="#766C9C"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#colorExpected)"
              />
              <Area
                type="monotone"
                dataKey="collected"
                name="Collected Revenue"
                stroke="#4ADEDE"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorCollected)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
