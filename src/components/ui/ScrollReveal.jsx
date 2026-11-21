"use client";

import { motion } from "framer-motion";

export default function ScrollReveal({
  children,
  className = "",
  initial = { opacity: 0, y: 25 },
  whileInView = { opacity: 1, y: 0 },
  viewport = { once: true, amount: 0.2 },
  transition = { duration: 0.6, ease: "easeOut" },
  ...props
}) {
  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
