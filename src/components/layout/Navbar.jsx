"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/#about", label: "Tổng quan", id: "about" },
  { href: "/#gallery", label: "Hình ảnh", id: "gallery" },
  { href: "/#events", label: "Sự kiện", id: "events" },
  { href: "/#benefits", label: "Ý nghĩa", id: "benefits" },
  { href: "/#members", label: "Ban điều hành", id: "members" },
  { href: "/#format", label: "Sinh hoạt", id: "format" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      },
    );

    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <nav className="backdrop-blur-none sm:backdrop-blur-sm bg-black/25 sm:bg-black/20 border-b border-amber-400/15 shadow-sm fixed w-full z-30 top-0 left-0 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className={styles.logo}>
            <Link
              href="/"
              className={styles.logoLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 shrink-0">
                <Image
                  className={styles.logoImage}
                  src="/images/logo.jpg"
                  alt="CLB Logo"
                  fill
                  sizes="(max-width: 640px) 36px, 44px"
                  priority
                />
              </div>
              <p className={styles.logoText}>
                CLB TTN Phật Tử Chùa{" "}
                <span className="inline-block whitespace-nowrap">
                  Châu Hoằng
                </span>{" "}
                <span className="inline-block whitespace-nowrap">Liên Xã</span>
              </p>
            </Link>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map(({ href, label, id }) => (
                <Link
                  key={id}
                  href={href}
                  className={[
                    "px-3 py-2 text-sm font-medium transition-all duration-200 border-b-2",
                    activeSection === id
                      ? "text-amber-300 border-amber-400 font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
                      : "text-amber-100/90 border-transparent hover:text-white hover:border-amber-400/40",
                  ].join(" ")}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile hamburger icon */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-xl text-amber-200/90 hover:text-amber-100 bg-black/30 hover:bg-black/50 border border-amber-400/25 shadow-xs transition-all duration-200 active:scale-95 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5.5 h-5.5 text-amber-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
              ) : (
                <Menu className="w-5.5 h-5.5 text-amber-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav floating popover (chiếm nửa phải, tránh che lấp nội dung) */}
      {mobileMenuOpen && (
        <>
          {/* Lớp nền trong suốt click-outside đóng menu */}
          <div
            className="fixed inset-0 z-20 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Popover menu trôi nổi bên phải: màu ruby ấm hài hòa nền Vanta, tươi sáng và không lag trên mobile */}
          <div className="absolute right-3 sm:right-6 top-16 z-30 md:hidden w-56 sm:w-60 backdrop-blur-none sm:backdrop-blur-2xl bg-[#5e0d16]/96 dark:bg-[#38060d]/96 border border-amber-400/40 rounded-2xl p-2.5 space-y-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)] ring-1 ring-amber-300/20">
            {navLinks.map(({ href, label, id }) => (
              <Link
                key={id}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={[
                  "block px-3.5 py-2.5 rounded-xl text-sm transition-all duration-150",
                  activeSection === id
                    ? "text-amber-300 bg-amber-500/20 border border-amber-400/30 font-semibold shadow-xs"
                    : "text-amber-100/85 hover:text-white hover:bg-white/10 font-medium",
                ].join(" ")}
              >
                {label}
              </Link>
            ))}
          </div>
        </>
      )}
    </nav>
  );
}
