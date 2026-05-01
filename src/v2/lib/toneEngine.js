export const USER_STYLES = {
  CONCISE: 'concise',
  REFLECTIVE: 'reflective',
  BALANCED: 'balanced',
};

export function analyzeUserStyle(feedback = []) {
  if (feedback.length < 3) return USER_STYLES.BALANCED;

  const entriesWithNotes = feedback.filter((f) => f.note && f.note.trim().length > 0);
  
  // Si no hi ha notes en absolut després de 3 entrades -> CONCISE
  if (entriesWithNotes.length === 0) return USER_STYLES.CONCISE;

  const totalLength = entriesWithNotes.reduce((acc, f) => acc + f.note.trim().length, 0);
  const averageLength = totalLength / entriesWithNotes.length;

  // REFLECTIVE: Notes llargues (més de 50 caràcters de mitjana) I força freqüència
  if (averageLength > 50 && entriesWithNotes.length / feedback.length >= 0.5) {
    return USER_STYLES.REFLECTIVE;
  }

  // CONCISE: Molt poques notes (menys del 30%) O notes extremadament curtes (mitjana < 15)
  if (entriesWithNotes.length / feedback.length < 0.3 || averageLength < 15) {
    return USER_STYLES.CONCISE;
  }

  return USER_STYLES.BALANCED;
}

export function adaptTextToStyle(textMap, style) {
  return textMap[style] || textMap[USER_STYLES.BALANCED] || textMap[USER_STYLES.CONCISE];
}
