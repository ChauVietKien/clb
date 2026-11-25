"use client";

import {
  buildCloudinarySrcSet,
  emptySubscribe,
  getCloudinaryUrl,
  handleCloudinaryFallback,
  isConstrainedDevice,
} from "@/lib/utils";
import { ZoomIn } from "lucide-react";
import { memo, useState, useSyncExternalStore } from "react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";

const SLIDE_SIZES = "(max-width: 640px) 270px, (max-width: 768px) 420px, 560px";

// Gỡ loading="lazy" cho cả vùng lân cận (bao gồm cả activeIndex+1 mà preload mặc định của Swiper hay bỏ sót)
function unlazyAroundActive(swiper, radius) {
  const total = swiper?.slides?.length || 0;
  if (!total) return;
  const center = swiper.activeIndex ?? 0;
  for (let offset = -radius; offset <= radius; offset++) {
    const idx = (((center + offset) % total) + total) % total;
    const img = swiper.slides[idx]?.querySelector('img[loading="lazy"]');
    if (img) img.loading = "eager";
  }
}

function GallerySlider({ slides, onSlideClick, swiperRef }) {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const isConstrained = useSyncExternalStore(emptySubscribe, isConstrainedDevice, () => false);
  const preloadRadius = isConstrained ? 2 : 3;

  // Xoay vòng ngẫu nhiên ảnh mở đầu mỗi lần vào trang, vẫn giữ trật tự sự kiện tự nhiên
  const [displaySlides] = useState(() => {
    if (!slides || slides.length <= 1) return slides;
    const startIndex = Math.floor(Math.random() * slides.length);
    return [...slides.slice(startIndex), ...slides.slice(0, startIndex)];
  });

  if (!isClient) {
    return (
      <div className="w-full py-8 flex items-center justify-center">
        <div className="w-[270px] sm:w-[420px] md:w-[560px] aspect-[16/9] rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 animate-pulse" />
      </div>
    );
  }

  return (
    <Swiper
      onSwiper={(swiper) => {
        if (swiperRef) swiperRef.current = swiper;
        unlazyAroundActive(swiper, preloadRadius);
      }}
      onSlideChange={(swiper) => unlazyAroundActive(swiper, preloadRadius)}
      onTouchStart={(swiper) => unlazyAroundActive(swiper, preloadRadius)}
      modules={[EffectCoverflow, Autoplay]}
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView="auto"
      loop
      loopAdditionalSlides={5}
      loopPreventsSliding={false}
      speed={450}
      watchSlidesProgress
      lazyPreloadPrevNext={0}
      autoplay={{
        delay: 4000,
        disableOnInteraction: true,
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
        320: { coverflowEffect: { stretch: 40, depth: 100, scale: 0.85, rotate: 0 } },
        768: { coverflowEffect: { stretch: 70, depth: 140, scale: 0.88, rotate: 0 } },
        1024: { coverflowEffect: { stretch: 90, depth: 160, scale: 0.88, rotate: 0 } },
      }}
      className="w-full py-3 !overflow-visible"
    >
      {displaySlides.map((item, index) => {
        const isInitiallyNear = index <= 3 || index >= displaySlides.length - 3;
        const src = getCloudinaryUrl(
          item.src,
          isConstrained ? { width: 420, quality: "auto:eco" } : { width: 540, quality: "auto:good" }
        );
        const srcSet = buildCloudinarySrcSet(
          item.src,
          isConstrained
            ? [[384, "auto:eco"], [480, "auto:eco"]]
            : [[384, "auto:eco"], [540, "auto:good"], [640, "auto:good"]]
        );

        return (
          <SwiperSlide
            key={`${item.id || index}-${index}`}
            className="group !w-[270px] sm:!w-[420px] md:!w-[560px] aspect-[16/9] cursor-pointer"
          >
            <div
              onClick={(e) => {
                const img = e.currentTarget.querySelector("img");
                onSlideClick(item.id, img?.currentSrc || img?.src || null);
              }}
              className="relative w-full h-full rounded-2xl overflow-hidden transition-opacity duration-300 opacity-40 group-[.swiper-slide-active]:opacity-100 group-[.swiper-slide-active]:shadow-[0_12px_36px_rgba(0,0,0,0.5)] group-[.swiper-slide-active]:ring-1 group-[.swiper-slide-active]:ring-white/20 group-[.swiper-slide-prev]:opacity-75 group-[.swiper-slide-next]:opacity-75"
            >
              <picture className="block relative w-full h-full bg-[#520b12]">
                <img
                  src={src}
                  srcSet={srcSet}
                  sizes={SLIDE_SIZES}
                  alt={item.alt || `Hoạt động ${item.id}`}
                  fetchPriority={index === 0 ? "high" : undefined}
                  loading={isInitiallyNear ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  onError={(e) => handleCloudinaryFallback(e, item.src, 480)}
                  className="w-full h-full object-cover select-none"
                />
              </picture>
              <div className="absolute inset-0 bg-black/45 transition-opacity duration-300 group-[.swiper-slide-active]:opacity-0 opacity-100 pointer-events-none" />
              <div className="absolute bottom-3 right-3 p-2 rounded-full bg-black/75 sm:bg-black/60 backdrop-blur-none sm:backdrop-blur-xs text-white opacity-0 group-[.swiper-slide-active]:group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default memo(GallerySlider);
