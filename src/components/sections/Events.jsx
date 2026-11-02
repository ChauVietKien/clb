"use client";

import { motion } from "framer-motion";
import { Calendar, Flame, Sparkles } from "lucide-react";

export default function Events() {
  const events = [
    {
      id: 1,
      title: "Đại Lễ Phật Đản (Vesak)",
      date: "Tháng 4 Âm lịch",
      desc: "Trọng thể kỷ niệm ngày đản sinh của Đức Bổn Sư Thích Ca Mâu Ni với lễ rước Phật và hoa đăng rực rỡ.",
      icon: Sparkles,
      color: "from-amber-400 to-yellow-500",
    },
    {
      id: 2,
      title: "Khóa Tu Mùa Hè",
      date: "Tháng 6 - Tháng 7",
      desc: "Chương trình tu học, rèn luyện kỹ năng sống, thiền tập và giao lưu gắn kết thanh thiếu niên phật tử.",
      icon: Flame,
      color: "from-rose-400 to-amber-500",
    },
    {
      id: 3,
      title: "Đại Lễ Vu Lan Báo Hiếu",
      date: "Tháng 7 Âm lịch",
      desc: "Nghi lễ cài hoa hồng thiêng liêng, hướng về công ơn sinh thành dưỡng dục của cha mẹ tổ tiên.",
      icon: Calendar,
      color: "from-teal-400 to-emerald-500",
    },
  ];

  return (
    <section className="py-20 bg-slate-950/60 dark:bg-black/40 text-center relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
            Hoạt Động Nổi Bật
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-white">
            Những Sự Kiện Hằng Năm
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300 mt-3">
            Những sự kiện và đại lễ Phật Giáo tiêu biểu do CLB đồng hành tổ chức trong năm.
          </p>
        </motion.div>

        {/* Các thẻ sự kiện bập bồng búp sen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, idx) => {
            const Icon = event.icon;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 55 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className="flex flex-col items-center"
              >
                {/* Vòng lặp bập bồng búp sen */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{
                    duration: 3.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.45,
                  }}
                  className="w-full h-full p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/40 transition-colors shadow-xl shadow-black/30 flex flex-col items-start text-left relative group"
                >
                  <div className="flex items-center justify-between w-full mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${event.color} p-2.5 flex items-center justify-center text-slate-950 shadow-md group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-800 text-amber-300 border border-slate-700">
                      {event.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {event.desc}
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
