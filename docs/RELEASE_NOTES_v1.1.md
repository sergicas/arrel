# Release Notes v1.1.0

## Resum per a l'App Store (What's New)

Actualització global d'Arrel: un redisseny total per fer-la més propera, útil i privada.

- **Nova estructura de capacitats**: treballa cos, memòria, calma, vincles i propòsit amb proves de 3 a 10 minuts.
- **Coach Adaptatiu**: Arrel aprèn del teu ritme i t'ajuda a triar la millor versió de la prova cada dia basant-se en les teves sensacions.
- **Privacitat absoluta**: ara l'app funciona totalment al teu dispositiu, sense necessitat de compte ni connexió al núvol. Les teves dades no surten del telèfon.
- **Millores en la navegació**: disseny visual més càlid i accés directe al "Mapa" per veure tota la teva evolució.
- **Lectura Personal**: nou historial evolutiu que identifica els teus patrons d'èxit i et proposa el següent pas de forma intel·ligent.

## Canvis Tècnics

- Migració a arquitectura local-only (localStorage + Capacitor Preferences).
- Eliminació de dependències actives de backend (Supabase) i pagaments (Stripe) per a aquesta fase de validació.
- Implementació de motors de IA local (sense núvol):
    - **Daily Coach**: ajust d'intensitat diari.
    - **Evolution Engine**: connexió entre cicles.
    - **Risk Engine**: prevenció de fatiga acumulada.
    - **Tone Engine**: personalització del llenguatge.
    - **Pattern Recognition**: identificació de condicions òptimes d'èxit.
- Implementació de mecanisme de 'Clean Boot' per assegurar una transició neta des de la versió 1.0.
- Cobertura completa de tests unitaris i E2E (Playwright) per al flux nuclear.
