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
      <div className="flex-1 flex flex-col pt-8 pb-8 gap-6">
        <div>
          <p className="v2-kicker mb-4">Les cinc àrees</p>
          <h2 className="text-3xl font-medium text-balance max-w-sm">
            Arrel treballa sempre sobre un sol focus cada cicle.
          </h2>
        </div>

        <ul className="flex flex-col gap-4">
          {ORDER.map((area) => (
            <li key={area} className="v2-panel">
              <div className="flex items-center justify-between gap-3">
                <span className="text-lg text-[var(--text-primary)]">{AREA_LABELS[area]}</span>
                <span className="v2-chip">cicle de 7 dies</span>
              </div>
              <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                {AREA_DESCRIPTIONS[area]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}
