export const AREAS = {
  PHYSICAL: 'physical',
  COGNITIVE: 'cognitive',
  STRESS: 'stress',
  RELATIONAL: 'relational',
  IDENTITY: 'identity',
};

export const AREA_LABELS = {
  [AREAS.PHYSICAL]: 'Deteriorament físic',
  [AREAS.COGNITIVE]: 'Rigidesa cognitiva',
  [AREAS.STRESS]: 'Estrès crònic',
  [AREAS.RELATIONAL]: 'Aïllament relacional',
  [AREAS.IDENTITY]: 'Estancament identitari',
};

export const AREA_DESCRIPTIONS = {
  [AREAS.PHYSICAL]:
    "El cos perd força, mobilitat i resistència quan no se'l demana res. Arrel torna a demanar-li petites coses.",
  [AREAS.COGNITIVE]:
    "La ment es rigidifica quan repeteix les mateixes operacions. Arrel introdueix petites incomoditats que la fan moure's.",
  [AREAS.STRESS]:
    "L'estrès crònic accelera el deteriorament a tots els nivells. Arrel hi obre escletxes de silenci.",
  [AREAS.RELATIONAL]:
    "L'aïllament és un dels factors d'envelliment més infraestimats. Arrel demana presència, no espectacle.",
  [AREAS.IDENTITY]:
    "Quan la identitat es congela, el creixement s'atura. Arrel proposa fissures controlades.",
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
  AWAITING_SUBSCRIPTION: 'awaiting_subscription',
};

export const CYCLE_LENGTH = 7;
export const REST_DAY = 7;
export const FREE_CYCLES = 2;
