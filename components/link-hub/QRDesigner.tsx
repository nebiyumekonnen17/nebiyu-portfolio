"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowUpRight, Check, CheckCheck, ChevronRight, Copy, Download, Eye,
  FileImage, FileText, ImagePlus, Info, Layers3, Loader2, LockKeyhole, Palette,
  QrCode, RotateCcw, Save, ScanLine, ShieldCheck, Sparkles, TrendingUp, Upload, X,
} from "lucide-react";
import { StudioLogin } from "@/components/link-hub/StudioLogin";
import { makeQRSvg, loadLogoData, permanentQRUrl, checkQRScan } from "@/lib/qr-artwork";
import { savePng, savePdf, saveSvg } from "@/lib/qr-export";
import {
  applyQRPreset, defaultQRDesign, designWarnings, qrPresets, qrSizes,
  type QRDesign, type QRDesignDocument, type QRDesignVersion, type QRPreset,
} from "@/lib/qr-design";

type Panel="templates"|"customize"|"logo"|"frame"|"download"|"analytics";
type QR={slug:string;title:string;target:string;enabled:boolean};
type Analytics={total:number;byVersion:Record<string,number>;byDay:Record<string,number>;windowDays:number;approximate:boolean;enabled:boolean};
async function api(url:string,options?:RequestInit){
 const response=await fetch(url,{credentials:"same-origin",cache:"no-store",...options});
 const json=await response.json();
 if(!response.ok)throw Error(json.error||"Request failed");
 return json;
}
const panels:Array<{id:Panel;label:string;icon:typeof Sparkles}>= [
 {id:"templates",label:"Templates",icon:Sparkles},
 {id:"customize",label:"Shapes & colors",icon:Palette},
 {id:"logo",label:"Center logo",icon:ImagePlus},
 {id:"frame",label:"Frame & text",icon:Layers3},
 {id:"download",label:"Export",icon:Download},
 {id:"analytics",label:"Analytics",icon:TrendingUp},
];
function slugLabel(d:QRDesign,doc:QRDesignDocument|null,id:string|null){
 return doc?.versions.find(x=>x.id===id)?.name || qrPresets.find(x=>x.id===d.preset)?.label || "Custom";
}
const initials={};
export function QRDesigner({slug}:{slug:string}){
 const[loading,setLoading]=useState(true);
 const[authenticated,setAuthenticated]=useState(false);
 const[configured,setConfigured]=useState(true);
 const[twoFactorEnabled,setTwoFactorEnabled]=useState(false);
 const[qr,setQR]=useState<QR|null>(null);
 const[doc,setDoc]=useState<QRDesignDocument|null>(null);
 const[draft,setDraft]=useState<QRDesign>(defaultQRDesign);
 const[chosenId,setChosenId]=useState<string|null>(null);
 const[dirty,setDirty]=useState(false);
 const[panel,setPanel]=useState<Panel>("templates");
 const[versionName,setVersionName]=useState("");
 const[rendered,setRendered]=useState<{key:string;svg:string;url:string}|null>(null);
 const[busy,setBusy]=useState(false);
 const[error,setError]=useState("");
 const[notice,setNotice]=useState("");
 const[scanState,setScanState]=useState<"idle"|"testing"|"pass"|"fail"|"unsupported">("idle");
 const[analytics,setAnalytics]=useState<Analytics|null>(null);
 const[analyticsError,setAnalyticsError]=useState("");
 const saved=doc?.versions.find(v=>v.id===chosenId)||null;
 const url=permanentQRUrl(slug,chosenId);
 const previewKey=JSON.stringify([slug,chosenId,draft]);
 const ready=rendered?.key===previewKey;
 const {warnings,ratio,unsafe}=designWarnings(draft);
 const examples=useMemo(()=>qrPresets.map(p=>({
   preset:p,svg:makeQRSvg(permanentQRUrl(slug),applyQRPreset(p.id,defaultQRDesign)),
 })),[slug]);

 const reload=useCallback(async()=>{
   const [all,design]=await Promise.all([
     api("/api/link-hub/qr"),
     api("/api/link-hub/qr/design?slug="+encodeURIComponent(slug)),
   ]);
   const found=(all.items as QR[]).find(x=>x.slug===slug);
   if(!found)throw Error("That QR code could not be found.");
   setQR(found);setDoc(design.document);
   const active=(design.document as QRDesignDocument).versions.find(x=>x.id===design.document.currentId);
   setChosenId(active?.id||null);
   setDraft(active?.design||defaultQRDesign);
   setDirty(false);
 },[slug]);
 useEffect(()=>{
   let live=true;
   api("/api/link-hub/session").then(async session=>{
     if(!live)return;
     setAuthenticated(session.authenticated);
     setConfigured(session.configured);
     setTwoFactorEnabled(session.twoFactorEnabled);
     if(session.authenticated)await reload();
   }).catch(e=>{if(live)setError(e.message);}).finally(()=>{if(live)setLoading(false);});
   return()=>{live=false};
 },[reload]);
 useEffect(()=>{
   let live=true;
   const expected=url;
   (async()=>{
     const logo=draft.logoPath?await loadLogoData(draft.logoPath):"";
     const svg=makeQRSvg(expected,draft,logo);
     if(live)setRendered({key:previewKey,svg,url:expected});
   })().catch(e=>{if(live)setError(e instanceof Error?e.message:"Preview could not be generated.")});
   return()=>{live=false};
 },[previewKey,draft,url]);
 useEffect(()=>{
   if(panel!=="analytics"||!authenticated||!qr)return;
   let live=true;
   api("/api/link-hub/qr/analytics?slug="+encodeURIComponent(slug)).then(data=>{
     if(live){setAnalytics(data);setAnalyticsError("");}
   }).catch(e=>{if(live)setAnalyticsError(e.message)});
   return()=>{live=false};
 },[panel,authenticated,qr,slug]);
 function change(patch:Partial<QRDesign>){
   setDraft(old=>({...old,...patch}));setDirty(true);
   setScanState("idle");setNotice("");setError("");
 }
 function applyPreset(id:QRPreset){
   setDraft(old=>applyQRPreset(id,old));setDirty(true);setScanState("idle");
 }
 function selectVersion(v:QRDesignVersion){
   setDraft(v.design);setChosenId(v.id);setDirty(false);
   setVersionName("");setScanState("idle");setNotice("Loaded saved version: "+v.name);
 }
 async function uploadLogo(file:File){
   if(!["image/png","image/jpeg","image/webp"].includes(file.type)||file.size>2_000_000){
     setError("Choose a PNG, JPG or WebP logo under 2 MB. SVG uploads are not supported.");return;
   }
   setBusy(true);setError("");
   try{
     const form=new FormData();form.set("file",file);form.set("purpose","qr-logo");
     const response=await api("/api/link-hub/upload",{method:"POST",body:form});
     change({logoPath:response.path});setNotice("Logo uploaded. Save this QR design to keep it.");
   }catch(e){setError(e instanceof Error?e.message:"Logo upload failed");}
   finally{setBusy(false);}
 }
 async function verify(svg:string,expected:string){
   setScanState("testing");
   const result=await checkQRScan(svg,expected);
   setScanState(result);
   return result;
 }
 async function save(){
   if(!qr||!ready||!rendered)return;
   if(unsafe){setError("Contrast is too low to save safely. Choose darker ink or a lighter background.");return;}
   setBusy(true);setError("");setNotice("");
   try{
     const result=await verify(rendered.svg,url);
     if(result==="fail")throw Error("Scan check failed. Adjust the design or remove the logo, then try again.");
     const response=await api("/api/link-hub/qr/design",{
       method:"POST",headers:{"Content-Type":"application/json"},
       body:JSON.stringify({action:"save",slug,design:draft,name:versionName||qrPresets.find(x=>x.id===draft.preset)?.label}),
     });
     const updated=response.document as QRDesignDocument;
     setDoc(updated);setChosenId(updated.currentId);setDirty(false);setVersionName("");
     setNotice(result==="pass"?"Saved and verified by this browser's QR scanner.":"Design saved. Your browser cannot automatically scan-check this design; test with a phone before printing.");
   }catch(e){setError(e instanceof Error?e.message:"Unable to save design");}
   finally{setBusy(false);}
 }
 async function makeActive(){
   if(!chosenId||busy||dirty)return;
   setBusy(true);setError("");
   try{
     const response=await api("/api/link-hub/qr/design",{method:"POST",headers:{"Content-Type":"application/json"},
       body:JSON.stringify({action:"activate",slug,id:chosenId})});
     setDoc(response.document);setNotice("This saved look is now the default design for this QR.");
   }catch(e){setError(e instanceof Error?e.message:"Could not activate version");}
   finally{setBusy(false);}
 }
 async function exportFile(type:"png"|"svg"|"pdf"){
   if(!ready||!rendered||dirty||!saved){setError("Save this design version before exporting it.");return;}
   if(unsafe){setError("Increase QR contrast before downloading.");return;}
   setBusy(true);setError("");
   try{
     const check=await verify(rendered.svg,rendered.url);
     if(check==="fail")throw Error("This design did not pass the browser QR scanner. Make it more scannable before exporting.");
     const filename=slug+"-"+saved.name.toLowerCase().replace(/[^a-z0-9]+/g,"-")+"-"+saved.id.slice(0,8);
     if(type==="svg")saveSvg(rendered.svg,filename);
     if(type==="png")await savePng(rendered.svg,filename,draft.size);
     if(type==="pdf")await savePdf(rendered.svg,filename,draft.size);
     setNotice(check==="unsupported"?"File exported. Verify a printed sample with a real phone before distributing.":"Design exported and browser scan check passed.");
   }catch(e){setError(e instanceof Error?e.message:"Export failed");}
   finally{setBusy(false);}
 }
 async function copy(){
   try{await navigator.clipboard.writeText(url);setNotice("Print URL copied.");}
   catch{setError("Clipboard unavailable");}
 }
 if(loading)return <div className="designer-screen designer-center"><Loader2 className="qm-spinner"/> Loading QR Designer…</div>;
 if(!authenticated)return <StudioLogin configured={configured} twoFactorEnabled={twoFactorEnabled} onSignedIn={async()=>{setAuthenticated(true);await reload();}}/>;
 return <div className="designer-screen">
   <header className="designer-header">
     <Link href="/manage/qr"><ArrowLeft size={17}/> All QR codes</Link>
     <div><QrCode size={19}/><strong>NEBIYU <span>QR DESIGNER</span></strong></div>
     <Link href="/manage">Dashboard <ArrowUpRight size={15}/></Link>
   </header>
   <main className="designer-main">
     <div className="designer-intro">
       <div><p className="qm-eyebrow">LINKS STUDIO / PREMIUM DESIGN</p>
         <h1>{qr?.title||"QR Designer"}</h1>
         <p>Design, brand and print your code. The redirect destination remains editable in QR Manager.</p>
       </div>
       <div className="designer-intro-actions">
         <button type="button" className="designer-secondary" onClick={copy}><Copy size={15}/> Copy URL</button>
         <button type="button" className="designer-primary" disabled={busy||!dirty||!ready||unsafe} onClick={save}><Save size={16}/> {busy?"Processing…":"Save as new version"}</button>
       </div>
     </div>
     {error&&<div className="designer-alert error" role="alert">{error}<button aria-label="Dismiss error" onClick={()=>setError("")}><X size={17}/></button></div>}
     {notice&&<div className="designer-alert success" role="status"><Check size={16}/>{notice}<button aria-label="Dismiss message" onClick={()=>setNotice("")}><X size={17}/></button></div>}
     <div className="designer-layout">
       <section className="designer-controls">
         <div className="designer-tabs" role="group" aria-label="Design tools">
           {panels.map(x=><button type="button" key={x.id} className={panel===x.id?"active":""} onClick={()=>setPanel(x.id)}><x.icon size={17}/>{x.label}</button>)}
         </div>
         <div className="designer-settings">
           {panel==="templates"&&<div>
             <h2>Choose your style</h2><p className="designer-muted">10 curated looks. Every one is fully customizable.</p>
             <div className="designer-template-grid">{examples.map(({preset,svg})=><button type="button" aria-pressed={draft.preset===preset.id} className={"designer-template"+(draft.preset===preset.id?" active":"")} key={preset.id} onClick={()=>applyPreset(preset.id)}>
               <span className="designer-template-art" style={{background:preset.background}}><img loading="lazy" src={"data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg)} alt="" /></span>
               <strong>{preset.label}</strong><small>{preset.detail}</small>
             </button>)}</div>
           </div>}
           {panel==="customize"&&<div className="designer-form">
             <h2>Shapes & colors</h2><p className="designer-muted">Fine-tune the QR pattern and finder corners.</p>
             <label>Module pattern<select value={draft.modules} onChange={e=>change({modules:e.target.value as QRDesign["modules"]})}>
               <option value="square">Classic squares</option><option value="rounded">Rounded</option><option value="dots">Dots</option><option value="soft">Soft rounded</option></select></label>
             <label>Finder eye shape<select value={draft.eyes} onChange={e=>change({eyes:e.target.value as QRDesign["eyes"]})}>
               <option value="square">Square</option><option value="rounded">Rounded</option><option value="circle">Circle</option></select></label>
             <div className="designer-two-col"><label>Foreground color<input type="color" value={draft.foreground} onChange={e=>change({foreground:e.target.value})}/></label>
               <label>Background color<input type="color" value={draft.background} disabled={draft.transparent} onChange={e=>change({background:e.target.value})}/></label></div>
             <label className="designer-check"><input type="checkbox" checked={draft.gradient} onChange={e=>change({gradient:e.target.checked})}/> Use a foreground gradient</label>
             {draft.gradient&&<label>Gradient end color<input type="color" value={draft.foregroundEnd} onChange={e=>change({foregroundEnd:e.target.value})}/></label>}
             <label className="designer-check"><input type="checkbox" checked={draft.transparent} onChange={e=>change({transparent:e.target.checked})}/> Transparent background (SVG / PNG)</label>
             <p className="designer-muted">For best scanning, choose a high-contrast dark pattern on a pale background.</p>
           </div>}
           {panel==="logo"&&<div className="designer-form">
             <h2>Put your logo in the center</h2><p className="designer-muted">Perfect for Girar, Visual Tizita, KAB Pictures, or personal branding.</p>
             {draft.logoPath?<div className="designer-logo-existing"><img src={draft.logoPath} alt="Selected logo" width={78} height={78}/><div><strong>Center logo ready</strong><p>White padding protects nearby QR modules.</p></div></div>:<div className="designer-upload-placeholder"><ImagePlus size={31}/><p>No logo uploaded for this design.</p></div>}
             <label className="designer-upload"><Upload size={17}/> {draft.logoPath?"Replace logo":"Upload logo"}
               <input type="file" accept="image/png,image/jpeg,image/webp" disabled={busy} onChange={e=>{const file=e.target.files?.[0];if(file)void uploadLogo(file);e.target.value="";}}/>
             </label>
             {draft.logoPath&&<button type="button" className="designer-secondary" onClick={()=>change({logoPath:""})}>Remove center logo</button>}
             {draft.logoPath&&<label>Logo width — {Math.round(draft.logoScale*100)}%
               <input type="range" min={10} max={18} value={Math.round(draft.logoScale*100)} onChange={e=>change({logoScale:Number(e.target.value)/100})}/></label>}
             <div className="designer-info"><ShieldCheck size={18}/><span>High error correction (H) is always enabled. PNG, JPG, and WebP only, maximum 2 MB. Keep the logo under 18% of QR width.</span></div>
           </div>}
           {panel==="frame"&&<div className="designer-form">
             <h2>Call-to-action frame</h2><p className="designer-muted">Add a print-ready border with clear instructions for visitors.</p>
             <div className="designer-frame-options">
               {(["none","simple","ticket","label"] as const).map(id=><button type="button" className={draft.frame===id?"active":""} key={id} onClick={()=>change({frame:id})}>{id==="none"?"No frame":id==="simple"?"Simple border":id==="ticket"?"Ticket style":"Label frame"}</button>)}
             </div>
             {draft.frame!=="none"&&<label>Text below QR<input type="text" maxLength={36} placeholder="SCAN TO VIEW MENU" value={draft.frameText} onChange={e=>change({frameText:e.target.value})}/></label>}
             <p className="designer-muted">Examples: SCAN TO VIEW MENU · SCAN FOR PHOTOS · OPEN MY LINKS · WATCH LIVE</p>
           </div>}
           {panel==="download"&&<div className="designer-form">
             <h2>Print & export</h2><p className="designer-muted">Save the design first so every printed variant gets an identifiable design version.</p>
             <label>Export size<select value={draft.size} onChange={e=>change({size:e.target.value as QRDesign["size"]})}>
               {Object.entries(qrSizes).map(([id,size])=><option value={id} key={id}>{size.label}</option>)}</select></label>
             <div className="designer-info"><Info size={18}/><span>{qrSizes[draft.size].inches}. SVG preserves vector edges at any scale. PDF uses an embedded high-resolution image.</span></div>
             <label>New version name (optional)<input placeholder="e.g. Girar Gold Menu" maxLength={60} value={versionName} onChange={e=>setVersionName(e.target.value)}/></label>
             {dirty&&<button className="designer-primary" type="button" onClick={save} disabled={busy||!ready||unsafe}><Save size={15}/> Save design before exporting</button>}
             <div className="designer-export-buttons">
               <button disabled={busy||dirty||!saved||!ready} onClick={()=>exportFile("png")}><FileImage size={22}/><strong>PNG</strong><small>High-resolution image</small></button>
               <button disabled={busy||dirty||!saved||!ready} onClick={()=>exportFile("svg")}><Layers3 size={22}/><strong>SVG</strong><small>Vector print artwork</small></button>
               <button disabled={busy||dirty||!saved||!ready} onClick={()=>exportFile("pdf")}><FileText size={22}/><strong>PDF</strong><small>Print-ready page</small></button>
             </div>
             <p className="designer-muted">The exported QR URL includes its design version for scan reporting. All saved versions redirect through the same editable destination.</p>
           </div>}
           {panel==="analytics"&&<div className="designer-form">
             <h2>QR scan analytics</h2><p className="designer-muted">Approximate scans across designs for the last 30 days. No personal visitor information is stored.</p>
             {analyticsError&&<div role="alert" className="designer-alert error">{analyticsError}</div>}
             {!analytics&&!analyticsError?<p><Loader2 className="qm-spinner" size={20}/> Loading scan history…</p>:null}
             {analytics&&<>
               <div className="designer-scan-total"><span>RECORDED SCANS · 30 DAYS</span><strong>{analytics.total.toLocaleString()}</strong><small>{analytics.enabled?"Approximate; scanner previews and bots may count":"Tracking is disabled by the server setting"}</small></div>
               <h3>By saved design version</h3>
               {[...doc?.versions||[]].reverse().map(v=>{
                 const n=analytics.byVersion[v.id]||0;
                 return <div className="designer-scan-row" key={v.id}><span>{v.name}<small>{new Date(v.createdAt).toLocaleDateString()}</small></span><b>{n}</b></div>;
               })}
               <div className="designer-scan-row"><span>Standard / unversioned QR</span><b>{analytics.byVersion.legacy||0}</b></div>
               <h3>Daily scans</h3>
               <div className="designer-bars">{Object.entries(analytics.byDay).sort(([a],[b])=>a.localeCompare(b)).slice(-30).map(([date,n])=><div key={date} title={date+": "+n+" scans"} style={{height:Math.max(3,(n/Math.max(...Object.values(analytics.byDay),1))*100)+"%"}}/>)}</div>
               <p className="designer-muted">Counters are best effort under concurrent scans. High traffic may incur Vercel Blob usage; tracking can be disabled using QR_SCAN_TRACKING_ENABLED=false.</p>
             </>}
           </div>}
         </div>
       </section>
       <aside className="designer-preview-section">
         <div className="designer-preview-head"><span><Eye size={18}/> LIVE PREVIEW</span><span>{dirty?"Unsaved changes":saved?"Saved design":"Standard draft"}</span></div>
         <div className="designer-preview-canvas">{ready&&rendered?
           <img src={"data:image/svg+xml;charset=utf-8,"+encodeURIComponent(rendered.svg)} alt="Live preview of customized dynamic QR code" />:
           <div className="designer-preview-loading"><Loader2 className="qm-spinner"/> Rendering design…</div>}
         </div>
         <div className="designer-print-meta"><span className="designer-version-label"><ScanLine size={16}/> {slugLabel(draft,doc,chosenId)}</span><span>{qrSizes[draft.size].label}</span></div>
         <div className="designer-url-box"><span>PERMANENT REDIRECT URL</span><code>{url}</code><small>Changing the destination will not require reprinting.</small></div>
         <div className={"designer-checker"+(unsafe?" unsafe":"")}>
           <ShieldCheck size={20}/><div><strong>Contrast {ratio.toFixed(1)}:1 {unsafe?"· Improve before export":ratio>=4.5?"· Good":"· Caution"}</strong>
           {warnings.map(w=><p key={w}>{w}</p>)}
           {!warnings.length&&<p>High error correction is enabled. Test a sample at real print size.</p>}
           {scanState!=="idle"&&<p>Browser scan check: {scanState==="testing"?"In progress…":scanState==="pass"?"Passed":scanState==="fail"?"Failed":"Not supported; test using your phone"}</p>}</div>
         </div>
         <button className="designer-secondary designer-scan-button" type="button" disabled={!ready||busy} onClick={async()=>{if(rendered)await verify(rendered.svg,rendered.url);}}>
           <ScanLine size={17}/> Test this QR in browser
         </button>
         <div className="designer-version-panel">
           <div className="designer-version-title"><h3>Saved versions</h3><span>{doc?.versions.length||0} saved</span></div>
           {doc?.versions.length? <div className="designer-version-list">{[...doc.versions].reverse().map(v=><button type="button" className={chosenId===v.id?"active":""} key={v.id} onClick={()=>selectVersion(v)}>
             <div><strong>{v.name}</strong><small>{new Date(v.createdAt).toLocaleDateString()} {v.id===doc.currentId?"· DEFAULT":""}</small></div>{chosenId===v.id?<CheckCheck size={17}/>:<ChevronRight size={17}/>}
           </button>)}</div>:
             <p className="designer-muted">Save your first look to create a permanent export version.</p>}
           {saved&&chosenId!==doc?.currentId&&<button className="designer-secondary designer-activate" disabled={busy||dirty} onClick={makeActive}><RotateCcw size={15}/> Make selected version default</button>}
         </div>
       </aside>
     </div>
   </main>
 </div>;
}
