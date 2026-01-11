import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

/**
 * useArrelData - Central Data Hook
 * 
 * Abstracts where data is saved (LocalStorage vs Supabase).
 * Provides unified methods for reading/writing step progress.
 */
export const useArrelData = () => {
    const { user, isGuest } = useAuth();

    // -- HELPERS --
    const getStorageKey = (key) => `arrel_${key}`;

    /**
     * loadData
     * @param {string} key - 'social', 'emotional', 'physical', etc.
     * @returns {object|null} - Parsed data or null
     */
    const loadData = useCallback((key) => {
        // 1. Try LocalStorage (First priority for speed/offline)
        const local = localStorage.getItem(getStorageKey(key));
        if (local) {
            try {
                return JSON.parse(local);
            } catch (e) {
                console.error("Error parsing local data", e);
                return null;
            }
        }
        return null;
    }, []);

    /**
     * saveData
     * @param {string} key - 'social', 'emotional', etc.
     * @param {object} data - Data object to save
     */
    const saveData = useCallback(async (key, data) => {
        // 1. Always save to LocalStorage (Optimistic UI)
        const stringified = JSON.stringify(data);
        localStorage.setItem(getStorageKey(key), stringified);

        // Dispatch event for UI updates (Dashboard listening)
        window.dispatchEvent(new Event('storage'));

        // 2. If User is logged in, sync to Supabase (Background)
        if (user && !isGuest) {
            try {
                // Determine table based on key or use a generic 'user_data' table
                // For MVP, we might just log that we would sync here.
                // In a full implementation, this would upsert to a 'progress' table.
                /*
                await supabase.from('progress').upsert({
                    user_id: user.id,
                    category: key,
                    data: data,
                    updated_at: new Date()
                });
                */
            } catch (err) {
                console.warn("Cloud sync failed", err);
            }
        }

        return true;
    }, [user, isGuest]);

    /**
     * calculateScore
     * Returns a simplified 0-100 score for a given area based on its data.
     */
    const getAreaScore = useCallback((area) => {
        const data = loadData(area);
        if (!data) return 0;

        switch (area) {
            case 'physical':
                // Expects array of tasks
                if (Array.isArray(data)) {
                    const done = data.filter(t => t.completed).length;
                    return Math.round((done / (data.length || 1)) * 100);
                }
                return 0;
            case 'mental':
                // Expects { gratitude: [] }
                if (data.gratitude) {
                    const filled = data.gratitude.filter(g => g.trim().length > 0).length;
                    return Math.round((filled / 3) * 100);
                }
                return 0;
            case 'emotional':
                // Expects { mood: '...' }
                return data.mood ? 100 : 0;
            case 'social':
                // Expects { connections: [], socialGoal: '' }
                let score = 0;
                if (data.connections?.some(c => c.name)) score += 50;
                if (data.socialGoal) score += 50;
                return score;
            case 'intellectual':
                // Expects { values: [], learningGoal: '' }
                return data.learningGoal ? 100 : 0;
            default:
                return 0;
        }
    }, [loadData]);

    return {
        loadData,
        saveData,
        getAreaScore
    };
};
