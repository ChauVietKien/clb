import InfoCard from "@/components/ui/InfoCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function About() {
  return (
    <section className="py-8 sm:py-10 bg-transparent text-center overflow-hidden">
      <ScrollReveal>
        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          Giới thiệu chung
        </h2>
        <div className="space-y-2.5 max-w-2xl mx-auto px-4 text-left">
          <InfoCard label="Ngôi nhà thứ 2:">
            CLB là nơi gặp gỡ, giao lưu sinh hoạt của các bạn trẻ tại Chùa Châu Hoằng Liên Xã.
          </InfoCard>

          <InfoCard label="Chung tay phụng sự:">
            CLB cùng nhau phụ giúp các ngày lễ, sự kiện ở chùa và tham gia một số hoạt động Phật giáo tại địa phương.
          </InfoCard>

          <InfoCard label="Kết nối bạn bè - lan toả yêu thương:">
            Môi trường sinh hoạt mang tính tập thể, thân thiện, luôn chào đón tất cả những người bạn có chung niềm yêu mến Phật Pháp.
          </InfoCard>
        </div>
      </ScrollReveal>
    </section>
  );
}
