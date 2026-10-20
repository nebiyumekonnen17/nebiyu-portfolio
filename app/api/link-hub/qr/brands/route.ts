import { NextResponse } from "next/server";
import { hasHubSession, sameOrigin } from "@/lib/link-hub-auth";
import { readBrandKits, changeBrandKit } from "@/lib/qr-brand-kits";
export const runtime="nodejs";export const dynamic="force-dynamic";
const h={"Cache-Control":"no-store"};
export async function GET(){
 if(!(await hasHubSession()))return NextResponse.json({error:"Unauthorized"},{status:401,headers:h});
 try{return NextResponse.json({items:await readBrandKits()},{headers:h})}
 catch{return NextResponse.json({error:"Brand Kits unavailable"},{status:503,headers:h})}
}
export async function POST(req:Request){
 if(!sameOrigin(req))return NextResponse.json({error:"Invalid origin"},{status:403,headers:h});
 if(!(await hasHubSession()))return NextResponse.json({error:"Unauthorized"},{status:401,headers:h});
 if(Number(req.headers.get("content-length")||0)>10000)return NextResponse.json({error:"Too large"},{status:413,headers:h});
 try{return NextResponse.json({items:await changeBrandKit(await req.json())},{headers:h})}
 catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Could not save"},{status:400,headers:h})}
}
