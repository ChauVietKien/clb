"use client";

import { getCloudinaryUrl } from "@/lib/utils";
import { ZoomIn } from "lucide-react";
import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";

const emptySubscribe = () => () => {};

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
      speed={450}
      watchSlidesProgress
      lazyPreloadPrevNext={4}
      slideToClickedSlide
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
            className="relative w-full h-full rounded-2xl overflow-hidden transition-opacity duration-300 ease-out transform-gpu opacity-0 pointer-events-none scale-90 group-[.swiper-slide-active]:opacity-100 group-[.swiper-slide-active]:pointer-events-auto group-[.swiper-slide-active]:scale-100 group-[.swiper-slide-active]:translate-y-0 group-[.swiper-slide-active]:shadow-[0_12px_36px_rgba(0,0,0,0.5)] group-[.swiper-slide-active]:ring-1 group-[.swiper-slide-active]:ring-white/20 group-[.swiper-slide-prev]:opacity-65 group-[.swiper-slide-prev]:pointer-events-auto group-[.swiper-slide-prev]:translate-y-3 group-[.swiper-slide-prev]:hover:opacity-85 group-[.swiper-slide-next]:opacity-65 group-[.swiper-slide-next]:pointer-events-auto group-[.swiper-slide-next]:translate-y-3 group-[.swiper-slide-next]:hover:opacity-85"
          >
            <Image
              src={getCloudinaryUrl(item.src, { width: 900, quality: "auto:good" })}
              alt={item.alt || `Hoạt động ${item.id}`}
              fill
              placeholder="blur"
              blurDataURL={getCloudinaryUrl(item.src, { width: 40, blur: 1000 })}
              sizes="(max-width: 640px) 270px, (max-width: 768px) 420px, 560px"
              className="object-cover select-none"
              draggable={false}
              loading="lazy"
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
