import { createHash } from 'node:crypto';

const TABLES={sources:'tblKe0s9dz4HYOz0r',updates:'tblTeuRX01d5XtuMO'};
const SF={id:'fldzwockjGRlqTsuM',name:'fldAMQ7TH3Iy395Un',url:'fldZOnrHkWxpq4K2c',kind:'fldjYOZ0iIxZyuPPF',areas:'fldEFYldzsR3tbV6A',keywords:'fldUan1arUnfOjTzZ',active:'fldSZzymB3VtUIGWd',frequency:'fldoQjaiu8jDPIW1d',priority:'fldKiD0T9YdjOwW7y',checked:'fldze6EWRv7AOH8ou',hash:'fldRCMocyyY77rWzw',notes:'fldc5slL5GoE9FYfT'};
const UF={id:'fld0akFAFCgvHM5zK',detected:'fldndZnu9rXwDLTrg',source:'fldTsppoFjX6fRYZi',title:'flduBTPH19HXEj8kb',url:'fld2y1I2BmYcHTFIm',type:'fldeaF4DornqTfngN',diff:'fldGwhBt7vXNNvhaX',impact:'fldhpr9iexb6kaXso',actions:'fldGxS90n8aBnqABG',status:'fldRcstVQS0OqpyzK',hash:'fldGgzcjlJTg7UUA0',notes:'fldOa5cWmRj1W8twh'};
function value(v:any){ return v&&typeof v==='object'&&!Array.isArray(v)&&'name'in v?v.name:(v??null); }
function normalize(s:any){ return String(value(s)||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim(); }
function sha(text:string){ return createHash('sha256').update(text).digest('hex'); }
function decodeEntities(s:string){ return s.replace(/&nbsp;/gi,' ').replace(/&amp;/gi,'&').replace(/&quot;/gi,'"').replace(/&#39;/gi,"'").replace(/&lt;/gi,'<').replace(/&gt;/gi,'>'); }
function textFromHtml(html:string){ return decodeEntities(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ')).trim(); }
function titleFromHtml(html:string){ const m=html.match(/<title[^>]*>([\s\S]*?)<\/title>/i); return m?textFromHtml(m[1]).slice(0,180):''; }
function keywordList(raw:any){ return String(raw||'').split(/[;\n,]+/).map(normalize).filter(x=>x.length>2); }
function relevantSignature(text:string,keywords:string[]){ const n=normalize(text); if(!keywords.length) return n.slice(0,80000); const parts=n.split(/(?<=[.!?;:])\s+|\s{2,}/).filter(Boolean); const hits=parts.filter(p=>keywords.some(k=>p.includes(k))); const unique=Array.from(new Set(hits)).sort(); return (unique.length?unique.join('\n'):n.slice(0,40000)).slice(0,160000); }
function extractRelevantLinks(html:string,baseUrl:string,keywords:string[],limit:number){ const base=new URL(baseUrl); const found:string[]=[]; const re=/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi; let m; while((m=re.exec(html))&&found.length<80){ try{ const u=new URL(m[1],base); if(u.protocol!=='https:'&&u.protocol!=='http:') continue; if(u.hostname!==base.hostname) continue; u.hash=''; const label=normalize(textFromHtml(m[2])); const target=normalize(u.pathname+' '+u.search+' '+label); if(keywords.some(k=>target.includes(k))&&!found.includes(u.href)) found.push(u.href); }catch{} } return found.slice(0,limit); }
async function fetchText(url:string,timeoutMs=5500){ const controller=new AbortController(); const timer=setTimeout(()=>controller.abort(),timeoutMs); try{ const res=await fetch(url,{redirect:'follow',signal:controller.signal,headers:{'user-agent':'2EMME-3MATRIX-ComplianceWatch/1.0 (+institutional compliance monitoring)','accept':'text/html,application/xhtml+xml,application/xml,text/plain;q=0.9,*/*;q=0.5'}}); if(!res.ok) throw new Error(`HTTP_${res.status}`); const type=res.headers.get('content-type')||''; const text=await res.text(); return {text,type,url:res.url||url}; } finally{ clearTimeout(timer); } }

export async function runComplianceWatch(options:{deep?:boolean;sourceLimit?:number;reason?:string}={}){
  const BASE_ID=Netlify.env.get('AIRTABLE_BASE_ID')||'appVTOkf1uejZrWGZ'; const TOKEN=Netlify.env.get('AIRTABLE_TOKEN')||'';
  if(!TOKEN) throw new Error('AIRTABLE_TOKEN_NOT_CONFIGURED');
  const airtable=async(path:string,init?:RequestInit)=>{ const res=await fetch(`https://api.airtable.com/v0/${BASE_ID}/${path}`,{...init,headers:{Authorization:`Bearer ${TOKEN}`,'Content-Type':'application/json',...(init?.headers||{})}}); const body=await res.text(); let data:any={}; try{data=body?JSON.parse(body):{};}catch{data={raw:body};} if(!res.ok) throw new Error(data?.error?.message||data?.error?.type||`AIRTABLE_${res.status}`); return data; };
  const listAll=async(table:string)=>{ const rows:any[]=[]; let offset=''; do{ const qs=new URLSearchParams({pageSize:'100',returnFieldsByFieldId:'true'}); if(offset)qs.set('offset',offset); const d=await airtable(`${table}?${qs}`); rows.push(...(d.records||[])); offset=d.offset||''; }while(offset); return rows; };
  const [sourceRows,updateRows]=await Promise.all([listAll(TABLES.sources),listAll(TABLES.updates)]);
  const existingHashes=new Set(updateRows.map((r:any)=>String(r.fields?.[UF.hash]||'')).filter(Boolean));
  const now=new Date().toISOString(); const sourcePatches:any[]=[]; const newUpdates:any[]=[];
  const active=sourceRows.filter((r:any)=>Boolean(r.fields?.[SF.active])).slice(0,options.sourceLimit||50);
  const results=await Promise.all(active.map(async(src:any)=>{ const f=src.fields||{}; const root=String(f[SF.url]||''); if(!root) return {source:f[SF.id]||src.id,status:'SKIPPED',error:'URL_MISSING'}; const keywords=keywordList(f[SF.keywords]); try{
      const rootRes=await fetchText(root); const title=titleFromHtml(rootRes.text)||String(f[SF.name]||f[SF.id]||'Fonte istituzionale'); const pages=[{url:rootRes.url,text:rootRes.text}];
      if(options.deep){ const links=extractRelevantLinks(rootRes.text,rootRes.url,keywords,4); const subs=await Promise.all(links.map(async link=>{try{return await fetchText(link,4200)}catch{return null}})); for(const sub of subs.filter(Boolean) as any[]) pages.push({url:sub.url,text:sub.text}); }
      const signature=pages.map(p=>`URL:${p.url}\n${relevantSignature(textFromHtml(p.text),keywords)}`).join('\n---\n'); const contentHash=sha(signature); const previous=String(f[SF.hash]||''); const changed=Boolean(previous&&previous!==contentHash); const baseline=!previous;
      sourcePatches.push({id:src.id,fields:{[SF.checked]:now,[SF.hash]:contentHash}});
      if(changed&&!existingHashes.has(contentHash)){
        existingHashes.add(contentHash); const updateId=`UPD-${String(f[SF.id]||src.id).replace(/[^A-Za-z0-9-]/g,'-')}-${now.replace(/[-:.TZ]/g,'').slice(0,14)}`;
        newUpdates.push({fields:{[UF.id]:updateId,[UF.detected]:now,[UF.source]:[src.id],[UF.title]:`Variazione rilevata: ${title}`,[UF.url]:rootRes.url,[UF.type]:'Modifica',[UF.diff]:`Il contenuto normativo/istituzionale rilevante per le parole chiave monitorate è cambiato rispetto all'ultimo hash. Pagine analizzate: ${pages.length}. È necessaria la comparazione giuridica con le regole ACTIVE prima di applicare modifiche operative.`,[UF.impact]:normalize(f[SF.priority])==='alta'?'Alto':'Medio',[UF.actions]:'Confrontare il nuovo contenuto con Normativa Compliance; individuare regole impattate; proporre nuova versione o SUPERSEDED; validare prima di passare ad ACTIVE.',[UF.status]:'DA ANALIZZARE',[UF.hash]:contentHash,[UF.notes]:`Compliance Watch ${options.reason||'manuale'}; deep=${Boolean(options.deep)}; fonte ${f[SF.id]||src.id}.`}});
      }
      return {source:f[SF.id]||src.id,name:f[SF.name]||'',status:baseline?'BASELINE':changed?'CHANGED':'UNCHANGED',hash:contentHash,pages:pages.length,url:rootRes.url};
    }catch(err:any){ sourcePatches.push({id:src.id,fields:{[SF.checked]:now}}); return {source:f[SF.id]||src.id,name:f[SF.name]||'',status:'ERROR',error:String(err?.message||err),url:root}; }
  }));
  for(let i=0;i<sourcePatches.length;i+=10) await airtable(TABLES.sources,{method:'PATCH',body:JSON.stringify({records:sourcePatches.slice(i,i+10)})});
  for(let i=0;i<newUpdates.length;i+=10) await airtable(TABLES.updates,{method:'POST',body:JSON.stringify({records:newUpdates.slice(i,i+10)})});
  return {ok:true,scanned_at:now,deep:Boolean(options.deep),sources_scanned:active.length,changes_detected:newUpdates.length,errors:results.filter((r:any)=>r.status==='ERROR').length,results};
}
