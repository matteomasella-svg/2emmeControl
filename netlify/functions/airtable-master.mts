const TABLES = {
  properties: 'tblrxIPFH5IZqYcJ5',
  catasto: 'tblgtIe3pACkUWyqE',
  utilities: 'tblCW5VHGDHZNCyok',
  contacts: 'tblil5JBZZbLGy0qY',
  authorizations: 'tblMp2ocVRYSEN2nP',
  insurance: 'tblvjkHtM1vzNl0O1',
  condo: 'tblK3gbrj3TDSyWQv',
  rates: 'tblLuvLx1C0Y0a7kx'
};

const F = {
  properties: {
    name:'fldg40Lc7ZBCylxCR', code:'fldksgwBMb2Pc1Bmk', address:'fldtPo3OxXcq5ArEB', type:'fldvmSqz4QQWPXGlF',
    status:'fldgR9Wr3vaNwfAol', regime:'fldu9gdftgQ8Kti2J', floor:'fldNhb4rFyvfNtslN', capacity:'fldQENl4NArZhN6jF',
    manager:'fldixmUJoCftYvhvO', title:'fldJyCQRCKAL4ScS2', surface:'fldgUU4w56zsD8Yim', access:'fldwzOW9fZi5PqmEJ',
    metro:'fldS6RlAsptGCZgdQ', terrace:'fld4rmLMIhjYXVZw3', updated:'fldoAWhv9lKKWQsqv', dataStatus:'fldKZnkX7rn4B5PqU'
  },
  catasto: {
    property:'fldAFPWsTJePaBXQe', status:'fldbdTItp1vHTRqSn', foglio:'fld6rvE8ZKB5xbpZR', particella:'fldXSdSyYimGCjU9B',
    sub:'fldFFPcIojNJTBmcw', category:'fldMTtm0IIqsuS6lG', rent:'fldUWcvnEeNuHXY5s', surface:'fldkHHOV3IuMpAAYi',
    usefulApe:'fld6NGILbCp7D8lLK', managedSurface:'fld8u4lrXShZKr3Aw', apeClass:'fldIohVZXcd9hogj5', epgl:'fldCrGV31SfVVekhN',
    apeExpiry:'fldCcZyw3cdLGDmzX', notes:'fldJldnUTR4R4L3Ro'
  },
  utilities: {
    property:'fldZDlMuBteYoXBNr', id:'fldW7zj1boUYuh6pp', type:'fldcu64ljPB1ZYeoM', provider:'fldbbr98alL8QEvOJ',
    code:'fldCpPVpYpPyrgpi0', contract:'fldUqTpx19UblD51h', status:'fldEj16nnndUsNWUk', start:'fldlOX9xyBsDhawH7',
    supplyCode:'fldE3cSocdE7stIai', ssid:'fldQI8JdhsB9eJVdm', clientCode:'fldYMEG0hUgfnYe2N', annualSpend:'fldMeeHpdV69bbpuJ'
  },
  contacts: {
    property:'fldG8V6Qk23H43oAm', id:'fldu4TAKcPx9Kif6v', type:'flda8I3MXAXWiZhtw', org:'fldM1CoAJvJB22bMM',
    person:'fldDISkn8JIqcpaZf', email:'fldVsmeTUHURwmAoj', phone:'fldmZTVfQMHyWOekE', status:'flddENDwPasDLJVFc',
    notes:'fldzk2lXWi7eeyDOm', address:'fldhzjQy5LAgcKXqb'
  },
  authorizations: {
    property:'fldHMuDJrsjT58fNj', id:'fldsWJUU6b0IDwGYo', regime:'fldeJjagcOqkmK077', cin:'fldb7JpLy3n8lZwBT',
    cir:'fldH8u905xcBFjgSB', structureCode:'fldSHkqSF70oQxwwU', practice:'fldLu91GsOqpkZnG4', practiceDate:'fldOXkyKcHJNZ3QyZ',
    openingDate:'fldR8zpdPcdStb0Cr', status:'fldIaFG16tJ40cU7P', notes:'fldblAIuR7i2rRWQW'
  },
  insurance: {
    property:'fldVREaQSvZJ0norq', id:'fld2qoR89qOKZYLXl', company:'fldZHkaLjys6dUbay', product:'fldWzt3eTSxbClJqO',
    contractor:'fldN7uf8jBs90A7s0', premium:'fldNu7IdvBKIaOH3n', paymentDate:'fldCrGRQt8En8712t', start:'fldW5DUWGy9UvoqC3',
    expiry:'fldmO85fSR54VEKgU', status:'fldEjhr4KnvHRUiWj', notes:'fldFKYwIfVefL6rqQ', receipt:'fldzTLkUoOBDbiJ2L'
  },
  condo: {
    property:'fldjtlVTRxQiyO7Wv', id:'fld0pT3TajejNwCOP', admin:'fldziG0D1y2t4iVmW', unit:'fld21I5aERcx3lZPT',
    exercise:'fld7sGtyqTmHGtPY7', period:'flddD92z8ZFWsiTBn', type:'fldzCDlfRwraB9lu0', cost:'fldiWm5m3X9PDFgSL',
    personal:'fld444AwsBS4bo5gS', previous:'fldyuChvkt0xj58vA', adjustment:'fld5feTkV2UwoFsJb', due:'fldqxJdO82Jio4xRA',
    paid:'fldtAib615Q1WZADX', residual:'fldHyg8Gm2aV0gfmB', status:'fldYkNvRWdSF2da7e', notes:'fld9UYahvBjl5vmBo'
  },
  rates: {
    property:'fldFblUcrpBfHemni', id:'fldAlBtxFWYkCDWe8', dueDate:'fldrmbne8cuYUh20v', description:'flddDGr0el8ku0JFl',
    due:'fldljCuiyc2C9aZ0R', paid:'fldIkatClzHkrv2YC', commissions:'fld8Tq4vmJFgKq0kC', balance:'fld8Snn8OiyaXcC4e',
    paymentDate:'fldEwyrvYB2E4dOmN', status:'fld1mER9GAEtox4dT', notes:'fldVeNPtCa5QkdD4v'
  }
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

function value(v:any){
  if (v && typeof v === 'object' && !Array.isArray(v) && 'name' in v) return v.name;
  return v ?? null;
}

function linkedTo(fields:any, fieldId:string, recordId:string){
  const links = fields?.[fieldId];
  return Array.isArray(links) && links.includes(recordId);
}

function normalize(s:any){
  return String(s || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ');
}

export default async (req:Request) => {
  const BASE_ID = Netlify.env.get('AIRTABLE_BASE_ID') || 'appVTOkf1uejZrWGZ';
  const TOKEN = Netlify.env.get('AIRTABLE_TOKEN') || '';
  if (!TOKEN) return json(503, {ok:false, configured:false, error:'AIRTABLE_TOKEN_NOT_CONFIGURED'});

  const airtable = async (path:string) => {
    const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${path}`, {
      headers:{Authorization:`Bearer ${TOKEN}`,'Content-Type':'application/json'}
    });
    const text = await res.text();
    let data:any = {};
    try { data = text ? JSON.parse(text) : {}; } catch { data = {raw:text}; }
    if (!res.ok) throw new Error(data?.error?.message || data?.error?.type || `Airtable ${res.status}`);
    return data;
  };

  const listAll = async (tableId:string) => {
    const rows:any[] = [];
    let offset = '';
    do {
      const qs = new URLSearchParams({pageSize:'100',returnFieldsByFieldId:'true'});
      if (offset) qs.set('offset', offset);
      const data = await airtable(`${tableId}?${qs}`);
      rows.push(...(data.records || []));
      offset = data.offset || '';
    } while (offset);
    return rows;
  };

  try {
    const url = new URL(req.url);
    const propertyKey = url.searchParams.get('property') || 'MASOTTO4_39';
    if (propertyKey === 'ALL_2EMME') return json(400, {ok:false, error:'SELECT_SINGLE_PROPERTY'});

    const [properties, catastoRows, utilityRows, contactRows, authRows, insuranceRows, condoRows, rateRows] = await Promise.all([
      listAll(TABLES.properties), listAll(TABLES.catasto), listAll(TABLES.utilities), listAll(TABLES.contacts),
      listAll(TABLES.authorizations), listAll(TABLES.insurance), listAll(TABLES.condo), listAll(TABLES.rates)
    ]);

    const targetName = LEGACY_PROPERTY_NAMES[propertyKey] || propertyKey;
    const target = normalize(targetName);
    const propertyRecord = properties.find((r:any) => {
      const name = normalize(r.fields?.[F.properties.name]);
      return name === target || name.startsWith(target) || target.startsWith(name);
    });
    if (!propertyRecord) return json(404, {ok:false, error:'PROPERTY_NOT_FOUND', propertyKey, targetName});

    const pf = propertyRecord.fields || {};
    const property = {
      airtable_record_id: propertyRecord.id,
      property_key: propertyKey,
      name: pf[F.properties.name] || '', code: pf[F.properties.code] || '', address: pf[F.properties.address] || '',
      type: value(pf[F.properties.type]), status: value(pf[F.properties.status]), regime: value(pf[F.properties.regime]),
      floor: pf[F.properties.floor] || '', capacity: pf[F.properties.capacity] || null, manager: pf[F.properties.manager] || '',
      title: pf[F.properties.title] || '', surface: pf[F.properties.surface] || '', access: pf[F.properties.access] || '',
      metro: pf[F.properties.metro] || '', terrace: Boolean(pf[F.properties.terrace]), updated: pf[F.properties.updated] || '',
      data_status: value(pf[F.properties.dataStatus])
    };

    const catastoLinked = catastoRows.filter((r:any) => linkedTo(r.fields, F.catasto.property, propertyRecord.id));
    const currentCatasto = catastoLinked.find((r:any) => normalize(value(r.fields?.[F.catasto.status])) === 'corrente') || catastoLinked[0];
    const cf = currentCatasto?.fields || {};
    const catasto = currentCatasto ? {
      airtable_record_id: currentCatasto.id, status:value(cf[F.catasto.status]), foglio:cf[F.catasto.foglio] || '',
      particella:cf[F.catasto.particella] || '', subalterno:cf[F.catasto.sub] || '', categoria:cf[F.catasto.category] || '',
      rendita:cf[F.catasto.rent] ?? null, superficie_catastale:cf[F.catasto.surface] || '', superficie_utile_ape:cf[F.catasto.usefulApe] ?? null,
      superficie_gestionale:cf[F.catasto.managedSurface] || '', ape_class:value(cf[F.catasto.apeClass]), epgl:cf[F.catasto.epgl] ?? null,
      ape_expiry:cf[F.catasto.apeExpiry] || '', notes:cf[F.catasto.notes] || ''
    } : null;

    const utilities = utilityRows.filter((r:any) => linkedTo(r.fields, F.utilities.property, propertyRecord.id)).map((r:any) => {
      const f = r.fields || {};
      return {airtable_record_id:r.id, id:f[F.utilities.id] || r.id, type:value(f[F.utilities.type]), provider:f[F.utilities.provider] || '',
        code:f[F.utilities.code] || '', contract:f[F.utilities.contract] || '', supply_code:f[F.utilities.supplyCode] || '', status:value(f[F.utilities.status]),
        start:f[F.utilities.start] || '', ssid:f[F.utilities.ssid] || '', client_code:f[F.utilities.clientCode] || '', annual_spend:f[F.utilities.annualSpend] ?? null};
    });

    const contacts = contactRows.filter((r:any) => linkedTo(r.fields, F.contacts.property, propertyRecord.id)).map((r:any) => {
      const f = r.fields || {};
      return {airtable_record_id:r.id, id:f[F.contacts.id] || r.id, type:value(f[F.contacts.type]), organization:f[F.contacts.org] || '',
        person:f[F.contacts.person] || '', email:f[F.contacts.email] || '', phone:f[F.contacts.phone] || '', status:value(f[F.contacts.status]),
        address:f[F.contacts.address] || '', notes:f[F.contacts.notes] || ''};
    });

    const authorizations = authRows.filter((r:any) => linkedTo(r.fields, F.authorizations.property, propertyRecord.id)).map((r:any) => {
      const f = r.fields || {};
      return {airtable_record_id:r.id, id:f[F.authorizations.id] || r.id, regime:value(f[F.authorizations.regime]), cin:f[F.authorizations.cin] || '',
        cir:f[F.authorizations.cir] || '', structure_code:f[F.authorizations.structureCode] || '', practice:f[F.authorizations.practice] || '',
        practice_date:f[F.authorizations.practiceDate] || '', opening_date:f[F.authorizations.openingDate] || '', status:value(f[F.authorizations.status]), notes:f[F.authorizations.notes] || ''};
    });

    const insurance = insuranceRows.filter((r:any) => linkedTo(r.fields, F.insurance.property, propertyRecord.id)).map((r:any) => {
      const f = r.fields || {};
      return {airtable_record_id:r.id, id:f[F.insurance.id] || r.id, company:f[F.insurance.company] || '', product:f[F.insurance.product] || '',
        contractor:f[F.insurance.contractor] || '', premium:f[F.insurance.premium] ?? null, payment_date:f[F.insurance.paymentDate] || '',
        start:f[F.insurance.start] || '', expiry:f[F.insurance.expiry] || '', status:value(f[F.insurance.status]), receipt:f[F.insurance.receipt] || '', notes:f[F.insurance.notes] || ''};
    });

    const condo = condoRows.filter((r:any) => linkedTo(r.fields, F.condo.property, propertyRecord.id)).map((r:any) => {
      const f = r.fields || {};
      return {airtable_record_id:r.id, id:f[F.condo.id] || r.id, admin:f[F.condo.admin] || '', unit:f[F.condo.unit] || '', exercise:f[F.condo.exercise] || '',
        period:f[F.condo.period] || '', type:f[F.condo.type] || '', cost:f[F.condo.cost] ?? null, personal:f[F.condo.personal] ?? null,
        previous:f[F.condo.previous] ?? null, adjustment:f[F.condo.adjustment] ?? null, due:f[F.condo.due] ?? null, paid:f[F.condo.paid] ?? null,
        residual:f[F.condo.residual] ?? null, status:f[F.condo.status] || '', notes:f[F.condo.notes] || ''};
    });

    const rates = rateRows.filter((r:any) => linkedTo(r.fields, F.rates.property, propertyRecord.id)).map((r:any) => {
      const f = r.fields || {};
      return {airtable_record_id:r.id, id:f[F.rates.id] || r.id, due_date:f[F.rates.dueDate] || '', description:f[F.rates.description] || '',
        due:f[F.rates.due] ?? null, paid:f[F.rates.paid] ?? null, commissions:f[F.rates.commissions] ?? null, balance:f[F.rates.balance] ?? null,
        payment_date:f[F.rates.paymentDate] || '', status:f[F.rates.status] || '', notes:f[F.rates.notes] || ''};
    }).sort((a:any,b:any) => String(b.due_date).localeCompare(String(a.due_date)));

    return json(200, {ok:true, configured:true, source:'airtable', base_id:BASE_ID, synced_at:new Date().toISOString(), property, catasto, utilities, contacts, authorizations, insurance, condo, rates});
  } catch (err:any) {
    console.error(err);
    return json(500, {ok:false, configured:true, error:String(err?.message || err)});
  }
};

export const config = { path:'/api/airtable-master' };
