# ARQUITECTURA MÍNIMA D’ARREL

### Principi rector
> **Cada peça tècnica ha de correspondre a una decisió conceptual ja presa.**
> Si una peça no té equivalent al manifest → sobra.

***

## 1. Les 4 peces del sistema

### 🧠 1. Motor de decisió (Core)
És el cor d’Arrel.
- **Input**: Diagnòstic, Feedback diari, Historial de cicles.
- **Output**: Dia següent (Acció + Frase + Intensitat).
- **Lògica**: Regles clares (IF/THEN) basades en el Ritme (7 dies).
- **IA**: No inicialment. Només regles deterministes.

### 📋 2. Dades mínimes (Memòria)
Només 5 tipus de dades a la Base de Dades:
1. **Usuari** (Auth + ID)
2. **Diagnòstic inicial** (Punt de partida)
3. **Estat del Cicle** (Variables actives, Dia actual 1-7)
4. **Accions** (Biblioteca de contingut estàtic)
5. **Feedback diari** (Resultat + Nota breu)

❌ No hi ha: Likes, Puntuacions, Historials infinits, Mètriques decoratives.

### 📱 3. Interfície mínima (3 pantalles)
1. **Dashboard / Avui**: Acció del dia + Frase Arrel + Botó feedback.
2. **Feedback Modal**: ✔ / △ / ✖ + Una frase lliure.
3. **Silenci / Repòs**: Pantalla buida o pregunta reflexiva (Dia 7).

### 🧾 4. Llenguatge funcional
El text es genera des del motor. No és "contingut", és instrucció del sistema.

***

## 2. Flux Tècnic
1. **Auth**: Identificació (Supabase).
2. **Onboarding**: Diagnòstic únic -> Guarda a DB.
3. **Bucle Diari**:
   - `GET /state` -> Motor calcula Dia X.
   - Usuari veu acció.
   - Usuari envia `POST /feedback`.
   - Motor processa i avança estat.
4. **Cicle**: Al dia 7, reset de dia, incrementa comptador de cicles, re-evalua prioritats.

***

## 3. Stack Tecnològic
- **Frontend**: Vite + React (PWA).
- **Backend / DB**: Supabase (PostgreSQL).
- **Lògica**: Edge Functions o Client-side logic (inicialment).

> **Regla d'Or**: Si canvies el llenguatge, canvies el producte.
