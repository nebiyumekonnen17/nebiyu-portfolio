import { NextResponse } from "next/server";
import { hasHubSession, sameOrigin } from "@/lib/link-hub-auth";
import { activateQRDesign, readQRDesignDocument, saveQRDesign } from "@/lib/qr-design-store";
export const runtime="nodejs";
export const dynamic="force-dynamic";
const headers={"Cache-Control":"no-store"};
export async function GET(request:Request) {
 if(!(await hasHubSession()))return NextResponse.json({error:"Unauthorized"},{status:401,headers});
 const slug=new URL(request.url).searchParams.get("slug")||"";
 try {return NextResponse.json({document:await readQRDesignDocument(slug)},{headers})}
 catch{return NextResponse.json({error:"QR designs unavailable"},{status:400,headers})}
}
export async function POST(request:Request) {
 if(!sameOrigin(request))return NextResponse.json({error:"Invalid origin"},{status:403,headers});
 if(!(await hasHubSession()))return NextResponse.json({error:"Unauthorized"},{status:401,headers});
 if(Number(request.headers.get("content-length")||0)>9000)return NextResponse.json({error:"Too much design data"},{status:413,headers});
 try {
   const body=await request.json();
   const doc=body.action==="save"?await saveQRDesign(body.slug,body.design,body.name)
     :body.action==="activate"?await activateQRDesign(body.slug,body.id):null;
   if(!doc)return NextResponse.json({error:"Unsupported action"},{status:400,headers});
   return NextResponse.json({document:doc},{headers});
 }catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Could not save design"},{status:400,headers})}
}
