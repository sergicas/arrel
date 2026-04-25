import { AREAS } from './types.js';

export const ACTIONS = {
  [AREAS.PHYSICAL]: [
    { day: 1, text: "Camina deu minuts a un ritme que et faci respirar més fort. No més, no menys." },
    { day: 2, text: "Aixeca't de la cadira i torna-hi cinc vegades, sense ajudar-te amb les mans." },
    { day: 3, text: "Penja't d'una barra o d'un marc de porta deu segons. Si no pots, agafa't amb tota la força que tinguis." },
    { day: 4, text: "Mantén-te en equilibri sobre una sola cama durant un minut, ulls oberts." },
    { day: 5, text: "Estira el cos cinc minuts en silenci, sense vídeo ni guia." },
    { day: 6, text: "Repeteix la caminada del primer dia. Intenta arribar una mica més lluny." },
  ],
  [AREAS.COGNITIVE]: [
    { day: 1, text: "Aprèn una paraula nova en una llengua que no parlis. Repeteix-la cinc vegades." },
    { day: 2, text: "Llegeix una opinió contrària a la teva sobre un tema, en silenci, sense reaccionar." },
    { day: 3, text: "Memoritza set objectes que veus a l'habitació. Recita'ls d'aquí cinc minuts." },
    { day: 4, text: "Fes una operació mental de tres xifres sense calculadora ni paper." },
    { day: 5, text: "Explica un concepte que coneguis bé en veu alta, com si parlessis a un nen de vuit anys." },
    { day: 6, text: "Pensa en un error que vas defensar. Escriu en una frase per què tenies tort." },
  ],
  [AREAS.STRESS]: [
    { day: 1, text: "Asseu-te en silenci tres minuts, sense fer res. Compta les respiracions." },
    { day: 2, text: "Apaga totes les notificacions del mòbil durant una hora. Fes alguna cosa amb les mans." },
    { day: 3, text: "Surt a fora i mira l'horitzó (lluny) un minut, sense pantalles." },
    { day: 4, text: "Identifica una tensió física al teu cos. Anomena-la. Respira a sobre trenta segons." },
    { day: 5, text: "Avui no respondràs a un missatge immediatament. Espera una hora abans de contestar." },
    { day: 6, text: "Tria una cosa que t'estressa avui i digues-la en veu alta a la teva sala buida." },
  ],
  [AREAS.RELATIONAL]: [
    { day: 1, text: "Truca a algú amb qui no parlis fa més d'un mes. No més de cinc minuts." },
    { day: 2, text: "Saluda algú que veus sovint però no coneixes (un veí, un dependent). Pregunta-li com va el dia." },
    { day: 3, text: "Escriu un missatge curt a algú només per dir-li que l'has pensat. Sense demanar res." },
    { day: 4, text: "Tingues una conversa de tres minuts amb algú sense mirar el mòbil ni una vegada." },
    { day: 5, text: "Pregunta a algú una cosa que no li havies preguntat mai. Escolta sense interrompre." },
    { day: 6, text: "Reconeix en veu alta una virtut d'una persona amb qui sovint discrepes." },
  ],
  [AREAS.IDENTITY]: [
    { day: 1, text: "Fes avui una cosa que no encaixi amb la teva imatge habitual. Una cosa petita." },
    { day: 2, text: "Escriu en una frase qui creus que ets. Després, una segona frase que et contradigui." },
    { day: 3, text: "Tria una opinió teva ferma. Defensa la posició contrària dos minuts." },
    { day: 4, text: "Recorda una cosa que somiaves fer als vint anys. Què en penses ara, sense judici?" },
    { day: 5, text: "Vesteix-te amb alguna cosa que normalment no portaries. Surt al carrer cinc minuts." },
    { day: 6, text: "Anota una cosa nova sobre tu que has descobert aquesta setmana." },
  ],
};

export function getAction(area, dayInCycle) {
  if (dayInCycle < 1 || dayInCycle > 6) return null;
  return ACTIONS[area]?.[dayInCycle - 1] || null;
}
