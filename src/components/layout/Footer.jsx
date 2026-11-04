"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="backdrop-blur-sm bg-black/20 py-5 mt-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm">
        <Link
          href="https://www.facebook.com/profile.php?id=61552836547449&locale=vi_VN"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-gray-800 dark:text-gray-200 hover:text-amber-500 dark:hover:text-amber-400 font-semibold transition-colors"
        >
          <ArrowRight className="w-4 h-4 text-amber-500" />
          <span>#CLB Chùa Châu Hoằng Liên Xã</span>
        </Link>
        <div className="flex items-center space-x-4 mt-3 md:mt-0 text-gray-700 dark:text-gray-300">
          <p>Xin chân thành cảm ơn ❤️</p>
        </div>
      </div>
    </footer>
  );
}
