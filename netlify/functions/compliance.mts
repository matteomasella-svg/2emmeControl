const TABLES = {
  properties: 'tblrxIPFH5IZqYcJ5',
  authorizations: 'tblMp2ocVRYSEN2nP',
  insurance: 'tblvjkHtM1vzNl0O1',
  catasto: 'tblgtIe3pACkUWyqE',
  deadlines: 'tblSn6HMYj2POQUdD',
  rules: 'tbl3TXEn8yJhqAZdG',
  bookings: 'tblFfwIgXrdD5Vj3I',
  documents: 'tblyB4ktsfqvtv3Tj',
  assets: 'tbltJpS6NSy1CBjZt',
  maintenance: 'tblI3SVfV9QXJm6rK',
  activity: 'tblegISQdMIxgKBlE',
  updates: 'tblTeuRX01d5XtuMO',
  scans: 'tblXAcK5dOqqlh7OB'
};

const F = {
  properties: { name:'fldg40Lc7ZBCylxCR', regime:'fldu9gdftgQ8Kti2J', access:'fldwzOW9fZi5PqmEJ', capacity:'fldQENl4NArZhN6jF' },
  auth: { property:'fldHMuDJrsjT58fNj', regime:'fldeJjagcOqkmK077', cin:'fldb7JpLy3n8lZwBT', cir:'fldH8u905xcBFjgSB', practice:'fldLu91GsOqpkZnG4', status:'fldIaFG16tJ40cU7P' },
  insurance: { property:'fldVREaQSvZJ0norq', expiry:'fldmO85fSR54VEKgU', status:'fldEjhr4KnvHRUiWj', product:'fldWzt3eTSxbClJqO' },
  catasto: { property:'fldAFPWsTJePaBXQe', status:'fldbdTItp1vHTRqSn', useful:'fld6NGILbCp7D8lLK', expiry:'fldCcZyw3cdLGDmzX' },
  deadlines: { property:'fldshVvIvnOAYAmBO', id:'fldx229j0wNUqQ5p8', area:'fldOnRmrvI1xDCHRo', description:'fldtJmHn8qs6RGPYr', due:'fldRbiDQ1ObnCMtEV', state:'fldxMp6W0sEeNjjGi', notes:'fld5fA9wDJlf3HgXB', periodicity:'fld7g66ccISrm2Jl7', last:'fld1tCnoLwR4b2K81' },
  rules: { id:'fldWF87NxMsNrYZox', title:'fld3ZF3waeTaDGJSt', area:'fldX9ArrC0cEusu8r', jurisdiction:'fld9oY9KFgQubWhfk', source:'fld6QXQrqe9trbw2M', ref:'fldOwz7EHMz3BQ13b', url:'fldvhUZf3PYPqYIRj', scope:'fldDyKpnnJtqjcKi3', obligation:'fldqGXGWmAhUeMmHI', evidence:'fldvOGhUJSHTPGsew', periodicity:'fldD0CJofyGPR2siT', severity:'fldOPn0TCVoe0zck3', blockPublish:'fldPJkeKMjW5SOklx', blockBooking:'fldPizl970yMSIde7', blockCheckin:'fldqCTjBEo14ynOSg', action:'fldkwUh10e7omFRtF', evaluator:'fldEwFIedsfGEHFjG', config:'fld63ecu77PEsary9', automatic:'fldp5yMUpDZ5W0GuJ', verified:'fldpfWHQZGmOUYO6t', state:'fldlL1Cezt5T4LSf5', version:'fldiImTtwhvVmQ4l1', notes:'fldMNrpiR5oaASn77' },
  bookings: { property:'fldcxQLmaLlBqeUeC', nights:'fldjteZc35DuponKL', checkin:'fldd75nR8bXawL11w', checkout:'fldEPNpvtlkdUIWN8', cityTax:'fld9gmxIIL6kyFaNo', state:'fldTfQVks78Wi0Ywh', notes:'fldPMNQwy3Q4ACtys' },
  documents: { property:'fldi7EJHDTkjPAkWF', title:'fld2kMpEc6GCKSjbv', type:'fldHRmaj3DfQ8nxHp', date:'fldr34Q1gZgSFVMwS', state:'fld1XGlQqCTOkPEFY', notes:'fldwajp2hSdvhnBtJ' },
  assets: { property:'fldabO3Bv053g3tsx', name:'fld0VfFiTPAWPzpaA', category:'fldHZYJqNEV1rr6fv', state:'fldG02pwwftyq3V7L', notes:'fld6xx18IXG2trtq0' },
  maintenance: { property:'fld5TJnrOfQDspfNl', date:'fld5rGmjd7WOdzflX', description:'fldnSMLoaCpGVfpM1', state:'fldLoC1j6pcydYYWF', next:'fldt40BBB2wyqDh1d', reference:'fldCWGDngB5xR196S', notes:'fldX3l1Y6R61ffcLO' },
  activity: { property:'fldH73tljJsHSKz74', origin:'fldsDb6qRQtRGFtjr', entity:'fldbmvehdo912l1fe', action:'fldhzXkcOORTFYkzx', outcome:'fldmKsNj391KBMQvI', timestamp:'fldMHAhazvl77UXp2', detail:'fld052Q00k2lU6HkU', reference:'fldt5eMXHWveG4ErG' },
  updates: { status:'fldRcstVQS0OqpyzK', detected:'fldndZnu9rXwDLTrg', title:'flduBTPH19HXEj8kb', impact:'fldhpr9iexb6kaXso' },
  scans: { id:'fldUdGCDVwGSvw85C', date:'fldvSaQHv2HszL8AS', property:'fldQtBtwLcIpdOAtU', origin:'fld01MLnzsUR44dlo', state:'fld0Oi7QL150TCIJh', score:'fldLFSi4SG8JiES2I', block:'fldGbxkyT6bvBHdgk', critical:'fldSGcSuu0Cf6tdD1', warning:'fldNraTu4tiyAkQnO', review:'fldJkIErEhoXeW60y', version:'fldbHmNKDF2QomKSw', detail:'fldDO5wg7nU2k2mGG', actions:'fldNkJWCPjIKWuAXx', notes:'fldmfoGgekjoi26pE' }
};

const LEGACY_PROPERTY_NAMES: Record<string,string> = {
  MASOTTO4_39: 'Masotto Terrace View',
  T29_9: 'The NoLo Heritage',
  B32_718: 'The NoLo Nest',
  B32_719: 'The NoLo Suite',
  CH1_715: 'The NoLo Studio'
};

function json(status:number, body:unknown){
  return new Response(JSON.stringify(body), {status, headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}});
}
function value(v:any){ return v && typeof v === 'object' && !Array.isArray(v) && 'name' in v ? v.name : (v ?? null); }
function values(v:any){ return Array.isArray(v) ? v.map(value).filter(Boolean) : (v ? [value(v)] : []); }
function normalize(v:any){ return String(value(v) || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' '); }
function linkedTo(fields:any, fieldId:string, recordId:string){ const links=fields?.[fieldId]; return Array.isArray(links) && links.includes(recordId); }
function isActive(v:any){ const s=normalize(v); return s.includes('attiv') || s === 'corrente' || s.includes('valid'); }
function dateOk(v:any){ if(!v) return false; const t=Date.parse(String(v)); return Number.isFinite(t) && t >= new Date(new Date().toISOString().slice(0,10)).getTime(); }
function fieldText(rows:any[], ids:string[]){ return rows.map(r => ids.map(id => value(r.fields?.[id]) || '').join(' ')).join(' ').toLowerCase(); }

function ruleObject(r:any){ const f=r.fields||{}; return {
  record_id:r.id, id:f[F.rules.id]||r.id, title:f[F.rules.title]||'', area:value(f[F.rules.area])||'', jurisdiction:value(f[F.rules.jurisdiction])||'', source:f[F.rules.source]||'', reference:f[F.rules.ref]||'', source_url:f[F.rules.url]||'', scope:values(f[F.rules.scope]), obligation:f[F.rules.obligation]||'', evidence_required:f[F.rules.evidence]||'', periodicity:f[F.rules.periodicity]||'', severity:value(f[F.rules.severity])||'INFO', block_publish:Boolean(f[F.rules.blockPublish]), block_booking:Boolean(f[F.rules.blockBooking]), block_checkin:Boolean(f[F.rules.blockCheckin]), corrective_action:f[F.rules.action]||'', evaluator:f[F.rules.evaluator]||'', config:f[F.rules.config]||'', automatic:Boolean(f[F.rules.automatic]), verified:f[F.rules.verified]||'', state:value(f[F.rules.state])||'', version:f[F.rules.version]||'', notes:f[F.rules.notes]||''
}; }

function scopesFor(regime:string){ const s=normalize(regime); const out=['Tutti']; if(s.includes('cv')||s.includes('cav')) out.push('CAV / CV imprenditoriale','Struttura turistico-ricettiva'); if(s.includes('non imprenditoriale') && (s.includes('cv')||s.includes('cav'))) out.push('CAV non imprenditoriale'); if(s.includes('lt') && s.includes('non imprenditoriale')) out.push('LT non imprenditoriale'); if(s.includes('lt') && s.includes('imprenditoriale') && !s.includes('non imprenditoriale')) out.push('LT imprenditoriale'); if(s.includes('lt')) out.push('Locazione breve'); return new Set(out); }
function applies(rule:any, regime:string){ if(!rule.scope?.length || rule.scope.includes('Tutti')) return true; const scopes=scopesFor(regime); return rule.scope.some((x:string)=>scopes.has(x)); }
function result(rule:any, status:string, observed:string, rationale:string){ return {...rule, result:status, observed, rationale}; }
function fail(rule:any, observed:string, rationale:string){ const sev=String(rule.severity||'').toUpperCase(); const status=sev==='BLOCK'?'BLOCKED':sev==='CRITICAL'?'NON_COMPLIANT':sev==='WARNING'?'WARNING':'REVIEW'; return result(rule,status,observed,rationale); }
function review(rule:any, observed:string, rationale:string){ return result(rule,'REVIEW',observed,rationale); }
function pass(rule:any, observed:string, rationale='Evidenza coerente con la regola'){ return result(rule,'COMPLIANT',observed,rationale); }

async function evaluateProperty(data:any){
  const {propertyRecord, property, auth, insurance, catasto, deadlines, bookings, documents, assets, maintenance, activity, rules}=data;
  const regime=property.regime||'';
  const activeAuth=auth.find((r:any)=>isActive(r.fields?.[F.auth.status]));
  const activeIns=insurance.filter((r:any)=>isActive(r.fields?.[F.insurance.status]));
  const currentApe=catasto.find((r:any)=>normalize(r.fields?.[F.catasto.status])==='corrente') || catasto[0];
  const evidenceCorpus=[
    fieldText(deadlines,[F.deadlines.id,F.deadlines.area,F.deadlines.description,F.deadlines.notes,F.deadlines.periodicity]),
    fieldText(documents,[F.documents.title,F.documents.type,F.documents.state,F.documents.notes]),
    fieldText(assets,[F.assets.name,F.assets.category,F.assets.state,F.assets.notes]),
    fieldText(maintenance,[F.maintenance.description,F.maintenance.state,F.maintenance.reference,F.maintenance.notes]),
    fieldText(activity,[F.activity.origin,F.activity.entity,F.activity.action,F.activity.outcome,F.activity.detail,F.activity.reference])
  ].join(' ');
  const outcomes:any[]=[];
  for(const rule of rules.filter((x:any)=>applies(x,regime))){
    const key=rule.evaluator;
    if(key==='authorization-regime'){
      if(!activeAuth) outcomes.push(fail(rule,'Nessuna autorizzazione attiva','Manca un titolo amministrativo attivo nel master.'));
      else { const ar=String(value(activeAuth.fields?.[F.auth.regime])||''); const practice=String(activeAuth.fields?.[F.auth.practice]||''); const coherent=normalize(ar).includes(normalize(regime).replace('cv','').trim()) || normalize(regime).includes(normalize(ar).replace('cav','cv')); outcomes.push(practice && coherent ? pass(rule,`${ar}; pratica ${practice}`) : fail(rule,`${ar}; pratica ${practice||'mancante'}`,'Regime o pratica SUAP non coerenti/completi.')); }
    } else if(key==='cin-present'){
      const cin=activeAuth?.fields?.[F.auth.cin]; outcomes.push(cin?pass(rule,String(cin)):fail(rule,'CIN assente','Il record Autorizzazioni attivo non contiene il CIN.'));
    } else if(key==='cir-present'){
      const cir=activeAuth?.fields?.[F.auth.cir]; outcomes.push(cir?pass(rule,String(cir)):fail(rule,'CIR assente','Il record Autorizzazioni attivo non contiene il CIR.'));
    } else if(key==='cav-insurance-active'){
      const valid=activeIns.find((r:any)=>dateOk(r.fields?.[F.insurance.expiry])); outcomes.push(valid?pass(rule,`${valid.fields?.[F.insurance.product]||'Polizza'} fino al ${valid.fields?.[F.insurance.expiry]}`):fail(rule,'Nessuna polizza attiva con scadenza futura','Non risulta una RC CAV valida nel master.'));
    } else if(key==='ape-valid'){
      const exp=currentApe?.fields?.[F.catasto.expiry]; outcomes.push(exp && dateOk(exp)?pass(rule,`APE valido fino al ${exp}`):fail(rule,exp?`APE scaduto: ${exp}`:'APE/scadenza non documentata','La validità APE non è dimostrata dal master.'));
    } else if(key==='lockbox-placement-review'){
      const a=String(property.access||'').toLowerCase(); if(!a.includes('lockbox') && !a.includes('keylock')) outcomes.push(pass(rule,'Nessuna lockbox indicata nell’accesso')); else if(/cancello|recinzione|inferriata|strada|esterno/.test(a) && !/nessun keylock su strada|nessuna lockbox su strada/.test(a)) outcomes.push(review(rule,property.access,'La descrizione suggerisce una collocazione che richiede verifica visiva rispetto allo spazio pubblico.')); else outcomes.push(pass(rule,property.access,'Descrizione senza elemento vietato evidente; mantenere prova fotografica.'));
    } else if(key==='lease-duration-rli-review'){
      const long=bookings.filter((r:any)=>Number(r.fields?.[F.bookings.nights]||0)>30); outcomes.push(long.length?review(rule,`${long.length} prenotazione/i oltre 30 notti`,'Richiede verifica del contratto e dell’eventuale registrazione RLI.'):pass(rule,'Nessuna prenotazione oltre 30 notti nel dataset corrente'));
    } else if(key==='lt-capacity-gbis'){
      const sqm=Number(currentApe?.fields?.[F.catasto.useful]||0); const cap=Number(property.capacity||0); if(!sqm||!cap) outcomes.push(review(rule,`Superficie utile ${sqm||'mancante'}; capienza ${cap||'mancante'}`,'Dati insufficienti per il calcolo automatico.')); else { const maxBeds=sqm<=48?Math.floor((sqm*1.05)/8):null; outcomes.push(maxBeds!==null && cap<=maxBeds?pass(rule,`${sqm} m² utili; capienza ${cap}; limite calcolato ${maxBeds}`):review(rule,`${sqm} m² utili; capienza ${cap}`,'La fascia progressiva richiede verifica puntuale dell’Allegato G-bis.')); }
    } else if(key==='lt-detectors'){
      const has=/monossido|\bco\b|rilevatore gas|rilevatori gas|detector/.test(evidenceCorpus); outcomes.push(has?pass(rule,'Evidenza di rilevatori trovata nel master'):review(rule,'Nessuna evidenza strutturata di rilevatori trovata','Assenza di evidenza non equivale a assenza fisica: serve verifica/registrazione.'));
    } else if(key==='lt-extinguisher'){
      const has=/estintor/.test(evidenceCorpus); outcomes.push(has?pass(rule,'Evidenza estintore/manutenzione trovata nel master'):review(rule,'Nessuna evidenza strutturata di estintore trovata','Serve censimento o verifica fisica prima di concludere non conformità.'));
    } else if(key==='legionella-risk-assessment'){
      const has=/valutazione.{0,30}rischio.{0,30}legion|rischio.{0,30}legionella/.test(evidenceCorpus); outcomes.push(has?pass(rule,'Valutazione rischio Legionella rintracciata nel master'):review(rule,/flussaggio.{0,30}legionella/.test(evidenceCorpus)?'Presente SOP/flussaggio, non prova della valutazione del rischio':'Valutazione rischio Legionella non rintracciata','Occorre una prova documentale della valutazione, distinta dalla sola attività di flussaggio.'));
    } else if(key==='legionella-control-plan'){
      const has=/piano.{0,30}legion|legionella.{0,40}piano/.test(evidenceCorpus); outcomes.push(has?pass(rule,'Piano Legionella rintracciato'):review(rule,'Piano di controllo non rintracciato','Collegare preset e manutenzioni a un piano basato sul rischio.'));
    } else if(key==='alloggiati-receipt'){
      const has=/alloggiati/.test(evidenceCorpus) && /ricevut|trasmess|inviat|success/.test(evidenceCorpus); outcomes.push(has?pass(rule,'Log/ricevuta Alloggiati rintracciata'):review(rule,'Ricevuta Alloggiati non verificabile dal dataset corrente','Integrare ricevute/timestamp per consentire il controllo automatico per soggiorno.'));
    } else if(key==='guest-identity-verification'){
      const has=/in.person|de visu|real.time.video|video.{0,20}access/.test(evidenceCorpus); outcomes.push(has?pass(rule,'Metodo di identificazione de visu registrato'):review(rule,'Metodo di identificazione non verificabile','Aggiungere evento di verifica identità con metodo e timestamp.'));
    } else if(key==='privacy-id-retention'){
      const has=/documento.{0,30}(elimin|cancell|distrutt)|id.image.{0,30}(delete|cancell)/.test(evidenceCorpus); outcomes.push(has?pass(rule,'Log cancellazione documento rintracciato'):review(rule,'Cancellazione copia documento non verificabile','Aggiungere audit trail della cancellazione dopo la trasmissione.'));
    } else if(key==='ross1000-monthly'){
      const has=/ross1000/.test(evidenceCorpus) && /ricevut|trasmess|inviat|complet/.test(evidenceCorpus); outcomes.push(has?pass(rule,'Evidenza ROSS1000 rintracciata'):review(rule,'Invio ROSS1000 non verificabile','Registrare ricevuta/esito mensile per unità.'));
    } else if(key==='milan-city-tax'){
      const count=bookings.length; const withTax=bookings.filter((r:any)=>Number(r.fields?.[F.bookings.cityTax]||0)>0).length; outcomes.push(count?review(rule,`${withTax}/${count} prenotazioni con city tax valorizzata`,'Mancano nel record prenotazione pax/esenzioni sufficienti a validare automaticamente il calcolo 9,50 × max 14 notti.'):review(rule,'Nessuna prenotazione disponibile','Nessun campione da verificare.'));
    } else if(key==='cin-display-evidence' || key==='cir-advertising-policy'){
      outcomes.push(review(rule,'Verifica annunci/esposizione non collegata strutturalmente','Serve evidenza foto/URL annuncio per automatizzare il controllo.'));
    } else outcomes.push(review(rule,'Evaluator non ancora automatizzato',`Chiave ${key||'non definita'} caricata ma priva di controllo deterministico.`));
  }
  const counts={block:outcomes.filter(x=>x.result==='BLOCKED').length,critical:outcomes.filter(x=>x.result==='NON_COMPLIANT').length,warning:outcomes.filter(x=>x.result==='WARNING').length,review:outcomes.filter(x=>x.result==='REVIEW').length,compliant:outcomes.filter(x=>x.result==='COMPLIANT').length};
  const total=Math.max(outcomes.length,1); const score=Math.max(0,Math.round((counts.compliant + counts.review*0.35 + counts.warning*0.15)/total*100));
  const overall=counts.block?'BLOCKED':counts.critical?'NON COMPLIANT':counts.warning?'WARNING':counts.review?'REVIEW LEGAL':'COMPLIANT';
  const versions=Array.from(new Set(outcomes.map(x=>x.version).filter(Boolean))).sort();
  const actions=outcomes.filter(x=>x.result!=='COMPLIANT').map(x=>`${x.id}: ${x.corrective_action||x.rationale}`);
  return {property, overall_status:overall, score, counts, rule_count:outcomes.length, normative_version:versions.join(', ')||'unversioned', outcomes, actions};
}

async function loadData(baseId:string, token:string, propertyKey:string){
  const airtable=async(path:string, init?:RequestInit)=>{ const res=await fetch(`https://api.airtable.com/v0/${baseId}/${path}`,{...init,headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json',...(init?.headers||{})}}); const text=await res.text(); let data:any={}; try{data=text?JSON.parse(text):{};}catch{data={raw:text};} if(!res.ok) throw new Error(data?.error?.message||data?.error?.type||`Airtable ${res.status}`); return data; };
  const listAll=async(tableId:string)=>{ const rows:any[]=[]; let offset=''; do{ const qs=new URLSearchParams({pageSize:'100',returnFieldsByFieldId:'true'}); if(offset)qs.set('offset',offset); const data=await airtable(`${tableId}?${qs}`); rows.push(...(data.records||[])); offset=data.offset||''; }while(offset); return rows; };
  const all=await Promise.all([listAll(TABLES.properties),listAll(TABLES.authorizations),listAll(TABLES.insurance),listAll(TABLES.catasto),listAll(TABLES.deadlines),listAll(TABLES.rules),listAll(TABLES.bookings),listAll(TABLES.documents),listAll(TABLES.assets),listAll(TABLES.maintenance),listAll(TABLES.activity),listAll(TABLES.updates)]);
  const [properties,authRows,insuranceRows,catastoRows,deadlineRows,ruleRows,bookingRows,documentRows,assetRows,maintenanceRows,activityRows,updateRows]=all;
  const target=normalize(LEGACY_PROPERTY_NAMES[propertyKey]||propertyKey);
  const propertyRecord=properties.find((r:any)=>{ const n=normalize(r.fields?.[F.properties.name]); return n===target||n.startsWith(target)||target.startsWith(n); });
  if(!propertyRecord) throw new Error(`PROPERTY_NOT_FOUND:${propertyKey}`);
  const pf=propertyRecord.fields||{};
  const property={airtable_record_id:propertyRecord.id,property_key:propertyKey,name:pf[F.properties.name]||'',regime:value(pf[F.properties.regime])||'',access:pf[F.properties.access]||'',capacity:pf[F.properties.capacity]??null};
  const linked=(rows:any[],field:string)=>rows.filter(r=>linkedTo(r.fields,field,propertyRecord.id));
  const rules=ruleRows.map(ruleObject).filter((r:any)=>['ACTIVE','REVIEW_LEGAL'].includes(String(r.state).toUpperCase()));
  const pendingUpdates=updateRows.filter((r:any)=>['DA ANALIZZARE','REVIEW_LEGAL'].includes(String(value(r.fields?.[F.updates.status])||'').toUpperCase())).map((r:any)=>({id:r.id,title:r.fields?.[F.updates.title]||'',impact:value(r.fields?.[F.updates.impact])||'',detected:r.fields?.[F.updates.detected]||''}));
  return {airtable,propertyRecord,property,auth:linked(authRows,F.auth.property),insurance:linked(insuranceRows,F.insurance.property),catasto:linked(catastoRows,F.catasto.property),deadlines:linked(deadlineRows,F.deadlines.property),bookings:linked(bookingRows,F.bookings.property),documents:linked(documentRows,F.documents.property),assets:linked(assetRows,F.assets.property),maintenance:linked(maintenanceRows,F.maintenance.property),activity:linked(activityRows,F.activity.property),rules,pendingUpdates};
}

export default async (req:Request) => {
  const BASE_ID=Netlify.env.get('AIRTABLE_BASE_ID')||'appVTOkf1uejZrWGZ'; const TOKEN=Netlify.env.get('AIRTABLE_TOKEN')||'';
  if(!TOKEN) return json(503,{ok:false,configured:false,error:'AIRTABLE_TOKEN_NOT_CONFIGURED'});
  try{
    const url=new URL(req.url); let propertyKey=url.searchParams.get('property')||'MASOTTO4_39'; let origin='MANUALE';
    if(req.method==='POST'){ const body=await req.json().catch(()=>({})); propertyKey=body.property||propertyKey; origin=body.origin||'MANUALE'; }
    if(propertyKey==='ALL_2EMME') return json(400,{ok:false,error:'SELECT_SINGLE_PROPERTY'});
    const data=await loadData(BASE_ID,TOKEN,propertyKey); const scan=await evaluateProperty(data);
    if(req.method==='POST'){
      const scanId=`SCAN-${propertyKey}-${new Date().toISOString().replace(/[-:.TZ]/g,'').slice(0,14)}`;
      const payload={records:[{fields:{[F.scans.id]:scanId,[F.scans.date]:new Date().toISOString(),[F.scans.property]:[data.propertyRecord.id],[F.scans.origin]:origin,[F.scans.state]:scan.overall_status,[F.scans.score]:scan.score,[F.scans.block]:scan.counts.block,[F.scans.critical]:scan.counts.critical,[F.scans.warning]:scan.counts.warning,[F.scans.review]:scan.counts.review,[F.scans.version]:scan.normative_version,[F.scans.detail]:JSON.stringify(scan.outcomes),[F.scans.actions]:scan.actions.join('\n')}}]};
      await data.airtable(TABLES.scans,{method:'POST',body:JSON.stringify(payload)});
      return json(200,{ok:true,saved:true,scan_id:scanId,pending_updates:data.pendingUpdates.length,...scan});
    }
    return json(200,{ok:true,saved:false,pending_updates:data.pendingUpdates.length,pending_update_items:data.pendingUpdates,...scan});
  }catch(err:any){ console.error(err); return json(500,{ok:false,error:String(err?.message||err)}); }
};

export const config={path:'/api/compliance'};
