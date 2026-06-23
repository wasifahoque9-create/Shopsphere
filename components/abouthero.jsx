export default function AboutHero() {
  return (
    <section
      className="relative bg-[url('/about.webp')] bg-cover bg-center py-24 px-6 text-center"
    >
      {/* dark overlay so text stays readable over the photo */}
      <div className="absolute inset-0 bg-[#121358]/70"></div>

      <div className="relative max-w-3xl mx-auto">

        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="w-10 h-px bg-[#F59E0B]"></span>
          <p className="text-[#F59E0B] uppercase tracking-widest text-sm font-semibold">
            Welcome to GadgetFix
          </p>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Your trusted partner for <br className="hidden md:block" />
          gadget repairs
        </h1>

        <p className="text-gray-200 text-lg">
          Our dedicated team of skilled technicians is here to provide
          top-notch repair services, ensuring your devices are back in
          perfect working order as quickly as possible.
        </p>

      </div>
    </section>
  );
}