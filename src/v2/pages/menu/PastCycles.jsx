import { Link } from 'react-router-dom';
import { useArrel } from '../../state/useArrel.js';
import Shell from '../../components/Shell.jsx';
import CycleDots from '../../components/CycleDots.jsx';
import { AREA_LABELS, CYCLE_LENGTH, FEEDBACK, STATUS } from '../../lib/types.js';

const FEEDBACK_LABEL = {
  [FEEDBACK.DONE]: 'hi és',
  [FEEDBACK.PARTIAL]: 'amb esforç',
  [FEEDBACK.SKIPPED]: 'ho deixo per avui',
};

function groupByCycle(feedback) {
  const map = new Map();

  for (const entry of feedback) {
    if (!map.has(entry.cycle)) map.set(entry.cycle, []);
    map.get(entry.cycle).push(entry);
  }

  return Array.from(map.entries())
    .map(([cycle, entries]) => [cycle, entries.sort((a, b) => a.day - b.day)])
    .sort((a, b) => b[0] - a[0]);
}

function getEmptyAction(status) {
  if (status === STATUS.NEW) {
    return { to: '/inici', label: 'Triar per on començar' };
  }

  if (status === STATUS.INITIAL_PERIOD_COMPLETE) {
    return { to: '/app', label: 'Veure opcions per continuar' };
  }

  return { to: '/app', label: 'Obrir la prova d’avui' };
}

export default function PastCycles() {
  const { state } = useArrel();
  const grouped = groupByCycle(state.feedback);
  const emptyAction = getEmptyAction(state.status);

  return (
    <Shell showBack backTo="/menu">
      <div className="flex-1 flex flex-col pt-8 pb-8 gap-6">
        <div>
          <p className="v2-kicker mb-4">Històric</p>
          <h2 className="text-3xl font-medium text-balance max-w-sm">
            {grouped.length === 0 ? 'Encara cap prova guardada.' : 'Proves guardades.'}
          </h2>
        </div>

        {grouped.length === 0 ? (
          <div className="v2-panel">
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Quan tanquis una prova, apareixerà aquí amb la lectura i la nota opcional.
            </p>
            <Link to={emptyAction.to} className="btn btn-primary w-full mt-5">
              {emptyAction.label}
            </Link>
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {grouped.map(([cycleNum, entries]) => {
              const area = entries[0]?.area;
              const visibleDay = cycleNum === state.cycleNumber
                ? state.dayInCycle
                : CYCLE_LENGTH;

              return (
                <li key={cycleNum} className="v2-panel">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-lg text-[var(--text-primary)]">Cicle {cycleNum}</span>
                    <span className="text-xs text-[var(--text-tertiary)]">
                      {area ? AREA_LABELS[area] : ''}
                    </span>
                  </div>
                  <CycleDots
                    dayInCycle={visibleDay}
                    feedback={entries}
                    cycleNumber={cycleNum}
                    className="mt-4 justify-start"
                  />

                  <div className="flex flex-col gap-3 mt-4">
                    {entries.map((entry) => (
                      <div
                        key={`${entry.cycle}-${entry.day}`}
                        className="rounded-lg border border-[var(--border-subtle)] px-4 py-3"
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="text-sm text-[var(--text-primary)]">Dia {entry.day}</span>
                          <span className="text-xs text-[var(--text-tertiary)]">
                            {FEEDBACK_LABEL[entry.value]}
                          </span>
                        </div>
                        {entry.text ? (
                          <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                            {entry.text}
                          </p>
                        ) : null}
                        {entry.note ? (
                          <p className="mt-2 text-sm text-[var(--text-primary)] leading-relaxed">
                            {entry.note}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Shell>
  );
}
