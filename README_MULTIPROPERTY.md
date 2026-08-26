# 2M Controller · MultiProperty

2M Controller è la piattaforma operativa multiproperty di 2EMME. Masotto Terrace View è uno dei cinque immobili gestiti e non è il namespace del sistema.

## Architettura canonica

Le pagine operative condividono ora un unico runtime:

- `2m_app.js`: selezione immobile, navigazione, rendering dei moduli e operazioni CRUD;
- `2m_app.css`: sistema grafico responsive unico;
- `netlify/functions/2m-master.mts`: anagrafica, catasto/APE, utenze, contatti, autorizzazioni, assicurazioni e condominio;
- `netlify/functions/2m-controller.mts`: asset, manutenzioni, preset, prenotazioni, finanze, compliance operativa, eventi 3MATRIX, bollette e rate condominiali;
- `netlify/functions/airtable-finance.mts`: pagamenti ospiti e registro fatture/ricevute;
- `compliance.html` e funzioni 3MATRIX Compliance: motore dedicato di scansione normativa.

## Fonte dati canonica

La fonte operativa è Airtable `2EMME Asset Master 2026` (`appVTOkf1uejZrWGZ`). Le pagine attive non caricano `masotto_db.js`, `MASOTTO_DB`, `MASOTTO_MULTIPROPERTY_DB`, `ms_core.js` o chiavi `localStorage` con prefisso `masotto_*`.

I file `2mdb_v*.json` e `masotto_*` possono restare nel repository esclusivamente come archivio tecnico/storico e non sono sorgenti della UI attiva.

## Moduli

Overview, Anagrafica, Asset e Dotazioni, Prenotazioni, Manutenzione e Preset, Audit 3MATRIX, Finanze, Fatture e Ricevute, Sicurezza e Compliance Scan.

## Regole runtime

La selezione immobile usa esclusivamente `2m_active_property_code`. Non esiste fallback silenzioso a database locali. Gli errori Airtable sono mostrati nella UI. Le scritture di asset, manutenzioni ed eventi avvengono server-side; pagamenti e documenti usano il bridge finance. Le viste finanziarie evitano di sommare automaticamente fonti eterogenee potenzialmente sovrapposte.

## Immobili canonici

- `T29_9` — The NoLo Heritage
- `B32_718` — The NoLo Nest
- `B32_719` — The NoLo Suite
- `CH1_715` — The NoLo Studio
- `MASOTTO4_39` — Masotto Terrace View
