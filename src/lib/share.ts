import { getProduct } from '../data/products';
import { BUILD_STEPS, type Build } from '../data/types';

/** Query string for a build, e.g. `n=My+Board&case=case-pebble65&pcb=...`. */
export function encodeBuild(build: Build, name: string): string {
  const params = new URLSearchParams();
  if (name.trim()) params.set('n', name.trim());
  for (const c of BUILD_STEPS) if (build[c]) params.set(c, build[c]!);
  return params.toString();
}

/** Reads a build back, dropping ids that are unknown or in the wrong slot. */
export function decodeBuild(query: string): { build: Build; name: string } {
  const params = new URLSearchParams(query);
  const build: Build = {};
  for (const c of BUILD_STEPS) {
    const p = getProduct(params.get(c) ?? undefined);
    if (p && p.category === c) build[c] = p.id;
  }
  return { build, name: (params.get('n') ?? '').slice(0, 60) };
}

/** Absolute link to the shared-build page, working from any host or folder. */
export function shareUrl(build: Build, name: string, location: Pick<Location, 'origin' | 'pathname'> = window.location): string {
  return `${location.origin}${location.pathname}#/b?${encodeBuild(build, name)}`;
}

export function snsLinks(url: string, text: string) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(text);
  return {
    x: `https://twitter.com/intent/tweet?text=${t}&url=${u}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    threads: `https://www.threads.net/intent/post?text=${encodeURIComponent(`${text} ${url}`)}`,
  };
}
