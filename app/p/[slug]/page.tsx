import Link from "next/link";
import { notFound } from "next/navigation";
import { readManagedQR, resolveManagedQR } from "@/lib/qr-manager";
import type { Metadata } from "next";
export const dynamic="force-dynamic";
export const metadata:Metadata={robots:{index:false,follow:false},title:"Continue | Links Studio"};
export default async function QRLanding({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 const item=await readManagedQR(slug);
 if(!item||resolveManagedQR(item).kind==="paused")notFound();
 const state=resolveManagedQR(item);
 if(state.kind==="expired")return <main style={{minHeight:"100vh",display:"grid",placeItems:"center",background:"#0d1727",color:"#f2f7fc",padding:24,fontFamily:"Arial,sans-serif"}}><section style={{maxWidth:460,textAlign:"center"}}><h1>This experience has ended</h1><p>The original QR code is still owned by its creator.</p></section></main>;
 const row=item.landing;
 return <main style={{minHeight:"100vh",display:"grid",placeItems:"center",background:"radial-gradient(ellipse at top right,#223c58,transparent 55%),#0b1524",color:"#f4f8fe",padding:22,fontFamily:"Arial,sans-serif"}}>
   <article style={{width:"min(100%,520px)",background:"#15253a",border:"1px solid #385470",borderRadius:22,padding:35,boxShadow:"0 22px 66px #050a1266",textAlign:"center"}}>
    <div style={{fontSize:12,letterSpacing:3,color:"#9acfff",marginBottom:34}}>LINKS STUDIO</div>
    <div style={{fontSize:38,marginBottom:16}}>↗</div>
    <h1 style={{fontSize:31,letterSpacing:"-.04em"}}>{row?.heading||item.title}</h1>
    <p style={{fontSize:15,color:"#bad0e4",lineHeight:1.8,whiteSpace:"pre-wrap"}}>{row?.description||"Thanks for scanning. Continue to the destination using the link below."}</p>
    <Link href={state.kind==="landing"?state.target:item.target} target="_self" rel="noreferrer" style={{display:"block",marginTop:28,background:"#96d1ff",color:"#102337",padding:"15px 20px",borderRadius:12,fontWeight:800,textDecoration:"none"}}>{row?.buttonLabel||"Continue"}</Link>
    <p style={{fontSize:11,color:"#879fb5",marginTop:25}}>Managed dynamic link · Your destination may be updated</p>
   </article>
 </main>;
}
