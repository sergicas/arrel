import { AREA_LABELS } from './types.js';

export function analyzeEvolution(state) {
  const currentCycle = state.cycleNumber;
  const feedback = state.feedback || [];
  const pastReadings = state.cycleReadings || [];

  if (currentCycle <= 1) return null;

  const insights = [];

  // 1. Detecció de constància sostenida
  const lastCycleFeedback = feedback.filter((f) => f.cycle === currentCycle - 1 && f.value === 'done');
  const currentCycleFeedback = feedback.filter((f) => f.cycle === currentCycle && f.value === 'done');
  
  if (lastCycleFeedback.length >= 6) {
    insights.push('Has mantingut una constància excel·lent durant l’últim cicle.');
  } else if (lastCycleFeedback.length + currentCycleFeedback.length >= 10) {
    insights.push('Has mantingut una constància excel·lent durant les últimes dues setmanes.');
  }

  // 2. Repetició d’àrea
  const currentArea = state.currentCycleArea;
  const sameAreaCycles = pastReadings.filter((r) => r.reading?.area === currentArea || feedback.some(f => f.cycle === r.cycle && f.area === currentArea));
  
  if (sameAreaCycles.length >= 1) {
    const areaName = AREA_LABELS[currentArea] || 'aquesta àrea';
    insights.push(`És el segon cicle que treballem la capacitat de ${areaName}, consolidant el que has après.`);
  }

  // 3. Millora de sentiment (molt bàsic per ara)
  const pastNotes = feedback.filter(f => f.cycle < currentCycle).map(f => f.note || '').join(' ').toLowerCase();
  const currentNotes = feedback.filter(f => f.cycle === currentCycle).map(f => f.note || '').join(' ').toLowerCase();
  
  if (pastNotes.includes('costat') && currentNotes.includes('bé') && !currentNotes.includes('costat')) {
    insights.push('Es nota una millora en com perceps les proves: d’un inici amb més esforç a una dinàmica més fluïda.');
  }

  return insights.length > 0 ? insights : null;
}
