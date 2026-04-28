import { useEffect } from 'react';
import { AREA_LABELS } from '../lib/types.js';
import { getAreaForCycle } from '../lib/engine.js';
import { useArrel } from '../state/useArrel.js';
import Shell from '../components/Shell.jsx';
import ArrelMascot from '../components/ArrelMascot.jsx';

export default function Transition() {
  const { state, acknowledgeTransition } = useArrel();
  const previousCycle = Math.max(1, state.cycleNumber - 1);
  const nextArea = getAreaForCycle(state.cycleNumber, state.primaryArea);

  useEffect(() => {
    const t = setTimeout(acknowledgeTransition, 3500);
    return () => clearTimeout(t);
  }, [acknowledgeTransition]);

  return (
    <Shell showBack backTo="/menu">
      <button
        type="button"
        onClick={acknowledgeTransition}
        className="flex-1 flex flex-col justify-center items-center text-center w-full"
      >
        <div className="v2-hero-card v2-transition-card max-w-sm">
          <div className="v2-card-mascot">
            <ArrelMascot mood="celebrate" />
          </div>
          <p className="v2-panel-label mb-4">Transició</p>
          <p className="text-2xl mb-4 text-balance font-medium">El cicle {previousCycle} ha acabat.</p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Ara entres al cicle {state.cycleNumber}. El focus es desplaça cap a{' '}
            <span className="text-[var(--text-primary)]">{AREA_LABELS[nextArea]}</span>.
          </p>
        </div>
      </button>
    </Shell>
  );
}
