import { useState } from 'react';
import { useArrel } from '../state/useArrel.js';
import Shell from '../components/Shell.jsx';

export default function Paywall() {
  const { subscribe } = useArrel();
  const [deferred, setDeferred] = useState(false);

  if (deferred) {
    return (
      <Shell>
        <div className="flex-1 flex flex-col justify-center items-center text-center py-12">
          <p className="text-xl mb-6 text-balance font-light max-w-xs">Arrel s&apos;atura aquí.</p>
          <p className="text-[var(--text-secondary)] mb-12 max-w-xs leading-relaxed">
            Quan vulguis reprendre el ritme, pots tornar i continuar des del punt on ho has
            deixat.
          </p>
          <button
            onClick={() => setDeferred(false)}
            className="text-sm text-[var(--text-tertiary)] underline hover:text-[var(--text-secondary)] transition"
          >
            Veure la subscripció
          </button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="flex-1 flex flex-col justify-center py-12">
        <div className="v2-hero-card text-center">
          <p className="v2-panel-label mb-4">Final del període inicial</p>
          <p className="text-3xl mb-5 text-balance leading-snug font-medium">
            Has completat dos cicles.
          </p>
          <p className="text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed">
            Si vols continuar amb Arrel, la subscripció és de 5 € al mes. Mantens el
            mateix ritme: una acció al dia, sense soroll afegit.
          </p>
        </div>

        <button onClick={subscribe} className="btn btn-primary w-full mt-8">
          Continuar amb Arrel
        </button>
        <button
          onClick={() => setDeferred(true)}
          className="mt-5 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition"
        >
          Marxar per ara →
        </button>
      </div>
    </Shell>
  );
}
