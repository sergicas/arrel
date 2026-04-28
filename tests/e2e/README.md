# Arrel E2E

Smoke tests del flux central d’Arrel amb Playwright.

## Executar

```bash
npm run test:e2e:install
npm run test:e2e
```

La config aixeca Vite a `http://127.0.0.1:5301` i executa Chromium amb viewport mòbil `375x812`.

Nota: alguns sandboxes macOS poden bloquejar Chromium abans d'obrir-se amb
`MachPortRendezvousServer: Permission denied`. En aquest cas, executa la suite
des d'una terminal normal o des de CI.

## Decisions inicials

- Time travel amb `page.clock`, no backdoor de dates al `localStorage`.
- Chromium-only per velocitat.
- Mobile-first perquè l’experiència principal és d’app.

## Cobertura inicial

- `landing-to-today.spec.js`: Landing -> Comprovar avui -> prova starter dia 1.
- `daily-gating.spec.js`: lectura del dia -> bloqueig fins l’endemà -> avançar rellotge -> dia 2.
- `diagnostic-flow.spec.js`: diagnosi de 5 preguntes -> resultat -> prova personalitzada.
- `full-cycle.spec.js`: sis dies de prova -> dia 7 amb resum i CycleDots.
- `initial-period-complete.spec.js`: dos cicles guiats -> handoff sense preu -> cicle 3.
- `pace.spec.js`: canvi a ritme regular -> espera de sis hores -> dia següent.
- `reminder.spec.js`: fallback web del recordatori, persistència i apagat.
- `legal-accessible.spec.js`: privacitat i termes accessibles des de landing, menú i Sobre.
- `reset-from-about.spec.js`: confirmació de reset i estat local net.
