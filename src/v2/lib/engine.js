import { AREAS, REST_DAY, CYCLE_LENGTH } from './types.js';
import { getAction } from './actions.js';

const AREA_ROTATION = [
  AREAS.PHYSICAL,
  AREAS.COGNITIVE,
  AREAS.STRESS,
  AREAS.RELATIONAL,
  AREAS.IDENTITY,
];

function baseScores() {
  return {
    [AREAS.PHYSICAL]: 0,
    [AREAS.COGNITIVE]: 0,
    [AREAS.STRESS]: 0,
    [AREAS.RELATIONAL]: 0,
    [AREAS.IDENTITY]: 0,
  };
}

export function scoreDiagnosis(answers = []) {
  return answers.reduce((scores, answer) => {
    if (!answer?.weights) return scores;

    Object.entries(answer.weights).forEach(([area, weight]) => {
      scores[area] = (scores[area] || 0) + weight;
    });

    return scores;
  }, baseScores());
}

export function getRankedAreas(scores) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([area]) => area);
}

export function diagnosisToPrimaryArea(answers) {
  const ranked = getRankedAreas(scoreDiagnosis(answers));
  return ranked[0] || AREAS.PHYSICAL;
}

export function getAreaForCycle(cycleNumber, primaryArea) {
  if (cycleNumber === 1) return primaryArea;
  const startIdx = AREA_ROTATION.indexOf(primaryArea);
  if (startIdx < 0) return AREA_ROTATION[0];
  const idx = (startIdx + (cycleNumber - 1)) % AREA_ROTATION.length;
  return AREA_ROTATION[idx];
}

export function isRestDay(dayInCycle) {
  return dayInCycle === REST_DAY;
}

export function getActionForDay(cycleNumber, dayInCycle, primaryArea) {
  if (isRestDay(dayInCycle)) return null;
  const area = getAreaForCycle(cycleNumber, primaryArea);
  return { ...getAction(area, dayInCycle), area };
}

export function isCycleEnd(dayInCycle) {
  return dayInCycle >= CYCLE_LENGTH;
}
