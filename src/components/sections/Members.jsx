"use client";

import { members } from "@/data/members";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Members() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 text-center overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100"
      >
        Tổng quan thành viên chính
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 max-w-5xl mx-auto px-4">
        {members.map((member, idx) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: idx * 0.12,
              ease: "easeOut",
            }}
            className="flex flex-col items-center group"
          >
            <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden shadow-lg shadow-black/20 ring-2 ring-amber-400/30 group-hover:ring-amber-400 transition-all group-hover:scale-105">
              <Image
                src={member.avatar}
                alt={member.name}
                fill
                sizes="96px"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {member.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              {member.role}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
