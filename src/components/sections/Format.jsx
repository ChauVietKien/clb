"use client";

import { motion } from "framer-motion";
import { Compass, Gift, HeartHandshake } from "lucide-react";

export default function Format() {
  const methods = [
    {
      id: 1,
      title: "Tu Học & Tĩnh Tâm",
      desc: "Sinh hoạt định kỳ, tụng kinh, tọa thiền và lắng nghe các bài pháp thoại nuôi dưỡng tâm an lạc.",
      icon: Compass,
      color: "from-amber-400 to-orange-500",
    },
    {
      id: 2,
      title: "Công Quả & Phụng Sự",
      desc: "Tham gia hỗ trợ các Phật sự của chùa, trang trí đàn tràng, phục vụ đại lễ với tâm hoan hỷ.",
      icon: HeartHandshake,
      color: "from-emerald-400 to-teal-500",
    },
    {
      id: 3,
      title: "Thiện Nguyện Vì Đời",
      desc: "Tổ chức các chuyến đi phát quà, giúp đỡ những mảnh đời khó khăn, lan tỏa tình thương đến cộng đồng.",
      icon: Gift,
      color: "from-rose-400 to-pink-500",
    },
  ];

  return (
    <section className="py-20 bg-slate-900/60 dark:bg-gray-900/70 text-center relative overflow-hidden backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
            Phương Thức Hoạt Động
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-white">
            Hình Thức Sinh Hoạt
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300 mt-3">
            Cách thức câu lạc bộ tổ chức các hoạt động tu học và sinh hoạt cộng đồng.
          </p>
        </motion.div>

        {/* 3 Thẻ búp sen bập bồng */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {methods.map((method, idx) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{
                    duration: 3.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.4,
                  }}
                  className="w-full h-full p-8 rounded-3xl bg-slate-800/60 border border-slate-700/60 hover:border-amber-400/40 transition-colors shadow-xl shadow-black/20 flex flex-col items-center text-center group"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${method.color} p-3 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {method.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {method.desc}
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
