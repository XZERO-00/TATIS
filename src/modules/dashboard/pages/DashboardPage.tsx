import * as React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { SummaryCards, type SummaryData } from '../components/SummaryCards';
import { FeeCollectionChart, type FeeDataPoint } from '../components/FeeCollectionChart';
import { AttendanceOverview, type AttendanceBatchStat } from '../components/AttendanceOverview';
import { RecentActivity, type ActivityItem } from '../components/RecentActivity';
import { UpcomingClasses, type ClassSession } from '../components/UpcomingClasses';
import { PendingFeeReminders, type FeeReminder } from '../components/PendingFeeReminders';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/authStore';
import { isSupabaseConfigured } from '@/services/supabase/config';
import { Sparkles, Database, Plus, CreditCard } from 'lucide-react';

const SAMPLE_SUMMARY_DATA: SummaryData = {
  totalStudents: 142,
  activeBatches: 12,
  todayAttendance: '94.2%',
  feesCollected: '$18,450',
  pendingFees: '$3,200',
  monthlyExpenses: '$6,120',
  isDemo: true,
};

const EMPTY_SUMMARY_DATA: SummaryData = {
  totalStudents: 0,
  activeBatches: 0,
  todayAttendance: '0.0%',
  feesCollected: '$0',
  pendingFees: '$0',
  monthlyExpenses: '$0',
  isDemo: false,
};

const SAMPLE_CHART_DATA: FeeDataPoint[] = [
  { month: 'Jun', collected: 14200, expected: 16000 },
  { month: 'Jul', collected: 15800, expected: 16500 },
  { month: 'Aug', collected: 17200, expected: 18000 },
  { month: 'Sep', collected: 16900, expected: 18000 },
  { month: 'Oct', collected: 19100, expected: 19500 },
  { month: 'Nov', collected: 18450, expected: 21650 },
];

const SAMPLE_ATTENDANCE_STATS: AttendanceBatchStat[] = [
  { batchName: 'Pure Physics Batch A', grade: 'Grade 12', present: 24, total: 25 },
  { batchName: 'Advanced Calculus', grade: 'Grade 11', present: 19, total: 20 },
  { batchName: 'Organic Chemistry II', grade: 'Grade 12', present: 17, total: 18 },
  { batchName: 'English Literature Mastery', grade: 'Grade 10', present: 21, total: 24 },
];

const SAMPLE_ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    type: 'payment',
    title: 'Fee payment recorded: $450',
    description: 'Sarah Jenkins • Physics Batch A • Receipt #RCP-1049',
    timestamp: '12m ago',
  },
  {
    id: '2',
    type: 'enrollment',
    title: 'New student admission registered',
    description: 'Liam Chen • Grade 11 Calculus Batch',
    timestamp: '1h ago',
  },
  {
    id: '3',
    type: 'attendance',
    title: 'Morning attendance verified',
    description: 'Grade 12 Physics (24/25 students checked-in)',
    timestamp: '3h ago',
  },
  {
    id: '4',
    type: 'batch',
    title: 'Batch schedule updated',
    description: 'SAT Intensive transferred to Room 302',
    timestamp: '5h ago',
  },
];

const SAMPLE_CLASSES: ClassSession[] = [
  {
    id: '1',
    subject: 'Pure Physics Mechanics',
    batchName: 'Batch 12-A',
    tutor: 'Dr. Robert Evans',
    room: 'Lab Room 2',
    time: '04:00 PM - 05:30 PM',
    status: 'ongoing',
  },
  {
    id: '2',
    subject: 'Differential Calculus',
    batchName: 'Batch 11-C',
    tutor: 'Prof. Margaret Lee',
    room: 'Room 104',
    time: '05:45 PM - 07:15 PM',
    status: 'upcoming',
  },
  {
    id: '3',
    subject: 'Inorganic Chemistry Fundamentals',
    batchName: 'Batch 10-B',
    tutor: 'Dr. Aris Vance',
    room: 'Room 201',
    time: '07:30 PM - 09:00 PM',
    status: 'upcoming',
  },
];

const SAMPLE_REMINDERS: FeeReminder[] = [
  {
    id: '1',
    studentName: 'Marcus Bradley',
    batchName: 'Batch 12-A',
    amount: '$350',
    overdueDays: 14,
  },
  {
    id: '2',
    studentName: 'Chloe Henderson',
    batchName: 'Batch 11-C',
    amount: '$420',
    overdueDays: 8,
  },
  {
    id: '3',
    studentName: 'Aaron Patel',
    batchName: 'Batch 10-B',
    amount: '$290',
    overdueDays: 5,
  },
];

export const DashboardPage: React.FC = () => {
  const { profile, user } = useAuthStore();
  const [showDemoData, setShowDemoData] = React.useState<boolean>(true);

  const adminName =
    profile?.full_name ||
    user?.user_metadata?.['full_name'] ||
    user?.email?.split('@')[0] ||
    'Administrator';

  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Page Header */}
      <PageHeader
        title={`Welcome back, ${adminName}`}
        description={`Tuition Operations Overview • ${todayFormatted}`}
        actions={
          <div className="flex items-center gap-2">
            {/* Demo data toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDemoData(!showDemoData)}
              className="text-xs gap-1.5 h-8 border-border"
              title="Toggle between sample demonstration metrics and live empty state"
            >
              {showDemoData ? (
                <>
                  <Database className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Switch to Live Empty State</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5 text-brand-neon" />
                  <span>Show Sample Data</span>
                </>
              )}
            </Button>

            {/* Quick Actions (Planned for M2/M3) */}
            <Button
              size="sm"
              className="text-xs gap-1.5 h-8 opacity-75 cursor-not-allowed"
              disabled
              title="Student admissions workflow will be introduced in M2"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Enroll Student</span>
            </Button>

            <Button
              variant="secondary"
              size="sm"
              className="text-xs gap-1.5 h-8 opacity-75 cursor-not-allowed"
              disabled
              title="Fee collection and receipts workflow will be introduced in M3"
            >
              <CreditCard className="h-3.5 w-3.5" />
              <span>Record Fee</span>
            </Button>
          </div>
        }
      />

      {/* Demo Mode Notice Banner if Sample Data is Active */}
      {showDemoData && (
        <div className="flex items-center justify-between rounded-lg bg-card border border-border/80 px-4 py-2.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-amber-500/40 text-amber-600 dark:text-amber-400 font-mono text-[10px]">
              Demo Mode Active
            </Badge>
            <span>
              Displaying curated demonstration records because the tuition database has no live transactions yet.
            </span>
          </div>
          <span className="text-[11px] font-mono hidden md:inline">
            Supabase Status: {isSupabaseConfigured ? 'Connected' : 'Pending Configuration'}
          </span>
        </div>
      )}

      {/* 1. Summary Metric Cards (6 cards) */}
      <SummaryCards
        data={showDemoData ? SAMPLE_SUMMARY_DATA : EMPTY_SUMMARY_DATA}
      />

      {/* 2. Charts & Attendance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FeeCollectionChart
          data={showDemoData ? SAMPLE_CHART_DATA : []}
          isDemo={showDemoData}
        />
        <AttendanceOverview
          stats={showDemoData ? SAMPLE_ATTENDANCE_STATS : []}
          isDemo={showDemoData}
        />
      </div>

      {/* 3. Operational Feeds: Schedule, Reminders & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UpcomingClasses
          sessions={showDemoData ? SAMPLE_CLASSES : []}
          isDemo={showDemoData}
        />
        <PendingFeeReminders
          reminders={showDemoData ? SAMPLE_REMINDERS : []}
          isDemo={showDemoData}
        />
        <RecentActivity
          activities={showDemoData ? SAMPLE_ACTIVITIES : []}
          isDemo={showDemoData}
        />
      </div>
    </div>
  );
};
