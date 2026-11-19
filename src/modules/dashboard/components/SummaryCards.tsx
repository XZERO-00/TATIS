import * as React from 'react';
import { StatCard } from '@/components/common/StatCard';
import {
  Users,
  Layers,
  CheckCircle2,
  DollarSign,
  AlertCircle,
  Receipt,
} from 'lucide-react';

export interface SummaryData {
  totalStudents: number;
  activeBatches: number;
  todayAttendance: string;
  feesCollected: string;
  pendingFees: string;
  monthlyExpenses: string;
  isDemo: boolean;
}

export interface SummaryCardsProps {
  data: SummaryData;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <StatCard
        title="Total Students"
        value={data.totalStudents.toLocaleString()}
        subtitle="Enrolled across all batches"
        change={{ value: '+8% vs last month', trend: 'up' }}
        icon={Users}
        isDemoData={data.isDemo}
      />

      <StatCard
        title="Active Batches"
        value={data.activeBatches}
        subtitle="Running sessions"
        change={{ value: '2 newly scheduled', trend: 'neutral' }}
        icon={Layers}
        isDemoData={data.isDemo}
      />

      <StatCard
        title="Today's Attendance"
        value={data.todayAttendance}
        subtitle="Check-in compliance"
        change={{ value: '+2.4% vs avg', trend: 'up' }}
        icon={CheckCircle2}
        isDemoData={data.isDemo}
      />

      <StatCard
        title="Fees Collected"
        value={data.feesCollected}
        subtitle="Current billing cycle"
        change={{ value: '+14% target pace', trend: 'up' }}
        icon={DollarSign}
        isDemoData={data.isDemo}
      />

      <StatCard
        title="Pending Fees"
        value={data.pendingFees}
        subtitle="Outstanding balances"
        change={{ value: '9 overdue accounts', trend: 'down' }}
        icon={AlertCircle}
        isDemoData={data.isDemo}
      />

      <StatCard
        title="Monthly Expenses"
        value={data.monthlyExpenses}
        subtitle="Facility & tutors"
        change={{ value: '-3% within budget', trend: 'neutral' }}
        icon={Receipt}
        isDemoData={data.isDemo}
      />
    </div>
  );
};
