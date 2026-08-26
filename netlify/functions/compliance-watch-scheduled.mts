import { runComplianceWatch } from './compliance-watch-core.mts';

export default async () => {
  try{
    const result=await runComplianceWatch({deep:false,reason:'automatico-giornaliero'});
    console.log('3MATRIX Compliance Watch', JSON.stringify(result));
    return new Response('OK');
  }catch(err:any){
    console.error('3MATRIX Compliance Watch failed', err);
    return new Response('ERROR', {status:500});
  }
};

export const config={schedule:'15 4 * * *'};
