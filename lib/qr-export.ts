import { svgToCanvas } from "@/lib/qr-artwork";
import { type QRSize, qrSizes } from "@/lib/qr-design";
export function downloadBlob(blob:Blob,name:string) {
 const url=URL.createObjectURL(blob);
 const link=document.createElement("a");link.href=url;link.download=name;link.click();
 window.setTimeout(()=>URL.revokeObjectURL(url),12000);
}
export function saveSvg(svg:string,name:string){
 downloadBlob(new Blob([svg],{type:"image/svg+xml;charset=utf-8"}),name+".svg");
}
export async function savePng(svg:string,name:string,size:QRSize){
 const canvas=await svgToCanvas(svg,qrSizes[size].pixels);
 const blob=await new Promise<Blob|null>(resolve=>canvas.toBlob(resolve,"image/png"));
 if(!blob)throw Error("Could not export PNG");
 downloadBlob(blob,name+".png");
}
// A self-contained single-page PDF exporter. JPEG XObject is embedded at print dimensions,
// so the user receives a real downloadable PDF without an extra paid service or dependency.
export async function savePdf(svg:string,name:string,size:QRSize){
 const canvas=await svgToCanvas(svg,Math.min(qrSizes[size].pixels,2400));
 // Opaque paper is required for consistent print results.
 const opaque=document.createElement("canvas");opaque.width=canvas.width;opaque.height=canvas.height;
 const ctx=opaque.getContext("2d");if(!ctx)throw Error("Canvas not available");
 ctx.fillStyle="#FFFFFF";ctx.fillRect(0,0,opaque.width,opaque.height);ctx.drawImage(canvas,0,0);
 const jpeg=opaque.toDataURL("image/jpeg",.96).split(",")[1];
 const bytes=Uint8Array.from(atob(jpeg),c=>c.charCodeAt(0));
 const inches:{[K in QRSize]:number}={social:6,sticker:2,card:3,poster:8,table:5};
 const width=Math.round(inches[size]*72),height=Math.round(width*opaque.height/opaque.width);
 const encoder=new TextEncoder();
 const chunks:Uint8Array[]=[];const offsets=[0];let position=0;
 function add(s:string|Uint8Array){const b=typeof s==="string"?encoder.encode(s):s;chunks.push(b);position+=b.length;}
 function obj(i:number,body:string){offsets[i]=position;add(i+" 0 obj\n"+body+"\nendobj\n")}
 add("%PDF-1.4\n");
 obj(1,"<< /Type /Catalog /Pages 2 0 R >>");
 obj(2,"<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
 obj(3,"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 "+width+" "+height+"] /Resources << /XObject << /I1 4 0 R >> >> /Contents 5 0 R >>");
 offsets[4]=position;
 add("4 0 obj\n<< /Type /XObject /Subtype /Image /Width "+opaque.width+" /Height "+opaque.height+" /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length "+bytes.length+" >>\nstream\n");
 add(bytes);add("\nendstream\nendobj\n");
 const stream="q\n"+width+" 0 0 "+height+" 0 0 cm\n/I1 Do\nQ\n";
 obj(5,"<< /Length "+encoder.encode(stream).length+" >>\nstream\n"+stream+"endstream");
 const xrefStart=position;add("xref\n0 6\n0000000000 65535 f \n");
 for(let i=1;i<=5;i++)add(String(offsets[i]).padStart(10,"0")+" 00000 n \n");
 add("trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n"+xrefStart+"\n%%EOF");
 downloadBlob(new Blob(chunks as BlobPart[],{type:"application/pdf"}),name+".pdf");
}
