import { useArrel } from '../state/ArrelContext.jsx';
import Shell from '../components/Shell.jsx';
import CycleDots from '../components/CycleDots.jsx';
import { FEEDBACK } from '../lib/types.js';

export default function Today() {
  const { state, todayAction, submitFeedback, advanceDay } = useArrel();

  return (
    <Shell showMenu>
      <div className="flex-1 flex flex-col">
        <p className="text-sm text-[var(--text-tertiary)] tracking-wide pt-6">
          Cicle {state.cycleNumber} · dia {state.dayInCycle}
        </p>

        <div className="flex-1 flex flex-col justify-center py-12">
          <p className="text-xs text-[var(--text-tertiary)] tracking-[0.2em] uppercase mb-8">
            Avui
          </p>
          <p className="text-2xl leading-relaxed text-balance font-light">
            {todayAction?.text}
          </p>
        </div>

        {!state.feedbackJustGiven ? (
          <div className="flex flex-col gap-3 mb-8">
            <button
              onClick={() => submitFeedback(FEEDBACK.DONE)}
              className="btn btn-primary w-full"
            >
              Fet
            </button>
            <button
              onClick={() => submitFeedback(FEEDBACK.PARTIAL)}
              className="btn w-full border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
            >
              Parcial
            </button>
            <button
              onClick={() => submitFeedback(FEEDBACK.SKIPPED)}
              className="btn btn-ghost w-full"
            >
              No ho he fet
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 mb-8">
            <p className="text-[var(--text-secondary)] text-lg">Ens veiem demà.</p>
            <button
              onClick={advanceDay}
              className="text-xs text-[var(--text-tertiary)] underline opacity-60 hover:opacity-100 transition"
            >
              (provar: avançar al dia següent →)
            </button>
          </div>
        )}

        <div className="pb-2">
          <CycleDots dayInCycle={state.dayInCycle} />
        </div>
      </div>
    </Shell>
  );
}
