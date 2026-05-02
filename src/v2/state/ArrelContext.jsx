import { useEffect, useState, useCallback, useMemo } from 'react';
import { ArrelContext } from './arrelContextValue.js';
import {
  loadDurableState,
  saveDurableState,
  clearDurableState,
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
import { getNextStepAvailableAt, isAcceleratedPace, isStepAvailable, normalizePace } from '../lib/pace.js';
import { cancelDailyReminder, scheduleDailyReminder } from '../lib/reminders.js';
import { buildCycleReadingPayload, generateMockCycleReading } from '../lib/cycleReading.js';
import { getAiReading, getDailyCoachInsight } from '../lib/aiService.js';
import { getDailyCoachDecision } from '../lib/dailyCoach.js';
import { analyzeUserStyle } from '../lib/toneEngine.js';
import { assessBurnoutRisk } from '../lib/riskEngine.js';
import { synthesizeIdentity } from '../lib/identityEngine.js';

function hasFeedbackForDay(feedback, cycleNumber, dayInCycle) {
  return feedback.some((entry) => entry.cycle === cycleNumber && entry.day === dayInCycle);
}

function isCurrentDayCompleted(state) {
  return (
    state.feedbackJustGiven
    || isRestDay(state.dayInCycle)
    || hasFeedbackForDay(state.feedback, state.cycleNumber, state.dayInCycle)
  );
}

function canAdvanceState(state, date = new Date()) {
  if (!isCurrentDayCompleted(state)) return false;
  if (isAcceleratedPace(state.pace)) return true;
  if (state.nextDayAvailableAt) return isStepAvailable(state.nextDayAvailableAt, date);
  return getLocalDateKey(date) > (state.currentDayAvailableOn || getLocalDateKey(date));
}

function nextCycleAfterCurrentProgress(state) {
  const highestFeedbackCycle = Math.max(0, ...(state.feedback || []).map((entry) => Number(entry.cycle) || 0));
  const currentCycle = Number(state.cycleNumber) || 1;
  const hasProgress = state.status !== STATUS.NEW || Boolean(state.primaryArea) || highestFeedbackCycle > 0;

  if (!hasProgress) return 1;
  return Math.max(currentCycle + 1, highestFeedbackCycle + 1, 1);
}

export function ArrelProvider({ children }) {
  const [state, setState] = useState(initialState);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    let active = true;

    async function init() {
      const durableState = await loadDurableState();
      if (active) {
        setState(durableState);
        setStorageReady(true);
      }
    }

    void init();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    void saveDurableState(state);
  }, [state, storageReady]);

  const startDiagnostic = useCallback(({ preservePendingResult = false } = {}) => {
    setState((s) => ({
      ...s,
      diagnosisJustCompleted: preservePendingResult ? s.diagnosisJustCompleted : false,
      cycleJustEnded: false,
    }));
  }, []);

  const startStarterCycle = useCallback((area = AREAS.STRESS) => {
    const primaryArea = Object.values(AREAS).includes(area) ? area : AREAS.STRESS;

    setState((s) => {
      const cycleNumber = s.diagnosisJustCompleted ? s.cycleNumber : nextCycleAfterCurrentProgress(s);
      return {
        ...s,
        status: STATUS.ACTIVE,
        entryMode: 'starter',
        primaryArea,
        secondaryArea: null,
        currentCycleArea: primaryArea,
        diagnosisAnswers: [],
        diagnosisScores: null,
        cycleNumber,
        dayInCycle: 1,
        currentDayAvailableOn: getLocalDateKey(),
        nextDayAvailableAt: null,
        feedback: s.feedback || [],
        feedbackJustGiven: false,
        diagnosisJustCompleted: false,
        cycleJustEnded: false,
      };
    });
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
      currentCycleArea: primary,
      diagnosisScores: scores,
      cycleNumber: s.diagnosisJustCompleted ? s.cycleNumber : nextCycleAfterCurrentProgress(s),
      dayInCycle: 1,
      currentDayAvailableOn: getLocalDateKey(),
      nextDayAvailableAt: null,
      feedback: s.feedback,
      feedbackJustGiven: false,
      diagnosisJustCompleted: true,
      cycleJustEnded: false,
    }));
  }, []);

  const restartFromDiagnostic = useCallback(() => {
    setState((s) => ({
      ...s,
      diagnosisJustCompleted: false,
      cycleJustEnded: false,
    }));
  }, []);

  const resetAll = useCallback(() => {
    void clearDurableState();
    setState({ ...initialState });
  }, []);

  const setAiEnabled = useCallback((enabled) => {
    setState((s) => ({ ...s, aiEnabled: Boolean(enabled) }));
  }, []);

  const localCoachDecision = useMemo(
    () => getDailyCoachDecision(state),
    [state]
  );

  const [aiCoachDecision, setAiCoachDecision] = useState(null);

  useEffect(() => {
    let active = true;
    if (state.status === STATUS.ACTIVE && !isRestDay(state.dayInCycle) && state.aiEnabled) {
      getDailyCoachInsight(state).then((insight) => {
        if (active) setAiCoachDecision(insight);
      });
    }
    return () => { 
      active = false;
      setAiCoachDecision(null); 
    };
  }, [state.cycleNumber, state.dayInCycle, state.status, state.aiEnabled]);

  const coachDecision = aiCoachDecision || localCoachDecision;

  const userStyle = useMemo(
    () => analyzeUserStyle(state.feedback),
    [state.feedback]
  );

  const burnoutRisk = useMemo(
    () => assessBurnoutRisk(state),
    [state]
  );

  const userIdentity = useMemo(
    () => synthesizeIdentity(state),
    [state]
  );

  const todayAction = useMemo(() => {
    if (!state.primaryArea) return null;
    const action = getActionForDay(state.cycleNumber, state.dayInCycle, state.primaryArea, state.currentCycleArea);

    if (coachDecision.difficulty === 'easy' && action?.metadata?.nextSmallStep) {
      return {
        ...action,
        originalText: action.text,
        text: action.metadata.nextSmallStep,
        isAdapted: true,
      };
    }

    return action;
  }, [state.cycleNumber, state.dayInCycle, state.primaryArea, state.currentCycleArea, coachDecision]);

  const submitFeedback = useCallback(
    (value, note = '') => {
      setState((s) => {
        if (s.feedbackJustGiven || hasFeedbackForDay(s.feedback, s.cycleNumber, s.dayInCycle)) return s;
        const action = todayAction;
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
          nextDayAvailableAt: getNextStepAvailableAt(s.pace, new Date()),
        };
      });
    },
    [todayAction]
  );

  const advanceDay = useCallback(() => {
    setState((s) => {
      const now = new Date();
      const currentDate = getLocalDateKey();
      const availableOn = s.currentDayAvailableOn || currentDate;
      const isRest = isRestDay(s.dayInCycle);
      const completed = isRest || hasFeedbackForDay(s.feedback, s.cycleNumber, s.dayInCycle);

      if (!completed) return s;

      const canOpenNext = isAcceleratedPace(s.pace)
        || (s.nextDayAvailableAt ? isStepAvailable(s.nextDayAvailableAt, now) : currentDate > availableOn);
      if (!canOpenNext) return s;

      if (isCycleEnd(s.dayInCycle)) {
        const newCycle = s.cycleNumber + 1;
        const initialPeriodComplete = newCycle > INITIAL_GUIDED_CYCLES && !s.continuedAfterInitialPeriod;
        const currentCycleArea = getAreaForCycle(newCycle, s.primaryArea);
        return {
          ...s,
          cycleNumber: newCycle,
          currentCycleArea,
          dayInCycle: 1,
          currentDayAvailableOn: currentDate,
          nextDayAvailableAt: null,
          status: initialPeriodComplete ? STATUS.INITIAL_PERIOD_COMPLETE : STATUS.ACTIVE,
          feedbackJustGiven: false,
          cycleJustEnded: true,
        };
      }
      const nextDay = s.dayInCycle + 1;
      return {
        ...s,
        dayInCycle: nextDay,
        currentDayAvailableOn: currentDate,
        nextDayAvailableAt: isRestDay(nextDay) ? getNextStepAvailableAt(s.pace, now) : null,
        feedbackJustGiven: false,
        cycleJustEnded: false,
      };
    });
  }, []);

  const setPace = useCallback((pace) => {
    setState((s) => {
      const normalized = normalizePace(pace);
      return {
        ...s,
        pace: normalized,
        nextDayAvailableAt: isCurrentDayCompleted(s)
          ? getNextStepAvailableAt(normalized, new Date())
          : s.nextDayAvailableAt,
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

  const generateCycleReading = useCallback(async () => {
    const payload = buildCycleReadingPayload(state);
    const reading = state.aiEnabled
      ? await getAiReading(payload, state)
      : { ...generateMockCycleReading(payload), isRealAi: false };
    
    setState((s) => {
      const cycleReadings = Array.isArray(s.cycleReadings) ? s.cycleReadings : [];
      return {
        ...s,
        cycleReadings: [
          ...cycleReadings.filter((entry) => entry.cycle !== payload.cycleNumber),
          {
            cycle: payload.cycleNumber,
            createdAt: Date.now(),
            reading,
          },
        ],
      };
    });
  }, [state]);

  const todayArea = useMemo(() => {
    if (!state.primaryArea) return null;
    return getAreaForCycle(state.cycleNumber, state.primaryArea, state.currentCycleArea);
  }, [state.cycleNumber, state.primaryArea, state.currentCycleArea]);

  const isToday7 = isRestDay(state.dayInCycle);
  const todayGuidance = todayArea ? AREA_GUIDANCE[todayArea] : null;
  const hasDiagnostic = state.entryMode === 'diagnostic' && state.diagnosisAnswers.length > 0;
  const dayFeedback = useMemo(
    () => state.feedback.find((entry) => entry.cycle === state.cycleNumber && entry.day === state.dayInCycle) || null,
    [state.feedback, state.cycleNumber, state.dayInCycle]
  );
  const currentDayCompleted = state.feedbackJustGiven || Boolean(dayFeedback) || isToday7;
  const canAdvanceDay = canAdvanceState(state);

  const value = {
    state,
    storageReady,
    todayAction,
    todayArea,
    todayGuidance,
    coachDecision,
    userStyle,
    burnoutRisk,
    userIdentity,
    hasDiagnostic,
    isToday7,
    dayFeedback,
    currentDayCompleted,
    canAdvanceDay,
    setAiEnabled,
    startDiagnostic,
    startStarterCycle,
    completeDiagnostic,
    submitFeedback,
    advanceDay,
    setPace,
    acknowledgeTransition,
    acknowledgeDiagnosisResult,
    continueAfterInitialPeriod,
    setDailyReminder,
    generateCycleReading,
    restartFromDiagnostic,
    resetAll,
  };

  return (
    <ArrelContext.Provider value={value}>
      {storageReady ? children : (
        <main className="v2-app-loading" aria-label="Carregant Arrel">
          <div className="v2-app-loading-mark" aria-hidden="true">A</div>
          <p>Carregant Arrel...</p>
        </main>
      )}
    </ArrelContext.Provider>
  );
}
