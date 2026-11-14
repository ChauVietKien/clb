"use client";

import { advisor, members } from "@/data/members";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Members() {
  return (
    <section className="py-8 sm:py-10 bg-transparent text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          Ban Điều Hành
        </h2>
      </motion.div>

      {/* Cố Vấn Giáo Hạnh CLB - Thầy Hoà (centered on mobile & desktop) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md mx-auto px-4 mb-8 sm:mb-10 flex flex-col items-center"
      >
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-3 rounded-full overflow-hidden shadow-lg shadow-amber-950/40 ring-3 ring-amber-400/80 transition-transform duration-300 hover:scale-105">
          <Image
            src={advisor.avatar}
            alt={advisor.name}
            fill
            sizes="(max-width: 640px) 96px, 112px"
            className="object-cover object-[center_20%]"
            priority
          />
        </div>
        <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-amber-500/30 sm:bg-amber-500/20 text-amber-300 border border-amber-400/40 mb-1.5 backdrop-blur-none sm:backdrop-blur-xs">
          {advisor.role}
        </span>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
          {advisor.name}
        </h3>
        <p className="text-amber-100/90 font-medium text-xs sm:text-sm mt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
          {advisor.title}
        </p>
      </motion.div>

      {/* Divider with label */}
      <div className="flex items-center justify-center max-w-xl mx-auto px-4 mb-6 sm:mb-8">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent flex-1" />
        <span className="px-3 text-xs sm:text-sm uppercase tracking-wider text-amber-200/85 font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
          Các thành viên điều phối hoạt động CLB
        </span>
        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent flex-1" />
      </div>

      {/* Grid of members - Animate cả cụm 1 lần để tối ưu 60fps trên mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-6 max-w-6xl mx-auto px-4"
      >
        {members.map((member) => (
          <div
            key={member.id}
            className="flex flex-col items-center group p-2"
          >
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3 sm:mb-4 rounded-full overflow-hidden shadow-md shadow-black/15 ring-2 ring-amber-400/30 group-hover:ring-amber-400 transition-all duration-300 group-hover:scale-105">
              <Image
                src={member.avatar}
                alt={member.name}
                fill
                sizes="(max-width: 640px) 80px, 96px"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              {member.name}
            </h3>
            <p className="text-amber-300 font-medium text-xs sm:text-sm mt-0.5 sm:mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
              {member.role}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
