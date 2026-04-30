import { useEffect, useMemo, useState } from 'react';
import {
  Check,
  CirclePause,
  CirclePlay,
  CircleSlash,
  PencilLine,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { useArrel } from '../state/useArrel.js';
import Shell from '../components/Shell.jsx';
import CycleDots from '../components/CycleDots.jsx';
import ArrelMascot from '../components/ArrelMascot.jsx';
import { getLocalDateKey } from '../lib/storage.js';
import { AREA_ACCENTS, AREA_ACCENT_SOFT, AREA_LABELS, AREAS, FEEDBACK } from '../lib/types.js';
import { isRestDay } from '../lib/engine.js';
import {
  formatWaitDuration,
  getMinutesUntilAvailable,
  getPaceOption,
  isAcceleratedPace,
  isStepAvailable,
} from '../lib/pace.js';

const FEEDBACK_ITEMS = [
  {
    value: FEEDBACK.DONE,
    label: 'Hi és',
    description: 'L’has pogut fer.',
    icon: Check,
  },
  {
    value: FEEDBACK.PARTIAL,
    label: 'Amb esforç',
    description: 'Ha demanat una mica més.',
    icon: Sparkles,
  },
  {
    value: FEEDBACK.SKIPPED,
    label: 'Avui no',
    description: 'No l’has fet avui.',
    icon: CircleSlash,
  },
];

const AREA_ORDER = [
  AREAS.PHYSICAL,
  AREAS.COGNITIVE,
  AREAS.STRESS,
  AREAS.RELATIONAL,
  AREAS.IDENTITY,
];

function durationToMinutes(duration) {
  const match = duration?.match(/\d+/);
  if (!match) return 5;
  return Math.max(1, Number(match[0]));
}

function formatSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${String(rest).padStart(2, '0')}`;
}

function getMascotMood({ feedbackJustGiven, dayFeedback, previousDayFeedback }) {
  const visibleFeedback = dayFeedback || previousDayFeedback;

  if (feedbackJustGiven) return 'celebrate';
  if (!visibleFeedback) return 'action';
  if (visibleFeedback.value === FEEDBACK.SKIPPED) return 'rest';
  return 'celebrate';
}

export default function Today() {
  const {
    state,
    todayAction,
    todayArea,
    todayGuidance,
    hasDiagnostic,
    dayFeedback,
    currentDayCompleted,
    canAdvanceDay,
    submitFeedback,
    advanceDay,
  } = useArrel();
  const dayKey = `${state.cycleNumber}-${state.dayInCycle}`;
  const totalSeconds = useMemo(
    () => durationToMinutes(todayAction?.duration) * 60,
    [todayAction?.duration]
  );
  const [draft, setDraft] = useState({ dayKey, selectedFeedback: null, note: '' });
  const [timer, setTimer] = useState({
    dayKey,
    totalSeconds,
    secondsLeft: totalSeconds,
    active: false,
    completed: false,
  });
  const [now, setNow] = useState(() => new Date());
  const selectedFeedback = draft.dayKey === dayKey ? draft.selectedFeedback : null;
  const note = draft.dayKey === dayKey ? draft.note : '';
  const currentTimer = timer.dayKey === dayKey ? timer : {
    dayKey,
    totalSeconds,
    secondsLeft: totalSeconds,
    active: false,
    completed: false,
  };
  const timerProgress = Math.round(((totalSeconds - currentTimer.secondsLeft) / totalSeconds) * 100);
  const areaLabel = todayArea ? AREA_LABELS[todayArea] : 'Avui';
  const paceOption = getPaceOption(state.pace);
  const nextStepIsRest = isRestDay(state.dayInCycle + 1);
  const nextStepTimerLabel = nextStepIsRest ? 'Temps fins al descans' : 'Temps fins a la prova següent';
  const openNextLabel = nextStepIsRest ? paceOption.availableRestButton : paceOption.availableButton;
  const areaStyle = {
    '--area-accent': AREA_ACCENTS[todayArea] || '#c9583b',
    '--area-soft': AREA_ACCENT_SOFT[todayArea] || 'rgba(201, 88, 59, 0.16)',
  };
  const rankedAreas = useMemo(() => {
    const scores = state.diagnosisScores || {};
    return AREA_ORDER
      .map((area) => ({ area, score: scores[area] || 0 }))
      .sort((a, b) => b.score - a.score);
  }, [state.diagnosisScores]);
  const maxScore = Math.max(...rankedAreas.map((entry) => entry.score), 1);
  const previousDayFeedback = useMemo(() => {
    if (state.dayInCycle <= 1) return null;
    return (state.feedback || []).find((entry) => (
      entry.cycle === state.cycleNumber && entry.day === state.dayInCycle - 1
    )) || null;
  }, [state.cycleNumber, state.dayInCycle, state.feedback]);
  const mascotMood = getMascotMood({
    feedbackJustGiven: state.feedbackJustGiven,
    dayFeedback,
    previousDayFeedback,
  });
  const dayCanOpenNow = canAdvanceDay || (
    currentDayCompleted
    && (
      isAcceleratedPace(state.pace)
      || isStepAvailable(state.nextDayAvailableAt, now)
      || (!state.nextDayAvailableAt && getLocalDateKey(now) > (state.currentDayAvailableOn || getLocalDateKey(now)))
    )
  );
  const minutesUntilNext = state.nextDayAvailableAt
    ? getMinutesUntilAvailable(state.nextDayAvailableAt, now)
    : getMinutesUntilAvailable(new Date(new Date(now).setHours(24, 0, 0, 0)).toISOString(), now);
  const waitUntilNext = formatWaitDuration(minutesUntilNext);

  useEffect(() => {
    if (!timer.active || timer.dayKey !== dayKey) return undefined;

    const interval = window.setInterval(() => {
      setTimer((current) => {
        if (!current.active || current.dayKey !== dayKey) return current;
        if (current.secondsLeft <= 1) {
          return { ...current, secondsLeft: 0, active: false, completed: true };
        }
        return { ...current, secondsLeft: current.secondsLeft - 1 };
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [dayKey, timer.active, timer.dayKey]);

  useEffect(() => {
    if (!currentDayCompleted || dayCanOpenNow) return undefined;

    const interval = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(interval);
  }, [currentDayCompleted, dayCanOpenNow]);

  const saveFeedback = () => {
    if (!selectedFeedback) return;
    submitFeedback(selectedFeedback, note.trim());
  };

  const startTimer = () => {
    setTimer((current) => ({
      ...(current.dayKey === dayKey ? current : { dayKey, totalSeconds, secondsLeft: totalSeconds, completed: false }),
      active: true,
    }));
  };

  const pauseTimer = () => {
    setTimer((current) => ({ ...current, active: false }));
  };

  const resetTimer = () => {
    setTimer({
      dayKey,
      totalSeconds,
      secondsLeft: totalSeconds,
      active: false,
      completed: false,
    });
  };

  return (
    <Shell showBack backTo="/inici" showMenu className="v2-ritual-shell">
      <div className="v2-ritual-day" style={areaStyle}>
        <section className="v2-day-ledger" aria-label="Prova d’avui">
          <div className="v2-day-mascot" data-mood={mascotMood}>
            <ArrelMascot mood={mascotMood} />
          </div>

          <div className="v2-ledger-meta">
            <span>Cicle {state.cycleNumber}</span>
            <span>Dia {state.dayInCycle}</span>
            {todayAction?.duration ? <span>{todayAction.duration}</span> : null}
            <span>Ritme {paceOption.label.toLowerCase()}</span>
            <span>{hasDiagnostic ? 'personalitzat' : 'inici'}</span>
          </div>

          <p className="v2-ledger-area">{areaLabel}</p>
          <h1 className="v2-ledger-action">{todayAction?.text}</h1>

          <div className="v2-ledger-rule">
            <span>Com fer-la</span>
            <p>
              Fes aquesta prova sense buscar nota ni marca. Quan acabis, tria
              una lectura: hi és, amb esforç o avui no.
            </p>
          </div>
        </section>

        {!currentDayCompleted ? (
          <section className="v2-action-guide" aria-label="Guia curta de la prova">
            <div className="v2-guide-copy">
              <p className="v2-ritual-kicker">Guia curta</p>
              <h2>{currentTimer.completed ? 'Ja tens el temps fet.' : 'Fes la prova.'}</h2>
              <p>
                Quan acabis, marca el resultat.
              </p>
              {todayAction?.steps?.length ? (
                <ol className="v2-action-steps">
                  {todayAction.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              ) : null}
            </div>

            <div className="v2-timer-card">
              <div
                className="v2-timer-ring"
                style={{ '--timer-progress': `${timerProgress}%` }}
                aria-label={`Temps restant: ${formatSeconds(currentTimer.secondsLeft)}`}
              >
                <span>{formatSeconds(currentTimer.secondsLeft)}</span>
              </div>
              <div className="v2-timer-actions">
                {currentTimer.active ? (
                  <button type="button" onClick={pauseTimer}>
                    <CirclePause size={17} />
                    Pausar
                  </button>
                ) : (
                  <button type="button" onClick={startTimer} disabled={currentTimer.secondsLeft === 0}>
                    <CirclePlay size={17} />
                    Iniciar
                  </button>
                )}
                <button type="button" onClick={resetTimer}>
                  <RotateCcw size={16} />
                  Reiniciar
                </button>
              </div>
            </div>
          </section>
        ) : null}

        <section className={`v2-focus-panel ${hasDiagnostic ? 'is-diagnostic' : 'is-starter'}`}>
          <div className="v2-focus-panel-head">
            <span>
              <SlidersHorizontal size={16} />
            </span>
            <div>
              <p className="v2-ritual-kicker">
                {hasDiagnostic ? 'Capacitat personalitzada' : 'Capacitat d’inici'}
              </p>
              <h2>
                {hasDiagnostic
                  ? `Aquesta setmana: ${areaLabel}`
                  : `Aquesta setmana comences per ${areaLabel}`}
              </h2>
            </div>
          </div>

          {hasDiagnostic ? (
            <>
              <p>{todayGuidance}</p>
              <div className="v2-focus-bars" aria-label="Resultat resumit del focus">
                {rankedAreas.slice(0, 3).map(({ area, score }) => (
                  <div key={area} className="v2-focus-row">
                    <span>{AREA_LABELS[area]}</span>
                    <div className="v2-focus-track" aria-hidden="true">
                      <i style={{ width: `${Math.max((score / maxScore) * 100, score > 0 ? 12 : 4)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>
              {todayGuidance} Pots canviar la capacitat a Mapa &gt; Ajustar focus.
            </p>
          )}
        </section>

        {!currentDayCompleted ? (
          <section className="v2-mark-panel" aria-label="Lectura curta">
            <div className="v2-mark-head">
              <p className="v2-ritual-kicker">Lectura del dia</p>
              <h2>Què ha passat?</h2>
            </div>

            <div className="v2-stamp-grid">
              {FEEDBACK_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = selectedFeedback === item.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setDraft({ dayKey, selectedFeedback: item.value, note })}
                    className={`v2-stamp ${active ? 'is-selected' : ''}`}
                  >
                    <Icon size={18} />
                    <strong>{item.label}</strong>
                    <span>{item.description}</span>
                  </button>
                );
              })}
            </div>

            <label className="v2-note-field">
              <span>
                <PencilLine size={14} />
                Una línia opcional
              </span>
              <textarea
                value={note}
                onChange={(event) => setDraft({ dayKey, selectedFeedback, note: event.target.value })}
                rows={3}
                placeholder="Escriu què ha passat, si ho vols recordar."
              />
            </label>

            <button
              onClick={saveFeedback}
              disabled={!selectedFeedback}
              className="v2-commit-button"
            >
              Guardar la lectura
            </button>
          </section>
        ) : (
          <section className="v2-mark-panel is-closed">
            <p className="v2-ritual-kicker">Lectura desada</p>
            <h2>{paceOption.closedTitle}</h2>
            <p>
              {paceOption.closedCopy}
            </p>
            {!dayCanOpenNow ? (
              <div className="v2-next-day-card" aria-label={nextStepTimerLabel}>
                <span>{nextStepIsRest ? 'El descans' : 'La prova següent'} s’obre d’aquí a</span>
                <strong>{waitUntilNext}</strong>
              </div>
            ) : null}
            <button onClick={advanceDay} disabled={!dayCanOpenNow} className="v2-commit-button">
              {dayCanOpenNow ? openNextLabel : paceOption.unavailableButton}
            </button>
          </section>
        )}

        <CycleDots
          dayInCycle={state.dayInCycle}
          feedback={state.feedback}
          cycleNumber={state.cycleNumber}
        />
      </div>
    </Shell>
  );
}
