import "server-only";
import { BlobNotFoundError, get, head, list, put } from "@vercel/blob";
import { hubStorageEnabled } from "@/lib/link-hub-store";
import { readQRDesignDocument } from "@/lib/qr-design-store";

type Counter={version:string;day:string;count:number;channel?:"qr"|"nfc"};
const prefix=(slug:string)=>"link-hub/qr/scan-counts/"+slug+"/";
const validSlug=/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/;
const validVersion=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
async function safeHead(path:string){try{return await head(path)}catch(e){if(e instanceof BlobNotFoundError)return null;throw e}}
async function read(path:string):Promise<Counter|null>{
 const result=await get(path,{access:"private",useCache:false});
 if(!result)return null;
 if(result.statusCode!==200||!result.stream)throw Error("Scan counter unavailable");
 return JSON.parse(await new Response(result.stream).text()) as Counter;
}
export async function trackQRScan(slug:string,version:string|null,channel:"qr"|"nfc"="qr") {
 // Approximate, anonymous counts. Never store IP, user agent, cookies or identifying data.
 // This low-volume Blob adapter can be disabled; a transactional analytics backend is required for high traffic.
 if(process.env.QR_SCAN_TRACKING_ENABLED==="false"||!hubStorageEnabled()||!validSlug.test(slug))return;
 let name="legacy";
 if(version){
  if(!validVersion.test(version))return;
  const doc=await readQRDesignDocument(slug);
  if(!doc.versions.some(v=>v.id===version))return;
  name=version;
 }
 const day=new Date().toISOString().slice(0,10);
 const path=prefix(slug)+day+"-"+name+(channel==="nfc"?"-nfc":"")+".json";
 for(let i=0;i<4;i++){
  const before=await safeHead(path);
  const entry=await read(path);
  const after=await safeHead(path);
  if(before?.etag!==after?.etag)continue;
  if((entry?.count||0)>=10000)return;
  const next:Counter={version:name,day,count:(entry?.count||0)+1,channel};
  try{
   await put(path,JSON.stringify(next),{access:"private",contentType:"application/json",allowOverwrite:Boolean(after),
    ...(after?.etag?{ifMatch:after.etag}:{})});
   return;
  }catch{/* Conflict: retry on another read without delaying public redirect */}
 }
}
export async function qrScanSummary(slug:string,days=30) {
 if(!validSlug.test(slug))throw Error("Invalid QR slug");
 if(!hubStorageEnabled())throw Error("Storage is unavailable");
 const windowDays=[7,30,90].includes(days)?days:30;
 const cutoff=new Date(Date.now()-(windowDays-1)*86400000).toISOString().slice(0,10);
 const paths:string[]=[];let cursor:string|undefined;
 do{
  const page=await list({prefix:prefix(slug),cursor,limit:1000});
  paths.push(...page.blobs.map(x=>x.pathname).filter(x=>x.slice(prefix(slug).length,prefix(slug).length+10)>=cutoff));
  cursor=page.hasMore?page.cursor:undefined;
 }while(cursor);
 const byVersion:Record<string,number>={},byDay:Record<string,number>={},byChannel={qr:0,nfc:0};
 for(let i=0;i<paths.length;i+=15){
  const entries=await Promise.all(paths.slice(i,i+15).map(read));
  for(const row of entries)if(row){
   byVersion[row.version]=(byVersion[row.version]||0)+row.count;
   byDay[row.day]=(byDay[row.day]||0)+row.count;
   byChannel[row.channel==="nfc"?"nfc":"qr"]+=row.count;
  }
 }
 const total=Object.values(byVersion).reduce((x,y)=>x+y,0);
 return {total,byVersion,byDay,byChannel,windowDays,approximate:true,enabled:process.env.QR_SCAN_TRACKING_ENABLED!=="false"};
}
