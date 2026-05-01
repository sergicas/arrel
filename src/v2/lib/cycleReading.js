import { getActionForDay, getAreaForCycle } from './engine.js';
import { AREA_LABELS, FEEDBACK } from './types.js';

const LOW_CONFIDENCE_MIN_DAYS = 3;

function getFeedbackEntries(state) {
  return Array.isArray(state?.feedback) ? state.feedback : [];
}

function getCycleFromFeedback(entries, fallbackCycle) {
  const cycle = Number(fallbackCycle) || 1;
  const currentCycleEntries = entries.filter((entry) => entry.cycle === cycle);
  if (currentCycleEntries.length > 0) return cycle;

  const highestCycleWithFeedback = Math.max(0, ...entries.map((entry) => Number(entry.cycle) || 0));
  return highestCycleWithFeedback || cycle;
}

function areaLabel(area) {
  return AREA_LABELS[area] || 'aquest focus';
}

function pluralize(count, singular, plural) {
  return count === 1 ? singular : plural;
}

function emptyAreaStats(area) {
  return {
    area,
    total: 0,
    done: 0,
    friction: 0,
  };
}

function getAreaStats(days) {
  return days.reduce((stats, day) => {
    const area = day.area || 'unknown';
    const areaStats = stats.get(area) || emptyAreaStats(area);
    areaStats.total += 1;
    if (day.result === FEEDBACK.DONE) areaStats.done += 1;
    if (day.result === FEEDBACK.PARTIAL || day.result === FEEDBACK.SKIPPED) areaStats.friction += 1;
    stats.set(area, areaStats);
    return stats;
  }, new Map());
}

function getStrongestArea(stats, metric) {
  return Array.from(stats.values())
    .filter((entry) => entry[metric] > 0)
    .sort((a, b) => {
      if (b[metric] !== a[metric]) return b[metric] - a[metric];
      if (b.total !== a.total) return b.total - a.total;
      return areaLabel(a.area).localeCompare(areaLabel(b.area), 'ca');
    })[0] || null;
}

function getConfidence(days, availableArea, careArea) {
  if (days.length < LOW_CONFIDENCE_MIN_DAYS) return 'baixa';
  const strongestSignal = Math.max(availableArea?.done || 0, careArea?.friction || 0);
  if (days.length >= 5 && strongestSignal >= 3) return 'alta';
  return 'mitjana';
}

export function buildCycleReadingPayload(state = {}) {
  const entries = getFeedbackEntries(state);
  const cycleNumber = getCycleFromFeedback(entries, state.cycleNumber);
  const cycleArea = getAreaForCycle(
    cycleNumber,
    state.primaryArea,
    cycleNumber === state.cycleNumber ? state.currentCycleArea : null
  );

  const days = entries
    .filter((entry) => entry.cycle === cycleNumber)
    .sort((a, b) => a.day - b.day)
    .map((entry) => {
      const action = getActionForDay(cycleNumber, entry.day, state.primaryArea, cycleArea);
      return {
        day: entry.day,
        area: entry.area || action?.area || cycleArea,
        action: entry.text || action?.text || null,
        duration: entry.duration || action?.duration || null,
        result: entry.value || null,
        note: entry.note || '',
        completedOn: entry.completedOn || null,
      };
    });

  return {
    cycleNumber,
    primaryArea: state.primaryArea || null,
    currentCycleArea: cycleArea || null,
    days,
  };
}

export function generateMockCycleReading(payload = {}) {
  const days = Array.isArray(payload.days) ? payload.days : [];
  const stats = getAreaStats(days);
  const availableArea = getStrongestArea(stats, 'done');
  const careArea = getStrongestArea(stats, 'friction');
  const confidence = getConfidence(days, availableArea, careArea);
  const totalDone = days.filter((day) => day.result === FEEDBACK.DONE).length;
  const totalFriction = days.filter(
    (day) => day.result === FEEDBACK.PARTIAL || day.result === FEEDBACK.SKIPPED
  ).length;
  const suggestionArea = careArea?.area || availableArea?.area || payload.currentCycleArea;

  let pattern = 'Amb les dades d’aquest cicle, encara no hi ha prou base per veure un patró clar.';
  if (days.length >= LOW_CONFIDENCE_MIN_DAYS && totalDone > totalFriction) {
    pattern = 'Amb les dades d’aquest cicle, sembla que algunes proves han estat més fàcils de completar que altres.';
  } else if (days.length >= LOW_CONFIDENCE_MIN_DAYS && totalFriction > totalDone) {
    pattern = 'Amb les dades d’aquest cicle, sembla que alguns dies han demanat ajustar el ritme abans de continuar.';
  } else if (days.length >= LOW_CONFIDENCE_MIN_DAYS) {
    pattern = 'Amb les dades d’aquest cicle, sembla que hi ha hagut dies còmodes i dies amb més esforç.';
  }

  const availableCapacity = availableArea
    ? `La capacitat que apareix amb més disponibilitat és ${areaLabel(availableArea.area)}: ${availableArea.done} ${pluralize(availableArea.done, 'prova marcada', 'proves marcades')} com a “Fet”.`
    : 'Encara no destaca una capacitat disponible amb prou claredat.';

  const carePoint = careArea
    ? `El punt a cuidar podria ser ${areaLabel(careArea.area)}: concentra més respostes de “Fet amb esforç” o “Ho deixo per avui”.`
    : 'No apareix un punt de cura clar; mantén el següent pas petit i senzill.';

  const nextCycleSuggestion = suggestionArea
    ? `Una opció petita per continuar seria repetir una prova curta de ${areaLabel(suggestionArea)} i ajustar-ne la durada si cal.`
    : 'Una opció petita per continuar seria fer una prova curta i observar com et queda avui.';

  const nextActionStyle = totalFriction > totalDone
    ? 'Tria una acció de 3 a 5 minuts, amb marge per deixar-la a mitges i tornar-hi un altre dia.'
    : 'Tria una acció curta, concreta i fàcil de començar.';

  return {
    title: 'Lectura del cicle',
    pattern,
    availableCapacity,
    carePoint,
    nextCycleSuggestion,
    nextActionStyle,
    confidence,
    safetyNote: totalFriction >= 3
      ? 'Si una prova no encaixa avui, deixa-la descansar i torna a una opció més suau.'
      : null,
  };
}
