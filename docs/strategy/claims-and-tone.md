# Arrel — Claims i To (v1)

Document operatiu per a AR-002.
Complement de `docs/strategy/product-positioning.md` (v1.1).

Aquest doc respon a una sola pregunta: **quan algú escriu copy nou o n'actualitza d'antic a Arrel, què pot dir i què no**. Si hi ha dubte, aquest doc decideix.

---

## 1. Taula de claims

### 1.a Claims prohibits (risc alt — retirar sempre)

| Claim | Per què fora | Exemples reals al codi previ a AR-002 |
|---|---|---|
| "Edat Biològica" (i variants: "-2.5 anys biològics", "edat real") | Un qüestionari no mesura edat biològica. Promesa quasi-mèdica indefensable. | Landing H1 subcopy · hero card · Mètode fase 2 · meta description · FAQ implícit |
| "Rejoveniment" / "Reverteix l'envelliment" / "Pla de Reversió" | MANIFEST: "no vèncer el temps, no entregar-li terreny abans d'hora". Arrel frena, no reverteix. | "Històries de Rejoveniment" · "El teu Pla de Reversió" · "revertir els teus punts febles" |
| "Optimitza la teva biologia" / claims mitocondrials, hormèsics, metabòlics, de neuroplasticitat com a promesa | Llenguatge biohacker que trenca la regla MANIFEST ("sense tecnicismes ni anglicismes"). Posa Arrel en batalla directa amb InsideTracker/Whoop/Attia. | 3 pilars de Landing · interpretation guide a Resultats · Premium "wearables i biomarcadors reals" · FAQ "hormesis" |
| Claims numèrics vestits de mesura mèdica ("Vitalitat Metabòlica 85/100", "ritme d'envelliment òptim") | Escala construïda sobre 12 preguntes sense base clínica. Fa passar opinió per mesura. | Resultats header · frases de score · hero card Landing |
| Alarmisme ("⚠️ Accelerador d'Envelliment", "envellint més ràpid del que et toca biològicament") | Trenca la regla de to sobri (test de fidelitat #4). Crea ansietat que no resol el producte. | Resultats header d'insight · frases de puntuació |
| Testimonials ficticis amb dades concretes (Oura Ring, "son profund 0", "pic de glucosa") | Viola MANIFEST ("mai simular produccio sense avis explicits"). | `TestimonialCarousel.jsx` |
| Tecnicismes gratuïts al premium/FAQ ("Dejuni, Sauna, HIIT", "hormesis", "cronobiologia") | Mateix motiu que el claim biohacker general. | Landing Premium tiers · FAQ |

### 1.b Claims admesos (zona segura)

- **"Desgast funcional"** quan es vol ser més precís (*però vigilar*: "envelliment funcional" és concepte intern, no surt a pantalla).
- **"Perdre terreny"** / **"recuperar terreny"** com a eix central del llenguatge visible.
- **"El temps passa factura"** / **"on el temps t'està passant més factura"**.
- **"Una acció al dia"** / **"un pas al dia"** / **"un pas concret"**.
- **"Criteri"** / **"criteri clar"** / **"sense sorolls"**.
- **"Primer cicle"** / **"cicle inicial"** / **"cicle curt"** (evitar concretar "7 dies" o "28 dies" fins que AR-027 ho tanqui).
- **"Diagnòstic"** en sentit informal: el que fem és una lectura inicial. Sempre acompanyat del disclaimer "No és un diagnòstic mèdic" quan aparegui en contextos de resultats.
- **"Evidència"** acceptable només quan es refereix a pràctiques amb suport en la literatura d'hàbits/salut conductual. No usar "evidència científica" com a segell genèric.

### 1.c Claims de risc mitjà (cal vigilància, no retirada automàtica)

| Claim | Risc | Ús admès |
|---|---|---|
| "Llum matinal" | Pot semblar biohacker quan s'acompanya de "ritme circadià". | Sí, com a acció concreta ("pas al sol al matí"), sense nomenclar ritmes. |
| "Son profund" | Vergeix a mètrica. | Evitar com a promesa. Admès com a context ("dormir millor"). |
| "Protocol" | Té aire clínic. | Preferible "pla" o "cicle". Si apareix, que sigui informal. |
| "Longevitat" | Ambigu entre promesa mèdica i terme comercial. | No usar com a claim principal. Admès com a context esporàdic. |

### 1.d Claims de risc baix (conservar)

- "Privacitat", "privat", "segur": OK mentre siguin certs.
- "Gratuït" / "Sense targeta": OK per al primer cicle.
- "3 minuts" (durada del diagnòstic): OK, verificat.
- "Pagament únic": OK al Paywall.

---

## 2. Regla central: recuperar terreny ≠ rejoveniment

Aquesta regla decideix el 80% dels dubtes de copy.

- **Recuperar terreny** = tornar a funcionar en àrees on la persona havia deixat de funcionar bé (tornar a dormir sense ajuda, tornar a concentrar-se, tornar a trucar la gent, tornar a moure's). **Acceptable**.
- **Rejoveniment** = promesa de restituir un estat biològic anterior, desfer el temps. **Prohibit**.

Si un copy pot llegir-se com "et faré més jove", s'ha de refer. Si es llegeix com "et donaré eines per recuperar el que havies perdut", passa.

**Test ràpid**: canvia mentalment "terreny" per "anys" o "joventut". Si la frase continua sonant igual de raonable, és OK. Si sona a promesa màgica, s'ha de refer.

- "Recupera el terreny que el temps t'està prenent." → substituit per "anys" = "Recupera els anys que el temps t'està prenent" → sona a claim màgic. **Mal senyal**.

Oops — el test no passa amb el headline actual. Ajustament de la regla:

**Regla refinada**: "recuperar terreny" sempre s'ha d'acompanyar d'un vector funcional explícit, no temporal. Si el copy parla de "temps" en sentit genèric ("el temps t'està prenent"), el context ha de deixar clar que parlem de **terreny funcional perdut** (son, energia, concentració, xarxa, moviment), no de "anys de vida". Per això:

- OK: "Recupera el terreny que el temps t'està prenent. Arrel detecta on el desgast ja ha començat..." (el context aclareix que és terreny funcional)
- No OK: "Torna enrere el rellotge biològic."
- No OK: "Recupera anys."

---

## 3. Before / After

Mostrari representatiu. No exhaustiu; per a canvis nous, aplicar la lògica d'aquestes parelles.

### 3.a Landing — hero

**Abans**
> H1: "La teva salut, descodificada."
> Subcopy: "No endevinis com estàs envellint. Mesura-ho. Descobreix la teva Edat Biològica (indicador d'estil de vida) i rep un pla d'acció personalitzat avui mateix."

**Després**
> H1: "Recupera el terreny / que el temps t'està prenent."
> Subcopy: "Arrel detecta on el desgast ja ha començat i et dona una acció al dia per recuperar-lo. Criteri clar, sense sorolls."

### 3.b Landing — hero card visual

**Abans**
> "Informe de Longevitat · A+ · Vitalitat Metabòlica 85/100 · Edat Biològica (Estimada) -2.5 anys · Punt Fort: Neuroplasticitat"

**Després**
> "El teu diagnòstic · Àrea més exposada: [àrea] · Primer pas: [acció curta] · Següent check-in: avui"

### 3.c Landing — value prop

**Abans**
> "La ciència de viure millor, no només més temps. T'oferim un sistema operatiu personal per prendre el control de la teva biologia a través d'hàbits mesurables."

**Després**
> "Un sistema clar per recuperar terreny. No venem suplements ni fórmules. Et donem criteri i un pas concret al dia."

### 3.d Landing — 3 pilars

**Abans**
> Neuroplasticitat · Energia Mitocondrial · Resiliència Metabòlica (+ descripcions biohacker)

**Després** (els 3 beneficis d'AR-001)
> Veus on estàs perdent terreny · Saps què has de fer avui · Recuperes terreny sense sorolls

### 3.e Landing — Mètode fases

**Abans**
> 1. Analitza — "80% de l'envelliment no és genètic. Identifiquem els 'lladres d'energia'..."
> 2. Diagnostica — "Calculem la teva Edat Biològica aproximada..."
> 3. Reverteix (Mes 1: Gratuït) — "Accés complet al programa de 28 dies..."

**Després**
> 1. Mira — "Identifiquem on el desgast ja ha començat i on estàs perdent terreny sense notar-ho."
> 2. Entén — "Veus la teva àrea més exposada i el primer pas concret per començar a recuperar terreny."
> 3. Actua — "Accés complet al primer cicle, gratis. Sense targeta. Només tu i el pas del dia."

### 3.f Resultats — insight principal

**Abans**
> "⚠️ Principal Accelerador d'Envelliment ·  Les teves respostes indiquen que aquesta és l'àrea que més 'desgasta' el teu sistema ara mateix. Millorar aquí tindrà l'impacte més gran en la teva longevitat."

**Després**
> "Àrea més exposada · Les teves respostes indiquen que és aquí on ara mateix estàs perdent més terreny. Començar per aquí és el que tindrà més impacte."

### 3.g Resultats — frases de score

**Abans**
> >=80: "El teu ritme d'envelliment és òptim. Continua així."
> >=60: "Estàs envellint a un ritme normal, però podries frenar-lo."
> <60: "Estàs envellint més ràpid del que et toca biològicament."

**Després**
> >=80: "El teu estat general és bo. Mantenir el ritme és la feina."
> >=60: "Hi ha àrees on ja estàs perdent terreny. Tens marge per actuar."
> <60: "Vàries àrees acusen el desgast. El marge per recuperar terreny és clar."

### 3.h CTA final

**Abans**
> "El teu jo del futur t'ho agrairà."

**Després**
> "Comença pel diagnòstic. 3 minuts."

### 3.i FAQ "ciència"

**Abans**
> "Ens basem en els pilars de la medicina de l'estil de vida i la gerontociència: ritmes circadians, nutrició metabòlica, hormesis i psicologia conductual."

**Després**
> "Arrel combina observació del desgast funcional amb accions concretes amb suport en la literatura d'hàbits i salut conductual. No substituïm cap tractament ni fem diagnòstic mèdic."

---

## 4. Guia de to (resum operatiu)

| Fer | No fer |
|---|---|
| Frases curtes. Una idea per frase. | Paràgrafs amb 3 idees encadenades. |
| Adult i sobri. | Motivacional ("tu pots!", "el teu jo del futur"). |
| Concret ("un pas al dia", "3 minuts"). | Vague ("optimitza", "transforma"). |
| Criteri ("comença per aquí"). | Hype ("descobreix el secret"). |
| Disclaimers visibles on parlem de diagnòstic. | Implicar rigor mèdic quan no n'hi ha. |
| Català planer. | Anglicismes gratuïts (*tracking*, *biohacking*, *challenge*). |

---

## 5. Decisions executades a AR-002

1. **`TestimonialCarousel` es retira del render** de Landing. El fitxer del component no s'esborra (pot tornar quan hi hagi testimonials reals i sobris). La secció de Landing "Històries de Rejoveniment" desapareix.
2. **El block `showGuide` de Resultats.jsx es retira** sencer. Els 4 "biomarcadors" explicats (ATP mitocondrial, sistema glimfàtic, etc.) són incompatibles amb AR-001. L'estructura definitiva sortirà d'AR-008.
3. **El Paywall no es toca**: copy sobri, sense claims problemàtics.
4. **Premium tiers de Landing** es suavitzen (retirar "Dejuni/Sauna/HIIT", "wearables i biomarcadors reals", "longevitats actives") però no es redefineix el producte — la decisió final és d'AR-027.

## 6. Riscos oberts (per propietat futura)

1. **No tenim testimonials.** La landing perd "prova social" amb la retirada. Decisió conscient: millor cap testimonial que testimonials ficticis. Quan hi hagi usuaris reals, AR-011 o producte poden tornar a introduir-los amb la guia d'aquest doc.
2. **Premium és ambigu.** S'ha retirat tecnicisme però la secció continua prometent funcionalitats no construïdes. Cal que AR-027 decideixi si les hi deixem o no.
3. **Headline no validat.** "Recupera el terreny que el temps t'està prenent" és proposta. AR-028 (analítica) ha de permetre testejar-ho.
4. **Les 5 àrees de producte encara no coincideixen** amb les 5 del MANIFEST (AR-008 ho farà). Mentrestant, el copy nou parla en genèric d'"àrees" sense concretar nom fins que AR-008 fixi el mapa definitiu.
