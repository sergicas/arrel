import { AREAS } from './types.js';

export const ACTIONS = {
  [AREAS.PHYSICAL]: [
    { day: 1, duration: '≈ 10 min', text: "Camina deu minuts a un ritme que et faci respirar més fort. No més, no menys." },
    { day: 2, duration: '≈ 3 min', text: "Aixeca't de la cadira i torna-hi cinc vegades, sense ajudar-te amb les mans." },
    { day: 3, duration: '≈ 4 min', text: "Apreta una bossa pesada o un drap enrotllat amb tota la força durant deu segons. Repeteix-ho tres cops alternant mans." },
    { day: 4, duration: '≈ 3 min', text: "Mantén-te en equilibri sobre una cama durant trenta segons per costat, ulls oberts i prop d'una paret." },
    { day: 5, duration: '≈ 5 min', text: "Mou tres parts del cos cinc cops cadascuna: coll amb girs lents, espatlles enrere i cintura amb girs petits. Sense forçar." },
    { day: 6, duration: '≈ 10 min', text: "Repeteix la caminada del primer dia. Intenta arribar una mica més lluny." },
  ],
  [AREAS.COGNITIVE]: [
    { day: 1, duration: '≈ 5 min', text: "Aprèn una paraula nova en una llengua que no parlis. Repeteix-la cinc vegades i demà intenta recordar-la sense mirar." },
    { day: 2, duration: '≈ 5 min', text: "Recorda què vas dinar fa tres dies. Anota-ho i, si pots, verifica-ho després amb la nevera, el calendari o algú de casa." },
    { day: 3, duration: '≈ 6 min', text: "Memoritza set objectes que veus a l'habitació. Recita'ls d'aquí cinc minuts." },
    { day: 4, duration: '≈ 4 min', text: "Calcula mentalment 248 + 167. Sense paper ni calculadora. Després, si vols, verifica-ho." },
    { day: 5, duration: '≈ 5 min', text: "Explica en veu alta un concepte que coneguis, com la teva feina, una afició o una recepta, com si parlessis a algú de vuit anys." },
    { day: 6, duration: '≈ 6 min', text: "Anota tres coses que vas fer ahir, en ordre cronològic. Demà, comprova si te'n recordes sense llegir l'anotació." },
  ],
  [AREAS.STRESS]: [
    { day: 1, duration: '≈ 3 min', text: "Asseu-te en silenci tres minuts, sense fer res. Compta les respiracions." },
    { day: 2, duration: '≈ 10 min', text: "Apaga les notificacions del mòbil durant deu minuts. Fes alguna cosa amb les mans: plegar roba, regar plantes o pelar fruita." },
    { day: 3, duration: '≈ 3 min', text: "Surt a fora i mira l'horitzó un minut, sense pantalles. Després respira dues vegades lent." },
    { day: 4, duration: '≈ 4 min', text: "Localitza una tensió física, com coll, espatlles o mandíbula. Posa-hi la mà a sobre i respira lent durant trenta segons." },
    { day: 5, duration: '≈ 10 min', text: "No obris el mòbil els primers deu minuts del matí. Abans fes una cosa lenta: cafè, finestra o una petita tasca de casa." },
    { day: 6, duration: '≈ 5 min', text: "Mentre fas una activitat habitual, com rentar plats o caminar, compta cinc respiracions completes sense interrompre l'activitat." },
  ],
  [AREAS.RELATIONAL]: [
    { day: 1, duration: '≈ 5 min', text: "Truca a algú amb qui no parlis fa més d'un mes. Si no respon, deixa-li un missatge de veu curt." },
    { day: 2, duration: '≈ 3 min', text: "Saluda algú que veus sovint però no coneixes. Si no es dona el moment, envia un missatge curt a algú proper." },
    { day: 3, duration: '≈ 4 min', text: "Escriu un missatge curt a algú només per dir-li que l'has pensat. Sense demanar res." },
    { day: 4, duration: '≈ 3 min', text: "Tingues una conversa de tres minuts sense mirar el mòbil. Si no pots, envia un àudio curt." },
    { day: 5, duration: '≈ 6 min', text: "Pregunta a algú una cosa que no li havies preguntat mai, com què recorda d'una etapa que no t'ha explicat. Si no pots parlar ara, escriu-la i envia-la." },
    { day: 6, duration: '≈ 4 min', text: "Reconeix una virtut d'una persona amb qui sovint discrepes. En directe o en un missatge molt breu." },
  ],
  [AREAS.IDENTITY]: [
    { day: 1, duration: '≈ 5 min', text: "Canvia una microdecisió habitual: ruta, beguda, música o seient. Observa com et queda durant cinc minuts." },
    { day: 2, duration: '≈ 5 min', text: "Acaba aquesta frase: \"Sóc algú que sempre...\". Després escriu un cas concret en què no ho vas ser." },
    { day: 3, duration: '≈ 4 min', text: "Tria una opinió teva ferma. Defensa la posició contrària dos minuts." },
    { day: 4, duration: '≈ 6 min', text: "Recorda una cosa que t'agradava fer als trenta i fa temps que no fas. Escriu si pots tornar-hi en una versió petita." },
    { day: 5, duration: '≈ 5 min', text: "Surt al carrer amb una cosa que avui no és habitual: una jaqueta diferent, un barret o un mocador. Camina cinc minuts amb ella." },
    { day: 6, duration: '≈ 5 min', text: "Anota una cosa nova sobre tu que has descobert aquesta setmana." },
  ],
};

export function durationToMinutes(duration) {
  const match = duration?.match(/\d+/);
  if (!match) return null;
  return Number(match[0]);
}

export function isActionDurationInRange(action, min = 3, max = 10) {
  const minutes = durationToMinutes(action?.duration);
  return Number.isFinite(minutes) && minutes >= min && minutes <= max;
}

export function getAllActions() {
  return Object.values(ACTIONS).flat();
}

function buildActionSteps(action) {
  return [
    'Prepara-ho: fes lloc a la prova i no hi afegeixis cap extra.',
    action.text,
    'Tanca-ho: respira un cop i marca què has comprovat sense corregir-ho.',
  ];
}

export function getAction(area, dayInCycle) {
  if (dayInCycle < 1 || dayInCycle > 6) return null;
  const action = ACTIONS[area]?.[dayInCycle - 1] || null;
  if (!action) return null;
  return {
    ...action,
    steps: buildActionSteps(action),
  };
}
