import { AREAS } from './types.js';

export const ACTIONS = {
  [AREAS.PHYSICAL]: [
    { day: 1, duration: '≈ 10 min', text: "Camina deu minuts a un ritme que et faci respirar més fort. No més, no menys." },
    { day: 2, duration: '≈ 3 min', text: "Aixeca't de la cadira i torna-hi cinc vegades, sense ajudar-te amb les mans." },
    { day: 3, duration: '≈ 4 min', text: "Agafa't fort a una barra, una porta o una taula durant deu segons. Repeteix-ho tres cops." },
    { day: 4, duration: '≈ 3 min', text: "Mantén-te en equilibri sobre una cama durant trenta segons per costat, ulls oberts." },
    { day: 5, duration: '≈ 5 min', text: "Estira el cos cinc minuts en silenci, sense vídeo ni guia." },
    { day: 6, duration: '≈ 10 min', text: "Repeteix la caminada del primer dia. Intenta arribar una mica més lluny." },
  ],
  [AREAS.COGNITIVE]: [
    { day: 1, duration: '≈ 5 min', text: "Aprèn una paraula nova en una llengua que no parlis. Repeteix-la cinc vegades." },
    { day: 2, duration: '≈ 7 min', text: "Llegeix una opinió contrària a la teva sobre un tema, en silenci, sense reaccionar." },
    { day: 3, duration: '≈ 6 min', text: "Memoritza set objectes que veus a l'habitació. Recita'ls d'aquí cinc minuts." },
    { day: 4, duration: '≈ 4 min', text: "Fes una operació mental de tres xifres sense calculadora ni paper." },
    { day: 5, duration: '≈ 5 min', text: "Explica un concepte que coneguis bé en veu alta, com si parlessis a algú de vuit anys." },
    { day: 6, duration: '≈ 6 min', text: "Pensa en un error que vas defensar. Escriu en una frase per què tenies tort." },
  ],
  [AREAS.STRESS]: [
    { day: 1, duration: '≈ 3 min', text: "Asseu-te en silenci tres minuts, sense fer res. Compta les respiracions." },
    { day: 2, duration: '≈ 10 min', text: "Apaga les notificacions del mòbil durant deu minuts. Fes alguna cosa amb les mans." },
    { day: 3, duration: '≈ 3 min', text: "Surt a fora i mira l'horitzó un minut, sense pantalles. Després respira dues vegades lent." },
    { day: 4, duration: '≈ 4 min', text: "Identifica una tensió física al teu cos. Anomena-la. Respira a sobre trenta segons." },
    { day: 5, duration: '≈ 10 min', text: "Quan rebis un missatge no urgent, espera deu minuts abans de contestar." },
    { day: 6, duration: '≈ 5 min', text: "Tria una cosa que t'estressa avui i digues-la en veu alta en una frase curta." },
  ],
  [AREAS.RELATIONAL]: [
    { day: 1, duration: '≈ 5 min', text: "Truca a algú amb qui no parlis fa més d'un mes. Si no respon, deixa-li un missatge de veu curt." },
    { day: 2, duration: '≈ 3 min', text: "Saluda algú que veus sovint però no coneixes. Si no es dona el moment, envia un missatge curt a algú proper." },
    { day: 3, duration: '≈ 4 min', text: "Escriu un missatge curt a algú només per dir-li que l'has pensat. Sense demanar res." },
    { day: 4, duration: '≈ 3 min', text: "Tingues una conversa de tres minuts sense mirar el mòbil. Si no pots, envia un àudio curt." },
    { day: 5, duration: '≈ 6 min', text: "Pregunta a algú una cosa que no li havies preguntat mai. Si no pots parlar ara, escriu-la i envia-la." },
    { day: 6, duration: '≈ 4 min', text: "Reconeix una virtut d'una persona amb qui sovint discrepes. En directe o en un missatge molt breu." },
  ],
  [AREAS.IDENTITY]: [
    { day: 1, duration: '≈ 5 min', text: "Canvia una microdecisió habitual: ruta, beguda, música o seient. Observa com et queda durant cinc minuts." },
    { day: 2, duration: '≈ 5 min', text: "Escriu en una frase qui creus que ets. Després, una segona frase que et contradigui." },
    { day: 3, duration: '≈ 4 min', text: "Tria una opinió teva ferma. Defensa la posició contrària dos minuts." },
    { day: 4, duration: '≈ 6 min', text: "Recorda una cosa que somiaves fer fa anys. Què en penses ara, sense judici?" },
    { day: 5, duration: '≈ 5 min', text: "Vesteix-te amb alguna cosa que normalment no portaries. Surt al carrer cinc minuts." },
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
    'Prepara-ho: fes lloc a l’acció i no hi afegeixis cap extra.',
    action.text,
    'Tanca-ho: respira un cop i marca què ha passat sense corregir-ho.',
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
