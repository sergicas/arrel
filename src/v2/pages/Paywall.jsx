import { useState } from 'react';
import { useArrel } from '../state/useArrel.js';
import Shell from '../components/Shell.jsx';

export default function Paywall() {
  const { continueAfterInitialPeriod } = useArrel();
  const [deferred, setDeferred] = useState(false);

  if (deferred) {
    return (
      <Shell showBack backTo="/menu">
        <div className="flex-1 flex flex-col justify-center items-center text-center py-12">
          <p className="text-xl mb-6 text-balance font-light max-w-xs">Arrel queda pausada aquí.</p>
          <p className="text-[var(--text-secondary)] mb-12 max-w-xs leading-relaxed">
            Quan vulguis reprendre el ritme, pots tornar i continuar des del punt on ho has
            deixat.
          </p>
          <button
            onClick={() => setDeferred(false)}
            className="text-sm text-[var(--text-tertiary)] underline hover:text-[var(--text-secondary)] transition"
          >
            Veure opcions
          </button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell showBack backTo="/menu">
      <div className="flex-1 flex flex-col justify-center py-12">
        <div className="v2-hero-card text-center">
          <p className="v2-panel-label mb-4">Període inicial complet</p>
          <p className="text-3xl mb-5 text-balance leading-snug font-medium">
            Ja tens dos cicles observats.
          </p>
          <p className="text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed">
            Ja has provat el ritme bàsic d’Arrel: sis dies de prova i un dia de lectura.
            Pots continuar observant una nova capacitat quan et vagi bé.
          </p>
        </div>

        <button onClick={continueAfterInitialPeriod} className="btn btn-primary w-full mt-8">
          Continuar amb un nou cicle
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
