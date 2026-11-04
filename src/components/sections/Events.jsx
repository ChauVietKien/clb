"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { events } from "@/data/events";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Events() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-transparent text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-gray-100">
            Những sự kiện hằng năm
          </h2>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300 px-4 mb-6 sm:mb-8 md:mb-10 font-medium">
            Tổng hợp các hoạt động, đại lễ và chương trình sinh hoạt định kỳ của câu lạc bộ.
          </p>
        </motion.div>

        {/* Bố cục đa màn hình: 1 cột (mobile) -> 2 cột (tablet/sm) -> 3 cột (desktop/lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          {events.map((item) => (
            <Card
              key={item.id}
              className="relative w-full h-full flex flex-col p-0 py-0 gap-0 overflow-hidden group bg-[#fff8f4]/92 dark:bg-[#151924]/92 backdrop-blur-md border border-[#edd7cb] dark:border-gray-800/80 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md hover:border-amber-300/80 dark:hover:border-amber-500/50 hover:-translate-y-0.5 transition-all duration-300 max-w-md mx-auto sm:max-w-none"
            >
              {/* Ảnh bìa chuẩn tỷ lệ 16:9, tối ưu hiển thị responsive */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-900">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Khối thông tin: tự co giãn đều hàng (flex-1), chữ co theo kích thước thiết bị */}
              <CardHeader className="p-3.5 sm:p-4 md:p-4.5 gap-1.5 sm:gap-2 flex-1 flex flex-col justify-start">
                <div className="flex items-start justify-between gap-2 sm:gap-2.5 w-full">
                  <CardTitle className="text-[15px] sm:text-base lg:text-[17px] font-bold text-gray-900 dark:text-gray-100 leading-snug">
                    {item.title}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="shrink-0 text-[11px] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 bg-amber-100 text-amber-900 border border-amber-300/80 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800 shadow-xs whitespace-nowrap"
                  >
                    {item.time}
                  </Badge>
                </div>

                <CardDescription className="w-full text-xs sm:text-[13px] md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed pt-0.5">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
