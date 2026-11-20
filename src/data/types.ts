export type LayoutId = '60' | '65' | '75' | 'tkl';

export type Category = 'case' | 'pcb' | 'plate' | 'switch' | 'keycap' | 'stabilizer';

/** The parts a full build needs, in the order the builder walks through them. */
export const BUILD_STEPS: Category[] = ['case', 'pcb', 'plate', 'switch', 'stabilizer', 'keycap'];

export const CATEGORY_LABEL: Record<Category, string> = {
  case: '케이스',
  pcb: 'PCB',
  plate: '보강판',
  switch: '스위치',
  keycap: '키캡',
  stabilizer: '스태빌라이저',
};

export const LAYOUT_LABEL: Record<LayoutId, string> = {
  '60': '60%',
  '65': '65%',
  '75': '75%',
  tkl: '텐키리스(TKL)',
};

interface BaseProduct {
  id: string;
  name: string;
  category: Category;
  /** Price in KRW. For switches this is the price of a single switch. */
  price: number;
  description: string;
  tags: string[];
  /** Main color used for the product swatch and the build preview. */
  color: string;
  stock: number;
}

export interface CaseProduct extends BaseProduct {
  category: 'case';
  layout: LayoutId;
  material: string;
  mount: string;
}

export interface PcbProduct extends BaseProduct {
  category: 'pcb';
  layout: LayoutId;
  hotswap: boolean;
  /** Whether the PCB has holes for 5-pin (PCB-mount) switches. */
  fivePin: boolean;
  stabMount: 'pcb' | 'plate';
  wireless: boolean;
}

export interface PlateProduct extends BaseProduct {
  category: 'plate';
  layout: LayoutId;
  material: string;
}

export interface SwitchProduct extends BaseProduct {
  category: 'switch';
  switchType: 'linear' | 'tactile' | 'clicky';
  pins: 3 | 5;
  /** Actuation force in grams. */
  force: number;
}

export interface KeycapProduct extends BaseProduct {
  category: 'keycap';
  profile: string;
  layouts: LayoutId[];
  /** Accent (modifier) color for the build preview. */
  accent: string;
  legend: string;
}

export interface StabilizerProduct extends BaseProduct {
  category: 'stabilizer';
  mount: 'pcb' | 'plate';
}

export type Product =
  | CaseProduct
  | PcbProduct
  | PlateProduct
  | SwitchProduct
  | KeycapProduct
  | StabilizerProduct;

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  helpful: number;
  /** True for reviews written in this browser. */
  mine?: boolean;
}

/** A build is one product id per step; missing steps are not chosen yet. */
export type Build = Partial<Record<Category, string>>;

export interface SavedBuild {
  id: string;
  name: string;
  parts: Build;
  createdAt: string;
}

export interface CartLine {
  productId: string;
  quantity: number;
  /** Set when the line was added as part of a build. */
  buildName?: string;
}

export interface Order {
  id: string;
  lines: CartLine[];
  total: number;
  shippingFee: number;
  name: string;
  phone: string;
  address: string;
  createdAt: string;
}
