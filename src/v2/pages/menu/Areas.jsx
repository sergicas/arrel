import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Shell from '../../components/Shell.jsx';
import { AREAS, AREA_LABELS, AREA_DESCRIPTIONS, AREA_SLUGS, STATUS } from '../../lib/types.js';
import { useArrel } from '../../state/useArrel.js';

const ORDER = [
  AREAS.PHYSICAL,
  AREAS.COGNITIVE,
  AREAS.STRESS,
  AREAS.RELATIONAL,
  AREAS.IDENTITY,
];

export default function Areas() {
  const navigate = useNavigate();
  const { state, startStarterCycle } = useArrel();
  const [pendingArea, setPendingArea] = useState(null);

  const chooseArea = (area) => {
    if (state.status !== STATUS.NEW) {
      setPendingArea(area);
      return;
    }

    startStarterCycle(area);
    navigate('/app');
  };

  const confirmArea = () => {
    if (!pendingArea) return;
    startStarterCycle(pendingArea);
    navigate('/app');
  };

  return (
    <Shell showBack backTo="/menu">
      <div className="flex-1 flex flex-col pt-8 pb-8 gap-6">
        <div>
          <p className="v2-kicker mb-4">Les cinc capacitats</p>
          <h2 className="text-3xl font-medium text-balance max-w-sm">
            Cada cicle treballa una capacitat.
          </h2>
        </div>

        <ul className="flex flex-col gap-4">
          {ORDER.map((area) => (
            <li key={area} id={AREA_SLUGS[area]} className="v2-panel v2-area-anchor">
              <div className="flex items-center justify-between gap-3">
                <span className="text-lg text-[var(--text-primary)]">{AREA_LABELS[area]}</span>
                <span className="v2-chip">7 dies</span>
              </div>
              <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                {AREA_DESCRIPTIONS[area]}
              </p>
              <button type="button" className="btn btn-primary w-full mt-5" onClick={() => chooseArea(area)}>
                Fer una prova de {AREA_LABELS[area]}
              </button>
              {pendingArea === area ? (
                <div className="v2-area-confirm" role="status">
                  <p className="v2-panel-label">Començar de nou?</p>
                  <p>
                    Ja tens un cicle començat. Si comences amb {AREA_LABELS[area]},
                    Arrel esborrarà el cicle actual i les lectures guardades en aquesta versió local.
                  </p>
                  <div className="v2-area-confirm-actions">
                    <button type="button" className="btn btn-ghost" onClick={() => navigate('/app')}>
                      Obrir la prova actual
                    </button>
                    <button type="button" className="btn border border-[var(--border-subtle)]" onClick={confirmArea}>
                      Començar amb {AREA_LABELS[area]}
                    </button>
                  </div>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}
