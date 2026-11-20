import { useState, type RefObject } from 'react';
import { CATEGORY_LABEL, type Build } from '../data/types';
import { buildProducts, buildTotal } from '../lib/compat';
import { won } from '../lib/format';
import { shareUrl, snsLinks } from '../lib/share';

interface Props {
  build: Build;
  name: string;
  /** The rendered build preview, drawn into the share image. */
  previewRef: RefObject<SVGSVGElement>;
}

const FONT = "system-ui, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif";

function loadSvg(svg: SVGSVGElement): Promise<HTMLImageElement> {
  const xml = new XMLSerializer().serializeToString(svg);
  const url = URL.createObjectURL(new Blob([xml], { type: 'image/svg+xml;charset=utf-8' }));
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('미리보기를 이미지로 바꾸지 못했습니다.'));
    img.src = url;
  }).finally(() => URL.revokeObjectURL(url)) as Promise<HTMLImageElement>;
}

/** Draws a 1080×1350 card (Instagram portrait size) with the preview, parts and price. */
async function renderShareImage(svg: SVGSVGElement, build: Build, name: string): Promise<Blob> {
  const W = 1080;
  const H = 1350;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#14161c';
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#ff8a3d';
  ctx.font = `700 34px ${FONT}`;
  ctx.fillText('MadeKey 메이드키', 72, 100);
  ctx.fillStyle = '#ffffff';
  ctx.font = `800 64px ${FONT}`;
  ctx.fillText(name || '나의 커스텀 키보드', 72, 185, W - 144);

  const img = await loadSvg(svg);
  const vb = svg.viewBox.baseVal;
  const drawW = W - 144;
  const drawH = (drawW * vb.height) / vb.width;
  ctx.drawImage(img, 72, 240, drawW, drawH);

  let y = 240 + drawH + 80;
  ctx.font = `500 34px ${FONT}`;
  for (const p of buildProducts(build)) {
    ctx.fillStyle = '#8c93a3';
    ctx.fillText(CATEGORY_LABEL[p.category], 72, y);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(p.name, 300, y, W - 372);
    y += 58;
  }
  ctx.fillStyle = '#ff8a3d';
  ctx.font = `800 52px ${FONT}`;
  ctx.fillText(`총 ${won(buildTotal(build))}`, 72, H - 90);

  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('이미지를 만들지 못했습니다.'))), 'image/png'),
  );
}

export function SharePanel({ build, name, previewRef }: Props) {
  const [msg, setMsg] = useState('');
  const url = shareUrl(build, name);
  const text = `메이드키에서 조립한 내 키보드 "${name || '나의 커스텀 키보드'}" ⌨️`;
  const links = snsLinks(url, text);

  const flash = (m: string) => {
    setMsg(m);
    window.setTimeout(() => setMsg(''), 2500);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      flash('링크를 복사했습니다.');
    } catch {
      window.prompt('아래 링크를 복사하세요', url);
    }
  };

  const makeFile = async () => {
    if (!previewRef.current) throw new Error('미리보기가 없습니다.');
    const blob = await renderShareImage(previewRef.current, build, name);
    return new File([blob], 'madekey-build.png', { type: 'image/png' });
  };

  const download = async () => {
    try {
      const file = await makeFile();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(file);
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(a.href);
      flash('이미지를 저장했습니다. 인스타그램 등에 올려보세요!');
    } catch (e) {
      flash((e as Error).message);
    }
  };

  const nativeShare = async () => {
    try {
      const file = await makeFile().catch(() => undefined);
      const data: ShareData = { title: '메이드키 빌드', text, url };
      if (file && navigator.canShare?.({ files: [file] })) data.files = [file];
      await navigator.share(data);
    } catch (e) {
      if ((e as Error).name !== 'AbortError') flash('공유하지 못했습니다.');
    }
  };

  return (
    <div className="share-panel">
      <div className="share-buttons">
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button type="button" className="btn" onClick={nativeShare}>📤 공유하기</button>
        )}
        <a className="btn sns x" href={links.x} target="_blank" rel="noopener noreferrer">X</a>
        <a className="btn sns fb" href={links.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
        <a className="btn sns th" href={links.threads} target="_blank" rel="noopener noreferrer">Threads</a>
        <button type="button" className="btn" onClick={copy}>🔗 링크 복사</button>
        <button type="button" className="btn" onClick={download}>🖼️ 이미지 저장</button>
      </div>
      <p className="small muted" role="status" aria-live="polite">
        {msg || '링크를 받은 사람은 같은 구성을 보고 바로 장바구니에 담을 수 있어요.'}
      </p>
    </div>
  );
}
