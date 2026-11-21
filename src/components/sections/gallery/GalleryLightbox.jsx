"use client";

import { getCloudinaryUrl } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useImageZoom } from "./useImageZoom";

export default function GalleryLightbox({ isOpen, currentIndex, items, onClose, onPrev, onNext }) {
  const currentItem = items[currentIndex];
  const {
    scale, isPinching, x, y, maxDragX, maxDragY, imageContainerRef,
    resetZoom, toggleZoom, handleTouchStart, handleTouchMove, handleTouchEnd,
  } = useImageZoom(isOpen);

  useEffect(() => { resetZoom(); }, [currentIndex, resetZoom]);

  useEffect(() => {
    if (!isOpen) return;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevPadding = document.body.style.paddingRight;
    const prevOverflow = document.body.style.overflow;

    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = "hidden";

    const prevent = (e) => e.preventDefault();
    window.addEventListener("wheel", prevent, { passive: false });
    window.addEventListener("touchmove", prevent, { passive: false });

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
      window.removeEventListener("wheel", prevent);
      window.removeEventListener("touchmove", prevent);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !currentItem) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/98 backdrop-blur-none sm:backdrop-blur-xl p-3 sm:p-6 select-none overflow-hidden touch-none"
      onClick={onClose}
      onWheel={(e) => { e.preventDefault(); e.stopPropagation(); }}
      onTouchMove={(e) => { e.preventDefault(); e.stopPropagation(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Xem ảnh phóng to"
    >
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); toggleZoom(); }}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer active:scale-95"
          aria-label={scale > 1.2 ? "Thu nhỏ (1x)" : "Phóng to (2x)"}
        >
          {scale > 1.2 ? <ZoomOut className="w-5 h-5 text-amber-300" /> : <ZoomIn className="w-5 h-5 text-white" />}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer active:scale-95"
          aria-label="Đóng xem ảnh"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-2 sm:left-6 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer active:scale-90"
        aria-label="Ảnh trước"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div
        ref={imageContainerRef}
        className="relative max-w-5xl w-full h-[65vh] sm:h-[75vh] max-h-[800px] flex items-center justify-center overflow-hidden touch-none select-none"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          key={currentIndex}
          style={{ x, y, transformOrigin: "center center" }}
          animate={{ scale }}
          transition={isPinching ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 28 }}
          drag={scale > 1.05 && !isPinching}
          dragConstraints={{ left: -maxDragX, right: maxDragX, top: -maxDragY, bottom: maxDragY }}
          dragElastic={0.08}
          onDoubleClick={toggleZoom}
          className={`relative w-full h-full flex items-center justify-center ${scale > 1.05 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
        >
          <Image
            src={getCloudinaryUrl(currentItem.src, { width: 2800, quality: "100", sharpen: 75 })}
            alt={currentItem.alt || `Hoạt động ${currentItem.id}`}
            fill
            priority
            placeholder="blur"
            blurDataURL={getCloudinaryUrl(currentItem.src, { width: 900, quality: "auto:good" })}
            sizes="(max-width: 1024px) 95vw, 1200px"
            className="object-contain drop-shadow-2xl select-none pointer-events-none"
            draggable={false}
          />
        </motion.div>
      </div>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-2 sm:right-6 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer active:scale-90"
        aria-label="Ảnh kế tiếp"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 text-center text-white/90 text-xs sm:text-sm px-4 py-1.5 rounded-full bg-black/70 border border-white/10 max-w-[90vw] truncate">
        {currentItem.alt && (
          <>
            <span>{currentItem.alt}</span>
            <span className="mx-2 text-white/40">•</span>
          </>
        )}
        <span className="font-mono font-medium">{currentIndex + 1} / {items.length}</span>
        <span className="hidden sm:inline mx-2 text-white/40">•</span>
        <span className="hidden sm:inline text-white/60 text-xs">
          {scale > 1.2 ? "Cuộn chuột / Kéo rê • Nhấp đúp để thu nhỏ" : "Cuộn chuột / 2 ngón để zoom • Nhấp đúp (2x)"}
        </span>
      </div>
    </motion.div>
  );
}
