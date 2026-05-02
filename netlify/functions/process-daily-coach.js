const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * Funció de Backend: Micro-lectura del Coach Diari.
 * Genera un missatge de bon dia personalitzat.
 */
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Mètode no permès" };
  }

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: "Configuració d'IA no disponible." }) };
  }

  try {
    const payload = JSON.parse(event.body);
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Ets l'assistent d'IA de l'app "Arrel". La teva tasca és donar un missatge de bon dia de MÀXIM 20 paraules.
      
      CONTEXT DE L'USUARI:
      - Arquetip: ${payload.userProfile?.archetype || 'Usuari nou'}
      - Fortalesa: ${payload.userProfile?.strongestArea || 'Pendent'}
      - Ahir va marcar: ${payload.yesterday?.value || 'No hi ha dades'}
      - Nota d'ahir: "${payload.yesterday?.note || ''}"
      
      INSTRUCCIONS:
      1. Sigues molt breu, sobri i motivador (estil català planer).
      2. Si ahir va anar malament o va costar, dona ànims o suggereix calma.
      3. Si ahir va anar bé, felicita breument i anima a mantenir el rumb.
      4. No utilitzis la paraula "IA" ni cap diagnòstic.
      
      RETORNA NOMÉS EL TEXT DEL MISSATGE.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ insight: text }),
    };
  } catch {
    return { statusCode: 500, body: JSON.stringify({ error: "Error" }) };
  }
};
