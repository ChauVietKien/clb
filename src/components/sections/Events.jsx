"use client";

import { motion } from "framer-motion";

export default function Events() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 text-center overflow-hidden">
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
          <h2 className="text-3xl font-bold mb-4">Những sự kiện hằng năm</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 px-4">
            Stay tuned for our upcoming events! We host regular meetups, hackathons,
            and workshops.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
