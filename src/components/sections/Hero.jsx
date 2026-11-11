"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-white pt-20 pb-6 sm:pt-24 sm:pb-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center text-center px-2 sm:px-4 w-full"
      >
        <div className="flex flex-col items-center w-full max-w-full">
          {/* Eyebrow → Title (2 dòng mobile, 1 dòng sm+) → Description */}
          <h1 className="mb-2.5 sm:mb-4 flex flex-col items-center justify-center text-center leading-tight w-full">
            <span className="text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-amber-200/80 mb-1.5 sm:mb-2">
              Chào Mừng Đến Với
            </span>
            <span className="font-extrabold text-amber-300 tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] leading-snug sm:whitespace-nowrap text-center">
              <span className="block sm:inline whitespace-nowrap text-[1.35rem] sm:text-3xl md:text-4xl lg:text-[2.75rem]">
                CLB Thanh Thiếu Niên Phật tử
              </span>
              <span className="hidden sm:inline text-3xl md:text-4xl lg:text-[2.75rem]">
                {" "}
                —{" "}
              </span>
              <span className="block sm:inline whitespace-nowrap text-[1.35rem] sm:text-3xl md:text-4xl lg:text-[2.75rem]">
                Chùa Châu Hoằng Liên Xã
              </span>
            </span>
          </h1>

          {/* Description: luôn nhỏ hơn title */}
          <p className="text-[0.75rem] sm:text-sm md:text-base max-w-xs sm:max-w-xl text-center mb-5 sm:mb-8 text-gray-200/85 font-normal leading-relaxed px-4">
            Không gian kết nối với các bạn trẻ, cùng học hỏi, sinh hoạt và góp
            phần phụng sự trong các hoạt động tại chùa.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        className="w-full max-w-6xl mx-auto px-3 sm:px-6"
      >
        <div className="w-full h-[260px] sm:h-[420px] md:h-[580px] lg:h-[720px] overflow-hidden relative rounded-2xl sm:rounded-3xl shadow-xl shadow-black/50">
          <Image
            src="https://res.cloudinary.com/hztii11y/image/upload/f_auto,q_auto/v1794412352/hero.jpg"
            alt="Ảnh tập thể thành viên CLB TTN Phật Tử Chùa Châu Hoằng Liên Xã"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 90vw, 1200px"
            className="w-full h-full object-cover"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
              maskImage:
                "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
            }}
          />
        </div>

        {/* Khẩu hiệu / Slogan CLB */}
        <p className="text-center text-xs sm:text-sm md:text-base font-semibold tracking-wide text-amber-200/90 mt-4 sm:mt-5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
          Tuổi Trẻ Hướng Phật — Kết Nối Yêu Thương — Tiếp Nối Hành Trình
        </p>
      </motion.div>
    </section>
  );
}
