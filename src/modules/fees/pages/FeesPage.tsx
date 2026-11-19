import * as React from 'react';
import { PlaceholderPage } from '@/components/common/PlaceholderPage';
import { CreditCard } from 'lucide-react';

export const FeesPage: React.FC = () => {
  return (
    <PlaceholderPage
      moduleName="Fees & Payments"
      targetMilestone="M3"
      icon={CreditCard}
      summary="Tuition fee structures, customized installment schedules, digital invoice generation, receipts, and payment reconciliations."
      plannedFeatures={[
        {
          title: 'Custom Fee Structures',
          description: 'Configure course-based, monthly, term, or per-subject fee schedules with scholarship discounts.',
        },
        {
          title: 'Automated Invoicing & Receipts',
          description: 'Generate PDF tax invoices and official numbered receipts with QR validation.',
        },
        {
          title: 'Payment Gateway Integration',
          description: 'Accept online payments (Stripe, UPI, Bank Transfer) with automated status reconciliation.',
        },
        {
          title: 'Overdue Dues & Reminder Engine',
          description: 'Automated polite and urgent payment reminders dispatched across email, WhatsApp, and SMS.',
        },
      ]}
    />
  );
};
