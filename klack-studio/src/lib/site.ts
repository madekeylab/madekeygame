// 사이트 공통 설정 — 브랜드, 메뉴, 컬러웨이
export type NavAxis = {
  key: string;
  label: string;
  short: string;
  eyebrow: string;
  slug: string;
  code: string;
  desc: string;
  items: { slug: string; label: string }[];
};

export const NAV_AXES: NavAxis[] = [
  { key: "custom-built", label: "완성형 커스텀", short: "완성형", eyebrow: "Built", slug: "custom-built", code: "CB-01", desc: "공방이 조립·윤활·타건 검수까지 끝내 보내는 키보드", items: [] },
  { key: "kit", label: "베어본 · 하우징 키트", short: "키트", eyebrow: "Kit", slug: "kit", code: "KT-02", desc: "하우징 + PCB + 보강판, 스위치·키캡은 따로 고르는 키트", items: [] },
  { key: "switch", label: "스위치", short: "스위치", eyebrow: "Switch", slug: "switch", code: "SW-03", desc: "리니어 · 택타일 · 클릭, 개수 단위로 담는 스위치", items: [] },
  { key: "keycap", label: "키캡", short: "키캡", eyebrow: "Keycap", slug: "keycap", code: "KC-04", desc: "체리 · OEM · XDA · MDA 프로파일, PBT · ABS 키캡", items: [] },
  { key: "parts", label: "보강판 · PCB · 스태빌", short: "부품", eyebrow: "Parts", slug: "parts", code: "PT-05", desc: "교체 · 업그레이드용 부품", items: [] },
  { key: "accessory", label: "액세서리", short: "액세서리", eyebrow: "Accessory", slug: "accessory", code: "AC-06", desc: "케이블 · 손목받침 · 데스크매트 · 공구", items: [] },
  { key: "service", label: "공방 서비스", short: "공방 서비스", eyebrow: "Workshop", slug: "service", code: "SV-07", desc: "윤활 · 튜닝 · 수리 · 조립 대행", items: [] },
];

export const catHref = (slug: string) => `/category/${slug}`;

export const BRAND = {
  nameKo: "클랙스튜디오",
  nameEn: "KLACK STUDIO",
  wordmark: "클랙스튜디오",
  wordmarkSub: "KLACK STUDIO",
  tagline: "손으로 조립하고 직접 타건해 보내는 커스텀 키보드 공방",
  metaTitle: "클랙스튜디오 — 수제 커스텀 키보드 공방",
  metaTitleTemplate: "%s · 클랙스튜디오",
  metaDescription:
    "클랙스튜디오(Klack Studio)는 하우징·보강판·스위치·키캡을 골라 주문하면 공방에서 직접 윤활·조립·타건 검수 후 보내 드리는 수제 커스텀 키보드 쇼핑몰입니다. 제작 과정과 타건 영상을 유튜브로 함께 공개합니다.",
  legal: "주문 제작 상품은 옵션 확정 후 제작에 들어가며, 제작 착수 이후에는 단순 변심 취소가 제한될 수 있습니다.",
};

export type MenuItem = { key: string; code?: string; label: string; href: string; children?: MenuItem[] };

export const SHOP_MENU: MenuItem[] = [
  { key: "new", code: "NEW", label: "신상품", href: "/category/all?sort=new" },
  { key: "best", code: "BEST", label: "베스트", href: "/ranking" },
  { key: "brand", code: "BRAND", label: "브랜드", href: "/brands" },
  { key: "sale", code: "SALE", label: "특가", href: "/category/all?sort=discount" },
  { key: "used", code: "USED", label: "중고마켓", href: "/used" },
];

export const STUDIO_MENU: MenuItem[] = [
  { key: "workshop", label: "공방 이야기", href: "/workshop" },
  { key: "switch", label: "스위치 비교", href: "/switch-lab" },
  { key: "videos", label: "영상관", href: "/videos" },
  { key: "guide", label: "제작 가이드", href: "/guide" },
  { key: "inspection", label: "타건 검수", href: "/inspection" },
  { key: "device-test", label: "기기테스트", href: "/device-test" },
];

export const COMMUNITY_MENU: MenuItem[] = [
  { key: "ai", code: "AI", label: "AI 키보드 추천", href: "/ai" },
  { key: "ai-photo", code: "PIC", label: "사진으로 찾기", href: "/ai/photo" },
  {
    key: "game",
    code: "GAME",
    label: "게임랜드",
    href: "/game",
    children: [
      { key: "formula", code: "HF", label: "하이퍼 포뮬러", href: "/game/formula" },
      { key: "rpm", code: "RPM", label: "RPM 레이싱", href: "/game/rpm" },
      { key: "shooter", code: "STG", label: "우주 슈팅왕", href: "/game/shooter" },
      { key: "rhythm", code: "BEAT", label: "리듬 타건왕", href: "/game/rhythm" },
      { key: "bubble", code: "BUB", label: "버블 몬스터", href: "/game/bubble" },
      { key: "blocks", code: "BLK", label: "블록 퍼즐왕", href: "/game/blocks" },
      { key: "survival", code: "SRV", label: "몬스터 서바이벌", href: "/game/survival" },
      { key: "fighter", code: "FGT", label: "키보드 격투왕", href: "/game/fighter" },
      { key: "ranking", code: "RANK", label: "게임 랭킹", href: "/game/ranking" },
    ],
  },
  { key: "sound", code: "SND", label: "타건음 자랑", href: "/sound" },
  { key: "contest", code: "CUP", label: "커스텀 대회", href: "/contest" },
  { key: "hall", code: "HOF", label: "명예의 전당", href: "/hall" },
];

export const COLORWAYS = [
  { key: "signal", name: "SIGNAL", ko: "시그널", swatch: ["#ff5a1f", "#1d2bff", "#3ee6b0"] },
  { key: "berry", name: "BERRY", ko: "베리", swatch: ["#ff3d8b", "#6a2bff", "#ffd23f"] },
  { key: "lagoon", name: "LAGOON", ko: "라군", swatch: ["#00a3ff", "#0b3d3a", "#ff7a59"] },
  { key: "mono", name: "MONO POP", ko: "모노 팝", swatch: ["#ff2e2e", "#111111", "#d9dbde"] },
] as const;

export const CW_COOKIE = "v2cw";
export const isColorway = (v?: string | null) => !!v && COLORWAYS.some((c) => c.key === v);

/** 고객센터 · 채널 정보(준비 전 값) */
export const CS = { tel: "준비중", hours: "운영 시간 준비중", hoursNote: "" };
export const CHANNELS: { kakao?: string; telegram?: string } = {};
export const CART_LABEL = "Cart";
