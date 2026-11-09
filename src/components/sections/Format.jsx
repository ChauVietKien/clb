"use client";

import { motion } from "framer-motion";

export default function Format() {
  return (
    <section className="py-8 sm:py-10 bg-transparent text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          Lịch sinh hoạt
        </h2>
        <div className="space-y-2.5 max-w-2xl mx-auto px-4 text-left">
          <div className="rounded-xl bg-[#fff8f4]/92 dark:bg-[#151924]/90 backdrop-blur-md border border-amber-900/15 dark:border-gray-800 border-l-4 border-l-amber-500 py-2.5 px-3.5 sm:py-3 sm:px-4 shadow-xs hover:shadow-md transition-all text-sm sm:text-base leading-snug">
            <span className="font-bold text-amber-700 dark:text-amber-400 mr-2">
              Thời gian:
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              CLB sinh hoạt định kỳ vào tối thứ Bảy hằng tuần tại chùa.
            </span>
          </div>

          <div className="rounded-xl bg-[#fff8f4]/92 dark:bg-[#151924]/90 backdrop-blur-md border border-amber-900/15 dark:border-gray-800 border-l-4 border-l-amber-500 py-2.5 px-3.5 sm:py-3 sm:px-4 shadow-xs hover:shadow-md transition-all text-sm sm:text-base leading-snug">
            <span className="font-bold text-amber-700 dark:text-amber-400 mr-2">
              Nội dung:
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              Các buổi gặp gỡ thường có tụng kinh ngắn đầu giờ, chia sẻ kỹ năng và chuẩn bị các hoạt động chung.
            </span>
          </div>

          <div className="rounded-xl bg-[#fff8f4]/92 dark:bg-[#151924]/90 backdrop-blur-md border border-amber-900/15 dark:border-gray-800 border-l-4 border-l-amber-500 py-2.5 px-3.5 sm:py-3 sm:px-4 shadow-xs hover:shadow-md transition-all text-sm sm:text-base leading-snug">
            <span className="font-bold text-amber-700 dark:text-amber-400 mr-2">
              Tham gia:
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              Bạn có thể đến tham gia trực tiếp vào tối thứ Bảy, hoặc liên hệ qua Facebook{" "}
              <a
                href="https://www.facebook.com/bang.l.tim.16?locale=vi_VN"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                Điệp Nguyễn
              </a>{" "}
              để được hỗ trợ thêm thông tin.
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
