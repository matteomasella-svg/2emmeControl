const BASE_ID = process.env.AIRTABLE_BASE_ID || 'appVTOkf1uejZrWGZ';
const TOKEN = process.env.AIRTABLE_TOKEN || '';

const TABLES = {
  properties: 'tblrxIPFH5IZqYcJ5',
  bookings: 'tblFfwIgXrdD5Vj3I',
  payments: 'tbljjS0ztr9MmHzkv',
  documents: 'tblSSKK5w0YU7FGt8'
};

const F = {
  properties: { name: 'fldg40Lc7ZBCylxCR' },
  bookings: {
    ref: 'fldwXA31r2FVcLCJx', property: 'fldcxQLmaLlBqeUeC', guest: 'fldyLuSzYbr5CGQQZ',
    checkin: 'fldd75nR8bXawL11w', checkout: 'fldEPNpvtlkdUIWN8', nights: 'fldjteZc35DuponKL',
    gross: 'fldxfIr93vGjEPvUx', city: 'fld9gmxIIL6kyFaNo', cleaning: 'fld1dKSBfXjAFM95Q',
    stay: 'fldkrySydz83HdQBt', service: 'fldOygTId0eqIuwKa'
  },
  payments: {
    paymentId: 'fldcxBNUpGkBW8gGI', guestCode: 'fldxEi2qaBcQJyJoJ', guest: 'fld6P8UWJ3EwBd47x',
    propertyName: 'fldBaQcdvfqAFHXs1', cycle: 'fldLQKaL2lh5XlVSL', type: 'fldJuSCLKBhXTxLQi',
    installment: 'fldIyAim3Lspwcgx6', dueDate: 'fld3YQIMBUqWW1bRX', periodFrom: 'fldQNvNP5aV9UhbYm',
    periodTo: 'fld3ZOFxB81uvTz1F', canone: 'fldqe1gSSxP4mWygM', city: 'fldln0jaOSUvmPkdO',
    total: 'fldfxS2sWLIcFp6Gt', status: 'fldcvV8Ol0Tb6yEhi', paymentDate: 'fldPFojx17bk8EU5u',
    receiptRef: 'flduHhdEzD2o7zxjx', amountPaid: 'fldAFlP5iyg3DgNMq', residual: 'fldXeU3KkcyV7PGS6',
    cleaning: 'fldt6CX0kw9QGuSXU', booking: 'fldpghmdAw1AiWglP', notes: 'fld0EL9Gcyvz2W7kS'
  },
  documents: {
    id: 'fld3TvKOFbDt7Tb6t', number: 'fldRo5JVEXXqv4TQp', type: 'fldt9yaCwNc5aFvyQ', issueDate: 'fldkOiU36EIbBwqTu',
    booking: 'fld8TRdCyRhg0WDFC', payments: 'fldtaT8IGUO5Qk5XJ', property: 'fldn5cYJSIiy6YzsU', guest: 'fldcUbxORYNN0jKSD',
    bookingRef: 'fldgHPEZlKISnsbQI', contractPeriod: 'fldRt1nh2VV7KbKrl', stay: 'fldKYpTIB8BpY8USG',
    cleaning: 'fldPUHE4DfNWNVpII', city: 'fldwR4tjdfmXdiCrJ', service: 'flddE33oiX7rtsiz1', total: 'fldZZoICb4WlN4Wdj',
    paid: 'fldVgzXuSh1CrWV62', residual: 'fld5N3vtm6kOzAFtg', method: 'fldHnYGp98B4uZEio', status: 'fldGOidYc7xtXsz9m',
    sdi: 'fldOyEdCZ4vGxS3qL', url: 'fldP78x7s6pgCMIiJ', notes: 'fldbW9uNe910p1sPM', created: 'fldXvmdK6qaJeMCn3'
  }
};

function json(statusCode, body){return {statusCode,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'},body:JSON.stringify(body)}}
function authHeaders(){return {Authorization:`Bearer ${TOKEN}`,'Content-Type':'application/json'}}
async function airtable(path,options={}){const res=await fetch(`https://api.airtable.com/v0/${BASE_ID}/${path}`,{...options,headers:{...authHeaders(),...(options.headers||{})}});const text=await res.text();let data={};try{data=text?JSON.parse(text):{}}catch{data={raw:text}}if(!res.ok)throw new Error(data?.error?.message||data?.error?.type||`Airtable ${res.status}`);return data}
async function listAll(tableId){const all=[];let offset='';do{const qs=new URLSearchParams({pageSize:'100',returnFieldsByFieldId:'true'});if(offset)qs.set('offset',offset);const data=await airtable(`${tableId}?${qs.toString()}`);all.push(...(data.records||[]));offset=data.offset||''}while(offset);return all}

function mapBootstrap(properties,bookings,payments,documents){
  const propById=Object.fromEntries(properties.map(r=>[r.id,r.fields?.[F.properties.name]||r.id]));const bookingByRecord={};
  const bookingRows=bookings.map(r=>{const f=r.fields||{},propId=(f[F.bookings.property]||[])[0]||'';const row={airtable_record_id:r.id,id:r.id,booking_ref:f[F.bookings.ref]||r.id,guest:f[F.bookings.guest]||'',check_in:f[F.bookings.checkin]||'',check_out:f[F.bookings.checkout]||'',nights:f[F.bookings.nights]||0,gross_eur:f[F.bookings.gross]||0,city_tax_eur:f[F.bookings.city]||0,cleaning_eur:f[F.bookings.cleaning]||0,accommodation_eur:f[F.bookings.stay]||0,service_eur:f[F.bookings.service]||0,property_record_id:propId,source_property_name:propById[propId]||''};bookingByRecord[r.id]=row;return row});
  const paymentRows=payments.map(r=>{const f=r.fields||{},bookingRecordId=(f[F.payments.booking]||[])[0]||'',b=bookingByRecord[bookingRecordId];return {airtable_record_id:r.id,id:r.id,booking_record_id:bookingRecordId,booking_ref:b?.booking_ref||'',booking_key:bookingRecordId||`UNLINKED::${f[F.payments.paymentId]||r.id}`,payment_id:f[F.payments.paymentId]||r.id,guest:f[F.payments.guest]||b?.guest||'',property_name:f[F.payments.propertyName]||b?.source_property_name||'',installment_no:f[F.payments.installment]||0,payment_date:f[F.payments.paymentDate]||'',due_date:f[F.payments.dueDate]||'',period_from:f[F.payments.periodFrom]||'',period_to:f[F.payments.periodTo]||'',amount_paid_eur:f[F.payments.amountPaid]||0,total_eur:f[F.payments.total]||0,residual_eur:f[F.payments.residual]||0,status:f[F.payments.status]||'',receipt_ref:f[F.payments.receiptRef]||''}});
  const documentRows=documents.map(r=>{const f=r.fields||{},issued=f[F.documents.issueDate]||'';return {airtable_record_id:r.id,id:f[F.documents.id]||r.id,number:f[F.documents.number]||'',year:parseInt(String(issued).slice(0,4))||0,type:String(f[F.documents.type]||'').toLowerCase().includes('fattura')?'fattura':'ricevuta',issued_at:issued,booking_record_id:(f[F.documents.booking]||[])[0]||'',booking_ref:f[F.documents.bookingRef]||'',guest:f[F.documents.guest]||'',property_name:propById[(f[F.documents.property]||[])[0]]||'',total_booking_eur:f[F.documents.total]||0,paid_cumulative_eur:f[F.documents.paid]||0,residual_eur:f[F.documents.residual]||0,sdi_status:f[F.documents.sdi]||''}});
  return {bookings:bookingRows,payments:paymentRows,documents:documentRows,configured:true}
}
async function bootstrap(){const [properties,bookings,payments,documents]=await Promise.all([listAll(TABLES.properties),listAll(TABLES.bookings),listAll(TABLES.payments),listAll(TABLES.documents)]);return mapBootstrap(properties,bookings,payments,documents)}
async function createPayment(payload){const p=payload.payment||{};if(!p.payment_id||!p.amount_paid_eur)throw new Error('Payment ID e importo sono obbligatori');const fields={[F.payments.paymentId]:p.payment_id,[F.payments.guest]:p.guest||'',[F.payments.propertyName]:p.property_name||'',[F.payments.type]:'PAGAMENTO DASHBOARD',[F.payments.installment]:Number(p.installment_no)||0,[F.payments.dueDate]:p.payment_date||undefined,[F.payments.periodFrom]:p.period_from||undefined,[F.payments.periodTo]:p.period_to||undefined,[F.payments.status]:'PAGATO',[F.payments.paymentDate]:p.payment_date||undefined,[F.payments.amountPaid]:Number(p.amount_paid_eur)||0,[F.payments.total]:Number(p.amount_paid_eur)||0,[F.payments.residual]:Number(p.residual_eur)||0,[F.payments.notes]:p.method?`Metodo: ${p.method}`:''};if(p.booking_record_id)fields[F.payments.booking]=[p.booking_record_id];Object.keys(fields).forEach(k=>fields[k]===undefined&&delete fields[k]);const out=await airtable(TABLES.payments,{method:'POST',body:JSON.stringify({records:[{fields}],typecast:true})});return out.records?.[0]||null}
async function deletePayment(recordId){if(!recordId)throw new Error('Record pagamento mancante');return airtable(`${TABLES.payments}/${recordId}`,{method:'DELETE'})}
async function createDocument(payload){const d=payload.document||{};if(!d.number||!d.booking_record_id)throw new Error('Numero documento e prenotazione sono obbligatori');const fields={[F.documents.id]:d.id||`DOC-${Date.now()}`,[F.documents.number]:d.number,[F.documents.type]:d.type==='fattura'?'Fattura - PDF amministrativo':'Ricevuta amministrativa',[F.documents.issueDate]:d.issue_date,[F.documents.booking]:[d.booking_record_id],[F.documents.guest]:d.guest||'',[F.documents.bookingRef]:d.booking_ref||'',[F.documents.contractPeriod]:d.contract_period||'',[F.documents.stay]:Number(d.stay)||0,[F.documents.cleaning]:Number(d.cleaning)||0,[F.documents.city]:Number(d.city)||0,[F.documents.service]:Number(d.service)||0,[F.documents.total]:Number(d.total)||0,[F.documents.paid]:Number(d.paid)||0,[F.documents.residual]:Number(d.residual)||0,[F.documents.method]:d.method||'',[F.documents.status]:'Emesso',[F.documents.sdi]:d.type==='fattura'?'Da trasmettere':'Non previsto',[F.documents.created]:new Date().toISOString(),[F.documents.notes]:'Generato da 2EMME Control. PDF amministrativo; eventuale invio SDI gestito separatamente.'};if(d.property_record_id)fields[F.documents.property]=[d.property_record_id];if(Array.isArray(d.payment_record_ids)&&d.payment_record_ids.length)fields[F.documents.payments]=d.payment_record_ids;const out=await airtable(TABLES.documents,{method:'POST',body:JSON.stringify({records:[{fields}],typecast:true})});return out.records?.[0]||null}
export async function handler(event){if(!TOKEN)return json(503,{ok:false,configured:false,error:'AIRTABLE_TOKEN_NOT_CONFIGURED'});try{if(event.httpMethod==='GET'){const action=event.queryStringParameters?.action||'bootstrap';if(action==='health')return json(200,{ok:true,configured:true,baseId:BASE_ID});if(action==='bootstrap')return json(200,{ok:true,...await bootstrap()});return json(400,{ok:false,error:'UNKNOWN_ACTION'})}if(event.httpMethod==='POST'){const body=JSON.parse(event.body||'{}');if(body.action==='create_payment')return json(200,{ok:true,record:await createPayment(body)});if(body.action==='delete_payment')return json(200,{ok:true,record:await deletePayment(body.record_id)});if(body.action==='create_document')return json(200,{ok:true,record:await createDocument(body)});return json(400,{ok:false,error:'UNKNOWN_ACTION'})}return json(405,{ok:false,error:'METHOD_NOT_ALLOWED'})}catch(err){console.error(err);return json(500,{ok:false,error:String(err.message||err)})}}
