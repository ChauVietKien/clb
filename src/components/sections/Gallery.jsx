"use client";

import { gallery } from "@/data/gallery";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import GalleryLightbox from "./gallery/GalleryLightbox";
import GallerySlider from "./gallery/GallerySlider";

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const swiperRef = useRef(null);

  // Tạm dừng Swiper autoplay khi đang mở Lightbox
  useEffect(() => {
    if (lightboxIndex !== null) {
      swiperRef.current?.autoplay?.stop();
    } else {
      swiperRef.current?.autoplay?.start();
    }
  }, [lightboxIndex]);

  const handleOpenLightbox = useCallback((id) => {
    const idx = gallery.findIndex((item) => item.id === id);
    setLightboxIndex(idx !== -1 ? idx : 0);
  }, []);

  const handleClose = useCallback(() => setLightboxIndex(null), []);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
  }, []);

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
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
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          Hành trình hoạt động
        </h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-amber-100/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] px-4 mb-4 sm:mb-6">
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
        {lightboxIndex !== null && (
          <GalleryLightbox
            isOpen={lightboxIndex !== null}
            currentIndex={lightboxIndex}
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
