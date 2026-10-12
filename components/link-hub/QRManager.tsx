"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { StudioLogin } from "@/components/link-hub/StudioLogin";
import {
  ArrowUpRight, Check, Clock3, Copy, Download, Edit3, Palette,
  ExternalLink, Link2, Loader2, LogOut, Plus, QrCode,
  RotateCcw, Save, Search, ShieldCheck, X,
} from "lucide-react";

type QR = {
  slug: string; title: string; target: string; enabled: boolean;
  createdAt: string; updatedAt: string;
};
const base = "https://links.nebiyumekonnen.com/q/";
const blank = { title: "", slug: "", target: "", enabled: true };
type Form = typeof blank;
async function api(path: string, options?: RequestInit) {
  const response = await fetch(path, { cache: "no-store", credentials: "same-origin", ...options });
  const json = await response.json();
  if (!response.ok) throw new Error(json.error || "Request failed");
  return json;
}
const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);

export function QRManager() {
  const [authenticated, setAuthenticated] = useState(false);
  const [configured, setConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [items, setItems] = useState<QR[]>([]);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [form, setForm] = useState<Form>(blank);
  const [editing, setEditing] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [rendered, setRendered] = useState<{ slug: string; data: string } | null>(null);
  const [historyState, setHistoryState] = useState<{ slug: string; records: QR[] } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const selected = items.find(item => item.slug === selectedSlug) || null;
  const image = rendered?.slug === selectedSlug ? rendered.data : "";
  const history = historyState?.slug === selectedSlug ? historyState.records : [];
  const reload = useCallback(async () => {
    const result = await api("/api/link-hub/qr");
    setItems(result.items);
    setSelectedSlug(old => result.items.some((item: QR) => item.slug === old) ? old : (result.items[0]?.slug || ""));
  }, []);
  useEffect(() => {
    let live = true;
    api("/api/link-hub/session").then(async session => {
      if (!live) return;
      setAuthenticated(session.authenticated);
      setConfigured(session.configured);
      setTwoFactorEnabled(session.twoFactorEnabled);
      if (session.authenticated) await reload();
    }).catch(err => { if (live) setError(err.message); })
      .finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, [reload]);
  useEffect(() => {
    let live = true;
    if (selectedSlug) QRCode.toDataURL(base + selectedSlug, {
      width: 480, margin: 3, errorCorrectionLevel: "H",
      color: { dark: "#17263D", light: "#FFFFFF" },
    }).then(data => { if (live) setRendered({ slug: selectedSlug, data }); }).catch(() => {});
    return () => { live = false; };
  }, [selectedSlug]);
  useEffect(() => {
    if (!selectedSlug || !authenticated) return;
    let live = true;
    api("/api/link-hub/qr?history=" + encodeURIComponent(selectedSlug))
      .then(data => { if (live) setHistoryState({ slug: selectedSlug, records: data.history || [] }); })
      .catch(() => { if (live) setHistoryState({ slug: selectedSlug, records: [] }); });
    return () => { live = false; };
  }, [selectedSlug, authenticated, items]);

  async function signOut() {
    try { await api("/api/link-hub/session", { method: "DELETE" }); }
    finally { setAuthenticated(false); setItems([]); setSelectedSlug(""); setEditing(null); }
  }
  function startNew() { setEditing(""); setForm(blank); setError(""); setNotice(""); }
  function startEdit(item: QR) {
    setEditing(item.slug);
    setSelectedSlug(item.slug);
    setForm({ title: item.title, slug: item.slug, target: item.target, enabled: item.enabled });
    setError(""); setNotice("");
  }
  async function save(event?: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setBusy(true); setError(""); setNotice("");
    try {
      const response = await api("/api/link-hub/qr", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: editing ? "update" : "create", ...form }),
      });
      await reload();
      setSelectedSlug(response.item.slug);
      setEditing(null);
      setNotice(editing ? "QR destination updated. The printed code stays the same." : "Permanent QR created. You can print it now.");
    } catch (err) { setError(err instanceof Error ? err.message : "Could not save"); }
    finally { setBusy(false); }
  }
  async function toggle(item: QR) {
    if (busy) return;
    setBusy(true); setError(""); setNotice("");
    try {
      await api("/api/link-hub/qr", { method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update", ...item, enabled: !item.enabled }),
      });
      await reload();
      setNotice(item.enabled ? "QR temporarily paused." : "QR activated.");
    } catch (err) { setError(err instanceof Error ? err.message : "Update failed"); }
    finally { setBusy(false); }
  }
  function download(kind: "png" | "svg") {
    if (!selected) return;
    if (kind === "png") {
      if (!image) return;
      const a = document.createElement("a"); a.href = image; a.download = selected.slug + "-qr.png"; a.click();
    } else {
      QRCode.toString(base + selected.slug, { type: "svg", margin: 3, width: 1024, errorCorrectionLevel: "H" }).then(value => {
        const blob = new Blob([value], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a"); a.href = url; a.download = selected.slug + "-qr.svg"; a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }).catch(() => setError("SVG export failed."));
    }
  }
  async function copy(value: string) {
    try { await navigator.clipboard.writeText(value); setNotice("Permanent QR link copied."); }
    catch { setError("Could not access clipboard. Copy the URL directly."); }
  }

  if (loading) return <div className="qm-screen qm-center"><Loader2 className="qm-spinner" size={28}/> Checking secure access…</div>;
  if (!authenticated) return <StudioLogin configured={configured} twoFactorEnabled={twoFactorEnabled} onSignedIn={async()=>{setAuthenticated(true);await reload();}}/>;

  const matches = items.filter(item => (item.title + " " + item.slug + " " + item.target).toLowerCase().includes(search.toLowerCase()));

  return <div className="qm-screen">
    <header className="qm-header"><div className="qm-header-inner">
      <Link href="/manage" className="qm-brand"><span className="qm-brand-icon">NM</span><span>Links <strong>Studio</strong></span></Link>
      <nav aria-label="QR Manager"><Link href="/" target="_blank">Public hub <ExternalLink size={15}/></Link><Link href="/manage">Dashboard</Link><Link href="/manage/links">Link Manager</Link><Link href="/manage/security">Security</Link><button type="button" onClick={signOut}><LogOut size={15}/> Sign out</button></nav>
    </div></header>
    <main className="qm-main">
      <div className="qm-title-row"><div><p className="qm-eyebrow">LINKS STUDIO / TOOLS</p><h1>Dynamic QR Manager</h1><p>Create once, print once, change where your QR codes point whenever you need.</p></div><button type="button" className="qm-primary" onClick={startNew}><Plus size={18}/> Create QR code</button></div>
      {error && <div role="alert" className="qm-alert qm-error">{error}<button aria-label="Dismiss error" onClick={()=>setError("")}><X size={16}/></button></div>}
      {notice && <div role="status" className="qm-alert qm-success"><Check size={17}/>{notice}<button aria-label="Dismiss message" onClick={()=>setNotice("")}><X size={16}/></button></div>}
      <div className="qm-stats"><div><span>MANAGED CODES</span><strong>{items.length}</strong></div><div><span>ACTIVE CODES</span><strong>{items.filter(x=>x.enabled).length}</strong></div><div><span>PAUSED CODES</span><strong>{items.filter(x=>!x.enabled).length}</strong></div></div>
      <div className="qm-grid">
        <section className="qm-panel qm-list-panel" aria-label="Your QR codes">
          <div className="qm-panel-heading"><h2>Your QR codes</h2><span>{items.length} total</span></div>
          <label className="qm-search"><Search size={17}/><input aria-label="Search QR codes" placeholder="Find a QR code…" value={search} onChange={event=>setSearch(event.target.value)}/></label>
          {!items.length && <div className="qm-empty"><QrCode size={36}/><h3>No codes yet</h3><p>Create your first dynamic QR. Its printed URL stays permanent.</p><button className="qm-secondary" onClick={startNew}><Plus size={15}/> Create a QR</button></div>}
          {items.length>0 && matches.length===0 && <p className="qm-muted">No matching QR codes.</p>}
          <div className="qm-list">{matches.map(item => <button type="button" key={item.slug} onClick={()=>{setSelectedSlug(item.slug);setEditing(null);}} className={"qm-list-item" + (selectedSlug===item.slug && editing===null ? " active" : "")}>
            <span className="qm-list-icon"><QrCode size={19}/></span><span className="qm-list-info"><strong>{item.title}</strong><small>/q/{item.slug}</small></span><span className={"qm-dot " + (item.enabled ? "is-on" : "")} aria-label={item.enabled ? "Active" : "Paused"}/></button>)}</div>
        </section>
        <section className="qm-panel qm-detail-panel" aria-label="QR details">
          {editing !== null ? <form className="qm-editor" onSubmit={save}>
            <div className="qm-panel-heading"><h2>{editing ? "Edit destination" : "New permanent QR"}</h2><button type="button" className="qm-text-button" onClick={()=>setEditing(null)}><X size={16}/> Cancel</button></div>
            <label>QR name<input value={form.title} maxLength={90} placeholder="e.g. Girar Restaurant Menu" onChange={e=>setForm(old=>({ ...old, title:e.target.value, slug:editing ? old.slug : slugify(e.target.value) }))} required/></label>
            <label>Permanent short link<div className="qm-slug-input"><span>links.nebiyumekonnen.com/q/</span><input aria-label="QR code slug" disabled={Boolean(editing)} value={form.slug} placeholder="girar-menu" maxLength={48} onChange={e=>setForm(old=>({ ...old, slug:slugify(e.target.value) }))} required/></div></label>
            {editing && <p className="qm-hint"><ShieldCheck size={15}/> Permanent slug is locked to protect already-printed codes.</p>}
            <label>Current destination URL<input type="url" value={form.target} placeholder="https://your-website.com/menu" onChange={e=>setForm(old=>({ ...old, target:e.target.value }))} required/></label>
            <label className="qm-check"><input type="checkbox" checked={form.enabled} onChange={e=>setForm(old=>({ ...old, enabled:e.target.checked }))}/> QR is active</label>
            <div className="qm-editor-actions"><button type="submit" className="qm-primary" disabled={busy || !form.title || !form.slug || !form.target}><Save size={17}/> {busy ? "Saving…" : editing ? "Update destination" : "Create permanent QR"}</button></div>
          </form> : selected ? <>
            <div className="qm-panel-heading"><div><h2>{selected.title}</h2><span className={selected.enabled ? "qm-tag on" : "qm-tag"}>{selected.enabled ? "Active" : "Paused"}</span></div><button type="button" onClick={()=>startEdit(selected)} className="qm-secondary"><Edit3 size={15}/> Edit</button></div>
            <div className="qm-preview-layout"><div className="qm-preview">{image ? <img src={image} width={234} height={234} alt={"QR code for " + base + selected.slug}/> : <Loader2 className="qm-spinner"/>}</div><div className="qm-details"><span>PERMANENT LINK</span><p className="qm-permalink">{base + selected.slug}</p><button className="qm-inline-link" onClick={()=>copy(base + selected.slug)}><Copy size={15}/> Copy URL</button><span>CURRENT DESTINATION</span><a href={selected.target} target="_blank" rel="noopener noreferrer" className="qm-target">{selected.target} <ArrowUpRight size={15}/></a><span>LAST UPDATED</span><p>{new Date(selected.updatedAt).toLocaleString()}</p></div></div>
            <div className="qm-premium-prompt"><div><Palette size={23}/><strong>Premium QR Designer</strong><p>Add your logo, pick a signature style, use gradients, and download a framed print-ready QR.</p></div><Link href={"/manage/qr/designer?slug="+encodeURIComponent(selected.slug)} className="qm-primary">Customize design <ArrowUpRight size={16}/></Link></div>
            <div className="qm-download"><button className="qm-primary" disabled={!image} onClick={()=>download("png")}><Download size={16}/> Download PNG</button><button className="qm-secondary" onClick={()=>download("svg")}><Download size={16}/> Download SVG</button></div>
            <div className="qm-foot-actions"><button className="qm-secondary" disabled={busy} onClick={()=>toggle(selected)}>{selected.enabled ? "Pause redirects" : "Reactivate QR"}</button><span><ShieldCheck size={15}/> Your QR image never changes when the destination changes.</span></div>
            {history.length > 0 && <div className="qm-history"><h3><Clock3 size={17}/> Previous destinations</h3>{history.slice(0,5).map((old,i)=><div key={i}><span>{new Date(old.updatedAt).toLocaleString()}</span><p>{old.target}</p><button type="button" onClick={()=>{startEdit(selected);setForm({ title:selected.title, slug:selected.slug, target:old.target, enabled:selected.enabled });}}><RotateCcw size={13}/> Restore by editing</button></div>)}</div>}
          </> : <div className="qm-empty"><Link2 size={36}/><h3>Your permanent links, in one place.</h3><p>Create a QR code for menus, flyers, NFC tags, events, or business cards.</p><button className="qm-primary" onClick={startNew}><Plus size={16}/> Create QR code</button></div>}
        </section>
      </div>
      <div className="qm-bottom"><ShieldCheck size={17}/> QR destinations are private, saved in your existing Blob storage. Printed codes use uncached 302 redirects.</div>
    </main>
  </div>;
}
