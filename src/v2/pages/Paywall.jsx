import { useState } from 'react';
import { useArrel } from '../state/ArrelContext.jsx';
import Shell from '../components/Shell.jsx';

export default function Paywall() {
  const { subscribe } = useArrel();
  const [deferred, setDeferred] = useState(false);

  if (deferred) {
    return (
      <Shell>
        <div className="flex-1 flex flex-col justify-center items-center text-center py-12">
          <p className="text-xl mb-6 text-balance font-light max-w-xs">
            arrel s'atura aquí.
          </p>
          <p className="text-[var(--text-secondary)] mb-12 max-w-xs leading-relaxed">
            Quan vulguis continuar, torna.
          </p>
          <button
            onClick={() => setDeferred(false)}
            className="text-sm text-[var(--text-tertiary)] underline hover:text-[var(--text-secondary)] transition"
          >
            Subscriure'm
          </button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="flex-1 flex flex-col justify-center items-center text-center py-12">
        <p className="text-2xl mb-12 text-balance leading-snug font-light max-w-xs">
          Has fet dos cicles. Si vols continuar amb arrel, són 5 € al mes.
        </p>
        <button onClick={subscribe} className="btn btn-primary w-48">
          Continuar
        </button>
        <button
          onClick={() => setDeferred(true)}
          className="mt-8 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition"
        >
          Marxar per ara →
        </button>
      </div>
    </Shell>
  );
}
