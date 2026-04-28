export const AREAS = {
  PHYSICAL: 'physical',
  COGNITIVE: 'cognitive',
  STRESS: 'stress',
  RELATIONAL: 'relational',
  IDENTITY: 'identity',
};

export const AREA_LABELS = {
  [AREAS.PHYSICAL]: 'Cos',
  [AREAS.COGNITIVE]: 'Memòria',
  [AREAS.STRESS]: 'Calma',
  [AREAS.RELATIONAL]: 'Vincles',
  [AREAS.IDENTITY]: 'Identitat',
};

export const AREA_SHORT_LABELS = {
  [AREAS.PHYSICAL]: 'Cos',
  [AREAS.COGNITIVE]: 'Memòria',
  [AREAS.STRESS]: 'Calma',
  [AREAS.RELATIONAL]: 'Vincles',
  [AREAS.IDENTITY]: 'Identitat',
};

export const AREA_ACCENTS = {
  [AREAS.PHYSICAL]: '#9fd7f0',
  [AREAS.COGNITIVE]: '#58bcc9',
  [AREAS.STRESS]: '#7aa7d9',
  [AREAS.RELATIONAL]: '#6ecbd9',
  [AREAS.IDENTITY]: '#8a86d6',
};

export const AREA_ACCENT_SOFT = {
  [AREAS.PHYSICAL]: 'rgba(159, 215, 240, 0.18)',
  [AREAS.COGNITIVE]: 'rgba(88, 188, 201, 0.16)',
  [AREAS.STRESS]: 'rgba(122, 167, 217, 0.16)',
  [AREAS.RELATIONAL]: 'rgba(110, 203, 217, 0.17)',
  [AREAS.IDENTITY]: 'rgba(138, 134, 214, 0.15)',
};

export const AREA_DESCRIPTIONS = {
  [AREAS.PHYSICAL]:
    'Proves petites per conservar mobilitat, força bàsica i confiança corporal sense convertir-ho en entrenament.',
  [AREAS.COGNITIVE]:
    'Proves per sostenir atenció, memòria, curiositat i flexibilitat mental quan els camins de sempre s’estrenyen.',
  [AREAS.STRESS]:
    'Proves de calma per no viure sempre en reacció, recuperar marge i respirar abans de respondre.',
  [AREAS.RELATIONAL]:
    'Gestos senzills per no retirar-se dels altres i mantenir presència amb la gent que importa.',
  [AREAS.IDENTITY]:
    'Proves per no quedar tancat en una versió fixa de tu mateix i seguir reconeixent moviment propi.',
};

export const AREA_GUIDANCE = {
  [AREAS.PHYSICAL]:
    'Aquesta setmana observarem el cos: mobilitat, força mínima i confiança per continuar habitant-lo.',
  [AREAS.COGNITIVE]:
    'Aquesta setmana observarem memòria i atenció: recordar, aprendre i canviar de perspectiva.',
  [AREAS.STRESS]:
    'Aquesta setmana observarem la calma: menys reactivitat i més marge abans de respondre.',
  [AREAS.RELATIONAL]:
    'Aquesta setmana observarem els vincles: contacte, presència i menys retirada automàtica.',
  [AREAS.IDENTITY]:
    'Aquesta setmana observarem la identitat: no quedar-te enganxat a la versió de sempre.',
};

export const FEEDBACK = {
  DONE: 'done',
  PARTIAL: 'partial',
  SKIPPED: 'skipped',
};

export const STATUS = {
  NEW: 'new',
  DIAGNOSTIC: 'diagnostic',
  ACTIVE: 'active',
  INITIAL_PERIOD_COMPLETE: 'initial_period_complete',
};

export const DEFAULT_REMINDER = {
  enabled: false,
  time: '09:00',
  permission: 'unknown',
  platform: 'unknown',
  scheduled: false,
  lastScheduledAt: null,
  error: null,
};

export const CYCLE_LENGTH = 7;
export const REST_DAY = 7;
export const INITIAL_GUIDED_CYCLES = 2;
