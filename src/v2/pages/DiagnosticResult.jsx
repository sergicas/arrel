import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { useArrel } from '../state/useArrel.js';
import Shell from '../components/Shell.jsx';
import ArrelMascot from '../components/ArrelMascot.jsx';
import { AREAS, AREA_LABELS } from '../lib/types.js';

const AREA_ORDER = [
  AREAS.PHYSICAL,
  AREAS.COGNITIVE,
  AREAS.STRESS,
  AREAS.RELATIONAL,
  AREAS.IDENTITY,
];

const AREA_WITH_ARTICLE = {
  [AREAS.PHYSICAL]: 'el cos',
  [AREAS.COGNITIVE]: 'la memòria',
  [AREAS.STRESS]: 'la calma',
  [AREAS.RELATIONAL]: 'els vincles',
  [AREAS.IDENTITY]: 'la identitat',
};

export default function DiagnosticResult() {
  const navigate = useNavigate();
  const { state, acknowledgeDiagnosisResult, startDiagnostic } = useArrel();

  const ranked = useMemo(() => {
    const scores = state.diagnosisScores || {};
    return AREA_ORDER
      .map((area) => ({ area, score: scores[area] || 0 }))
      .sort((a, b) => b.score - a.score);
  }, [state.diagnosisScores]);

  const maxScore = Math.max(...ranked.map((entry) => entry.score), 1);
  const primaryLabel = AREA_LABELS[state.primaryArea] || 'el teu focus';
  const secondary = ranked.find((entry) => entry.area !== state.primaryArea && entry.score > 0);

  const handleContinue = () => {
    acknowledgeDiagnosisResult();
    navigate('/app');
  };

  const handleRetake = () => {
    startDiagnostic();
    navigate('/diagnostic');
  };

  return (
    <Shell showBack backTo="/inici">
      <div className="flex-1 w-full min-w-0 flex flex-col justify-center pt-8 pb-10 gap-6">
        <div className="v2-hero-card v2-diagnostic-result-card">
          <div className="v2-card-mascot">
            <ArrelMascot mood="welcome" />
          </div>
          <p className="v2-panel-label mb-4">Diagnosi completada</p>
          <h2 className="text-3xl font-medium text-balance mb-4">
            Començarem per {primaryLabel}.
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Aquesta setmana Arrel et donarà proves curtes per treballar aquesta capacitat.
            {secondary ? ` També tindrem present ${AREA_WITH_ARTICLE[secondary.area]}.` : ''}
          </p>
        </div>

        <div className="v2-panel">
          <p className="v2-panel-label mb-4">Lectura ràpida</p>
          <div className="v2-diagnostic-bars">
            {ranked.map(({ area, score }) => (
              <div key={area} className="v2-diagnostic-row">
                <div className="v2-diagnostic-row-header">
                  <span>{AREA_LABELS[area]}</span>
                </div>
                <div className="v2-diagnostic-track" aria-hidden="true">
                  <span style={{ width: `${Math.max((score / maxScore) * 100, score > 0 ? 12 : 4)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full min-w-0 flex-col gap-3">
          <button type="button" onClick={handleContinue} className="btn btn-primary w-full">
            Veure la prova d’avui
            <ArrowRight size={18} />
          </button>
          <button type="button" onClick={handleRetake} className="btn btn-ghost w-full">
            <RotateCcw size={17} />
            Canviar respostes
          </button>
        </div>
      </div>
    </Shell>
  );
}
