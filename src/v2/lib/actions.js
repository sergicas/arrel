import { AREAS } from './types.js';

export const ACTIONS = {
  [AREAS.PHYSICAL]: [
    { day: 1, duration: '≈ 10 min', text: "Camina deu minuts a un ritme que et faci respirar més fort. No més, no menys." },
    { day: 2, duration: '≈ 3 min', text: "Aixeca't de la cadira i torna-hi cinc vegades, sense ajudar-te amb les mans." },
    { day: 3, duration: '≈ 4 min', text: "Apreta una tovallola doblegada fermament, sense forçar, durant deu segons per cada mà." },
    { day: 4, duration: '≈ 3 min', text: "Mantén-te en equilibri sobre una cama durant trenta segons per costat, ulls oberts i prop d'una paret." },
    { day: 5, duration: '≈ 5 min', text: "Mou tres parts del cos cinc cops cadascuna: coll amb girs lents, espatlles enrere i cintura amb girs petits. Sense forçar." },
    { day: 6, duration: '≈ 10 min', text: "Repeteix la caminada del primer dia i observa com et sents. No cal anar més lluny." },
  ],
  [AREAS.COGNITIVE]: [
    { day: 1, duration: '≈ 5 min', text: "Aprèn una paraula nova en una llengua que no parlis. Repeteix-la cinc vegades i demà intenta recordar-la sense mirar." },
    { day: 2, duration: '≈ 5 min', text: "Recorda què vas dinar fa tres dies. Anota-ho i, si pots, verifica-ho després amb la nevera, el calendari o algú de casa." },
    { day: 3, duration: '≈ 6 min', text: "Memoritza set objectes que veus a l'habitació. Recita'ls d'aquí cinc minuts." },
    { day: 4, duration: '≈ 4 min', text: "Calcula mentalment 24 + 15. Sense paper ni calculadora. Després, si vols, verifica-ho." },
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
    { day: 1, duration: '≈ 5 min', text: "Envia un missatge curt a algú amb qui no parlis fa més d'un mes. Si et ve de gust, proposa una trucada breu." },
    { day: 2, duration: '≈ 3 min', text: "Saluda algú que veus sovint però no coneixes. Si no es dona el moment, envia un missatge curt a algú proper." },
    { day: 3, duration: '≈ 4 min', text: "Escriu un missatge curt a algú només per dir-li que l'has pensat. Sense demanar res." },
    { day: 4, duration: '≈ 3 min', text: "Tingues una conversa de tres minuts sense mirar el mòbil. Si no hi ha ningú disponible ara, envia un àudio o un missatge curt amb una pregunta concreta." },
    { day: 5, duration: '≈ 6 min', text: "Pregunta a algú una cosa que no li havies preguntat mai, com què recorda d'una etapa que no t'ha explicat. Si no pot contestar ara, escriu la pregunta i envia-la per missatge." },
    { day: 6, duration: '≈ 4 min', text: "Reconeix una virtut d'una persona amb qui sovint discrepes. En directe o en un missatge molt breu." },
  ],
  [AREAS.IDENTITY]: [
    { day: 1, duration: '≈ 5 min', text: "Canvia una microdecisió habitual: ruta, beguda, música o seient. Observa com et queda durant cinc minuts." },
    { day: 2, duration: '≈ 5 min', text: "Agafa un paper i completa dues línies: \"Sovint faig...\" i \"Avui faré una excepció petita: ...\". Fes aquesta excepció abans de tancar el dia." },
    { day: 3, duration: '≈ 4 min', text: "Escriu en un paper una opinió ferma en una frase. A sota, escriu dues raons que defensarien la posició contrària i llegeix-les en veu alta." },
    { day: 4, duration: '≈ 6 min', text: "Escriu el nom d'una activitat que t'agradava fer als trenta. A sota, apunta el primer pas petit per reprendre-la aquesta setmana i deixa'l en un lloc visible." },
    { day: 5, duration: '≈ 5 min', text: "Tria un objecte, llibre o idea que ja no fas servir i pensa a qui li podria servir. Si ho tens clar, prepara'l." },
    { day: 6, duration: '≈ 5 min', text: "Agafa un paper i completa tres frases: \"Aquesta setmana he provat...\", \"M'ha costat...\" i \"Demà repetiré o deixaré descansar...\"." },
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
    'Prepara-ho: deixa a mà el que necessitis.',
    action.text,
    'Tanca-ho: marca el resultat.',
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
