import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/common/StatCard';
import { Users } from 'lucide-react';

describe('UI Primitives and Common Components', () => {
  it('renders Button correctly with text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('renders Badge with correct variant styling', () => {
    render(<Badge variant="success">Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders StatCard with title, value, and demo flag', () => {
    render(
      <StatCard
        title="Total Students"
        value="142"
        subtitle="Enrolled across batches"
        icon={Users}
        isDemoData={true}
      />
    );
    expect(screen.getByText('Total Students')).toBeInTheDocument();
    expect(screen.getByText('142')).toBeInTheDocument();
    expect(screen.getByText('Demo')).toBeInTheDocument();
  });
});
