import "server-only";
import { list,put,get } from "@vercel/blob";
import { hubStorageEnabled } from "@/lib/link-hub-store";
export type QRActivity={event:"qr.created"|"qr.updated"|"qr.bulk-created"|"brand.updated";slug?:string;details?:string;at:string};
export async function writeQRActivity(event:QRActivity["event"],slug?:string,details?:string){
 if(!hubStorageEnabled())return;
 const at=new Date().toISOString(),path="link-hub/audit/"+at.slice(0,10)+"/"+at.replace(/[:.]/g,"-")+"-"+crypto.randomUUID()+".json";
 await put(path,JSON.stringify({event,slug,details:details?.slice(0,180),at} satisfies QRActivity),{access:"private",contentType:"application/json"});
}
export async function listQRActivity():Promise<QRActivity[]>{
 const p=await list({prefix:"link-hub/audit/",limit:1000});
 const paths=p.blobs.sort((a,b)=>b.pathname.localeCompare(a.pathname)).slice(0,40).map(x=>x.pathname);
 const rows=await Promise.all(paths.map(async path=>{
  const result=await get(path,{access:"private",useCache:false});
  return result?.stream?JSON.parse(await new Response(result.stream).text()) as QRActivity:null;
 }));
 return rows.filter((x):x is QRActivity=>x!==null);
}
