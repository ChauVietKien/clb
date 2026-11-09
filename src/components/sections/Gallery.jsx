"use client";

import { useSyncExternalStore, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gallery } from "@/data/gallery";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-coverflow";

const emptySubscribe = () => () => {};

export default function Gallery() {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Điều hướng bàn phím và khóa cuộn trang khi mở phóng to ảnh
  useEffect(() => {
    if (lightboxIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex]);

  const slides =
    gallery.length > 0 && gallery.length < 6
      ? [...gallery, ...gallery]
      : gallery;

  const openLightbox = (id) => {
    const idx = gallery.findIndex((item) => item.id === id);
    setLightboxIndex(idx !== -1 ? idx : 0);
  };

  return (
    <section className="py-8 sm:py-10 bg-transparent text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          Hình ảnh hoạt động
        </h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-amber-100/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] px-4 mb-4 sm:mb-6">
          Những khoảnh khắc sinh hoạt và kỷ niệm của các thành viên. Nhấp vào ảnh để xem phóng to.
        </p>
      </motion.div>

      <div className="w-full py-2 sm:py-3 px-4 overflow-hidden select-none">
        <div className="max-w-5xl mx-auto min-h-[220px] sm:min-h-[280px] md:min-h-[360px]">
          {isClient ? (
            <Swiper
              modules={[EffectCoverflow, Autoplay]}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              loop={true}
              speed={900}
              watchSlidesProgress={true}
              slideToClickedSlide={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              coverflowEffect={{
                rotate: 0,
                stretch: 80,
                depth: 160,
                modifier: 1,
                scale: 0.88,
                slideShadows: false,
              }}
              breakpoints={{
                320: {
                  coverflowEffect: { stretch: 40, depth: 100, scale: 0.85, rotate: 0 },
                },
                768: {
                  coverflowEffect: { stretch: 70, depth: 140, scale: 0.88, rotate: 0 },
                },
                1024: {
                  coverflowEffect: { stretch: 90, depth: 160, scale: 0.88, rotate: 0 },
                },
              }}
              className="w-full py-3 !overflow-visible"
            >
              {slides.map((item, index) => (
                <SwiperSlide
                  key={`${item.id || index}-${index}`}
                  className="group !w-[270px] sm:!w-[420px] md:!w-[560px] aspect-[16/9] cursor-pointer"
                >
                  <div
                    onClick={() => openLightbox(item.id)}
                    className="relative w-full h-full rounded-2xl overflow-hidden transition-[opacity,filter] duration-500 ease-out transform-gpu opacity-0 pointer-events-none scale-90 group-[.swiper-slide-active]:opacity-100 group-[.swiper-slide-active]:pointer-events-auto group-[.swiper-slide-active]:scale-100 group-[.swiper-slide-active]:translate-y-0 group-[.swiper-slide-active]:brightness-100 group-[.swiper-slide-active]:shadow-[0_20px_50px_rgba(0,0,0,0.7)] group-[.swiper-slide-active]:ring-1 group-[.swiper-slide-active]:ring-white/20 group-[.swiper-slide-prev]:opacity-60 group-[.swiper-slide-prev]:pointer-events-auto group-[.swiper-slide-prev]:brightness-50 group-[.swiper-slide-prev]:translate-y-3 group-[.swiper-slide-prev]:hover:opacity-85 group-[.swiper-slide-prev]:hover:brightness-75 group-[.swiper-slide-next]:opacity-60 group-[.swiper-slide-next]:pointer-events-auto group-[.swiper-slide-next]:brightness-50 group-[.swiper-slide-next]:translate-y-3 group-[.swiper-slide-next]:hover:opacity-85 group-[.swiper-slide-next]:hover:brightness-75"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 270px, (max-width: 768px) 420px, 560px"
                      className="object-cover select-none"
                      draggable={false}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-[.swiper-slide-active]:opacity-0 opacity-100 pointer-events-none" />

                    {/* Biểu tượng gợi ý phóng to ảnh khi hover ở slide trung tâm */}
                    <div className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-xs text-white opacity-0 group-[.swiper-slide-active]:group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="w-full py-8 flex items-center justify-center">
              <div className="w-[270px] sm:w-[420px] md:w-[560px] aspect-[16/9] rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 animate-pulse" />
            </div>
          )}
        </div>
      </div>

      {/* Modal Lightbox xem ảnh phóng to */}
      <AnimatePresence>
        {lightboxIndex !== null && gallery[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md p-3 sm:p-6"
            onClick={() => setLightboxIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Xem ảnh phóng to"
          >
            {/* Nút đóng */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(null);
              }}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
              aria-label="Đóng xem ảnh"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Nút lùi */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) =>
                  prev > 0 ? prev - 1 : gallery.length - 1
                );
              }}
              className="absolute left-2 sm:left-6 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Khung ảnh phóng to chính */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full h-[65vh] sm:h-[75vh] max-h-[800px] flex items-center justify-center"
            >
              <Image
                src={gallery[lightboxIndex].src}
                alt={gallery[lightboxIndex].alt}
                fill
                priority
                sizes="95vw"
                className="object-contain"
              />
            </motion.div>

            {/* Nút tiến */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) =>
                  prev < gallery.length - 1 ? prev + 1 : 0
                );
              }}
              className="absolute right-2 sm:right-6 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
              aria-label="Ảnh kế tiếp"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Chú thích ảnh và số trang */}
            <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 text-center text-white/90 text-xs sm:text-sm px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md max-w-[90vw] truncate">
              <span>{gallery[lightboxIndex].alt}</span>
              <span className="mx-2 text-white/40">•</span>
              <span className="font-mono">{lightboxIndex + 1} / {gallery.length}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
