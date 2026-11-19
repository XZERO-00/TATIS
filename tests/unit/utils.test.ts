import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';
import { formatCurrency, formatPercentage } from '@/utils/formatters';

describe('Utility Functions', () => {
  it('combines classes properly with cn()', () => {
    const isHidden = false;
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
    expect(cn('p-4', isHidden && 'hidden', 'm-2')).toBe('p-4 m-2');
    // Tailwind merge check
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  it('formats currency correctly', () => {
    const formatted = formatCurrency(18450);
    expect(formatted).toContain('18,450');
  });

  it('formats percentages correctly', () => {
    expect(formatPercentage(94.234)).toBe('94.2%');
    expect(formatPercentage(100, 0)).toBe('100%');
  });
});
