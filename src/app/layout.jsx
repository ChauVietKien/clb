import React from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VantaBackground from "@/components/layout/VantaBackground";

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
    <html lang="vi" className="scroll-smooth">
      <head />
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
