import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useArrel } from '../state/useArrel.js';
import Shell from '../components/Shell.jsx';
import { STATUS } from '../lib/types.js';

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
        label: 'Vull cuidar memòria, atenció i curiositat.',
        weights: { cognitive: 3, identity: 1 },
      },
      {
        value: 'be_silent',
        label: 'Vull fer pauses amb més facilitat.',
        weights: { stress: 3, physical: 1 },
      },
      {
        value: 'see_people',
        label: 'Vull estar present en els vincles que m’importen.',
        weights: { relational: 3, stress: 1 },
      },
      {
        value: 'change_routine',
        label: 'Vull donar espai a projectes i decisions petites.',
        weights: { identity: 3, cognitive: 1 },
      },
    ],
  },
  {
    id: 'when',
    text: 'En quin moment vols posar-hi més atenció?',
    options: [
      {
        value: 'pressure',
        label: 'Quan vaig amb pressa o sota demanda.',
        weights: { stress: 3, cognitive: 1 },
      },
      {
        value: 'solitude',
        label: 'Quan tinc una estona per contactar amb algú.',
        weights: { relational: 2, identity: 2 },
      },
      {
        value: 'routine',
        label: 'Quan vull sortir de la rutina automàtica.',
        weights: { identity: 2, physical: 1, cognitive: 1 },
      },
      {
        value: 'always',
        label: 'Quan vull una prova molt simple.',
        weights: { stress: 1, physical: 1, cognitive: 1, relational: 1, identity: 1 },
      },
    ],
  },
  {
    id: 'avoid',
    text: 'Quina prova petita et serviria més aquests dies?',
    options: [
      {
        value: 'body',
        label: 'Moure el cos o demanar-li una mica més.',
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
        label: 'La memòria o l’atenció estan més despertes.',
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
        label: 'Tinc una mica més de ganes de provar coses.',
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
        label: 'Un motiu concret per contactar amb algú o ordenar idees.',
        weights: { relational: 1, identity: 1 },
      },
    ],
  },
];

export default function Diagnostic() {
  const navigate = useNavigate();
  const { state, completeDiagnostic } = useArrel();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const hasProgress = state.status !== STATUS.NEW || Boolean(state.primaryArea) || (state.feedback || []).length > 0;

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
    <Shell showBack backTo={hasProgress ? '/menu' : '/inici'}>
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
          Ajustar focus · pas {step + 1} de {QUESTIONS.length}
        </p>
        <h2 className="v2-question-title text-balance">{q.text}</h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-10 max-w-sm">
          Respon segons el moment d’ara. Al final, Arrel triarà una capacitat per començar.
          {hasProgress ? ' Si ja tens lectures guardades, les conservarà i obrirà un cicle nou.' : ''}
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
