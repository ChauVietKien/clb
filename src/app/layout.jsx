import React from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VantaBackground from "@/components/layout/VantaBackground";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://clb-chauhoanglienxa.vercel.app"
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
  openGraph: {
    title: "CLB TTN Phật Tử Chùa Châu Hoằng Liên Xã",
    description:
      "Câu lạc bộ thanh thiếu niên Phật tử Chùa Châu Hoằng Liên Xã — Kết nối cộng đồng và lan tỏa các hoạt động thiện nguyện.",
    images: ["/images/hero-banner.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CLB TTN Phật Tử Chùa Châu Hoằng Liên Xã",
    description:
      "Câu lạc bộ thanh thiếu niên Phật tử Chùa Châu Hoằng Liên Xã — Nơi kết nối, sinh hoạt và tổ chức các sự kiện ý nghĩa.",
    images: ["/images/hero-banner.jpg"],
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
