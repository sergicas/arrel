# Informe per a Google Jules — estat actual d’Arrel

Vull que facis una anàlisi contrastada de l’app Arrel. No vull només una validació amable: vull que contrastis el que diu aquest informe amb el codi, executis l’app, recorreguis el flux i detectis incoherències, riscos, pantalles confuses i regressions.

## 1. Context del producte

Arrel és una app en català orientada sobretot a persones adultes i grans, aproximadament 55-75 anys, que volen actuar davant l’envelliment de manera pràctica. El cor real del producte és:

> Frena el teu envelliment.

La promesa no ha de sonar mèdica ni miraculosa. La idea és frenar l’envelliment quotidià practicant capacitats concretes:

- Cos
- Memòria
- Calma
- Vincles
- Identitat

L’app no ha de prometre rejoveniment, curació ni diagnòstic mèdic. Ha de proposar proves petites, concretes i honestes que ajudin l’usuari a veure si una capacitat encara respon, costa o s’evita.

Hi ha una idea futura, separada d’aquesta app, sobre preservar memòria i identitat de persones que ja han mort. No és l’abast actual d’Arrel.

## 2. Principis UX que han de governar tota la revisió

Revisa tota l’app amb aquests criteris:

1. Claredat màxima.
2. Fer molt difícil que l’usuari es confongui.
3. Fer molt difícil que l’usuari quedi en un cul-de-sac sense saber què fer a continuació.
4. Evitar missatges repetitius o redundants.
5. Navalla d’Occam: si es pot dir més senzill, no s’ha de dir més complicat.
6. Evitar expressions ambigües, vagues o que no aportin res.

Expressions que s’han considerat massa vagues o poc útils:

- “Conserva el que no vols deixar caure”
- “Pots provar-ho abans de posar-li nom a res”
- “Comences pel que encara respon”
- “Fes una prova i mira si et diu alguna cosa real”
- “Comprova què encara respon”
- “Fes-la ara, petita i honesta”
- “No busquem rendiment. Busquem senyal”

El missatge central ha de ser directe:

> Frena el teu envelliment.

## 3. Estat tècnic actual

Repo local:

```bash
/Users/sergicastillo/Documents/Playground/arrel
```

Stack:

- React 19
- Vite
- React Router
- Capacitor 8
- iOS project ja creat dins `ios/`
- Persistència local amb `localStorage` al web i `@capacitor/preferences` en native
- Recordatoris amb `@capacitor/local-notifications`
- Tests amb Vitest i Playwright

Scripts importants:

```bash
npm run dev
npm run build
npm run lint
npm test -- --run
npm run test:e2e
npm run ios:sync
npm run ios:open
```

Configuració iOS important:

- `capacitor.config.json`
- `appId`: `eu.arrel.app`
- `appName`: `Arrel`
- `iosScheme`: `capacitor`
- Color splash/status: `#FFF3DF`
- Build native: `npm run ios:sync` fa `VITE_NATIVE_APP=1 npm run build && cap sync ios`
- La PWA queda desactivada en build natiu via `VITE_NATIVE_APP=1` per evitar pantalles blanques o conflictes amb service worker dins WKWebView.

## 4. Estat de git en el moment de l’informe

Últims commits rellevants:

```text
3dfd4ba content: rebalance proof bank for aging focus
f7dc6f6 feat: add flexible proof rhythms
e1e9517 style: shift Arrel to warm vital palette
6ae5b18 copy: make anti-aging promise explicit
14ce121 refactor: reframe Arrel around preserving capacities
71a22df chore: prepare TestFlight beta validation
```

Hi ha una tongada gran de canvis encara no commitejada. No assumeixis que el working tree és net. Revisa `git status --short`.

Canvis no commitejats importants:

- Navegació global des de pantalles internes.
- Nou mapa de l’app.
- Landing reescrita per obrir opcions lliures.
- L’usuari pot triar la prova d’avui per capacitat: Cos, Memòria, Calma, Vincles o Identitat.
- Copy simplificat en diverses pantalles.
- Canvis en el flux d’entrada, proves, ritmes i tests.
- Canvis a iOS/Xcode generats per sincronització o signing.
- Nou fitxer `src/v2/lib/navigation.js`.

Fitxers especialment rellevants:

- `src/v2/pages/Landing.jsx`
- `src/v2/pages/Today.jsx`
- `src/v2/pages/Menu.jsx`
- `src/v2/components/Shell.jsx`
- `src/v2/state/ArrelContext.jsx`
- `src/v2/lib/actions.js`
- `src/v2/lib/types.js`
- `src/v2/lib/pace.js`
- `src/v2/lib/navigation.js`
- `src/v2/AppV2.jsx`
- `capacitor.config.json`
- `vite.config.js`
- `tests/e2e/helpers/arrel.js`

## 5. Flux actual esperat

### Entrada des de landing

La landing ja no hauria de forçar un botó tipus “Continuar avui”. Ha d’obrir una tria lliure:

1. L’usuari entra a `/inici`.
2. Prem `Triar per on començar`.
3. S’obre un panell amb opcions:
   - `Triar la prova d’avui`
   - `Ajustar focus`
   - `Triar ritme`
   - `Veure capacitats`
   - `Veure el mapa complet`
   - `Tornar enrere`
4. Si prem `Triar la prova d’avui`, ha de poder escollir:
   - Cos
   - Memòria
   - Calma
   - Vincles
   - Identitat
5. Quan escull una capacitat, entra a `/app` amb una prova d’aquella capacitat.

Validació manual feta:

- `/inici` obre correctament.
- `Triar per on començar` mostra opcions.
- `Triar la prova d’avui` mostra les cinc capacitats.
- Triar `Memòria` entra a `/app`.
- `/app` mostra una prova real de Memòria.
- Consola del navegador integrat: sense errors ni warnings.

### Navegació global

S’ha intentat que l’usuari pugui anar de qualsevol pantalla a qualsevol pantalla mitjançant:

- Header/Shell amb accessos a:
  - `Inici`
  - `Avui`
  - `Mapa`
- `/menu` com a mapa complet.
- Enllaços legals i de configuració accessibles.

Cal revisar si això és realment suficient en totes les pantalles, especialment:

- Landing
- Today
- Rest
- Diagnostic
- DiagnosticResult
- Transition
- Paywall / Initial period complete
- Menú i subpantalles
- Legal

## 6. Estat del model funcional

### Capacitats

Les capacitats actuals són:

- Cos
- Memòria
- Calma
- Vincles
- Identitat

Internament encara hi ha noms antics en constants:

- `AREAS.COGNITIVE` representa `Memòria`
- `AREAS.STRESS` representa `Calma`
- `AREAS.RELATIONAL` representa `Vincles`

Revisa si aquesta diferència interna pot confondre manteniment, tests o futures funcionalitats.

### Proves

Hi ha 30 proves:

- 5 capacitats
- 6 dies de prova per capacitat
- Dia 7 és descans/resum

Totes haurien de durar entre 3 i 10 minuts.

Fitxer:

```text
src/v2/lib/actions.js
```

Exemples actuals:

- Cos: caminar deu minuts, aixecar-se de la cadira cinc vegades, equilibri prop d’una paret.
- Memòria: aprendre una paraula, recordar què es va dinar fa tres dies, memoritzar set objectes.
- Calma: tres minuts de silenci, apagar notificacions deu minuts, no obrir el mòbil els primers deu minuts del matí.
- Vincles: trucar algú, saludar, enviar un missatge, conversar sense mòbil.
- Identitat: canviar una microdecisió, completar “Sóc algú que sempre…”, recuperar una activitat dels trenta en versió petita.

Demano que revisis:

- Si les proves són realment útils per al framing “frenar l’envelliment”.
- Si són segures per a usuaris de 55-75 anys.
- Si són prou concretes.
- Si hi ha massa càrrega emocional en Identitat.
- Si Memòria i Calma estan ben alineades amb les etiquetes noves.
- Si les proves són massa repetitives per sostenir més d’un cicle.

### Ritmes

L’app té tres ritmes:

- Lent: 1 prova al dia.
- Regular: cada 6 hores.
- Accelerat: sense espera.

Fitxer:

```text
src/v2/lib/pace.js
```

La lògica esperada:

- En ritme lent, després de guardar una prova, la següent s’obre demà.
- En ritme regular, la següent s’obre al cap de 6 hores.
- En ritme accelerat, la següent s’obre immediatament.
- Si l’usuari canvia a accelerat després d’haver tancat una prova bloquejada, el bloqueig s’ha de reavaluar i la prova següent s’ha de poder obrir.

Revisa si el ritme accelerat contradiu la idea d’hàbit i constància. Pot ser una opció útil per explorar, però també pot facilitar afartament de proves i reduir retenció.

## 7. Estat de tests

Verificacions fetes en aquest entorn:

```text
npm run lint       ✓
npm test -- --run  ✓ 46/46 tests
npm run ios:sync   ✓
```

Playwright E2E dins Codex falla per restricció de sandbox macOS/Chromium:

```text
MachPortRendezvousServer Permission denied
```

Això no és una fallada d’assertion de producte; és un bloqueig del browser headless dins l’entorn Codex. Tot i així, no assumeixis que l’E2E és verd després dels últims canvis: executa’l localment.

Comanda:

```bash
npm run test:e2e
```

Històric recent: abans d’aquesta última tongada, l’usuari va executar localment l’E2E i va obtenir:

```text
12 passed
```

Ara cal tornar-lo a executar perquè ha canviat el flux de landing i tria de prova.

## 8. Riscos concrets que has de contrastar

### Risc 1 — La tria de “prova d’avui” pot esborrar progrés

Ara `startStarterCycle(area)` accepta una capacitat i reinicia:

- `status`
- `entryMode`
- `primaryArea`
- `cycleNumber`
- `dayInCycle`
- `feedback`
- `diagnosisScores`
- `nextDayAvailableAt`

Això és correcte si l’usuari està començant de zero. Però pot ser perillós si un usuari amb progrés entra a `/inici`, prem `Triar la prova d’avui` i escull una capacitat: podria reiniciar el cicle i perdre feedback local.

Contrasta:

- Passa realment?
- Està protegit per UX?
- Caldria distingir entre “Començar una prova nova” i “Canviar la prova d’avui”?
- Caldria avisar abans de reiniciar?
- Caldria conservar feedback si només canvia la capacitat?

### Risc 2 — Massa llibertat pot tornar a confondre

Abans s’havia dit que un únic camí podia reduir confusió. Ara s’ha demanat llibertat per començar per diferents opcions. Revisa si el panell inicial és clar o si torna a generar indecisió.

Pregunta clau:

> Un usuari de 67 anys sap què ha de fer en menys de 5 segons?

### Risc 3 — “Frena el teu envelliment” és clar, però pot ser delicat

El missatge és molt potent. Revisa si queda prou ben sostingut amb disclaimers:

- No és una app mèdica.
- No promet rejovenir.
- Ajuda a practicar capacitats concretes.

Contrasta si aquest claim pot generar problemes d’App Store, confiança o expectativa falsa.

### Risc 4 — Navegació “a qualsevol pantalla” incompleta

S’ha afegit navegació global, però cal validar-la de veritat:

- Des de cada pantalla puc arribar a Inici, Avui i Mapa?
- Des del Mapa puc arribar a totes les pantalles útils?
- Hi ha pantalles sense sortida clara?
- El botó enrere porta on l’usuari espera?
- Hi ha rutes que depenen d’estat i poden redirigir de manera confusa?

### Risc 5 — Dependències o codi antic

El projecte encara té dependències com:

- `@supabase/supabase-js`
- `@stripe/stripe-js`
- `canvas-confetti`

La versió actual diu que no hi ha compte, núvol ni pagament. Revisa:

- Si aquestes dependències entren al bundle.
- Si generen confusió de manteniment.
- Si hi ha codi mort de versions anteriors.
- Si el chunk `vendor-db` buit és acceptable o indica configuració sobrant.

### Risc 6 — App existent a App Store

Arrel ja existeix a l’App Store, però segons l’usuari no consta que tingui usuaris registrats. Tot i això, si hi hagués usuaris existents, el canvi cap a una versió local-only i sense compte podria tenir risc.

Contrasta:

- Hi ha migració de dades antigues?
- Hi ha pantalles antigues d’auth, pagament o núvol encara accessibles?
- Hi ha subscripcions actives o cap referència a pagaments?
- El canvi de versió pot sorprendre usuaris existents?

## 9. Com executar i revisar

Instal·lació:

```bash
cd /Users/sergicastillo/Documents/Playground/arrel
npm install
```

Dev server:

```bash
npm run dev -- --host 127.0.0.1 --port 5186
```

Obre:

```text
http://127.0.0.1:5186/inici
```

Validacions recomanades:

```bash
npm run lint
npm test -- --run
npm run test:e2e
npm run build
npm run ios:sync
```

Flux manual mínim:

1. Obre `/inici`.
2. Prem `Triar per on començar`.
3. Prem `Triar la prova d’avui`.
4. Tria `Memòria`.
5. Confirma que `/app` mostra una prova de Memòria.
6. Marca `Hi és`, guarda lectura i comprova el bloqueig segons ritme.
7. Canvia el ritme a Regular i Accelerat des de `/menu/ritme`.
8. Revisa que accelerat deixa avançar.
9. Recorre `/menu` i comprova que no hi ha cul-de-sacs.
10. Revisa `/legal/privacitat` i `/legal/termes`.

Flux d’estat que has de provar:

- Usuari nou.
- Usuari amb cicle començat.
- Usuari amb prova guardada en ritme lent.
- Usuari que canvia de lent a accelerat.
- Usuari al dia 6 avançant al descans.
- Usuari al dia 7 tancant cicle.
- Usuari que torna a landing amb progrés ja creat.

## 10. Què espero de la teva anàlisi

Entrega una auditoria amb aquesta estructura:

1. Veredicte curt: l’app és clara o encara confon?
2. Problemes bloquejants, amb fitxer i línia si pots.
3. Problemes importants de UX/copy.
4. Problemes tècnics o d’estat.
5. Riscos App Store / privacitat / claims de salut.
6. Propostes de canvi prioritzades.
7. Tests que cal afegir o ajustar.
8. Si fas canvis, separa’ls per commits lògics.

No et limitis a validar el que ja hi ha. Contrasta:

- El producte diu “Frena el teu envelliment”: l’experiència ho fa creïble?
- Les proves són prou concretes i útils?
- La landing dona llibertat sense perdre l’usuari?
- La navegació fa impossible quedar atrapat?
- El codi protegeix el progrés local de l’usuari?
- El flux és segur per publicar o provar a iPhone?

## 11. Resum executiu

Arrel ha pivotat d’una app genèrica de benestar a una app de proves curtes per frenar l’envelliment quotidià treballant cinc capacitats. La base tècnica és força sòlida: React/Vite/Capacitor, persistència local/native, tests unitaris verds i build iOS sincronitzat. La gran pregunta ara ja no és només tècnica, sinó de producte:

> L’usuari entén què ha de fer, per què ho fa i què obté a canvi?

La revisió ha de ser especialment dura amb la landing, la tria lliure de prova d’avui, la protecció del progrés existent, el claim “Frena el teu envelliment” i la navegació entre pantalles.
