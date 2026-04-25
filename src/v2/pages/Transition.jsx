import { useEffect } from 'react';
import { useArrel } from '../state/ArrelContext.jsx';
import Shell from '../components/Shell.jsx';

export default function Transition() {
  const { state, acknowledgeTransition } = useArrel();
  const previousCycle = Math.max(1, state.cycleNumber - 1);

  useEffect(() => {
    const t = setTimeout(acknowledgeTransition, 3500);
    return () => clearTimeout(t);
  }, [acknowledgeTransition]);

  return (
    <Shell>
      <button
        type="button"
        onClick={acknowledgeTransition}
        className="flex-1 flex flex-col justify-center items-center text-center w-full"
      >
        <p className="text-2xl mb-4 text-balance font-light">
          El cicle {previousCycle} ha acabat.
        </p>
        <p className="text-[var(--text-secondary)]">
          Demà comença el {state.cycleNumber}.
        </p>
      </button>
    </Shell>
  );
}
