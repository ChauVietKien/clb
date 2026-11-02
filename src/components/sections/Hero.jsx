"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-white pt-24 pb-12 sm:pt-28 sm:pb-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center text-center px-4"
      >
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          {/* Tiêu đề 2 dòng có nghĩa, không bao giờ rớt chữ CLB */}
          <h1 className="mb-3 sm:mb-4 flex flex-col items-center justify-center text-center leading-tight">
            <span className="text-xl sm:text-3xl md:text-5xl font-bold text-white whitespace-nowrap tracking-tight">
              Chào Mừng Đến Với
            </span>
            <span className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-amber-300 mt-1 sm:mt-2 whitespace-nowrap tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              CLB Châu Hoằng Liên Xã
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg max-w-2xl text-center mb-6 sm:mb-8 text-gray-200">
            Kết nối cộng đồng với những sự kiện, thành viên và cơ hội giá trị.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="w-full max-w-6xl mx-auto px-3 sm:px-6"
      >
        <motion.div
          animate={{ y: [-2.5, 2.5, -2.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-[260px] sm:h-[420px] md:h-[580px] lg:h-[720px] overflow-hidden relative rounded-2xl sm:rounded-3xl shadow-xl shadow-black/50"
        >
          <Image
            src="https://scontent.fdad1-1.fna.fbcdn.net/v/t39.30808-6/825353234_122244915326094551_6417768744104616782_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx1440x1080&ctp=s1440x1080&_nc_cat=109&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEJ3eTaNklh_uWg--iZJevhxMuZxkv61RnEy5nGS_rVGSN98sazc4Tcsym7kjEnf_8DPYd6CAth_FsvwuFYgnav&_nc_ohc=anNSyiMTppoQ7kNvwFIV_-4&_nc_oc=AdrbkTo_I81YTjtpZlvZexx7WT5wIJKmkF5gIxF1MaU9hqTQm1WqEGnaGKRQvMZl7aM&_nc_zt=23&_nc_ht=scontent.fdad1-1.fna&_nc_gid=SCJEE58BJrB6OO2TL1mVtQ&_nc_ss=7b2a8&oh=00_AQRKN9n5ipCykruD2-5fMtL8RW7LW8xN2NTwLv13u8h49Q&oe=6AEDFD6F"
            alt="Club Banner"
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
        </motion.div>
      </motion.div>
    </section>
  );
}
