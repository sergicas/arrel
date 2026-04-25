import { useNavigate } from 'react-router-dom';
import { useArrel } from '../state/useArrel.js';
import Shell from '../components/Shell.jsx';

export default function Welcome() {
  const navigate = useNavigate();
  const { startDiagnostic } = useArrel();

  const begin = () => {
    startDiagnostic();
    navigate('/');
  };

  return (
    <Shell>
      <div className="flex-1 flex flex-col justify-between py-8">
        <div className="pt-8">
          <p className="v2-kicker mb-6">Desgast funcional, sense soroll</p>
          <h1 className="text-5xl leading-[0.92] tracking-[-0.08em] font-medium max-w-sm">
            Recupera terreny.
          </h1>
          <p className="mt-6 text-lg text-[var(--text-secondary)] leading-relaxed max-w-sm text-balance">
            Arrel detecta on el temps ja t&apos;està passant factura i et dona una sola
            acció al dia per començar a moure-ho.
          </p>
        </div>

        <div className="grid gap-3 my-8">
          <div className="v2-panel">
            <p className="v2-panel-label">1. Diagnòstic curt</p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Cinc preguntes per veure on estàs perdent més terreny ara mateix.
            </p>
          </div>
          <div className="v2-panel">
            <p className="v2-panel-label">2. Una acció al dia</p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Sense dashboard infinit ni plans impossibles. Només el pas que toca avui.
            </p>
          </div>
          <div className="v2-panel">
            <p className="v2-panel-label">3. Cicles de set dies</p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Sis dies d&apos;acció i un dia de tancament per consolidar el moviment.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button onClick={begin} className="btn btn-primary w-full">
            Començar el diagnòstic
          </button>
          <p className="text-sm text-[var(--text-tertiary)] leading-relaxed text-balance">
            No és una app mèdica ni una app d&apos;hàbits genèrica. És una estructura
            curta per actuar allà on ara t&apos;estàs encallant.
          </p>
        </div>
      </div>
    </Shell>
  );
}
