import { runComplianceWatch } from './compliance-watch-core.mts';

function json(status:number, body:unknown){
  return new Response(JSON.stringify(body), {status, headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}});
}

export default async (req:Request) => {
  if(req.method!=='POST' && req.method!=='GET') return json(405,{ok:false,error:'METHOD_NOT_ALLOWED'});
  try{
    const result=await runComplianceWatch({deep:true,reason:'manuale'});
    return json(200,result);
  }catch(err:any){
    console.error(err);
    return json(500,{ok:false,error:String(err?.message||err)});
  }
};

export const config={path:'/api/compliance-watch'};
