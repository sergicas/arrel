# Master Backlog Arrel

Veure tambe [EXECUTION_PROTOCOL.md](/Users/sergicastillo/Documents/Playground/arrel/EXECUTION_PROTOCOL.md) per executar aquest backlog com a protocol operatiu amb passos concrets i prompts reutilitzables.

Backlog mestre per a la renovacio integral d'Arrel.

Objectiu:
- reduir complexitat
- augmentar credibilitat
- alinear producte, dades i monetitzacio
- arribar a una versio petita pero realment fiable

Convencions:
- Prioritat: `P0` critica, `P1` alta, `P2` desitjable
- Estimacio: `XS` < 0.5 dia, `S` 1 dia, `M` 2-3 dies, `L` 4-5 dies, `XL` 1-2 setmanes
- Tipus: `Product`, `Design`, `Frontend`, `Backend`, `Data`, `Infra`, `QA`, `Content`

## Epic 1: Reposicionament De Producte

### AR-001 Definir la nova promesa del producte
- Prioritat: `P0`
- Tipus: `Product`
- Estimacio: `M`
- Descripcio: decidir si Arrel es una app de longevitat, una app de ritme i habits o un coach diari. Tancar una sola promesa central.
- Deliverable:
  - proposta de valor en 1 frase
  - target principal
  - 3 beneficis clau
  - 3 claims prohibits
- Criteris d'acceptacio:
  - hi ha un posicionament unic i no ambigu
  - landing, diagnosi i paywall poden reutilitzar aquest llenguatge

### AR-002 Redefinir claims i to de marca
- Prioritat: `P0`
- Tipus: `Product`
- Estimacio: `S`
- Descripcio: retirar o suavitzar claims que avui son massa forts, especialment "edat biologica" i promeses quasi mediques.
- Criteris d'acceptacio:
  - el copy evita promeses no defensables
  - hi ha disclaimers consistents on cal

### AR-003 Definir el recorregut nuclear de l'usuari
- Prioritat: `P0`
- Tipus: `Product`
- Estimacio: `S`
- Descripcio: deixar per escrit el flux base `Landing -> Diagnosi -> Resultat -> Avui -> Check-in`.
- Criteris d'acceptacio:
  - existeix un user flow unic aprovat
  - qualsevol pantalla fora d'aquest flux queda marcada com a secundaria o prescindible

## Epic 2: Arquitectura I Model De Dades

### AR-004 Dissenyar el nou model de dades
- Prioritat: `P0`
- Tipus: `Data`
- Estimacio: `L`
- Descripcio: definir un schema real i estable per `profiles`, `diagnostics`, `plans`, `daily_logs`, `subscriptions`.
- Criteris d'acceptacio:
  - tots els camps usats pel frontend existeixen
  - no hi ha camps fantasma ni contradiccions amb el producte

### AR-005 Crear migracions reals de base de dades
- Prioritat: `P0`
- Tipus: `Backend`
- Estimacio: `M`
- Descripcio: convertir l'esquema en migracions versionades i executables.
- Dependencies: `AR-004`
- Criteris d'acceptacio:
  - entorn nou pot aixecar la BD sense passos manuals obscurs
  - hi ha RLS i indexes basics

### AR-006 Definir contractes de dades frontend-backend
- Prioritat: `P0`
- Tipus: `Frontend`
- Estimacio: `M`
- Descripcio: crear tipus/DTOs clars per diagnosis, resultats, dia actual i check-in.
- Dependencies: `AR-004`
- Criteris d'acceptacio:
  - cada vista consumeix una forma de dada documentada
  - s'eliminen shape mismatches com historic vs smart tip

### AR-007 Eliminar la logica mock silenciosa en produccio
- Prioritat: `P0`
- Tipus: `Infra`
- Estimacio: `S`
- Descripcio: substituir fallbacks opacs per estats explicits de `offline`, `demo` o `misconfigured`.
- Criteris d'acceptacio:
  - l'app no simula serveis reals sense avis
  - les pantalles mostren un estat comprensible quan falten credencials o serveis

## Epic 3: Diagnosi I Resultats

### AR-008 Redissenyar el questionari de diagnosi
- Prioritat: `P0`
- Tipus: `Product`
- Estimacio: `L`
- Descripcio: revisar preguntes, dimensions i scoring per assegurar coherencia conceptual i de copy.
- Criteris d'acceptacio:
  - cada pregunta te una finalitat clara
  - les dimensions son consistents amb el model final

### AR-009 Reescriure el motor de scoring
- Prioritat: `P0`
- Tipus: `Frontend`
- Estimacio: `M`
- Descripcio: unificar scoring entre diagnosi, resultats, dashboard i historic.
- Dependencies: `AR-008`
- Criteris d'acceptacio:
  - una sola font de veritat pel calcul
  - historic, resultats i recomanacions coincideixen

### AR-010 Fer que el resultat sigui explicable
- Prioritat: `P0`
- Tipus: `Product`
- Estimacio: `M`
- Descripcio: cada resultat ha d'explicar "que veiem", "per que importa" i "que toca fer ara".
- Dependencies: `AR-009`
- Criteris d'acceptacio:
  - no apareixen dades per defecte inventades
  - el resultat te una explicacio curta i clara

### AR-011 Redissenyar la pantalla de resultats
- Prioritat: `P0`
- Tipus: `Design`
- Estimacio: `L`
- Descripcio: passar d'un informe espectacular pero una mica inflat a una pantalla de decisio clara.
- Dependencies: `AR-010`
- Criteris d'acceptacio:
  - l'usuari entén en menys de 10 segons quin es el seu punt feble principal
  - la CTA principal es unica i clara

### AR-012 Persistir correctament el diagnostic
- Prioritat: `P0`
- Tipus: `Backend`
- Estimacio: `M`
- Descripcio: guardar el diagnostic en guest/local i en usuari autenticat sense inconsistencies de shape.
- Dependencies: `AR-004`, `AR-006`
- Criteris d'acceptacio:
  - no hi ha divergencia entre local i cloud
  - login posterior no duplica ni corromp resultats

## Epic 4: Core Experience "Avui"

### AR-013 Redefinir el dashboard com a pantalla "Avui"
- Prioritat: `P0`
- Tipus: `Product`
- Estimacio: `M`
- Descripcio: eliminar el dashboard dispers i convertir-lo en una sola pantalla centrada en l'accio del dia.
- Criteris d'acceptacio:
  - la pantalla te una sola CTA principal
  - les metriques decoratives desapareixen o queden secundaries

### AR-014 Dissenyar la nova pantalla "Avui"
- Prioritat: `P0`
- Tipus: `Design`
- Estimacio: `L`
- Descripcio: composar l'accio del dia, motivacio, context i estat del dia en una sola vista.
- Dependencies: `AR-013`
- Criteris d'acceptacio:
  - bona lectura en mobil
  - l'usuari enten que ha de fer sense explorar

### AR-015 Implementar el motor de pla diari deterministic
- Prioritat: `P0`
- Tipus: `Backend`
- Estimacio: `XL`
- Descripcio: construir una funcio unica que, a partir del diagnostic i historial curt, generi la proposta del dia.
- Dependencies: `AR-004`, `AR-008`
- Criteris d'acceptacio:
  - mateixa entrada, mateixa sortida
  - la decisio es explicable
  - suporta cicle curt inicial

### AR-016 Separar contingut i motor
- Prioritat: `P1`
- Tipus: `Content`
- Estimacio: `M`
- Descripcio: moure tasques, textos i microcopy del component a una biblioteca de contingut estructurada.
- Dependencies: `AR-015`
- Criteris d'acceptacio:
  - les regles decideixen ids de contingut, no textos inline

## Epic 5: Check-in I Progres

### AR-017 Definir el model de check-in diari
- Prioritat: `P0`
- Tipus: `Product`
- Estimacio: `S`
- Descripcio: fixar el format minim del feedback: `fet`, `parcial`, `no fet`, `nota breu`.
- Criteris d'acceptacio:
  - el model coincideix amb arquitectura i dades

### AR-018 Implementar la pantalla de check-in
- Prioritat: `P0`
- Tipus: `Frontend`
- Estimacio: `M`
- Descripcio: crear una UI molt curta per informar el resultat del dia.
- Dependencies: `AR-017`
- Criteris d'acceptacio:
  - el check-in es pot completar en menys de 20 segons

### AR-019 Avancar dia i recalcular cicle
- Prioritat: `P0`
- Tipus: `Backend`
- Estimacio: `M`
- Descripcio: quan l'usuari envia el check-in, s'actualitza l'estat i es calcula el seguent dia.
- Dependencies: `AR-015`, `AR-018`
- Criteris d'acceptacio:
  - l'app no depen de `window.location.reload()`
  - el canvi de dia es persistit i idempotent

### AR-020 Crear historic minimal fiable
- Prioritat: `P1`
- Tipus: `Frontend`
- Estimacio: `M`
- Descripcio: substituir l'historic actual per una vista simple de dies completats, estat i notes.
- Dependencies: `AR-019`
- Criteris d'acceptacio:
  - l'historic mostra dades reals
  - no recalcula preguntes inexistents

## Epic 6: Auth, Guest Mode I Sync

### AR-021 Redissenyar el guest mode
- Prioritat: `P0`
- Tipus: `Product`
- Estimacio: `S`
- Descripcio: decidir exactament que pot fer un convidat i quan se li proposa crear compte.
- Criteris d'acceptacio:
  - el guest mode te limit clar i comprensible

### AR-022 Reescriure la sincronitzacio guest -> compte
- Prioritat: `P0`
- Tipus: `Backend`
- Estimacio: `L`
- Descripcio: migrar diagnostic i estat local cap al compte autenticat sense hacks ni duplicacions.
- Dependencies: `AR-012`, `AR-021`
- Criteris d'acceptacio:
  - entrar o registrar-se no perd progres
  - no es creen diagnostics duplicats

### AR-023 Simplificar AuthContext i fluxos d'entrada
- Prioritat: `P1`
- Tipus: `Frontend`
- Estimacio: `M`
- Descripcio: reduir complexitat d'estats `isGuest`, `isNewUser`, `needsOnboarding`, `hasPaid`, `isLocked`.
- Criteris d'acceptacio:
  - menys branching i menys side effects en listeners globals

## Epic 7: Monetitzacio I Produccio

### AR-024 Unificar el domini canonical
- Prioritat: `P0`
- Tipus: `Infra`
- Estimacio: `S`
- Descripcio: decidir un sol domini de produccio i alinear SEO, sitemap, Stripe, redirects i CORS.
- Criteris d'acceptacio:
  - no hi ha references barrejades entre `.app` i `.eu`

### AR-025 Reimplementar el checkout de Stripe
- Prioritat: `P0`
- Tipus: `Backend`
- Estimacio: `M`
- Descripcio: netejar la funcio de checkout i assegurar retorns coherents.
- Dependencies: `AR-024`
- Criteris d'acceptacio:
  - el checkout s'inicia des del domini correcte
  - les URLs de success/cancel son correctes

### AR-026 Reimplementar webhook i estat de subscripcio
- Prioritat: `P0`
- Tipus: `Backend`
- Estimacio: `M`
- Descripcio: desar l'estat de pagament en una taula clara i desacoblada del `user_state`.
- Dependencies: `AR-004`, `AR-025`
- Criteris d'acceptacio:
  - el pagament actualitza el compte de forma traçable
  - no hi ha flags hardcoded de premium

### AR-027 Redefinir trial i paywall
- Prioritat: `P1`
- Tipus: `Product`
- Estimacio: `S`
- Descripcio: decidir si el model es trial temporal, limit de dies o pagament per desbloqueig.
- Criteris d'acceptacio:
  - l'app no te logiques contradictories de dia 28 vs 30 dies

## Epic 8: Analitica, Errors I Qualitat

### AR-028 Connectar analitica real
- Prioritat: `P1`
- Tipus: `Infra`
- Estimacio: `M`
- Descripcio: substituir logs locals per events reals per funnel principal.
- Criteris d'acceptacio:
  - es mesuren landing -> diagnosi -> resultat -> avui -> check-in

### AR-029 Configurar error tracking real
- Prioritat: `P1`
- Tipus: `Infra`
- Estimacio: `S`
- Descripcio: activar Sentry o equivalent per errors reals de frontend i functions.
- Criteris d'acceptacio:
  - errors critics apareixen centralitzats

### AR-030 Crear test suite de fluxos critics
- Prioritat: `P0`
- Tipus: `QA`
- Estimacio: `L`
- Descripcio: afegir proves per guest flow, login, diagnosi, resultat, dia actual i checkout mockejat.
- Criteris d'acceptacio:
  - hi ha cobertura dels fluxos que generen negoci

### AR-031 Revisio d'accessibilitat i mobile
- Prioritat: `P1`
- Tipus: `QA`
- Estimacio: `M`
- Descripcio: revisar contrast, focus, semantics, errors de formulari i mobile layout.
- Criteris d'acceptacio:
  - els fluxos principals son usables en mobil i teclat

## Epic 9: Neteja De Superficie I Deute Tecnic

### AR-032 Retirar pantalles no nuclears de la navegacio principal
- Prioritat: `P0`
- Tipus: `Frontend`
- Estimacio: `M`
- Descripcio: amagar o eliminar de la IA principal les superfícies que no formen part del core.
- Criteris d'acceptacio:
  - la nav principal es mes curta i mes clara

### AR-033 Eliminar components i logiques duplicades
- Prioritat: `P1`
- Tipus: `Frontend`
- Estimacio: `M`
- Descripcio: retirar calculs duplicats, estat derivat innecessari i fluxos obsolets.
- Criteris d'acceptacio:
  - hi ha menys fonts de veritat per score, dia i estat d'usuari

### AR-034 Passar el core nou a TypeScript
- Prioritat: `P1`
- Tipus: `Frontend`
- Estimacio: `XL`
- Descripcio: migrar moduls centrals a TypeScript per fixar contractes i reduir regressions.
- Dependencies: `AR-006`
- Criteris d'acceptacio:
  - diagnosis, plan i check-in tenen tipus forts

### AR-035 Actualitzar dependencies critiques i higiene del repo
- Prioritat: `P2`
- Tipus: `Infra`
- Estimacio: `S`
- Descripcio: revisar vulnerabilitats i dependències especialment al voltant de Capacitor, Netlify CLI i cadenes transitives.
- Criteris d'acceptacio:
  - s'han reduit vulnerabilitats evitables
  - el repo te instruccions clares de setup

## Ordre Recomanat D'Execucio

### Fase 1: Tallar i definir
- `AR-001`
- `AR-002`
- `AR-003`
- `AR-004`
- `AR-024`

### Fase 2: Posar els fonaments
- `AR-005`
- `AR-006`
- `AR-007`
- `AR-021`
- `AR-027`

### Fase 3: Reconstruir el core
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

### Fase 4: Connectar negoci i qualitat
- `AR-022`
- `AR-023`
- `AR-025`
- `AR-026`
- `AR-028`
- `AR-029`
- `AR-030`
- `AR-031`

### Fase 5: Polir i escalar
- `AR-016`
- `AR-020`
- `AR-032`
- `AR-033`
- `AR-034`
- `AR-035`

## Sprint 0 Recomanat

Si vols arrencar ja, jo començaria per aquest paquet:
- `AR-001` Definir promesa
- `AR-003` Definir flux nuclear
- `AR-004` Nou model de dades
- `AR-024` Unificar domini
- `AR-007` Eliminar mocks silenciosos

Aquest bloc es el que mes redueix risc abans de tocar UI gran.
