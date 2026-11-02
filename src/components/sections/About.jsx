"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, Users } from "lucide-react";

export default function About() {
  const highlights = [
    {
      icon: Sparkles,
      title: "Khuôn Viên Chùa",
      desc: "Sinh hoạt và hoạt động chính trong khuôn viên thanh tịnh của chùa Châu Hoằng Liên Xã.",
      color: "from-amber-400 to-orange-500",
    },
    {
      icon: Heart,
      title: "Lực Lượng Nòng Cốt",
      desc: "Đóng vai trò quan trọng trong các hoạt động, Phật sự và đại lễ Phật Giáo lớn hằng năm.",
      color: "from-rose-400 to-amber-500",
    },
    {
      icon: Users,
      title: "Tinh Thần Tập Thể",
      desc: "Môi trường mở rộng, chào đón tất cả thanh thiếu niên cùng tham gia tu học và phụng sự.",
      color: "from-amber-300 to-yellow-500",
    },
  ];

  return (
    <section className="py-20 bg-slate-900/50 dark:bg-gray-900/80 text-center relative overflow-hidden backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
            Giá Trị Cốt Lõi
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-white">
            Giới Thiệu Tổng Quan
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300 mt-3">
            Câu lạc bộ TTN Phật Tử Chùa Châu Hoằng Liên Xã là nơi kết nối các bạn trẻ cùng tu học, rèn luyện nhân cách và lan tỏa tinh thần từ bi.
          </p>
        </motion.div>

        {/* 3 Thẻ bập bồng búp sen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className="flex flex-col items-center"
              >
                {/* Vòng lặp bập bồng búp sen */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.5,
                  }}
                  className="w-full h-full p-8 rounded-3xl bg-slate-800/60 border border-slate-700/60 hover:border-amber-400/40 transition-colors shadow-xl shadow-black/20 flex flex-col items-center text-center"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} p-3 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 mb-6`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
