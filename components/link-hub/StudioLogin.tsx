"use client";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function StudioLogin({ configured, twoFactorEnabled, onSignedIn }: {
  configured: boolean;
  twoFactorEnabled: boolean;
  onSignedIn: () => Promise<void>;
}) {
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setBusy(true);
    try {
      const response = await fetch("/api/link-hub/session", {
        method: "POST", credentials: "same-origin", cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, code }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to sign in.");
      setPassword(""); setCode(""); await onSignedIn();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to sign in."); }
    finally { setBusy(false); }
  }
  return <div className="studio-root studio-login-page">
    <div className="studio-login-card">
      <Link href="/" className="studio-login-back">NM<span> / LINKS STUDIO</span></Link>
      <div className="studio-login-emblem"><LockKeyhole size={28}/></div>
      <div className="studio-eyebrow">SECURE PRIVATE WORKSPACE</div>
      <h1>Welcome back.</h1>
      <p className="studio-muted">One sign-in to manage your Link Hub, dynamic QR codes, and account security.</p>
      <form onSubmit={submit} className="studio-login-form">
        <label>Administrator password
          <span className="studio-password-wrap"><input type={showPassword ? "text" : "password"} required autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} disabled={busy||!configured} placeholder="Enter password"/><button type="button" aria-label={showPassword?"Hide password":"Show password"} onClick={()=>setShowPassword(!showPassword)}>{showPassword?<EyeOff size={18}/>:<Eye size={18}/>}</button></span>
        </label>
        {twoFactorEnabled && <label>Authenticator code
          <input inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} placeholder="6-digit code" required value={code} onChange={e=>setCode(e.target.value.replace(/\D/g,"").slice(0,6))}/>
        </label>}
        {error && <div className="studio-error" role="alert">{error}</div>}
        {!configured && <div className="studio-error">Admin login needs server configuration.</div>}
        <button type="submit" className="studio-button studio-button-primary" disabled={busy||!configured}>{busy?"Verifying…":"Sign in securely"}<ArrowRight size={17}/></button>
      </form>
      <div className="studio-login-footer"><ShieldCheck size={17}/> Secure cookie · 4-hour sessions {twoFactorEnabled ? "· Authenticator required" : ""}</div>
    </div>
  </div>;
}
