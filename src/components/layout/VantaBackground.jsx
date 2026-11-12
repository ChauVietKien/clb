"use client";

import { useEffect, useRef } from "react";

export default function VantaBackground({ children }) {
  const vantaRef = useRef(null);

  useEffect(() => {
    let effect = null;
    let isMounted = true;

    // Tôn trọng cài đặt giảm chuyển động của hệ điều hành
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const activeSpeed = prefersReducedMotion ? 1.0 : 2.0;

    const loadVanta = async () => {
      const THREE = await import("three");
      const VANTA = await import("vanta/dist/vanta.fog.min");

      if (!isMounted || !vantaRef.current) return;

      effect = VANTA.default({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: !prefersReducedMotion,
        touchControls: !prefersReducedMotion,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1.5,
        scaleMobile: 2.0,
        highlightColor: 0xeb3838,
        midtoneColor: 0xb51e24,
        lowlightColor: 0x5e0b10,
        baseColor: 0x821217,
        blurFactor: 0.6,
        zoom: 1,
        speed: activeSpeed,
      });
    };

    loadVanta().catch(console.error);

    // Tự động điều chỉnh hiệu năng khi chuyển tab hoặc cuộn sâu
    const handleVisibilityChange = () => {
      if (!effect || typeof effect.setOptions !== "function") return;
      if (document.hidden) {
        effect.setOptions({ speed: 0 });
      } else {
        effect.setOptions({ speed: activeSpeed });
      }
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (
            effect &&
            typeof effect.setOptions === "function" &&
            !document.hidden
          ) {
            const isScrolledDeep = window.scrollY > 1400;
            effect.setOptions({ speed: isScrolledDeep ? 0.5 : activeSpeed });
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      isMounted = false;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("scroll", handleScroll);
      if (effect) effect.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Canvas sương mờ cố định viewport ở z-0, tối ưu 60fps không bị reflow khi cuộn */}
      <div
        ref={vantaRef}
        aria-hidden="true"
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />
      {/* Cây DOM nội dung web độc lập ở z-10 */}
      <div className="relative z-10 min-h-screen flex flex-col">{children}</div>
    </div>
  );
}
