import "server-only";
import { BlobNotFoundError, get, head, put } from "@vercel/blob";
import { hubStorageEnabled } from "@/lib/link-hub-store";
import { readManagedQR } from "@/lib/qr-manager";
import { defaultQRDesign, validateQRDesign, type QRDesignDocument, type QRDesignVersion } from "@/lib/qr-design";

const pattern=/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/;
const pathFor=(slug:string)=>"link-hub/qr/designs/"+slug+".json";
async function safeHead(path:string) {try {return await head(path)}catch(e){if(e instanceof BlobNotFoundError)return null;throw e}}
export async function readQRDesignDocument(slug:string):Promise<QRDesignDocument> {
 if(!pattern.test(slug))throw Error("Invalid QR code");
 if(!hubStorageEnabled())throw Error("QR storage is not available");
 const response=await get(pathFor(slug),{access:"private",useCache:false});
 if(!response)return {slug,currentId:null,versions:[]};
 if(response.statusCode!==200||!response.stream)throw Error("Unable to read QR designs");
 const parsed=JSON.parse(await new Response(response.stream).text()) as QRDesignDocument;
 return {slug,currentId:parsed.currentId||null,versions:Array.isArray(parsed.versions)?parsed.versions:[]};
}
export async function saveQRDesign(slug:string,design:unknown,name:unknown):Promise<QRDesignDocument> {
 if(!(await readManagedQR(slug)))throw Error("QR code not found");
 const clean=validateQRDesign(design);
 const label=typeof name==="string"?name.trim():"";
 if(label.length>60)throw Error("Design version name is too long");
 const path=pathFor(slug);
 for(let tries=0;tries<3;tries++){
   const before=await safeHead(path);
   const existing=await readQRDesignDocument(slug);
   const after=await safeHead(path);
   if(before?.etag!==after?.etag)continue;
   if(existing.versions.length>=80)throw Error("Maximum 80 saved designs reached. Export your designs before adding more.");
   const version:QRDesignVersion={id:crypto.randomUUID(),name:label||"Design "+(existing.versions.length+1),createdAt:new Date().toISOString(),design:clean};
   const next:QRDesignDocument={slug,currentId:version.id,versions:[...existing.versions,version]};
   try {
     await put(path,JSON.stringify(next),{access:"private",contentType:"application/json",allowOverwrite:Boolean(after),
       ...(after?.etag?{ifMatch:after.etag}:{})});
     return next;
   }catch(e){if(tries===2)throw e}
 }
 throw Error("Design changed elsewhere. Refresh and retry.");
}
export async function activateQRDesign(slug:string,id:unknown):Promise<QRDesignDocument> {
 if(typeof id!=="string")throw Error("Invalid design version");
 const path=pathFor(slug);
 for(let tries=0;tries<3;tries++){
   const before=await safeHead(path);
   const document=await readQRDesignDocument(slug);
   const after=await safeHead(path);
   if(before?.etag!==after?.etag)continue;
   if(!document.versions.some(v=>v.id===id))throw Error("Design version not found");
   const next={...document,currentId:id};
   try {
     await put(path,JSON.stringify(next),{access:"private",contentType:"application/json",allowOverwrite:true,
       ...(after?.etag?{ifMatch:after.etag}:{})});
     return next;
   }catch(e){if(tries===2)throw e}
 }
 throw Error("Design changed elsewhere. Refresh and retry.");
}
export function displayCurrentDesign(doc:QRDesignDocument) {
 return doc.versions.find(v=>v.id===doc.currentId)?.design||defaultQRDesign;
}
