import * as React from 'react';
import { PlaceholderPage } from '@/components/common/PlaceholderPage';
import { CheckSquare } from 'lucide-react';

export const AttendancePage: React.FC = () => {
  return (
    <PlaceholderPage
      moduleName="Attendance"
      targetMilestone="M3"
      icon={CheckSquare}
      summary="Session check-ins, biometric/barcode integration, daily register, and automated parent absence notifications."
      plannedFeatures={[
        {
          title: 'Daily Attendance Register',
          description: 'Fast grid-based attendance entry with Present, Late, Excused, and Unexcused states.',
        },
        {
          title: 'Instant Parent Absence Alerts',
          description: 'Trigger SMS or WhatsApp alerts to parents immediately upon unmarked attendance.',
        },
        {
          title: 'Attendance Compliance Analytics',
          description: 'Identify chronic absenteeism, attendance percentages per batch, and exam eligibility thresholds.',
        },
        {
          title: 'Tutor Attendance & Hours',
          description: 'Track tutor teaching hours for automated payroll calculations and contract billing.',
        },
      ]}
    />
  );
};
