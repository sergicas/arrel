import { useNavigate } from 'react-router-dom';
import { useArrel } from '../state/ArrelContext.jsx';
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
      <div className="flex-1 flex flex-col justify-center items-center text-center pb-16">
        <h1 className="text-6xl tracking-tightest mb-16 font-light">arrel</h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-xs mb-16 text-balance leading-relaxed">
          Una acció al dia.
          <br />
          Set dies fan una arrel.
        </p>
        <button onClick={begin} className="btn btn-primary w-48">
          Començar
        </button>
      </div>
    </Shell>
  );
}
