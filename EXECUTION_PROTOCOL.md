# Execution Protocol Arrel

Protocol operatiu per convertir el backlog mestre en feina executable.

Aquest document no substitueix [MASTER_BACKLOG.md](/Users/sergicastillo/Documents/Playground/arrel/MASTER_BACKLOG.md). El complementa amb:
- ordre de treball
- accions concretes
- artefactes esperats
- validacions
- prompts llestos per enganxar a un agent

## Objectiu

Executar la renovacio integral d'Arrel amb el menor risc possible i sense perdre temps en instruccions ambigües.

## Regles D'Execucio

### Regla 1: treballa sempre sobre un scope petit
- no obrir 8 fronts alhora
- una issue o un lot curt per vegada
- cada entrega ha de deixar el repo millor del que l'ha trobat

### Regla 2: primer diagnostica, despres canvia
- abans de tocar fitxers, identificar:
  - fitxers afectats
  - riscos
  - validacions
  - dades o contractes implicats

### Regla 3: no amaguis estats falsos
- si un servei no existeix o no esta configurat, la UI ha de dir-ho
- mai simular produccio sense avis explicits

### Regla 4: una sola font de veritat
- un sol calcul per score
- un sol model de dia actual
- un sol model de billing
- un sol domini canonical

### Regla 5: tota feina acaba amb validacio
- com a minim:
  - `npm run build`
  - `npm run lint`
  - `npm test -- --run`
- si no es pot validar, cal deixar-ho dit a l'entrega

## Estructura Recomanada De Deliverables

Quan una issue exigeixi documentacio o especificacio, crear o actualitzar aquests espais:

- `docs/strategy/`
- `docs/specs/`
- `docs/flows/`
- `docs/runbooks/`
- `docs/decisions/`

Quan una issue exigeixi dades o backend:

- `supabase/migrations/` o equivalent versionat
- `src/shared/types/`
- `src/modules/`

## Checklist Estandard Per Cada Issue

### Abans de comencar
1. Executar `git status --short`
2. Localitzar fitxers clau amb `rg`
3. Llegir el codi i la doc minima necessaria
4. Escriure un mini-pla de 3-6 passos
5. Identificar la validacio minima

### Durant la implementacio
1. Fer canvis petits i coherents
2. Actualitzar docs o tipus si canvia el contracte
3. No deixar TODOs muds sense context
4. No introduir defaults opacs que inventin dades

### En tancar la issue
1. Executar validacions
2. Revisar el diff final
3. Llistar fitxers tocats
4. Deixar riscos oberts
5. Marcar dependencies seguent pas

## Plantilla Universal De Prompt

Fes servir aquesta plantilla quan vulguis crear prompts nous:

```text
Treballa sobre el repo /Users/sergicastillo/Documents/Playground/arrel.

Objectiu:
[descriu el resultat final en una frase]

Abans de fer canvis:
1. inspecciona els fitxers afectats
2. resumeix en 3-5 punts el problema actual
3. proposa el pla curt d'implementacio

Implementa:
1. [accio 1]
2. [accio 2]
3. [accio 3]

Constrains:
- no trenquis comportament no relacionat
- si detectes contradiccions de dades o contracte, resol-les o deixa-les explicitades
- actualitza documentacio si canvia el comportament

Validacio:
- executa `npm run build`
- executa `npm run lint`
- executa `npm test -- --run`

Entrega:
- resum curt
- fitxers modificats
- riscos pendents
```

## Fases Operatives

## Fase 1: Tallar I Definir

### Issues
- `AR-001`
- `AR-002`
- `AR-003`
- `AR-004`
- `AR-024`

### Resultat d'aquesta fase
- una promesa de producte unica
- un flux nuclear aprovat
- un model de dades nou
- un domini canonical unificat

### Accions concretes
1. Revisar `ARCHITECTURE.md`, `MANIFEST.md`, `README.md`, landing, resultats i checkout.
2. Fer una taula de contradiccions entre promesa, codi i monetitzacio.
3. Tancar el product statement i el flux base.
4. Dissenyar l'esquema nou abans de tocar implementacio gran.
5. Escollir domini canonical i alinear referencies.

### Artefactes esperats
- `docs/strategy/product-positioning.md`
- `docs/flows/core-user-flow.md`
- `docs/specs/data-model-v2.md`
- `docs/decisions/domain-canonical.md`

### Prompt executable de fase

```text
Treballa sobre el repo /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: tancar la base estrategica de la renovacio abans de tocar la implementacio gran.

Llegeix primer:
- ARCHITECTURE.md
- MANIFEST.md
- README.md
- src/pages/Landing.jsx
- src/pages/Resultats.jsx
- src/context/AuthContext.jsx
- src/data/schema.sql
- src/components/SEO.jsx
- public/sitemap.xml
- netlify/functions/create-checkout-session.js

Despres:
1. documenta les contradiccions actuals entre promesa, producte, dades i domini
2. defineix una nova promesa de producte unica
3. defineix el flux nuclear Landing -> Diagnosi -> Resultat -> Avui -> Check-in
4. proposa el model de dades v2
5. escull un domini canonical i alinea les referencies hardcoded

Crea documents a:
- docs/strategy/product-positioning.md
- docs/flows/core-user-flow.md
- docs/specs/data-model-v2.md
- docs/decisions/domain-canonical.md

Si cal fer canvis de codi menors per alinear domini o docs, fes-los.

Valida amb:
- rg -n "arrel\\.app|arrel\\.eu" .
- npm run build

Entrega el resum, els documents creats i els fitxers canviats.
```

## Fase 2: Posar Els Fonaments

### Issues
- `AR-005`
- `AR-006`
- `AR-007`
- `AR-021`
- `AR-027`

### Resultat d'aquesta fase
- migracions reals
- contractes de dades clars
- guest mode definit
- trial/paywall definit
- no mes mocks silenciosos

### Accions concretes
1. Materialitzar l'esquema v2 en migracions.
2. Definir DTOs i tipus compartits.
3. Convertir errors de configuracio en estats visibles.
4. Decidir exactament que pot fer un convidat.
5. Escriure les regles del trial i del paywall en un sol lloc.

### Artefactes esperats
- `supabase/migrations/*`
- `src/shared/types/*`
- `docs/specs/guest-mode.md`
- `docs/specs/billing-rules.md`
- `docs/runbooks/app-states.md`

### Prompt executable de fase

```text
Treballa sobre el repo /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: deixar la base tecnica i de negoci preparada per reconstruir el core sense inconsistencies.

Revisa:
- src/data/schema.sql
- src/lib/supabaseClient.js
- src/context/AuthContext.jsx
- src/hooks/useTrialStatus.js
- src/App.jsx
- .env.example

Implementa:
1. migracions reals del model de dades v2
2. tipus/contractes compartits per diagnosis, pla, check-in i billing
3. estats explicits per offline, demo i misconfigured
4. document de guest mode
5. document de trial/paywall sense contradiccions

No deixis mocks silenciosos ni flags hardcoded de premium.

Valida amb:
- npm run build
- npm run lint
- npm test -- --run

Entrega documents, tipus, migracions i riscos oberts.
```

## Fase 3: Reconstruir El Core

### Issues
- `AR-008`
- `AR-009`
- `AR-010`
- `AR-011`
- `AR-012`
- `AR-013`
- `AR-014`
- `AR-015`
- `AR-017`
- `AR-018`
- `AR-019`

### Resultat d'aquesta fase
- diagnosi coherent
- resultat explicable
- pantalla Avui clara
- motor deterministic
- check-in real

### Accions concretes
1. Redissenyar preguntes i dimensions.
2. Unificar score i persistencia.
3. Reescriure resultats per ser creibles.
4. Redissenyar dashboard com a pantalla Avui.
5. Implementar motor de pla i model de check-in.
6. Fer avanc de dia sense recarregar la pagina.

### Artefactes esperats
- `docs/specs/diagnosis-v2.md`
- `docs/specs/scoring-v2.md`
- `docs/specs/daily-plan-engine.md`
- `docs/specs/checkin-model.md`

### Prompt executable de fase

```text
Treballa sobre el repo /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: reconstruir el recorregut principal de producte sobre bases consistents.

Revisa:
- src/data/diagnosisData.js
- src/pages/Diagnosis.jsx
- src/pages/Resultats.jsx
- src/pages/Dashboard.jsx
- src/pages/protocol/DailyProtocol.jsx
- src/utils/scoreUtils.js
- src/context/ArrelContext.jsx

Implementa:
1. diagnosi v2 i scoring unificat
2. resultat explicable i sense dades inventades
3. nova pantalla Avui amb una sola CTA principal
4. motor deterministic de pla diari
5. model i UI de check-in curt
6. avanc de dia idempotent i sense reload

Actualitza docs de spec si canvies contractes o logica.

Valida amb:
- npm run build
- npm run lint
- npm test -- --run

Entrega resum funcional, fitxers tocats i punts encara no coberts.
```

## Fase 4: Connectar Negoci I Qualitat

### Issues
- `AR-022`
- `AR-023`
- `AR-025`
- `AR-026`
- `AR-028`
- `AR-029`
- `AR-030`
- `AR-031`

### Resultat d'aquesta fase
- sync guest -> usuari robust
- auth simplificat
- billing real
- observabilitat
- cobertura de fluxos critics

### Accions concretes
1. Reescriure el bridge de guest a compte.
2. Simplificar `AuthContext`.
3. Refer checkout i webhook.
4. Connectar analytics i error tracking.
5. Afegir proves de flux.
6. Fer una passada d'accessibilitat i mobile.

### Prompt executable de fase

```text
Treballa sobre el repo /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: convertir el nou core en un producte operable i fiable.

Revisa:
- src/context/AuthContext.jsx
- src/hooks/useTrialStatus.js
- netlify/functions/create-checkout-session.js
- netlify/functions/stripe-webhook.js
- src/lib/analytics.js
- tests existents i configuracio Vitest

Implementa:
1. sync robust guest -> usuari
2. simplificacio d'AuthContext
3. checkout i webhook coherents amb el model de billing
4. analytics real del funnel principal
5. error tracking
6. tests dels fluxos critics
7. revisio d'accessibilitat i mobile del core

Valida amb:
- npm run build
- npm run lint
- npm test -- --run

Entrega el diff, la cobertura afegida i els riscos residuals.
```

## Fase 5: Polir I Escalar

### Issues
- `AR-016`
- `AR-020`
- `AR-032`
- `AR-033`
- `AR-034`
- `AR-035`

### Resultat d'aquesta fase
- contingut desacoblat
- historic fiable
- superfície reduida
- menys deute tecnic
- core nou tipat

### Accions concretes
1. Separar contingut i regles.
2. Simplificar historic.
3. Retirar rutes i superfícies no nuclears.
4. Eliminar duplicats.
5. Migrar el core a TypeScript.
6. Fer higiene de dependencies.

### Prompt executable de fase

```text
Treballa sobre el repo /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: polir el producte nou i deixar-lo preparat per escalar i mantenir.

Implementa:
1. separacio neta entre contingut i motor
2. historic minimal i fiable
3. retirada de pantalles no nuclears de la IA principal
4. neteja de duplicats i logiques mortes
5. migracio a TypeScript dels moduls core
6. revisio de dependencies critiques i setup del repo

Valida amb:
- npm run build
- npm run lint
- npm test -- --run

Entrega els guanys de mantenibilitat, fitxers tocats i passos seguents.
```

## Biblioteca De Prompts Per Issue

Cada prompt de sota esta pensat per copiar-lo tal qual en un agent que pugui llegir i editar el repo.

### AR-001 Definir la nova promesa del producte

#### Accions concretes
1. Llegir `ARCHITECTURE.md`, `MANIFEST.md`, `README.md`, `src/pages/Landing.jsx`, `src/pages/Resultats.jsx`.
2. Extreure promeses actuals i contradiccions.
3. Proposar 3 posicionaments possibles i escollir-ne 1.
4. Escriure la versio final de promesa, target i beneficis.
5. Guardar-ho a `docs/strategy/product-positioning.md`.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: definir una promesa de producte unica i realista per Arrel.

Llegeix primer:
- ARCHITECTURE.md
- MANIFEST.md
- README.md
- src/pages/Landing.jsx
- src/pages/Resultats.jsx

Despres:
1. resumeix les promeses actuals i les contradiccions
2. proposa 3 opcions de posicionament
3. escull la mes coherent amb el producte que realment podem construir
4. crea `docs/strategy/product-positioning.md` amb:
   - proposta de valor en 1 frase
   - target principal
   - 3 beneficis clau
   - 3 claims prohibits

No toquis implementacio si no cal. Entrega el document i el racional.
```

### AR-002 Redefinir claims i to de marca

#### Accions concretes
1. Localitzar copy sensible a claims.
2. Marcar frases de risc alt, mig i baix.
3. Reescriure claims problematics.
4. Crear guia curta de to.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: suavitzar claims massa forts i definir un to de marca mes creible.

Revisa el copy de:
- src/pages/Landing.jsx
- src/pages/Resultats.jsx
- src/components/Paywall.jsx
- src/components/SEO.jsx

Implementa:
1. auditoria de claims
2. reescriptura de claims no defensables
3. guia curta de to i disclaimers a `docs/strategy/claims-and-tone.md`

Si canvia copy del producte, actualitza els fitxers necessaris. Valida amb `npm run build`.
```

### AR-003 Definir el recorregut nuclear de l'usuari

#### Accions concretes
1. Inventariar rutes actuals.
2. Separar rutes core i secundaries.
3. Dibuixar el flux base i els estats de bloqueig.
4. Crear una taula "entra aqui / surt aqui / CTA principal".

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: definir el flux nuclear de producte i deixar clar que sobra.

Revisa:
- src/App.jsx
- layout i rutes principals

Crea `docs/flows/core-user-flow.md` amb:
1. inventari de rutes actuals
2. flux nuclear aprovat
3. rutes secundaries
4. rutes prescindibles o candidates a retirar
5. CTA principal de cada pantalla core

No facis refactor encara si no es necessari. Entrega el mapa final.
```

### AR-004 Dissenyar el nou model de dades

#### Accions concretes
1. Auditar camps usats pel frontend.
2. Comparar-los amb l'esquema actual.
3. Dissenyar taules i relacions v2.
4. Definir exemples de payload.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: dissenyar un model de dades v2 coherent amb el producte nou.

Revisa:
- src/data/schema.sql
- src/context/AuthContext.jsx
- src/pages/Diagnosis.jsx
- src/pages/Dashboard.jsx
- src/pages/protocol/DailyProtocol.jsx
- qualsevol altre fitxer que llegeixi o escrigui estat persistent

Crea `docs/specs/data-model-v2.md` amb:
1. taules noves
2. camps
3. relacions
4. exemples de payload
5. incompatibilitats actuals detectades

Entrega el document i la llista de camps fantasma trobats.
```

### AR-005 Crear migracions reals de base de dades

#### Accions concretes
1. Convertir el model v2 a migracions.
2. Crear taules, indexes i RLS basics.
3. Documentar ordre d'aplicacio.
4. Afegir script o runbook de setup si cal.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: materialitzar el model de dades v2 en migracions reals i versionades.

Parteix de `docs/specs/data-model-v2.md`.

Implementa:
1. carpeta de migracions versionades
2. taules, indexes i RLS basics
3. runbook curt a `docs/runbooks/db-setup.md`

No deixis l'esquema nomes en un fitxer de referencia. Entrega migracions i instruccions de setup.
```

### AR-006 Definir contractes de dades frontend-backend

#### Accions concretes
1. Definir tipus per diagnosis, result, daily plan, daily log i billing state.
2. Centralitzar-los.
3. Eliminar shapes duplicats.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: crear contractes de dades compartits i eliminar shape mismatches.

Revisa el codi que mou dades entre:
- diagnosi
- resultats
- dashboard/avui
- protocol
- auth/billing

Implementa tipus compartits a `src/shared/types/` i adapta els moduls afectats.

Valida amb:
- npm run build
- npm run lint

Entrega els tipus creats i els fitxers alineats.
```

### AR-007 Eliminar la logica mock silenciosa en produccio

#### Accions concretes
1. Auditar mocks i fallbacks opacs.
2. Substituir-los per estats visibles.
3. Afegir missatges i rutes de recuperacio.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: eliminar la sensacio falsa de que tot funciona quan falten serveis.

Revisa:
- src/lib/supabaseClient.js
- src/context/AuthContext.jsx
- pantalles que depenen d'aquests serveis

Implementa:
1. estats explicits `offline`, `demo` o `misconfigured`
2. UIs clares per aquests casos
3. document a `docs/runbooks/app-states.md`

Valida amb `npm run build`. No deixis mocks silenciosos en el cami principal.
```

### AR-008 Redissenyar el questionari de diagnosi

#### Accions concretes
1. Revisar dimensions i objectius.
2. Revisar cada pregunta, opcio i etiqueta.
3. Eliminar redundancies.
4. Documentar scoring esperat.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: redissenyar el questionari de diagnosi perque sigui coherent, curt i explicable.

Revisa:
- src/data/diagnosisData.js
- src/pages/Diagnosis.jsx
- docs de producte existents

Implementa:
1. nova proposta de dimensions
2. nova redaccio de preguntes i opcions
3. spec a `docs/specs/diagnosis-v2.md`
4. si escau, actualitza el fitxer de dades actual

Evita jargon gratuit i claims medics exagerats.
```

### AR-009 Reescriure el motor de scoring

#### Accions concretes
1. Auditar tots els calculs actuals.
2. Crear un unic modul de scoring.
3. Adaptar resultats, dashboard i historic.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: unificar el calcul de scoring en un sol modul reutilitzable.

Revisa:
- src/utils/scoreUtils.js
- src/pages/Resultats.jsx
- src/pages/Dashboard.jsx
- src/pages/Historic.jsx
- qualsevol altre calcul duplicat

Implementa:
1. un sol modul de scoring
2. actualitzacio dels consumidors
3. tests unitaris nous o ampliats

Valida amb:
- npm test -- --run
- npm run build
```

### AR-010 Fer que el resultat sigui explicable

#### Accions concretes
1. Definir estructura "que veiem / per que importa / que toca fer".
2. Eliminar defaults inventats.
3. Assegurar correspondencia entre score i copy.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: fer que la pantalla de resultats expliqui clarament el diagnostic i la recomanacio.

Revisa:
- src/pages/Resultats.jsx
- scoring actual
- dades guardades a diagnosi

Implementa:
1. estructura explicable del resultat
2. eliminacio de dades per defecte inventades
3. copy coherent amb el score real

Valida amb `npm run build`. Entrega abans/despres i riscos.
```

### AR-011 Redissenyar la pantalla de resultats

#### Accions concretes
1. Simplificar jerarquia visual.
2. Donar una sola CTA principal.
3. Prioritzar llegibilitat i credibilitat.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: redissenyar la pantalla de resultats per maximitzar claredat i conversio sense inflar el diagnostic.

Revisa `src/pages/Resultats.jsx` i els components visuals relacionats.

Implementa:
1. jerarquia nova
2. CTA principal unica
3. millor lectura en mobil
4. estil menys "informe magic" i mes "decisio clara"

Valida amb `npm run build` i descriu els canvis UX.
```

### AR-012 Persistir correctament el diagnostic

#### Accions concretes
1. Unificar shape del diagnostic local i cloud.
2. Eliminar duplicacio o parsejat inconsistent.
3. Cobrir el flux guest -> login.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: persistir el diagnostic de forma coherent en local i backend.

Revisa:
- src/pages/Diagnosis.jsx
- src/context/AuthContext.jsx
- src/context/ArrelContext.jsx
- storage helpers

Implementa:
1. shape unic de diagnostic
2. persistencia local coherent
3. persistencia cloud coherent
4. sincronitzacio segura si el guest crea compte despres

Valida amb tests del flux i `npm run build`.
```

### AR-013 Redefinir el dashboard com a pantalla "Avui"

#### Accions concretes
1. Auditar elements decoratius.
2. Decidir contingut minim de la pantalla.
3. Redefinir CTA principal.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: convertir el dashboard en una pantalla Avui centrada en l'accio del dia.

Revisa:
- src/pages/Dashboard.jsx
- components que hi entren

Implementa:
1. simplificacio radical de la pantalla
2. una sola CTA principal
3. contingut secundari molt controlat
4. document curt a `docs/specs/today-screen.md`

Valida amb `npm run build`.
```

### AR-014 Dissenyar la nova pantalla "Avui"

#### Accions concretes
1. Dissenyar layout mobil-first.
2. Posar accio, context i progrés curt.
3. Polir motion i empty states.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: donar forma visual final a la nova pantalla Avui.

Parteix de `docs/specs/today-screen.md` si existeix.

Implementa una UI mobil-first que mostri:
1. l'accio del dia
2. per que toca avui
3. l'estat del dia
4. el botó cap al check-in o execucio

Mantingues el llenguatge visual de marca pero amb menys soroll. Valida amb `npm run build`.
```

### AR-015 Implementar el motor de pla diari deterministic

#### Accions concretes
1. Definir inputs i outputs del motor.
2. Escriure regles v1.
3. Cobrir casos basics amb tests.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: implementar un motor deterministic que generi el pla del dia a partir del diagnostic i historial curt.

Implementa:
1. spec a `docs/specs/daily-plan-engine.md`
2. modul de motor versionat
3. tests unitaris del motor
4. integracio minima amb la pantalla Avui

La decisio ha de ser explicable i reproduible. Valida amb `npm test -- --run` i `npm run build`.
```

### AR-016 Separar contingut i motor

#### Accions concretes
1. Moure text i tasks a una biblioteca.
2. Fer que el motor retorni ids, no copy inline.
3. Documentar estructura.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: desacoblar contingut i motor per facilitar manteniment i iteracio.

Revisa el contingut inline de protocols, resultats i tips.

Implementa:
1. biblioteca de contingut estructurada
2. adaptacio del motor per retornar ids de contingut
3. document a `docs/specs/content-library.md`

Valida amb `npm run build`.
```

### AR-017 Definir el model de check-in diari

#### Accions concretes
1. Fixar camps i estats.
2. Definir payload.
3. Escriure regles d'avanc de dia.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: definir formalment el model de check-in diari.

Crea `docs/specs/checkin-model.md` amb:
1. camps obligatoris
2. valors possibles
3. payload frontend-backend
4. efecte sobre dia actual i cicle

Revisa que coincideixi amb el model de dades v2.
```

### AR-018 Implementar la pantalla de check-in

#### Accions concretes
1. Crear UI de 20 segons.
2. Connectar-la al model de dades.
3. Afegir validacio minima.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: implementar una pantalla de check-in molt curta i clara.

Parteix de `docs/specs/checkin-model.md`.

Implementa:
1. UI amb `fet`, `parcial`, `no fet` i nota breu opcional
2. connexio a persistencia
3. feedback d'exit/error

Valida amb `npm run build` i prova el flux manualment.
```

### AR-019 Avancar dia i recalcular cicle

#### Accions concretes
1. Treure reloads.
2. Fer mutacio idempotent.
3. Recalcular el seguent pla.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: fer que el check-in avanci el dia i recalculi el cicle sense hacks ni reload.

Revisa:
- src/pages/protocol/DailyProtocol.jsx
- estat de dia actual
- motor nou

Implementa:
1. avanc de dia idempotent
2. recalcul del seguent pla
3. eliminacio de `window.location.reload()`

Valida amb `npm run build`, `npm test -- --run` i descriu el nou flux.
```

### AR-020 Crear historic minimal fiable

#### Accions concretes
1. Eliminar recalculs falsos.
2. Mostrar nomes dades reals.
3. Prioritzar simplicitat.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: substituir l'historic actual per una vista simple i fiable.

Revisa:
- src/pages/Historic.jsx
- qualsevol helper relacionat

Implementa:
1. historic basat en dades reals de daily logs i diagnostics
2. retirada de calculs inventats o inconsistent
3. UI simple de dies, estat i notes

Valida amb `npm run build`.
```

### AR-021 Redissenyar el guest mode

#### Accions concretes
1. Definir capacitats i limitacions.
2. Definir moments d'upsell.
3. Documentar-ho.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: definir clarament el guest mode i els seus limits.

Revisa:
- src/context/AuthContext.jsx
- flux de diagnosi i dashboard
- paywall actual

Crea `docs/specs/guest-mode.md` amb:
1. que pot fer un guest
2. que no pot fer
3. quan es proposa registre
4. com es sincronitza si crea compte
```

### AR-022 Reescriure la sincronitzacio guest -> compte

#### Accions concretes
1. Auditar estat local guardat.
2. Definir migracio de dades.
3. Fer-la idempotent.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: reescriure la sincronitzacio de guest a usuari autenticat sense duplicats ni perdues.

Revisa:
- src/context/AuthContext.jsx
- storage local
- persistencia de diagnostic i estat de dia

Implementa:
1. una rutina clara de migracio
2. proteccio contra duplicats
3. tests del flux guest -> register/login -> continuacio

Valida amb `npm test -- --run` i `npm run build`.
```

### AR-023 Simplificar AuthContext i fluxos d'entrada

#### Accions concretes
1. Reduir branching.
2. Separar auth, onboarding i billing state.
3. Fer-lo mes llegible.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: simplificar AuthContext i reduir side effects i branching.

Revisa especialment:
- src/context/AuthContext.jsx
- src/components/AuthRedirect.jsx
- src/pages/AuthCallback.jsx
- hooks de trial/billing

Implementa una versio mes simple amb responsabilitats clares.

Valida amb:
- npm run lint
- npm run build
- npm test -- --run
```

### AR-024 Unificar el domini canonical

#### Accions concretes
1. Escollir domini final.
2. Actualitzar SEO, sitemap, env, Stripe i redirects.
3. Fer una passada de cerca global.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: unificar totes les referencies de domini a un sol canonical.

Revisa:
- public/sitemap.xml
- src/components/SEO.jsx
- .env.example
- netlify/functions/create-checkout-session.js
- netlify.toml
- qualsevol altre match de `.app` o `.eu`

Implementa:
1. decisio de domini canonical
2. actualitzacio de totes les referencies
3. document a `docs/decisions/domain-canonical.md`

Valida amb:
- rg -n "arrel\\.app|arrel\\.eu" .
- npm run build
```

### AR-025 Reimplementar el checkout de Stripe

#### Accions concretes
1. Netejar input/output de la function.
2. Alinear-la amb el domini nou.
3. Afegir missatges d'error clars.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: reimplementar el checkout de Stripe de forma neta i coherent amb el domini i model de billing nous.

Revisa:
- netlify/functions/create-checkout-session.js
- qualsevol UI que invoqui checkout

Implementa:
1. validacio d'inputs
2. URLs de retorn correctes
3. errors clars
4. document curt a `docs/runbooks/stripe-checkout.md`

Valida amb `npm run build` i deixa els env vars necessaris documentats.
```

### AR-026 Reimplementar webhook i estat de subscripcio

#### Accions concretes
1. Crear model de billing state.
2. Fer webhook idempotent.
3. Separar billing de user_state.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: fer que el webhook actualitzi l'estat de billing de forma traçable i desacoblada del user_state.

Revisa:
- netlify/functions/stripe-webhook.js
- model de dades de billing

Implementa:
1. taula o model de subscriptions/billing state
2. webhook idempotent
3. integracio amb access control de l'app

Valida amb tests si en pots afegir i `npm run build`.
```

### AR-027 Redefinir trial i paywall

#### Accions concretes
1. Triar model de monetitzacio.
2. Eliminar contradiccions 28 vs 30 dies.
3. Documentar regles.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: definir una unica regla de trial/paywall per tot el producte.

Revisa:
- src/hooks/useTrialStatus.js
- src/context/AuthContext.jsx
- src/components/Paywall.jsx
- src/pages/protocol/DailyProtocol.jsx

Crea `docs/specs/billing-rules.md` i actualitza la implementacio per eliminar contradiccions.

Valida amb `npm run build`.
```

### AR-028 Connectar analitica real

#### Accions concretes
1. Definir funnel.
2. Crear capa real d'events.
3. Instrumentar pantalles core.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: connectar analitica real del funnel principal.

Revisa:
- src/lib/analytics.js
- landing
- diagnosi
- resultats
- avui
- check-in

Implementa:
1. esquema d'events
2. capa real d'analytics
3. instrumentacio del funnel principal
4. document a `docs/specs/analytics-funnel.md`

Valida amb `npm run build`.
```

### AR-029 Configurar error tracking real

#### Accions concretes
1. Activar Sentry o equivalent.
2. Cobrir frontend i functions.
3. Documentar setup.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: configurar error tracking real per frontend i backend/functions.

Implementa:
1. integracio de Sentry o equivalent
2. captura de errors critics
3. document a `docs/runbooks/error-tracking.md`

Valida amb `npm run build` i deixa clar quins env vars fan falta.
```

### AR-030 Crear test suite de fluxos critics

#### Accions concretes
1. Llistar fluxos que mouen negoci.
2. Cobrir-los amb proves.
3. Integrar-los a la rutina de validacio.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: ampliar la suite de tests per cobrir els fluxos critics de negoci.

Cobreix com a minim:
1. landing -> diagnosi -> resultats
2. guest -> avui
3. guest -> registre/login -> sync
4. check-in -> avanc de dia
5. paywall/checkout mockejat

Implementa les proves i valida amb `npm test -- --run`.
```

### AR-031 Revisio d'accessibilitat i mobile

#### Accions concretes
1. Revisar focus, labels i errors.
2. Revisar contrast.
3. Revisar mobile del core.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: fer una passada d'accessibilitat i mobile al flux core.

Revisa:
- landing
- diagnosi
- resultats
- avui
- check-in

Implementa millores de:
1. semantica
2. focus states
3. contrast
4. errors de formulari
5. layout mobil

Valida amb `npm run build` i resumeix les millores.
```

### AR-032 Retirar pantalles no nuclears de la navegacio principal

#### Accions concretes
1. Fer inventari de pantalles secundaries.
2. Treure-les de la nav principal.
3. Deixar-ne constancia.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: reduir la superficie de producte visible i deixar la navegacio centrada en el core.

Revisa les rutes i la navegacio actuals i retira de la IA principal tot el que no sigui core.

Documenta a `docs/flows/non-core-surfaces.md` que queda amagat, eliminat o aparcat.

Valida amb `npm run build`.
```

### AR-033 Eliminar components i logiques duplicades

#### Accions concretes
1. Trobar calculs i helpers repetits.
2. Consolidar-los.
3. Esborrar codi mort.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: netejar duplicats, helpers redundants i codi mort del core.

Revisa sobretot:
- scoring
- auth state
- dia actual
- storage
- billing state

Implementa consolidacio i neteja.

Valida amb:
- npm run lint
- npm run build
- npm test -- --run
```

### AR-034 Passar el core nou a TypeScript

#### Accions concretes
1. Migrar moduls core.
2. Fixar tipus compartits.
3. Eliminar errors evidents de contracte.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: migrar a TypeScript els moduls core de la nova arquitectura.

Prioritza:
1. diagnosis
2. scoring
3. today screen
4. daily plan engine
5. check-in
6. auth/billing core

Introdueix tipus forts i adapta config si cal.

Valida amb build, lint i tests.
```

### AR-035 Actualitzar dependencies critiques i higiene del repo

#### Accions concretes
1. Revisar dependencies i vulnerabilitats.
2. Actualitzar el que sigui segur.
3. Documentar el setup del repo.

#### Prompt executable

```text
Treballa sobre /Users/sergicastillo/Documents/Playground/arrel.

Objectiu: reduir deute de dependencies i millorar la higiene operativa del repo.

Revisa:
- package.json
- package-lock.json
- resultat de `npm audit`

Implementa:
1. actualitzacions segures de dependencies critiques
2. neteja de scripts i setup si cal
3. millora de README o runbook de desenvolupament

Valida amb:
- npm install
- npm run build
- npm run lint
- npm test -- --run
```

## Protocol De Tancament De Cada Lot

Quan tanquis qualsevol lot de feina, l'entrega ha de seguir aquest format:

```text
Lot tancat:
- Issues cobertes:
- Objectiu assolit:
- Fitxers modificats:
- Validacions executades:
- Decisions preses:
- Riscos oberts:
- Seguent millor pas:
```

## Ordre Minimitzador De Risc

Si vols maximitzar impacte i minimitzar rework, segueix aquest ordre:

1. `AR-001`
2. `AR-003`
3. `AR-004`
4. `AR-024`
5. `AR-007`
6. `AR-005`
7. `AR-006`
8. `AR-021`
9. `AR-027`
10. `AR-008` a `AR-019`
11. `AR-022` a `AR-031`
12. `AR-016`, `AR-020`, `AR-032`, `AR-033`, `AR-034`, `AR-035`

Aquest ordre evita reconstruir UI abans de tancar producte, dades i regles de negoci.
