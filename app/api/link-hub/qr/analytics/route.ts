import { NextResponse } from "next/server";
import { hasHubSession } from "@/lib/link-hub-auth";
import { readManagedQR } from "@/lib/qr-manager";
import { qrScanSummary } from "@/lib/qr-scan-analytics";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function GET(request:Request) {
 const headers={"Cache-Control":"no-store"};
 if(!(await hasHubSession()))return NextResponse.json({error:"Unauthorized"},{status:401,headers});
 const slug=new URL(request.url).searchParams.get("slug")||"";
 try{
   if(!(await readManagedQR(slug)))return NextResponse.json({error:"QR not found"},{status:404,headers});
   return NextResponse.json(await qrScanSummary(slug),{headers});
 }catch{return NextResponse.json({error:"Scan analytics unavailable"},{status:503,headers})}
}
