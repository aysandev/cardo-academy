import Navbar from "@/components/Navbar";
import CertificatesShowcase from "@/components/CertificatesShowcase";

const license = {
    title: "مجوز رسمی فعالیت آموزشی",
    image: "/images/licenses/tvto-license.jpg",
    description:
        "مجتمع آموزشی کاردو با دریافت مجوز رسمی از سازمان آموزش فنی و حرفه‌ای کشور، فعالیت آموزشی خود را در مسیر توسعه آموزش‌های تخصصی و مهارتی ادامه داده است.",
};

export default function LicensesPage() {
    return (
        <main
            dir="rtl"
            className="
        min-h-screen
        overflow-x-hidden
        bg-[#F5F9FC]
        text-[#06192E]
      "
        >
            <div className="relative z-50 bg-[#0B2239] text-white">
                <Navbar />
            </div>

            <section
                className="
          relative
          overflow-hidden
          px-4
          pb-10
          pt-10

          sm:px-6
          sm:pb-12
          sm:pt-12

          lg:px-8
          lg:pb-14
          lg:pt-14
        "
            >
                <div className="pointer-events-none absolute inset-0">
                    <div
                        className="
              absolute
              -right-36
              top-0
              h-[320px]
              w-[320px]
              rounded-full
              bg-cyan-300/25
              blur-[110px]
            "
                    />
                    <div
                        className="
              absolute
              -left-36
              top-20
              h-[300px]
              w-[300px]
              rounded-full
              bg-orange-200/30
              blur-[110px]
            "
                    />
                </div>

                <div className="relative mx-auto max-w-[1450px]">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1
                            className="
                text-[30px]
                font-black
                leading-[1.6]
                text-[#06192E]

                sm:text-[40px]
                lg:text-[48px]
              "
                        >
                            {license.title}
                        </h1>

                        <p
                            className="
                mx-auto
                mt-4
                max-w-3xl
                text-[12px]
                leading-8
                text-slate-500

                sm:text-sm
                sm:leading-8

                lg:text-base
              "
                        >
                            {license.description}
                        </p>
                    </div>

                    <div
                        className="
              mx-auto
              mt-8
              max-w-[1250px]
              overflow-hidden
              rounded-[30px]
              border
              border-slate-200
              bg-white
              p-3
              shadow-[0_24px_70px_rgba(15,40,60,0.08)]

              sm:mt-10
              sm:p-4

              lg:rounded-[34px]
              lg:p-5
            "
                    >
                        <div
                            className="
                relative
                min-h-[420px]
                overflow-hidden
                rounded-[22px]
                bg-[#F1F6F9]

                sm:min-h-[560px]
                lg:min-h-[720px]
              "
                        >
                            <img
                                src={license.image}
                                alt={license.title}
                                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-contain
                  object-center
                "
                            />
                        </div>
                    </div>
                </div>
            </section>

            <CertificatesShowcase />
        </main>
    );
}
