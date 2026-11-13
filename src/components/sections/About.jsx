"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-8 sm:py-10 bg-transparent text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          Giới thiệu chung
        </h2>
        <div className="space-y-2.5 max-w-2xl mx-auto px-4 text-left">
          <div className="rounded-xl bg-[#fff8f4]/96 dark:bg-[#151924]/96 backdrop-blur-none sm:backdrop-blur-md border border-amber-900/15 dark:border-gray-800 border-l-4 border-l-amber-500 py-2.5 px-3.5 sm:py-3 sm:px-4 shadow-xs hover:shadow-md transition-all text-sm sm:text-base leading-snug">
            <span className="font-bold text-amber-700 dark:text-amber-400 mr-2">
              Ngôi nhà thứ 2:
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              CLB là nơi gặp gỡ, giao lưu sinh hoạt của các bạn trẻ tại Chùa Châu Hoằng Liên Xã.
            </span>
          </div>

          <div className="rounded-xl bg-[#fff8f4]/96 dark:bg-[#151924]/96 backdrop-blur-none sm:backdrop-blur-md border border-amber-900/15 dark:border-gray-800 border-l-4 border-l-amber-500 py-2.5 px-3.5 sm:py-3 sm:px-4 shadow-xs hover:shadow-md transition-all text-sm sm:text-base leading-snug">
            <span className="font-bold text-amber-700 dark:text-amber-400 mr-2">
              Chung tay phụng sự:
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              CLB cùng nhau phụ giúp các ngày lễ, sự kiện ở chùa và tham gia một số hoạt động Phật giáo tại địa phương.
            </span>
          </div>

          <div className="rounded-xl bg-[#fff8f4]/96 dark:bg-[#151924]/96 backdrop-blur-none sm:backdrop-blur-md border border-amber-900/15 dark:border-gray-800 border-l-4 border-l-amber-500 py-2.5 px-3.5 sm:py-3 sm:px-4 shadow-xs hover:shadow-md transition-all text-sm sm:text-base leading-snug">
            <span className="font-bold text-amber-700 dark:text-amber-400 mr-2">
              Kết nối bạn bè - lan toả yêu thương:
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              Môi trường sinh hoạt mang tính tập thể, thân thiện, luôn chào đón tất cả những người bạn có chung niềm yêu mến Phật Pháp.
            </span>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
