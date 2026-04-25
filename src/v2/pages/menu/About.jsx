import { useNavigate } from 'react-router-dom';
import { useArrel } from '../../state/ArrelContext.jsx';
import Shell from '../../components/Shell.jsx';

export default function About() {
  const navigate = useNavigate();
  const { restartFromDiagnostic, resetAll } = useArrel();

  const handleRestart = () => {
    if (typeof window !== 'undefined' && !window.confirm('Vols refer el diagnòstic? El cicle actual es reinicia.')) return;
    restartFromDiagnostic();
    navigate('/');
  };

  const handleReset = () => {
    if (typeof window !== 'undefined' && !window.confirm('Esborrar totes les dades locals? No es pot desfer.')) return;
    resetAll();
    navigate('/');
  };

  return (
    <Shell showBack backTo="/menu">
      <div className="flex-1 flex flex-col pt-8 pb-8">
        <h2 className="text-xl font-light mb-8">Sobre arrel</h2>

        <div className="flex flex-col gap-6 text-[var(--text-secondary)] leading-relaxed mb-12">
          <p>
            arrel és un sistema de cicles de set dies que actua sobre els llocs
            on l'envelliment va més de pressa: el cos, la ment, l'estrès, els
            vincles i la identitat.
          </p>
          <p>
            Cada dia proposa una acció. El setè dia, descansa amb tu. No conta
            ratxes, no et premia, no et castiga.
          </p>
          <p>
            La versió actual és <span className="text-[var(--text-primary)]">arrel 0.2</span>.
            És intencionadament petita: vol fer una sola cosa bé abans
            d'afegir-ne d'altres.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleRestart}
            className="text-left text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-3 border-t border-[var(--border-subtle)] transition"
          >
            Refer el diagnòstic →
          </button>
          <button
            onClick={handleReset}
            className="text-left text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] py-3 border-t border-[var(--border-subtle)] transition"
          >
            Esborrar totes les dades locals →
          </button>
        </div>
      </div>
    </Shell>
  );
}
