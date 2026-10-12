import QRCode from "qrcode";
import { type QRDesign } from "@/lib/qr-design";

export const permanentQRUrl=(slug:string,versionId?:string|null)=>{
 const url=new URL("https://links.nebiyumekonnen.com/q/"+slug);
 if(versionId)url.searchParams.set("v",versionId);
 return url.toString();
};
const escapeXML=(str:string)=>str.replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"}[c]||c));
const r2=(n:number)=>Math.round(n*100)/100;
function xmlRect(x:number,y:number,w:number,h:number,rx:number,fill:string){
 return '<rect x="'+r2(x)+'" y="'+r2(y)+'" width="'+r2(w)+'" height="'+r2(h)+'" rx="'+r2(rx)+'" fill="'+fill+'"/>';
}
function eyeMarkup(x:number,y:number,unit:number,style:QRDesign["eyes"],fill:string,bg:string){
 const corner=style==="square"?0:style==="circle"?3.5*unit:1.5*unit;
 const hole=style==="square"?0:style==="circle"?2.5*unit:unit;
 const middle=style==="square"?0:style==="circle"?1.5*unit:.8*unit;
 return xmlRect(x,y,unit*7,unit*7,corner,fill)+
        xmlRect(x+unit,y+unit,unit*5,unit*5,hole,bg)+
        xmlRect(x+unit*2,y+unit*2,unit*3,unit*3,middle,fill);
}
export function makeQRSvg(url:string,d:QRDesign,embeddedLogo?:string):string{
 const code=QRCode.create(url,{errorCorrectionLevel:"H"});
 const size=code.modules.size;
 const outer=1000, framed=d.frame!=="none", height=framed?1190:1000;
 const unit=800/(size+8);
 const offsetX=100+unit*4;
 const offsetY=framed?110+unit*4:100+unit*4;
 const gradientId="qr-foreground";
 const ink=d.gradient?"url(#"+gradientId+")":d.foreground;
 const paper=d.transparent?"none":d.background;
 const bgInk=d.transparent?"#FFFFFF":d.background;
 const modules:string[]=[];
 const isEye=(x:number,y:number)=>(
   (x<8 && y<8)||(x>=size-8 && y<8)||(x<8 && y>=size-8)
 );
 // Body patterns do not alter timing/alignment areas except for their visual shape.
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
   if(isEye(x,y)||!code.modules.get(y,x))continue;
   const px=offsetX+x*unit,py=offsetY+y*unit;
   if(d.modules==="dots")modules.push('<circle cx="'+r2(px+unit/2)+'" cy="'+r2(py+unit/2)+'" r="'+r2(unit*.44)+'" fill="'+ink+'"/>');
   else if(d.modules==="soft")modules.push(xmlRect(px+unit*.04,py+unit*.04,unit*.92,unit*.92,unit*.28,ink));
   else if(d.modules==="rounded")modules.push(xmlRect(px+unit*.025,py+unit*.025,unit*.95,unit*.95,unit*.19,ink));
   else modules.push(xmlRect(px,py,unit,unit,0,ink));
 }
 const eyes=[
   eyeMarkup(offsetX,offsetY,unit,d.eyes,d.foreground,bgInk),
   eyeMarkup(offsetX+(size-7)*unit,offsetY,unit,d.eyes,d.foreground,bgInk),
   eyeMarkup(offsetX,offsetY+(size-7)*unit,unit,d.eyes,d.foreground,bgInk),
 ].join("");
 const accent=d.foreground;
 const background=xmlRect(0,0,outer,height,d.frame==="ticket"?30:0,paper);
 const frameBody=framed?(
    d.frame==="ticket" ? xmlRect(34,34,932,height-68,34,"none").replace('fill="none"','fill="none" stroke="'+accent+'" stroke-width="7" stroke-dasharray="22 13"')
    :xmlRect(38,38,924,height-76,d.frame==="label"?35:15,"none").replace('fill="none"','fill="none" stroke="'+accent+'" stroke-width="6"')
  ):"";
 const frameText=framed?'<text x="500" y="1095" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="53" font-weight="800" letter-spacing="3" fill="'+accent+'">'+escapeXML(d.frameText||"SCAN ME")+"</text>":"";
 let logo="";
 if(d.logoPath && embeddedLogo && /^data:image\/(png|jpeg|webp);base64,/i.test(embeddedLogo)){
   const centerY=offsetY+size*unit/2;
   const wh=800*d.logoScale;
   const shell=wh+unit*2.3;
   logo=xmlRect(500-shell/2,centerY-shell/2,shell,shell,shell*.17,bgInk)+
     '<image href="'+embeddedLogo+'" x="'+r2(500-wh/2)+'" y="'+r2(centerY-wh/2)+'" width="'+r2(wh)+'" height="'+r2(wh)+'" preserveAspectRatio="xMidYMid meet"/>';
 }
 const defs=d.gradient?'<defs><linearGradient id="'+gradientId+'" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="'+d.foreground+'"/><stop offset="100%" stop-color="'+d.foregroundEnd+'"/></linearGradient></defs>':"";
 return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+outer+'" height="'+height+'" viewBox="0 0 '+outer+' '+height+'" role="img" aria-label="QR code">'+defs+background+frameBody+modules.join("")+eyes+logo+frameText+"</svg>";
}
export async function loadLogoData(path:string):Promise<string>{
 if(!/^\/api\/link-hub\/media\/[0-9a-f-]{36}\.(png|jpg|webp)$/.test(path))throw Error("Invalid logo path");
 const response=await fetch(path,{cache:"force-cache",credentials:"same-origin"});
 if(!response.ok)throw Error("Logo cannot be loaded");
 const blob=await response.blob();
 if(!["image/png","image/jpeg","image/webp"].includes(blob.type)||blob.size>2_000_000)throw Error("Logo file is too large or unsupported");
 return await new Promise<string>((resolve,reject)=>{
   const reader=new FileReader();
   reader.onload=()=>resolve(String(reader.result));reader.onerror=()=>reject(Error("Cannot read logo"));
   reader.readAsDataURL(blob);
 });
}
export async function svgToCanvas(svg:string,width:number):Promise<HTMLCanvasElement>{
 const blob=new Blob([svg],{type:"image/svg+xml;charset=utf-8"});
 const objectUrl=URL.createObjectURL(blob);
 try{
   const image=await new Promise<HTMLImageElement>((resolve,reject)=>{
     const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>reject(Error("QR render failed"));img.src=objectUrl;
   });
   const canvas=document.createElement("canvas");
   canvas.width=width;canvas.height=Math.round(width*image.height/image.width);
   const ctx=canvas.getContext("2d");
   if(!ctx)throw Error("Canvas is not available");
   ctx.drawImage(image,0,0,canvas.width,canvas.height);
   return canvas;
 }finally{URL.revokeObjectURL(objectUrl)}
}
export async function checkQRScan(svg:string,expected:string):Promise<"pass"|"fail"|"unsupported">{
 const Detector=(globalThis as unknown as {BarcodeDetector?:new(opts:{formats:string[]})=>{detect:(image:HTMLCanvasElement)=>Promise<Array<{rawValue:string}> >}}).BarcodeDetector;
 if(!Detector)return "unsupported";
 try{
   const canvas=await svgToCanvas(svg,920);
   const codes=await new Detector({formats:["qr_code"]}).detect(canvas);
   return codes.some(code=>code.rawValue===expected)?"pass":"fail";
 }catch{return "unsupported"}
}
