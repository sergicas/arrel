import { FEEDBACK, AREA_LABELS } from './types.js';
import { analyzeEvolution } from './evolutionEngine.js';
import { analyzeUserStyle, USER_STYLES } from './toneEngine.js';

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
  const evolutionInsights = analyzeEvolution(state);
  const userStyle = analyzeUserStyle(state.feedback);
  
  let evolutionText = Array.isArray(evolutionInsights) ? ` ${evolutionInsights[0]}` : '';

  // En estil concís, simplifiquem els missatges eliminant el context evolutiu al matí
  if (userStyle === USER_STYLES.CONCISE) {
    evolutionText = '';
  }

  if (state.dayInCycle <= 1) {
    const greetings = {
      [USER_STYLES.CONCISE]: 'Hola. Comencem el cicle amb energia.',
      [USER_STYLES.REFLECTIVE]: `Hola! Avui és el primer dia d’un nou camí. Comencem amb molta energia i atenció.${evolutionText}`,
      [USER_STYLES.BALANCED]: `Avui és un bon dia per començar amb energia.${evolutionText}`,
    };
    return {
      difficulty: 'standard',
      insight: greetings[userStyle] || greetings[USER_STYLES.BALANCED],
    };
  }

  const yesterday = (state.feedback || []).find(
    (entry) => entry.cycle === state.cycleNumber && entry.day === state.dayInCycle - 1
  );

  if (!yesterday) {
    return {
      difficulty: 'standard',
      insight: `Continuem amb el pla previst per a aquesta setmana.${evolutionText}`,
    };
  }

  const sentiment = detectSentiment(yesterday.note);
  const friction = yesterday.value === FEEDBACK.PARTIAL || yesterday.value === FEEDBACK.SKIPPED;
  const areaName = AREA_LABELS[yesterday.area] || 'l’àrea anterior';

  if (sentiment === 'fatigue' || yesterday.value === FEEDBACK.SKIPPED) {
    const texts = {
      [USER_STYLES.CONCISE]: `Ahir va costar. Avui, versió suau de ${areaName}.`,
      [USER_STYLES.REFLECTIVE]: `Ahir vas notar que la prova de ${areaName} demanava força. Escoltant el que vas escriure, avui prioritzem la constància amb una versió més suau.${evolutionText}`,
      [USER_STYLES.BALANCED]: `Ahir vas notar que la prova de ${areaName} demanava força. Avui prioritzem la constància amb una versió més suau.${evolutionText}`,
    };
    return {
      difficulty: 'easy',
      insight: texts[userStyle] || texts[USER_STYLES.BALANCED],
    };
  }

  if (sentiment === 'momentum' && yesterday.value === FEEDBACK.DONE) {
    const texts = {
      [USER_STYLES.CONCISE]: `Bon ritme. Seguim amb ${areaName}.`,
      [USER_STYLES.REFLECTIVE]: `Ahir et vas sentir molt bé amb la prova de ${areaName}. Mantenim aquest impuls positiu per consolidar la teva capacitat.${evolutionText}`,
      [USER_STYLES.BALANCED]: `Ahir et vas sentir molt bé amb la prova de ${areaName}. Avui mantenim el ritme per consolidar aquesta sensació.${evolutionText}`,
    };
    return {
      difficulty: 'standard',
      insight: texts[userStyle] || texts[USER_STYLES.BALANCED],
    };
  }

  if (friction) {
    const texts = {
      [USER_STYLES.CONCISE]: 'Pas més petit per avui.',
      [USER_STYLES.REFLECTIVE]: `Com que ahir va costar una mica, avui fem un pas més petit i amable per assegurar que et sentis amb capacitat.${evolutionText}`,
      [USER_STYLES.BALANCED]: `Com que ahir va costar una mica, avui fem un pas més petit per assegurar que el camí sigui amable.${evolutionText}`,
    };
    return {
      difficulty: 'easy',
      insight: texts[userStyle] || texts[USER_STYLES.BALANCED],
    };
  }

  const defaultTexts = {
    [USER_STYLES.CONCISE]: 'Seguim amb la prova d’avui.',
    [USER_STYLES.REFLECTIVE]: `Bon dia! Seguim avançant amb confiança en el cicle amb la prova que toca avui.${evolutionText}`,
    [USER_STYLES.BALANCED]: `Bon dia. Seguim avançant en el cicle amb la prova que toca avui.${evolutionText}`,
  };

  return {
    difficulty: 'standard',
    insight: defaultTexts[userStyle] || defaultTexts[USER_STYLES.BALANCED],
  };
}
