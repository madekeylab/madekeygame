import { getProduct } from '../data/products';
import { keyCount } from '../data/layouts';
import {
  BUILD_STEPS, CATEGORY_LABEL, LAYOUT_LABEL,
  type Build, type Category, type LayoutId, type Product,
} from '../data/types';

export type IssueLevel = 'error' | 'warning';

export interface Issue {
  level: IssueLevel;
  message: string;
  /** Categories involved, so the builder can flag the right step. */
  categories: Category[];
}

function singleLayout(p: Product): LayoutId | undefined {
  return p.category === 'case' || p.category === 'pcb' || p.category === 'plate' ? p.layout : undefined;
}

/** Rules that need only one part. */
function soloIssues(p: Product): Issue[] {
  if (p.category === 'pcb' && !p.hotswap) {
    return [{
      level: 'warning',
      message: `${p.name}은(는) 핫스왑이 아니라 스위치를 납땜해야 합니다.`,
      categories: ['pcb'],
    }];
  }
  return [];
}

/** Rules between two parts. Order of a and b does not matter. */
export function pairIssues(a: Product, b: Product): Issue[] {
  const issues: Issue[] = [];
  const cats: Category[] = [a.category, b.category];

  const la = singleLayout(a);
  const lb = singleLayout(b);
  if (la && lb && la !== lb) {
    issues.push({
      level: 'error',
      message: `${CATEGORY_LABEL[a.category]}(${LAYOUT_LABEL[la]})와 ${CATEGORY_LABEL[b.category]}(${LAYOUT_LABEL[lb]})의 배열이 다릅니다.`,
      categories: cats,
    });
  }

  for (const [x, y] of [[a, b], [b, a]] as const) {
    const ly = singleLayout(y);
    if (x.category === 'keycap' && ly && !x.layouts.includes(ly)) {
      issues.push({
        level: 'error',
        message: `${x.name}은(는) ${LAYOUT_LABEL[ly]} 배열을 지원하지 않습니다.`,
        categories: cats,
      });
    }
    if (x.category === 'switch' && y.category === 'pcb' && x.pins === 5 && !y.fivePin) {
      issues.push({
        level: 'warning',
        message: `${y.name}은(는) 3핀 전용입니다. ${x.name}의 플라스틱 다리 2개를 잘라서 장착해야 합니다.`,
        categories: cats,
      });
    }
    if (x.category === 'stabilizer' && y.category === 'pcb' && x.mount !== y.stabMount) {
      issues.push({
        level: 'error',
        message: `${y.name}에는 ${y.stabMount === 'pcb' ? 'PCB' : '판'} 마운트 스태빌라이저가 필요합니다.`,
        categories: cats,
      });
    }
  }
  return issues;
}

export function buildProducts(build: Build): Product[] {
  return BUILD_STEPS.map((c) => getProduct(build[c])).filter((p): p is Product => !!p);
}

export function checkBuild(build: Build): Issue[] {
  const parts = buildProducts(build);
  const issues = parts.flatMap(soloIssues);
  for (let i = 0; i < parts.length; i++) {
    for (let j = i + 1; j < parts.length; j++) issues.push(...pairIssues(parts[i], parts[j]));
  }
  return issues;
}

/** Issues the candidate would cause against the other chosen parts of the build. */
export function candidateIssues(candidate: Product, build: Build): Issue[] {
  const others = buildProducts(build).filter((p) => p.category !== candidate.category);
  return [...soloIssues(candidate), ...others.flatMap((o) => pairIssues(candidate, o))];
}

/** The layout a build is fixed to, taken from the case, then PCB, then plate. */
export function buildLayout(build: Build): LayoutId | undefined {
  for (const c of ['case', 'pcb', 'plate'] as const) {
    const p = getProduct(build[c]);
    if (p) {
      const l = singleLayout(p);
      if (l) return l;
    }
  }
  return undefined;
}

/** How many of a product the build needs: one switch per key, one of everything else. */
export function quantityFor(p: Product, build: Build): number {
  if (p.category !== 'switch') return 1;
  const layout = buildLayout(build);
  return layout ? keyCount(layout) : 0;
}

export function buildTotal(build: Build): number {
  return buildProducts(build).reduce((sum, p) => sum + p.price * quantityFor(p, build), 0);
}

export function isComplete(build: Build): boolean {
  return BUILD_STEPS.every((c) => !!getProduct(build[c]));
}
