import React from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VantaBackground from "@/components/layout/VantaBackground";

export const metadata = {
  title: "Buddhist Temple Community Club",
  description: "Celebrating Buddhist festivals and activities in the temple",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
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
