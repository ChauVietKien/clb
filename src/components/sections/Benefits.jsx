import InfoCard from "@/components/ui/InfoCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Benefits() {
  return (
    <section className="py-8 sm:py-10 bg-transparent text-center overflow-hidden">
      <ScrollReveal>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          Ý nghĩa tham gia
        </h2>
        <div className="space-y-2.5 max-w-2xl mx-auto px-4 text-left">
          <InfoCard label="Nuôi dưỡng tâm hồn - Hướng đến điều thiện:">
            Được học hỏi giáo lý Phật Pháp, rèn luyện đạo đức, nuôi dưỡng lòng từ bi và biết sống yêu thương.
          </InfoCard>

          <InfoCard label="Trưởng thành trong môi trường lành mạnh:">
            Có thêm môi trường sinh hoạt tích cực, giúp các bạn hoàn thiện bản thân và hình thành những thói quen tốt.
          </InfoCard>

          <InfoCard label="Kết nối và phát triển kỹ năng:">
            Gặp gỡ, làm quen với những người bạn cùng lý tưởng, rèn luyện kỹ năng giao tiếp, làm việc nhóm, tinh thần trách nhiệm và sự tự tin.
          </InfoCard>

          <InfoCard label="Lan toả yêu thương - Sống có ích:">
            Tham gia các hoạt động thiện nguyện, phụng sự Tam Bảo.
          </InfoCard>
        </div>
      </ScrollReveal>
    </section>
  );
}
