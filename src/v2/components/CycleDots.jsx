import { CYCLE_LENGTH } from '../lib/types.js';

export default function CycleDots({ dayInCycle }) {
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

        let className = 'h-2 rounded-full transition-all duration-300';
        if (isRestSlot) {
          className += isToday
            ? ' w-8 bg-[var(--accent-earth)] opacity-70'
            : ' w-2.5 border border-[var(--text-tertiary)] border-dashed';
        } else if (isToday) {
          className += ' w-7 bg-[var(--text-primary)]';
        } else if (isPast) {
          className += ' w-2.5 bg-[var(--accent-primary)] opacity-50';
        } else {
          className += ' w-2.5 border border-[var(--text-tertiary)] border-opacity-50';
        }

        return <span key={d} className={className} />;
      })}
    </div>
  );
}
