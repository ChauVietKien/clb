"use client";

import { ZoomIn } from "lucide-react";
import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";

const emptySubscribe = () => () => {};

const INLINE_BLUR =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23520b12'/%3E%3C/svg%3E";

// Truyền thẳng URL gốc, Next.js sinh srcset tự động từ loader này
// Browser chọn đúng kích thước theo màn hình: mobile 270px→400w, tablet 420px→640w, desktop 560px→640w
const cloudinaryLoader = ({ src, width }) => {
  const q = width <= 450 ? "auto:eco" : "auto:good";
  const uploadIndex = src.indexOf("/upload/");
  if (uploadIndex === -1) return src;
  const after = src.slice(uploadIndex + 8);
  const versionMatch = after.match(/v\d+\//);
  const versionPath = versionMatch ? after.slice(versionMatch.index) : after;
  return `${src.slice(0, uploadIndex)}/upload/f_auto,q_${q},w_${width},c_limit/${versionPath}`;
};

export default function GallerySlider({ slides, onSlideClick, swiperRef }) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

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
      }}
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
      lazyPreloadPrevNext={2}
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
      {displaySlides.map((item, index) => (
        <SwiperSlide
          key={`${item.id || index}-${index}`}
          className="group !w-[270px] sm:!w-[420px] md:!w-[560px] aspect-[16/9] cursor-pointer"
        >
          <div
            onClick={() => onSlideClick(item.id)}
            className="relative w-full h-full rounded-2xl overflow-hidden transition-opacity duration-300 opacity-40 group-[.swiper-slide-active]:opacity-100 group-[.swiper-slide-active]:shadow-[0_12px_36px_rgba(0,0,0,0.5)] group-[.swiper-slide-active]:ring-1 group-[.swiper-slide-active]:ring-white/20 group-[.swiper-slide-prev]:opacity-75 group-[.swiper-slide-next]:opacity-75"
          >
            <Image
              loader={cloudinaryLoader}
              src={item.src}
              alt={item.alt || `Hoạt động ${item.id}`}
              fill
              priority={index === 0}
              placeholder="blur"
              blurDataURL={INLINE_BLUR}
              sizes="(max-width: 640px) 270px, (max-width: 768px) 420px, 560px"
              className="object-cover select-none"
              draggable={false}
              loading={index === 0 ? undefined : "lazy"}
            />
            <div className="absolute inset-0 bg-black/45 transition-opacity duration-300 group-[.swiper-slide-active]:opacity-0 opacity-100 pointer-events-none" />
            <div className="absolute bottom-3 right-3 p-2 rounded-full bg-black/75 sm:bg-black/60 backdrop-blur-none sm:backdrop-blur-xs text-white opacity-0 group-[.swiper-slide-active]:group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <ZoomIn className="w-4 h-4" />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
