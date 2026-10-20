import "server-only";
import { get, head, put, BlobNotFoundError } from "@vercel/blob";
import { hubStorageEnabled } from "@/lib/link-hub-store";
import { validateQRDesign, type QRDesign } from "@/lib/qr-design";
export type BrandKit={id:string;name:string;description:string;design:QRDesign;createdAt:string;updatedAt:string};
const path="link-hub/qr/brand-kits.json";
async function safeHead(){try{return await head(path)}catch(e){if(e instanceof BlobNotFoundError)return null;throw e}}
export async function readBrandKits():Promise<BrandKit[]>{
 if(!hubStorageEnabled())throw Error("Storage not available");
 const result=await get(path,{access:"private",useCache:false});
 if(!result)return [];
 if(!result.stream||result.statusCode!==200)throw Error("Could not read Brand Kits");
 return JSON.parse(await new Response(result.stream).text()) as BrandKit[];
}
export async function changeBrandKit(input:Record<string,unknown>):Promise<BrandKit[]>{
 for(let i=0;i<4;i++){
  const before=await safeHead(),old=await readBrandKits(),after=await safeHead();
  if(before?.etag!==after?.etag)continue;
  let next:BrandKit[];
  if(input.action==="remove"){
   if(typeof input.id!=="string")throw Error("Invalid Brand Kit");
   next=old.filter(x=>x.id!==input.id);
  }else if(input.action==="save"){
   const name=String(input.name||"").trim(),description=String(input.description||"").trim();
   if(!name||name.length>65||description.length>240)throw Error("Brand name must be 1–65 characters");
   const design=validateQRDesign(input.design);
   const existing=old.find(x=>x.id===input.id);
   const item:BrandKit={id:existing?.id||crypto.randomUUID(),name,description,design,
    createdAt:existing?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};
   if(!existing&&old.length>=40)throw Error("Maximum 40 Brand Kits");
   next=[...old.filter(x=>x.id!==item.id),item].sort((a,b)=>a.name.localeCompare(b.name));
  }else throw Error("Invalid Brand Kit action");
  try{
   await put(path,JSON.stringify(next),{access:"private",contentType:"application/json",
     allowOverwrite:Boolean(after),...(after?.etag?{ifMatch:after.etag}:{})});
   return next;
  }catch(e){if(i===3)throw e}
 }
 throw Error("Brand Kit update conflict; retry");
}
