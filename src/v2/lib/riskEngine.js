import { FEEDBACK } from './types.js';

function detectSentiment(note = '') {
  const clean = note.toLowerCase();
  const fatigueKeywords = ['costat', 'cansat', 'pesat', 'difícil', 'poca ganes', 'esforç', 'prou', 'mal', 'molèstia'];
  return fatigueKeywords.some((word) => clean.includes(word));
}

export function assessBurnoutRisk(state) {
  const currentCycleFeedback = (state.feedback || [])
    .filter((f) => f.cycle === state.cycleNumber)
    .sort((a, b) => b.day - a.day); // Més recents primer

  if (currentCycleFeedback.length < 3) return { risk: 'low', reason: null };

  // 1. Detecció de fricció consecutiva (3 dies)
  const lastThree = currentCycleFeedback.slice(0, 3);
  const consecutiveFriction = lastThree.every(
    (f) => f.value === FEEDBACK.PARTIAL || f.value === FEEDBACK.SKIPPED
  );

  if (consecutiveFriction) {
    return {
      risk: 'high',
      type: 'friction',
      message: 'Sembla que el ritme d’aquests últims tres dies demana molta energia. Et recomanem fer una pausa o triar una versió molt suau avui per mantenir la il·lusió.',
    };
  }

  // 2. Detecció de sentiment negatiu acumulat
  const fatigueNotes = currentCycleFeedback.filter((f) => detectSentiment(f.note)).length;
  if (fatigueNotes >= 2 && currentCycleFeedback.length >= 4) {
    return {
      risk: 'medium',
      type: 'sentiment',
      message: 'Hem detectat que algunes proves t’estan costant una mica més del normal. Avui és un bon dia per escoltar el cos i anar sense cap pressa.',
    };
  }

  return { risk: 'low', reason: null };
}
