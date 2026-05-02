import { FEEDBACK, AREA_LABELS } from './types.js';
import { analyzeEvolution } from './evolutionEngine.js';
import { analyzeUserStyle, USER_STYLES } from './toneEngine.js';
import { identifyPatterns } from './patternEngine.js';

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
  const patterns = identifyPatterns(state.feedback);
  
  let evolutionText = Array.isArray(evolutionInsights) ? ` ${evolutionInsights[0]}` : '';
  const patternText = Array.isArray(patterns) && patterns.length > 0 ? ` Recorda que ${patterns[0].text.charAt(0).toLowerCase()}${patterns[0].text.slice(1)}` : '';

  // En estil concís, simplifiquem els missatges eliminant el context evolutiu al matí
  if (userStyle === USER_STYLES.CONCISE) {
    evolutionText = '';
  }

  const coachContext = `${evolutionText}${userStyle !== USER_STYLES.CONCISE ? patternText : ''}`;

  if (state.dayInCycle <= 1) {
    const greetings = {
      [USER_STYLES.CONCISE]: 'Hola. Comencem el cicle amb energia.',
      [USER_STYLES.REFLECTIVE]: `Hola! Avui és el primer dia d’un nou camí. Comencem amb molta energia i atenció.${coachContext}`,
      [USER_STYLES.BALANCED]: `Avui és un bon dia per començar amb energia.${coachContext}`,
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
      insight: `Continuem amb el pla previst per a aquesta setmana.${coachContext}`,
    };
  }

  const sentiment = detectSentiment(yesterday.note);
  const friction = yesterday.value === FEEDBACK.PARTIAL || yesterday.value === FEEDBACK.SKIPPED;
  const areaName = AREA_LABELS[yesterday.area] || 'l’àrea anterior';

  if (sentiment === 'fatigue' || yesterday.value === FEEDBACK.SKIPPED) {
    const texts = {
      [USER_STYLES.CONCISE]: `Ahir va costar. Avui, versió suau de ${areaName}.`,
      [USER_STYLES.REFLECTIVE]: `Ahir vas notar que la prova de ${areaName} demanava força. Escoltant el que vas escriure, avui prioritzem la constància amb una versió més suau.${coachContext}`,
      [USER_STYLES.BALANCED]: `Ahir vas notar que la prova de ${areaName} demanava força. Avui prioritzem la constància amb una versió més suau.${coachContext}`,
    };
    return {
      difficulty: 'easy',
      insight: texts[userStyle] || texts[USER_STYLES.BALANCED],
    };
  }

  if (sentiment === 'momentum' && yesterday.value === FEEDBACK.DONE) {
    const texts = {
      [USER_STYLES.CONCISE]: `Bon ritme. Seguim amb ${areaName}.`,
      [USER_STYLES.REFLECTIVE]: `Ahir et vas sentir molt bé amb la prova de ${areaName}. Mantenim aquest impuls positiu per consolidar la teva capacitat.${coachContext}`,
      [USER_STYLES.BALANCED]: `Ahir et vas sentir molt bé amb la prova de ${areaName}. Avui mantenim el ritme per consolidar aquesta sensació.${coachContext}`,
    };
    return {
      difficulty: 'standard',
      insight: texts[userStyle] || texts[USER_STYLES.BALANCED],
    };
  }

  if (friction) {
    const texts = {
      [USER_STYLES.CONCISE]: 'Pas més petit per avui.',
      [USER_STYLES.REFLECTIVE]: `Com que ahir va costar una mica, avui fem un pas més petit i amable per assegurar que et sentis amb capacitat.${coachContext}`,
      [USER_STYLES.BALANCED]: `Com que ahir va costar una mica, avui fem un pas més petit per assegurar que el camí sigui amable.${coachContext}`,
    };
    return {
      difficulty: 'easy',
      insight: texts[userStyle] || texts[USER_STYLES.BALANCED],
    };
  }

  const defaultTexts = {
    [USER_STYLES.CONCISE]: 'Seguim amb la prova d’avui.',
    [USER_STYLES.REFLECTIVE]: `Bon dia! Seguim avançant amb confiança en el cicle amb la prova que toca avui.${coachContext}`,
    [USER_STYLES.BALANCED]: `Bon dia. Seguim avançant en el cicle amb la prova que toca avui.${coachContext}`,
  };

  return {
    difficulty: 'standard',
    insight: defaultTexts[userStyle] || defaultTexts[USER_STYLES.BALANCED],
  };
}
