import { describe, it, expect, beforeEach } from 'vitest';
import { PriceCalculator } from './PriceCalculator';
import { SettingsManager } from './SettingsManager';

// We can use the real SettingsManager since it's just logic + localStorage (which we can mock or rely on defaults)
// Or better: pass a mock SettingsManager to strictly unit test PriceCalculator
describe('PriceCalculator', () => {
    let mockSettings;
    let pc;

    beforeEach(() => {
        mockSettings = {
            getAll: () => ({
                profit_margin: 30,
                packaging_cost: 5000,
                risk_percent: 5,
                tax_gtgt_percent: 1,
                tax_tncn_percent: 0.5,
                fee_grab: 25,
                fee_shopee: 15,
                has_discount: true,
                discount_percent: 20,
                ads_fee: 0
            })
        };
        pc = new PriceCalculator(mockSettings);
    });

    it('should calculate store price correctly', () => {
        // Store channel: No platform fee
        // Cost: 20000
        // Packaging: 5000
        // Profit: 20000 * 30% = 6000
        // Required Revenue: 20000 + 5000 + 6000 = 31000
        // Fees: Tax (1.5) + Risk (5) + Discount (20) + Ads (0) = 26.5%
        // Formula: Price = 31000 / (1 - 0.265) = 31000 / 0.735 = 42176.87
        // Round Up 500 -> 42500

        const price = pc.calculateSellingPrice(20000, 'store');
        expect(price).toBe(42500);
    });

    it('should calculate grab price correctly', () => {
        // Grab channel: Fee 25%
        // Fees: 25 + 26.5 = 51.5%
        // Formula: Price = 31000 / (1 - 0.515) = 31000 / 0.485 = 63917.5
        // Round Up 500 -> 64000

        const price = pc.calculateSellingPrice(20000, 'grab');
        expect(price).toBe(64000);
    });

    it('should return -1 if total fee >= 100%', () => {
        // Mock crazy fees
        mockSettings.getAll = () => ({
            profit_margin: 10,
            packaging_cost: 0,
            risk_percent: 50,
            tax_gtgt_percent: 5,
            tax_tncn_percent: 5,
            fee_grab: 50, // Total > 100
            has_discount: false,
            discount_percent: 0,
            ads_fee: 0
        });

        const price = pc.calculateSellingPrice(10000, 'grab');
        expect(price).toBe(null);
    });

    it('should handle 0 cost', () => {
        expect(pc.calculateSellingPrice(0, 'store')).toBe(0);
    });

    it('should match manual verification scenario', () => {
        // Input Cost: 100,000
        // Store Channel (No fee)
        // Profit: 30% (30,000)
        // Tax GTGT: 1%
        // Tax TNCN: 0.5%
        // Risk: 5%
        // Discount: 0 (disabled)
        // Packaging: 5000
        // Total Fee = 1 + 0.5 + 5 = 6.5%
        // Price = (100k + 5k pkg + 30k profit) / (1 - 0.065) = 135k / 0.935 = 144,385.02
        // Round Up 500 -> 144,500
        mockSettings.getAll = () => ({
            profit_margin: 30,
            packaging_cost: 5000,
            risk_percent: 5,
            tax_gtgt_percent: 1,
            tax_tncn_percent: 0.5,
            fee_grab: 25,
            has_discount: false,
            discount_percent: 20,
            ads_fee: 0
        });

        const price = pc.calculateSellingPrice(100000, 'store');
        expect(price).toBe(144500);
    });
});
