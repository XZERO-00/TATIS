import * as React from 'react';
import { PlaceholderPage } from '@/components/common/PlaceholderPage';
import { GraduationCap } from 'lucide-react';

export const AcademicsPage: React.FC = () => {
  return (
    <PlaceholderPage
      moduleName="Academics & Tests"
      targetMilestone="M4"
      icon={GraduationCap}
      summary="Syllabus pacing, classroom assessments, test series scheduling, report cards, and student performance tracking."
      plannedFeatures={[
        {
          title: 'Syllabus Tracker',
          description: 'Topic-by-topic progress mapping for curriculum completion across competitive exam cohorts.',
        },
        {
          title: 'Assessments & Mock Exams',
          description: 'Schedule weekly quizzes, unit assessments, and standardized test series with automated cutoffs.',
        },
        {
          title: 'Gradebook & Rank Generation',
          description: 'Centralized marks entry with percentile calculations, score averages, and class rankings.',
        },
        {
          title: 'Student Progress Report Cards',
          description: 'Generate printable performance cards with teacher feedback, grade curves, and parent review sign-offs.',
        },
      ]}
    />
  );
};
