import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";

export const metadata: Metadata = {
  title: "타건음 자랑",
  description: "내 커스텀 키보드 타건음을 올리고 서로 들어 보는 커뮤니티 — 스위치 · 키캡 · 보강판 구성별로 찾아 들어 보세요.",
};

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "shop-7", "sound-used"]} />
      <Band />
      <main className="page shop-main">
        <header className="ph">
          <div className="ph-main">
            <p className="eyebrow">Sound Test</p>
            <h1 className="ph-title">타건음 자랑</h1>
            <p className="ph-desc">내 키보드 타격음 어때요? 직접 만든 키보드의 타건 영상을 올리고, 다른 사람의 구성을 들어 보세요.</p>
          </div>
        </header>
        <div className="snd-bar">
          <nav className="kx-seg" aria-label="정렬">
            <Link aria-current="page" href="/sound">
              최신
            </Link>
            <Link href="/sound?sort=hot">인기</Link>
            <Link href="/sound?sort=talk">댓글 많은</Link>
          </nav>
          <form className="snd-search" role="search" action="/sound" method="get">
            <input placeholder="스위치 · 키캡 · 배열로 찾기 (예: 저소음, 75%)" aria-label="검색" maxLength={40} name="q" defaultValue="" />
            <button type="submit">검색</button>
          </form>
          <Link className="snd-btn is-primary snd-new" href="/login?next=/sound/new">
            ＋ 내 타건음 올리기
          </Link>
        </div>
        <div className="snd-empty">
          <b>첫 번째 타건음을 올려 주세요.</b>휴대폰으로 30초 정도 찍은 타건 영상이면 충분합니다. 소리는 원본 그대로 올라갑니다.
        </div>
      </main>
      <Tail />
    </>
  );
}
