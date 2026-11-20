import type { Product } from './types';

// Sample catalog. All names are fictional MadeKey house products.
export const PRODUCTS: Product[] = [
  // ── Cases ──────────────────────────────────────────────
  {
    id: 'case-aurora60', category: 'case', name: '오로라 60 알루미늄 케이스', price: 159000,
    layout: '60', material: '알루미늄', mount: '가스켓 마운트', color: '#c9ced6', stock: 12,
    tags: ['알루미늄', '가스켓', '미니멀', '입문 추천'],
    description: '아노다이징 알루미늄 60% 케이스. 가스켓 마운트로 부드러운 타건감을 줍니다.',
  },
  {
    id: 'case-pebble65', category: 'case', name: '페블 65 폴리카보네이트 케이스', price: 129000,
    layout: '65', material: '폴리카보네이트', mount: '탑 마운트', color: '#e8eef5', stock: 20,
    tags: ['투명', 'RGB 투과', '가성비', '도각도각'],
    description: '반투명 폴리카보네이트 65% 케이스. RGB 빛이 은은하게 퍼집니다.',
  },
  {
    id: 'case-forge65', category: 'case', name: '포지 65 황동 웨이트 케이스', price: 289000,
    layout: '65', material: '알루미늄 + 황동', mount: '가스켓 마운트', color: '#2d3340', stock: 5,
    tags: ['알루미늄', '가스켓', '고급형', '묵직함'],
    description: '황동 웨이트를 더한 프리미엄 65% 케이스. 깊고 단단한 타건음.',
  },
  {
    id: 'case-orbit75', category: 'case', name: '오르빗 75 알루미늄 케이스', price: 219000,
    layout: '75', material: '알루미늄', mount: '가스켓 마운트', color: '#7a8fa6', stock: 9,
    tags: ['알루미늄', '가스켓', '노브', '사무용'],
    description: '볼륨 노브가 달린 75% 케이스. 펑션 키가 필요한 업무용으로 좋습니다.',
  },
  {
    id: 'case-classic-tkl', category: 'case', name: '클래식 TKL 우드 케이스', price: 249000,
    layout: 'tkl', material: '월넛 원목', mount: '트레이 마운트', color: '#6b4a32', stock: 4,
    tags: ['원목', '빈티지', '고급형', '도각도각'],
    description: '월넛 원목을 깎아 만든 텐키리스 케이스. 따뜻한 타건음과 질감.',
  },

  // ── PCBs ───────────────────────────────────────────────
  {
    id: 'pcb-60-hs', category: 'pcb', name: '메이드키 60 핫스왑 PCB', price: 59000,
    layout: '60', hotswap: true, fivePin: true, stabMount: 'pcb', wireless: false, color: '#1f6f4a', stock: 30,
    tags: ['핫스왑', 'QMK/VIA', '입문 추천'],
    description: '납땜 없이 스위치를 교체할 수 있는 60% 핫스왑 PCB. QMK/VIA 지원.',
  },
  {
    id: 'pcb-65-hs-bt', category: 'pcb', name: '메이드키 65 무선 핫스왑 PCB', price: 89000,
    layout: '65', hotswap: true, fivePin: true, stabMount: 'pcb', wireless: true, color: '#1f4f6f', stock: 18,
    tags: ['핫스왑', '무선', '블루투스', 'QMK/VIA'],
    description: '블루투스 5.1과 유선을 모두 지원하는 65% 핫스왑 PCB.',
  },
  {
    id: 'pcb-65-solder', category: 'pcb', name: '메이드키 65 솔더 PCB', price: 49000,
    layout: '65', hotswap: false, fivePin: true, stabMount: 'pcb', wireless: false, color: '#3a3a3a', stock: 10,
    tags: ['솔더링', '레이아웃 자유', 'QMK/VIA'],
    description: '다양한 하단열 배열을 지원하는 납땜용 PCB. 숙련자용.',
  },
  {
    id: 'pcb-75-hs', category: 'pcb', name: '메이드키 75 핫스왑 PCB', price: 79000,
    layout: '75', hotswap: true, fivePin: false, stabMount: 'plate', wireless: false, color: '#1f6f4a', stock: 14,
    tags: ['핫스왑', 'RGB', 'QMK/VIA'],
    description: '노브를 지원하는 75% 핫스왑 PCB. 3핀 스위치 전용, 판 마운트 스태빌라이저 사용.',
  },
  {
    id: 'pcb-tkl-hs', category: 'pcb', name: '메이드키 TKL 핫스왑 PCB', price: 85000,
    layout: 'tkl', hotswap: true, fivePin: true, stabMount: 'pcb', wireless: false, color: '#1f6f4a', stock: 11,
    tags: ['핫스왑', 'QMK/VIA', '사무용'],
    description: '텐키리스 배열 핫스왑 PCB. 5핀 스위치 지원.',
  },

  // ── Plates ─────────────────────────────────────────────
  {
    id: 'plate-60-fr4', category: 'plate', name: '60 FR4 보강판', price: 25000,
    layout: '60', material: 'FR4', color: '#3d6b4a', stock: 40,
    tags: ['FR4', '부드러움', '가성비'], description: '적당한 유연성의 FR4 보강판.',
  },
  {
    id: 'plate-65-pc', category: 'plate', name: '65 PC 보강판', price: 28000,
    layout: '65', material: '폴리카보네이트', color: '#dfe6ee', stock: 25,
    tags: ['폴리카보네이트', '부드러움', '도각도각'], description: '유연한 PC 보강판. 깊고 둔탁한 소리.',
  },
  {
    id: 'plate-65-brass', category: 'plate', name: '65 황동 보강판', price: 55000,
    layout: '65', material: '황동', color: '#b58b3a', stock: 8,
    tags: ['황동', '단단함', '고급형'], description: '단단하고 맑은 소리를 내는 황동 보강판.',
  },
  {
    id: 'plate-75-alu', category: 'plate', name: '75 알루미늄 보강판', price: 35000,
    layout: '75', material: '알루미늄', color: '#aab3bf', stock: 16,
    tags: ['알루미늄', '단단함'], description: '균형 잡힌 타건감의 알루미늄 보강판.',
  },
  {
    id: 'plate-tkl-pom', category: 'plate', name: 'TKL POM 보강판', price: 39000,
    layout: 'tkl', material: 'POM', color: '#f2f2ee', stock: 12,
    tags: ['POM', '부드러움', '도각도각'], description: '말랑한 타건감과 낮은 톤의 POM 보강판.',
  },

  // ── Switches (price per switch) ────────────────────────
  {
    id: 'sw-cream-linear', category: 'switch', name: '크림 리니어 스위치', price: 550,
    switchType: 'linear', pins: 5, force: 55, color: '#f3e7c9', stock: 2000,
    tags: ['리니어', '공장 윤활', '도각도각', '입문 추천'],
    description: '공장 윤활된 부드러운 리니어. 5핀. 55g.',
  },
  {
    id: 'sw-silent-ink', category: 'switch', name: '사일런트 잉크 리니어', price: 700,
    switchType: 'linear', pins: 3, force: 50, color: '#2b2b38', stock: 1500,
    tags: ['리니어', '저소음', '사무용'],
    description: '댐퍼를 넣은 저소음 리니어. 3핀. 사무실에서도 조용합니다.',
  },
  {
    id: 'sw-bump-brown', category: 'switch', name: '범프 브라운 택타일', price: 600,
    switchType: 'tactile', pins: 5, force: 62, color: '#8a5a3c', stock: 1800,
    tags: ['택타일', '구분감', '사무용'],
    description: '뚜렷한 구분감의 택타일 스위치. 5핀. 62g.',
  },
  {
    id: 'sw-click-blue', category: 'switch', name: '찰칵 블루 클리키', price: 450,
    switchType: 'clicky', pins: 3, force: 60, color: '#3c6fd1', stock: 2500,
    tags: ['클리키', '청축', '가성비'],
    description: '경쾌한 클릭음의 클리키 스위치. 3핀. 60g.',
  },

  // ── Keycaps ────────────────────────────────────────────
  {
    id: 'kc-milk-tea', category: 'keycap', name: '밀크티 체리 프로파일 키캡', price: 89000,
    profile: 'Cherry', layouts: ['60', '65', '75', 'tkl'], color: '#efe3d0', accent: '#a9805e', legend: '#5a3f2b',
    stock: 25, tags: ['PBT', '이중사출', '파스텔', '한글 각인'],
    description: '부드러운 밀크티 색감의 PBT 이중사출 키캡. 한글 각인 포함.',
  },
  {
    id: 'kc-midnight', category: 'keycap', name: '미드나잇 OEM 키캡', price: 59000,
    profile: 'OEM', layouts: ['60', '65', '75', 'tkl'], color: '#2a2f45', accent: '#e05d5d', legend: '#e6e9f2',
    stock: 40, tags: ['PBT', '다크', '가성비'],
    description: '짙은 남색에 빨간 포인트 키를 더한 OEM 프로파일 키캡.',
  },
  {
    id: 'kc-retro', category: 'keycap', name: '레트로 베이지 SA 키캡', price: 129000,
    profile: 'SA', layouts: ['65', '75', 'tkl'], color: '#e4dcc8', accent: '#7b7f86', legend: '#2d2d2d',
    stock: 6, tags: ['ABS', '이중사출', '빈티지', '고급형'],
    description: '80년대 단말기 감성의 높은 SA 프로파일 키캡. 60% 배열 미지원.',
  },
  {
    id: 'kc-mint', category: 'keycap', name: '민트 XDA 키캡', price: 69000,
    profile: 'XDA', layouts: ['60', '65', '75'], color: '#cdeee3', accent: '#3fa58a', legend: '#24443b',
    stock: 18, tags: ['PBT', '염료승화', '파스텔'],
    description: '평평한 XDA 프로파일 민트 키캡. TKL 배열 미지원.',
  },

  // ── Stabilizers ────────────────────────────────────────
  {
    id: 'stab-pcb-screw', category: 'stabilizer', name: '스크류인 PCB 스태빌라이저', price: 29000,
    mount: 'pcb', color: '#e9e9e9', stock: 50, tags: ['PCB 마운트', '공장 윤활', '입문 추천'],
    description: 'PCB에 나사로 고정하는 스태빌라이저. 덜그럭거림이 적습니다.',
  },
  {
    id: 'stab-plate', category: 'stabilizer', name: '플레이트 마운트 스태빌라이저', price: 19000,
    mount: 'plate', color: '#d8d8d8', stock: 50, tags: ['판 마운트', '가성비'],
    description: '보강판에 끼우는 스태빌라이저. 간편한 조립.',
  },
];

const BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]));

export function getProduct(id: string | undefined): Product | undefined {
  return id ? BY_ID.get(id) : undefined;
}

export function allTags(products: Product[] = PRODUCTS): string[] {
  const counts = new Map<string, number>();
  for (const p of products) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ko')).map(([t]) => t);
}
