import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useArrel } from '../state/useArrel.js';
import Shell from '../components/Shell.jsx';

const QUESTIONS = [
  {
    id: 'difficulty',
    text: 'Quina capacitat vols treballar aquests dies?',
    options: [
      {
        value: 'move_daily',
        label: 'Vull mantenir el cos disponible, fort i mòbil.',
        weights: { physical: 3, stress: 1 },
      },
      {
        value: 'learn_new',
        label: 'Vull conservar memòria, atenció i curiositat.',
        weights: { cognitive: 3, identity: 1 },
      },
      {
        value: 'be_silent',
        label: 'Vull recuperar calma abans de viure en reacció.',
        weights: { stress: 3, physical: 1 },
      },
      {
        value: 'see_people',
        label: 'Vull no retirar-me dels vincles que m’importen.',
        weights: { relational: 3, stress: 1 },
      },
      {
        value: 'change_routine',
        label: 'Vull provar decisions petites fora de la rutina.',
        weights: { identity: 3, cognitive: 1 },
      },
    ],
  },
  {
    id: 'when',
    text: 'Quan notes més que estàs perdent terreny?',
    options: [
      {
        value: 'pressure',
        label: 'Quan vaig amb pressa o sota demanda.',
        weights: { stress: 3, cognitive: 1 },
      },
      {
        value: 'solitude',
        label: 'Quan em quedo massa sol amb mi mateix.',
        weights: { relational: 2, identity: 2 },
      },
      {
        value: 'routine',
        label: 'Quan repeteixo el mateix sense decidir gaire.',
        weights: { identity: 2, physical: 1, cognitive: 1 },
      },
      {
        value: 'always',
        label: 'Bastant sovint, fins i tot sense un motiu clar.',
        weights: { stress: 1, physical: 1, cognitive: 1, relational: 1, identity: 1 },
      },
    ],
  },
  {
    id: 'avoid',
    text: 'Quina prova petita estàs evitant més últimament?',
    options: [
      {
        value: 'body',
        label: 'Moure el cos o exigir-li una mica més.',
        weights: { physical: 3 },
      },
      {
        value: 'thought',
        label: 'Pensar diferent o aprendre alguna cosa nova.',
        weights: { cognitive: 3 },
      },
      {
        value: 'pause',
        label: 'Parar i quedar-me en silenci una estona.',
        weights: { stress: 3 },
      },
      {
        value: 'contact',
        label: 'Contactar amb algú i mantenir la conversa.',
        weights: { relational: 3 },
      },
      {
        value: 'discomfort',
        label: 'Fer una cosa diferent de la meva rutina.',
        weights: { identity: 3 },
      },
    ],
  },
  {
    id: 'signal',
    text: "Quin canvi voldries notar d'aquí una setmana?",
    options: [
      {
        value: 'lighter_body',
        label: 'Em moc amb una mica més de seguretat.',
        weights: { physical: 2, stress: 1 },
      },
      {
        value: 'clearer_mind',
        label: 'La memòria o l’atenció no s’han adormit.',
        weights: { cognitive: 2, identity: 1 },
      },
      {
        value: 'slower_inside',
        label: 'Puc fer una pausa abans de reaccionar.',
        weights: { stress: 2, relational: 1 },
      },
      {
        value: 'closer_people',
        label: 'Estic una mica més present amb els altres.',
        weights: { relational: 2, identity: 1 },
      },
      {
        value: 'more_alive',
        label: 'Encara puc sorprendre’m una mica de mi mateix.',
        weights: { identity: 2, cognitive: 1 },
      },
    ],
  },
  {
    id: 'style',
    text: "Quin tipus d'ajuda et serveix més ara?",
    options: [
      {
        value: 'clear_push',
        label: "Una prova clara i una mica d'empenta.",
        weights: { physical: 1, identity: 1 },
      },
      {
        value: 'mental_shift',
        label: 'Una prova que em faci pensar d’una manera diferent.',
        weights: { cognitive: 2 },
      },
      {
        value: 'quiet_structure',
        label: 'Una estructura curta que no em saturi.',
        weights: { stress: 2 },
      },
      {
        value: 'warm_contact',
        label: 'Un motiu concret per reconnectar amb algú o amb mi.',
        weights: { relational: 1, identity: 1 },
      },
    ],
  },
];

export default function Diagnostic() {
  const navigate = useNavigate();
  const { completeDiagnostic } = useArrel();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleSelect = (option) => {
    const next = [...answers, option];
    setAnswers(next);

    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
      return;
    }

    completeDiagnostic(next);
    navigate('/app');
  };

  const q = QUESTIONS[step];

  return (
    <Shell showBack backTo="/inici">
      <div className="v2-progress-line mt-6" aria-label={`Pas ${step + 1} de ${QUESTIONS.length}`}>
        {QUESTIONS.map((_, i) => (
          <span
            key={i}
            className={i <= step ? 'v2-progress-segment is-filled' : 'v2-progress-segment'}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col justify-center pt-8 pb-12">
        <p className="v2-kicker mb-4">
          Diagnòstic curt · pas {step + 1} de {QUESTIONS.length}
        </p>
        <h2 className="v2-question-title text-balance">{q.text}</h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-10 max-w-sm">
          Respon segons el que et passa ara. Al final, Arrel triarà una capacitat
          per començar el pròxim cicle.
        </p>
        <div className="flex flex-col gap-3">
          {q.options.map((opt, index) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt)}
              className="v2-option text-left"
            >
              <span className="v2-option-index">{String(index + 1).padStart(2, '0')}</span>
              <span>{opt.label}</span>
              <ArrowRight size={16} className="v2-option-arrow" />
            </button>
          ))}
        </div>
      </div>
    </Shell>
  );
}
