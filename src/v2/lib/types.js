export const AREAS = {
  PHYSICAL: 'physical',
  COGNITIVE: 'cognitive',
  STRESS: 'stress',
  RELATIONAL: 'relational',
  IDENTITY: 'identity',
};

export const AREA_LABELS = {
  [AREAS.PHYSICAL]: 'Deteriorament funcional del cos',
  [AREAS.COGNITIVE]: 'Rigidesa cognitiva',
  [AREAS.STRESS]: 'Estrès crònic',
  [AREAS.RELATIONAL]: 'Aïllament relacional',
  [AREAS.IDENTITY]: 'Estancament identitari',
};

export const AREA_SHORT_LABELS = {
  [AREAS.PHYSICAL]: 'Cos',
  [AREAS.COGNITIVE]: 'Ment',
  [AREAS.STRESS]: 'Estrès',
  [AREAS.RELATIONAL]: 'Vincles',
  [AREAS.IDENTITY]: 'Identitat',
};

export const AREA_DESCRIPTIONS = {
  [AREAS.PHYSICAL]:
    "El cos perd força, mobilitat i confiança quan passa massa temps sense ser cridat. Arrel hi torna amb demandes petites i clares.",
  [AREAS.COGNITIVE]:
    "La ment es rigidifica quan ja només repeteix camins coneguts. Arrel introdueix friccions petites perquè torni a obrir-se.",
  [AREAS.STRESS]:
    "Quan tot va massa de pressa, el sistema queda sempre en alerta. Arrel crea espais curts perquè el cos torni a baixar.",
  [AREAS.RELATIONAL]:
    "Quan els vincles es debiliten, la vida es fa més estreta. Arrel demana presència concreta, no intensitat teatral.",
  [AREAS.IDENTITY]:
    "Quan una persona ja només es repeteix a si mateixa, es va tancant. Arrel obre esquerdes petites perquè torni el moviment.",
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
  AWAITING_SUBSCRIPTION: 'awaiting_subscription',
};

export const CYCLE_LENGTH = 7;
export const REST_DAY = 7;
export const FREE_CYCLES = 2;
