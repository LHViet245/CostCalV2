import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SettingsManager } from './SettingsManager';

describe('SettingsManager', () => {
    let sm;

    // Mock LocalStorage
    const localStorageMock = (function () {
        let store = {};
        return {
            getItem: (key) => store[key] || null,
            setItem: (key, value) => store[key] = value.toString(),
            clear: () => store = {}
        };
    })();

    beforeEach(() => {
        // Reset mock
        vi.stubGlobal('localStorage', localStorageMock);
        localStorageMock.clear();
        sm = new SettingsManager();
    });

    it('should load default settings if storage is empty', () => {
        expect(sm.get('profit_margin')).toBe(30);
        expect(sm.get('fee_grab')).toBe(25);
    });

    it('should save settings', () => {
        sm.save({ profit_margin: 50 });
        // Should update instance
        expect(sm.get('profit_margin')).toBe(50);
        // Should persist to storage
        const stored = JSON.parse(localStorageMock.getItem('pricing_settings'));
        expect(stored.profit_margin).toBe(50);
    });

    it('should merge new settings with existing ones', () => {
        sm.save({ profit_margin: 50 });
        sm.save({ fee_grab: 30 });
        expect(sm.get('profit_margin')).toBe(50);
        expect(sm.get('fee_grab')).toBe(30);
    });

    it('should reset to defaults', () => {
        sm.save({ profit_margin: 99 });
        sm.reset();
        expect(sm.get('profit_margin')).toBe(30);
    });
});
