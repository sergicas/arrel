import Shell from '../../components/Shell.jsx';
import { AREAS, AREA_LABELS, AREA_DESCRIPTIONS } from '../../lib/types.js';

const ORDER = [
  AREAS.PHYSICAL,
  AREAS.COGNITIVE,
  AREAS.STRESS,
  AREAS.RELATIONAL,
  AREAS.IDENTITY,
];

export default function Areas() {
  return (
    <Shell showBack backTo="/menu">
      <div className="flex-1 flex flex-col pt-8 pb-8">
        <h2 className="text-xl font-light mb-8">Les cinc àrees</h2>
        <ul className="flex flex-col gap-8">
          {ORDER.map((a) => (
            <li key={a} className="flex flex-col gap-2">
              <span className="text-base">{AREA_LABELS[a]}</span>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {AREA_DESCRIPTIONS[a]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}
