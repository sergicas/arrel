import { useArrel } from '../../state/ArrelContext.jsx';
import Shell from '../../components/Shell.jsx';
import { AREA_LABELS, FEEDBACK } from '../../lib/types.js';

const FEEDBACK_LABEL = {
  [FEEDBACK.DONE]: 'fet',
  [FEEDBACK.PARTIAL]: 'parcial',
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
      <div className="flex-1 flex flex-col pt-8 pb-8">
        <h2 className="text-xl font-light mb-8">Cicles passats</h2>

        {grouped.length === 0 ? (
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Encara no hi ha cicles tancats. Torna aquí després del primer dia 7.
          </p>
        ) : (
          <ul className="flex flex-col gap-8">
            {grouped.map(([cycleNum, entries]) => {
              const area = entries[0]?.area;
              return (
                <li key={cycleNum} className="flex flex-col gap-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-base">Cicle {cycleNum}</span>
                    <span className="text-xs text-[var(--text-tertiary)] tracking-wide">
                      {area ? AREA_LABELS[area] : ''}
                    </span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {entries.map((e) => (
                      <span
                        key={`${e.cycle}-${e.day}`}
                        className="text-xs px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                      >
                        dia {e.day}: {FEEDBACK_LABEL[e.value]}
                      </span>
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
