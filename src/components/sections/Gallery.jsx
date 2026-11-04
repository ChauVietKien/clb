"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gallery } from "@/data/gallery";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";

const emptySubscribe = () => () => {};

export default function Gallery() {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const slides =
    gallery.length > 0 && gallery.length < 6
      ? [...gallery, ...gallery]
      : gallery;

  return (
    <section className="py-12 sm:py-16 bg-transparent text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900 dark:text-gray-100"
        >
          Phòng trưng bày
        </motion.h2>
      </motion.div>
      <div className="w-full py-6 sm:py-10 px-4 overflow-hidden select-none">
        <div className="max-w-5xl mx-auto min-h-[220px] sm:min-h-[280px] md:min-h-[360px]">
          {isClient ? (
            <Swiper
              modules={[EffectCoverflow, Autoplay]}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              loop={true}
              speed={600}
              slideToClickedSlide={true}
              autoplay={{
                delay: 2500,
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
              className="w-full py-8 !overflow-visible"
            >
              {slides.map((item, index) => (
                <SwiperSlide
                  key={`${item.id || index}-${index}`}
                  className="group !w-[270px] sm:!w-[420px] md:!w-[560px] aspect-[16/9] cursor-pointer"
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden transition-all duration-500 ease-out transform-gpu opacity-0 pointer-events-none scale-90 group-[.swiper-slide-active]:opacity-100 group-[.swiper-slide-active]:pointer-events-auto group-[.swiper-slide-active]:scale-100 group-[.swiper-slide-active]:translate-y-0 group-[.swiper-slide-active]:brightness-100 group-[.swiper-slide-active]:shadow-[0_20px_50px_rgba(0,0,0,0.7)] group-[.swiper-slide-active]:ring-1 group-[.swiper-slide-active]:ring-white/20 group-[.swiper-slide-prev]:opacity-60 group-[.swiper-slide-prev]:pointer-events-auto group-[.swiper-slide-prev]:brightness-50 group-[.swiper-slide-prev]:translate-y-3 group-[.swiper-slide-prev]:hover:opacity-85 group-[.swiper-slide-prev]:hover:brightness-75 group-[.swiper-slide-next]:opacity-60 group-[.swiper-slide-next]:pointer-events-auto group-[.swiper-slide-next]:brightness-50 group-[.swiper-slide-next]:translate-y-3 group-[.swiper-slide-next]:hover:opacity-85 group-[.swiper-slide-next]:hover:brightness-75">
                    <Image
                      src={item.src}
                      alt={item.alt || "Gallery image"}
                      fill
                      sizes="(max-width: 640px) 270px, (max-width: 768px) 420px, 560px"
                      className="object-cover select-none"
                      draggable={false}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-[.swiper-slide-active]:opacity-0 opacity-100 pointer-events-none" />
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
    </section>
  );
}
