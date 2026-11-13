"use client";

import { gallery } from "@/data/gallery";
import { animate, AnimatePresence, motion, useMotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";

const emptySubscribe = () => () => {};

export default function Gallery() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [scale, setScale] = useState(1);
  const [isPinching, setIsPinching] = useState(false);
  const [bounds, setBounds] = useState({ w: 800, h: 600 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedIndices, setLoadedIndices] = useState(() => {
    const initial = new Set();
    const total = gallery.length || 1;
    for (let offset = -3; offset <= 4; offset++) {
      initial.add((offset + total) % total);
    }
    return initial;
  });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const swiperRef = useRef(null);
  const imageContainerRef = useRef(null);
  const touchRef = useRef({
    startDist: 0,
    startScale: 1,
    lastTap: 0,
  });

  // Tạm dừng Swiper slide ở background khi đang mở xem ảnh phóng to
  useEffect(() => {
    if (lightboxIndex !== null) {
      swiperRef.current?.autoplay?.stop();
    } else {
      swiperRef.current?.autoplay?.start();
    }
  }, [lightboxIndex]);

  // Đo kích thước khung hiển thị ảnh để tính giới hạn kéo chính xác từng pixel
  useEffect(() => {
    if (lightboxIndex === null) return;
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
  }, [lightboxIndex]);

  // Tự động hồi về đúng khung ảnh ban đầu khi thu nhỏ (chuẩn Photos)
  useEffect(() => {
    if (scale <= 1.05) {
      animate(x, 0, { type: "spring", stiffness: 350, damping: 30 });
      animate(y, 0, { type: "spring", stiffness: 350, damping: 30 });
    }
  }, [scale, x, y]);

  const resetZoom = useCallback(() => {
    setScale(1);
    setIsPinching(false);
    animate(x, 0, { type: "spring", stiffness: 350, damping: 30 });
    animate(y, 0, { type: "spring", stiffness: 350, damping: 30 });
  }, [x, y]);

  const toggleZoom = () => {
    if (scale > 1.2) {
      resetZoom();
    } else {
      setScale(2.2);
      animate(x, 0, { type: "spring", stiffness: 350, damping: 30 });
      animate(y, 0, { type: "spring", stiffness: 350, damping: 30 });
    }
  };

  const handleNext = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      resetZoom();
      setLightboxIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
    },
    [resetZoom],
  );

  const handlePrev = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      resetZoom();
      setLightboxIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
    },
    [resetZoom],
  );

  const handleClose = useCallback(() => {
    resetZoom();
    setLightboxIndex(null);
  }, [resetZoom]);

  // Cập nhật slide hiện tại và nạp thêm ảnh vào bộ nhớ đệm (không bao giờ unmount)
  const updateActiveSlide = useCallback((swiper) => {
    const current = swiper.realIndex;
    setActiveIndex(current);
    const total = gallery.length;
    if (!total) return;
    setLoadedIndices((prev) => {
      let changed = false;
      const next = new Set(prev);
      for (let offset = -3; offset <= 4; offset++) {
        const idx = (current + offset + total) % total;
        if (!next.has(idx)) {
          next.add(idx);
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, []);

  // Cử chỉ chạm 2 ngón (Pinch) chuẩn Photos: mượt, co giãn tự nhiên, không lệch góc
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

      // Xử lý nhấp đúp
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

  // Điều hướng bàn phím và khóa triệt để mọi cuộn trang khi đang xem ảnh phóng to
  useEffect(() => {
    if (lightboxIndex === null) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const prevPaddingRight = document.body.style.paddingRight;
    const prevOverflow = document.body.style.overflow;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";

    // Khóa hoàn toàn mọi hành vi cuộn trang ngoài (cuộn chuột, vuốt touch) khi modal mở
    const preventScroll = (e) => {
      e.preventDefault();
    };
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, handleClose, handleNext, handlePrev]);

  // Hỗ trợ cuộn chuột (Mouse Wheel) để phóng to / thu nhỏ mượt mà, cố định tâm trong khung
  useEffect(() => {
    const el = imageContainerRef.current;
    if (!el || lightboxIndex === null) return;

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

        // Nếu người dùng đã kéo rê ảnh khi zoom và giờ thu nhỏ lại thì co biên dần về khung
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
    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, [lightboxIndex, bounds.w, bounds.h, x, y]);

  const slides =
    gallery.length > 0 && gallery.length < 6
      ? [...gallery, ...gallery]
      : gallery;

  const maxDragX = Math.max(0, ((scale - 1) * bounds.w) / 2);
  const maxDragY = Math.max(0, ((scale - 1) * bounds.h) / 2);

  const openLightbox = (id) => {
    const idx = gallery.findIndex((item) => item.id === id);
    resetZoom();
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
          Hành trình hoạt động
        </h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-amber-100/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] px-4 mb-4 sm:mb-6">
          Những khoảnh khắc sinh hoạt và kỷ niệm của các thành viên. Nhấp vào
          ảnh để xem và phóng to.
        </p>
      </motion.div>

      <div className="w-full py-2 sm:py-3 px-4 overflow-hidden select-none">
        <div className="max-w-5xl mx-auto min-h-[220px] sm:min-h-[280px] md:min-h-[360px]">
          {isClient ? (
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={updateActiveSlide}
              onRealIndexChange={updateActiveSlide}
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
                  coverflowEffect: {
                    stretch: 40,
                    depth: 100,
                    scale: 0.85,
                    rotate: 0,
                  },
                },
                768: {
                  coverflowEffect: {
                    stretch: 70,
                    depth: 140,
                    scale: 0.88,
                    rotate: 0,
                  },
                },
                1024: {
                  coverflowEffect: {
                    stretch: 90,
                    depth: 160,
                    scale: 0.88,
                    rotate: 0,
                  },
                },
              }}
              className="w-full py-3 !overflow-visible"
            >
              {slides.map((item, index) => {
                const total = slides.length;
                const forwardDiff = (index - activeIndex + total) % total;
                // Vùng đệm 8 ảnh đón đầu (active, 4 tới, 3 lùi)
                const isCurrentBuffer =
                  forwardDiff <= 4 || forwardDiff >= total - 3;
                // Render nếu nằm trong vùng đệm hiện tại HOẶC đã từng được nạp trước đó
                const shouldRender = isCurrentBuffer || loadedIndices.has(index);

                return (
                  <SwiperSlide
                    key={`${item.id || index}-${index}`}
                    className="group !w-[270px] sm:!w-[420px] md:!w-[560px] aspect-[16/9] cursor-pointer"
                  >
                    <div
                      onClick={() => openLightbox(item.id)}
                      className="relative w-full h-full rounded-2xl overflow-hidden transition-[opacity,filter] duration-500 ease-out transform-gpu opacity-0 pointer-events-none scale-90 group-[.swiper-slide-active]:opacity-100 group-[.swiper-slide-active]:pointer-events-auto group-[.swiper-slide-active]:scale-100 group-[.swiper-slide-active]:translate-y-0 group-[.swiper-slide-active]:brightness-100 group-[.swiper-slide-active]:shadow-[0_20px_50px_rgba(0,0,0,0.7)] group-[.swiper-slide-active]:ring-1 group-[.swiper-slide-active]:ring-white/20 group-[.swiper-slide-prev]:opacity-60 group-[.swiper-slide-prev]:pointer-events-auto group-[.swiper-slide-prev]:brightness-50 group-[.swiper-slide-prev]:translate-y-3 group-[.swiper-slide-prev]:hover:opacity-85 group-[.swiper-slide-prev]:hover:brightness-75 group-[.swiper-slide-next]:opacity-60 group-[.swiper-slide-next]:pointer-events-auto group-[.swiper-slide-next]:brightness-50 group-[.swiper-slide-next]:translate-y-3 group-[.swiper-slide-next]:hover:opacity-85 group-[.swiper-slide-next]:hover:brightness-75"
                    >
                      {shouldRender ? (
                        <>
                          <Image
                            src={item.src}
                            alt={item.alt || `Hoạt động ${item.id}`}
                            fill
                            sizes="(max-width: 640px) 270px, (max-width: 768px) 420px, 560px"
                            className="object-cover select-none"
                            draggable={false}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-[.swiper-slide-active]:opacity-0 opacity-100 pointer-events-none" />

                          {/* Biểu tượng gợi ý phóng to ảnh khi hover ở slide trung tâm */}
                          <div className="absolute bottom-3 right-3 p-2 rounded-full bg-black/75 sm:bg-black/60 backdrop-blur-none sm:backdrop-blur-xs text-white opacity-0 group-[.swiper-slide-active]:group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            <ZoomIn className="w-4 h-4" />
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full bg-black/40" />
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
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
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/98 backdrop-blur-none sm:backdrop-blur-xl p-3 sm:p-6 select-none overflow-hidden touch-none"
            onClick={handleClose}
            onWheel={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onTouchMove={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Xem ảnh phóng to"
          >
            {/* Thanh công cụ góc trên phải: Nút Zoom + Nút Đóng */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleZoom();
                }}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer active:scale-95"
                aria-label={scale > 1.2 ? "Thu nhỏ (1x)" : "Phóng to (2x)"}
                title={scale > 1.2 ? "Thu nhỏ (1x)" : "Phóng to (2x)"}
              >
                {scale > 1.2 ? (
                  <ZoomOut className="w-5 h-5 text-amber-300" />
                ) : (
                  <ZoomIn className="w-5 h-5 text-white" />
                )}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer active:scale-95"
                aria-label="Đóng xem ảnh"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nút lùi */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer active:scale-90"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Khung ảnh phóng to chính: Tích hợp Cuộn chuột (Desktop) + Pinch 2 ngón (Mobile) + Nhấp đúp */}
            <div
              ref={imageContainerRef}
              className="relative max-w-5xl w-full h-[65vh] sm:h-[75vh] max-h-[800px] flex items-center justify-center overflow-hidden touch-none select-none"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <motion.div
                key={lightboxIndex}
                style={{
                  x,
                  y,
                  transformOrigin: "center center",
                }}
                animate={{ scale }}
                transition={
                  isPinching
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 320, damping: 28 }
                }
                drag={scale > 1.05 && !isPinching}
                dragConstraints={{
                  left: -maxDragX,
                  right: maxDragX,
                  top: -maxDragY,
                  bottom: maxDragY,
                }}
                dragElastic={0.08}
                onDoubleClick={toggleZoom}
                className={`relative w-full h-full flex items-center justify-center ${
                  scale > 1.05
                    ? "cursor-grab active:cursor-grabbing"
                    : "cursor-zoom-in"
                }`}
              >
                <Image
                  src={gallery[lightboxIndex].src}
                  alt={
                    gallery[lightboxIndex].alt ||
                    `Hoạt động ${gallery[lightboxIndex].id}`
                  }
                  fill
                  priority
                  sizes="(max-width: 1024px) 95vw, 1200px"
                  className="object-contain drop-shadow-2xl select-none pointer-events-none"
                  draggable={false}
                />
              </motion.div>
            </div>

            {/* Nút tiến */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-6 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer active:scale-90"
              aria-label="Ảnh kế tiếp"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Chú thích ảnh và số trang */}
            <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 text-center text-white/90 text-xs sm:text-sm px-4 py-1.5 rounded-full bg-black/70 border border-white/10 max-w-[90vw] truncate">
              {gallery[lightboxIndex].alt && (
                <>
                  <span>{gallery[lightboxIndex].alt}</span>
                  <span className="mx-2 text-white/40">•</span>
                </>
              )}
              <span className="font-mono font-medium">
                {lightboxIndex + 1} / {gallery.length}
              </span>
              <span className="hidden sm:inline mx-2 text-white/40">•</span>
              <span className="hidden sm:inline text-white/60 text-xs">
                {scale > 1.2
                  ? "Cuộn chuột / Kéo rê • Nhấp đúp để thu nhỏ"
                  : "Cuộn chuột / 2 ngón để zoom • Nhấp đúp (2x)"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
