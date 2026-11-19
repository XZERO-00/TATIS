import * as React from 'react';
import { PlaceholderPage } from '@/components/common/PlaceholderPage';
import { Calendar } from 'lucide-react';

export const TimetablePage: React.FC = () => {
  return (
    <PlaceholderPage
      moduleName="Timetable & Class Schedules"
      targetMilestone="M4"
      icon={Calendar}
      summary="Interactive weekly scheduling grid, room occupancy management, and tutor conflict resolution."
      plannedFeatures={[
        {
          title: 'Visual Weekly Schedule',
          description: 'Drag-and-drop timetable planner for batches, tutor availability, and classroom reservations.',
        },
        {
          title: 'Collision & Conflict Detection',
          description: 'Automated warnings when a tutor or room is double-booked across concurrent sessions.',
        },
        {
          title: 'Student & Parent Timetable View',
          description: 'Personalized class timings accessible via mobile web with push updates on schedule adjustments.',
        },
        {
          title: 'Holiday & Vacation Calendar',
          description: 'Centralised holiday roster with automated class postponement and makeup-session rescheduling.',
        },
      ]}
    />
  );
};
