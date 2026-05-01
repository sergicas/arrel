import { FEEDBACK, AREA_LABELS } from './types.js';

function detectSentiment(note = '') {
  const clean = note.toLowerCase();
  const fatigueKeywords = ['costat', 'cansat', 'pesat', 'difícil', 'poca ganes', 'esforç', 'prou', 'mal', 'molèstia'];
  const momentumKeywords = ['bé', 'fàcil', 'ganes', 'm’ha agradat', 'repetir', 'fluït', 'tranquil', 'content', 'animat'];

  const hasFatigue = fatigueKeywords.some((word) => clean.includes(word));
  const hasMomentum = momentumKeywords.some((word) => clean.includes(word));

  if (hasFatigue && !hasMomentum) return 'fatigue';
  if (hasMomentum && !hasFatigue) return 'momentum';
  return 'neutral';
}

export function getDailyCoachDecision(state) {
  if (state.dayInCycle <= 1) {
    return {
      difficulty: 'standard',
      insight: 'Avui és un bon dia per començar amb energia.',
    };
  }

  const yesterday = (state.feedback || []).find(
    (entry) => entry.cycle === state.cycleNumber && entry.day === state.dayInCycle - 1
  );

  if (!yesterday) {
    return {
      difficulty: 'standard',
      insight: 'Continuem amb el pla previst per a aquesta setmana.',
    };
  }

  const sentiment = detectSentiment(yesterday.note);
  const friction = yesterday.value === FEEDBACK.PARTIAL || yesterday.value === FEEDBACK.SKIPPED;
  const areaName = AREA_LABELS[yesterday.area] || 'l’àrea anterior';

  if (sentiment === 'fatigue' || yesterday.value === FEEDBACK.SKIPPED) {
    return {
      difficulty: 'easy',
      insight: `Ahir vas notar que la prova de ${areaName} demanava força. Avui prioritzem la constància amb una versió més suau.`,
    };
  }

  if (sentiment === 'momentum' && yesterday.value === FEEDBACK.DONE) {
    return {
      difficulty: 'standard',
      insight: `Ahir et vas sentir molt bé amb la prova de ${areaName}. Avui mantenim el ritme per consolidar aquesta sensació.`,
    };
  }

  if (friction) {
    return {
      difficulty: 'easy',
      insight: `Com que ahir va costar una mica, avui fem un pas més petit per assegurar que el camí sigui amable.`,
    };
  }

  return {
    difficulty: 'standard',
    insight: 'Bon dia. Seguim avançant en el cicle amb la prova que toca avui.',
  };
}
