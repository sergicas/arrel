# Informe únic per a Gemini — Avaluació actual d'Arrel

Data: 30 d'abril de 2026  
Projecte local: `/Users/sergicastillo/Documents/Playground/arrel`  
Branca: `v0.2`  
Últim commit pujat a `origin/v0.2`: `479843b fix: remove dead ends from app navigation`

## 0. Instrucció per a Gemini

Analitza l'app Arrel en el seu estat actual. No facis canvis encara. Vull una avaluació crítica i contrastada sobre producte, mètode, UX, copy i coherència.

Objectiu actual d'Arrel:

> Cuidar autonomia, capacitat i il·lusió amb proves curtes de 3 a 10 minuts.

No vull una opinió amable ni una resposta de màrqueting. Vull detectar què funciona, què confon, què sobra, què falta i què pot fer que l'usuari abandoni.

## 1. Estat del repositori

Branca:

```bash
v0.2
```

Últims commits rellevants:

```text
479843b fix: remove dead ends from app navigation
54b7563 test: cover capacity action flow
0d227ad fix: link capacities and clarify area actions
3cdec01 copy: reframe Arrel around autonomy capacity and motivation
780dc72 fix: protect progress and restore navigation safeguards
623e6e0 feat: clarify navigation and free proof choice
3dfd4ba content: rebalance proof bank for aging focus
f7dc6f6 feat: add flexible proof rhythms
e1e9517 style: shift Arrel to warm vital palette
```

Hi ha canvis locals pendents després de `479843b`. Són intencionats i formen part de l'estat que vull avaluar:

```text
M src/v2/pages/Landing.jsx
M src/v2/pages/Landing.test.jsx
M src/v2/pages/Rest.jsx
M src/v2/pages/Today.jsx
M tests/e2e/helpers/arrel.js
```

Canvis locals pendents:

1. S'ha eliminat el pas redundant `Triar la prova d'avui`.
2. Ara el flux és directe:

```text
Triar per on començar
-> Cos / Memòria / Calma / Vincles / Propòsit
```

3. S'ha eliminat el segon `Mapa` duplicat a les pantalles `Today` i `Rest`. Ara el header global ja fa aquesta funció.

## 2. Verificació tècnica recent

Després dels canvis locals pendents s'ha executat:

```bash
npm run lint
npm test -- --run
npm run build
npm run ios:sync
```

Resultat:

```text
lint: passa
vitest: passa, 49/49
build: passa
ios:sync: passa
```

E2E:

- Abans dels últims canvis locals, l'usuari va executar `npm run test:e2e` al Terminal normal i va passar:

```text
17 passed
```

- Després dels últims canvis locals, encara cal tornar a executar:

```bash
npm run test:e2e
```

Nota: dins de Codex CLI o sandbox macOS, Playwright pot fallar abans d'executar tests per:

```text
MachPortRendezvousServer / bootstrap_check_in Permission denied (1100)
```

Això és una limitació ambiental del sandbox, no necessàriament una fallada de l'app. El Terminal normal de l'usuari sí pot executar E2E.

## 3. Stack i arquitectura

Arrel és una app React + Vite + Capacitor:

- Frontend: React/Vite.
- App nativa: Capacitor iOS.
- Persistència web: `localStorage`.
- Persistència nativa: `@capacitor/preferences`.
- Notificacions: `@capacitor/local-notifications`.
- Estat principal: `src/v2/state/ArrelContext.jsx`.
- Banc de proves: `src/v2/lib/actions.js`.
- Tipus/capacitats/copy base: `src/v2/lib/types.js`.
- Navegació: `src/v2/AppV2.jsx`, `src/v2/components/Shell.jsx`, `src/v2/lib/navigation.js`.

L'app és offline-first i no depèn de compte d'usuari ni backend per a aquesta versió.

## 4. Direcció de producte actual

Arrel ja no vol parlar des de la por ni des d'un marc clínic. El claim anterior relacionat amb "envelliment" s'ha retirat del copy visible.

Nou claim principal:

```text
Autonomia, capacitat i il·lusió cada dia.
```

Subcopy principal:

```text
Arrel t'ajuda a cuidar el que et manté actiu, lúcid i amb ganes.
Cos, memòria, calma, vincles i propòsit en accions petites.
```

Paraules que s'han volgut evitar en copy visible:

- envelliment
- declivi
- deteriorament
- dependència
- fragilitat
- pèrdua
- perdre
- malaltia
- dèficit
- antiaging
- frenar

Excepció: textos legals o avisos de seguretat poden mantenir llenguatge professional mínim si és imprescindible.

## 5. Les cinc capacitats actuals

L'app treballa cinc capacitats:

1. **Cos**  
   Caminar, aixecar-te, fer força i mantenir l'equilibri.

2. **Memòria**  
   Recordar, aprendre, calcular i explicar idees.

3. **Calma**  
   Fer pausa, respirar i baixar la tensió.

4. **Vincles**  
   Trucar, saludar, escoltar i fer una pregunta real.

5. **Propòsit**  
   Decidir, reprendre una idea i donar-li forma petita.

Nota tècnica:

- Internament la cinquena capacitat encara pot aparèixer com `identity`.
- El label visible és `Propòsit`.
- No s'ha canviat la clau interna per evitar migracions d'estat.

Slugs de capacitat:

```text
/menu/arees#cos
/menu/arees#memoria
/menu/arees#calma
/menu/arees#vincles
/menu/arees#proposit
```

## 6. Flux actual

### 6.1 Landing `/inici`

La landing mostra:

```text
Autonomia, capacitat i il·lusió cada dia.
```

CTA principal:

```text
Triar per on començar
```

Flux actual després del canvi local pendent:

```text
Triar per on començar
-> Cos
-> Memòria
-> Calma
-> Vincles
-> Propòsit
-> Ajustar focus
-> Triar ritme
-> Veure el mapa complet
```

S'ha eliminat el pas intermedi:

```text
Triar la prova d'avui
```

Motiu: era redundant i feia que l'usuari hagués de triar dues vegades abans d'arribar a una acció real.

Si l'usuari ja té un cicle començat i tria una nova capacitat, l'app no reinicia a cegues: mostra una confirmació.

### 6.2 Prova d'avui `/app`

Mostra:

- Capacitat actual.
- Cicle.
- Dia.
- Durada aproximada.
- Ritme.
- Prova.
- Guia curta.
- Timer si toca.
- Lectura final.

Lectura final:

```text
Hi és
Amb esforç
Avui no
```

Canvi local pendent:

- A `Today`, s'ha eliminat el segon botó `Mapa` perquè el header global ja inclou `Mapa`.
- Abans es veia:

```text
Inici · Avui · Mapa
Tornar · Mapa
```

- Ara ha de quedar:

```text
Inici · Avui · Mapa
Tornar
```

### 6.3 Capacitats `/menu/arees`

Abans les capacitats eren massa informatives i podien semblar un cul-de-sac.

Ara cada capacitat té una acció:

```text
Fer una prova de Cos
Fer una prova de Memòria
Fer una prova de Calma
Fer una prova de Vincles
Fer una prova de Propòsit
```

Si no hi ha cicle començat, el botó obre directament una prova d'aquesta capacitat.

Si ja hi ha un cicle començat, apareix confirmació abans de reiniciar res.

### 6.4 Focus `/diagnostic`

Abans s'anomenava "diagnosi". Ara el copy visible tendeix a dir "focus" per evitar un marc massa clínic.

Funció:

- Cinc preguntes.
- Determina una capacitat principal.
- Mostra resultat.
- Obre un cicle nou si ja hi havia progrés, sense barrejar feedback antic.

### 6.5 Ritme `/menu/ritme`

Tres ritmes:

- Lent.
- Regular.
- Accelerat.

Risc a revisar:

El ritme accelerat pot contradir la idea de constància. Pot convertir el producte en consum ràpid de proves. Cal avaluar si és una opció realment útil o si necessita límits.

### 6.6 Dia 7 / Rest

El cicle té sis dies de prova i un setè dia de revisió.

Canvi local pendent:

- A `Rest`, també s'ha eliminat el segon `Mapa` redundant perquè el header global ja inclou `Mapa`.

### 6.7 Menú `/menu`

El menú fa de mapa general de l'app.

Rutes principals:

- Prova d'avui.
- Històric.
- Capacitats.
- Ritme.
- Recordatori.
- Sobre Arrel.
- Privacitat.
- Termes.

## 7. Tests i cobertura actual

E2E existents:

```text
anti-dead-ends.spec.js
capacity-actions.spec.js
daily-gating.spec.js
diagnostic-flow.spec.js
full-cycle.spec.js
initial-period-complete.spec.js
landing-to-today.spec.js
legal-accessible.spec.js
pace.spec.js
reminder.spec.js
reset-from-about.spec.js
```

Cobertura rellevant:

- Landing -> prova starter.
- Capacitat enllaçada -> acció de capacitat.
- Gating diari.
- Focus de cinc preguntes.
- Cicle complet.
- Dia 7.
- Període inicial complet.
- Ritmes.
- Recordatori.
- Legal.
- Reset.
- Anti-cul-de-sac.

Cal revisar si els tests encara cobreixen bé el nou flux sense el pas `Triar la prova d'avui`.

## 8. Fitxers clau per llegir

Producte i capacitats:

```text
src/v2/lib/types.js
src/v2/lib/actions.js
src/v2/lib/engine.js
```

Flux i estat:

```text
src/v2/state/ArrelContext.jsx
src/v2/pages/Landing.jsx
src/v2/pages/Today.jsx
src/v2/pages/Rest.jsx
src/v2/pages/Transition.jsx
src/v2/pages/Diagnostic.jsx
src/v2/pages/DiagnosticResult.jsx
```

Navegació:

```text
src/v2/AppV2.jsx
src/v2/components/Shell.jsx
src/v2/lib/navigation.js
src/v2/pages/Menu.jsx
src/v2/pages/menu/Areas.jsx
src/v2/pages/menu/Pace.jsx
src/v2/pages/menu/Reminder.jsx
src/v2/pages/menu/PastCycles.jsx
src/v2/pages/menu/About.jsx
src/v2/pages/Legal.jsx
```

Tests:

```text
tests/e2e/*.spec.js
src/v2/**/*.test.*
```

Metadades:

```text
index.html
vite.config.js
src/components/SEO.jsx
```

## 9. Preguntes d'avaluació per a Gemini

### A. Veredicte general

1. L'app actual ja té una proposta pròpia o encara sembla una app genèrica de benestar?
2. `Autonomia, capacitat i il·lusió` és un marc prou fort?
3. El producte és prou clar per a una persona de 55-75 anys?
4. Quina seria la primera raó per abandonar l'app?

### B. Mètode

1. Les proves curtes de 3 a 10 minuts són un mecanisme prou convincent?
2. Les cinc capacitats són adequades?
3. Falta algun pilar o capacitat important?
4. `Propòsit` funciona com a cinquena capacitat?
5. El resultat `Hi és / Amb esforç / Avui no` aporta informació útil o és massa simple?
6. El dia 7 aporta valor real?
7. El ritme accelerat ajuda o perjudica el mètode?

### C. UX i navegació

1. El flux d'entrada és ara prou directe?
2. L'eliminació de `Triar la prova d'avui` millora la claredat?
3. Hi ha encara pantalles sense acció principal?
4. Hi ha targetes que semblen clicables però no ho són?
5. Hi ha botons redundants?
6. Hi ha algun altre duplicat com el cas dels dos `Mapa`?
7. L'usuari pot tornar sempre a un lloc útil?

### D. Copy

1. Encara hi ha frases vagues?
2. Hi ha massa conceptes abstractes: `capacitat`, `focus`, `propòsit`, `lectura`?
3. Hi ha alguna frase que sembli bonica però no digui res concret?
4. El copy evita prou el marc negatiu?
5. El claim principal és prou desitjable sense prometre massa?

### E. Banc de proves

Revisa `src/v2/lib/actions.js` prova per prova.

Per cada prova:

- mantenir
- modificar
- eliminar
- risc
- justificació

Criteris:

- concreció
- seguretat
- utilitat per a autonomia/capacitat/il·lusió
- adequació 55-75 anys
- durada realista
- lectura observable
- risc físic o emocional
- possibilitat de frustració

### F. Risc legal/salut

1. L'app evita claims mèdics?
2. El legal és suficient?
3. Alguna prova física necessita avisos de seguretat?
4. Alguna prova emocional/social pot ser delicada?

## 10. Resposta esperada de Gemini

Vull una resposta amb aquesta estructura:

1. **Veredicte curt**: l'app té sentit o no en l'estat actual?
2. **Top 5 problemes**, ordenats per severitat.
3. **Top 5 coses que funcionen** i no s'haurien de tocar.
4. **Pantalles que encara confonen**.
5. **Copy que canviaries literalment**.
6. **Proves del banc que modificaries primer**.
7. **Tests E2E que encara falten**.
8. **Batch mínim de canvis abans del següent build iPhone**.
9. **Canvis que deixaries per més endavant**.
10. **Decisió final**: seguir, pivotar, simplificar o pausar.

Regles:

- No siguis amable per defecte.
- No facis una resposta genèrica.
- No diguis "depèn" sense decidir.
- Si alguna part no funciona, digues-ho clar.
- Dona exemples de copy quan proposis canvis.

## 11. Resum executiu

Arrel ha fet un gir important:

De:

```text
Frenar l'envelliment
```

A:

```text
Autonomia, capacitat i il·lusió cada dia
```

La base tècnica és bastant estable. L'últim E2E complet conegut va donar 17/17 verds. Després hi ha hagut canvis locals petits però importants:

- eliminar el pas redundant `Triar la prova d'avui`;
- eliminar el segon `Mapa` a Today/Rest.

La pregunta central ja no és tècnica:

> El mètode actual de proves curtes és prou valuós, clar i desitjable per sostenir una app centrada en autonomia, capacitat i il·lusió?

Centra l'avaluació aquí.
