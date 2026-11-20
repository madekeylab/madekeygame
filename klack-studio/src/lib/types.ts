export type OptionValue = {
  id: number;
  label: string;
  extraPrice: number;
  stock: number | null;
  swatchHex: string | null;
  imageUrl: string | null;
  isDefault: boolean;
};

export type OptionGroup = {
  id: number;
  name: string;
  kind: "select" | "swatch" | "radio" | "check" | "text";
  required: boolean;
  maxSelect: number;
  help: string;
  dependsOnGroupId: number | null;
  dependsOnValueIds: number[];
  values: OptionValue[];
};

export type Product = {
  id: number;
  sku: string;
  name: string;
  summary: string;
  maker: { id: number; slug: string; nameKo: string } | null;
  categorySlug: string;
  categoryLabel: string;
  listPrice: number;
  salePrice: number;
  discountRate: number;
  thumbUrl: string | null;
  shipType: string;
  assembly: string;
  stock: number;
  isCustom: boolean;
  optionGroups: number;
  specLine: string;
  groups: OptionGroup[];
  sheet: [string, string][];
  state: string[];
  tags: string[];
  cfgExtra: { soldOut: boolean; layoutHint: string };
};

export type Selection = { groupId: number; valueIds: number[]; text?: string };

export type CartLine = {
  id: number;
  productId: number;
  name: string;
  brandName: string;
  thumbUrl: string | null;
  listPrice: number;
  salePrice: number;
  discountRate: number;
  qty: number;
  lineList: number;
  lineDiscount: number;
  linePay: number;
  stock: number;
  optionId: null;
  optionLabel: string;
  optionSku: string;
  optionExtra: number;
};

export type CartData = {
  lines: CartLine[];
  summary: { count: number; totalList: number; totalDiscount: number; totalPay: number };
};

export type CartPlan = {
  items: { productId: number; shipType: string; assembly: string; shipFee: number; leadDays: number }[];
  kind: string;
  productShipFee: number;
  leadDaysMax: number;
};
