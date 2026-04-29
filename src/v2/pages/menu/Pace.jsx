import { Activity, Check, Clock3, Zap } from 'lucide-react';
import Shell from '../../components/Shell.jsx';
import { useArrel } from '../../state/useArrel.js';
import { PACE, PACE_OPTIONS, PACE_ORDER } from '../../lib/types.js';
import { normalizePace } from '../../lib/pace.js';

const ICONS = {
  [PACE.SLOW]: Clock3,
  [PACE.REGULAR]: Activity,
  [PACE.ACCELERATED]: Zap,
};

export default function Pace() {
  const { state, setPace } = useArrel();
  const activePace = normalizePace(state.pace);

  return (
    <Shell showBack backTo="/menu">
      <div className="flex-1 flex flex-col pt-8 pb-8 gap-6">
        <div>
          <p className="v2-kicker mb-4">Ritme</p>
          <h2 className="text-3xl font-medium text-balance max-w-sm">
            Tria com vols avançar.
          </h2>
        </div>

        <div className="v2-panel">
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Tria cada quan vols obrir una prova nova. Pots canviar-ho en qualsevol moment.
          </p>
        </div>

        <div className="v2-pace-list" role="radiogroup" aria-label="Ritme de proves">
          {PACE_ORDER.map((pace) => {
            const option = PACE_OPTIONS[pace];
            const Icon = ICONS[pace];
            const active = activePace === pace;

            return (
              <button
                key={pace}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setPace(pace)}
                className={`v2-pace-card ${active ? 'is-selected' : ''}`}
              >
                <span className="v2-pace-icon">
                  <Icon size={19} />
                </span>
                <span className="v2-pace-copy">
                  <strong>{option.label}</strong>
                  <small>{option.meta}</small>
                  <em>{option.description}</em>
                </span>
                {active ? <Check className="v2-pace-check" size={18} /> : null}
              </button>
            );
          })}
        </div>

        <div className="v2-panel">
          <p className="v2-panel-label mb-3">Canvi de ritme</p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Si acabes una prova i canvies el ritme, Arrel recalcula quan pots obrir
            la següent.
          </p>
        </div>
      </div>
    </Shell>
  );
}
