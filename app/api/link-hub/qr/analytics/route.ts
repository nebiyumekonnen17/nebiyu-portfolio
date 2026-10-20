import { NextResponse } from "next/server";
import { hasHubSession } from "@/lib/link-hub-auth";
import { readManagedQR } from "@/lib/qr-manager";
import { qrScanSummary } from "@/lib/qr-scan-analytics";
export const runtime="nodejs";export const dynamic="force-dynamic";
export async function GET(request:Request){
 const headers={"Cache-Control":"no-store"};
 if(!(await hasHubSession()))return NextResponse.json({error:"Unauthorized"},{status:401,headers});
 const url=new URL(request.url),slug=url.searchParams.get("slug")||"",days=Number(url.searchParams.get("days")||"30");
 try{
  if(!(await readManagedQR(slug)))return NextResponse.json({error:"QR not found"},{status:404,headers});
  const report=await qrScanSummary(slug,days);
  if(url.searchParams.get("format")==="csv"){
   const rows=["date,recorded_scans",...Object.entries(report.byDay).sort(([a],[b])=>a.localeCompare(b)).map(([date,count])=>date+","+count)];
   return new Response(rows.join("\r\n"),{headers:{"Cache-Control":"no-store","Content-Type":"text/csv; charset=utf-8","Content-Disposition":'attachment; filename="qr-'+slug+'-report.csv"'}});
  }
  return NextResponse.json(report,{headers});
 }catch{return NextResponse.json({error:"Scan analytics unavailable"},{status:503,headers})}
}
