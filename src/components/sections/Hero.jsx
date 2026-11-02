"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-white py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center text-center px-4"
      >
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <div className="text-5xl font-extrabold mb-4 flex justify-center">
            <h2>Chào Mừng Đến Với CLB</h2>
            <h2>
              <br />
              Châu Hoằng Liên Xã
            </h2>
          </div>
          <p className="text-xl max-w-2xl text-center mb-8">
            Kết nối cộng đồng với những sự kiện, thành viên và cơ hội giá trị.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="w-full"
      >
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-[900px] overflow-hidden relative"
        >
          <Image
            src="https://scontent.fdad1-1.fna.fbcdn.net/v/t39.30808-6/825353234_122244915326094551_6417768744104616782_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx1440x1080&ctp=s1440x1080&_nc_cat=109&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEJ3eTaNklh_uWg--iZJevhxMuZxkv61RnEy5nGS_rVGSN98sazc4Tcsym7kjEnf_8DPYd6CAth_FsvwuFYgnav&_nc_ohc=anNSyiMTppoQ7kNvwFIV_-4&_nc_oc=AdrbkTo_I81YTjtpZlvZexx7WT5wIJKmkF5gIxF1MaU9hqTQm1WqEGnaGKRQvMZl7aM&_nc_zt=23&_nc_ht=scontent.fdad1-1.fna&_nc_gid=SCJEE58BJrB6OO2TL1mVtQ&_nc_ss=7b2a8&oh=00_AQRKN9n5ipCykruD2-5fMtL8RW7LW8xN2NTwLv13u8h49Q&oe=6AEDFD6F"
            alt="Club Logo"
            width={1500}
            height={900}
            priority
            className="w-full h-[800px] object-cover mask-b-from-0%"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 40%, black 80%, transparent)",
              maskImage:
                "linear-gradient(to bottom, transparent, black 40%, black 80%, transparent)",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
