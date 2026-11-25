import React from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Geist_Mono, Noto_Serif } from "next/font/google";
import VantaBackground from "@/components/layout/VantaBackground";

const notoSerif = Noto_Serif({
  subsets: ["vietnamese", "latin"],
  display: "swap",
  variable: "--font-noto-serif",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://chuachauhoang.website"
  ),
  title: "CLB TTN Phật Tử Chùa Châu Hoằng Liên Xã",
  description:
    "Câu lạc bộ thanh thiếu niên Phật tử Chùa Châu Hoằng Liên Xã — Nơi kết nối, sinh hoạt và tổ chức các sự kiện Phật Giáo ý nghĩa hằng năm.",
  keywords: [
    "Chùa Châu Hoằng Liên Xã",
    "CLB Phật Tử",
    "Phật Giáo",
    "Khóa tu mùa hè",
    "Vu Lan",
    "Phật Đản",
  ],
  icons: {
    icon: "/images/logo.jpg",
    shortcut: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
  openGraph: {
    title: "CLB TTN Phật Tử Chùa Châu Hoằng Liên Xã",
    description:
      "Câu lạc bộ thanh thiếu niên Phật tử Chùa Châu Hoằng Liên Xã — Kết nối cộng đồng và lan tỏa các hoạt động thiện nguyện.",
    url: "https://chuachauhoang.website",
    siteName: "CLB TTN Phật Tử Chùa Châu Hoằng Liên Xã",
    images: [
      {
        url: "https://chuachauhoang.website/images/og-image.jpg",
        secureUrl: "https://chuachauhoang.website/images/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "CLB TTN Phật Tử Chùa Châu Hoằng Liên Xã",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CLB TTN Phật Tử Chùa Châu Hoằng Liên Xã",
    description:
      "Câu lạc bộ thanh thiếu niên Phật tử Chùa Châu Hoằng Liên Xã — Nơi kết nối, sinh hoạt và tổ chức các sự kiện ý nghĩa.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${notoSerif.variable} ${geistMono.variable} scroll-smooth antialiased`}>
      <head>
        {/* Preload ảnh Hero khớp chính xác 3 breakpoint của Hero.jsx */}
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/hztii11y/image/upload/f_auto,q_auto:best,w_1080,c_limit,e_sharpen:90/v1794412352/hero.jpg"
          media="(max-width: 640px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/hztii11y/image/upload/f_auto,q_auto:best,w_1600,c_limit,e_sharpen:85/v1794412352/hero.jpg"
          media="(min-width: 641px) and (max-width: 1024px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/hztii11y/image/upload/f_auto,q_auto:best,w_2400,c_limit,e_sharpen:85/v1794412352/hero.jpg"
          media="(min-width: 1025px)"
          fetchPriority="high"
        />
      </head>
      <body className="flex flex-col min-h-screen font-sans">
        <VantaBackground>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </VantaBackground>
      </body>
    </html>
  );
}
