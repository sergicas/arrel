import { AREAS, REST_DAY, CYCLE_LENGTH } from './types.js';
import { getAction } from './actions.js';

const AREA_ROTATION = [
  AREAS.PHYSICAL,
  AREAS.COGNITIVE,
  AREAS.STRESS,
  AREAS.RELATIONAL,
  AREAS.IDENTITY,
];

const DIAGNOSTIC_ANSWER_TO_AREA = {
  move_daily: AREAS.PHYSICAL,
  learn_new: AREAS.COGNITIVE,
  be_silent: AREAS.STRESS,
  see_people: AREAS.RELATIONAL,
  change_routine: AREAS.IDENTITY,
};

export function diagnosisToPrimaryArea(answers) {
  const first = answers?.[0];
  return DIAGNOSTIC_ANSWER_TO_AREA[first] || AREAS.PHYSICAL;
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
