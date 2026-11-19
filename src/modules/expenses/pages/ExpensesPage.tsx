import * as React from 'react';
import { PlaceholderPage } from '@/components/common/PlaceholderPage';
import { Receipt } from 'lucide-react';

export const ExpensesPage: React.FC = () => {
  return (
    <PlaceholderPage
      moduleName="Expenses"
      targetMilestone="M4"
      icon={Receipt}
      summary="Track centre operating expenses, facility rent, utilities, tutor honorariums, stationery, and material purchases."
      plannedFeatures={[
        {
          title: 'Operational Cost Categories',
          description: 'Categorize rent, electrical utilities, educational software, cleaning, and equipment maintenance.',
        },
        {
          title: 'Tutor Payouts & Honorariums',
          description: 'Compute hourly and fixed-salary disbursements linked to verified teaching registers.',
        },
        {
          title: 'Receipt & Voucher Attachment',
          description: 'Upload digital proof of payments and invoices to Supabase Storage for audit compliance.',
        },
        {
          title: 'Net Profit & Burn Rate Reports',
          description: 'Compare collected fees against total monthly disbursements for crystal clear financial transparency.',
        },
      ]}
    />
  );
};
