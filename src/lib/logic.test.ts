import { describe, expect, it } from 'vitest';
import { LAYOUTS, keyCount } from '../data/layouts';
import { PRODUCTS, getProduct } from '../data/products';
import { BUILD_STEPS, type Build } from '../data/types';
import { buildLayout, buildTotal, candidateIssues, checkBuild, isComplete, quantityFor } from './compat';
import { decodeBuild, encodeBuild, shareUrl } from './share';
import { CHATTER_MS, emptyTester, keyDown, keyUp } from './tester';

const GOOD: Build = {
  case: 'case-pebble65', pcb: 'pcb-65-hs-bt', plate: 'plate-65-pc',
  switch: 'sw-cream-linear', stabilizer: 'stab-pcb-screw', keycap: 'kc-milk-tea',
};

describe('catalog', () => {
  it('has unique ids and at least one product per build step', () => {
    expect(new Set(PRODUCTS.map((p) => p.id)).size).toBe(PRODUCTS.length);
    for (const c of BUILD_STEPS) expect(PRODUCTS.some((p) => p.category === c)).toBe(true);
  });

  it('every layout has a sensible key count and no overlapping keys', () => {
    expect(keyCount('60')).toBe(61);
    expect(keyCount('65')).toBe(68);
    expect(keyCount('tkl')).toBe(87);
    for (const l of Object.values(LAYOUTS)) {
      const codes = l.keys.map((k) => k.code);
      expect(new Set(codes).size).toBe(codes.length);
      for (const a of l.keys) {
        for (const b of l.keys) {
          if (a === b || a.y !== b.y) continue;
          expect(a.x + a.w <= b.x + 1e-9 || b.x + b.w <= a.x + 1e-9).toBe(true);
        }
      }
    }
  });
});

describe('compatibility', () => {
  it('accepts a matching 65% build', () => {
    expect(checkBuild(GOOD)).toEqual([]);
    expect(isComplete(GOOD)).toBe(true);
    expect(buildLayout(GOOD)).toBe('65');
  });

  it('flags a layout mismatch between case and PCB', () => {
    const issues = checkBuild({ ...GOOD, pcb: 'pcb-60-hs' });
    expect(issues.some((i) => i.level === 'error' && i.categories.includes('pcb'))).toBe(true);
  });

  it('flags keycaps that do not cover the layout', () => {
    const issues = checkBuild({ case: 'case-aurora60', keycap: 'kc-retro' });
    expect(issues).toHaveLength(1);
    expect(issues[0].level).toBe('error');
  });

  it('warns (not errors) for 5-pin switches on a 3-pin PCB', () => {
    const issues = checkBuild({ pcb: 'pcb-75-hs', switch: 'sw-cream-linear' });
    expect(issues.map((i) => i.level)).toEqual(['warning']);
  });

  it('flags stabilizer mount mismatches', () => {
    const issues = checkBuild({ pcb: 'pcb-75-hs', stabilizer: 'stab-pcb-screw' });
    expect(issues[0].level).toBe('error');
  });

  it('warns that a solder PCB needs soldering', () => {
    expect(checkBuild({ pcb: 'pcb-65-solder' })[0].level).toBe('warning');
  });

  it('checks a candidate against the other chosen parts only', () => {
    const p = getProduct('case-aurora60')!;
    expect(candidateIssues(p, GOOD).some((i) => i.level === 'error')).toBe(true);
    expect(candidateIssues(getProduct('case-forge65')!, GOOD)).toEqual([]);
  });
});

describe('pricing', () => {
  it('buys one switch per key once the layout is known', () => {
    const sw = getProduct('sw-cream-linear')!;
    expect(quantityFor(sw, GOOD)).toBe(68);
    expect(quantityFor(sw, { switch: sw.id })).toBe(0);
  });

  it('totals the build', () => {
    const expected =
      129000 + 89000 + 28000 + 550 * 68 + 29000 + 89000;
    expect(buildTotal(GOOD)).toBe(expected);
  });
});

describe('share links', () => {
  it('round-trips a build and its name', () => {
    const q = encodeBuild(GOOD, '밀크티 도각 65');
    expect(decodeBuild(q)).toEqual({ build: GOOD, name: '밀크티 도각 65' });
  });

  it('drops unknown ids and ids in the wrong slot', () => {
    expect(decodeBuild('case=nope&pcb=case-pebble65&keycap=kc-mint').build).toEqual({ keycap: 'kc-mint' });
  });

  it('builds an absolute hash-route URL', () => {
    const url = shareUrl({ case: 'case-pebble65' }, 'a b', { origin: 'https://x.dev', pathname: '/shop/' });
    expect(url).toBe('https://x.dev/shop/#/b?n=a+b&case=case-pebble65');
  });
});

describe('key tester', () => {
  it('counts presses, ignores auto-repeat and measures hold time', () => {
    let s = emptyTester();
    s = keyDown(s, 'KeyA', 'a', 0, false);
    s = keyDown(s, 'KeyA', 'a', 300, true);
    s = keyUp(s, 'KeyA', 'a', 420);
    expect(s.presses.KeyA).toBe(1);
    expect(s.down).toEqual({});
    expect(s.log[0].held).toBe(420);
  });

  it('detects chatter when a key re-fires right after release', () => {
    let s = emptyTester();
    s = keyDown(s, 'KeyJ', 'j', 0, false);
    s = keyUp(s, 'KeyJ', 'j', 80);
    s = keyDown(s, 'KeyJ', 'j', 80 + CHATTER_MS - 5, false);
    expect(s.chatter.KeyJ).toBe(1);
    s = keyUp(s, 'KeyJ', 'j', 200);
    s = keyDown(s, 'KeyJ', 'j', 400, false);
    expect(s.chatter.KeyJ).toBe(1);
  });

  it('maps the Korean 한/영 key onto right Alt and counts release-only keys', () => {
    let s = keyDown(emptyTester(), 'Lang1', 'HangulMode', 0, false);
    expect(s.down.AltRight).toBe(0);
    s = keyUp(s, 'PrintScreen', 'PrintScreen', 10);
    expect(s.presses.PrintScreen).toBe(1);
  });
});
