import { NextResponse } from "next/server";
import { hasHubSession } from "@/lib/link-hub-auth";
import { listQRActivity } from "@/lib/qr-audit";
export const runtime="nodejs";export const dynamic="force-dynamic";
export async function GET(){
 const headers={"Cache-Control":"no-store"};
 if(!(await hasHubSession()))return NextResponse.json({error:"Unauthorized"},{status:401,headers});
 try{return NextResponse.json({events:await listQRActivity()},{headers})}
 catch{return NextResponse.json({error:"Activity history unavailable"},{status:503,headers})}
}
