import { generateMockCycleReading } from './cycleReading.js';

/**
 * Servei d'IA d'Arrel
 * Gestiona la transició entre el sistema expert determinístic (Local)
 * i la intel·ligència generativa (Núvol).
 */
export async function getAiReading(payload) {
  // 1. Intentem demanar la lectura a la IA Real (Backend)
  try {
    const response = await fetch('/.netlify/functions/process-ai-insight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      return {
        ...data,
        isRealAi: true, // Flag per indicar que és una lectura profunda
      };
    }
  } catch {
    console.info('Arrel AI: Utilitzant model local per absència de connexió o backend.');
  }

  // 2. Fallback al model local determinístic si falla la xarxa o el backend
  const localReading = generateMockCycleReading(payload);
  return {
    ...localReading,
    isRealAi: false,
  };
}
