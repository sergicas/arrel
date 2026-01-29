export const day1Library = {
  physical: {
    label: 'Físic',
    friction: {
      action: 'Resistència Estàtica',
      description:
        "Aguanta la posició d'esquat contra la paret fins a la fallada (o màxim 2 min). Sense música.",
      goal: 'Confrontar el límit.',
    },
    micro: {
      action: 'Moviment No Dominant',
      description: "Renta't les dents (o menja) amb la mà no dominant avui.",
      goal: 'Disrupció motora.',
    },
  },
  mental: {
    // Cognitive
    label: 'Mental',
    friction: {
      action: 'Atenció Sostinguda',
      description:
        'Llegeix un text dens 10 minuts sense apartar la vista. Si apartes la vista, torna a començar.',
      goal: "Domini de l'atenció.",
    },
    micro: {
      action: 'Desplaçament de Rutina',
      description: "Canvia l'ordre del teu ritual matinal completament. Fes-ho diferent.",
      goal: "Trencar l'automatisme.",
    },
  },
  emotional: {
    // Stress
    label: 'Emocional',
    friction: {
      action: 'Immersió en Silenci',
      description:
        'Seu en una cadira. Fes res durant 7 minuts. Sense mòbil, sense música, sense dormir.',
      goal: 'Observar la pressió.',
    },
    micro: {
      action: 'Etiquetatge',
      description: 'Posa una alarma. Quan soni, escriu exactament què sents en una paraula.',
      goal: 'Reconeixement.',
    },
  },
  social: {
    // Isolation
    label: 'Social',
    friction: {
      action: 'Contacte Incòmode',
      description: "Escriu a algú de qui t'has distanciat. No expliquis res. Només saluda.",
      goal: 'Trencar la inèrcia.',
    },
    micro: {
      action: 'Escoltar i Frenar',
      description: 'En la propera conversa, espera 3 segons abans de respondre.',
      goal: 'Frenar la reactivitat.',
    },
  },
  intellectual: {
    // Identity
    label: 'Identitat',
    friction: {
      action: "Auditoria d'Identitat",
      description: "Escriu: 'Què faig cada dia que ja no diu res de qui sóc?'",
      goal: 'Identificar el llast.',
    },
    micro: {
      action: 'Canvi de Perspectiva',
      description:
        'Llegeix una opinió amb la qual discrepes profundament. No la jutgis. Llegeix-la.',
      goal: 'Test de flexibilitat.',
    },
  },
};

export const fixedAnchorTask = {
  area: 'Àncora Física',
  action: 'Moviment Lent',
  description: 'Mou coll, espatlles i columna tan lentament com puguis. 3 minuts.',
  goal: 'Presència somàtica.',
};
