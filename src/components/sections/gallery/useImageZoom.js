"use client";

import { animate, useMotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

export function useImageZoom(isActive) {
  const [scale, setScale] = useState(1);
  const [isPinching, setIsPinching] = useState(false);
  const [bounds, setBounds] = useState({ w: 800, h: 600 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const imageContainerRef = useRef(null);
  const touchRef = useRef({
    startDist: 0,
    startScale: 1,
    lastTap: 0,
  });

  const resetZoom = useCallback(() => {
    setScale(1);
    setIsPinching(false);
    animate(x, 0, { type: "spring", stiffness: 350, damping: 30 });
    animate(y, 0, { type: "spring", stiffness: 350, damping: 30 });
  }, [x, y]);

  const toggleZoom = useCallback(() => {
    if (scale > 1.2) {
      resetZoom();
    } else {
      setScale(2.2);
      animate(x, 0, { type: "spring", stiffness: 350, damping: 30 });
      animate(y, 0, { type: "spring", stiffness: 350, damping: 30 });
    }
  }, [scale, resetZoom, x, y]);

  // Cập nhật kích thước khung khi modal active
  useEffect(() => {
    if (!isActive) return;
    const updateBounds = () => {
      if (imageContainerRef.current) {
        setBounds({
          w: imageContainerRef.current.clientWidth || 800,
          h: imageContainerRef.current.clientHeight || 600,
        });
      }
    };
    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, [isActive]);

  // Hồi về vị trí 0 khi scale về chuẩn
  useEffect(() => {
    if (scale <= 1.05) {
      animate(x, 0, { type: "spring", stiffness: 350, damping: 30 });
      animate(y, 0, { type: "spring", stiffness: 350, damping: 30 });
    }
  }, [scale, x, y]);

  // Cuộn chuột (Mouse Wheel) để zoom
  useEffect(() => {
    const el = imageContainerRef.current;
    if (!el || !isActive) return;

    const onWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const zoomStep = 0.25;
      const direction = e.deltaY < 0 ? 1 : -1;

      setScale((prevScale) => {
        const nextScale = Math.min(
          Math.max(prevScale + direction * zoomStep, 1),
          3.5
        );
        const roundedScale = parseFloat(nextScale.toFixed(2));

        if (roundedScale <= 1.05) {
          animate(x, 0, { type: "spring", stiffness: 320, damping: 28 });
          animate(y, 0, { type: "spring", stiffness: 320, damping: 28 });
          return 1;
        }

        const currentX = x.get();
        const currentY = y.get();
        const maxDragX = Math.max(0, ((roundedScale - 1) * bounds.w) / 2);
        const maxDragY = Math.max(0, ((roundedScale - 1) * bounds.h) / 2);

        if (Math.abs(currentX) > maxDragX) {
          animate(x, Math.sign(currentX || 1) * maxDragX, {
            type: "spring",
            stiffness: 320,
            damping: 28,
          });
        }
        if (Math.abs(currentY) > maxDragY) {
          animate(y, Math.sign(currentY || 1) * maxDragY, {
            type: "spring",
            stiffness: 320,
            damping: 28,
          });
        }

        return roundedScale;
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [isActive, bounds.w, bounds.h, x, y]);

  // Cử chỉ chạm 2 ngón (Pinch)
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      touchRef.current.startDist = Math.hypot(
        t2.clientX - t1.clientX,
        t2.clientY - t1.clientY
      );
      touchRef.current.startScale = scale;
      setIsPinching(true);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      if (e.cancelable) e.preventDefault();
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(
        t2.clientX - t1.clientX,
        t2.clientY - t1.clientY
      );
      if (touchRef.current.startDist > 0) {
        const factor = dist / touchRef.current.startDist;
        const newScale = Math.min(
          Math.max(touchRef.current.startScale * factor, 0.8),
          3.5
        );
        setScale(newScale);
      }
    }
  };

  const handleTouchEnd = (e) => {
    if (e.touches.length === 0) {
      setIsPinching(false);

      if (scale < 1.05) {
        resetZoom();
      } else {
        const currentX = x.get();
        const currentY = y.get();
        const maxDragX = Math.max(0, ((scale - 1) * bounds.w) / 2);
        const maxDragY = Math.max(0, ((scale - 1) * bounds.h) / 2);
        const clampedX = Math.min(Math.max(currentX, -maxDragX), maxDragX);
        const clampedY = Math.min(Math.max(currentY, -maxDragY), maxDragY);
        if (currentX !== clampedX) {
          animate(x, clampedX, { type: "spring", stiffness: 350, damping: 30 });
        }
        if (currentY !== clampedY) {
          animate(y, clampedY, { type: "spring", stiffness: 350, damping: 30 });
        }
      }

      const now = Date.now();
      if (now - touchRef.current.lastTap < 300) {
        if (e.cancelable) e.preventDefault();
        toggleZoom();
      }
      touchRef.current.lastTap = now;
    } else if (e.touches.length === 1) {
      setIsPinching(false);
    }
  };

  const maxDragX = Math.max(0, ((scale - 1) * bounds.w) / 2);
  const maxDragY = Math.max(0, ((scale - 1) * bounds.h) / 2);

  return {
    scale,
    isPinching,
    x,
    y,
    maxDragX,
    maxDragY,
    imageContainerRef,
    resetZoom,
    toggleZoom,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
