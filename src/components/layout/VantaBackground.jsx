"use client";
import { useEffect, useRef } from "react";

export default function VantaBackground({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    let effect = null;
    let isMounted = true;

    const loadVanta = async () => {
      const THREE = await import("three");
      const VANTA = await import("vanta/dist/vanta.fog.min");

      if (!isMounted || !ref.current) return;

      effect = VANTA.default({
        el: ref.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        highlightColor: 0xffc300,
        midtoneColor: 0xff1f00,
        lowlightColor: 0x2d00ff,
        baseColor: 0xffebeb,
        blurFactor: 0.6,
        zoom: 1,
        speed: 3,
      });
    };

    loadVanta().catch(console.error);

    return () => {
      isMounted = false;
      if (effect) effect.destroy();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
