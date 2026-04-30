import { Link, useNavigate } from 'react-router-dom';
import { useArrel } from '../../state/useArrel.js';
import Shell from '../../components/Shell.jsx';

export default function About() {
  const navigate = useNavigate();
  const { restartFromDiagnostic, resetAll } = useArrel();

  const handleRestart = () => {
    if (
      typeof window !== 'undefined' &&
      !window.confirm('Vols ajustar el focus? Arrel conservarà l’històric i obrirà un cicle nou quan acabis.')
    ) {
      return;
    }

    restartFromDiagnostic();
    navigate('/diagnostic');
  };

  const handleReset = () => {
    if (
      typeof window !== 'undefined' &&
      !window.confirm('Esborrar totes les dades locals? No es pot desfer.')
    ) {
      return;
    }

    resetAll();
    navigate('/app');
  };

  return (
    <Shell showBack backTo="/menu">
      <div className="flex-1 flex flex-col pt-8 pb-8 gap-8">
        <div>
          <p className="v2-kicker mb-4">Sobre Arrel</p>
          <h2 className="text-3xl font-medium text-balance max-w-sm">
            Una app de proves curtes per frenar l’envelliment.
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <div className="v2-panel">
            <p className="v2-panel-label">Què és</p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Arrel no és una app mèdica ni una pantalla de mètriques. És un sistema de
              proves curtes per practicar capacitats que vols mantenir mentre et fas gran.
            </p>
          </div>

          <div className="v2-panel">
            <p className="v2-panel-label">Com funciona</p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Tria una capacitat principal, escull un ritme lent, regular o accelerat,
              fes sis proves i reserva el setè dia per revisar els resultats.
            </p>
          </div>

          <div className="v2-panel">
            <p className="v2-panel-label">Versió actual</p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Arrel guarda el progrés al dispositiu. No cal compte per fer servir aquesta versió.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button onClick={handleRestart} className="btn w-full border border-[var(--border-subtle)]">
            Refer el diagnòstic
          </button>
          <button onClick={handleReset} className="btn btn-ghost w-full">
            Esborrar les dades locals
          </button>
          <Link to="/legal/privacitat" className="btn w-full border border-[var(--border-subtle)]">
            Privacitat i termes
          </Link>
        </div>
      </div>
    </Shell>
  );
}
