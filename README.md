# 2M Controller · MultiProperty

Piattaforma operativa multiproperty 2EMME per controllo immobiliare, asset, manutenzione, prenotazioni, finanze, documenti, sicurezza e compliance.

## Architettura attiva

La UI usa un runtime condiviso `2m_app.js` + `2m_app.css`. I dati operativi provengono da Airtable `2EMME Asset Master 2026` tramite funzioni Netlify server-side.

Funzioni principali:

- `/api/2m-master` — anagrafica immobile, catasto/APE, utenze, contatti, autorizzazioni, assicurazioni e condominio;
- `/api/2m-controller` — asset, manutenzioni, preset, prenotazioni, finanze, compliance operativa, eventi guasto/danno, bollette e rate;
- `/api/airtable-finance` — pagamenti ospiti e registro fatture/ricevute;
- motore 3MATRIX Compliance dedicato per la scansione normativa.

## Regola canonica

Masotto Terrace View è uno dei cinque immobili gestiti, non il namespace della piattaforma. Le pagine operative non caricano più `masotto_db.js`, `MASOTTO_DB`, `MASOTTO_MULTIPROPERTY_DB`, `ms_core.js` o chiavi `masotto_*` di localStorage.

I file legacy possono restare nel repository esclusivamente come archivio tecnico e non sono fonte dati della UI attiva.

## Moduli

Overview · Anagrafica · Asset · Prenotazioni · Manutenzione · Audit 3MATRIX · Finanze · Fatture e Ricevute · Sicurezza · Compliance Scan.

Per il dettaglio architetturale vedi `README_MULTIPROPERTY.md`.
