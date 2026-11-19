import * as React from 'react';
import { PlaceholderPage } from '@/components/common/PlaceholderPage';
import { Layers } from 'lucide-react';

export const BatchesPage: React.FC = () => {
  return (
    <PlaceholderPage
      moduleName="Batches & Classes"
      targetMilestone="M2"
      icon={Layers}
      summary="Organise courses, academic divisions, classroom capacities, tutor allocations, and batch scheduling."
      plannedFeatures={[
        {
          title: 'Batch Creation & Capacity Control',
          description: 'Define student headcounts, seat caps, waitlists, and academic term boundaries.',
        },
        {
          title: 'Subject & Course Mapping',
          description: 'Link curricula, textbook modules, and syllabus milestones to designated groups.',
        },
        {
          title: 'Faculty & Tutor Assignment',
          description: 'Assign primary and visiting tutors with role delegation and lecture responsibilities.',
        },
        {
          title: 'Batch Roster & Student Transfers',
          description: 'Easily reassign students between morning, evening, or weekend sessions with complete audit trail.',
        },
      ]}
    />
  );
};
