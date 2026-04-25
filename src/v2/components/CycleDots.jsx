import { CYCLE_LENGTH } from '../lib/types.js';

export default function CycleDots({ dayInCycle, isRest = false }) {
  const dots = Array.from({ length: CYCLE_LENGTH }, (_, i) => i + 1);

  return (
    <div
      className="flex items-center justify-center gap-3"
      role="img"
      aria-label={`Dia ${dayInCycle} de ${CYCLE_LENGTH}`}
    >
      {dots.map((d) => {
        const isToday = d === dayInCycle;
        const isPast = d < dayInCycle;
        const isRestSlot = d === CYCLE_LENGTH;

        let className = 'w-2 h-2 rounded-full transition-all';
        if (isRestSlot) {
          className += isToday ? ' bg-[var(--text-primary)] opacity-60' : ' border border-[var(--text-tertiary)] border-dashed';
        } else if (isToday) {
          className += ' bg-[var(--text-primary)] w-2.5 h-2.5';
        } else if (isPast) {
          className += ' bg-[var(--text-tertiary)]';
        } else {
          className += ' border border-[var(--text-tertiary)] border-opacity-50';
        }

        return <span key={d} className={className} />;
      })}
    </div>
  );
}
