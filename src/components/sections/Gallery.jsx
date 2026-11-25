"use client";

import { gallery } from "@/data/gallery";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import GalleryLightbox from "./gallery/GalleryLightbox";
import GallerySlider from "./gallery/GallerySlider";

export default function Gallery() {
  const [lightbox, setLightbox] = useState({ index: null, previewSrc: null });
  const swiperRef = useRef(null);

  // Tạm dừng Swiper autoplay khi đang mở Lightbox
  useEffect(() => {
    if (lightbox.index !== null) {
      swiperRef.current?.autoplay?.stop();
    } else {
      swiperRef.current?.autoplay?.start();
    }
  }, [lightbox.index]);

  const handleOpenLightbox = useCallback((id, previewSrc = null) => {
    const idx = gallery.findIndex((item) => item.id === id);
    setLightbox({ index: idx !== -1 ? idx : 0, previewSrc });
  }, []);

  const handleClose = useCallback(() => {
    setLightbox({ index: null, previewSrc: null });
  }, []);

  const handleNext = useCallback(() => {
    setLightbox((prev) => ({
      index: prev.index < gallery.length - 1 ? prev.index + 1 : 0,
      previewSrc: null,
    }));
  }, []);

  const handlePrev = useCallback(() => {
    setLightbox((prev) => ({
      index: prev.index > 0 ? prev.index - 1 : gallery.length - 1,
      previewSrc: null,
    }));
  }, []);

  const slides =
    gallery.length > 0 && gallery.length < 6
      ? [...gallery, ...gallery]
      : gallery;

  return (
    <section className="py-8 sm:py-10 bg-transparent text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          Hành trình hoạt động
        </h2>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-amber-100/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] px-4 mb-4 sm:mb-6">
          Những khoảnh khắc sinh hoạt và kỷ niệm của các thành viên. Nhấp vào
          ảnh để xem và phóng to.
        </p>
      </motion.div>

      <div className="w-full py-2 sm:py-3 px-4 overflow-hidden select-none">
        <div className="max-w-5xl mx-auto min-h-[220px] sm:min-h-[280px] md:min-h-[360px]">
          <GallerySlider
            slides={slides}
            onSlideClick={handleOpenLightbox}
            swiperRef={swiperRef}
          />
        </div>
      </div>

      <AnimatePresence>
        {lightbox.index !== null && (
          <GalleryLightbox
            isOpen={lightbox.index !== null}
            currentIndex={lightbox.index}
            previewSrc={lightbox.previewSrc}
            items={gallery}
            onClose={handleClose}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
