import { useArrel } from '../state/ArrelContext.jsx';
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

        <div className="flex-1 flex flex-col justify-center items-center text-center py-12">
          <p className="text-3xl mb-6 text-balance font-light">Avui, res.</p>
          <p className="text-[var(--text-secondary)] max-w-xs leading-relaxed">
            El cicle es tanca en silenci.
          </p>

          <button
            onClick={advanceDay}
            className="mt-16 text-xs text-[var(--text-tertiary)] underline opacity-60 hover:opacity-100 transition"
          >
            (provar: tancar el cicle →)
          </button>
        </div>

        <div className="pb-2">
          <CycleDots dayInCycle={state.dayInCycle} isRest />
        </div>
      </div>
    </Shell>
  );
}
