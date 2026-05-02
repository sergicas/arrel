export const NAV_SECTIONS = [
  {
    title: 'Ús principal',
    items: [
      { to: '/inici', label: 'Presentació', description: 'Autonomia, capacitat i il·lusió, i com començar.' },
      { to: '/app', label: 'Prova d’avui', description: 'La prova actual i la lectura del dia.' },
      { to: '/diagnostic', label: 'Ajustar focus', description: 'Cinc preguntes per triar la capacitat prioritària.' },
    ],
  },
  {
    title: 'Seguiment',
    items: [
      { to: '/menu/identitat', label: 'El meu camí', description: 'Com Arrel llegeix la teva evolució.' },
      { to: '/menu/cicles', label: 'Històric', description: 'Les proves que ja has tancat.' },
      { to: '/menu/arees', label: 'Capacitats', description: 'Cos, memòria, calma, vincles i propòsit.' },
    ],
  },
  {
    title: 'Configuració',
    items: [
      { to: '/menu/ritme', label: 'Ritme', description: 'Lent o regular.' },
      { to: '/menu/recordatori', label: 'Recordatori', description: 'Un avís diari opcional.' },
      { to: '/menu/sobre', label: 'Sobre Arrel', description: 'Què és, com funciona i dades locals.' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { to: '/legal/privacitat', label: 'Privacitat', description: 'Quines dades guarda Arrel.' },
      { to: '/legal/termes', label: 'Termes', description: 'Ús de les proves i avisos de seguretat.' },
    ],
  },
];

export const NAV_ITEMS = NAV_SECTIONS.flatMap((section) => section.items);
