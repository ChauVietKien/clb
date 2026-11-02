"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-white py-16 sm:py-24 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center px-4"
      >
        {/* Floating Lotus Badge */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-sm font-medium mb-6 backdrop-blur-sm shadow-lg shadow-amber-500/10"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          CLB TTN Phật Tử Châu Hoằng Liên Xã
        </motion.div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
          Chào Mừng Đến Với CLB <br />
          <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
            Châu Hoằng Liên Xã
          </span>
        </h1>

        <p className="text-lg sm:text-xl max-w-2xl mx-auto text-gray-200/90 mb-10">
          Kết nối cộng đồng với những sự kiện, thành viên và cơ hội giá trị.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="w-full max-w-6xl mx-auto px-4"
      >
        {/* Khung ảnh bập bồng búp sen */}
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-[400px] sm:h-[550px] md:h-[650px] rounded-3xl overflow-hidden relative shadow-2xl shadow-black/60 ring-1 ring-white/10"
        >
          <Image
            src="https://scontent.fdad1-1.fna.fbcdn.net/v/t39.30808-6/825353234_122244915326094551_6417768744104616782_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx1440x1080&ctp=s1440x1080&_nc_cat=109&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEJ3eTaNklh_uWg--iZJevhxMuZxkv61RnEy5nGS_rVGSN98sazc4Tcsym7kjEnf_8DPYd6CAth_FsvwuFYgnav&_nc_ohc=anNSyiMTppoQ7kNvwFIV_-4&_nc_oc=AdrbkTo_I81YTjtpZlvZexx7WT5wIJKmkF5gIxF1MaU9hqTQm1WqEGnaGKRQvMZl7aM&_nc_zt=23&_nc_ht=scontent.fdad1-1.fna&_nc_gid=SCJEE58BJrB6OO2TL1mVtQ&_nc_ss=7b2a8&oh=00_AQRKN9n5ipCykruD2-5fMtL8RW7LW8xN2NTwLv13u8h49Q&oe=6AEDFD6F"
            alt="Club Banner"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
