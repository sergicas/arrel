export const AREAS = {
  PHYSICAL: 'physical',
  COGNITIVE: 'cognitive',
  STRESS: 'stress',
  RELATIONAL: 'relational',
  IDENTITY: 'identity',
};

export const AREA_LABELS = {
  [AREAS.PHYSICAL]: 'Cos',
  [AREAS.COGNITIVE]: 'Ment',
  [AREAS.STRESS]: 'Estrès',
  [AREAS.RELATIONAL]: 'Vincles',
  [AREAS.IDENTITY]: 'Identitat',
};

export const AREA_SHORT_LABELS = {
  [AREAS.PHYSICAL]: 'Cos',
  [AREAS.COGNITIVE]: 'Ment',
  [AREAS.STRESS]: 'Estrès',
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
    'Accions curtes per moure’t una mica, recuperar mobilitat i tornar a notar el cos sense convertir-ho en entrenament.',
  [AREAS.COGNITIVE]:
    'Petits exercicis per obrir perspectiva, activar l’atenció i sortir dels mateixos camins mentals.',
  [AREAS.STRESS]:
    'Pauses molt concretes per baixar revolucions, respirar millor i no respondre sempre des de la pressa.',
  [AREAS.RELATIONAL]:
    'Gestos senzills per reconnectar amb altres persones sense forçar converses llargues ni fer-ho solemne.',
  [AREAS.IDENTITY]:
    'Accions petites per provar una variació de rutina, mirar-te diferent i recuperar una mica de moviment personal.',
};

export const AREA_GUIDANCE = {
  [AREAS.PHYSICAL]:
    'Durant aquests dies treballarem sobre el cos: força, mobilitat i confiança quotidiana.',
  [AREAS.COGNITIVE]:
    'Durant aquests dies treballarem sobre la ment: flexibilitat, atenció i capacitat de moure perspectiva.',
  [AREAS.STRESS]:
    'Durant aquests dies treballarem sobre el ritme intern: menys reactivitat, més espai per respirar.',
  [AREAS.RELATIONAL]:
    'Durant aquests dies treballarem sobre els vincles: presència, contacte i menys retirada automàtica.',
  [AREAS.IDENTITY]:
    'Durant aquests dies treballarem sobre la identitat: desenganxar-se una mica de la versió de sempre.',
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
