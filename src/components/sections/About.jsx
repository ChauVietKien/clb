"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800 text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <h2 className="text-3xl font-bold mb-4">Giới Thiệu Tổng Quan</h2>
          <div className="space-y-3 max-w-2xl mx-auto px-4">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Câu lạc bộ TTN là một tổ chức hoạt động trong khuôn viên chùa Châu Hoằng
              Liên Xã.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Là lực lượng chính, có vai trò to lớn cho các hoạt động và sự kiện quan
              trọng liên quan đến Phật Giáo hằng năm.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Quy mô mang tính tập thể, mọi người đều có thể tham gia và sinh hoạt
              cùng với clb.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
