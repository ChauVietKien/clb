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
          <div className="rounded-xl bg-[#fff8f4]/92 dark:bg-[#151924]/90 backdrop-blur-md border border-[#edd7cb] dark:border-gray-800 border-l-4 border-l-amber-500 py-2.5 px-3.5 sm:py-3 sm:px-4 shadow-xs hover:shadow-md transition-all text-sm sm:text-base leading-snug">
            <span className="font-bold text-amber-700 dark:text-amber-400 mr-2">
              Mái nhà chung:
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              Câu lạc bộ là nơi gặp gỡ, sinh hoạt của các bạn trẻ tại Chùa Châu Hoằng Liên Xã.
            </span>
          </div>

          <div className="rounded-xl bg-[#fff8f4]/92 dark:bg-[#151924]/90 backdrop-blur-md border border-[#edd7cb] dark:border-gray-800 border-l-4 border-l-amber-500 py-2.5 px-3.5 sm:py-3 sm:px-4 shadow-xs hover:shadow-md transition-all text-sm sm:text-base leading-snug">
            <span className="font-bold text-amber-700 dark:text-amber-400 mr-2">
              Chung tay phụ giúp:
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              CLB cùng nhau phụ giúp các ngày lễ, sự kiện của chùa và tham gia một số hoạt động thiện nguyện.
            </span>
          </div>

          <div className="rounded-xl bg-[#fff8f4]/92 dark:bg-[#151924]/90 backdrop-blur-md border border-[#edd7cb] dark:border-gray-800 border-l-4 border-l-amber-500 py-2.5 px-3.5 sm:py-3 sm:px-4 shadow-xs hover:shadow-md transition-all text-sm sm:text-base leading-snug">
            <span className="font-bold text-amber-700 dark:text-amber-400 mr-2">
              Rộng mở chào đón:
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              Môi trường sinh hoạt mang tính tập thể, thân thiện, luôn chào đón các bạn cùng đến giao lưu và làm quen.
            </span>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
