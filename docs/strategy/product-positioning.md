# Arrel — Product Positioning (v1.1)

Document de referència per a AR-001.
Tanca una sola promesa de producte per a Arrel i fixa el llenguatge reutilitzable per landing, diagnosi, resultats, pantalla Avui i paywall.

Aquest document neix d'una tensió: MANIFEST.md i ARCHITECTURE.md descriuen un producte; Landing.jsx i Resultats.jsx en venen un altre de diferent. AR-001 força a triar-ne un.

**v1.1**: direcció estratègica validada; copy literal refinat. Vegeu Secció 9 per al detall dels canvis respecte a v1.0.

---

## 1. Marc estratègic i copy visible

Aquesta secció separa **el que l'equip pensa internament** (marc estratègic, nord de producte) i **el que l'usuari veu** (copy de landing, botons, hero). Fer-ho explícit evita que el concepte intern ("envelliment funcional") s'infiltri a la pantalla i faci el producte massa clínic.

### 1.a Frase estratègica (ús intern)

> **Frenar el desgast funcional abans que faci perdre terreny.**

Aquesta frase **no apareix mai en copy visible**. És el nord que fan servir producte, disseny i contingut per decidir què entra i què no al producte.

**Concepte intern clau**: *envelliment funcional*. No apareix a cap pantalla. És l'etiqueta estratègica que nomena el tipus de desgast sobre el qual actua Arrel (rigidesa cognitiva, estrès crònic, aïllament, estancament identitari, pèrdua de funció física). Cap a fora només parlem de **desgast**, **perdre terreny** i **recuperar terreny**.

### 1.b Headline de landing (visible)

> **Recupera el terreny que el temps t'està prenent.**

### 1.c Subheadline de landing (visible)

> Arrel detecta on el desgast ja ha començat i et dona una acció al dia per recuperar-lo. Criteri clar, sense sorolls.

### 1.d Tres variants curtes admissibles

Per a espais on cal copy més curt: Open Graph, push, email subject, hero secundari, meta description.

1. "Menys desgast. Més terreny teu."
2. "El temps passa factura. Tu decideixes on parar-lo."
3. "Una acció al dia per no perdre terreny."

Totes tres comparteixen el mateix nucli: **desgast + terreny + acció diària**. Són intercanviables segons context.

### 1.e Mapping vocabulari: intern ↔ visible

| Concepte intern (mai en pantalla) | Equivalent visible (sí en pantalla) |
|---|---|
| Envelliment funcional | Desgast / perdre terreny |
| Frenar envelliment | Recuperar terreny / parar la factura |
| Motor deterministe | Criteri clar / sense sorolls |
| Cicles curts de 7 dies | Una acció al dia / un pas al dia |
| Les 5 àrees del MANIFEST | "On el temps t'està passant més factura" (AR-008 fixarà els labels visibles per àrea) |

Regla simple: si una paraula només té sentit per a l'equip que ha construït Arrel, no surt de la pantalla.

---

## 2. Target principal

**Adult 35–55 anys** que:

- Nota senyals de desgast que no són malaltia: rigidesa mental, estrès crònic, menys xarxa, identitat estancada, menys energia funcional.
- Ja ha provat apps d'hàbits, trackers o coaches i se n'ha cansat.
- Vol criteri clar, no motivació ni gamification.
- Té poc temps. Accepta una única acció al dia si és la correcta.

**NO és el target:**

- Perfil biohacker buscant optimització de biomarcadors (Attia/Huberman hardcore).
- Persona amb patologia diagnosticada buscant tractament (no som medicina).
- Adolescents i joves <30 (l'angle d'envelliment no els mobilitza).

---

## 3. Tres beneficis clau

Reescrits en to comercial sobri, aprofitant el vocabulari visible (desgast / terreny / factura). Reutilitzables a landing, resultat de diagnosi i paywall.

1. **Veus on estàs perdent terreny**
   Un diagnòstic curt mostra en quina de les cinc àrees del desgast el temps t'està passant més factura. Cap puntuació inventada. Cap claim numèric disfressat de mesura mèdica.

2. **Saps què has de fer avui**
   Cada dia, una sola acció triada pel motor segons el teu diagnòstic i l'estat del cicle. No és una llista de deu hàbits nous: és el pas concret que toca avui.

3. **Recuperes terreny sense sorolls**
   Cicles curts d'acció i repòs. L'app parla quan aporta criteri i calla quan no. No ocupa el teu temps; el respecta.

---

## 4. Tres claims prohibits

Aquests claims queden **fora del producte** a partir d'ara. Cal que `AR-002` els retiri del copy existent.

1. **"Calcula la teva Edat Biològica"** (i variants: "-2.5 anys biològics", "edat real").
   *Per què fora*: un qüestionari de 12 preguntes no mesura edat biològica; és un claim quasi-mèdic indefensable que genera expectativa que el producte no pot complir.

2. **"Reverteix l'envelliment" / "Rejoveniment"**.
   *Per què fora*: el MANIFEST diu explícitament "no buscar vèncer el temps, no entregar-li terreny abans d'hora". Arrel frena, no reverteix. El copy ha de respectar aquest matís.

3. **"Optimitza la teva biologia" / claims mitocondrials, metabòlics, hormèsics o de neuroplasticitat com a promesa principal**.
   *Per què fora*: llenguatge mèdic/biohacker que contradiu la regla del MANIFEST ("sense tecnicismes ni anglicismes, una frase, una idea, cap soroll") i posa Arrel en competició directa amb InsideTracker/Whoop/Attia, on perdria per mida i credibilitat.

---

## 5. Racional de la tria (resum)

### Tres opcions avaluades

**Opció A — "Frenar l'envelliment funcional" (fidel a MANIFEST)** ✅ ESCOLLIDA
- Marc estratègic: frenar el desgast funcional abans que faci perdre terreny (vegeu Secció 1.a).
- Copy visible derivat: "Recupera el terreny que el temps t'està prenent" (vegeu Secció 1.b).
- Pros: diferenciació real, alineada amb MANIFEST i ARCHITECTURE, llenguatge adult, evita mercats saturats.
- Contres: "desgast" és concepte més subtil que un número; conversió de landing exigeix copy fi i validació A/B.

**Opció B — "Longevity app amb edat biològica i protocol de 28d" (fidel al codi actual)**
- Promesa: mesura la teva Edat Biològica i millora-la.
- Pros: claim quantificable, narrativa coneguda al mercat US.
- Contres: el propi backlog ja la vol desmuntar (AR-002); claim indefensable; competència massiva; contradiu MANIFEST frontalment.

**Opció C — "Coach diari de micro-hàbits d'edat mitjana" (punt mig)**
- Promesa: una acció al dia per viure millor.
- Pros: producte simple, baixa fricció.
- Contres: MANIFEST diu explícitament que Arrel NO és una app d'hàbits; mercat saturat (Fabulous, Finch, Streaks).

### Per què A

1. És l'única coherent amb els documents estratègics existents (MANIFEST, ARCHITECTURE).
2. El propi backlog (AR-002) ja descarta implícitament l'Opció B.
3. Arrel no té la mida per guanyar una batalla directa contra apps de longevity US ni contra apps d'hàbits establertes. Cal un angle que no es defensi amb pressupost, sinó amb claredat conceptual.
4. La implementació minimalista que proposa ARCHITECTURE (motor deterministe, 7 dies, 1 acció/dia) és nativament Opció A. Fer B o C obligaria a reescriure també l'arquitectura.

---

## 6. Les 5 àrees oficials (reforç del MANIFEST)

A partir d'ara, **les úniques 5 àrees** on Arrel treballa són les del MANIFEST:

1. **Deteriorament funcional del cos**
2. **Rigidesa cognitiva**
3. **Estrès crònic**
4. **Aïllament relacional**
5. **Estancament identitari**

Això invalida les 5 àrees actuals de `Resultats.jsx` (energia / son / nutrició / atenció / temps). AR-008 i AR-009 hauran de refer diagnosi i scoring sobre aquestes cinc.

---

## 7. Estats coberts / no coberts per aquest doc

**Cobert**:
- Marc estratègic intern (frase i concepte d'envelliment funcional).
- Copy visible inicial: headline, subheadline i 3 variants curtes.
- Target principal i antitarget.
- 3 beneficis per a copy reutilitzables a landing, resultats i paywall.
- 3 claims prohibits executables per AR-002.
- Mapping intern ↔ visible per evitar filtracions de llenguatge estratègic.
- Racional de la tria perquè la decisió sigui auditable.

**No cobert (sortida d'aquest doc, entrada d'altres):**
- Nom exacte de cada àrea en copy final (AR-008).
- Guia completa de to, disclaimers i microcopy (AR-002).
- Flux nuclear pantalla a pantalla (AR-003).
- Nou model de dades (AR-004) que ha de reflectir les 5 àrees oficials.
- Validació quantitativa del headline (A/B, click-through): no cobert aquí, proposta per a AR-028.

---

## 8. Test de fidelitat

Abans d'aprovar qualsevol copy nou o pantalla nova, s'ha de poder respondre **sí** a totes quatre preguntes:

1. Això parla de **desgast o pèrdua de terreny**, no de salut genèrica ni d'optimització biològica?
2. Això usa **llenguatge planer** (no "mitocondrial", no "hormesis", no "edat biològica", no "envelliment funcional" en pantalla)?
3. Això ofereix **criteri**, no motivació ni gamificació?
4. Això respecta el to **sobri i adult** (no espectacular, no alarmista)?

Si alguna resposta és "no", s'ha de refer.

---

## 9. Estat de validació

- **v1.0**: doc creat per AR-001.
- **v1.1** (actual): direcció estratègica de l'Opció A **validada per founder**. Copy literal refinat:
  - "estàs envellint abans d'hora" descartat com a titular.
  - "envelliment funcional" confinat a ús intern.
  - Vocabulari visible consolidat al voltant de *desgast*, *perdre terreny*, *recuperar terreny*, *el temps passant factura*.
  - Headline, subheadline i variants curtes proposades; pendents de test real.
- AR-002, AR-003, AR-004, AR-008 i AR-010 parteixen d'aquest document com a font.
- El copy visible d'aquest doc és una **proposta de partida**, no un contracte inamovible. Qualsevol canvi futur ha de passar el test de fidelitat de la Secció 8.
