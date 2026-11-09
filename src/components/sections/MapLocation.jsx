export default function MapLocation() {
  return (
    <section className="py-8 sm:py-10 px-4 max-w-5xl mx-auto text-center">
      <h3 className="text-2xl sm:text-3xl font-bold text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] mb-2">
        Vị trí bản đồ
      </h3>
      <p className="text-sm sm:text-base text-amber-100/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] mb-6 max-w-xl mx-auto">
        Địa chỉ Chùa Châu Hoằng Liên Xã trên Google Maps.
      </p>
      <div className="w-full h-[320px] sm:h-[420px] rounded-2xl overflow-hidden shadow-xl border border-orange-200/50">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4637.964613070335!2d107.44966215603677!3d16.492022054201485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141a9ab8c9e66a9%3A0x56e10b296aeac49e!2zQ2jDuWEgQ2jDonUgSG_hurFuZyBMacOqbiBYw6M!5e0!3m2!1svi!2s!4v1794037530401!5m2!1svi!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bản đồ Chùa Châu Hoằng Liên Xã"
        />
      </div>
    </section>
  );
}
