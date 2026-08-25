# 2M MultiProperty

Questa è la piattaforma multiproperty 2M. Non è il progetto Masotto.

## Regola architetturale canonica

- **2M MultiProperty** è il nome funzionale della piattaforma attiva.
- **Masotto Terrace View** è uno dei singoli immobili gestiti dalla piattaforma, al pari di Heritage, Nest, Suite e Studio.
- Il codice, la UI e la documentazione attiva non devono usare "Masotto" come namespace generale della piattaforma.
- I file storici con prefisso `masotto_` sono da considerare **legacy del prototipo single-property** e non fonte canonica della nuova architettura.
- Le nuove pagine non devono dipendere da `masotto_db.js`, `masotto_database.js`, `masotto_complete_database.json` o dalle vecchie chiavi `masotto_*` di localStorage.

## Fonte dati canonica

La fonte operativa della piattaforma è Airtable `2EMME Asset Master 2026` e le sue tabelle collegate. Snapshot JSON e file legacy restano solo come archivio/scambio, non come sorgente primaria della UI.

## Alloggi

- `T29_9` — The NoLo Heritage
- `B32_718` — The NoLo Nest
- `B32_719` — The NoLo Suite
- `CH1_715` — The NoLo Studio
- `MASOTTO4_39` — Masotto Terrace View

`MASOTTO4_39` è quindi soltanto l'identificatore di uno dei cinque immobili, non il nome del sistema.

## Direzione di migrazione

Le pagine attive vengono migrate verso un core `2m_*` multiproperty e verso endpoint server-side che leggono Airtable. Il vecchio adattatore basato su `window.MASOTTO_MULTIPROPERTY_DB`, `ms_core.js` e chiavi localStorage `masotto_*` è una compatibilità transitoria da eliminare, non l'architettura finale.
