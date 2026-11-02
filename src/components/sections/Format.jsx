"use client";

import { motion } from "framer-motion";

export default function Format() {
  return (
    <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-800 text-center overflow-hidden">
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Những sự kiện hằng năm</h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 px-4">
            Stay tuned for our upcoming events! We host regular meetups, hackathons,
            and workshops.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
