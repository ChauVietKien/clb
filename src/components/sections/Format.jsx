import InfoCard from "@/components/ui/InfoCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Format() {
  return (
    <section className="py-8 sm:py-10 bg-transparent text-center overflow-hidden">
      <ScrollReveal>
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          Nội dung sinh hoạt
        </h2>
        <div className="space-y-2.5 max-w-2xl mx-auto px-4 text-left">
          <InfoCard label="Thời gian:">
            CLB sinh hoạt định kỳ vào tối thứ Bảy hằng tuần tại chùa.
          </InfoCard>

          <InfoCard label="Nội dung:">
            Tụng kinh, ngồi thiền, chia sẻ kỹ năng. Sinh hoạt vòng tròn.
          </InfoCard>

          <InfoCard label="Tham gia:">
            Bạn có thể đến tham gia trực tiếp vào tối thứ Bảy, hoặc liên hệ
            qua Facebook{" "}
            <a
              href="https://www.facebook.com/bang.l.tim.16?locale=vi_VN"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-amber-600 dark:text-amber-400 hover:underline"
            >
              Điệp Nguyễn
            </a>{" "}
            để được hỗ trợ thêm thông tin.
          </InfoCard>
        </div>
      </ScrollReveal>
    </section>
  );
}
