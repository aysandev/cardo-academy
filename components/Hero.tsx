"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type HeroSlide = {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    badge?: string;
};

const slides: HeroSlide[] = [
    {
        id: 1,
        title: "آموزش نگهداری تجهیزات نجات",
        subtitle: "جمعیت هلال احمر جمهوری اسلامی ایران",
        image: "/images/hero/hero-rescue-equipment.jpg",
        badge: "دوره تخصصی",
    },
    {
        id: 2,
        title: "دوره رفتار حریق",
        subtitle: "آموزش عملی و کاربردی برای شناخت رفتار آتش",
        image: "/images/hero/hero-fire-behavior.jpg",
        badge: "آموزش عملی",
    },
    {
        id: 3,
        title: "آموزش اطفای حریق شهری",
        subtitle: "آموزش میدانی، تجهیزات و سناریوهای واقعی",
        image: "/images/hero/hero-urban-firefighting.jpg",
        badge: "سناریوی واقعی",
    },
    {
        id: 4,
        title: "آموزش موتورسیکلت آتش‌نشانی",
        subtitle: "آشنایی با تجهیزات سریع واکنش در عملیات",
        image: "/images/hero/hero-fire-motorcycle.jpg",
        badge: "عملیات سریع",
    },
    {
        id: 5,
        title: "آموزش تجهیزات هیدرولیکی نجات",
        subtitle: "کاربرد تجهیزات تخصصی در عملیات نجات",
        image: "/images/hero/hero-rescue-cushion-hydraulic.jpg",
        badge: "تجهیزات تخصصی",
    },
];

export default function Hero() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActive((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const currentSlide = slides[active];

    const goNext = () => {
        setActive((prev) => (prev + 1) % slides.length);
    };

    const goPrev = () => {
        setActive((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <section
            dir="rtl"
            className="
        relative
        overflow-hidden
        px-4
        pt-5
        pb-8

        sm:px-6
        sm:pt-6
        sm:pb-10

        lg:px-8
        lg:pt-8
        lg:pb-12
      "
        >
            {/* ambient glow */}
            <div
                className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          overflow-hidden
        "
            >
                <div
                    className="
            absolute
            right-[-120px]
            top-[40px]
            h-[320px]
            w-[320px]
            rounded-full
            bg-cyan-300/10
            blur-[120px]
          "
                />
                <div
                    className="
            absolute
            left-[-80px]
            bottom-[-40px]
            h-[260px]
            w-[260px]
            rounded-full
            bg-orange-400/10
            blur-[120px]
          "
                />
            </div>

            <div
                className="
          mx-auto
          grid
          max-w-[1800px]
          gap-5
          rounded-[28px]
          border
          border-white/8
          bg-[linear-gradient(135deg,rgba(14,44,73,0.96),rgba(7,28,48,0.96))]
          p-4
          shadow-[0_30px_100px_rgba(0,0,0,0.18)]

          sm:p-5
          lg:grid-cols-[1.08fr_0.92fr]
          lg:gap-7
          lg:rounded-[34px]
          lg:p-8
        "
            >
                {/* CONTENT */}
                <div
                    className="
            order-2
            flex
            flex-col
            justify-center
            text-right

            lg:order-1
            lg:pr-2
          "
                >
                    <div className="max-w-[720px] lg:max-w-[760px]">
                        <div
                            className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-cyan-400/20
                bg-cyan-400/8
                px-3.5
                py-2
                text-[10px]
                font-black
                tracking-[0.04em]
                text-cyan-200

                sm:text-[11px]
              "
                        >
                            <span className="h-2 w-2 rounded-full bg-orange-400" />
                            آکادمی تخصصی آموزش‌های ایمنی، آتش‌نشانی و HSE
                        </div>

                        <h1
                            className="
                mt-5
                text-right
                text-[34px]
                font-black
                leading-[1.28]
                text-white

                sm:text-[48px]
                sm:leading-[1.24]

                lg:text-[64px]
                lg:leading-[1.18]
              "
                        >
                            آکادمی تخصصی
                            <span
                                className="
                  mt-2
                  block
                  bg-gradient-to-l
                  from-[#FFB65C]
                  via-[#FFA337]
                  to-[#FF8C1A]
                  bg-clip-text
                  text-transparent
                  drop-shadow-[0_10px_30px_rgba(255,153,51,0.16)]
                "
                            >
                                آتش‌نشانی و HSE
                            </span>
                        </h1>

                        <div
                            className="
                mt-5
                inline-flex
                w-full
                items-center
                justify-center
                rounded-[22px]
                border
                border-orange-300/20
                bg-[linear-gradient(135deg,rgba(255,171,74,0.10),rgba(255,255,255,0.06))]
                px-5
                py-4
                text-center
                text-[15px]
                font-black
                leading-8
                text-white
                shadow-[0_15px_40px_rgba(0,0,0,0.10)]
                backdrop-blur-md

                sm:w-auto
                sm:min-w-[420px]
                sm:justify-start
                sm:px-6
                sm:text-[18px]

                lg:text-[20px]
              "
                        >
                            <span
                                className="
                  bg-gradient-to-l
                  from-white
                  to-orange-100
                  bg-clip-text
                  text-transparent
                "
                            >
                                قدرت واقعی با آموزش ظاهر می‌شود
                            </span>
                        </div>

                        <p
                            className="
                mt-5
                max-w-[700px]
                text-right
                text-[13px]
                leading-8
                text-slate-300

                sm:text-[15px]
                sm:leading-8

                lg:text-[17px]
                lg:leading-9
              "
                        >
                            کاردو با تکیه بر آموزش‌های تخصصی، عملی و مسئله‌محور در حوزه‌های
                            آتش‌نشانی، HSE، امداد و نجات، مسیر یادگیری حرفه‌ای را برای
                            سازمان‌ها و علاقه‌مندان فراهم می‌کند.
                        </p>

                        <div
                            className="
                mt-6
                flex
                flex-col
                gap-3

                sm:flex-row
                sm:flex-wrap
                sm:justify-start
              "
                        >
                            <Link
                                href="#courses"
                                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-l
                  from-[#FFAA3C]
                  to-[#FF8B1F]
                  px-6
                  py-3.5
                  text-sm
                  font-black
                  text-[#08233C]
                  shadow-[0_16px_35px_rgba(255,153,51,0.22)]
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-[0_20px_40px_rgba(255,153,51,0.28)]
                "
                            >
                                مشاهده دوره‌ها
                            </Link>

                            <Link
                                href="#partners"
                                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/14
                  bg-white/5
                  px-6
                  py-3.5
                  text-sm
                  font-black
                  text-white
                  backdrop-blur-sm
                  transition
                  hover:bg-white/10
                "
                            >
                                درخواست دوره سازمانی
                            </Link>
                        </div>

                        <div
                            className="
                mt-6
                grid
                grid-cols-1
                gap-3

                sm:grid-cols-3
              "
                        >
                            {[
                                "دوره‌های فنی و حرفه‌ای",
                                "دوره‌های بین‌المللی",
                                "دوره‌های اختصاصی",
                            ].map((item, index) => (
                                <div
                                    key={item}
                                    className="
                    flex
                    items-center
                    justify-between
                    rounded-[20px]
                    border
                    border-white/10
                    bg-white/4
                    px-4
                    py-4
                    backdrop-blur-sm
                    transition
                    hover:bg-white/7
                  "
                                >
                                    <span className="text-sm font-black text-white">
                                        {item}
                                    </span>

                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`h-2.5 w-2.5 rounded-full ${index === 1 ? "bg-cyan-300" : "bg-orange-400"
                                                }`}
                                        />
                                        <span className="text-lg text-slate-300">←</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* SLIDER */}
                <div className="order-1 lg:order-2">
                    <div
                        className="
              relative
              overflow-hidden
              rounded-[28px]
              border
              border-white/10
              bg-[#0C2741]
              shadow-[0_24px_60px_rgba(0,0,0,0.18)]
            "
                    >
                        <div
                            className="
                relative
                h-[340px]
                sm:h-[420px]
                lg:h-[590px]
              "
                        >
                            <Image
                                key={currentSlide.id}
                                src={currentSlide.image}
                                alt={currentSlide.title}
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 45vw"
                            />

                            <div
                                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#061624]/85
                  via-[#061624]/25
                  to-transparent
                "
                            />

                            <div
                                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  p-4

                  sm:p-6
                  lg:p-8
                "
                            >
                                {currentSlide.badge && (
                                    <div
                                        className="
                      mb-3
                      inline-flex
                      items-center
                      rounded-full
                      border
                      border-white/14
                      bg-white/10
                      px-3
                      py-1.5
                      text-[10px]
                      font-black
                      text-orange-200
                      backdrop-blur-sm
                    "
                                    >
                                        {currentSlide.badge}
                                    </div>
                                )}

                                <p
                                    className="
                    mb-2
                    text-right
                    text-[11px]
                    font-bold
                    text-orange-100/90

                    sm:text-[12px]
                  "
                                >
                                    {currentSlide.subtitle}
                                </p>

                                <h2
                                    className="
                    max-w-[90%]
                    text-right
                    text-[28px]
                    font-black
                    leading-[1.4]
                    text-white

                    sm:text-[36px]
                    lg:text-[48px]
                  "
                                >
                                    {currentSlide.title}
                                </h2>

                                <div className="mt-5 flex items-center justify-between">
                                    <button
                                        type="button"
                                        className="
                      rounded-full
                      border
                      border-white/14
                      bg-white/10
                      px-5
                      py-3
                      text-sm
                      font-black
                      text-white
                      backdrop-blur-md
                      transition
                      hover:bg-white/15
                    "
                                    >
                                        مشاهده دوره‌ها ←
                                    </button>

                                    <div className="flex items-center gap-2">
                                        {slides.map((slide, index) => (
                                            <button
                                                key={slide.id}
                                                type="button"
                                                onClick={() => setActive(index)}
                                                className={`h-2.5 rounded-full transition-all ${active === index
                                                        ? "w-8 bg-orange-400"
                                                        : "w-2.5 bg-white/45"
                                                    }`}
                                                aria-label={`go to slide ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={goPrev}
                                className="
                  absolute
                  left-4
                  top-1/2
                  z-10
                  flex
                  h-12
                  w-12
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/12
                  bg-[#102D4A]/80
                  text-xl
                  text-white
                  backdrop-blur-md
                  transition
                  hover:bg-[#153957]
                "
                                aria-label="previous slide"
                            >
                                ←
                            </button>

                            <button
                                type="button"
                                onClick={goNext}
                                className="
                  absolute
                  right-4
                  top-1/2
                  z-10
                  flex
                  h-12
                  w-12
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/12
                  bg-[#102D4A]/80
                  text-xl
                  text-white
                  backdrop-blur-md
                  transition
                  hover:bg-[#153957]
                "
                                aria-label="next slide"
                            >
                                →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}