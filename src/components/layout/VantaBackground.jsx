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
      try {
        const THREE = await import("three");
        const VANTA = await import("vanta/dist/vanta.fog.min");

        if (!isMounted || !vantaRef.current) return;

        effect = VANTA.default({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: !prefersReducedMotion,
          touchControls: false,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1.5,
          scaleMobile: 4.0,
          highlightColor: 0xeb3838,
          midtoneColor: 0xb51e24,
          lowlightColor: 0x5e0b10,
          baseColor: 0x821217,
          blurFactor: 0.6,
          zoom: 1,
          speed: activeSpeed,
        });
      } catch (err) {
        // Tự động dùng nền tĩnh gradient nếu thiết bị không hỗ trợ WebGL
        console.warn("Vanta WebGL unavailable, using static gradient fallback:", err);
      }
    };

    loadVanta().catch(() => {});

    // Dừng hẳn loop shader (speed: 0) khi đang cuộn màn hình hoặc vuốt ngón tay để GPU dồn sức cho 60/120fps
    let scrollTimeout = null;
    let isTouching = false;

    const getBaseSpeed = () => {
      const isScrolledDeep = window.scrollY > 1400;
      return isScrolledDeep ? 0.5 : activeSpeed;
    };

    const pauseVanta = () => {
      if (!effect || typeof effect.setOptions !== "function" || document.hidden) return;
      effect.setOptions({ speed: 0 });
    };

    const resumeVanta = () => {
      if (!effect || typeof effect.setOptions !== "function" || document.hidden || isTouching) return;
      effect.setOptions({ speed: getBaseSpeed() });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseVanta();
      } else {
        resumeVanta();
      }
    };

    const handleScroll = () => {
      pauseVanta();
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        resumeVanta();
      }, 150);
    };

    const handleTouchStart = () => {
      isTouching = true;
      pauseVanta();
    };

    const handleTouchEnd = () => {
      isTouching = false;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        resumeVanta();
      }, 150);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      isMounted = false;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
      if (effect) effect.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#120103]">
      {/* Nền gradient tĩnh dự phòng đồng bộ 100% tone màu đỏ ruby của Vanta Fog */}
      <div
        aria-hidden="true"
        className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top,#540e15_0%,#260408_45%,#120103_100%)]"
      />
      {/* Canvas sương mờ Vanta 3D (phủ động lên trên khi thiết bị có WebGL) */}
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
