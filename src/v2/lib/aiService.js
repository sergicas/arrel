import { generateMockCycleReading } from './cycleReading.js';
import { synthesizeIdentity } from './identityEngine.js';
import { getDailyCoachDecision } from './dailyCoach.js';

/**
 * Servei d'IA d'Arrel
 * Gestiona la transició entre el sistema expert determinístic (Local)
 * i la intel·ligència generativa (Núvol).
 */
export async function getAiReading(payload, state) {
  // Enriquim el payload amb la identitat i el resum de cicles passats
  const enrichedPayload = {
    ...payload,
    userProfile: synthesizeIdentity(state),
    pastReadingsSummary: (state.cycleReadings || []).map(r => ({
      cycle: r.cycle,
      title: r.reading?.title,
      summary: r.reading?.pattern?.substring(0, 100) + '...'
    })),
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 segons de timeout

  // 1. Intentem demanar la lectura a la IA Real (Backend)
  try {
    const response = await fetch('/.netlify/functions/process-ai-insight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enrichedPayload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return {
        ...data,
        isRealAi: true, // Flag per indicar que és una lectura profunda
      };
    }
  } catch {
    console.info('Arrel AI: Utilitzant model local per absència de connexió, timeout o backend.');
  } finally {
    clearTimeout(timeoutId);
  }

  // 2. Fallback al model local determinístic si falla la xarxa o el backend
  const localReading = generateMockCycleReading(payload);
  return {
    ...localReading,
    isRealAi: false,
  };
}

/**
 * Demana un missatge de bon dia personalitzat a la IA Real.
 */
export async function getDailyCoachInsight(state) {
  const yesterday = (state.feedback || []).find(
    (entry) => entry.cycle === state.cycleNumber && entry.day === state.dayInCycle - 1
  );

  const payload = {
    userProfile: synthesizeIdentity(state),
    yesterday,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segons per al coach

  try {
    const response = await fetch('/.netlify/functions/process-daily-coach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return {
        ...getDailyCoachDecision(state),
        insight: data.insight,
        isRealAi: true,
      };
    }
  } catch {
    // Silenciós: fallback a local
  } finally {
    clearTimeout(timeoutId);
  }

  return {
    ...getDailyCoachDecision(state),
    isRealAi: false,
  };
}
