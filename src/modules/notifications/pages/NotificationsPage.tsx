import * as React from 'react';
import { PlaceholderPage } from '@/components/common/PlaceholderPage';
import { Bell } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  return (
    <PlaceholderPage
      moduleName="Notifications & Broadcasts"
      targetMilestone="M5"
      icon={Bell}
      summary="Automated announcements, multi-channel messaging (WhatsApp, SMS, Email), and student/parent communication history."
      plannedFeatures={[
        {
          title: 'Direct Multi-Channel Broadcasts',
          description: 'Dispatch instant batch announcements or emergency notices directly to parents via WhatsApp and SMS.',
        },
        {
          title: 'Automated Event Triggers',
          description: 'Trigger notifications for fee due dates, exam schedules, and holiday announcements without manual effort.',
        },
        {
          title: 'Delivery Status & Read Receipts',
          description: 'Verify whether parents received and opened critical academic or fee communications.',
        },
        {
          title: 'Template Library',
          description: 'Curate approved message templates with dynamic tags for student names, batch names, and fee amounts.',
        },
      ]}
    />
  );
};
