export const NAV_SECTIONS = [
  {
    title: 'Ús principal',
    items: [
      { to: '/inici', label: 'Presentació', description: 'La promesa d’Arrel i com començar.' },
      { to: '/app', label: 'Prova d’avui', description: 'La prova actual i la lectura del dia.' },
      { to: '/diagnostic', label: 'Ajustar focus', description: 'Cinc preguntes per triar la capacitat prioritària.' },
    ],
  },
  {
    title: 'Seguiment',
    items: [
      { to: '/menu/cicles', label: 'Històric', description: 'Les proves que ja has tancat.' },
      { to: '/menu/arees', label: 'Capacitats', description: 'Cos, memòria, calma, vincles i identitat.' },
    ],
  },
  {
    title: 'Configuració',
    items: [
      { to: '/menu/ritme', label: 'Ritme', description: 'Lent, regular o accelerat.' },
      { to: '/menu/recordatori', label: 'Recordatori', description: 'Un avís diari opcional.' },
      { to: '/menu/sobre', label: 'Sobre Arrel', description: 'Què és, com funciona i dades locals.' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { to: '/legal/privacitat', label: 'Privacitat', description: 'Quines dades guarda Arrel.' },
      { to: '/legal/termes', label: 'Termes', description: 'Límits d’ús i avisos de salut.' },
    ],
  },
];

export const NAV_ITEMS = NAV_SECTIONS.flatMap((section) => section.items);
