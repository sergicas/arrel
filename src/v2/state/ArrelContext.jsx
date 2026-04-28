import { useEffect, useState, useCallback, useMemo } from 'react';
import { ArrelContext } from './arrelContextValue.js';
import {
  loadState,
  loadDurableState,
  saveDurableState,
  clearDurableState,
  shouldUseNativePreferences,
  initialState,
  getLocalDateKey,
} from '../lib/storage.js';
import {
  diagnosisToPrimaryArea,
  getRankedAreas,
  getActionForDay,
  isRestDay,
  isCycleEnd,
  getAreaForCycle,
  scoreDiagnosis,
} from '../lib/engine.js';
import { AREA_GUIDANCE, AREAS, STATUS, INITIAL_GUIDED_CYCLES } from '../lib/types.js';
import { cancelDailyReminder, scheduleDailyReminder } from '../lib/reminders.js';

function hasFeedbackForDay(feedback, cycleNumber, dayInCycle) {
  return feedback.some((entry) => entry.cycle === cycleNumber && entry.day === dayInCycle);
}

export function ArrelProvider({ children }) {
  const [state, setState] = useState(loadState);
  const [storageReady, setStorageReady] = useState(() => !shouldUseNativePreferences());
  const todayKey = getLocalDateKey();

  useEffect(() => {
    if (storageReady) return undefined;

    let active = true;
    loadDurableState()
      .then((durableState) => {
        if (active) setState(durableState);
      })
      .finally(() => {
        if (active) setStorageReady(true);
      });

    return () => {
      active = false;
    };
  }, [storageReady]);

  useEffect(() => {
    if (!storageReady) return;
    void saveDurableState(state);
  }, [state, storageReady]);

  const startDiagnostic = useCallback(() => {
    setState((s) => ({ ...s, status: STATUS.DIAGNOSTIC }));
  }, []);

  const startStarterCycle = useCallback(() => {
    setState((s) => ({
      ...s,
      status: STATUS.ACTIVE,
      entryMode: 'starter',
      // Starter mode begins with stress because it is the most transversal first action.
      primaryArea: AREAS.STRESS,
      secondaryArea: null,
      diagnosisAnswers: [],
      diagnosisScores: null,
      cycleNumber: 1,
      dayInCycle: 1,
      currentDayAvailableOn: getLocalDateKey(),
      feedback: [],
      feedbackJustGiven: false,
      diagnosisJustCompleted: false,
      cycleJustEnded: false,
    }));
  }, []);

  const completeDiagnostic = useCallback((answers) => {
    const scores = scoreDiagnosis(answers);
    const ranked = getRankedAreas(scores);
    const primary = diagnosisToPrimaryArea(answers);
    setState((s) => ({
      ...s,
      status: STATUS.ACTIVE,
      entryMode: 'diagnostic',
      diagnosisAnswers: answers,
      primaryArea: primary,
      secondaryArea: ranked.find((area) => area !== primary) || null,
      diagnosisScores: scores,
      cycleNumber: 1,
      dayInCycle: 1,
      currentDayAvailableOn: getLocalDateKey(),
      feedback: s.feedback,
      feedbackJustGiven: false,
      diagnosisJustCompleted: true,
      cycleJustEnded: false,
    }));
  }, []);

  const submitFeedback = useCallback((value, note = '') => {
    setState((s) => {
      if (s.feedbackJustGiven || hasFeedbackForDay(s.feedback, s.cycleNumber, s.dayInCycle)) return s;
      const action = getActionForDay(s.cycleNumber, s.dayInCycle, s.primaryArea);
      const entry = {
        cycle: s.cycleNumber,
        day: s.dayInCycle,
        text: action?.text || null,
        duration: action?.duration || null,
        area: action?.area || null,
        value,
        note,
        at: Date.now(),
        completedOn: getLocalDateKey(),
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
      const currentDate = getLocalDateKey();
      const availableOn = s.currentDayAvailableOn || currentDate;
      const isRest = isRestDay(s.dayInCycle);
      const completed = isRest || hasFeedbackForDay(s.feedback, s.cycleNumber, s.dayInCycle);

      if (!completed || currentDate <= availableOn) return s;

      if (isCycleEnd(s.dayInCycle)) {
        const newCycle = s.cycleNumber + 1;
        const initialPeriodComplete = newCycle > INITIAL_GUIDED_CYCLES && !s.continuedAfterInitialPeriod;
        return {
          ...s,
          cycleNumber: newCycle,
          dayInCycle: 1,
          currentDayAvailableOn: currentDate,
          status: initialPeriodComplete ? STATUS.INITIAL_PERIOD_COMPLETE : STATUS.ACTIVE,
          feedbackJustGiven: false,
          cycleJustEnded: true,
        };
      }
      return {
        ...s,
        dayInCycle: s.dayInCycle + 1,
        currentDayAvailableOn: currentDate,
        feedbackJustGiven: false,
        cycleJustEnded: false,
      };
    });
  }, []);

  const acknowledgeTransition = useCallback(() => {
    setState((s) => ({ ...s, cycleJustEnded: false }));
  }, []);

  const acknowledgeDiagnosisResult = useCallback(() => {
    setState((s) => ({ ...s, diagnosisJustCompleted: false }));
  }, []);

  const continueAfterInitialPeriod = useCallback(() => {
    setState((s) => ({ ...s, continuedAfterInitialPeriod: true, status: STATUS.ACTIVE }));
  }, []);

  const setDailyReminder = useCallback(async ({ enabled, time }) => {
    if (!enabled) {
      await cancelDailyReminder();
      const result = {
        enabled: false,
        time,
        permission: 'unknown',
        scheduled: false,
        lastScheduledAt: null,
        error: null,
      };
      setState((s) => ({
        ...s,
        reminder: {
          ...s.reminder,
          ...result,
        },
      }));
      return result;
    }

    try {
      const result = await scheduleDailyReminder(time);
      setState((s) => ({
        ...s,
        reminder: {
          ...s.reminder,
          ...result,
        },
      }));
      return result;
    } catch (error) {
      const result = {
        enabled: false,
        time,
        permission: 'unknown',
        scheduled: false,
        lastScheduledAt: null,
        error: error instanceof Error ? error.message : 'No s’ha pogut configurar el recordatori',
      };
      setState((s) => ({
        ...s,
        reminder: {
          ...s.reminder,
          ...result,
        },
      }));
      return result;
    }
  }, []);

  const restartFromDiagnostic = useCallback(() => {
    setState((s) => ({
      ...initialState,
      status: STATUS.DIAGNOSTIC,
      continuedAfterInitialPeriod: s.continuedAfterInitialPeriod,
    }));
  }, []);

  const resetAll = useCallback(() => {
    void clearDurableState();
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
  const hasDiagnostic = state.entryMode === 'diagnostic' && state.diagnosisAnswers.length > 0;
  const dayFeedback = useMemo(
    () => state.feedback.find((entry) => entry.cycle === state.cycleNumber && entry.day === state.dayInCycle) || null,
    [state.feedback, state.cycleNumber, state.dayInCycle]
  );
  const currentDayCompleted = state.feedbackJustGiven || Boolean(dayFeedback) || isToday7;
  const canAdvanceDay = currentDayCompleted && todayKey > (state.currentDayAvailableOn || todayKey);

  const value = {
    state,
    storageReady,
    todayAction,
    todayArea,
    todayGuidance,
    hasDiagnostic,
    isToday7,
    dayFeedback,
    currentDayCompleted,
    canAdvanceDay,
    startDiagnostic,
    startStarterCycle,
    completeDiagnostic,
    submitFeedback,
    advanceDay,
    acknowledgeTransition,
    acknowledgeDiagnosisResult,
    continueAfterInitialPeriod,
    setDailyReminder,
    restartFromDiagnostic,
    resetAll,
  };

  return <ArrelContext.Provider value={value}>{children}</ArrelContext.Provider>;
}
