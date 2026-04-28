# Checklist primer build TestFlight

Objectiu: pujar el primer build d'Arrel a TestFlight sense perdre temps amb errors típics de signing, assets, permisos o App Store Connect.

## Estat actual del projecte

- App name: `Arrel`
- Bundle identifier: `eu.arrel.app`
- Version/build: `1.0 (1)`
- iOS deployment target: `15.0`
- Signing: `Automatic`
- Plugins nadius sincronitzats: `@capacitor/local-notifications`, `@capacitor/preferences`
- App icon iOS: `1024x1024`, sense alpha
- Splash/background nadiu: `#EDF9FB`

## Abans d'obrir Xcode

- Corre `npm run test:e2e` en una terminal normal i guarda el resultat.
- Substitueix el placeholder del canal de feedback a `docs/beta-testers.md`.
- Decideix la llista inicial de testers iPhone.
- Confirma que App Store Connect ja té l'app creada amb bundle id `eu.arrel.app`.
- Confirma que Apple Developer Program està aprovat i que tens accés al team correcte.
- Corre:

```bash
npm run ios:sync
npm run ios:open
```

## Xcode: signing i target

- Selecciona target `App`.
- A `Signing & Capabilities`, tria el teu Apple Developer Team.
- Mantén `Automatically manage signing` activat.
- Confirma `Bundle Identifier`: `eu.arrel.app`.
- Confirma `Version`: `1.0`.
- Confirma `Build`: `1`.
- Si has de pujar un segon intent amb la mateixa versió, incrementa només `Build`: `2`, `3`, etc.

## Xcode: capabilities

- No activis `Push Notifications` per a aquesta beta si només uses notificacions locals.
- No activis `Background Modes` per a recordatoris locals diaris.
- No afegeixis entitlements si Xcode no els demana.
- Verifica que el paquet Swift inclou:
  - `CapacitorLocalNotifications`
  - `CapacitorPreferences`

## Info.plist

- Confirma `CFBundleDisplayName`: `Arrel`.
- Confirma `UILaunchStoryboardName`: `LaunchScreen`.
- No cal cap usage description mèdica, càmera, fotos, localització o contactes: Arrel no demana aquests permisos.
- Per notificacions locals, el punt crític no és un text d'Info.plist sinó el permission flow real al dispositiu. Verifica'l manualment.

## Assets

- App icon: ha de ser `1024x1024` i sense transparència.
- Splash: ha de carregar amb fons clar, no negre.
- Primer llançament: no ha d'aparèixer cap flash negre entre splash i app.
- Prova també dark mode d'iOS: l'app ha de continuar llegible.

## Archive i upload

- Selecciona un device genèric o real, no un simulator.
- Fes `Product > Archive`.
- A Organizer, valida que l'archive sigui `Arrel 1.0 (1)`.
- Distribueix amb `Distribute App > App Store Connect > Upload`.
- Mantén activada la gestió automàtica de signing durant l'upload.
- Si Apple rebutja l'upload per build duplicat, incrementa `CURRENT_PROJECT_VERSION` / Build i torna a arxivar.

## App Store Connect

- URLs:
  - Privacy Policy URL: `https://arrel.eu/legal/privacitat`
  - Support URL: `https://arrel.eu/legal/termes` o el canal públic de feedback quan estigui definit.
- Privacy Nutrition Labels:
  - Si no actives analytics/crash reporting propis: `Data Not Collected`.
  - Si actives Sentry o crash reporting: revisa si has de declarar `Diagnostics > Crash Data`, normalment `Not Linked to You`.
- App Category: `Health & Fitness` o `Lifestyle` segons posicionament final.
- Age Rating: sense contingut sensible, mèdic o social obert.
- What to Test:

```text
Prova el flux principal d'Arrel: primera acció, diagnosi, check-in diari, recordatori local i resum del dia 7. Si l'app perd el progrés sense que l'hagis esborrat des de Sobre Arrel, marca-ho com a bug crític.
```

## Timing real del primer dia

- Després de `Distribute App > Upload`, el build pot trigar 10-30 min a aparèixer a TestFlight. És processing normal d'Apple.
- Els testers interns poden instal·lar el build sense Beta App Review.
- El primer build per a testers externs passa per Beta App Review, sovint unes 24 h.
- Estratègia recomanada: primer valida amb 1-2 testers interns, puja un `Build 2` si cal, i després convida testers externs.

## Primer test físic abans d'enviar invitacions

- Instal·la el build des de TestFlight en un iPhone real.
- Obre Arrel des de zero i comença sense compte.
- Tanca el dia amb `Fet` i confirma que el dia següent queda bloquejat.
- Tanca completament l'app i torna-la a obrir: ha de conservar l'estat.
- Activa el recordatori i accepta el permís de notificacions.
- Programa'l a 2-3 minuts vista i espera que arribi.
- Apaga el recordatori i comprova que l'estat queda desat.
- Ves a `Sobre Arrel > Esborrar les dades locals` i confirma que torna a l'estat inicial.

## Errors típics i resposta ràpida

| Error | Causa habitual | Resposta |
|---|---|---|
| `No signing certificate` | Team no seleccionat o Apple Developer pendent | Tria Team a Xcode o espera aprovació Apple |
| `Bundle identifier unavailable` | `eu.arrel.app` no creat o associat a un altre compte | Crea/app registra l'ID a Apple Developer |
| `Invalid App Icon` | Icona amb alpha o mida incorrecta | Usa l'asset iOS 1024 sense alpha |
| Build duplicat | Ja has pujat `1.0 (1)` | Incrementa Build a `2` |
| Recordatori no arriba | Prova en navegador, permís denegat o hora mal configurada | Reprova via TestFlight, revisa permís i hora |
| Progrés perdut | Fallada de persistència nativa | Bug crític; captura build, iOS i passos previs |

## Després del primer build

- Envia la guia de beta testers amb el canal de feedback definit.
- Convida primer 2-3 testers de confiança abans dels 10-30.
- Espera 24 h de senyal abans d'ampliar el grup.
- Registra cada feedback amb: build, iOS, pantalla, acció esperada, acció observada, captura/video.
