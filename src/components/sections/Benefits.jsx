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
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          Ý nghĩa tham gia
        </h2>
        <div className="space-y-2.5 max-w-2xl mx-auto px-4 text-left">
          <div className="rounded-xl bg-[#fff8f4]/96 dark:bg-[#151924]/96 backdrop-blur-none sm:backdrop-blur-md border border-amber-900/15 dark:border-gray-800 border-l-4 border-l-amber-500 py-2.5 px-3.5 sm:py-3 sm:px-4 shadow-xs hover:shadow-md transition-all text-sm sm:text-base leading-snug">
            <span className="font-bold text-amber-700 dark:text-amber-400 mr-2">
              Nuôi dưỡng tâm hồn - Hướng đến điều thiện:
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              Được học hỏi giáo lý Phật Pháp, rèn luyện đạo đức, nuôi dưỡng lòng từ bi và biết sống yêu thương.
            </span>
          </div>

          <div className="rounded-xl bg-[#fff8f4]/96 dark:bg-[#151924]/96 backdrop-blur-none sm:backdrop-blur-md border border-amber-900/15 dark:border-gray-800 border-l-4 border-l-amber-500 py-2.5 px-3.5 sm:py-3 sm:px-4 shadow-xs hover:shadow-md transition-all text-sm sm:text-base leading-snug">
            <span className="font-bold text-amber-700 dark:text-amber-400 mr-2">
              Trưởng thành trong môi trường lành mạnh:
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              Có thêm môi trường sinh hoạt tích cực, giúp các bạn hoàn thiện bản thân và hình thành những thói quen tốt.
            </span>
          </div>

          <div className="rounded-xl bg-[#fff8f4]/96 dark:bg-[#151924]/96 backdrop-blur-none sm:backdrop-blur-md border border-amber-900/15 dark:border-gray-800 border-l-4 border-l-amber-500 py-2.5 px-3.5 sm:py-3 sm:px-4 shadow-xs hover:shadow-md transition-all text-sm sm:text-base leading-snug">
            <span className="font-bold text-amber-700 dark:text-amber-400 mr-2">
              Kết nối và phát triển kỹ năng:
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              Gặp gỡ, làm quen với những người bạn cùng lý tưởng, rèn luyện kỹ năng giao tiếp, làm việc nhóm, tinh thần trách nhiệm và sự tự tin.
            </span>
          </div>

          <div className="rounded-xl bg-[#fff8f4]/96 dark:bg-[#151924]/96 backdrop-blur-none sm:backdrop-blur-md border border-amber-900/15 dark:border-gray-800 border-l-4 border-l-amber-500 py-2.5 px-3.5 sm:py-3 sm:px-4 shadow-xs hover:shadow-md transition-all text-sm sm:text-base leading-snug">
            <span className="font-bold text-amber-700 dark:text-amber-400 mr-2">
              Lan toả yêu thương - Sống có ích:
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              Tham gia các hoạt động thiện nguyện, phụng sự Tam Bảo.
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
