"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="backdrop-blur-sm bg-black/20 py-4 mt-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm">
        {/* Link liên hệ câu lạc bộ */}
        <Link
          href="https://www.facebook.com/profile.php?id=61552836547449&locale=vi_VN"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-gray-800 dark:text-gray-200 hover:text-amber-500 dark:hover:text-amber-400 font-semibold transition-colors"
        >
          <ArrowRight className="w-4 h-4 text-amber-500" />
          <span>#CLB Chùa Châu Hoằng Liên Xã</span>
        </Link>

        {/* Khối bên phải: Lời cảm ơn và chữ ký thương hiệu #cvk đặt ngay dưới ở góc */}
        <div className="flex flex-col items-center md:items-end mt-3 md:mt-0 gap-0.5">
          <p className="text-gray-700 dark:text-gray-300">
            Xin chân thành cảm ơn ❤️
          </p>
          <span className="font-mono text-sm tracking-wider text-orange-400/90 dark:text-orange-400 font-bold hover:text-orange-600 transition-colors select-none">
            #by_cvk
          </span>
        </div>
      </div>
    </footer>
  );
}
