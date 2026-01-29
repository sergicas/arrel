import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './AuthContext';
import { secureStorage } from '../lib/secureStorage';

const ArrelContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useArrel = () => {
  const context = useContext(ArrelContext);
  if (!context) {
    throw new Error('useArrel must be used within an ArrelProvider');
  }
  return context;
};

export const ArrelProvider = ({ children }) => {
  const { user } = useAuth();

  // -- GLOBAL STATE --
  const [diagnosis, setDiagnosis] = useState(null);
  const [history, setHistory] = useState([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  // -- LOAD INITIAL DATA --
  useEffect(() => {
    // 1. Load from LocalStorage (Immediate)
    const localDiag = secureStorage.getItem('arrel_diagnosis_raw');
    const localHist = secureStorage.getItem('arrel_historic');
    const localStreak = secureStorage.getItem('arrel_streak');
    const localDay = secureStorage.getItem('arrel_guest_day');

    if (localDiag) setDiagnosis(localDiag);
    if (localHist) setHistory(localHist);
    if (localStreak) setStreak(localStreak || 0);
    if (localDay && !user) setCurrentDay(localDay || 1);

    // 2. If User, Load from Supabase (Async Sync)
    if (user) {
      syncWithSupabase(user.id);
    } else {
      setLoading(false);
    }
  }, [user]);

  const syncWithSupabase = async (userId) => {
    try {
      setLoading(true);
      // Fetch User State
      const { data: stateData } = await supabase
        .from('user_state')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      if (stateData) {
        setCurrentDay(stateData.current_day || 1);
        // Optionally merge streaks or other data
      }

      // Fetch History/Diagnosis if needed (assuming stored in 'user_diagnostics' table eventually)
      // For now, simpler sync
    } catch (err) {
      console.error('Sync Error', err);
    } finally {
      setLoading(false);
    }
  };

  // -- ACTIONS --

  const saveDiagnosis = (scores, rawAnswers) => {
    const newEntry = {
      date: new Date().toISOString(),
      scores,
      answers: rawAnswers,
    };

    // Update State
    setDiagnosis(newEntry);
    const newHistory = [...history, newEntry];
    setHistory(newHistory);

    // Persist Local
    secureStorage.setItem('arrel_diagnosis_raw', newEntry);
    secureStorage.setItem('arrel_historic', newHistory);

    // Persist Cloud (if auth)
    if (user) {
      // supabase.from('diagnostics').insert(...)
    }
  };

  const advanceDay = async () => {
    const nextDay = currentDay + 1;
    setCurrentDay(nextDay);
    secureStorage.setItem('arrel_guest_day', nextDay);

    if (user) {
      await supabase.from('user_state').update({ current_day: nextDay }).eq('user_id', user.id);
    }
  };

  const updateStreak = (newStreak) => {
    setStreak(newStreak);
    secureStorage.setItem('arrel_streak', newStreak);
  };

  const value = {
    diagnosis,
    history,
    currentDay,
    streak,
    loading,
    saveDiagnosis,
    advanceDay,
    updateStreak,
  };

  return <ArrelContext.Provider value={value}>{children}</ArrelContext.Provider>;
};
