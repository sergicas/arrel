import { useState } from 'react';
import { Check, CircleSlash, PencilLine, Sparkles } from 'lucide-react';
import { useArrel } from '../state/useArrel.js';
import Shell from '../components/Shell.jsx';
import CycleDots from '../components/CycleDots.jsx';
import { AREA_LABELS, FEEDBACK } from '../lib/types.js';

const FEEDBACK_ITEMS = [
  {
    value: FEEDBACK.DONE,
    label: 'Fet',
    description: 'Ho he fet tal com tocava avui.',
    icon: Check,
  },
  {
    value: FEEDBACK.PARTIAL,
    label: 'A mig fer',
    description: 'Hi he entrat, però no l&apos;he acabat del tot.',
    icon: Sparkles,
  },
  {
    value: FEEDBACK.SKIPPED,
    label: 'No ho he fet',
    description: 'Avui no ha passat. Ho deixo registrat igualment.',
    icon: CircleSlash,
  },
];

export default function Today() {
  const { state, todayAction, todayArea, todayGuidance, submitFeedback, advanceDay } = useArrel();
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [note, setNote] = useState('');

  const saveFeedback = () => {
    if (!selectedFeedback) return;
    submitFeedback(selectedFeedback, note.trim());
  };

  return (
    <Shell showMenu>
      <div className="flex-1 flex flex-col">
        <p className="text-sm text-[var(--text-tertiary)] tracking-wide pt-6">
          Cicle {state.cycleNumber} · dia {state.dayInCycle}
        </p>

        <div className="flex flex-col gap-4 pt-6">
          <div className="v2-hero-card">
            <p className="v2-panel-label mb-3">Àrea activa</p>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl leading-tight font-medium text-balance">
                {todayArea ? AREA_LABELS[todayArea] : 'Avui'}
              </h2>
              <span className="v2-chip">dia {state.dayInCycle}</span>
            </div>
            <p className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed">
              {todayGuidance}
            </p>
          </div>

          <div className="v2-panel">
            <p className="v2-panel-label mb-4">Acció d&apos;avui</p>
            <p className="text-2xl leading-relaxed text-balance font-medium">
              {todayAction?.text}
            </p>
          </div>
        </div>

        {!state.feedbackJustGiven ? (
          <div className="flex flex-col gap-4 mt-8 mb-8">
            <div>
              <p className="v2-panel-label mb-3">Check-in curt</p>
              <div className="flex flex-col gap-3">
                {FEEDBACK_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const active = selectedFeedback === item.value;

                  return (
                    <button
                      key={item.value}
                      onClick={() => setSelectedFeedback(item.value)}
                      className={`v2-feedback ${active ? 'v2-feedback-active' : ''}`}
                    >
                      <span className="mt-0.5">
                        <Icon size={18} />
                      </span>
                      <span className="flex-1 text-left">
                        <span className="block text-base text-[var(--text-primary)]">
                          {item.label}
                        </span>
                        <span className="block text-sm text-[var(--text-secondary)]">
                          {item.description}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="v2-panel">
              <span className="v2-panel-label mb-3 flex items-center gap-2">
                <PencilLine size={14} />
                Nota opcional
              </span>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={3}
                className="input-field min-h-24 resize-none"
                placeholder="Què ha passat avui? Una línia ja és suficient."
              />
            </label>

            <button
              onClick={saveFeedback}
              disabled={!selectedFeedback}
              className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-40"
            >
              Guardar el check-in
            </button>
          </div>
        ) : (
          <div className="v2-panel flex flex-col items-start gap-4 mt-8 mb-8">
            <p className="v2-panel-label">Check-in desat</p>
            <p className="text-lg text-[var(--text-primary)] text-balance">
              Avui ja està registrat. Demà continuem des del mateix lloc.
            </p>
            <button onClick={advanceDay} className="btn btn-primary w-full">
              Passar al dia següent
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
