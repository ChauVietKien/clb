"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/#about", label: "Tổng quan", id: "about" },
  { href: "/#gallery", label: "Trưng bày", id: "gallery" },
  { href: "/#events", label: "Sự kiện", id: "events" },
  { href: "/#members", label: "Thành viên", id: "members" },
  { href: "/#format", label: "Phương thức", id: "format" },
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
    <nav className="backdrop-blur-sm bg-black/20 shadow-md fixed w-full z-30 top-0 left-0 transition-colors">
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
                      ? "text-yellow-400 border-yellow-400"
                      : "text-gray-300 border-transparent hover:text-white",
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
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
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
          {/* Popover menu trôi nổi bên phải */}
          <div className="absolute right-3 sm:right-6 top-16 z-30 md:hidden w-56 sm:w-60 backdrop-blur-xl bg-[rgba(215,85,15,0.94)] border border-orange-300/35 rounded-2xl p-2 space-y-1 shadow-2xl shadow-black/40">
            {navLinks.map(({ href, label, id }) => (
              <Link
                key={id}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={[
                  "block px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all",
                  activeSection === id
                    ? "text-yellow-200 bg-black/25 shadow-xs"
                    : "text-white/95 hover:text-white hover:bg-black/15",
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
