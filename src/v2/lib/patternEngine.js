import { FEEDBACK } from './types.js';

const DAYS_CA = ['diumenge', 'dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte'];

function getTimeSlot(timestamp) {
  const hour = new Date(timestamp).getHours();
  if (hour >= 5 && hour < 12) return 'el matí';
  if (hour >= 12 && hour < 17) return 'el migdia';
  if (hour >= 17 && hour < 21) return 'la tarda';
  return 'el vespre/nit';
}

function getScore(value) {
  if (value === FEEDBACK.DONE) return 1;
  if (value === FEEDBACK.PARTIAL) return 0.5;
  return 0;
}

export function identifyPatterns(feedback = []) {
  if (feedback.length < 5) return null;

  const validEntries = feedback.filter(f => f.at);
  if (validEntries.length < 5) return null;

  const patterns = [];

  // 1. Millor dia de la setmana
  const dayStats = {};
  validEntries.forEach(f => {
    const day = new Date(f.at).getDay();
    if (!dayStats[day]) dayStats[day] = { total: 0, score: 0 };
    dayStats[day].total += 1;
    dayStats[day].score += getScore(f.value);
  });

  const dayKeys = Object.keys(dayStats);
  if (dayKeys.length > 0) {
    const bestDay = dayKeys.reduce((a, b) => {
      const avgA = dayStats[a].score / dayStats[a].total;
      const avgB = dayStats[b].score / dayStats[b].total;
      return avgA >= avgB ? a : b;
    });

    if (bestDay !== null && dayStats[bestDay].total >= 2 && (dayStats[bestDay].score / dayStats[bestDay].total) >= 0.8) {
      patterns.push({
        id: 'best_day',
        text: `Els ${DAYS_CA[bestDay]}s semblen ser els teus dies amb més disponibilitat.`,
      });
    }
  }

  // 2. Millor franja horària
  const slotStats = {};
  validEntries.forEach(f => {
    const slot = getTimeSlot(f.at);
    if (!slotStats[slot]) slotStats[slot] = { total: 0, score: 0 };
    slotStats[slot].total += 1;
    slotStats[slot].score += getScore(f.value);
  });

  const slotKeys = Object.keys(slotStats);
  if (slotKeys.length > 0) {
    const bestSlot = slotKeys.reduce((a, b) => {
      const avgA = slotStats[a].score / slotStats[a].total;
      const avgB = slotStats[b].score / slotStats[b].total;
      return avgA >= avgB ? a : b;
    });

    if (bestSlot && slotStats[bestSlot].total >= 3 && (slotStats[bestSlot].score / slotStats[bestSlot].total) >= 0.8) {
      patterns.push({
        id: 'best_slot',
        text: `T’està anant molt bé aprofitar ${bestSlot} per fer les teves proves.`,
      });
    }
  }

  // 3. Patrons de sentiment (keywords recurrents en moments d'èxit)
  const successNotes = validEntries.filter(f => f.value === FEEDBACK.DONE && f.note);
  if (successNotes.length >= 3) {
    const keywords = ['tranquil', 'casa', 'sol', 'natura', 'música', 'ordre'];
    const found = keywords.find(k => successNotes.filter(n => n.note.toLowerCase().includes(k)).length >= 2);
    if (found) {
      patterns.push({
        id: 'context',
        text: `Hem notat que quan hi ha un context de "${found}", les proves surten millor.`,
      });
    }
  }

  return patterns.length > 0 ? patterns : null;
}
