"use client";
import Link from "next/link";
import { useCallback, useEffect, useId, useState, type FormEvent } from "react";
import { IcoStar } from "@/components/icons";

type Review = { id: number; rating: number; author: string; body: string; createdAt: string; pointsGiven?: number };
type Data = { items: Review[]; rating: { avg: number; count: number }; mine: boolean; event?: { points: number; minLength: number; perDay: number; title: string; loggedIn: boolean } };
const HINT = ["", "별로예요", "그저 그래요", "보통이에요", "좋아요", "최고예요"];

function ReviewForm({ productId, onCreated }: { productId: number; onCreated: (r: Review) => void }) {
  const uid = useId();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const shown = hover || rating;
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (rating < 1) return void setErr("별점을 선택해 주세요.");
    if (!author.trim()) return void setErr("작성자명을 입력해 주세요.");
    if (!body.trim()) return void setErr("후기 내용을 입력해 주세요.");
    setBusy(true);
    setErr("");
    try {
      const r = await fetch("/api/reviews", { method: "POST", headers: { "content-type": "application/json", accept: "application/json" }, body: JSON.stringify({ productId, rating, author: author.trim(), body: body.trim() }) });
      const j = await r.json().catch(() => null);
      if (j?.ok) {
        onCreated(j.data);
        setRating(0);
        setAuthor("");
        setBody("");
      } else setErr(j?.message ?? "후기를 저장하지 못했습니다.");
    } catch {
      setErr("네트워크 오류가 발생했습니다.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <form className="rv-form" onSubmit={submit} aria-busy={busy}>
      <fieldset className="rv-rate" onMouseLeave={() => setHover(0)}>
        <legend>
          별점 <span className="rv-rate-hint">{shown ? HINT[shown] : "선택해 주세요"}</span>
        </legend>
        <div className="rv-rate-stars">
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className={`rv-star${n <= shown ? " is-on" : ""}`} onMouseEnter={() => setHover(n)}>
              <input type="radio" name={`${uid}-rating`} value={n} className="sr-only" checked={rating === n} onChange={() => setRating(n)} disabled={busy} aria-label={`${n}점 · ${HINT[n]}`} />
              <IcoStar />
            </label>
          ))}
        </div>
      </fieldset>
      <label className="rv-field">
        <span>작성자명</span>
        <input type="text" value={author} maxLength={40} disabled={busy} required autoComplete="nickname" placeholder="이름 또는 닉네임" onChange={(e) => setAuthor(e.target.value)} />
      </label>
      <label className="rv-field">
        <span>
          후기{" "}
          <em className="rv-count" aria-live="polite">
            {body.length} / 1000
          </em>
        </span>
        <textarea value={body} maxLength={1000} rows={5} disabled={busy} required placeholder="상품을 사용해 보신 솔직한 느낌을 남겨 주세요." onChange={(e) => setBody(e.target.value)} />
      </label>
      {err && (
        <p className="rv-err" role="alert">
          {err}
        </p>
      )}
      <div className="rv-form-foot">
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? "등록 중…" : "후기 등록"}
        </button>
      </div>
    </form>
  );
}

function Stars({ value, size = "sm" }: { value: number; size?: "sm" | "md" }) {
  const v = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <span className={`rv-stars is-${size}`} role="img" aria-label={`별점 ${v}점 (5점 만점)`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <i key={n} className={n <= v ? "is-on" : undefined} aria-hidden="true">
          <IcoStar />
        </i>
      ))}
    </span>
  );
}

/** 상품 후기 — 목록 · 평균 별점 · 작성 폼 */
export default function Reviews({ productId }: { productId: number }) {
  const [data, setData] = useState<Data | null>(null);
  const [award, setAward] = useState(0);
  const [err, setErr] = useState("");
  const load = useCallback(async () => {
    setErr("");
    try {
      const r = await fetch(`/api/reviews?productId=${productId}`, { headers: { accept: "application/json" } });
      const j = await r.json().catch(() => null);
      if (j?.ok) setData(j.data);
      else setErr(j?.message ?? "후기를 불러오지 못했습니다.");
    } catch {
      setErr("네트워크 오류가 발생했습니다.");
    }
  }, [productId]);
  useEffect(() => {
    load();
  }, [load]);

  if (err)
    return (
      <div className="rv">
        <p className="rv-err" role="alert">
          {err}
        </p>
        <button type="button" className="btn btn-ghost btn-sm" onClick={load}>
          다시 불러오기
        </button>
      </div>
    );
  if (!data)
    return (
      <p className="rv-loading" aria-live="polite">
        후기를 불러오는 중…
      </p>
    );
  return (
    <div className="rv">
      {data.rating.count > 0 && (
        <div className="rv-summary">
          <strong className="rv-avg">{data.rating.avg.toFixed(1)}</strong>
          <div>
            <Stars value={data.rating.avg} size="md" />
            <span className="rv-total">후기 {data.rating.count.toLocaleString("ko-KR")}개</span>
          </div>
        </div>
      )}
      {award > 0 && (
        <p className="rv-award" role="status">
          후기 작성 이벤트로 <b>{award.toLocaleString("ko-KR")}P</b> 가 적립되었습니다.
        </p>
      )}
      {data.event && !data.mine && (
        <p className="rv-event">
          <b>{data.event.title}</b> {data.event.minLength}자 이상 후기를 남기면 <b>{data.event.points.toLocaleString("ko-KR")}P</b> 적립(하루 {data.event.perDay}회).
          {!data.event.loggedIn && (
            <>
              {" "}
              <Link href={`/login?next=${encodeURIComponent(typeof location !== "undefined" ? location.pathname : "/")}`}>로그인</Link>한 회원만 적립됩니다.
            </>
          )}{" "}
          <Link href="/events/review">자세히 ›</Link>
        </p>
      )}
      {data.mine ? (
        <p className="rv-note">이 상품에는 이미 후기를 남기셨습니다. 감사합니다.</p>
      ) : (
        <ReviewForm
          productId={productId}
          onCreated={(r) => {
            if (r.pointsGiven) setAward(r.pointsGiven);
            setData((d) => {
              if (!d) return { items: [r], rating: { avg: r.rating, count: 1 }, mine: true };
              const count = d.rating.count + 1;
              const avg = Math.round(((d.rating.avg * d.rating.count + r.rating) * 10) / count) / 10;
              return { ...d, items: [r, ...d.items], rating: { avg, count }, mine: true };
            });
          }}
        />
      )}
      {data.items.length === 0 ? (
        <p className="rv-empty">
          아직 등록된 후기가 없습니다. <b>첫 후기를 남겨주세요.</b>
        </p>
      ) : (
        <ul className="rv-list" aria-label="후기 목록">
          {data.items.map((r) => (
            <li key={r.id} className="rv-item">
              <div className="rv-item-h">
                <Stars value={r.rating} />
                <span className="rv-author">{r.author}</span>
                <time className="rv-date" dateTime={r.createdAt.replace(" ", "T")}>
                  {r.createdAt.slice(0, 10).replace(/-/g, ".")}
                </time>
              </div>
              <p className="rv-body">{r.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
