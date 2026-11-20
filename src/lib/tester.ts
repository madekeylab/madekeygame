import { CODE_ALIASES } from '../data/layouts';

/**
 * A second press this soon after a release is faster than a person can type,
 * so it is counted as switch chatter (one press registering twice).
 */
export const CHATTER_MS = 30;

export interface LogEntry {
  code: string;
  key: string;
  type: 'down' | 'up';
  t: number;
  /** For releases: how long the key was held, in ms. */
  held?: number;
  chatter?: boolean;
}

export interface TesterState {
  down: Record<string, number>; // code -> press time
  presses: Record<string, number>; // code -> press count
  chatter: Record<string, number>; // code -> chatter count
  lastUp: Record<string, number>; // code -> last release time
  log: LogEntry[];
}

export const emptyTester = (): TesterState => ({ down: {}, presses: {}, chatter: {}, lastUp: {}, log: [] });

const LOG_SIZE = 14;

export const normalizeCode = (code: string) => CODE_ALIASES[code] ?? code;

export function keyDown(s: TesterState, rawCode: string, key: string, t: number, repeat: boolean): TesterState {
  const code = normalizeCode(rawCode);
  // Auto-repeat while held is not a new press.
  if (repeat || code in s.down) return s;
  const last = s.lastUp[code];
  const chatter = last !== undefined && t - last < CHATTER_MS;
  return {
    ...s,
    down: { ...s.down, [code]: t },
    presses: { ...s.presses, [code]: (s.presses[code] ?? 0) + 1 },
    chatter: chatter ? { ...s.chatter, [code]: (s.chatter[code] ?? 0) + 1 } : s.chatter,
    log: [{ code, key, type: 'down' as const, t, chatter }, ...s.log].slice(0, LOG_SIZE),
  };
}

export function keyUp(s: TesterState, rawCode: string, key: string, t: number): TesterState {
  const code = normalizeCode(rawCode);
  const pressedAt = s.down[code];
  const down = { ...s.down };
  delete down[code];
  // Some keys (e.g. PrintScreen on Windows) only send a release; count it as a press.
  const presses = pressedAt === undefined ? { ...s.presses, [code]: (s.presses[code] ?? 0) + 1 } : s.presses;
  return {
    ...s,
    down,
    presses,
    lastUp: { ...s.lastUp, [code]: t },
    log: [{ code, key, type: 'up' as const, t, held: pressedAt === undefined ? undefined : Math.round(t - pressedAt) }, ...s.log].slice(0, LOG_SIZE),
  };
}

/** Releases everything, e.g. when the window loses focus and key-ups never arrive. */
export const releaseAll = (s: TesterState): TesterState => ({ ...s, down: {} });
