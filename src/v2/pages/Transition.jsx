import { AREA_LABELS } from '../lib/types.js';
import { getAreaForCycle } from '../lib/engine.js';
import { useArrel } from '../state/useArrel.js';
import Shell from '../components/Shell.jsx';
import ArrelMascot from '../components/ArrelMascot.jsx';

export default function Transition() {
  const { state, acknowledgeTransition } = useArrel();
  const previousCycle = Math.max(1, state.cycleNumber - 1);
  const nextArea = getAreaForCycle(state.cycleNumber, state.primaryArea);

  return (
    <Shell>
      <div className="flex-1 flex flex-col justify-center items-center text-center w-full gap-5">
        <div className="v2-hero-card v2-transition-card max-w-sm">
          <div className="v2-card-mascot">
            <ArrelMascot mood="celebrate" />
          </div>
          <p className="v2-panel-label mb-4">Cicle nou</p>
          <p className="text-2xl mb-4 text-balance font-medium">Has acabat el cicle {previousCycle}.</p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            El cicle {state.cycleNumber} treballa{' '}
            <span className="text-[var(--text-primary)]">{AREA_LABELS[nextArea]}</span>.
          </p>
        </div>
        <button type="button" onClick={acknowledgeTransition} className="btn btn-primary w-full">
          Obrir la prova d’avui
        </button>
      </div>
    </Shell>
  );
}
