import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Courses from "@/components/Courses";
import WhyKardo from "@/components/WhyKardo";
import Partners from "@/components/Partners";

export default function Home() {
  return (
    <main
      dir="rtl"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#0B2239]
        text-white
      "
    >
      {/* GLOBAL BACKGROUND */}

      <div
        className="
          fixed
          inset-0
          -z-20
          bg-gradient-to-b
          from-[#0B2239]
          via-[#14314A]
          to-[#1D3E59]
        "
      />

      {/* AMBIENT LIGHTS */}

      <div
        className="
          pointer-events-none
          fixed
          right-[-180px]
          top-[80px]
          -z-10
          h-[520px]
          w-[520px]
          rounded-full
          bg-cyan-300/[0.10]
          blur-[180px]
        "
      />

      <div
        className="
          pointer-events-none
          fixed
          bottom-[-100px]
          left-[-180px]
          -z-10
          h-[620px]
          w-[620px]
          rounded-full
          bg-orange-300/[0.09]
          blur-[200px]
        "
      />

      <Navbar />

      <div className="relative">
        <Hero />

        <div
          className="
            pointer-events-none
            h-20
            bg-gradient-to-b
            from-transparent
            via-[#14314A]/40
            to-[#14314A]
          "
        />

        <section
          className="
            relative
            overflow-hidden
            bg-[#14314A]
          "
        >
          <Courses />

          <WhyKardo />

          {/* ============================================
              TARGET مشتریان ما
          ============================================= */}

          <div
            id="partners"
            className="scroll-mt-[120px]"
          >
            <Partners />
          </div>
        </section>
      </div>
    </main>
  );
}