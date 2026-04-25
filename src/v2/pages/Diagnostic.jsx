import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useArrel } from '../state/ArrelContext.jsx';
import Shell from '../components/Shell.jsx';

const QUESTIONS = [
  {
    id: 'difficulty',
    text: "Quina d'aquestes coses et costa més fer ara?",
    options: [
      { value: 'move_daily', label: "Moure'm cada dia" },
      { value: 'learn_new', label: 'Aprendre coses noves' },
      { value: 'be_silent', label: 'Estar en silenci' },
      { value: 'see_people', label: 'Veure gent' },
      { value: 'change_routine', label: 'Canviar rutines' },
    ],
  },
  {
    id: 'when',
    text: 'Quan apareix més fortament aquesta dificultat?',
    options: [
      { value: 'pressure', label: 'Quan tinc pressió' },
      { value: 'solitude', label: 'Quan estic sol' },
      { value: 'routine', label: 'A la rutina diària' },
      { value: 'always', label: 'Quasi sempre' },
    ],
  },
  {
    id: 'expect',
    text: "Què esperes d'arrel?",
    options: [
      { value: 'reminder', label: 'Que em recordi cada dia' },
      { value: 'pressure', label: 'Una mica de pressió honesta' },
      { value: 'structure', label: 'Estructura' },
      { value: 'company', label: 'Companyia silenciosa' },
    ],
  },
];

export default function Diagnostic() {
  const navigate = useNavigate();
  const { completeDiagnostic } = useArrel();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleSelect = (value) => {
    const next = [...answers, value];
    setAnswers(next);
    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      completeDiagnostic(next);
      navigate('/');
    }
  };

  const q = QUESTIONS[step];

  return (
    <Shell>
      <div className="flex justify-center gap-2 pt-6">
        {QUESTIONS.map((_, i) => (
          <span
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition ${
              i <= step ? 'bg-[var(--text-primary)]' : 'bg-[var(--text-tertiary)] opacity-30'
            }`}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col justify-center pt-12 pb-12">
        <h2 className="text-2xl mb-12 leading-snug text-balance font-light">{q.text}</h2>
        <div className="flex flex-col gap-3">
          {q.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className="text-left px-5 py-4 border border-[var(--border-subtle)] rounded-lg hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated)] transition"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </Shell>
  );
}
