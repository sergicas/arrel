import { Check, Circle, Minus, X } from 'lucide-react';
import { CYCLE_LENGTH, FEEDBACK } from '../lib/types.js';

const STATUS_LABELS = {
  [FEEDBACK.DONE]: 'hi és',
  [FEEDBACK.PARTIAL]: 'amb esforç',
  [FEEDBACK.SKIPPED]: 'ho deixo per avui',
  today: 'avui',
  rest: 'lectura',
  pending: 'pendent',
};

const STATUS_ICONS = {
  [FEEDBACK.DONE]: Check,
  [FEEDBACK.PARTIAL]: Minus,
  [FEEDBACK.SKIPPED]: X,
  rest: Circle,
};

function getEntryForDay(feedback, cycleNumber, day) {
  return feedback.find((entry) => {
    if (entry.day !== day) return false;
    return cycleNumber ? entry.cycle === cycleNumber : true;
  });
}

export default function CycleDots({ dayInCycle, feedback = [], cycleNumber = null, className = '' }) {
  const dots = Array.from({ length: CYCLE_LENGTH }, (_, i) => i + 1);

  return (
    <ol
      className={`v2-cycle-dots ${className}`}
      aria-label={`Dia ${dayInCycle} de ${CYCLE_LENGTH}`}
    >
      {dots.map((d) => {
        const entry = getEntryForDay(feedback, cycleNumber, d);
        const isToday = d === dayInCycle;
        const isRestSlot = d === CYCLE_LENGTH;
        const status = entry?.value || (isRestSlot ? 'rest' : isToday ? 'today' : 'pending');
        const Icon = STATUS_ICONS[status];
        const label = `Dia ${d}: ${STATUS_LABELS[status] || 'pendent'}`;

        return (
          <li key={d} className="v2-cycle-dot-item">
            <span
              className={`v2-cycle-dot is-${status} ${isToday ? 'is-today' : ''}`}
              aria-label={label}
              title={label}
            >
              {Icon ? <Icon size={11} strokeWidth={2.5} aria-hidden="true" /> : <span aria-hidden="true">{d}</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
