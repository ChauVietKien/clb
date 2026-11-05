"use client";

import { members } from "@/data/members";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Members() {
  return (
    <section className="py-12 sm:py-16 bg-transparent text-center overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900 dark:text-gray-100"
      >
        Tổng quan thành viên chính
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-6 max-w-6xl mx-auto px-4">
        {members.map((member, idx) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.5,
              delay: idx * 0.06,
              ease: "easeOut",
            }}
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
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200">
              {member.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-0.5 sm:mt-1">
              {member.role}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
