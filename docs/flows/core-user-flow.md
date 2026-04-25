# Arrel — Core User Flow

Aquest document defineix el flux nuclear d'usuaris (AR-003) i estableix quines rutes són essencials i quines queden fora del camí principal. Es basa en la definició del producte establerta a `docs/strategy/product-positioning.md`.

## 1. Problema Actual (Resum)
1. **Dispersió de pantalles**: L'usuari entra a l'aplicació i troba masses vies (Dashboard, Protocol, Physical, Mental, etc.) sense un camí clar de decisió.
2. **Desconnexió del diagnòstic**: El pas de la Landing al Diagnòstic i als Resultats no desemboca directament en una acció clara pel dia d'avui, confonent l'usuari amb dades generals.
3. **Massa opcions**: Rutes com `/physical`, `/mental`, `/emotional`, etc., actuen com mòduls oberts, el que contradiu el principi "Criteri clar, sense sorolls" i "Una acció al dia".
4. **Falta de focus en el Check-in**: L'acció diària no culmina de manera clara i determinant en un check-in curt, deixant l'usuari sense un sentit de tancament.

## 2. Rutes (Core, Secundàries i Prescindibles)

### 2.a Rutes Core (El Flux Nuclear)
Aquestes són les rutes estrictament necessàries per entregar la promesa del producte ("Recupera el terreny").

*   `/` (Landing): Entrada.
*   `/diagnosis`: Captura d'estat (on l'usuari perd terreny).
*   `/resultats`: Devolució i impacte (la teva àrea més exposada).
*   `/dia/:day`: Pantalla "Avui" (Substitueix Dashboard i Protocol; mostra exclusivament l'acció del dia).
*   *(Component/Modal de Check-in integrat o ruta curta)*: Per confirmar l'acció.

### 2.b Rutes Secundàries
Rutes de suport que l'usuari pot necessitar però no han de distreure del flux principal.

*   `/login`, `/auth/callback`, `/reset-password`: Autenticació.
*   `/profile`: Gestió de compte i configuració.
*   `/historic`: Visibilitat retrospectiva del progrés (sense inflar).
*   `/privacitat`, `/termes`, `/cookies`, `/contacte`: Legal.
*   `/com-funciona`, `/ciencia`, `/manifest`, `/recursos`: Pàgines informatives públiques.
*   `/payment/success`, `/payment/cancel`: Fluxos de pagament.

### 2.c Rutes Prescindibles (A eliminar de la IA principal)
Aquestes rutes trenquen la promesa "Una acció al dia" o mostren l'aplicació com un catàleg. S'han de desvincular de la navegació principal (AR-032).

*   `/dashboard` (Serà reemplaçada per `/dia/:day` com a pantalla "Avui", AR-013).
*   `/protocol` (Concepte absorbit per `/dia/:day`).
*   `/physical`
*   `/mental`
*   `/emotional`
*   `/social`
*   `/intellectual`

## 3. Flux Nuclear (Step-by-Step)

El camí perfecte i esperat per a qualsevol usuari nou o recurrent diari.

1.  **Landing (`/`)**
    *   **Propòsit**: Atraure l'usuari i convèncer-lo de mesurar el seu desgast.
    *   **CTA Principal**: "Comença pel diagnòstic. 3 minuts." (Porta a `/diagnosis`).
2.  **Diagnosi (`/diagnosis`)**
    *   **Propòsit**: Qüestionari enfocat a les 5 àrees de desgast (AR-008).
    *   **CTA Principal**: "Veure resultats" (Porta a `/resultats`).
3.  **Resultat (`/resultats`)**
    *   **Propòsit**: Mostrar l'àrea més exposada de l'usuari. Informar, no alarmar.
    *   **CTA Principal**: "Veure el meu pas d'avui" (Porta a `/dia/1` o `/dia/current`).
4.  **Avui (`/dia/:day`)**
    *   **Propòsit**: L'única cosa que l'usuari ha de fer. Un context breu i l'acció específica.
    *   **CTA Principal**: "Marcar com a fet / Check-in" (Obre la interacció de check-in).
5.  **Check-in**
    *   **Propòsit**: Tancar el cicle diari.
    *   **CTA Principal**: "Guardar" (Retorna un estat de "dia completat" o porta a un resum breu).

## 4. Fluxos Alternatius

*   **Usuari Recurrent**: `/login` -> `/dia/:day` (Salta Landing i Diagnosi si ja ho ha fet).
*   **Paywall/Trial Expirat**: L'usuari entra a `/dia/:day` però és interceptat per `<Paywall />` (O per la nova lògica d'AR-027). La CTA de pagament redirigeix a Stripe Checkout i torna a `/dia/:day`.
*   **Guest Transition**: Un usuari no registrat fa Diagnosi -> Resultat -> Avui (Dia 1). Abans de veure el Dia 2, ha de passar per `/login` o registre per persistir dades (AR-021).

## 5. Punts de Fricció a resoldre

1.  **Convivència de Dashboard i `/dia/:day`**: Actualment existeixen ambdós conceptes. El pas més crític (AR-013) és convergir-ho en una única pantalla central.
2.  **Sincronització Guest-to-User**: El pas del resultat local al resultat guardat al compte en el moment de fer sign-up (AR-022) pot fer perdre dades si no es dissenya bé.
3.  **Menú de Navegació**: Actualment el menú inclou accessos ràpids als mòduls (Physical, Mental, etc.). Això convida a l'exploració, cosa que Arrel no vol.

## 6. Recomanacions i Decisió Final (In vs. Out)

**Què queda DINS de la IA Principal (Arquitectura d'Informació):**
*   **Avui** (Ruta central i destí de login per defecte).
*   **Històric** (Secundari).
*   **Perfil** (Configuració i compte).

**Què queda FORA de la IA Principal:**
*   Les subrutes de les àrees (`/physical`, `/mental`, etc.). Deixaran d'existir com a destins navegables lliurement. El contingut d'aquestes àrees s'alimentarà exclusivament a través de `/dia/:day` segons el que dicti el motor.
*   El concepte "Dashboard" amb mètriques agregades.

*(Aquest document serveix com a guia per procedir amb AR-013, AR-032 i successius de l'Epica 4 i 9).*
