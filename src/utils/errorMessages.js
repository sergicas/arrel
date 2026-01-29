export const ERROR_MESSAGES = {
  404: {
    title: 'Aquesta pàgina no existeix',
    description:
      "La pàgina que busques no s'ha trobat. Potser l'URL és incorrecta o la pàgina s'ha mogut.",
    icon: '🔍',
    actions: ['go_home'],
  },
  500: {
    title: 'Error del servidor',
    description:
      'Hi ha hagut un problema amb el nostre servidor. Estem treballant per solucionar-ho.',
    icon: '🔧',
    actions: ['retry', 'report'],
  },
  NETWORK_ERROR: {
    title: 'Sense connexió',
    description: 'No hem pogut connectar amb el servidor. Comprova la teva connexió a internet.',
    icon: '📡',
    actions: ['retry'],
  },
  DATA_LOAD_ERROR: {
    title: 'Error carregant les dades',
    description: 'No hem pogut carregar la informació. Les teves dades guardades estan segures.',
    icon: '💾',
    actions: ['retry', 'go_home'],
  },
  GENERIC: {
    title: 'Alguna cosa ha anat malament',
    description:
      "S'ha produït un error inesperat. Si el problema persisteix, contacta amb nosaltres.",
    icon: '⚠️',
    actions: ['retry', 'report'],
  },
};
