const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * Funció de Backend d'Arrel: Processament d'IA Real.
 * Aquesta funció mai s'ha d'exposar directament al frontend.
 */
exports.handler = async (event) => {
  // 1. Verificació de seguretat bàsica
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Mètode no permès" };
  }

  // 2. Verificació de clau d'API (Configurada a Netlify)
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

    // 3. Preparació del Prompt segons els principis d'Arrel
    const prompt = `
      Ets l'assistent d'IA de l'app "Arrel", que ajuda a persones de 55 a 75 anys a cuidar la seva autonomia.
      Analitza les dades d'aquest cicle de 7 dies i genera una lectura empàtica, prudent i proactiva.
      
      DADES DEL CICLE:
      ${JSON.stringify(payload.days)}
      
      INSTRUCCIONS:
      - Utilitza català planer, sobri i adult.
      - Evita etiquetes psicològiques o diagnòstics.
      - Si hi ha notes, comenta-les per demostrar que les has entès.
      - La lectura ha de tenir aquests camps:
        1. title: Títol curt i vital (max 5 paraules).
        2. pattern: Un paràgraf resumint la setmana i el context de les notes.
        3. carePoint: Un paràgraf sobre on posar l'atenció basant-se en la fricció detectada.
        
      Retorna el resultat exclusivament en format JSON.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Netejar possibles blocs de codi markdown si el model els inclou
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
