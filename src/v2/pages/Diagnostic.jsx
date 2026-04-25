import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useArrel } from '../state/useArrel.js';
import Shell from '../components/Shell.jsx';

const QUESTIONS = [
  {
    id: 'difficulty',
    text: 'On notes més desgast aquests últims mesos?',
    options: [
      {
        value: 'move_daily',
        label: 'Em costa activar el cos i aguantar millor el dia.',
        weights: { physical: 3, stress: 1 },
      },
      {
        value: 'learn_new',
        label: 'Em noto mentalment més rígid o repetitiu.',
        weights: { cognitive: 3, identity: 1 },
      },
      {
        value: 'be_silent',
        label: 'Visc massa en tensió o sempre accelerat.',
        weights: { stress: 3, physical: 1 },
      },
      {
        value: 'see_people',
        label: 'Em tanco més del compte i em costa apropar-me.',
        weights: { relational: 3, stress: 1 },
      },
      {
        value: 'change_routine',
        label: 'Sento que m&apos;estic repetint i em costa moure la meva identitat.',
        weights: { identity: 3, cognitive: 1 },
      },
    ],
  },
  {
    id: 'when',
    text: 'Quan es fa més evident aquest bloqueig?',
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
        label: 'Quan tot sembla igual i vaig en automàtic.',
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
    text: 'Quina cosa estàs evitant més últimament?',
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
        label: 'Buscar o sostenir contacte amb algú.',
        weights: { relational: 3 },
      },
      {
        value: 'discomfort',
        label: 'Fer una cosa que em tregui de la meva versió de sempre.',
        weights: { identity: 3 },
      },
    ],
  },
  {
    id: 'signal',
    text: 'Quin senyal t&apos;agradaria notar d&apos;aquí una setmana?',
    options: [
      {
        value: 'lighter_body',
        label: 'Més energia, més mobilitat, més confiança corporal.',
        weights: { physical: 2, stress: 1 },
      },
      {
        value: 'clearer_mind',
        label: 'Una ment més desperta i menys enganxada als mateixos carrils.',
        weights: { cognitive: 2, identity: 1 },
      },
      {
        value: 'slower_inside',
        label: 'Baixar una mica la tensió i reaccionar menys.',
        weights: { stress: 2, relational: 1 },
      },
      {
        value: 'closer_people',
        label: 'Sentir-me més present i menys retirat dels altres.',
        weights: { relational: 2, identity: 1 },
      },
      {
        value: 'more_alive',
        label: 'Notar que torno a moure coses que tenia congelades.',
        weights: { identity: 2, cognitive: 1 },
      },
    ],
  },
  {
    id: 'style',
    text: 'Quin tipus d&apos;ajuda et serveix més ara?',
    options: [
      {
        value: 'clear_push',
        label: 'Una indicació clara i una mica d&apos;empenta.',
        weights: { physical: 1, identity: 1 },
      },
      {
        value: 'mental_shift',
        label: 'Una proposta que em faci mirar diferent.',
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
    navigate('/');
  };

  const q = QUESTIONS[step];

  return (
    <Shell>
      <div className="flex justify-center gap-2 pt-6">
        {QUESTIONS.map((_, i) => (
          <span
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === step
                ? 'w-8 h-2 bg-[var(--text-primary)]'
                : i < step
                  ? 'w-2.5 h-2 bg-[var(--accent-primary)] opacity-50'
                  : 'w-2.5 h-2 border border-[var(--border-strong)] opacity-40'
            }`}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col justify-center pt-8 pb-12">
        <p className="v2-kicker mb-4">
          Diagnòstic curt · pas {step + 1} de {QUESTIONS.length}
        </p>
        <h2 className="text-[2rem] mb-4 leading-[1.05] text-balance font-medium">{q.text}</h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-10 max-w-sm">
          No busquem una identitat completa. Només el lloc més exposat des d&apos;on
          val la pena començar.
        </p>
        <div className="flex flex-col gap-3">
          {q.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt)}
              className="v2-option text-left"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </Shell>
  );
}
