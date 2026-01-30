import { describe, it, expect } from 'vitest';
import { cleanNumber, formatCurrency } from './utils';

describe('Utils', () => {
    describe('cleanNumber', () => {
        it('should handle empty or invalid input', () => {
            expect(cleanNumber('')).toBe(0);
            expect(cleanNumber(null)).toBe(0);
            expect(cleanNumber(undefined)).toBe(0);
            expect(cleanNumber('abc')).toBe(0);
        });

        it('should remove dots (Vietnamese thousand separator)', () => {
            // 10.000 -> 10000
            expect(cleanNumber('10.000')).toBe(10000);
            expect(cleanNumber('1.000.000')).toBe(1000000);
        });

        it('should keep decimals if dot is used? Wait, in VN format dot is thousand separator.', () => {
            // If regex removes all dots, then we can't have decimals?
            // The current regex is `str.toString().replace(/\./g, "").replace(/[^0-9.-]+/g, "")`
            // It replaces ALL dots with empty string.
            // So 10.5 becomes 105.
            // This is intended behavior for VN currency input where we usually deal with integers.
            // If we supported cents/decimals, we might need a different logic (like comma for decimal).
            // For now, testing existing behavior.
            expect(cleanNumber('10.500')).toBe(10500);
        });

        it('should standard usage', () => {
            expect(cleanNumber('10000')).toBe(10000);
        });
    });

    describe('formatCurrency', () => {
        it('should format numbers with dots', () => {
            expect(formatCurrency(10000)).toBe('10.000');
            expect(formatCurrency(1000000)).toBe('1.000.000');
        });

        it('should round number', () => {
            expect(formatCurrency(10000.5)).toBe('10.001'); // Math.round
        });

        it('should handle 0', () => {
            expect(formatCurrency(0)).toBe('0');
        });

        it('should return 0 for invalid input', () => {
            expect(formatCurrency('abc')).toBe('0');
        });
    });
});
