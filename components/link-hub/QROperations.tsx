"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Archive, ArrowLeft, ArrowUpRight, CalendarClock, Check, Copy, Download, FileDown,
  FileUp, Folder, Layers3, Link2, Loader2, Plus, QrCode, RefreshCw, Save, Search,
  ShieldCheck, SmartphoneNfc, Sparkles, Tags, X } from "lucide-react";
import { StudioLogin } from "@/components/link-hub/StudioLogin";
import { type QRDesign, type QRDesignDocument } from "@/lib/qr-design";

type RecordQR = {
 slug:string;title:string;target:string;enabled:boolean;createdAt:string;updatedAt:string;
 folder?:string;tags?:string[];archived?:boolean;expiresAt?:string|null;
 schedule?:{from:string;until:string;target:string}[];
 landing?:{enabled:boolean;heading:string;description:string;buttonLabel:string};
};
type Kit={id:string;name:string;description:string;design:QRDesign};
type Activity={event:string;slug?:string;at:string};
type Tab="library"|"brands"|"bulk"|"reports"|"settings";
const urlBase="https://links.nebiyumekonnen.com/q/";
async function api(url:string,opts?:RequestInit){
 const response=await fetch(url,{cache:"no-store",credentials:"same-origin",...opts});
 const data=await response.json();if(!response.ok)throw Error(data.error||"Request failed");return data;
}
const jsonPost=(data:unknown):RequestInit=>({method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
function localDateToUTC(value:string):string|null {
 if(!value)return null;
 const time=new Date(value).getTime();
 if(!Number.isFinite(time))throw Error("Invalid date");
 return new Date(time).toISOString();
}
function utcToLocal(value:string|null|undefined){
 if(!value)return "";
 const date=new Date(value);
 return new Date(date.getTime()-date.getTimezoneOffset()*60000).toISOString().slice(0,16);
}
function csvSafe(v:string){return '"'+v.replace(/"/g,'""')+'"';}
function downloadText(name:string,content:string,mime:string){
 const b=new Blob([content],{type:mime}),url=URL.createObjectURL(b);
 const a=document.createElement("a");a.href=url;a.download=name;a.click();
 setTimeout(()=>URL.revokeObjectURL(url),10000);
}
function parseCSV(csv:string):string[][]{
 const result:string[][]=[];let row:string[]=[],cell="",quoted=false;
 for(let i=0;i<csv.length;i++){
  const ch=csv[i];
  if(ch==='"'){if(quoted&&csv[i+1]==='"'){cell+='"';i++;}else quoted=!quoted;}
  else if(ch===","&&!quoted){row.push(cell);cell="";}
  else if((ch==="\n"||ch==="\r")&&!quoted){
   if(ch==="\r"&&csv[i+1]==="\n")i++;
   row.push(cell);if(row.some(x=>x.trim()))result.push(row);
   row=[];cell="";
  }else cell+=ch;
 }
 if(quoted)throw Error("Unclosed CSV quote");
 row.push(cell);if(row.some(x=>x.trim()))result.push(row);
 return result;
}
const safeSlug=(s:string)=>s.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,48);
export function QROperations(){
 const[loading,setLoading]=useState(true),[authenticated,setAuthenticated]=useState(false);
 const[configured,setConfigured]=useState(true),[twoFactorEnabled,setTwoFactorEnabled]=useState(false);
 const[items,setItems]=useState<RecordQR[]>([]),[kits,setKits]=useState<Kit[]>([]),[activity,setActivity]=useState<Activity[]>([]);
 const[tab,setTab]=useState<Tab>("library"),[query,setQuery]=useState(""),[folderFilter,setFolderFilter]=useState("all");
 const[includeArchived,setIncludeArchived]=useState(false),[selected,setSelected]=useState("");
 const[form,setForm]=useState<RecordQR|null>(null),[expires,setExpires]=useState("");
 const[windows,setWindows]=useState<Array<{from:string;until:string;target:string}>>([]);
 const[tags,setTags]=useState(""),[kitTitle,setKitTitle]=useState(""),[kitNote,setKitNote]=useState("");
 const[kitSource,setKitSource]=useState(""),[bulk,setBulk]=useState("title,slug,target,folder,tags\n"),[bulkResult,setBulkResult]=useState<string[]>([]);
 const[scanDays,setScanDays]=useState(30),[analytics,setAnalytics]=useState<{total:number;byDay:Record<string,number>;byChannel:{qr:number;nfc:number};approximate:boolean}|null>(null);
 const[busy,setBusy]=useState(false),[error,setError]=useState(""),[notice,setNotice]=useState("");
 const[templateVersions,setTemplateVersions]=useState<QRDesignDocument|null>(null);
 const reload=useCallback(async()=>{
  const [qr,brand,events]=await Promise.all([
   api("/api/link-hub/qr"),api("/api/link-hub/qr/brands"),
   api("/api/link-hub/qr/activity").catch(()=>({events:[]})),
  ]);
  setItems(qr.items);setKits(brand.items);setActivity(events.events);
  setSelected(old=>qr.items.some((x:RecordQR)=>x.slug===old)?old:qr.items[0]?.slug||"");
 },[]);
 useEffect(()=>{
  let mounted=true;
  api("/api/link-hub/session").then(async s=>{
   if(!mounted)return;
   setConfigured(s.configured);setTwoFactorEnabled(s.twoFactorEnabled);setAuthenticated(s.authenticated);
   if(s.authenticated)await reload();
  }).catch(e=>{if(mounted)setError(e.message);}).finally(()=>{if(mounted)setLoading(false);});
  return()=>{mounted=false};
 },[reload]);
 const record=items.find(x=>x.slug===selected)||null;
 const folders=useMemo(()=>[...new Set(items.map(x=>x.folder||"Unfiled"))].sort(),[items]);
 const filtered=useMemo(()=>items.filter(x=>{
  if(!includeArchived&&x.archived)return false;
  if(folderFilter!=="all"&&(x.folder||"Unfiled")!==folderFilter)return false;
  return (x.title+" "+x.slug+" "+x.target+" "+(x.tags||[]).join(" ")).toLowerCase().includes(query.toLowerCase());
 }),[items,includeArchived,folderFilter,query]);
 useEffect(()=>{
  if(!authenticated||tab!=="reports"||!selected)return;
  let alive=true;
  api("/api/link-hub/qr/analytics?slug="+encodeURIComponent(selected)+"&days="+scanDays)
   .then(x=>{if(alive)setAnalytics(x)}).catch(e=>{if(alive)setError(e.message)});
  return()=>{alive=false};
 },[authenticated,tab,selected,scanDays]);
 useEffect(()=>{
  if(!authenticated||tab!=="brands"||!kitSource){return;}
  let live=true;
  api("/api/link-hub/qr/design?slug="+encodeURIComponent(kitSource)).then(x=>{if(live)setTemplateVersions(x.document)})
   .catch(()=>{if(live)setTemplateVersions(null)});
  return()=>{live=false};
 },[authenticated,tab,kitSource]);
 function startEdit(row:RecordQR){
  setSelected(row.slug);setForm(row);setTags((row.tags||[]).join(", "));
  setExpires(utcToLocal(row.expiresAt));
  setWindows((row.schedule||[]).map(x=>({from:utcToLocal(x.from),until:utcToLocal(x.until),target:x.target})));
  setNotice("");setError("");
 }
 function startCopy(row:RecordQR){
  startEdit({...row,slug:safeSlug(row.slug+"-copy"),title:row.title+" Copy"});
 }
 async function saveRecord(){
  if(!form)return;
  setBusy(true);setError("");setNotice("");
  try{
   const existing=items.some(x=>x.slug===form.slug);
   const input={
    ...form,action:existing?"update":"create",expiresAt:localDateToUTC(expires),
    tags:tags.split(",").map(x=>x.trim()).filter(Boolean),
    schedule:windows.filter(x=>x.from||x.until||x.target).map(x=>({
     from:localDateToUTC(x.from),until:localDateToUTC(x.until),target:x.target,
    })),
   };
   await api("/api/link-hub/qr",jsonPost(input));await reload();
   setForm(null);setNotice("QR settings saved. Printed QR links remain stable.");
  }catch(e){setError(e instanceof Error?e.message:"Could not save");}
  finally{setBusy(false)}
 }
 async function toggleArchive(row:RecordQR){
  setBusy(true);setError("");setNotice("");
  try{
   await api("/api/link-hub/qr",jsonPost({action:"update",...row,archived:!row.archived}));
   await reload();setNotice(row.archived?"Restored from archive.":"Archived without disabling the printed QR.");
  }catch(e){setError(e instanceof Error?e.message:"Unable to archive");}
  finally{setBusy(false)}
 }
 async function saveKit(){
  if(!templateVersions)return setError("Select a QR with at least one saved premium design.");
  const v=templateVersions.versions.find(x=>x.id===templateVersions.currentId);
  if(!v)return setError("That QR does not have a saved design yet.");
  setBusy(true);setError("");setNotice("");
  try{
   const result=await api("/api/link-hub/qr/brands",jsonPost({action:"save",name:kitTitle,description:kitNote,design:v.design}));
   setKits(result.items);setKitTitle("");setKitNote("");
   setNotice("Brand Kit saved. Apply it from QR Designer using the Brand Kit shortcut.");
  }catch(e){setError(e instanceof Error?e.message:"Could not save kit");}
  finally{setBusy(false)}
 }
 async function deleteKit(id:string){
  if(!window.confirm("Delete this Brand Kit? Saved QR designs will not change."))return;
  setBusy(true);
  try{const r=await api("/api/link-hub/qr/brands",jsonPost({action:"remove",id}));setKits(r.items);setNotice("Brand Kit removed.");}
  catch(e){setError(e instanceof Error?e.message:"Delete failed");}
  finally{setBusy(false)}
 }
 async function importBulk(){
  setBusy(true);setError("");setNotice("");setBulkResult([]);
  try{
   const lines=parseCSV(bulk.trim());
   if(lines.length<2)throw Error("A CSV header and at least one data row are required.");
   const header=lines[0].map(x=>x.trim().toLowerCase());
   for(const req of ["title","slug","target"])if(!header.includes(req))throw Error("Missing required CSV column: "+req);
   if(lines.length>21)throw Error("Import at most 20 records per batch.");
   const records=lines.slice(1).map(line=>{
    const obj:Record<string,string>={};
    header.forEach((key,i)=>obj[key]=(line[i]||"").trim());
    return {title:obj.title,slug:safeSlug(obj.slug),target:obj.target,enabled:true,folder:obj.folder||"",
     tags:(obj.tags||"").split("|").map(x=>x.trim()).filter(Boolean)};
   });
   const r=await api("/api/link-hub/qr",jsonPost({action:"bulk-create",items:records}));
   setBulkResult(r.results.map((x:{slug:string;created:boolean;error?:string})=>x.slug+" — "+(x.created?"Created":x.error)));
   await reload();setNotice("Batch complete. Please review the per-row outcomes.");
  }catch(e){setError(e instanceof Error?e.message:"Import failed");}
  finally{setBusy(false)}
 }
 function exportLibrary(){
  const rows=[["title","slug","target","folder","tags","active","archived","expiresAt"].join(","),
   ...items.map(x=>[x.title,x.slug,x.target,x.folder||"",(x.tags||[]).join("|"),String(x.enabled),String(Boolean(x.archived)),x.expiresAt||""].map(csvSafe).join(","))];
  downloadText("links-studio-qr-library.csv",rows.join("\r\n"),"text/csv");
 }
 function exportScan(){
  window.location.href="/api/link-hub/qr/analytics?slug="+encodeURIComponent(selected)+"&days="+scanDays+"&format=csv";
 }
 async function copy(value:string){
  try{await navigator.clipboard.writeText(value);setNotice("Link copied.");}
  catch{setError("Could not copy link");}
 }
 if(loading)return <div className="ops-loading"><Loader2/> Loading QR workspace…</div>;
 if(!authenticated)return <StudioLogin configured={configured} twoFactorEnabled={twoFactorEnabled} onSignedIn={async()=>{setAuthenticated(true);await reload();}}/>;
 return <main className="ops-shell">
  <header className="ops-top"><Link href="/manage/qr"><ArrowLeft size={17}/> QR Manager</Link><strong><Layers3 size={19}/> QR OPERATIONS</strong><Link href="/manage">Dashboard <ArrowUpRight size={15}/></Link></header>
  <div className="ops-body">
   <div className="ops-heading"><div><p className="ops-eyebrow">LINKS STUDIO / BUSINESS TOOLS</p><h1>QR Operations</h1><p>Organize clients and campaigns, manage print workflows, and keep every dynamic destination under control.</p></div><button className="ops-primary" onClick={exportLibrary}><FileDown size={17}/> Export library CSV</button></div>
   {error&&<div className="ops-alert error" role="alert">{error}<button onClick={()=>setError("")} aria-label="Dismiss"><X size={16}/></button></div>}
   {notice&&<div className="ops-alert success" role="status"><Check size={16}/>{notice}<button onClick={()=>setNotice("")} aria-label="Dismiss"><X size={16}/></button></div>}
   <div className="ops-summary">
    <div><span>ALL QR CODES</span><strong>{items.length}</strong></div><div><span>ACTIVE</span><strong>{items.filter(x=>x.enabled).length}</strong></div>
    <div><span>FOLDERS</span><strong>{folders.length}</strong></div><div><span>BRAND KITS</span><strong>{kits.length}</strong></div>
   </div>
   <div className="ops-tabs">{(["library","brands","bulk","reports","settings"] as Tab[]).map(x=><button key={x} onClick={()=>{setTab(x);setForm(null);}} className={tab===x?"active":""}>{({library:"QR Library",brands:"Brand Kits",bulk:"Bulk Creation",reports:"Analytics",settings:"Tools & Backup"} as Record<Tab,string>)[x]}</button>)}</div>
   {tab==="library"&&<div className="ops-columns">
     <section className="ops-panel">
      <div className="ops-panel-head"><h2>QR library</h2><span>{filtered.length} codes</span></div>
      <div className="ops-search"><Search size={16}/><input placeholder="Search QR, destination or tag" aria-label="Search library" value={query} onChange={e=>setQuery(e.target.value)}/></div>
      <div className="ops-filters"><select aria-label="Folder" value={folderFilter} onChange={e=>setFolderFilter(e.target.value)}><option value="all">All folders</option>{folders.map(x=><option key={x}>{x}</option>)}</select>
       <label><input type="checkbox" checked={includeArchived} onChange={e=>setIncludeArchived(e.target.checked)}/> Show archive</label></div>
      <div className="ops-entries">{filtered.map(x=><button className={x.slug===selected?"active":""} key={x.slug} onClick={()=>{setSelected(x.slug);setForm(null);}}>
       <QrCode size={19}/><span><strong>{x.title}</strong><small>{x.folder||"Unfiled"} · /q/{x.slug}</small></span>{x.archived?<Archive size={16}/>:x.enabled?<i className="ops-live"/>:<span>Paused</span>}</button>)}</div>
      {!filtered.length&&<p className="ops-muted">No matching QR codes.</p>}
      <Link href="/manage/qr" className="ops-inline"><Plus size={16}/> Create new QR</Link>
     </section>
     <section className="ops-panel">
      {form?<div className="ops-editor">
       <div className="ops-panel-head"><h2>{items.some(x=>x.slug===form.slug)?"QR Settings":"Duplicate as new QR"}</h2><button className="ops-link" onClick={()=>setForm(null)}>Cancel</button></div>
       <p className="ops-muted">Metadata, schedules, and landing pages. Saving never changes the slug of an existing QR.</p>
       <label>Name<input value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></label>
       <label>Permanent slug<input value={form.slug} disabled={items.some(x=>x.slug===form.slug)} onChange={e=>setForm({...form,slug:safeSlug(e.target.value)})}/></label>
       <label>Default HTTPS destination<input value={form.target} onChange={e=>setForm({...form,target:e.target.value})}/></label>
       <label><Folder size={15}/> Folder / client<input maxLength={50} value={form.folder||""} onChange={e=>setForm({...form,folder:e.target.value})}/></label>
       <label><Tags size={15}/> Tags (comma-separated)<input value={tags} onChange={e=>setTags(e.target.value)} placeholder="restaurant, menu, window"/></label>
       <label><CalendarClock size={15}/> Expiration time (optional)<input type="datetime-local" value={expires} onChange={e=>setExpires(e.target.value)}/></label>
       <label className="ops-check"><input type="checkbox" checked={form.enabled} onChange={e=>setForm({...form,enabled:e.target.checked})}/> Enable QR redirect</label>
       <div className="ops-divider"/>
       <h3>Scheduled destinations (UTC stored)</h3><p className="ops-muted">Only one time window may be active; outside windows the default URL remains available.</p>
       {windows.map((w,i)=><div className="ops-schedule" key={i}>
        <label>Start (your local time)<input type="datetime-local" value={w.from} onChange={e=>setWindows(old=>old.map((v,j)=>j===i?{...v,from:e.target.value}:v))}/></label>
        <label>End (your local time)<input type="datetime-local" value={w.until} onChange={e=>setWindows(old=>old.map((v,j)=>j===i?{...v,until:e.target.value}:v))}/></label>
        <label>HTTPS destination<input value={w.target} onChange={e=>setWindows(old=>old.map((v,j)=>j===i?{...v,target:e.target.value}:v))}/></label>
        <button className="ops-link" onClick={()=>setWindows(old=>old.filter((_,j)=>j!==i))}>Remove window</button>
       </div>)}
       {windows.length<12&&<button className="ops-secondary" onClick={()=>setWindows([...windows,{from:"",until:"",target:""}])}><Plus size={14}/> Add time window</button>}
       <div className="ops-divider"/>
       <h3>Hosted landing page</h3>
       <label className="ops-check"><input type="checkbox" checked={form.landing?.enabled||false} onChange={e=>setForm({...form,landing:{enabled:e.target.checked,heading:form.landing?.heading||form.title,description:form.landing?.description||"",buttonLabel:form.landing?.buttonLabel||"Continue"}})}/> Show a branded landing page before the destination</label>
       {form.landing?.enabled&&<>
        <label>Heading<input value={form.landing.heading} maxLength={100} onChange={e=>setForm({...form,landing:{...form.landing!,heading:e.target.value}})}/></label>
        <label>Description<textarea value={form.landing.description} maxLength={500} onChange={e=>setForm({...form,landing:{...form.landing!,description:e.target.value}})}/></label>
        <label>Button text<input value={form.landing.buttonLabel} maxLength={35} onChange={e=>setForm({...form,landing:{...form.landing!,buttonLabel:e.target.value}})}/></label>
       </>}
       <button className="ops-primary" disabled={busy} onClick={saveRecord}><Save size={16}/> {busy?"Saving…":"Save QR settings"}</button>
      </div>:record?<div className="ops-details">
       <div className="ops-panel-head"><div><h2>{record.title}</h2><small>{record.folder||"Unfiled"}</small></div><span className="ops-tag">{record.enabled?"Active":"Paused"}</span></div>
       <div className="ops-url"><span>PERMANENT QR</span><code>{urlBase+record.slug}</code><button onClick={()=>copy(urlBase+record.slug)}><Copy size={16}/> Copy</button></div>
       <div className="ops-url"><span>OPTIONAL NFC LINK</span><code>{urlBase+record.slug+"?src=nfc"}</code><button onClick={()=>copy(urlBase+record.slug+"?src=nfc")}><SmartphoneNfc size={16}/> Copy NFC URL</button></div>
       <p className="ops-muted">Both URLs use the same managed destination, while tracking QR scans and NFC taps separately.</p>
       <p className="ops-destination">Destination: <a href={record.target} target="_blank" rel="noopener noreferrer">{record.target} <ArrowUpRight size={14}/></a></p>
       <div className="ops-actions">
        <button className="ops-primary" onClick={()=>startEdit(record)}>Edit advanced settings</button>
        <button className="ops-secondary" onClick={()=>startCopy(record)}><Copy size={15}/> Duplicate</button>
        <button className="ops-secondary" disabled={busy} onClick={()=>toggleArchive(record)}><Archive size={15}/>{record.archived?"Restore":"Archive"}</button>
        <Link className="ops-secondary" href={"/manage/qr/designer?slug="+encodeURIComponent(record.slug)}><Sparkles size={15}/> QR Designer</Link>
       </div>
       <div className="ops-facts"><div><strong>{record.tags?.join(", ")||"No tags"}</strong><small>Tags</small></div><div><strong>{record.schedule?.length||0}</strong><small>Scheduled windows</small></div><div><strong>{record.expiresAt?new Date(record.expiresAt).toLocaleString():"No expiry"}</strong><small>Expiration</small></div></div>
      </div>:<p className="ops-muted">Select a QR code.</p>}
     </section>
   </div>}
   {tab==="brands"&&<div className="ops-columns">
    <section className="ops-panel">
      <div className="ops-panel-head"><h2>Saved Brand Kits</h2><span>{kits.length} kits</span></div>
      <p className="ops-muted">Save logos, QR shapes, gradients, and colors to apply consistently across campaigns.</p>
      {kits.map(x=><div className="ops-kit" key={x.id}><div><strong>{x.name}</strong><p>{x.description||"Custom brand"}</p><div className="ops-swatches"><i style={{background:x.design.foreground}}/><i style={{background:x.design.background}}/><i style={{background:x.design.foregroundEnd}}/></div></div><button onClick={()=>deleteKit(x.id)} disabled={busy}>Remove</button></div>)}
      {!kits.length&&<p className="ops-muted">No Brand Kits yet. Save one from an existing premium QR design.</p>}
    </section>
    <section className="ops-panel ops-editor">
      <h2>Create Brand Kit from a QR design</h2>
      <p className="ops-muted">Choose a QR whose Premium Designer already has a saved version. Your kit keeps a snapshot of that look.</p>
      <label>Source QR<select value={kitSource} onChange={e=>setKitSource(e.target.value)}><option value="">Choose a QR</option>{items.map(x=><option value={x.slug} key={x.slug}>{x.title}</option>)}</select></label>
      <label>Brand name<input maxLength={65} value={kitTitle} onChange={e=>setKitTitle(e.target.value)} placeholder="e.g. Girar Bar & Restaurant"/></label>
      <label>Description<input maxLength={240} value={kitNote} onChange={e=>setKitNote(e.target.value)} placeholder="Restaurant menu designs"/></label>
      {kitSource&&<p className="ops-muted">Saved source versions: {templateVersions?.versions.length||0}</p>}
      <button className="ops-primary" disabled={busy||!kitSource||!kitTitle||!templateVersions?.currentId} onClick={saveKit}><Save size={16}/> Save Brand Kit</button>
      <div className="ops-divider"/><h3>Apply existing Brand Kit</h3>
      <p className="ops-muted">Select the QR and open its designer with the Brand Kit applied as an editable draft.</p>
      <label>Target QR<select value={selected} onChange={e=>setSelected(e.target.value)}>{items.map(x=><option value={x.slug} key={x.slug}>{x.title}</option>)}</select></label>
      <div className="ops-kit-buttons">{kits.map(x=><Link key={x.id} href={"/manage/qr/designer?slug="+encodeURIComponent(selected)+"&brand="+encodeURIComponent(x.id)} className="ops-secondary">{x.name} <ArrowUpRight size={14}/></Link>)}</div>
    </section>
   </div>}
   {tab==="bulk"&&<div className="ops-columns">
    <section className="ops-panel ops-editor"><h2>Batch-create QR codes</h2><p className="ops-muted">Import up to 20 records at once. Slugs must be unique. Already-used slugs are reported, never overwritten.</p>
     <label>Paste CSV (title, slug, target, folder, tags)<textarea rows={12} value={bulk} onChange={e=>setBulk(e.target.value)} spellCheck={false}/></label>
     <button className="ops-primary" disabled={busy} onClick={importBulk}><FileUp size={16}/> Import batch</button>
     {bulkResult.length>0&&<div className="ops-results">{bulkResult.map((x,i)=><p key={i}>{x}</p>)}</div>}
    </section>
    <section className="ops-panel"><h2>CSV template and safeguards</h2><p className="ops-muted">Columns: title,slug,target,folder,tags. All destinations must be HTTPS. Tags inside CSV may be separated using the | symbol.</p>
     <button className="ops-secondary" onClick={()=>downloadText("qr-import-template.csv","title,slug,target,folder,tags\r\nGirar Menu,girar-menu,https://example.com/menu,Girar,restaurant|menu\r\n","text/csv")}><Download size={16}/> Download CSV template</button>
     <div className="ops-divider"/><h3>Review after import</h3><p className="ops-muted">The operation is intentionally partial rather than transactional: if a row fails, successful rows remain created. No existing QR targets are overwritten.</p>
    </section>
   </div>}
   {tab==="reports"&&<div className="ops-columns">
    <section className="ops-panel ops-editor">
      <h2>Campaign reports</h2><p className="ops-muted">Counts are approximate visits, not unique people. QR scans and NFC taps are distinct.</p>
      <label>QR code<select value={selected} onChange={e=>setSelected(e.target.value)}>{items.map(x=><option key={x.slug} value={x.slug}>{x.title}</option>)}</select></label>
      <label>Time window<select value={scanDays} onChange={e=>setScanDays(Number(e.target.value))}><option value={7}>7 days</option><option value={30}>30 days</option><option value={90}>90 days</option></select></label>
      <div className="ops-report-cards"><div><span>TOTAL</span><strong>{analytics?.total??"—"}</strong></div><div><span>QR</span><strong>{analytics?.byChannel.qr??"—"}</strong></div><div><span>NFC</span><strong>{analytics?.byChannel.nfc??"—"}</strong></div></div>
      <button className="ops-secondary" onClick={exportScan} disabled={!selected}><Download size={15}/> Download scan CSV</button>
    </section>
    <section className="ops-panel"><h2>Recorded visits per day</h2>
     <div className="ops-bars">{Object.entries(analytics?.byDay||{}).sort(([a],[b])=>a.localeCompare(b)).map(([day,n])=><div title={day+": "+n+" visits"} key={day} style={{height:Math.max(3,n/Math.max(1,...Object.values(analytics?.byDay||{}))*100)+"%"}}/>)}</div>
     {!Object.keys(analytics?.byDay||{}).length&&<p className="ops-muted">No recorded visits for this period.</p>}
     <p className="ops-muted">Current implementation uses an approximate private Blob counter. Move to a transactional analytics store before high-volume commercial use.</p>
    </section>
   </div>}
   {tab==="settings"&&<div className="ops-columns">
    <section className="ops-panel">
      <h2>Data backup and export</h2><p className="ops-muted">A backup contains published/draft hub content, QR destinations, designs, and Brand Kits. Login secrets are excluded.</p>
      <a href="/api/link-hub/backup" className="ops-primary"><Download size={16}/> Download full JSON backup</a>
      <div className="ops-divider"/>
      <h2>Recent changes</h2>{activity.slice(0,15).map((x,i)=><div className="ops-event" key={i}><span>{x.event}</span><small>{x.slug||"Workspace"} · {new Date(x.at).toLocaleString()}</small></div>)}
      {!activity.length&&<p className="ops-muted">New edit activity will appear here.</p>}
    </section>
    <section className="ops-panel">
      <h2>Business platform readiness</h2>
      <p className="ops-muted">These components need additional secure infrastructure before client onboarding or payments are enabled.</p>
      <div className="ops-roadmap"><strong>Custom domains</strong><span>Requires domain ownership verification and Vercel alias configuration</span></div>
      <div className="ops-roadmap"><strong>Client workspaces</strong><span>Require per-client accounts and server-side tenant isolation</span></div>
      <div className="ops-roadmap"><strong>Billing</strong><span>Not active; needs payment provider, tax/pricing setup and webhook verification</span></div>
      <div className="ops-roadmap"><strong>Public API / integrations</strong><span>Require scoped API keys and abuse limits</span></div>
      <div className="ops-roadmap"><strong>Automated link monitoring</strong><span>Needs safely isolated outbound checks and scheduled jobs</span></div>
      <Link href="/manage/security" className="ops-secondary"><ShieldCheck size={16}/> Account Security</Link>
    </section>
   </div>}
  </div>
 </main>;
}
