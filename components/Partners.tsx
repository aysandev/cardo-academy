"use client";

import { motion } from "framer-motion";

const partners = [
    {
        name: "گروه صنعتی ماموت",
        logo: "/images/partners/mammut.png",
    },
    {
        name: "شرکت خطوط لوله و مخابرات نفت ایران",
        logo: "/images/partners/pipeline.png",
    },
    {
        name: "ناردیس",
        logo: "/images/partners/nardis.png",
    },
    {
        name: "شرکت ملی نفت ایران",
        logo: "/images/partners/nioc.png",
    },
    {
        name: "شرکت ملی صنایع پتروشیمی",
        logo: "/images/partners/nipc.png",
    },
    {
        name: "شرکت ملی گاز ایران",
        logo: "/images/partners/nigc.png",
    },
    {
        name: "وزارت صنعت، معدن و تجارت",
        logo: "/images/partners/samt.png",
    },
    {
        name: "جمعیت هلال احمر جمهوری اسلامی ایران",
        logo: "/images/partners/red-crescent.png",
    },
];

const loopPartners = [...partners, ...partners];

export default function Partners() {
    return (
        <section
            id="customers"
            dir="rtl"
            className="
        relative
        scroll-mt-24
        overflow-hidden
        bg-[#10263D]
        py-12
        sm:py-14
        lg:py-16
      "
        >
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-40 top-0 h-80 w-80 rounded-full bg-cyan-400/[0.06] blur-[120px]" />
                <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-orange-400/[0.06] blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-[1500px]">
                <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                    <span
                        className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-orange-400/20
              bg-orange-400/[0.08]
              px-4
              py-2
              text-[9px]
              font-black
              text-orange-300
              sm:text-[10px]
            "
                    >
                        <span className="h-2 w-2 rounded-full bg-orange-300" />
                        مشتریان و همراهان کاردو
                    </span>

                    <h2 className="mt-4 text-[26px] font-black text-white sm:text-[34px] lg:text-[40px]">
                        مشتریان ما
                    </h2>

                    <p className="mx-auto mt-2 max-w-2xl text-[10px] leading-6 text-slate-400 sm:text-xs sm:leading-7">
                        افتخار همکاری با مجموعه‌های صنعتی، سازمانی و ملی در مسیر آموزش تخصصی.
                    </p>
                </div>

                <div className="relative mt-8 overflow-hidden sm:mt-10">
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-[#10263D] to-transparent sm:w-24" />
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-[#10263D] to-transparent sm:w-24" />

                    <motion.div
                        className="flex w-max gap-3 px-3 sm:gap-4 sm:px-4"
                        animate={{ x: ["0%", "50%"] }}
                        transition={{
                            duration: 30,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    >
                        {loopPartners.map((partner, index) => (
                            <div
                                key={`${partner.name}-${index}`}
                                className="
                  flex
                  h-[105px]
                  w-[180px]
                  shrink-0
                  items-center
                  gap-3
                  rounded-[20px]
                  border
                  border-white/[0.07]
                  bg-white/[0.035]
                  px-4
                  backdrop-blur-xl
                  sm:h-[120px]
                  sm:w-[220px]
                  sm:px-5
                "
                            >
                                <div className="flex h-[66px] w-[72px] shrink-0 items-center justify-center rounded-[14px] bg-white p-2 sm:h-[78px] sm:w-[86px]">
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="max-h-full max-w-full object-contain"
                                        onError={(event) => {
                                            event.currentTarget.style.display = "none";
                                        }}
                                    />
                                </div>

                                <p className="line-clamp-3 text-right text-[9px] font-black leading-5 text-white/80 sm:text-[10px] sm:leading-6">
                                    {partner.name}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
