"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Activity, ArrowRight, ArrowUpRight, CheckCircle2, Clock3, ExternalLink, LayoutDashboard,
  Link2, Loader2, LockKeyhole, LogOut, PencilRuler, Plus, QrCode, Shield, ShieldCheck, Sparkles } from "lucide-react";
import { StudioLogin } from "@/components/link-hub/StudioLogin";

type Data = {
  hub: { visibleLinks:number; allLinks:number; publishedProjects:number; draftLinks:number; template:string };
  qr: { total:number; active:number; paused:number; recentlyUpdated: Array<{slug:string;title:string;target:string;updatedAt:string;enabled:boolean}> };
  security: { twoFactorEnabled:boolean; sessionHours:number };
};
async function json(url:string, options?:RequestInit) {
  const response = await fetch(url,{credentials:"same-origin",cache:"no-store",...options});
  const body = await response.json();
  if (!response.ok) throw new Error(body.error || "Request failed");
  return body;
}
export function StudioDashboard() {
  const [authenticated,setAuthenticated]=useState(false);
  const [configured,setConfigured]=useState(true);
  const [twoFactorEnabled,setTwoFactorEnabled]=useState(false);
  const [loading,setLoading]=useState(true);
  const [data,setData]=useState<Data|null>(null);
  const [error,setError]=useState("");
  const reload=useCallback(async()=>{setData(await json("/api/link-hub/studio"));},[]);
  useEffect(()=>{
    let mounted=true;
    json("/api/link-hub/session").then(async s=>{
      if(!mounted)return;
      setAuthenticated(s.authenticated);setConfigured(s.configured);setTwoFactorEnabled(s.twoFactorEnabled);
      if(s.authenticated)await reload();
    }).catch(e=>{if(mounted)setError(e.message);}).finally(()=>{if(mounted)setLoading(false);});
    return()=>{mounted=false;};
  },[reload]);
  async function signedIn(){setAuthenticated(true);await reload();}
  async function signOut(){await json("/api/link-hub/session",{method:"DELETE"});setAuthenticated(false);setData(null);}
  if(loading)return <div className="studio-root studio-loading"><Loader2 className="studio-spin" size={25}/> Loading your workspace…</div>;
  if(!authenticated)return <StudioLogin configured={configured} twoFactorEnabled={twoFactorEnabled} onSignedIn={signedIn}/>;
  return <div className="studio-root">
    <aside className="studio-sidebar">
      <Link className="studio-brand" href="/"><span className="studio-monogram">NM</span><span>LINKS <strong>STUDIO</strong><small>CONTROL CENTER</small></span></Link>
      <span className="studio-nav-label">WORKSPACE</span>
      <nav aria-label="Workspace navigation" className="studio-nav">
        <Link className="active" href="/manage"><LayoutDashboard size={19}/> Dashboard</Link>
        <Link href="/manage/links"><Link2 size={19}/> Link Manager</Link>
        <Link href="/manage/qr"><QrCode size={19}/> QR Manager</Link>
      </nav>
      <span className="studio-nav-label">ACCOUNT</span>
      <nav className="studio-nav">
        <Link href="/manage/security"><Shield size={19}/> Security</Link>
        <Link href="/" target="_blank"><ExternalLink size={19}/> Public page</Link>
      </nav>
      <button type="button" className="studio-sidebar-signout" onClick={signOut}><LogOut size={18}/> Sign out</button>
    </aside>
    <main className="studio-main">
      <header className="studio-topbar"><div><div className="studio-eyebrow">PERSONAL DIGITAL WORKSPACE</div><h1>Dashboard</h1><p>Manage the links people see and the QR codes they scan.</p></div><span className="studio-secure-indicator"><ShieldCheck size={17}/> Secure session</span></header>
      {error&&<div role="alert" className="studio-error">{error}</div>}
      <div className="studio-section-head"><h2>At a glance</h2><span>Current published settings and QR records</span></div>
      <div className="studio-metrics">
        <div className="studio-metric"><div className="studio-metric-icon"><Link2 size={20}/></div><span>PUBLIC LINKS</span><strong>{data?.hub.visibleLinks??"—"}</strong><small>{data?.hub.allLinks??"—"} total configured</small></div>
        <div className="studio-metric"><div className="studio-metric-icon"><QrCode size={20}/></div><span>DYNAMIC QR CODES</span><strong>{data?.qr.total??"—"}</strong><small>{data?.qr.active??"—"} active · {data?.qr.paused??"—"} paused</small></div>
        <div className="studio-metric"><div className="studio-metric-icon"><Sparkles size={20}/></div><span>FEATURED PROJECTS</span><strong>{data?.hub.publishedProjects??"—"}</strong><small>Visible on your hub</small></div>
        <div className="studio-metric"><div className="studio-metric-icon"><ShieldCheck size={20}/></div><span>LOGIN PROTECTION</span><strong className="studio-metric-status">{data?.security.twoFactorEnabled?"2FA ON":"PASSWORD"}</strong><small>4-hour sessions</small></div>
      </div>
      <div className="studio-section-head"><h2>Management tools</h2><span>Everything in one workspace</span></div>
      <div className="studio-tools">
        <Link href="/manage/links" className="studio-tool"><span className="studio-tool-symbol"><PencilRuler size={23}/></span><strong>Link Manager</strong><p>Edit links, projects, profile details, and all existing visual themes.</p><div className="studio-tool-meta"><span>Theme: {data?.hub.template??"—"}</span><ArrowUpRight size={18}/></div></Link>
        <Link href="/manage/qr" className="studio-tool"><span className="studio-tool-symbol"><QrCode size={23}/></span><strong>Dynamic QR Manager</strong><p>Create permanent QR links, update destinations, and download print-ready codes.</p><div className="studio-tool-meta"><span>{data?.qr.active??0} currently active</span><ArrowUpRight size={18}/></div></Link>
        <Link href="/manage/security" className="studio-tool"><span className="studio-tool-symbol"><LockKeyhole size={23}/></span><strong>Account Security</strong><p>Manage authenticator protection and review your sign-in safeguards.</p><div className="studio-tool-meta"><span>{data?.security.twoFactorEnabled?"Authenticator enabled":"Set up 2-factor authentication"}</span><ArrowUpRight size={18}/></div></Link>
      </div>
      <div className="studio-bottom-grid">
        <section className="studio-panel">
          <div className="studio-panel-top"><div><span className="studio-eyebrow">RECENT ACTIVITY</span><h2>Recently updated QR codes</h2></div><Link href="/manage/qr">View all <ArrowRight size={16}/></Link></div>
          {data?.qr.recentlyUpdated.length ? <div className="studio-recent-list">{data.qr.recentlyUpdated.map(x=><div className="studio-recent" key={x.slug}><div className="studio-qr-icon"><QrCode size={19}/></div><div className="studio-recent-title"><strong>{x.title}</strong><small>/q/{x.slug} · {new Date(x.updatedAt).toLocaleDateString()}</small></div><span className={x.enabled?"studio-live":"studio-paused"}>{x.enabled?"Active":"Paused"}</span></div>)}</div>
          :<div className="studio-empty"><QrCode size={29}/><p>No QR codes yet. Create one to get started.</p><Link href="/manage/qr" className="studio-button studio-button-secondary"><Plus size={15}/> Create QR</Link></div>}
        </section>
        <section className="studio-panel studio-account-panel"><div className="studio-panel-top"><div><span className="studio-eyebrow">WORKSPACE STATUS</span><h2>Everything in place</h2></div><Activity size={19}/></div>
          <div className="studio-check-row"><CheckCircle2 size={19}/> Link Hub editor and publishing</div>
          <div className="studio-check-row"><CheckCircle2 size={19}/> Permanent QR redirect service</div>
          <div className="studio-check-row"><CheckCircle2 size={19}/> Login attempt protection</div>
          <div className="studio-check-row"><Clock3 size={19}/> {data?.security.twoFactorEnabled?"Authenticator required to sign in":"Authenticator setup available"}</div>
          <Link href="/manage/security" className="studio-account-link">Review account security <ArrowRight size={16}/></Link>
        </section>
      </div>
      <footer className="studio-footer">NEBIYU LINKS STUDIO <span>·</span> BUILT FOR YOUR WORK</footer>
    </main>
  </div>;
}
