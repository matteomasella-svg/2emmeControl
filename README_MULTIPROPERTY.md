# 2EMME Multiproperty Adapter

Questa versione mantiene la grafica e le logiche operative della piattaforma Masotto originale, ma sostituisce il database single-property con un adattatore multiproprieta generato da `2mdb_v22.json`.

## Come funziona

- `masotto_db.js` espone `window.MASOTTO_MULTIPROPERTY_DB` con i 5 alloggi canonici.
- `ms_core.js` seleziona l'alloggio attivo e popola le vecchie chiavi localStorage (`masotto_booking_db`, `masotto_maint_db`, `masotto_finance_db`, ecc.).
- Le pagine continuano a leggere le stesse strutture dati della versione single-property.
- Il selettore nella sidebar cambia alloggio e ricarica la pagina con i dati coerenti.
- Le modifiche locali vengono mantenute separatamente per ogni alloggio tramite chiavi `2m_property_state_*`.
- Il selettore include `Tutti alloggi 2EMME`, vista aggregata di Heritage, Nest, Suite e Studio; Masotto Terrace View e' escluso.
- Il pulsante `Salva Modifiche` nella sidebar consolida le modifiche CRUD locali per l'alloggio attivo.

## Alloggi collegati

- `T29_9` - The NoLo Heritage
- `B32_718` - The NoLo Nest
- `B32_719` - The NoLo Suite
- `CH1_715` - The NoLo Studio
- `MASOTTO4_39` - Masotto Terrace View

## Fonte dati

Fonte strutturata: `2mdb_v22.json`.

Il file include anagrafica, catasto, asset, utenze, bollette, prenotazioni, manutenzioni, assicurazioni e KPI di controllo dove disponibili.

Fonte asset / audit 3matrix: `asset_database_final-copia.json`, importato in `asset_3matrix_final`.

## Profili fiscali operativi

- `MASOTTO4_39` - Masotto Terrace View: LT non imprenditoriale, cedolare secca, niente IVA.
- `T29_9`, `B32_718`, `B32_719`, `CH1_715`: gestione sotto societa in regime forfettario, niente IVA, coefficiente redditivita 40%, imposta 5% sul 40% del fatturato imponibile.

## Nota saldo Finanze

La vista 2026 non riporta piu' automaticamente il saldo 2025 come fondo iniziale, per evitare doppio conteggio quando il saldo 2025 e' gia' considerato saldo attuale.
