import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";

export const metadata: Metadata = {
  title: "커스텀 키보드 대회",
  description: "직접 만든 커스텀 키보드를 올리고 평가받는 월간 대회 — 회원 좋아요와 공방 심사로 순위를 정합니다.",
};

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "contest-hall-used"]} />
      <Band />
      <main className="page shop-main">
        <section className="ct-hero">
          <p className="ct-eyebrow">{"CUSTOM KEYBOARD CONTEST · "}2026-11</p>
          <h1>11월 커스텀 키보드 대회</h1>
          <p className="ct-theme">{"주제 — "}자유 주제 — 내가 만든 키보드를 자랑해 주세요</p>
          <p className="ct-lead">직접 조립하거나 꾸민 키보드라면 무엇이든 좋습니다. 사진과 구성을 올리면 회원 좋아요와 공방 심사를 합쳐 순위를 정합니다.</p>
          <div className="ct-meta">
            <span className="ct-pill">작품 접수 중</span>
            <span>
              {"접수 "}
              <b>11.01{" ~ "}11.30</b>
            </span>
            <span>
              {"좋아요 집계 "}
              <b>{"~ "}11.30</b>
            </span>
            <span>
              {"순위 = 심사 "}70{"% + 회원 좋아요 "}30%
            </span>
            <span>
              {"출품 "}
              <b>0</b>작
            </span>
          </div>
          <div className="ct-cta">
            <Link className="ct-btn is-gold" href="/login?next=/contest/new">
              로그인하고 작품 등록
            </Link>
            <Link className="ct-btn is-line" href="/hall">
              명예의 전당
            </Link>
          </div>
          <div className="ct-prizes">
            <div className="ct-prize">
              <small>1등</small>
              <b>커스텀 제작 이용권 30만 원</b>
            </div>
            <div className="ct-prize">
              <small>2등</small>
              <b>공방 이용권 15만 원</b>
            </div>
            <div className="ct-prize">
              <small>3등</small>
              <b>부품 구매권 5만 원</b>
            </div>
            <div className="ct-prize">
              <small>특별상</small>
              <b>협찬 상품</b>
            </div>
          </div>
          <p className="ct-legal">※ 예정 경품입니다. 실제 지급 여부와 방식은 법률 검토를 마친 뒤 확정해 안내합니다.</p>
        </section>
        <h2 className="ct-sec">출품작</h2>
        <div className="ct-bar">
          <nav className="kx-seg" aria-label="정렬">
            <Link aria-current="page" href="/contest">
              인기
            </Link>
            <Link href="/contest?sort=new">최신</Link>
          </nav>
          <span className="ct-count">0작품</span>
        </div>
        <div className="ct-empty">
          <b>아직 출품작이 없습니다. 첫 작품의 주인공이 되어 보세요.</b>사진 1~8장과 구성만 있으면 됩니다. 쓴 부품을 연결하면 보는 사람이 바로 찾아갈 수
          있습니다.
        </div>
      </main>
      <Tail />
    </>
  );
}
