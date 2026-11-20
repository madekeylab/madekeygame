import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import { SEED_REVIEWS } from '../data/reviews';
import type { Build, CartLine, Order, Review, SavedBuild } from '../data/types';
import { newId } from '../lib/format';

interface State {
  cart: CartLine[];
  builds: SavedBuild[];
  myReviews: Review[];
  helpfulVotes: string[];
  orders: Order[];
  /** The build in progress in the builder, kept across page changes. */
  draft: { name: string; parts: Build; savedId?: string };
}

type Action =
  | { type: 'cart/add'; lines: CartLine[] }
  | { type: 'cart/setQty'; index: number; quantity: number }
  | { type: 'cart/remove'; index: number }
  | { type: 'build/save'; build: SavedBuild }
  | { type: 'build/delete'; id: string }
  | { type: 'draft/set'; draft: State['draft'] }
  | { type: 'review/add'; review: Review }
  | { type: 'review/helpful'; id: string }
  | { type: 'order/place'; order: Order };

const STORAGE_KEY = 'madekey:v1';

const initial: State = {
  cart: [],
  builds: [],
  myReviews: [],
  helpfulVotes: [],
  orders: [],
  draft: { name: '', parts: {} },
};

function load(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...initial, ...JSON.parse(raw) };
  } catch {
    // Storage blocked or corrupt: start empty.
  }
  return initial;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'cart/add': {
      const cart = [...state.cart];
      for (const line of action.lines) {
        if (line.quantity <= 0) continue;
        const i = cart.findIndex((l) => l.productId === line.productId && l.buildName === line.buildName);
        if (i >= 0) cart[i] = { ...cart[i], quantity: cart[i].quantity + line.quantity };
        else cart.push(line);
      }
      return { ...state, cart };
    }
    case 'cart/setQty':
      return {
        ...state,
        cart: state.cart.map((l, i) => (i === action.index ? { ...l, quantity: Math.max(1, action.quantity) } : l)),
      };
    case 'cart/remove':
      return { ...state, cart: state.cart.filter((_, i) => i !== action.index) };
    case 'build/save':
      return { ...state, builds: [action.build, ...state.builds.filter((b) => b.id !== action.build.id)] };
    case 'build/delete':
      return { ...state, builds: state.builds.filter((b) => b.id !== action.id) };
    case 'draft/set':
      return { ...state, draft: action.draft };
    case 'review/add':
      return { ...state, myReviews: [action.review, ...state.myReviews] };
    case 'review/helpful':
      return state.helpfulVotes.includes(action.id)
        ? { ...state, helpfulVotes: state.helpfulVotes.filter((v) => v !== action.id) }
        : { ...state, helpfulVotes: [...state.helpfulVotes, action.id] };
    case 'order/place':
      return { ...state, orders: [action.order, ...state.orders], cart: [] };
  }
}

interface Store extends State {
  dispatch: React.Dispatch<Action>;
  /** Sample reviews plus the user's own, with the user's helpful votes counted. */
  reviews: Review[];
  cartCount: number;
  newSavedBuild: (name: string, parts: Build) => SavedBuild;
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Not persisted in private mode; the app still works for this visit.
    }
  }, [state]);

  const value = useMemo<Store>(() => {
    const votes = new Set(state.helpfulVotes);
    const reviews = [...state.myReviews, ...SEED_REVIEWS].map((r) =>
      votes.has(r.id) ? { ...r, helpful: r.helpful + 1 } : r,
    );
    return {
      ...state,
      dispatch,
      reviews,
      cartCount: state.cart.length,
      newSavedBuild: (name, parts) => ({
        id: newId('build'), name: name.trim() || '나의 키보드', parts, createdAt: new Date().toISOString(),
      }),
    };
  }, [state]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore must be used inside StoreProvider');
  return s;
}
