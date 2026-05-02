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

  // 1. Detecció de dificultat sostinguda (3 dies)
  const lastThree = currentCycleFeedback.slice(0, 3);
  const consecutiveFriction = lastThree.every(
    (f) => f.value === FEEDBACK.PARTIAL || f.value === FEEDBACK.SKIPPED
  );

  if (consecutiveFriction) {
    return {
      risk: 'high',
      type: 'friction',
      message: 'Sembla que el ritme d’aquests últims dies demana força energia. Escolta el que necessites avui: potser una pausa o una versió molt suau t’ajudaran a mantenir el rumb.',
    };
  }

  // 2. Detecció de cansament acumulat a les notes
  const fatigueNotes = currentCycleFeedback.filter((f) => detectSentiment(f.note)).length;
  if (fatigueNotes >= 2 && currentCycleFeedback.length >= 4) {
    return {
      risk: 'medium',
      type: 'sentiment',
      message: 'Notem que algunes proves t’estan costant una mica més. Avui és un bon dia per anar sense cap pressa i prioritzar la teva comoditat.',
    };
  }

  return { risk: 'low', reason: null };
}
