"use client";

import { useEffect, useRef } from "react";

export default function VantaBackground({ children }) {
  const vantaRef = useRef(null);

  useEffect(() => {
    let effect = null;
    let isMounted = true;

    const loadVanta = async () => {
      const THREE = await import("three");
      const VANTA = await import("vanta/dist/vanta.fog.min");

      if (!isMounted || !vantaRef.current) return;

      effect = VANTA.default({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        highlightColor: 0xffc300,
        midtoneColor: 0xff3e18,
        lowlightColor: 0xd9572b,
        baseColor: 0xffeee5,
        blurFactor: 0.6,
        zoom: 1,
        speed: 2.5,
      });
    };

    loadVanta().catch(console.error);

    return () => {
      isMounted = false;
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
