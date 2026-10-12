// Shared, versioned presentation settings. Never changes the destination stored in ManagedQR.
export type ModuleStyle = "square" | "rounded" | "dots" | "soft";
export type EyeStyle = "square" | "rounded" | "circle";
export type QRFrame = "none" | "simple" | "ticket" | "label";
export type QRSize = "social" | "sticker" | "card" | "poster" | "table";
export type QRPreset = "classic" | "modern" | "dots" | "soft" | "luxury" | "tech" | "minimal" | "business" | "restaurant" | "event";
export type QRDesign = {
  preset: QRPreset; modules: ModuleStyle; eyes: EyeStyle;
  foreground: string; foregroundEnd: string; background: string; gradient: boolean; transparent: boolean;
  frame: QRFrame; frameText: string; logoPath: string; logoScale: number;
  size: QRSize;
};
export type QRDesignVersion = { id: string; name: string; createdAt: string; design: QRDesign };
export type QRDesignDocument = { slug: string; currentId: string | null; versions: QRDesignVersion[] };
export const qrSizes: Record<QRSize, { label: string; pixels: number; inches: string }> = {
  social: {label:"Social · 1080 px",pixels:1080,inches:"Digital sharing"},
  sticker: {label:"Sticker · 600 px",pixels:600,inches:"Approx. 2 in at 300 DPI"},
  card: {label:"Business card · 900 px",pixels:900,inches:"Approx. 3 in at 300 DPI"},
  poster: {label:"Poster · 2400 px",pixels:2400,inches:"Approx. 8 in at 300 DPI"},
  table: {label:"Table tent · 1500 px",pixels:1500,inches:"Approx. 5 in at 300 DPI"},
};
export const qrPresets: Array<{id:QRPreset; label:string; detail:string; foreground:string; foregroundEnd:string; background:string; modules:ModuleStyle; eyes:EyeStyle; gradient:boolean; frame:QRFrame}> = [
 {id:"classic",label:"Classic",detail:"Clean, timeless and reliable",foreground:"#172333",foregroundEnd:"#172333",background:"#FFFFFF",modules:"square",eyes:"square",gradient:false,frame:"none"},
 {id:"modern",label:"Modern",detail:"Rounded editorial",foreground:"#164A63",foregroundEnd:"#164A63",background:"#FFFFFF",modules:"rounded",eyes:"rounded",gradient:false,frame:"none"},
 {id:"dots",label:"Dot Grid",detail:"Minimal dotted modules",foreground:"#252A47",foregroundEnd:"#252A47",background:"#FFFFFF",modules:"dots",eyes:"circle",gradient:false,frame:"none"},
 {id:"soft",label:"Soft",detail:"Friendly curved finish",foreground:"#38365B",foregroundEnd:"#38365B",background:"#FFFFFF",modules:"soft",eyes:"rounded",gradient:false,frame:"none"},
 {id:"luxury",label:"Luxury",detail:"Champagne and charcoal",foreground:"#231E1A",foregroundEnd:"#6E5125",background:"#FFF8EA",modules:"rounded",eyes:"square",gradient:true,frame:"label"},
 {id:"tech",label:"Tech",detail:"Deep blue to teal",foreground:"#093458",foregroundEnd:"#0C6B60",background:"#F8FFFF",modules:"rounded",eyes:"rounded",gradient:true,frame:"none"},
 {id:"minimal",label:"Minimal",detail:"Monochrome Swiss style",foreground:"#101820",foregroundEnd:"#101820",background:"#FFFFFF",modules:"square",eyes:"square",gradient:false,frame:"simple"},
 {id:"business",label:"Business",detail:"Strong navy identity",foreground:"#102E51",foregroundEnd:"#102E51",background:"#FFFFFF",modules:"square",eyes:"rounded",gradient:false,frame:"label"},
 {id:"restaurant",label:"Restaurant",detail:"Warm menu presentation",foreground:"#4A241C",foregroundEnd:"#4A241C",background:"#FFF9F0",modules:"soft",eyes:"rounded",gradient:false,frame:"ticket"},
 {id:"event",label:"Events",detail:"Violet event accent",foreground:"#3D2360",foregroundEnd:"#623C8B",background:"#FFFFFF",modules:"dots",eyes:"rounded",gradient:true,frame:"label"},
];
export const defaultQRDesign: QRDesign = {
 preset:"classic",modules:"square",eyes:"square",foreground:"#172333",foregroundEnd:"#172333",
 background:"#FFFFFF",gradient:false,transparent:false,frame:"none",frameText:"SCAN ME",
 logoPath:"",logoScale:0.16,size:"social",
};
export function applyQRPreset(id: QRPreset, old: QRDesign): QRDesign {
 const p=qrPresets.find(x=>x.id===id)||qrPresets[0];
 return {...old,preset:p.id,foreground:p.foreground,foregroundEnd:p.foregroundEnd,
   background:p.background,modules:p.modules,eyes:p.eyes,gradient:p.gradient,frame:p.frame};
}
const isHex=(s:string)=>/^#[0-9A-Fa-f]{6}$/.test(s);
export function validateQRDesign(input: unknown): QRDesign {
 if(!input||typeof input!=="object")throw Error("Invalid design settings");
 const d=input as Record<string,unknown>;
 function one<T extends string>(field:string,values:readonly T[]):T {
   if(typeof d[field]!=="string"||!values.includes(d[field] as T))throw Error("Invalid "+field);
   return d[field] as T;
 }
 const preset=one("preset",qrPresets.map(x=>x.id));
 const modules=one("modules",["square","rounded","dots","soft"] as const);
 const eyes=one("eyes",["square","rounded","circle"] as const);
 const frame=one("frame",["none","simple","ticket","label"] as const);
 const size=one("size",["social","sticker","card","poster","table"] as const);
 const foreground=String(d.foreground||""),foregroundEnd=String(d.foregroundEnd||""),background=String(d.background||"");
 if(![foreground,foregroundEnd,background].every(isHex))throw Error("Colors must use six-digit hex.");
 if(typeof d.gradient!=="boolean"||typeof d.transparent!=="boolean")throw Error("Invalid background options.");
 if(typeof d.frameText!=="string"||d.frameText.length>36)throw Error("Frame text must be under 36 characters.");
 const frameText=d.frameText.replace(/[\x00-\x1f\x7f]/g," ").trim();
 if(typeof d.logoPath!=="string"|| (d.logoPath!=="" && !/^\/api\/link-hub\/media\/[0-9a-f-]{36}\.(png|jpg|webp)$/.test(d.logoPath)))throw Error("Choose a PNG, JPG or WebP logo uploaded to this account.");
 if(typeof d.logoScale!=="number"||!Number.isFinite(d.logoScale)||d.logoScale<0.10||d.logoScale>0.18)throw Error("Logo must be between 10% and 18% of QR width.");
 return {preset,modules,eyes,frame,size,foreground,foregroundEnd,background,gradient:d.gradient,transparent:d.transparent,
  frameText,logoPath:d.logoPath,logoScale:d.logoScale};
}
function luminance(hex:string) {
 const rgb=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);
 return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2];
}
export function designWarnings(d: QRDesign) {
 const bg=luminance(d.transparent?"#FFFFFF":d.background);
 const ratio=(color:string)=>{const f=luminance(color);return (Math.max(bg,f)+.05)/(Math.min(bg,f)+.05);};
 const low=Math.min(ratio(d.foreground),d.gradient?ratio(d.foregroundEnd):Infinity);
 const messages:string[]=[];
 if(low<4.5) messages.push("Low contrast ("+low.toFixed(1)+":1). Use darker code colors or a lighter background before printing.");
 if(d.transparent) messages.push("Transparent codes should only be printed on a plain, light background with a clear quiet zone.");
 if(d.logoPath) messages.push("Test a real scan at print size. Logo designs use high error correction and a protected center area.");
 if(d.gradient) messages.push("Complex printing can change gradient contrast. Test the physical print.");
 return {ratio:low,warnings:messages,unsafe:low<3};
}
