"use client";

import { useEffect, useRef } from "react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function LavaLampBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const currentProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const energyRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const lastTouchYRef = useRef<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const isActiveViewport = () => {
      const rect = root.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    };

    const applyVars = (progress: number, energy: number) => {
      // Water-like drift amplitude and speed controls.
      const shiftX = Math.sin(progress * 0.52) * 14 + Math.cos(progress * 0.28) * 10;
      const shiftY = Math.cos(progress * 0.44) * 16 + Math.sin(progress * 0.22) * 9;
      const warmBoost = clamp(0.46 + energy * 0.24, 0.42, 0.74);
      const brightBoost = clamp(0.32 + energy * 0.2, 0.28, 0.56);

      root.style.setProperty("--lava-flow-x", `${shiftX.toFixed(2)}%`);
      root.style.setProperty("--lava-flow-y", `${shiftY.toFixed(2)}%`);
      root.style.setProperty("--lava-warm", `${warmBoost.toFixed(3)}`);
      root.style.setProperty("--lava-bright", `${brightBoost.toFixed(3)}`);
    };

    const tick = () => {
      rafRef.current = null;

      if (!isActiveViewport()) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      // Constant slow drift + scroll impulse blend.
      targetProgressRef.current += 0.0024;
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.14;
      energyRef.current *= 0.9;
      applyVars(currentProgressRef.current, energyRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    const ensureTick = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const pushVelocity = (delta: number) => {
      // Main scroll-to-morph sensitivity control.
      const impulse = clamp(delta * 0.0075, -0.85, 0.85);
      targetProgressRef.current += impulse;
      energyRef.current = clamp(energyRef.current + Math.abs(impulse) * 0.95, 0, 1);
      ensureTick();
    };

    const onWheel = (event: WheelEvent) => pushVelocity(event.deltaY);

    const onScroll = () => {
      const nextY = window.scrollY;
      const delta = nextY - lastScrollYRef.current;
      lastScrollYRef.current = nextY;
      pushVelocity(delta);
    };

    const onTouchStart = (event: TouchEvent) => {
      lastTouchYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      const y = event.touches[0]?.clientY;
      const last = lastTouchYRef.current;
      if (typeof y !== "number" || typeof last !== "number") return;
      lastTouchYRef.current = y;
      pushVelocity(last - y);
    };

    lastScrollYRef.current = window.scrollY;
    applyVars(0, 0);
    ensureTick();

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="lava-layer absolute inset-[18px] z-[1] overflow-hidden rounded-[46px] pointer-events-none" ref={rootRef}>
      <div className="lava-sheen" />
    </div>
  );
}
