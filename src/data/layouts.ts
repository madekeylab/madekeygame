import type { LayoutId } from './types';

/** One key, positioned in key units (1u = one standard alpha key). */
export interface KeyDef {
  code: string; // KeyboardEvent.code
  label: string;
  x: number;
  y: number;
  w: number;
  /** Modifier/accent keys get the keycap set's accent color in previews. */
  accent: boolean;
}

export interface KeyboardLayout {
  id: LayoutId;
  keys: KeyDef[];
  width: number;
  height: number;
}

type Item = { code: string; label: string; w: number } | { gap: number };

const K = (code: string, label: string, w = 1): Item => ({ code, label, w });
const G = (gap: number): Item => ({ gap });

const ACCENT_CODES = new Set([
  'Escape', 'Backspace', 'Tab', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight',
  'ControlLeft', 'MetaLeft', 'AltLeft', 'AltRight', 'MetaRight', 'ContextMenu', 'ControlRight',
]);

const digits = (): Item[] => [
  K('Digit1', '1'), K('Digit2', '2'), K('Digit3', '3'), K('Digit4', '4'), K('Digit5', '5'),
  K('Digit6', '6'), K('Digit7', '7'), K('Digit8', '8'), K('Digit9', '9'), K('Digit0', '0'),
  K('Minus', '-'), K('Equal', '='), K('Backspace', '⌫', 2),
];
const letters = (s: string): Item[] => [...s].map((c) => K(`Key${c}`, c));

const tabRow = (): Item[] => [
  K('Tab', 'Tab', 1.5), ...letters('QWERTYUIOP'), K('BracketLeft', '['), K('BracketRight', ']'), K('Backslash', '\\', 1.5),
];
const capsRow = (): Item[] => [
  K('CapsLock', 'Caps', 1.75), ...letters('ASDFGHJKL'), K('Semicolon', ';'), K('Quote', "'"), K('Enter', 'Enter', 2.25),
];
const shiftAlphas = (): Item[] => [...letters('ZXCVBNM'), K('Comma', ','), K('Period', '.'), K('Slash', '/')];

const fullBottom = (): Item[] => [
  K('ControlLeft', 'Ctrl', 1.25), K('MetaLeft', 'Win', 1.25), K('AltLeft', 'Alt', 1.25), K('Space', '', 6.25),
  K('AltRight', '한/영', 1.25), K('MetaRight', 'Win', 1.25), K('ContextMenu', 'Menu', 1.25), K('ControlRight', 'Ctrl', 1.25),
];
const compactBottom = (): Item[] => [
  K('ControlLeft', 'Ctrl', 1.25), K('MetaLeft', 'Win', 1.25), K('AltLeft', 'Alt', 1.25), K('Space', '', 6.25),
  K('AltRight', '한/영'), K('ContextMenu', 'Menu'), K('ControlRight', 'Ctrl'),
  K('ArrowLeft', '←'), K('ArrowDown', '↓'), K('ArrowRight', '→'),
];
const fKeys = (from: number, to: number): Item[] =>
  Array.from({ length: to - from + 1 }, (_, i) => K(`F${from + i}`, `F${from + i}`));

const ROWS: Record<LayoutId, { rows: Item[][]; gapAfterFirstRow: number }> = {
  '60': {
    gapAfterFirstRow: 0,
    rows: [
      [K('Escape', 'Esc'), ...digits()],
      tabRow(),
      capsRow(),
      [K('ShiftLeft', 'Shift', 2.25), ...shiftAlphas(), K('ShiftRight', 'Shift', 2.75)],
      fullBottom(),
    ],
  },
  '65': {
    gapAfterFirstRow: 0,
    rows: [
      [K('Escape', 'Esc'), ...digits(), K('Delete', 'Del')],
      [...tabRow(), K('PageUp', 'PgUp')],
      [...capsRow(), K('PageDown', 'PgDn')],
      [K('ShiftLeft', 'Shift', 2.25), ...shiftAlphas(), K('ShiftRight', 'Shift', 1.75), K('ArrowUp', '↑'), K('End', 'End')],
      compactBottom(),
    ],
  },
  '75': {
    gapAfterFirstRow: 0.25,
    rows: [
      [K('Escape', 'Esc'), ...fKeys(1, 12), K('PrintScreen', 'PrtSc'), K('Insert', 'Ins'), K('Delete', 'Del')],
      [K('Backquote', '`'), ...digits(), K('Home', 'Home')],
      [...tabRow(), K('PageUp', 'PgUp')],
      [...capsRow(), K('PageDown', 'PgDn')],
      [K('ShiftLeft', 'Shift', 2.25), ...shiftAlphas(), K('ShiftRight', 'Shift', 1.75), K('ArrowUp', '↑'), K('End', 'End')],
      compactBottom(),
    ],
  },
  tkl: {
    gapAfterFirstRow: 0.5,
    rows: [
      [K('Escape', 'Esc'), G(1), ...fKeys(1, 4), G(0.5), ...fKeys(5, 8), G(0.5), ...fKeys(9, 12), G(0.25),
        K('PrintScreen', 'PrtSc'), K('ScrollLock', 'ScrLk'), K('Pause', 'Pause')],
      [K('Backquote', '`'), ...digits(), G(0.25), K('Insert', 'Ins'), K('Home', 'Home'), K('PageUp', 'PgUp')],
      [...tabRow(), G(0.25), K('Delete', 'Del'), K('End', 'End'), K('PageDown', 'PgDn')],
      capsRow(),
      [K('ShiftLeft', 'Shift', 2.25), ...shiftAlphas(), K('ShiftRight', 'Shift', 2.75), G(1.25), K('ArrowUp', '↑')],
      [...fullBottom(), G(0.25), K('ArrowLeft', '←'), K('ArrowDown', '↓'), K('ArrowRight', '→')],
    ],
  },
};

function build(id: LayoutId): KeyboardLayout {
  const { rows, gapAfterFirstRow } = ROWS[id];
  const keys: KeyDef[] = [];
  let width = 0;
  rows.forEach((row, r) => {
    const y = r + (r > 0 ? gapAfterFirstRow : 0);
    let x = 0;
    for (const item of row) {
      if ('gap' in item) {
        x += item.gap;
        continue;
      }
      keys.push({ ...item, x, y, accent: ACCENT_CODES.has(item.code) });
      x += item.w;
    }
    width = Math.max(width, x);
  });
  return { id, keys, width, height: rows.length + gapAfterFirstRow };
}

export const LAYOUTS: Record<LayoutId, KeyboardLayout> = {
  '60': build('60'),
  '65': build('65'),
  '75': build('75'),
  tkl: build('tkl'),
};

/** Number of switches (= keys) a layout needs. */
export function keyCount(id: LayoutId): number {
  return LAYOUTS[id].keys.length;
}

/**
 * Some keyboards report the Korean 한/영 and 한자 keys with their own codes;
 * map them onto the key they sit on so the tester lights the right keycap.
 */
export const CODE_ALIASES: Record<string, string> = {
  Lang1: 'AltRight',
  HangulMode: 'AltRight',
  Lang2: 'ControlRight',
  Hanja: 'ControlRight',
  OSLeft: 'MetaLeft',
  OSRight: 'MetaRight',
};
