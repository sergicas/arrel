import { getActionForDay, getAreaForCycle } from './engine.js';
import { durationToMinutes, getAction } from './actions.js';
import { AREA_LABELS, AREAS, FEEDBACK } from './types.js';
import { analyzeEvolution } from './evolutionEngine.js';
import { analyzeUserStyle } from './toneEngine.js';
import { identifyPatterns } from './patternEngine.js';

const LOW_CONFIDENCE_MIN_DAYS = 3;
const RESULT_SCORE = {
  [FEEDBACK.DONE]: 1,
  [FEEDBACK.PARTIAL]: 0,
  [FEEDBACK.SKIPPED]: -1,
};

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

function scoreDay(day) {
  return RESULT_SCORE[day.result] ?? 0;
}

function averageScore(days) {
  if (days.length === 0) return 0;
  return days.reduce((total, day) => total + scoreDay(day), 0) / days.length;
}

function dayList(days) {
  const labels = days.map((day) => day.day);
  if (labels.length <= 1) return labels.join('');
  return `${labels.slice(0, -1).join(', ')} i ${labels.at(-1)}`;
}

function firstSentence(text) {
  return text?.split(/[.!?]/)[0]?.trim() || 'aquesta prova';
}

function shorten(text, max = 86) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 3).trim()}...`;
}

function capitalizeFirst(text) {
  if (!text) return '';
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}

function actionLabel(day) {
  return `dia ${day.day}, “${shorten(firstSentence(day.action))}”`;
}

function noteExcerpt(note) {
  const clean = note?.trim();
  if (!clean) return null;
  return clean.length > 96 ? `${clean.slice(0, 93)}...` : clean;
}

function endsWithSentencePunctuation(text) {
  return /[.!?…]$/.test(text);
}

function getContextNote(days, careDay, availableDay) {
  const preferred = [careDay, availableDay].find((day) => noteExcerpt(day?.note));
  return preferred || days.find((day) => noteExcerpt(day.note)) || null;
}

function metadataFor(day) {
  return day.metadata || {};
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

function getConfidence(days, availableDay, careDay, trajectory) {
  if (days.length < LOW_CONFIDENCE_MIN_DAYS) return 'baixa';
  if (days.length >= 5 && availableDay && careDay && trajectory.kind !== 'mixed') return 'alta';
  return 'mitjana';
}

function buildTrajectory(days) {
  const sorted = [...days].sort((a, b) => a.day - b.day);
  const doneCount = sorted.filter((day) => day.result === FEEDBACK.DONE).length;
  const partialCount = sorted.filter((day) => day.result === FEEDBACK.PARTIAL).length;
  const skippedCount = sorted.filter((day) => day.result === FEEDBACK.SKIPPED).length;

  if (sorted.length < LOW_CONFIDENCE_MIN_DAYS) {
    return {
      kind: 'low-data',
      label: 'poca base',
      text: 'Amb les dades d’aquest cicle, encara no hi ha prou base per veure una trajectòria clara.',
    };
  }

  const midpoint = Math.ceil(sorted.length / 2);
  const firstHalf = sorted.slice(0, midpoint);
  const secondHalf = sorted.slice(midpoint);
  const firstScore = averageScore(firstHalf);
  const secondScore = averageScore(secondHalf);

  if (firstScore - secondScore >= 0.75) {
    return {
      kind: 'started-available',
      label: 'inici més disponible',
      text: `Amb les dades d’aquest cicle, l’inici va entrar amb més disponibilitat: els dies ${dayList(firstHalf)} van anar millor que el tram final.`,
    };
  }

  if (secondScore - firstScore >= 0.75) {
    return {
      kind: 'ended-available',
      label: 'final més disponible',
      text: `Amb les dades d’aquest cicle, el final va agafar més entrada: els dies ${dayList(secondHalf)} van quedar més disponibles que l’inici.`,
    };
  }

  if (doneCount >= sorted.length - 1) {
    return {
      kind: 'steady',
      label: 'continuïtat',
      text: `Amb les dades d’aquest cicle, hi ha una continuïtat clara: ${doneCount} ${pluralize(doneCount, 'prova consta', 'proves consten')} com a “Fet”.`,
    };
  }

  if (skippedCount > 0) {
    return {
      kind: 'interrupted',
      label: 'pas massa gran en algun moment',
      text: `Amb les dades d’aquest cicle, no tot demanava el mateix: ${partialCount} ${pluralize(partialCount, 'dia va sortir', 'dies van sortir')} amb esforç i ${skippedCount} ${pluralize(skippedCount, 'dia va quedar', 'dies van quedar')} per avui.`,
    };
  }

  if (partialCount > 0) {
    return {
      kind: 'with-effort',
      label: 'continuïtat amb esforç',
      text: `Amb les dades d’aquest cicle, sembla que hi ha hagut continuïtat, però amb marge: ${partialCount} ${pluralize(partialCount, 'dia va demanar', 'dies van demanar')} més esforç.`,
    };
  }

  return {
    kind: 'mixed',
    label: 'senyals mixtes',
    text: 'Amb les dades d’aquest cicle, hi ha senyals barrejades i convé quedar-se amb un pas petit.',
  };
}

function getMostAvailableDay(days) {
  return [...days]
    .filter((day) => day.result === FEEDBACK.DONE)
    .sort((a, b) => {
      const aIntensity = metadataFor(a).intensity === 'low' ? 0 : 1;
      const bIntensity = metadataFor(b).intensity === 'low' ? 0 : 1;
      if (aIntensity !== bIntensity) return aIntensity - bIntensity;
      const aMinutes = durationToMinutes(a.duration) || 99;
      const bMinutes = durationToMinutes(b.duration) || 99;
      if (aMinutes !== bMinutes) return aMinutes - bMinutes;
      return a.day - b.day;
    })[0] || null;
}

function getMostCostlyDay(days) {
  return [...days]
    .filter((day) => day.result === FEEDBACK.PARTIAL || day.result === FEEDBACK.SKIPPED)
    .sort((a, b) => {
      const aDifficulty = a.result === FEEDBACK.SKIPPED ? 2 : 1;
      const bDifficulty = b.result === FEEDBACK.SKIPPED ? 2 : 1;
      if (aDifficulty !== bDifficulty) return bDifficulty - aDifficulty;
      const aMinutes = durationToMinutes(a.duration) || 0;
      const bMinutes = durationToMinutes(b.duration) || 0;
      if (aMinutes !== bMinutes) return bMinutes - aMinutes;
      return b.day - a.day;
    })[0] || null;
}

function buildTitle(trajectory, availableDay, careDay) {
  if (trajectory.kind === 'started-available') return 'Un cicle que va començar amb més entrada';
  if (trajectory.kind === 'ended-available') return 'Un cicle que va anar trobant entrada';
  if (trajectory.kind === 'steady') return `Un cicle amb continuïtat en ${areaLabel(availableDay?.area)}`;
  if (careDay?.result === FEEDBACK.SKIPPED) return 'Un cicle que demana un pas més petit';
  if (trajectory.kind === 'with-effort') return 'Un cicle fet amb marge';
  return 'Una lectura prudent del cicle';
}

function buildAvailableCapacity(availableDay, fallbackArea) {
  if (!availableDay) return 'Encara no destaca una acció disponible amb prou claredat.';

  const metadata = metadataFor(availableDay);
  const signal = metadata.capacitySignal || `capacitat de ${areaLabel(availableDay.area || fallbackArea)}`;
  const motivation = metadata.motivationSignal ? ` ${capitalizeFirst(metadata.motivationSignal)}.` : '';

  return `El que sembla més disponible és aquest format: ${signal}. Ho apunta el ${actionLabel(availableDay)}, marcat com a “Fet”.${motivation}`;
}

function buildCarePoint(careDay) {
  if (!careDay) return 'No apareix un punt de cura clar; mantén el següent pas petit i senzill.';

  const metadata = metadataFor(careDay);
  const note = noteExcerpt(careDay.note);
  const noteText = note
    ? ` La nota del dia diu: “${note}”${endsWithSentencePunctuation(note) ? '' : '.'}`
    : '';
  const autonomy = metadata.autonomySignal ? ` Aquí pot ajudar recordar que ${metadata.autonomySignal}.` : '';

  if (careDay.result === FEEDBACK.SKIPPED) {
    return `El punt a cuidar és el salt de mida: el ${actionLabel(careDay)} va quedar com a “Ho deixo per avui”.${noteText} Una versió més curta pot ser suficient.${autonomy}`;
  }

  return `El punt a cuidar és el marge: el ${actionLabel(careDay)} va sortir com a “Fet amb esforç”.${noteText} No cal repetir-lo igual; convé abaixar-ne una mica la mida.${autonomy}`;
}

function detectSentiment(days) {
  const notes = days.map((d) => (d.note || '').toLowerCase()).join(' ');
  const fatigueKeywords = ['costat', 'cansat', 'pesat', 'difícil', 'poca ganes', 'esforç', 'prou'];
  const momentumKeywords = ['bé', 'fàcil', 'ganes', 'm’ha agradat', 'repetir', 'fluït', 'tranquil'];

  const hasFatigue = fatigueKeywords.some((word) => notes.includes(word));
  const hasMomentum = momentumKeywords.some((word) => notes.includes(word));

  if (hasFatigue && !hasMomentum) return 'fatigue';
  if (hasMomentum && !hasFatigue) return 'momentum';
  return 'neutral';
}

function buildNextCycleSuggestion(days, careDay, availableDay, fallbackArea) {
  const sentiment = detectSentiment(days);
  const frictionCount = days.filter(
    (day) => day.result === FEEDBACK.PARTIAL || day.result === FEEDBACK.SKIPPED
  ).length;
  const doneCount = days.filter((day) => day.result === FEEDBACK.DONE).length;

  // Cas de Fatiga o molta fricció: Consolidació
  if (sentiment === 'fatigue' || frictionCount >= 3) {
    return {
      label: 'Consolidació',
      text: `Sembla que algunes proves han demanat força energia. Et proposo un cicle de consolidació en l’àrea de ${areaLabel(fallbackArea)}: repetir proves curtes per guanyar comoditat sense pressa.`,
    };
  }

  // Cas d'Impuls: Exploració o Reptes més alts
  if (sentiment === 'momentum' || doneCount >= 5) {
    return {
      label: 'Exploració',
      text: `Has anat amb molt bon ritme. És un bon moment per explorar una àrea nova o provar un format diferent per mantenir l’estímul viu. Què et sembla provar una setmana de ${areaLabel(fallbackArea === AREAS.PHYSICAL ? AREAS.COGNITIVE : AREAS.PHYSICAL)}?`,
    };
  }

  // Cas per defecte: Continuïtat
  const sourceDay = careDay || availableDay;
  const metadata = metadataFor(sourceDay || {});
  const suggestion = metadata.nextSmallStep
    ? `continuar amb un pas com: ${metadata.nextSmallStep}`
    : `repetir una prova curta de ${areaLabel(fallbackArea)} i ajustar-ne la durada si cal`;

  return {
    label: 'Continuïtat',
    text: `El cicle ha estat equilibrat. Una bona opció seria ${suggestion}.`,
  };
}

function buildNextActionStyle(careDay, availableDay) {
  if (careDay?.result === FEEDBACK.SKIPPED) {
    return 'Estil recomanat: una versió mínima, preparada perquè sigui vàlid aturar-se aviat.';
  }
  if (careDay?.result === FEEDBACK.PARTIAL) {
    return 'Estil recomanat: la mateixa direcció, però amb menys durada o menys intensitat.';
  }
  if (availableDay) {
    const metadata = metadataFor(availableDay);
    if (metadata.intensity === 'low') return 'Estil recomanat: acció curta, baixa intensitat i inici fàcil.';
  }
  return 'Estil recomanat: acció curta, concreta i fàcil de començar.';
}

function buildConfidenceReason(confidence, noteDay) {
  if (noteDay) {
    return `Confiança ${confidence}: hi ha resultats del cicle i una frase escrita que dona més context.`;
  }
  return `Confiança ${confidence}: basada només en els resultats marcats del cicle.`;
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
      const entryArea = entry.area || cycleArea;
      const action = entryArea
        ? getAction(entryArea, entry.day)
        : getActionForDay(cycleNumber, entry.day, state.primaryArea, cycleArea);
      return {
        day: entry.day,
        area: entryArea || action?.area || cycleArea,
        action: entry.text || action?.text || null,
        duration: entry.duration || action?.duration || null,
        result: entry.value || null,
        note: entry.note || '',
        completedOn: entry.completedOn || null,
        metadata: action?.metadata || null,
      };
    });

  return {
    cycleNumber,
    primaryArea: state.primaryArea || null,
    currentCycleArea: cycleArea || null,
    days,
    evolutionInsights: analyzeEvolution(state),
    wellBeingPatterns: identifyPatterns(state.feedback),
  };
}

export function generateMockCycleReading(payload = {}) {
  const days = Array.isArray(payload.days) ? payload.days : [];
  const stats = getAreaStats(days);
  const availableArea = getStrongestArea(stats, 'done');
  const careArea = getStrongestArea(stats, 'friction');
  const trajectory = buildTrajectory(days);
  const availableDay = getMostAvailableDay(days);
  const careDay = getMostCostlyDay(days);
  const noteDay = getContextNote(days, careDay, availableDay);
  const note = noteExcerpt(noteDay?.note);
  const confidence = getConfidence(days, availableDay, careDay, trajectory);
  const totalDone = days.filter((day) => day.result === FEEDBACK.DONE).length;
  const totalPartial = days.filter((day) => day.result === FEEDBACK.PARTIAL).length;
  const totalSkipped = days.filter((day) => day.result === FEEDBACK.SKIPPED).length;
  const totalFriction = days.filter(
    (day) => day.result === FEEDBACK.PARTIAL || day.result === FEEDBACK.SKIPPED
  ).length;
  const suggestionArea = careArea?.area || availableArea?.area || payload.currentCycleArea;
  const resultSummary = `${totalDone} ${pluralize(totalDone, 'dia', 'dies')} com a “Fet”, ${totalPartial} amb “Fet amb esforç” i ${totalSkipped} com a “Ho deixo per avui”`;
  const noteContext = note
    ? ` També has deixat una frase sobre el dia ${noteDay.day}: “${note}”${endsWithSentencePunctuation(note) ? ' ' : '. '}Això dona més context a la lectura.`
    : '';
  
  const userStyle = analyzeUserStyle(days);

  const evolution = Array.isArray(payload.evolutionInsights) && payload.evolutionInsights.length > 0 && userStyle !== 'concise'
    ? `\n\nPerspectiva: ${payload.evolutionInsights.join(' ')}`
    : '';

  const patterns = Array.isArray(payload.wellBeingPatterns) && payload.wellBeingPatterns.length > 0
    ? `\n\nPatró d’èxit: ${payload.wellBeingPatterns.map(p => p.text).join(' ')}`
    : '';

  const trajectoryText = userStyle === 'concise' 
    ? 'Trajectòria del cicle:' 
    : trajectory.text;

  const pattern = `${trajectoryText} En conjunt: ${resultSummary}.${noteContext}${evolution}${patterns}`;

  return {
    title: buildTitle(trajectory, availableDay, careDay),
    pattern,
    availableCapacity: buildAvailableCapacity(availableDay, payload.currentCycleArea),
    carePoint: buildCarePoint(careDay),
    nextCycleSuggestion: buildNextCycleSuggestion(days, careDay, availableDay, suggestionArea),
    nextActionStyle: buildNextActionStyle(careDay, availableDay),
    confidence,
    confidenceReason: buildConfidenceReason(confidence, noteDay),
    safetyNote: totalFriction >= 3 || totalSkipped > 0
      ? 'Si una prova no encaixa avui, deixa-la descansar i torna a una opció més suau.'
      : null,
  };
}
