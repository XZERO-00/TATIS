import * as React from 'react';
import { PlaceholderPage } from '@/components/common/PlaceholderPage';
import { BarChart3 } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  return (
    <PlaceholderPage
      moduleName="Reports & Analytics"
      targetMilestone="M5"
      icon={BarChart3}
      summary="Comprehensive institutional analytics, fee collection velocity, attendance correlations, and exportable financial audits."
      plannedFeatures={[
        {
          title: 'Financial Statements & Ledgers',
          description: 'Export income-versus-expense statements, revenue summaries, and outstanding fee aging matrices.',
        },
        {
          title: 'Attendance Correlation Analytics',
          description: 'Evaluate the direct relationship between student attendance consistency and academic test scores.',
        },
        {
          title: 'Batch Profitability & Retention',
          description: 'Analyze revenue generated per batch against operational costs and student drop-out rates.',
        },
        {
          title: 'Data Export (CSV, Excel, PDF)',
          description: 'One-click exports compliant with standard accounting packages and regulatory audits.',
        },
      ]}
    />
  );
};
