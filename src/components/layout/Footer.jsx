"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="backdrop-blur-sm bg-black/20 py-2.5 sm:py-3.5 mt-6 sm:mt-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm gap-1.5 md:gap-0">
        {/* Link liên hệ câu lạc bộ */}
        <Link
          href="https://www.facebook.com/profile.php?id=61552836547449&locale=vi_VN"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] transition-colors"
        >
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
          <span>#CLB Chùa Châu Hoằng Liên Xã</span>
        </Link>

        {/* Khối bên phải: Lời cảm ơn và chữ ký thương hiệu #cvk đặt ngay dưới ở góc */}
        <div className="flex flex-col items-center md:items-end gap-0.5">
          <p className="text-amber-100/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] leading-tight">
            Xin chân thành cảm ơn ❤️
          </p>
          <span className="font-mono text-xs sm:text-sm tracking-wider text-orange-300 font-bold hover:text-orange-200 transition-colors select-none leading-tight">
            #by_cvk
          </span>
        </div>
      </div>
    </footer>
  );
}
