import * as React from 'react';
import { PlaceholderPage } from '@/components/common/PlaceholderPage';
import { Users } from 'lucide-react';

export const StudentsPage: React.FC = () => {
  return (
    <PlaceholderPage
      moduleName="Students"
      targetMilestone="M2"
      icon={Users}
      summary="Comprehensive student admission lifecycle, demographic tracking, academic history, parent contacts, and document archives."
      plannedFeatures={[
        {
          title: 'Student Admission & Onboarding',
          description: 'Multi-step admission wizard with digital document uploads and automated student roll-number generation.',
        },
        {
          title: 'Guardian & Parent Contacts',
          description: 'Linked parent/guardian directories with multi-channel contact methods and emergency details.',
        },
        {
          title: 'Academic Profile & History',
          description: 'Previous school transcripts, current grade levels, enrolled subjects, and learning notes.',
        },
        {
          title: 'Status & Batch Assignment',
          description: 'Manage active, suspended, graduated, and transferred student statuses with history logs.',
        },
      ]}
    />
  );
};
