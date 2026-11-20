"use client";
import { useState } from "react";
import Keycap from "./Keycap";

const tone = (name: string) => {
  let t = 0;
  for (let i = 0; i < name.length; i++) t = (31 * t + name.charCodeAt(i)) % 997;
  return t % 4;
};

/** 상품 · 제조사 썸네일. 사진이 없거나 깨지면 키캡 자리표시로 바꾼다. */
export default function Thumb({ src, alt, name, ratio = "square", priority = false, sizes }: { src: string | null; alt: string; name: string; ratio?: "square" | "wide"; priority?: boolean; sizes?: string }) {
  const [broken, setBroken] = useState(false);
  return (
    <div className={`fth is-${ratio}`}>
      {src && !broken ? (
        <img src={src} sizes={sizes} alt={alt} loading={priority ? "eager" : "lazy"} decoding={priority ? "sync" : "async"} fetchPriority={priority ? "high" : "auto"} onError={() => setBroken(true)} />
      ) : (
        <div className={`fth-ph is-t${tone(name)}`} role="img" aria-label={`${name} 사진 준비 중`}>
          <Keycap className="fth-ph-kb" legend={(name.trim()[0] ?? "K").toUpperCase()} />
          <small aria-hidden="true">사진 준비 중</small>
        </div>
      )}
    </div>
  );
}
