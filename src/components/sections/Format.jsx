"use client";

import { motion } from "framer-motion";

export default function Format() {
  return (
    <section className="py-12 sm:py-16 bg-transparent text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-gray-100">
            Về hoạt động của CLB
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 px-4 leading-relaxed">
            CLB sinh hoạt thường xuyên vào tối thứ 7 mỗi tuần.
            <br />
            Thường tổ chức một vài hoạt động Phật Giáo trên địa bàn. <br />
            Luôn luôn chào đón thành viên mới cùng tham gia.
            <br />
            Nếu có ý muốn hãy liên hệ{" "}
            <a
              href="https://www.facebook.com/bang.l.tim.16?locale=vi_VN"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400 hover:underline"
            >
              <svg
                className="w-4 h-4 fill-current inline-block"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Điệp Nguyễn</span>
            </a>{" "}
            hoặc tham gia vào các buổi sinh hoạt, sự kiện của câu lạc bộ theo
            định kỳ.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
