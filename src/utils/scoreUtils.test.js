
import { describe, it, expect } from 'vitest';
import { calculateGlobalScore } from './scoreUtils';

describe('calculateGlobalScore', () => {
    it('should return 0 when scores are null or undefined', () => {
        expect(calculateGlobalScore(null)).toBe(0);
        expect(calculateGlobalScore(undefined)).toBe(0);
    });

    it('should return 100 for maximum scores', () => {
        // Energy: range -2 to +2. Max is 2. (2 question: max 4?)
        // Let's check the normalization logic in scoreUtils.js
        // normalize(val, max) => ((val + max) / (2*max)) * 100
        // If val = max => (2*max) / (2*max) * 100 = 100.

        // We need to assume the input scores match the "max" used in scoreUtils
        // Energy max = 4
        // Sleep max = 6
        // Nutrition max = 6
        // Attention max = 4
        // Lived Time max = 4

        const perfectScores = {
            energy: 4,
            sleep: 6,
            nutrition: 6,
            attention: 4,
            lived_time: 4,
        };

        expect(calculateGlobalScore(perfectScores)).toBe(100);
    });

    it('should return 0 for minimum scores', () => {
        // If val = -max => (-max + max)/... = 0.
        const worstScores = {
            energy: -4,
            sleep: -6,
            nutrition: -6,
            attention: -4,
            lived_time: -4,
        };

        expect(calculateGlobalScore(worstScores)).toBe(0);
    });

    it('should return 50 for neutral scores (0)', () => {
        const neutralScores = {
            energy: 0,
            sleep: 0,
            nutrition: 0,
            attention: 0,
            lived_time: 0,
        };

        expect(calculateGlobalScore(neutralScores)).toBe(50);
    });

    it('should handle partial scores treating missing as 0', () => {
        // If a score is missing/undefined, the code does (val || 0).
        // So missing energy means energy=0 => 50% for that block.

        const partialScores = {
            sleep: 6, // 100%
            // others missing -> 50%
        };

        // Expected: (50 + 100 + 50 + 50 + 50) / 5 = 300 / 5 = 60
        expect(calculateGlobalScore(partialScores)).toBe(60);
    });
});
