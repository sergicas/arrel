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
  [AREAS.PHYSICAL]: '#d98a24',
  [AREAS.COGNITIVE]: '#c9583b',
  [AREAS.STRESS]: '#d64c75',
  [AREAS.RELATIONAL]: '#d86b31',
  [AREAS.IDENTITY]: '#8f5bd8',
};

export const AREA_ACCENT_SOFT = {
  [AREAS.PHYSICAL]: 'rgba(217, 138, 36, 0.18)',
  [AREAS.COGNITIVE]: 'rgba(201, 88, 59, 0.16)',
  [AREAS.STRESS]: 'rgba(214, 76, 117, 0.16)',
  [AREAS.RELATIONAL]: 'rgba(216, 107, 49, 0.17)',
  [AREAS.IDENTITY]: 'rgba(143, 91, 216, 0.15)',
};

export const AREA_DESCRIPTIONS = {
  [AREAS.PHYSICAL]:
    'Proves petites per conservar mobilitat, força bàsica i confiança corporal sense convertir-ho en entrenament.',
  [AREAS.COGNITIVE]:
    'Proves per practicar atenció, record i aprenentatge amb exercicis curts.',
  [AREAS.STRESS]:
    'Proves per fer pauses breus i baixar la tensió abans de continuar.',
  [AREAS.RELATIONAL]:
    'Gestos senzills per parlar, escoltar i mantenir contacte amb persones concretes.',
  [AREAS.IDENTITY]:
    'Proves per provar decisions petites i mantenir curiositat sobre tu mateix.',
};

export const AREA_GUIDANCE = {
  [AREAS.PHYSICAL]:
    'Aquesta setmana treballes el cos: mobilitat, força bàsica i equilibri.',
  [AREAS.COGNITIVE]:
    'Aquesta setmana treballes memòria i atenció: recordar, aprendre i concentrar-te.',
  [AREAS.STRESS]:
    'Aquesta setmana treballes la calma: fer pausa, respirar i continuar amb menys tensió.',
  [AREAS.RELATIONAL]:
    'Aquesta setmana treballes els vincles: contactar, escoltar i estar present.',
  [AREAS.IDENTITY]:
    'Aquesta setmana treballes la identitat: fer una cosa diferent i veure com et queda.',
};

export const FEEDBACK = {
  DONE: 'done',
  PARTIAL: 'partial',
  SKIPPED: 'skipped',
};

export const PACE = {
  SLOW: 'slow',
  REGULAR: 'regular',
  ACCELERATED: 'accelerated',
};

export const PACE_ORDER = [
  PACE.SLOW,
  PACE.REGULAR,
  PACE.ACCELERATED,
];

export const PACE_OPTIONS = {
  [PACE.SLOW]: {
    label: 'Lent',
    meta: '1 prova al dia',
    description: 'Per fer una prova i esperar fins demà.',
    closedTitle: 'Prova guardada.',
    closedCopy:
      'En ritme lent, la prova següent s’obre demà. Avui no cal fer res més.',
    availableButton: 'Obrir la prova següent',
    availableRestButton: 'Obrir el descans',
    unavailableButton: 'S’obre demà',
    cycleUnavailableButton: 'El cicle nou s’obre demà',
  },
  [PACE.REGULAR]: {
    label: 'Regular',
    meta: 'cada 6 hores',
    description: 'Per obrir fins a quatre proves al dia.',
    closedTitle: 'Prova guardada.',
    closedCopy:
      'En ritme regular, la prova següent s’obre al cap d’unes hores.',
    availableButton: 'Obrir la prova següent',
    availableRestButton: 'Obrir el descans',
    unavailableButton: 'S’obre més tard',
    cycleUnavailableButton: 'El cicle nou s’obre més tard',
  },
  [PACE.ACCELERATED]: {
    label: 'Accelerat',
    meta: 'sense espera',
    description: 'Per obrir la prova següent immediatament.',
    closedTitle: 'Prova guardada.',
    closedCopy:
      'En ritme accelerat, pots obrir ara la prova següent.',
    availableButton: 'Obrir la prova següent',
    availableRestButton: 'Obrir el descans',
    unavailableButton: 'S’obre ara',
    cycleUnavailableButton: 'El cicle nou s’obre ara',
  },
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
