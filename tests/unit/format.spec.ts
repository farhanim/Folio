import { describe, expect, it } from 'vitest';
import { cn, formatCurrency } from '#lib/utils/format.ts';

describe('format utils', () => {
	it('formats IDR currency', () => {
		expect(formatCurrency(15000)).toMatch(/15\.000/);
	});

	it('joins truthy class names', () => {
		expect(cn('a', false, 'b', undefined)).toBe('a b');
	});
});
