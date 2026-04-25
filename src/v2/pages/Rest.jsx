import { useArrel } from '../state/useArrel.js';
import Shell from '../components/Shell.jsx';
import CycleDots from '../components/CycleDots.jsx';

export default function Rest() {
  const { state, advanceDay } = useArrel();

  return (
    <Shell showMenu>
      <div className="flex-1 flex flex-col">
        <p className="text-sm text-[var(--text-tertiary)] tracking-wide pt-6">
          Cicle {state.cycleNumber} · dia {state.dayInCycle}
        </p>

        <div className="flex-1 flex flex-col justify-center py-12">
          <div className="v2-hero-card text-center">
            <p className="v2-panel-label mb-4">Dia 7 · tancament</p>
            <p className="text-3xl mb-5 text-balance font-medium">Avui no toca empènyer.</p>
            <p className="text-[var(--text-secondary)] max-w-xs mx-auto leading-relaxed">
              El setè dia serveix per deixar reposar el cicle, mirar què s&apos;ha mogut i
              arribar net al següent.
            </p>
          </div>

          <button onClick={advanceDay} className="btn btn-primary mt-8">
            Tancar el cicle
          </button>
        </div>

        <div className="pb-2">
          <CycleDots dayInCycle={state.dayInCycle} isRest />
        </div>
      </div>
    </Shell>
  );
}
