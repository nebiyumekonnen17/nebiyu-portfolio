"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, KeyRound, Loader2, LockKeyhole, LogOut, Shield, ShieldCheck, Smartphone, X } from "lucide-react";
import { StudioLogin } from "@/components/link-hub/StudioLogin";

type Setup={secret:string;uri:string;expiresAt:number};
async function api(url:string,options?:RequestInit){
  const response=await fetch(url,{cache:"no-store",credentials:"same-origin",...options});
  const body=await response.json();if(!response.ok)throw new Error(body.error||"Request failed");return body;
}
export function StudioSecurity(){
  const[authenticated,setAuthenticated]=useState(false);
  const[configured,setConfigured]=useState(true);
  const[twoFactorEnabled,setTwoFactorEnabled]=useState(false);
  const[loading,setLoading]=useState(true);
  const[password,setPassword]=useState("");
  const[code,setCode]=useState("");
  const[setup,setSetup]=useState<Setup|null>(null);
  const[qrImage,setQrImage]=useState("");
  const[busy,setBusy]=useState(false);
  const[error,setError]=useState("");
  const[notice,setNotice]=useState("");
  const reload=useCallback(async()=>{const s=await api("/api/link-hub/security");setTwoFactorEnabled(s.enabled);},[]);
  useEffect(()=>{
    let mounted=true;
    api("/api/link-hub/session").then(async session=>{
      if(!mounted)return;
      setAuthenticated(session.authenticated);setConfigured(session.configured);setTwoFactorEnabled(session.twoFactorEnabled);
      if(session.authenticated)await reload();
    }).catch(e=>{if(mounted)setError(e.message);}).finally(()=>{if(mounted)setLoading(false);});
    return()=>{mounted=false;};
  },[reload]);
  useEffect(()=>{
    let valid=true;
    if(setup)QRCode.toDataURL(setup.uri,{width:280,margin:2,errorCorrectionLevel:"M"}).then(value=>{if(valid)setQrImage(value);}).catch(()=>{});
    return()=>{valid=false;};
  },[setup]);
  async function signedIn(){setAuthenticated(true);await reload();}
  async function action(name:"begin"|"confirm"|"disable"){
    setBusy(true);setError("");setNotice("");
    try{
      const s=await api("/api/link-hub/security",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:name,password,code})});
      if(name==="begin"){setSetup(s.setup);setCode("");setNotice("Scan the QR using your authenticator, then enter a fresh 6-digit code.");}
      else{setPassword("");setCode("");setSetup(null);window.location.replace("/manage");}
    }catch(e){setError(e instanceof Error?e.message:"Security update failed");}
    finally{setBusy(false);}
  }
  async function signOut(){await api("/api/link-hub/session",{method:"DELETE"});setAuthenticated(false);}
  if(loading)return <div className="studio-root studio-loading"><Loader2 className="studio-spin"/> Checking security…</div>;
  if(!authenticated)return <StudioLogin configured={configured} twoFactorEnabled={twoFactorEnabled} onSignedIn={signedIn}/>;
  return <div className="studio-root studio-security-root">
    <header className="studio-security-header"><Link href="/manage"><ArrowLeft size={18}/> Back to dashboard</Link><strong><Shield size={18}/> ACCOUNT SECURITY</strong><button onClick={signOut}><LogOut size={16}/> Sign out</button></header>
    <main className="studio-security-content">
      <div className="studio-eyebrow">NEBIYU LINKS STUDIO / SECURITY</div><h1>Protect your workspace.</h1><p className="studio-muted">Your Link Hub, redirect destinations, and publishing tools should only be accessible to you.</p>
      {error&&<div role="alert" className="studio-error">{error}<button aria-label="Dismiss" onClick={()=>setError("")}><X size={16}/></button></div>}
      {notice&&<div role="status" className="studio-success"><CheckCircle2 size={17}/>{notice}</div>}
      <div className="studio-security-layout">
        <section className="studio-security-card">
          <div className="studio-security-card-heading"><span><Smartphone size={23}/></span><div><h2>Authenticator-app 2FA</h2><p>Require a rotating code in addition to your admin password.</p></div><span className={twoFactorEnabled?"studio-live":"studio-paused"}>{twoFactorEnabled?"ON":"OFF"}</span></div>
          <div className="studio-security-form">
            {!twoFactorEnabled&&!setup&&<p>Use Google Authenticator, Microsoft Authenticator, 1Password, or another TOTP app. Nothing is enabled until you confirm a code.</p>}
            {setup&&<div className="studio-enrollment"><h3>1. Scan this one-time setup code</h3><div className="studio-secret-qr">{qrImage?<img src={qrImage} alt="Authenticator setup QR code" width={230} height={230}/>:<Loader2 className="studio-spin"/>}</div><p>Or enter this key manually in your authenticator:</p><code>{setup.secret}</code><p className="studio-muted">This setup expires in 10 minutes. Keep this secret private.</p><h3>2. Confirm an authenticator code</h3></div>}
            {twoFactorEnabled&&<div className="studio-success"><CheckCircle2 size={17}/> Your account requires a 6-digit authenticator code at sign-in.</div>}
            <label>Current administrator password<input type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Required to update security" required/></label>
            {(twoFactorEnabled||setup)&&<label>6-digit authenticator code<input type="text" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" value={code} onChange={e=>setCode(e.target.value.replace(/\D/g,"").slice(0,6))} placeholder="000000" maxLength={6}/></label>}
            {!twoFactorEnabled&&!setup&&<button disabled={busy||!password} onClick={()=>action("begin")} className="studio-button studio-button-primary"><KeyRound size={16}/> Start two-factor setup</button>}
            {!twoFactorEnabled&&setup&&<button disabled={busy||!password||code.length!==6} onClick={()=>action("confirm")} className="studio-button studio-button-primary"><ShieldCheck size={17}/> Verify and enable 2FA</button>}
            {twoFactorEnabled&&<button disabled={busy||!password||code.length!==6} onClick={()=>action("disable")} className="studio-button studio-button-danger">Disable 2FA with password and code</button>}
            {setup&&!twoFactorEnabled&&<button type="button" className="studio-text-action" onClick={()=>{setSetup(null);setQrImage("");setCode("");}}>Cancel enrollment</button>}
          </div>
        </section>
        <aside className="studio-security-side">
          <div className="studio-security-info"><LockKeyhole size={21}/><div><strong>Protected administrator password</strong><p>Password is checked against a scrypt hash stored in Vercel environment settings, never saved in the browser.</p></div></div>
          <div className="studio-security-info"><Clock size={21}/><div><strong>Four-hour sessions</strong><p>HTTP-only, secure, same-site cookies. Sessions end after four hours or sign-out.</p></div></div>
          <div className="studio-security-info"><ShieldCheck size={21}/><div><strong>Shared sign-in protection</strong><p>Eight failed attempts trigger a 15-minute per-IP lockout backed by private storage.</p></div></div>
          <div className="studio-security-info"><Shield size={21}/><div><strong>Private storage</strong><p>Authenticator setup secrets are encrypted at rest. Updating security requires your password.</p></div></div>
          <Link href="/manage" className="studio-account-link">Return to dashboard <ArrowRight size={16}/></Link>
        </aside>
      </div>
      <p className="studio-security-warning">Save your authenticator in a secure backup before enabling 2FA. If you lose access to your authenticator, account recovery requires an administrator to securely reset the stored 2FA configuration.</p>
    </main>
  </div>;
}
