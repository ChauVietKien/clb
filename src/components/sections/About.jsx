"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-12 sm:py-16 bg-transparent text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Giới Thiệu Tổng Quan
        </h2>
        <div className="space-y-3 max-w-2xl mx-auto px-4">
          <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300">
            Câu lạc bộ TTN là một tổ chức hoạt động trong khuôn viên chùa Châu
            Hoằng Liên Xã.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300">
            Là lực lượng chính, có vai trò to lớn cho các hoạt động và sự kiện
            quan trọng liên quan đến Phật Giáo hằng năm.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300">
            Quy mô mang tính tập thể, mọi người đều có thể tham gia và sinh
            hoạt cùng với câu lạc bộ nhé.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
