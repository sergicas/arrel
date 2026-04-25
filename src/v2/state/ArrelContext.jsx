import { useEffect, useState, useCallback, useMemo } from 'react';
import { ArrelContext } from './arrelContextValue.js';
import { loadState, saveState, clearState, initialState } from '../lib/storage.js';
import {
  diagnosisToPrimaryArea,
  getRankedAreas,
  getActionForDay,
  isRestDay,
  isCycleEnd,
  getAreaForCycle,
  scoreDiagnosis,
} from '../lib/engine.js';
import { AREA_GUIDANCE, STATUS, FREE_CYCLES } from '../lib/types.js';

export function ArrelProvider({ children }) {
  const [state, setState] = useState(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const startDiagnostic = useCallback(() => {
    setState((s) => ({ ...s, status: STATUS.DIAGNOSTIC }));
  }, []);

  const completeDiagnostic = useCallback((answers) => {
    const scores = scoreDiagnosis(answers);
    const ranked = getRankedAreas(scores);
    const primary = diagnosisToPrimaryArea(answers);
    setState((s) => ({
      ...s,
      status: STATUS.ACTIVE,
      diagnosisAnswers: answers,
      primaryArea: primary,
      secondaryArea: ranked.find((area) => area !== primary) || null,
      diagnosisScores: scores,
      cycleNumber: 1,
      dayInCycle: 1,
      feedback: [],
      feedbackJustGiven: false,
      cycleJustEnded: false,
    }));
  }, []);

  const submitFeedback = useCallback((value, note = '') => {
    setState((s) => {
      if (s.feedbackJustGiven) return s;
      const action = getActionForDay(s.cycleNumber, s.dayInCycle, s.primaryArea);
      const entry = {
        cycle: s.cycleNumber,
        day: s.dayInCycle,
        text: action?.text || null,
        area: action?.area || null,
        value,
        note,
        at: Date.now(),
      };
      return {
        ...s,
        feedback: [...s.feedback, entry],
        feedbackJustGiven: true,
      };
    });
  }, []);

  const advanceDay = useCallback(() => {
    setState((s) => {
      if (isCycleEnd(s.dayInCycle)) {
        const newCycle = s.cycleNumber + 1;
        const needsPaywall = newCycle > FREE_CYCLES && !s.subscribed;
        return {
          ...s,
          cycleNumber: newCycle,
          dayInCycle: 1,
          status: needsPaywall ? STATUS.AWAITING_SUBSCRIPTION : STATUS.ACTIVE,
          feedbackJustGiven: false,
          cycleJustEnded: true,
        };
      }
      return {
        ...s,
        dayInCycle: s.dayInCycle + 1,
        feedbackJustGiven: false,
        cycleJustEnded: false,
      };
    });
  }, []);

  const acknowledgeTransition = useCallback(() => {
    setState((s) => ({ ...s, cycleJustEnded: false }));
  }, []);

  const subscribe = useCallback(() => {
    setState((s) => ({ ...s, subscribed: true, status: STATUS.ACTIVE }));
  }, []);

  const declineSubscription = useCallback(() => {
    // User chose not to subscribe — keep status awaiting; they'll see the paywall again next open.
    setState((s) => ({ ...s }));
  }, []);

  const restartFromDiagnostic = useCallback(() => {
    setState(() => ({
      ...initialState,
      status: STATUS.DIAGNOSTIC,
    }));
  }, []);

  const resetAll = useCallback(() => {
    clearState();
    setState({ ...initialState });
  }, []);

  const todayAction = useMemo(() => {
    if (!state.primaryArea) return null;
    return getActionForDay(state.cycleNumber, state.dayInCycle, state.primaryArea);
  }, [state.cycleNumber, state.dayInCycle, state.primaryArea]);

  const todayArea = useMemo(() => {
    if (!state.primaryArea) return null;
    return getAreaForCycle(state.cycleNumber, state.primaryArea);
  }, [state.cycleNumber, state.primaryArea]);

  const isToday7 = isRestDay(state.dayInCycle);
  const todayGuidance = todayArea ? AREA_GUIDANCE[todayArea] : null;

  const value = {
    state,
    todayAction,
    todayArea,
    todayGuidance,
    isToday7,
    startDiagnostic,
    completeDiagnostic,
    submitFeedback,
    advanceDay,
    acknowledgeTransition,
    subscribe,
    declineSubscription,
    restartFromDiagnostic,
    resetAll,
  };

  return <ArrelContext.Provider value={value}>{children}</ArrelContext.Provider>;
}
