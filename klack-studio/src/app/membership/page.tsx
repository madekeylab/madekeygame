import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";
import TierTable, { type TierConfig } from "@/components/widgets/TierTable";
import membership from "@/data/membership.json";

export const metadata: Metadata = { title: "회원 등급별 혜택" };

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "membership", "shop-2", "shop-11"]} />
      <Band />
      <main className="page shop-main">
        <header className="ik-hero is-dark has-img">
          <div className="ik-hero-t">
            <p className="eyebrow">Membership</p>
            <h1>회원 등급별 혜택</h1>
            <p className="ik-lead">
              판매가는 모든 고객에게 같습니다. 등급은 누적 구매를 바탕으로 매월 산정되고, 등급이 오를수록 포인트 적립률과 서비스 혜택이 커집니다.
            </p>
            <ul className="ik-chips">
              <li>포인트 적립 최대 5%</li>
              <li>모든 회원 같은 판매가</li>
              <li>불량 선발송 교환</li>
              <li>공방 A/S</li>
              <li>등급별 응대 우선순위</li>
            </ul>
          </div>
          <div className="ik-collage" aria-hidden="true">
            <span className="ik-c1">
              <img src="/uploads/2026/10/2026101089875bca4b90b3d8-main.webp" alt="" loading="eager" />
            </span>
            <span className="ik-c2">
              <img src="/uploads/2026/10/2026104de8bab633530c78a4-main.webp" alt="" loading="lazy" />
            </span>
            <span className="ik-c3">
              <img src="/uploads/2026/10/202610be719d8ea29ab517d3-main.webp" alt="" loading="lazy" />
            </span>
          </div>
        </header>
        <div className="mb-mine">
          <span>로그인하면 내 등급과 혜택이 표시됩니다.</span>
          <Link className="btn" href="/login?next=%2Fmembership">
            로그인
          </Link>
        </div>
        <TierTable cfg={membership as TierConfig} />
        <ul className="mb-ladder" aria-label="등급 기준">
          <li>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className="tier-gem">
              <path d="M6 3h12l4 6-10 12L2 9z" fill="#d9dde3" stroke="rgba(0,0,0,.18)" strokeWidth="1" />
              <path d="M2 9h20M6 3l6 6 6-6M12 9v12" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1" />
            </svg>
            <b>1등급</b>
            <small>누적 30,000,000원~</small>
          </li>
          <li>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className="tier-gem">
              <path d="M6 3h12l4 6-10 12L2 9z" fill="#eef1f5" stroke="rgba(0,0,0,.18)" strokeWidth="1" />
              <path d="M2 9h20M6 3l6 6 6-6M12 9v12" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1" />
            </svg>
            <b>2등급</b>
            <small>누적 20,000,000원~</small>
          </li>
          <li>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className="tier-gem">
              <path d="M6 3h12l4 6-10 12L2 9z" fill="#c9a27e" stroke="rgba(0,0,0,.18)" strokeWidth="1" />
              <path d="M2 9h20M6 3l6 6 6-6M12 9v12" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1" />
            </svg>
            <b>3등급</b>
            <small>누적 15,000,000원~</small>
          </li>
          <li>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className="tier-gem">
              <path d="M6 3h12l4 6-10 12L2 9z" fill="#e8a0bf" stroke="rgba(0,0,0,.18)" strokeWidth="1" />
              <path d="M2 9h20M6 3l6 6 6-6M12 9v12" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1" />
            </svg>
            <b>4등급</b>
            <small>누적 10,000,000원~</small>
          </li>
          <li>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className="tier-gem">
              <path d="M6 3h12l4 6-10 12L2 9z" fill="#8fb9e8" stroke="rgba(0,0,0,.18)" strokeWidth="1" />
              <path d="M2 9h20M6 3l6 6 6-6M12 9v12" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1" />
            </svg>
            <b>5등급</b>
            <small>누적 7,000,000원~</small>
          </li>
          <li>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className="tier-gem">
              <path d="M6 3h12l4 6-10 12L2 9z" fill="#c39be3" stroke="rgba(0,0,0,.18)" strokeWidth="1" />
              <path d="M2 9h20M6 3l6 6 6-6M12 9v12" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1" />
            </svg>
            <b>6등급</b>
            <small>누적 5,000,000원~</small>
          </li>
          <li>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className="tier-gem">
              <path d="M6 3h12l4 6-10 12L2 9z" fill="#7fb2d9" stroke="rgba(0,0,0,.18)" strokeWidth="1" />
              <path d="M2 9h20M6 3l6 6 6-6M12 9v12" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1" />
            </svg>
            <b>7등급</b>
            <small>누적 3,000,000원~</small>
          </li>
          <li>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className="tier-gem">
              <path d="M6 3h12l4 6-10 12L2 9z" fill="#c8d96f" stroke="rgba(0,0,0,.18)" strokeWidth="1" />
              <path d="M2 9h20M6 3l6 6 6-6M12 9v12" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1" />
            </svg>
            <b>8등급</b>
            <small>누적 2,000,000원~</small>
          </li>
          <li>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className="tier-gem">
              <path d="M6 3h12l4 6-10 12L2 9z" fill="#e6c85a" stroke="rgba(0,0,0,.18)" strokeWidth="1" />
              <path d="M2 9h20M6 3l6 6 6-6M12 9v12" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1" />
            </svg>
            <b>9등급</b>
            <small>누적 1,000,000원~</small>
          </li>
          <li>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className="tier-gem">
              <path d="M6 3h12l4 6-10 12L2 9z" fill="#7fcf9a" stroke="rgba(0,0,0,.18)" strokeWidth="1" />
              <path d="M2 9h20M6 3l6 6 6-6M12 9v12" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1" />
            </svg>
            <b>10등급</b>
            <small>누적 500,000원~</small>
          </li>
          <li>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className="tier-gem">
              <path d="M6 3h12l4 6-10 12L2 9z" fill="#b08968" stroke="rgba(0,0,0,.18)" strokeWidth="1" />
              <path d="M2 9h20M6 3l6 6 6-6M12 9v12" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1" />
            </svg>
            <b>일반회원</b>
            <small>가입 시</small>
          </li>
        </ul>
        <p className="mb-note">
          등급 기준 금액은 최근 12개월 누적 결제금액 기준이며, 등급 산정과 혜택 내용은 운영 정책에 따라 바뀔 수 있습니다. 보상은 고객센터 확인 후 지급됩니다.
        </p>
      </main>
      <Tail />
    </>
  );
}
