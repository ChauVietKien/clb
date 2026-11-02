"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/#about", label: "About", id: "about" },
  { href: "/#gallery", label: "Gallery", id: "gallery" },
  { href: "/#events", label: "Events", id: "events" },
  { href: "/#members", label: "Members", id: "members" },
  { href: "/#format", label: "Method", id: "format" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // 1. Tạo 1 observer duy nhất quét một dải hẹp ở nửa trên màn hình (dưới navbar)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // Thu hẹp vùng quan sát: đỉnh lùi xuống 80px (tránh navbar h-16 = 64px), đáy co lên 60%
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      },
    );

    // 2. Observe tất cả các section
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="backdrop-blur-sm bg-black/20 shadow-md fixed w-full z-10 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className={styles.logo}>
            <Link href="/" className={styles.logoLink}>
              <Image
                className={styles.logoImage}
                src="https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-1/397984607_122102363690094551_8565278122462374757_n.jpg?stp=dst-jpg_tt6&cstp=mx960x960&ctp=s200x200&_nc_cat=108&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=2d3e12&_nc_eui2=AeExqHhYBglHT_QHS3ljdHtDc2Qiiz-sjvFzZCKLP6yO8XUhfmwVI-sN-3Be3aXMnaz10K7umW2tjpG1oMaGFIXS&_nc_ohc=Pi2ATkkFsl4Q7kNvwFnh8Tz&_nc_oc=Adqd8d8xW-NlYb6bheX72mCTUnNRocNu0V6Nri50Gv_pzZjuA1JsyhFHIwTVQyQawfs&_nc_zt=24&_nc_ht=scontent.fdad1-4.fna&_nc_gid=BDc7NYPijRCPrxW9iblxIw&_nc_ss=7b2a8&oh=00_AQTWVTArCxIzKlG6Pere6oWSdMhdN_eoD0-9p_BA-lGPug&oe=6AED491B"
                alt="CLB Logo"
                width={45}
                height={45}
              />
              <p className={styles.logoText}>
                CLB TTN Phật Tử Chùa Châu Hoằng Liên Xã
              </p>
            </Link>
          </div>

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
        </div>
      </div>
    </nav>
  );
}
