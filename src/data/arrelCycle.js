/**
 * ARREL TEMPORAL SKELETON
 *
 * "Aging uses rhythm to dull the body. Arrel uses rhythm to wake it up."
 */

export const CYCLE_STRUCTURE = {
  length: 7, // days
  phases: {
    1: {
      name: 'TALL INICIAL',
      logic: 'Activació de 2 àrees. Accions mínimes però incòmodes.',
      tone: 'Directe',
      message: 'Avui no cal fer més.',
    },
    2: {
      name: 'AJUST FI',
      logic: 'Reduir volum. Mantenir fricció real. Cap novetat.',
      tone: 'Observador',
      message: 'Aquí encara costa. Continuem aquí.',
    },
    3: {
      name: 'AJUST FI',
      logic: 'Reduir volum. Mantenir fricció real.',
      tone: 'Observador',
      message: 'Aquí encara costa.',
    },
    4: {
      name: 'DESPLAÇAMENT',
      logic: "Variació d'angle. Mateixa àrea, diferent aproximació.",
      tone: 'Analític',
      message: 'No és el què. És el com.',
    },
    5: {
      name: 'TENSIÓ CONTROLADA',
      logic: 'Més exigent. Més precís. Sense suavitzar.',
      tone: 'Exigent',
      message: 'Avui no ho suavitzem.',
    },
    6: {
      name: 'RETIRADA',
      logic: 'No afegir res. Només cos + observació curta.',
      tone: 'Minimalista',
      message: 'Fes menys. Mira més.',
    },
    7: {
      name: 'SILENCI',
      logic: 'Cap acció. Cap missatge. Només reflexió final.',
      tone: 'Absent',
      message: 'Què ha canviat, encara que sigui poc?',
    },
  },
};

export const INSISTENCE_TRIGGERS = {
  condition: "Area accumulates avoidance for 2 cycles OR 'not-done' repeated.",
  action: 'Reduce everything to ONE single action. Maintain for days.',
  phrase: 'Això no és casual.',
};

export const SILENCE_TRIGGERS = {
  condition: 'User complies without resistance. Automation detected.',
  action: 'Do not add. Do not reward. Do not comment.',
  phrase: 'Aquí no cal tocar res.',
};

export const MACRO_RHYTHM = {
  cycleLength: 28, // 4 cycles
  action: 'Mini-review of variables. Possible pivot.',
  rule: 'NO CELEBRATION. NO RESET.',
};
