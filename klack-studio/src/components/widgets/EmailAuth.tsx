"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";

/** 이메일 로그인 · 회원가입 폼 → /api/auth/email */
export default function EmailAuth({ next }: { next: string }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setErr(null);
    try {
      const r = await fetch("/api/auth/email", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ mode, email, password, nickname, agree, next }) });
      const j = await r.json().catch(() => null);
      if (!j?.ok) return void setErr(j?.message ?? "처리하지 못했습니다. 잠시 후 다시 시도해 주세요.");
      location.href = j.data?.next || "/";
    } catch {
      setErr("서버와 연결하지 못했습니다.");
    } finally {
      setBusy(false);
    }
  };
  const tab = (m: "login" | "signup", label: string) => (
    <button
      type="button"
      role="tab"
      aria-selected={mode === m}
      onClick={() => {
        setMode(m);
        setErr(null);
      }}
    >
      {label}
    </button>
  );
  return (
    <section className="ea" aria-label="이메일로 로그인 또는 가입">
      <div className="ea-or">
        <span>또는 이메일로</span>
      </div>
      <div className="ea-tabs" role="tablist">
        {tab("login", "로그인")}
        {tab("signup", "회원가입")}
      </div>
      <form className="ea-form" onSubmit={submit} noValidate>
        <label>
          <span>이메일</span>
          <input type="email" autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        {mode === "signup" && (
          <label>
            <span>
              닉네임 <small>커뮤니티 · 랭킹에 보이는 이름 (2~20자)</small>
            </span>
            <input autoComplete="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} maxLength={20} required />
          </label>
        )}
        <label>
          <span>
            비밀번호{mode === "signup" && <small> 영문 + 숫자 8자 이상</small>}
          </span>
          <input type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {mode === "signup" && (
          <label className="ea-agree">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <span>
              <Link href="/terms" target="_blank">
                이용약관
              </Link>
              과{" "}
              <Link href="/privacy" target="_blank">
                개인정보 수집·이용
              </Link>
              (이메일 · 닉네임)에 동의합니다.
            </span>
          </label>
        )}
        {err && (
          <p className="ea-err" role="alert">
            {err}
          </p>
        )}
        <button type="submit" className="ea-submit" disabled={busy}>
          {busy ? "처리 중…" : mode === "login" ? "이메일로 로그인" : "가입하고 시작하기"}
        </button>
      </form>
    </section>
  );
}
