import { useEffect, useState } from 'react';
import { useArrel } from '../state/useArrel.js';
import Shell from '../components/Shell.jsx';
import CycleDots from '../components/CycleDots.jsx';
import ArrelMascot from '../components/ArrelMascot.jsx';
import { getLocalDateKey } from '../lib/storage.js';
import { FEEDBACK } from '../lib/types.js';

const FEEDBACK_LABELS = {
  [FEEDBACK.DONE]: 'Fet',
  [FEEDBACK.PARTIAL]: 'Mig',
  [FEEDBACK.SKIPPED]: 'No fet',
};

export default function Rest() {
  const { state, canAdvanceDay, advanceDay } = useArrel();
  const [now, setNow] = useState(() => new Date());
  const cycleEntries = state.feedback
    .filter((entry) => entry.cycle === state.cycleNumber)
    .sort((a, b) => a.day - b.day);
  const doneCount = cycleEntries.filter((entry) => entry.value === FEEDBACK.DONE).length;
  const partialCount = cycleEntries.filter((entry) => entry.value === FEEDBACK.PARTIAL).length;
  const dayCanOpenNow = canAdvanceDay
    || getLocalDateKey(now) > (state.currentDayAvailableOn || getLocalDateKey(now));

  useEffect(() => {
    if (dayCanOpenNow) return undefined;
    const interval = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(interval);
  }, [dayCanOpenNow]);

  return (
    <Shell showBack backTo="/inici" showMenu>
      <div className="flex-1 flex flex-col">
        <p className="text-sm text-[var(--text-tertiary)] pt-6">
          Cicle {state.cycleNumber} · dia {state.dayInCycle}
        </p>

        <div className="flex-1 flex flex-col justify-center py-12">
          <div className="v2-hero-card v2-rest-card text-center">
            <div className="v2-card-mascot">
              <ArrelMascot mood="rest" />
            </div>
            <p className="v2-panel-label mb-4">Dia 7 · tancament</p>
            <p className="text-3xl mb-5 text-balance font-medium">Avui no toca empènyer.</p>
            <p className="text-[var(--text-secondary)] max-w-xs mx-auto leading-relaxed">
              El setè dia serveix per deixar reposar el cicle i mirar què s&apos;ha mogut
              abans d&apos;obrir el següent.
            </p>
          </div>

          <section className="v2-panel v2-cycle-summary mt-5" aria-label="Resum del cicle">
            <p className="v2-panel-label mb-4">Resum del cicle</p>
            <div className="v2-cycle-summary-grid">
              <span>
                <strong>{cycleEntries.length}</strong>
                <small>dies marcats</small>
              </span>
              <span>
                <strong>{doneCount}</strong>
                <small>fets</small>
              </span>
              <span>
                <strong>{partialCount}</strong>
                <small>mig fets</small>
              </span>
            </div>

            {cycleEntries.length > 0 ? (
              <div className="v2-cycle-entry-list">
                {cycleEntries.map((entry) => (
                  <article key={`${entry.cycle}-${entry.day}`} className="v2-cycle-entry">
                    <span className="v2-cycle-entry-day">Dia {entry.day}</span>
                    <div>
                      <p>{entry.text}</p>
                      {entry.duration ? <small>{entry.duration}</small> : null}
                    </div>
                    <span className={`v2-feedback-pill is-${entry.value}`}>
                      {FEEDBACK_LABELS[entry.value] || 'Marcat'}
                    </span>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Encara no hi ha marques guardades en aquest cicle. Quan tanquis accions,
                aquí hi veuràs la teva petjada.
              </p>
            )}
          </section>

          <button onClick={advanceDay} disabled={!dayCanOpenNow} className="btn btn-primary mt-8">
            {dayCanOpenNow ? 'Tancar el cicle' : 'El cicle nou s’obre demà'}
          </button>
        </div>

        <div className="pb-2">
          <CycleDots
            dayInCycle={state.dayInCycle}
            feedback={state.feedback}
            cycleNumber={state.cycleNumber}
          />
        </div>
      </div>
    </Shell>
  );
}
