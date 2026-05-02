const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * Funció de Backend d'Arrel: Processament d'IA Real amb Memòria.
 */
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Mètode no permès" };
  }

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: "Configuració d'IA no disponible." }) 
    };
  }

  try {
    const payload = JSON.parse(event.body);
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Preparació d'un Prompt narratiu que utilitza l'historial
    const prompt = `
      Ets l'assistent d'IA de l'app "Arrel", centrada en l'autonomia de persones de 55 a 75 anys.
      La teva missió és generar una LECTURA PERSONAL del cicle de 7 dies.
      
      PERFIL DE L'USUARI:
      - Arquetip: ${payload.userProfile?.archetype || 'Usuari nou'}
      - Descripció: ${payload.userProfile?.description || 'Començant el camí'}
      - Fortalesa: ${payload.userProfile?.strongestArea || 'Pendent'}
      
      DADES DEL CICLE ACTUAL (últims 7 dies):
      ${JSON.stringify(payload.days)}
      
      HISTORIAL DE CICLES PASSATS:
      ${JSON.stringify(payload.pastReadingsSummary)}
      
      INSTRUCCIONS NARRATIVES:
      1. Utilitza català sobri, planer i molt respectuós.
      2. Connecta el que ha passat aquesta setmana amb el seu perfil i historial.
      3. Si el cicle actual mostra molta "friction" (partial/skipped), detecta si és un patró o una excepció i anima amb prudència.
      4. Si hi ha notes, cita-les o referencia-les per demostrar escolta real.
      5. Evita qualsevol paraula mèdica, diagnòstic o llenguatge de "pèrdua/declivi".
      
      FORMAT DE RESPOSTA (JSON pur):
      {
        "title": "Títol vital (max 5 paraules)",
        "pattern": "Resum narratiu de la setmana integrant les notes i el context històric.",
        "availableCapacity": "Quina capacitat veus més forta avui basant-te en els 'Fet'.",
        "carePoint": "On posar l'atenció basant-te en els 'Fet amb esforç' o salts.",
        "nextCycleSuggestion": {
          "label": "Continuïtat | Exploració | Consolidació",
          "text": "Proposta concreta pel següent cicle."
        },
        "nextActionStyle": "Consell breu sobre l'estil de la prova de demà (ex: versió suau, atenció plena...)",
        "confidence": "alta | mitjana | baixa",
        "confidenceReason": "Per què creus que la teva lectura és precisa."
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{.*\}/s);
    const jsonResponse = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(text);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonResponse),
    };
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error en el processament de la lectura." }),
    };
  }
};
