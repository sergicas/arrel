import { useArrel } from '../../state/useArrel.js';
import Shell from '../../components/Shell.jsx';
import { AREA_LABELS, FEEDBACK } from '../../lib/types.js';

const FEEDBACK_LABEL = {
  [FEEDBACK.DONE]: 'fet',
  [FEEDBACK.PARTIAL]: 'a mig fer',
  [FEEDBACK.SKIPPED]: 'no fet',
};

function groupByCycle(feedback) {
  const map = new Map();

  for (const entry of feedback) {
    if (!map.has(entry.cycle)) map.set(entry.cycle, []);
    map.get(entry.cycle).push(entry);
  }

  return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
}

export default function PastCycles() {
  const { state } = useArrel();
  const grouped = groupByCycle(state.feedback);

  return (
    <Shell showBack backTo="/menu">
      <div className="flex-1 flex flex-col pt-8 pb-8 gap-6">
        <div>
          <p className="v2-kicker mb-4">Històric</p>
          <h2 className="text-3xl font-medium text-balance max-w-sm">Cicles passats</h2>
        </div>

        {grouped.length === 0 ? (
          <div className="v2-panel">
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Encara no hi ha cicles tancats. Torna aquí després del primer dia 7.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {grouped.map(([cycleNum, entries]) => {
              const area = entries[0]?.area;

              return (
                <li key={cycleNum} className="v2-panel">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-lg text-[var(--text-primary)]">Cicle {cycleNum}</span>
                    <span className="text-xs text-[var(--text-tertiary)] tracking-wide">
                      {area ? AREA_LABELS[area] : ''}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 mt-4">
                    {entries.map((entry) => (
                      <div
                        key={`${entry.cycle}-${entry.day}`}
                        className="rounded-[16px] border border-[var(--border-subtle)] px-4 py-3"
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
