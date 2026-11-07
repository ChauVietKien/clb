"use client";

import { motion } from "framer-motion";

export default function Benefits() {
  return (
    <section className="py-8 sm:py-10 bg-transparent text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Ý nghĩa tham gia
        </h2>
        <div className="space-y-2.5 max-w-2xl mx-auto px-4 text-left">
          <div className="rounded-xl bg-[#fff8f4]/92 dark:bg-[#151924]/90 backdrop-blur-md border border-[#edd7cb] dark:border-gray-800 border-l-4 border-l-amber-500 py-2.5 px-3.5 sm:py-3 sm:px-4 shadow-xs hover:shadow-md transition-all text-sm sm:text-base leading-snug">
            <span className="font-bold text-amber-700 dark:text-amber-400 mr-2">
              Học điều hay:
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              Có thêm một môi trường lành mạnh để học hỏi và hiểu thêm về lời Phật dạy.
            </span>
          </div>

          <div className="rounded-xl bg-[#fff8f4]/92 dark:bg-[#151924]/90 backdrop-blur-md border border-[#edd7cb] dark:border-gray-800 border-l-4 border-l-amber-500 py-2.5 px-3.5 sm:py-3 sm:px-4 shadow-xs hover:shadow-md transition-all text-sm sm:text-base leading-snug">
            <span className="font-bold text-amber-700 dark:text-amber-400 mr-2">
              Rèn kỹ năng sống:
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              Rèn luyện kỹ năng sống, giao tiếp tự tin và học cách làm việc cùng tập thể.
            </span>
          </div>

          <div className="rounded-xl bg-[#fff8f4]/92 dark:bg-[#151924]/90 backdrop-blur-md border border-[#edd7cb] dark:border-gray-800 border-l-4 border-l-amber-500 py-2.5 px-3.5 sm:py-3 sm:px-4 shadow-xs hover:shadow-md transition-all text-sm sm:text-base leading-snug">
            <span className="font-bold text-amber-700 dark:text-amber-400 mr-2">
              Kết bạn đồng hành:
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              Gặp gỡ, kết nối với những người bạn cùng lứa trong không gian vui tươi, cởi mở.
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
