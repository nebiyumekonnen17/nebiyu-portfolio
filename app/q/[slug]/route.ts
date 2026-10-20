import { NextResponse, after } from "next/server";
import { readManagedQR, resolveManagedQR } from "@/lib/qr-manager";
import { trackQRScan } from "@/lib/qr-scan-analytics";

export const runtime="nodejs";
export const dynamic="force-dynamic";
const headers={
 "Cache-Control":"private, no-store, max-age=0",
 "CDN-Cache-Control":"no-store",
 "Vercel-CDN-Cache-Control":"no-store",
 "Referrer-Policy":"no-referrer",
};
export async function GET(request:Request,context:{params:Promise<{slug:string}>}){
 const {slug}=await context.params;
 try{
  const item=await readManagedQR(slug);
  if(!item)return new Response("QR code not found.",{status:404,headers});
  const state=resolveManagedQR(item);
  if(state.kind==="paused")return new Response("This QR code is currently paused.",{status:410,headers});
  if(state.kind==="expired")return new Response("This QR code has expired.",{status:410,headers});
  const input=new URL(request.url);
  const version=input.searchParams.get("v");
  const channel=input.searchParams.get("src")==="nfc"?"nfc":"qr";
  if(process.env.QR_SCAN_TRACKING_ENABLED!=="false"){
   after(async()=>{try{await trackQRScan(slug,version,channel)}catch{/* analytics never break redirects */}});
  }
  const target=state.kind==="landing"
    ?new URL("/p/"+encodeURIComponent(slug),input.origin).toString()
    :state.target;
  return NextResponse.redirect(target,{status:302,headers});
 }catch{
  return new Response("QR redirection is temporarily unavailable.",{status:503,headers});
 }
}
