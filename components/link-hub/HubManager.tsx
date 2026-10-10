"use client";
import { useCallback, useEffect, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpRight, BarChart3, Check, ChevronRight, Download, Eye, EyeOff, FileText, ImageUp, LayoutDashboard, Link2, Loader2, LockKeyhole, LogOut, Palette, Plus, QrCode, Save, Settings, Share2, ShieldCheck, Smartphone, Sparkles, Trash2, Upload, X } from "lucide-react";
import QRCode from "qrcode";
import { HubExperience } from "@/components/link-hub/HubExperience";
import { initialHub, HUB_TEMPLATES, isLightHubTemplate, getSelectedHubTemplate, DEFAULT_HUB_BACKGROUND, type HubBackgroundSettings, type HubContent, type HubLink, type HubProject, type DarkHubTemplate, type LightHubTemplate } from "@/lib/link-hub";
const tabs = [
  { id: "overview", title: "Overview", icon: LayoutDashboard },
  { id: "links", title: "My Links", icon: Link2 },
  { id: "projects", title: "Featured Work", icon: Sparkles },
  { id: "appearance", title: "Appearance", icon: Palette },
  { id: "media", title: "Media Library", icon: ImageUp },
  { id: "sharing", title: "QR & Sharing", icon: QrCode },
  { id: "settings", title: "Settings", icon: Settings },
] as const;
type Tab = typeof tabs[number]["id"];
async function callAPI(url: string, opts?: RequestInit) {
  const result = await fetch(url, { cache: "no-store", credentials: "same-origin", ...opts });
  const data = await result.json();
  if (!result.ok) throw new Error(data.error || "Request failed");
  return data;
}
export function HubManager() {
  const [authenticated, setAuthenticated] = useState(false);
  const [configured, setConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [draft, setDraft] = useState<HubContent>(initialHub);
  const [live, setLive] = useState<HubContent>(initialHub);
  const [storageReady, setStorageReady] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [tab, setTab] = useState<Tab>("overview");
  const [showPreview, setShowPreview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [dirty, setDirty] = useState(false);
  const [qr, setQr] = useState("");
  const [revision, setRevision] = useState("");
  const reload = useCallback(async () => {
    const data = await callAPI("/api/link-hub/admin");
    setDraft(data.draft); setLive(data.live); setStorageReady(data.storageReady);
    setHistory(data.history || []); setDirty(false);
  }, []);
  useEffect(() => {
    let active = true;
    callAPI("/api/link-hub/session").then(async data => {
      if (!active) return;
      setConfigured(data.configured);
      setAuthenticated(data.authenticated);
      if (data.authenticated) await reload();
    }).catch(e => { if (active) setError(e.message); }).finally(() => { if (active) setLoading(false); });
    QRCode.toDataURL("https://nebiyumekonnen.com/links", { width: 420, margin: 2, color: { dark: "#151A23", light: "#FFFFFF" } }).then(setQr).catch(() => {});
    return () => { active = false; };
  }, [reload]);
  function change(fn: (x: HubContent) => HubContent) { setDraft(old => fn(old)); setDirty(true); setNotice(""); }
  function profile(field: keyof HubContent["profile"], value: string) {
    change(old => ({ ...old, profile: { ...old.profile, [field]: value } }));
  }
  function design(field: keyof HubContent["design"], value: string) {
    change(old => ({ ...old, design: { ...old.design, [field]: value } }));
  }
  function selectTemplate(template: (typeof HUB_TEMPLATES)[number]) {
    const light = isLightHubTemplate(template.id);
    change(old => ({
      ...old,
      design: {
        ...old.design,
        activeTemplate: template.id,
        ...(light
          ? { lightTemplate: template.id as LightHubTemplate, lightAccent: template.accent }
          : { darkTemplate: template.id as DarkHubTemplate, darkAccent: template.accent }),
      },
    }));
  }
  function openThemePreview() { setShowPreview(true); }
  function setBackground<K extends keyof HubBackgroundSettings>(field: K, value: HubBackgroundSettings[K]) {
    change(old => ({ ...old, design: { ...old.design, background: { ...DEFAULT_HUB_BACKGROUND, ...old.design.background, [field]: value } } }));
  }
  function updateLink(id: string, field: keyof HubLink, value: string | boolean) {
    change(old => ({ ...old, links: old.links.map(l => l.id === id ? { ...l, [field]: value } : l) }));
  }
  function updateProject(id: string, field: keyof HubProject, value: string | boolean) {
    change(old => ({ ...old, projects: old.projects.map(p => p.id === id ? { ...p, [field]: value } : p) }));
  }
  function move<T>(list: T[], index: number, direction: number) {
    const next = [...list], target = index + direction;
    if (target >= 0 && target < next.length) [next[index], next[target]] = [next[target], next[index]];
    return next;
  }
  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError("");
    try {
      await callAPI("/api/link-hub/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      setAuthenticated(true); setPassword(""); await reload();
    } catch (e) { setError(e instanceof Error ? e.message : "Sign in failed"); }
    finally { setBusy(false); }
  }
  async function save(action: "save" | "publish" | "restore", path?: string) {
    setBusy(true); setError(""); setNotice("");
    try {
      if (action === "publish" && dirty) {
        await callAPI("/api/link-hub/admin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "save", content: draft }) });
      }
      await callAPI("/api/link-hub/admin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action, content: draft, path }) });
      await reload();
      setNotice(action === "publish" ? "Your link hub is published." : action === "save" ? "Draft saved privately." : "Version restored to draft. Publish to make it live.");
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to save"); }
    finally { setBusy(false); }
  }
  async function upload(file: File, target: "portrait" | "resume" | string) {
    setBusy(true); setError("");
    try {
      const form = new FormData(); form.set("file", file);
      const data = await callAPI("/api/link-hub/upload", { method: "POST", body: form });
      if (target === "portrait" || target === "resume") profile(target, data.path);
      else updateProject(target, "image", data.path);
      setNotice("Upload complete. Publish your changes to make it visible.");
    } catch (e) { setError(e instanceof Error ? e.message : "Upload failed"); }
    finally { setBusy(false); }
  }
  async function logout() {
    await callAPI("/api/link-hub/session", { method: "DELETE" });
    setAuthenticated(false); setPassword(""); setDraft(initialHub); setNotice("");
  }
  function exportBackup() {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "nebiyu-link-hub-backup.json"; a.click(); URL.revokeObjectURL(url);
  }
  if (loading) return <div className="hub-manager-loading"><Loader2 className="hub-spin" size={26}/> Checking access…</div>;
  if (!authenticated) return <div className="hub-admin-login">
    <form className="hub-login-card" onSubmit={login}>
      <a href="/links" className="hub-back">← View public page</a>
      <div className="hub-login-logo">NM</div>
      <div className="hub-admin-kicker">PRIVATE WORKSPACE</div>
      <h1>Welcome back.</h1><p>Manage your links, projects, and personal brand in one place.</p>
      <label htmlFor="hub-password">Admin password</label>
      <input id="hub-password" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required disabled={!configured}/>
      {error && <p role="alert" className="hub-error">{error}</p>}
      {!configured && <p className="hub-error">Admin sign-in requires server environment secrets. The public link hub remains available.</p>}
      <button type="submit" className="hub-admin-primary" disabled={busy || !configured}>{busy ? "Signing in…" : "Sign in securely"} <ArrowUpRight size={17}/></button>
      <small><LockKeyhole size={14}/> Protected administrator access</small>
    </form>
  </div>;
  return <div className="hub-manager">
    <aside className="hub-manager-sidebar">
      <a href="/links" className="hub-manager-brand"><span>NM</span><strong>Link Hub <em>Studio</em></strong></a>
      <div className="hub-sidebar-label">WORKSPACE</div>
      <nav aria-label="Manager navigation">{tabs.map(({id,title,icon:Icon}) => <button type="button" className={tab === id ? "selected" : ""} onClick={()=>setTab(id)} key={id}><Icon size={18}/>{title}{tab === id && <ChevronRight size={15} className="hub-side-arrow"/>}</button>)}</nav>
      <div className="hub-manager-side-bottom"><a href="/links" target="_blank" rel="noopener noreferrer"><ArrowUpRight size={17}/> View live page</a><button type="button" onClick={logout}><LogOut size={17}/> Sign out</button></div>
    </aside>
    <main className="hub-manager-content">
      <div className="hub-manager-toolbar"><div><div className="hub-admin-kicker">NEBIYU MEKONNEN / CONTROL CENTER</div><h1>{tabs.find(x=>x.id===tab)?.title}</h1></div><div className="hub-toolbar-actions"><button type="button" className="hub-admin-secondary" onClick={()=>openThemePreview()}><Smartphone size={16}/> Preview</button><button type="button" className="hub-admin-secondary" disabled={busy || !storageReady || !dirty} onClick={()=>save("save")}><Save size={16}/> Save draft</button><button type="button" className="hub-admin-primary" disabled={busy || !storageReady} onClick={()=>save("publish")}><ArrowUpRight size={16}/> Publish</button></div></div>
      {!storageReady && <div role="status" className="hub-alert"><ShieldCheck size={21}/><div><strong>Storage connection required</strong><p>The editor and preview are available, but saves and publishing are disabled until a private Vercel Blob store is connected and LINK_HUB_STORAGE_ENABLED=true is set.</p></div></div>}
      {error && <div className="hub-message hub-error" role="alert">{error}<button onClick={()=>setError("")} aria-label="Dismiss"><X size={16}/></button></div>}
      {notice && <div className="hub-message hub-success" role="status"><Check size={17}/>{notice}<button onClick={()=>setNotice("")} aria-label="Dismiss"><X size={16}/></button></div>}
      <div className="hub-mobile-tabs">{tabs.map(({id,title})=><button className={tab===id?"selected":""} onClick={()=>setTab(id)} key={id}>{title}</button>)}</div>
      {tab === "overview" && <div className="hub-admin-section">
        <p className="hub-admin-intro">One place to manage what visitors see when they land on your link hub.</p>
        <div className="hub-admin-stats">
          <div><span>VISIBLE LINKS</span><strong>{draft.links.filter(l=>l.visible).length}</strong><Link2 size={20}/></div>
          <div><span>FEATURED PROJECTS</span><strong>{draft.projects.filter(p=>p.visible).length}</strong><Sparkles size={20}/></div>
          <div><span>PUBLISH STATUS</span><strong className="hub-status">{dirty ? "Unsaved" : "Synced"}</strong><ShieldCheck size={20}/></div>
          <div><span>PAGE VISITS</span><strong>—</strong><BarChart3 size={20}/><small>Analytics planned</small></div>
        </div>
        <div className="hub-admin-card"><div className="hub-admin-card-heading"><h2>Quick actions</h2><span>Get things done</span></div><div className="hub-quick-grid">{[["Add a link","links",Plus],["Update profile","appearance",Palette],["Generate QR","sharing",QrCode],["Manage projects","projects",Sparkles]].map(([title,id,Icon])=><button type="button" onClick={()=>setTab(id as Tab)} key={String(id)}><Icon size={22}/><strong>{title as string}</strong><ArrowUpRight size={15}/></button>)}</div></div>
        <div className="hub-admin-card hub-overview-live"><div><span className="hub-admin-kicker">YOUR LIVE LINK</span><strong>nebiyumekonnen.com/links</strong><p>Ready to share across social media, resumes, and business cards.</p></div><a href="/links" target="_blank" rel="noopener noreferrer" className="hub-admin-secondary">Open <ArrowUpRight size={16}/></a></div>
      </div>}
      {tab === "links" && <div className="hub-admin-section">
        <div className="hub-section-row"><p className="hub-admin-intro">Create social profiles, custom links, and buttons. Move or hide any card.</p><button type="button" className="hub-admin-primary" onClick={()=>change(old=>({...old,links:[...old.links,{id:crypto.randomUUID(),label:"New link",url:"https://example.com",icon:"link",section:"extra",visible:false}]}))}><Plus size={16}/> Add link</button></div>
        {draft.links.map((l,i)=><div key={l.id} className="hub-edit-card">
          <div className="hub-edit-card-top"><span className="hub-edit-order">#{i+1}</span><strong>{l.label}</strong><div className="hub-edit-controls">
            <button type="button" title="Move up" aria-label={"Move "+l.label+" up"} disabled={i===0} onClick={()=>change(o=>({...o,links:move(o.links,i,-1)}))}><ArrowUp size={17}/></button>
            <button type="button" title="Move down" aria-label={"Move "+l.label+" down"} disabled={i===draft.links.length-1} onClick={()=>change(o=>({...o,links:move(o.links,i,1)}))}><ArrowDown size={17}/></button>
            <button type="button" title={l.visible?"Hide":"Show"} aria-label={l.visible?"Hide "+l.label:"Show "+l.label} onClick={()=>updateLink(l.id,"visible",!l.visible)}>{l.visible?<Eye size={17}/>:<EyeOff size={17}/>}</button>
            <button type="button" title="Delete" aria-label={"Delete "+l.label} onClick={()=>{if(confirm("Delete this link from your draft?")) change(o=>({...o,links:o.links.filter(x=>x.id!==l.id)}));}}><Trash2 size={16}/></button>
          </div></div>
          <div className="hub-form-grid"><label>Display name<input value={l.label} maxLength={90} onChange={e=>updateLink(l.id,"label",e.target.value)}/></label><label>Category<select value={l.section} onChange={e=>updateLink(l.id,"section",e.target.value)}><option value="primary">Primary button</option><option value="social">Social icon</option><option value="extra">More links</option></select></label><label className="hub-form-wide">Destination URL<input value={l.url} onChange={e=>updateLink(l.id,"url",e.target.value)} placeholder="https://..."/></label><label>Icon<select value={l.icon} onChange={e=>updateLink(l.id,"icon",e.target.value)}>{["link","globe","file","github","linkedin","instagram","mail","award","send","camera","cloud"].map(x=><option key={x} value={x}>{x}</option>)}</select></label><label>Short description<input value={l.description||""} onChange={e=>updateLink(l.id,"description",e.target.value)} placeholder="Optional"/></label></div>
        </div>)}
      </div>}
      {tab === "projects" && <div className="hub-admin-section">
        <div className="hub-section-row"><p className="hub-admin-intro">Choose up to three visible featured projects and adjust their presentation.</p><button type="button" className="hub-admin-primary" onClick={()=>change(o=>({...o,projects:[...o.projects,{id:crypto.randomUUID(),name:"New project",description:"Project description",url:"/projects/",image:"",visible:false}]}))}><Plus size={16}/> Add project</button></div>
        {draft.projects.map((p,i)=><div className="hub-edit-card" key={p.id}>
          <div className="hub-edit-card-top"><span className="hub-edit-order">#{i+1}</span><strong>{p.name}</strong><div className="hub-edit-controls">
            <button type="button" disabled={i===0} title="Move up" onClick={()=>change(o=>({...o,projects:move(o.projects,i,-1)}))}><ArrowUp size={17}/></button>
            <button type="button" disabled={i===draft.projects.length-1} title="Move down" onClick={()=>change(o=>({...o,projects:move(o.projects,i,1)}))}><ArrowDown size={17}/></button>
            <button type="button" title={p.visible?"Hide":"Show"} onClick={()=>updateProject(p.id,"visible",!p.visible)}>{p.visible?<Eye size={17}/>:<EyeOff size={17}/>}</button>
            <button type="button" title="Delete" onClick={()=>{if(confirm("Delete this project from your draft?"))change(o=>({...o,projects:o.projects.filter(x=>x.id!==p.id)}));}}><Trash2 size={16}/></button>
          </div></div>
          <div className="hub-form-grid"><label>Project name<input value={p.name} onChange={e=>updateProject(p.id,"name",e.target.value)}/></label><label>Subtitle<input value={p.description} onChange={e=>updateProject(p.id,"description",e.target.value)}/></label><label className="hub-form-wide">Destination<input value={p.url} onChange={e=>updateProject(p.id,"url",e.target.value)}/></label><label className="hub-form-wide">Cover image path<input value={p.image} onChange={e=>updateProject(p.id,"image",e.target.value)}/></label></div>
        </div>)}
      </div>}
      {tab === "appearance" && <div className="hub-admin-section">
        <p className="hub-admin-intro">Choose <strong>one theme</strong> for everyone who visits your public Link Hub. All 14 styles are available here; visitors cannot change the theme themselves.</p>
        <div className="hub-admin-card">
          <div className="hub-admin-card-heading"><h2>Choose your public theme</h2><button type="button" className="hub-admin-secondary" onClick={openThemePreview}><Smartphone size={16}/> Preview selection</button></div>
          <p>Selected draft: <strong>{getSelectedHubTemplate(draft.design).name}</strong> · Published: <strong>{getSelectedHubTemplate(live.design).name}</strong></p>
          <div className="hub-template-grid" role="group" aria-label="Choose one public theme">
            {HUB_TEMPLATES.map(template=><button
              type="button"
              key={template.id}
              className={"hub-template-tile" + (getSelectedHubTemplate(draft.design).id === template.id ? " is-selected" : "")}
              style={{ "--template-accent": template.accent, "--template-bg": template.bg, "--template-surface": template.surface, "--template-ink": template.ink } as React.CSSProperties}
              aria-pressed={getSelectedHubTemplate(draft.design).id === template.id}
              onClick={()=>selectTemplate(template)}
            >
              <span className={"hub-template-mini hub-template-" + template.id} aria-hidden="true">
                <span className="hub-template-mini-brand">NM.</span>
                <span className="hub-template-mini-portrait"/>
                <span className="hub-template-mini-title"/>
                <span className="hub-template-mini-subtitle"/>
                <span className="hub-template-mini-social"><i/><i/><i/><i/></span>
                <span className="hub-template-mini-main"/>
                <span className="hub-template-mini-secondary"/>
                <span className="hub-template-mini-project"/><span className="hub-template-mini-project"/>
              </span>
              <span className="hub-template-label"><strong>{template.name}</strong>{getSelectedHubTemplate(draft.design).id === template.id ? <Check size={16} aria-hidden="true"/> : null}</span>
              <small>{isLightHubTemplate(template.id) ? "Light · " : "Dark · "}{template.detail}</small>
            </button>)}
          </div>
          <p className="hub-setting-description">Select a template, check Preview, then Save Draft and Publish. Your current public theme remains unchanged until publishing.</p>
        </div>
        <div className="hub-admin-card">
          <div className="hub-admin-card-heading"><h2>Background settings</h2><button className="hub-admin-secondary" type="button" onClick={openThemePreview}><Smartphone size={16}/> Preview</button></div>
          <p>Customize the selected theme. Changes are kept in your draft until you publish.</p>
          <div className="hub-background-controls">
            <label>Background intensity: {draft.design.background?.intensity ?? 60}%
              <input aria-label="Background intensity" type="range" min={0} max={100} step={5} value={draft.design.background?.intensity ?? 60} onChange={e=>setBackground("intensity", Number(e.target.value))}/>
            </label>
            <label>Background placement
              <select value={draft.design.background?.placement ?? "top"} onChange={e=>setBackground("placement", e.target.value as HubBackgroundSettings["placement"])}>
                <option value="profile">Profile only</option>
                <option value="top">Top section</option>
                <option value="full">Full page</option>
              </select>
            </label>
            <label>Card surface opacity: {draft.design.background?.cardOpacity ?? 100}%
              <input aria-label="Card surface opacity" type="range" min={85} max={100} step={5} value={draft.design.background?.cardOpacity ?? 100} onChange={e=>setBackground("cardOpacity", Number(e.target.value))}/>
            </label>
            <div>
              <label className="hub-setting-toggle"><input type="checkbox" checked={draft.design.background?.texture ?? true} onChange={e=>setBackground("texture", e.target.checked)}/> Background line texture</label>
              <label className="hub-setting-toggle"><input type="checkbox" checked={draft.design.background?.motion ?? false} onChange={e=>setBackground("motion", e.target.checked)}/> Subtle ambient motion</label>
              <p className="hub-setting-description">Motion stays off by default and respects visitors&apos; reduced-motion preferences.</p>
            </div>
          </div>
        </div>
        <div className="hub-admin-card"><h2>Accent fine-tuning</h2>
          <p>Customize the accent for <strong>{getSelectedHubTemplate(draft.design).name}</strong>. Choosing another template will load that template&apos;s recommended accent.</p>
          <div className="hub-form-grid"><label>Selected theme accent<input type="color" value={isLightHubTemplate(getSelectedHubTemplate(draft.design).id) ? draft.design.lightAccent : draft.design.darkAccent} onChange={e=>design(isLightHubTemplate(getSelectedHubTemplate(draft.design).id) ? "lightAccent" : "darkAccent", e.target.value)}/></label></div>
        </div>
        <div className="hub-admin-card"><h2>Profile</h2><div className="hub-form-grid">{(["name","headline","bio"] as const).map(k=><label className={k==="bio"?"hub-form-wide":""} key={k}>{k==="name"?"Display name":k==="headline"?"Headline":"Short bio"}<input value={draft.profile[k]} onChange={e=>profile(k,e.target.value)}/></label>)}</div></div>
      </div>}
      {tab === "media" && <div className="hub-admin-section"><p className="hub-admin-intro">Manage your portrait, resume, and project artwork. Images and PDFs are limited to 3.5 MB per file.</p>
        <div className="hub-admin-card"><h2>Profile portrait</h2><p>Current file: {draft.profile.portrait}</p><label className="hub-upload"><Upload size={17}/> Upload new portrait<input disabled={!storageReady||busy} type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>{const file=e.target.files?.[0];if(file)void upload(file,"portrait");}}/></label></div>
        <div className="hub-admin-card"><h2>Resume PDF</h2><p>Current file: {draft.profile.resume}</p><label className="hub-upload"><FileText size={17}/> Replace resume<input disabled={!storageReady||busy} type="file" accept="application/pdf" onChange={e=>{const file=e.target.files?.[0];if(file)void upload(file,"resume");}}/></label></div>
        <div className="hub-admin-card"><h2>Project covers</h2>{draft.projects.map(p=><div key={p.id} className="hub-media-row"><span>{p.name}</span><label className="hub-upload"><ImageUp size={16}/> Upload cover<input disabled={!storageReady||busy} type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>{const file=e.target.files?.[0];if(file)void upload(file,p.id);}}/></label></div>)}</div>
      </div>}
      {tab === "sharing" && <div className="hub-admin-section"><p className="hub-admin-intro">A single QR code for your portfolio, social bios, and business cards.</p><div className="hub-admin-card hub-qr-card">{qr?<img src={qr} alt="QR code linking to nebiyumekonnen.com/links" width={250} height={250}/>:<Loader2 className="hub-spin"/>}<strong>nebiyumekonnen.com/links</strong><div className="hub-toolbar-actions"><button className="hub-admin-secondary" onClick={()=>navigator.clipboard.writeText("https://nebiyumekonnen.com/links")}><Share2 size={16}/> Copy URL</button><button className="hub-admin-primary" disabled={!qr} onClick={()=>{const a=document.createElement("a");a.href=qr;a.download="nebiyu-links-qr.png";a.click();}}><Download size={16}/> Download PNG</button></div></div></div>}
      {tab === "settings" && <div className="hub-admin-section">
        <div className="hub-admin-card"><h2>Backup & restore</h2><p>Download your current draft configuration to keep your own backup.</p><button type="button" className="hub-admin-secondary" onClick={exportBackup}><Download size={16}/> Export JSON backup</button></div>
        <div className="hub-admin-card"><h2>Publication history</h2><p>Restore an earlier published version into your draft. It won&apos;t go live until you publish again.</p>{history.length ? <div className="hub-toolbar-actions"><select value={revision} onChange={e=>setRevision(e.target.value)}><option value="">Select previous version</option>{history.map(x=><option key={x} value={x}>{x.replace("link-hub/history/","").replace(".json","")}</option>)}</select><button type="button" className="hub-admin-secondary" disabled={!revision || !storageReady || busy} onClick={()=>save("restore",revision)}>Restore to draft</button></div> : <p>No previous published versions yet.</p>}</div>
        <div className="hub-admin-card"><h2>Security</h2><p>Admin access uses an HTTP-only, signed, short-lived cookie. Change the password and session secret from your Vercel environment settings.</p><button type="button" className="hub-admin-secondary" onClick={logout}><LogOut size={16}/> Sign out</button></div>
      </div>}
      <div className="hub-admin-bottom">LINK HUB STUDIO <span>·</span> MADE FOR NEBIYU MEKONNEN</div>
    </main>
    {showPreview && <div className="hub-preview-overlay" role="dialog" aria-modal="true" aria-label="Preview selected link hub theme"><div className="hub-preview-header"><strong>Draft preview: {getSelectedHubTemplate(draft.design).name}</strong><span>Visitors will see this theme after publishing.</span><button onClick={()=>setShowPreview(false)} aria-label="Close preview"><X size={22}/></button></div><div className="hub-preview-body"><HubExperience content={draft} compact/></div></div>}
  </div>;
}
