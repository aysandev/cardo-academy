"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";

type HeroSlide = {
    id: number;
    title: string;
    subtitle?: string;
    image: string;
    href: string;
};

const heroSlides: HeroSlide[] = [
    {
        id: 1,
        title: "دوره رفتارشناسی حریق",
        image: "/images/hero/hero-fire-behavior.jpg",
        href: "/courses?category=technical",
    },
    {
        id: 2,
        title: "دوره آتش‌نشانی شهری",
        image: "/images/hero/hero-urban-firefighting.jpg",
        href: "/courses?category=technical",
    },
    {
        id: 3,
        title: "آموزش نگهداری تجهیزات نجات",
        subtitle: "جمعیت هلال احمر جمهوری اسلامی ایران",
        image: "/images/hero/hero-rescue-equipment.jpg",
        href: "/courses?category=organization",
    },
    {
        id: 4,
        title: "آموزش تست و راه‌اندازی تشک‌های نجات و ست هیدرولیک",
        subtitle: "ایران‌مال",
        image: "/images/hero/hero-rescue-cushion-hydraulic.jpg",
        href: "/courses?category=organization",
    },
    {
        id: 5,
        title: "آموزش کار با موتورسیکلت آتش‌نشانی",
        subtitle: "سازمان امداد و نجات جمعیت هلال احمر",
        image: "/images/hero/hero-fire-motorcycle.jpg",
        href: "/courses?category=organization",
    },
];

const categories = [
    {
        id: "technical",
        title: "دوره‌های فنی و حرفه‌ای",
        href: "/courses?category=technical",
        icon: "⚙",
        tone: "blue",
    },
    {
        id: "international",
        title: "دوره‌های بین‌المللی",
        href: "/courses?category=international",
        icon: "◎",
        tone: "cyan",
    },
    {
        id: "organization",
        title: "دوره‌های اختصاصی",
        href: "/courses?category=organization",
        icon: "♜",
        tone: "orange",
    },
] as const;

export default function Hero() {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const [typedSlogan, setTypedSlogan] = useState("");
    const [typingDone, setTypingDone] = useState(false);
    const touchStartX = useRef<number | null>(null);

    const fullSlogan = "قدرت واقعی با آموزش ظاهر می‌شود";

    useEffect(() => {
        if (paused) return;

        const timer = window.setInterval(() => {
            setActive((prev) => (prev + 1) % heroSlides.length);
        }, 5000);

        return () => window.clearInterval(timer);
    }, [paused]);


    useEffect(() => {
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reduceMotion) {
            setTypedSlogan(fullSlogan);
            setTypingDone(true);
            return;
        }

        let typingTimer: number | undefined;
        let startTimer: number | undefined;
        let replayTimer: number | undefined;

        const runTyping = () => {
            let index = 0;

            setTypedSlogan("");
            setTypingDone(false);

            startTimer = window.setTimeout(() => {
                typingTimer = window.setInterval(() => {
                    index += 1;
                    setTypedSlogan(fullSlogan.slice(0, index));

                    if (index >= fullSlogan.length) {
                        if (typingTimer) {
                            window.clearInterval(typingTimer);
                        }

                        setTypingDone(true);
                    }
                }, 65);
            }, 350);
        };

        runTyping();

        replayTimer = window.setInterval(() => {
            runTyping();
        }, 40000);

        return () => {
            if (startTimer) window.clearTimeout(startTimer);
            if (typingTimer) window.clearInterval(typingTimer);
            if (replayTimer) window.clearInterval(replayTimer);
        };
    }, []);

    const current = heroSlides[active];

    function nextSlide() {
        setActive((prev) => (prev + 1) % heroSlides.length);
    }

    function prevSlide() {
        setActive((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    }

    function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
        touchStartX.current = event.touches[0]?.clientX ?? null;
    }

    function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
        if (touchStartX.current === null) return;

        const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
        const diff = endX - touchStartX.current;

        if (Math.abs(diff) > 45) {
            if (diff > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }

        touchStartX.current = null;
    }

    return (
        <section
            dir="rtl"
            className="
        relative
        overflow-hidden
        bg-[#06192E]
        px-3
        py-4
        sm:px-5
        sm:py-6
        lg:px-8
        lg:py-8
      "
        >
            {/* ambient glows */}
            <div className="pointer-events-none absolute -right-44 -top-32 h-[460px] w-[460px] rounded-full bg-blue-500/10 blur-[150px]" />
            <div className="pointer-events-none absolute -bottom-36 -left-40 h-[420px] w-[420px] rounded-full bg-orange-400/10 blur-[150px]" />

            <div
                className="
          relative
          mx-auto
          max-w-[1820px]
          overflow-hidden
          rounded-[28px]
          border
          border-cyan-300/15
          bg-[linear-gradient(135deg,#092D51_0%,#082944_42%,#0A2137_100%)]
          shadow-[0_28px_90px_rgba(0,0,0,0.25)]
          sm:rounded-[34px]
          lg:rounded-[44px]
        "
            >
                {/* decorative arcs */}
                <div className="pointer-events-none absolute -right-16 -top-24 h-[260px] w-[260px] rounded-full border border-cyan-400/25" />
                <div className="pointer-events-none absolute -right-7 -top-14 h-[200px] w-[200px] rounded-full border border-blue-500/20" />
                <div className="pointer-events-none absolute -bottom-14 -left-14 h-[220px] w-[220px] rounded-full border border-orange-400/20" />

                <div
                    className="
            grid
            gap-6
            p-4
            sm:p-6
            lg:grid-cols-[1.02fr_.98fr]
            lg:gap-8
            lg:p-10
            xl:p-14
          "
                >
                    {/* TEXT */}
                    <div
                        className="
              order-1
              flex
              min-w-0
              flex-col
              justify-center
              text-right
              lg:pl-2
            "
                    >
                        <div className="relative">
                            {/* dotted accent */}
                            <div className="mb-4 grid w-fit grid-cols-5 gap-2 opacity-40 lg:mb-7">
                                {Array.from({ length: 15 }).map((_, index) => (
                                    <span
                                        key={index}
                                        className="h-1.5 w-1.5 rounded-full bg-cyan-400"
                                    />
                                ))}
                            </div>

                            <h1
                                className="
                  text-[34px]
                  font-black
                  leading-[1.35]
                  tracking-[-0.04em]
                  text-white
                  min-[420px]:text-[40px]
                  sm:text-[50px]
                  lg:text-[58px]
                  xl:text-[66px]
                "
                            >
                                آکادمی تخصصی
                                <span
                                    className="
                    mt-1
                    block
                    bg-gradient-to-l
                    from-[#FFB458]
                    via-[#FF982D]
                    to-[#FF7D14]
                    bg-clip-text
                    text-transparent
                  "
                                >
                                    آتش‌نشانی و HSE
                                </span>
                            </h1>

                            <div
                                className="
                  relative
                  mt-6
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-orange-300/25
                  bg-[linear-gradient(135deg,rgba(255,255,255,0.055),rgba(251,146,60,0.045),rgba(34,211,238,0.025))]
                  px-4
                  py-4
                  shadow-[inset_0_0_32px_rgba(255,184,92,0.05),0_14px_40px_rgba(0,0,0,0.10)]
                  backdrop-blur-xl
                  sm:px-6
                  sm:py-5
                  lg:mt-8
                  lg:rounded-[28px]
                  lg:px-7
                  lg:py-6
                "
                            >
                                <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-orange-200/90 to-transparent" />
                                <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />

                                <p
                                    className="
                    text-[20px]
                    font-black
                    leading-[1.9]
                    tracking-[-0.025em]
                    text-white
                    drop-shadow-[0_0_18px_rgba(255,205,128,.18)]
                    min-[420px]:text-[24px]
                    sm:text-[30px]
                    lg:text-[32px]
                    xl:text-[35px]
                  "
                                >
                                    <span>{typedSlogan}</span>
                                    <span
                                        aria-hidden="true"
                                        className={`mr-1 inline-block h-[1.05em] w-[2px] translate-y-[0.14em] rounded-full bg-orange-300 align-baseline ${typingDone ? "animate-pulse opacity-35" : "animate-pulse opacity-100"
                                            }`}
                                    />
                                </p>
                            </div>
                        </div>

                        {/* DESKTOP buttons */}
                        <div className="mt-7 hidden grid-cols-3 gap-3 lg:grid xl:gap-4">
                            {categories.map((item) => {
                                const tone =
                                    item.tone === "cyan"
                                        ? "border-cyan-400/55 bg-cyan-400/[0.045] hover:bg-cyan-400/[0.09]"
                                        : item.tone === "orange"
                                            ? "border-orange-400/55 bg-orange-400/[0.045] hover:bg-orange-400/[0.09]"
                                            : "border-blue-400/55 bg-blue-400/[0.045] hover:bg-blue-400/[0.09]";

                                const iconTone =
                                    item.tone === "cyan"
                                        ? "text-cyan-300"
                                        : item.tone === "orange"
                                            ? "text-orange-400"
                                            : "text-blue-400";

                                return (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        className={`
                      group
                      flex
                      min-h-[150px]
                      flex-col
                      items-center
                      justify-center
                      rounded-[26px]
                      border
                      px-4
                      py-5
                      text-center
                      transition
                      duration-300
                      hover:-translate-y-1
                      ${tone}
                    `}
                                    >
                                        <span className={`text-4xl font-black ${iconTone}`}>
                                            {item.icon}
                                        </span>

                                        <strong className="mt-4 text-[15px] font-black leading-7 text-white xl:text-base">
                                            {item.title}
                                        </strong>

                                        <span
                                            className={`
                        mt-4
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        text-sm
                        font-black
                        ${item.tone === "cyan"
                                                    ? "bg-cyan-400 text-[#062039]"
                                                    : item.tone === "orange"
                                                        ? "bg-orange-400 text-[#062039]"
                                                        : "bg-blue-500 text-white"
                                                }
                      `}
                                        >
                                            ←
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* SLIDER */}
                    <div
                        className="
              order-3
              relative
              min-w-0
              overflow-hidden
              rounded-[28px]
              border
              border-cyan-300/20
              bg-[#0B2239]
              shadow-[0_24px_70px_rgba(0,0,0,0.30)]
              sm:rounded-[32px]
              lg:min-h-[520px]
            "
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div className="relative h-[330px] sm:h-[430px] lg:h-full lg:min-h-[520px] xl:min-h-[560px]">
                            {heroSlides.map((slide, index) => (
                                <div
                                    key={slide.id}
                                    className={`absolute inset-0 transition-all duration-700 ${index === active
                                            ? "scale-100 opacity-100"
                                            : "pointer-events-none scale-[1.025] opacity-0"
                                        }`}
                                >
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                            ))}

                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#04121F]/90 via-[#06192E]/10 to-transparent" />

                            <button
                                type="button"
                                onClick={prevSlide}
                                aria-label="اسلاید قبلی"
                                className="
                  absolute
                  right-3
                  top-1/2
                  z-20
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-[#0B2239]/75
                  text-lg
                  text-white
                  backdrop-blur-md
                  transition
                  hover:bg-[#153A5A]
                  sm:right-4
                  sm:h-12
                  sm:w-12
                "
                            >
                                →
                            </button>

                            <button
                                type="button"
                                onClick={nextSlide}
                                aria-label="اسلاید بعدی"
                                className="
                  absolute
                  left-3
                  top-1/2
                  z-20
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-[#0B2239]/75
                  text-lg
                  text-white
                  backdrop-blur-md
                  transition
                  hover:bg-[#153A5A]
                  sm:left-4
                  sm:h-12
                  sm:w-12
                "
                            >
                                ←
                            </button>

                            <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-6 lg:p-7">
                                {current.subtitle && (
                                    <p className="mb-2 text-[9px] font-bold leading-5 text-orange-200 sm:text-[10px]">
                                        {current.subtitle}
                                    </p>
                                )}

                                <h2
                                    className="
                    max-w-[92%]
                    text-[22px]
                    font-black
                    leading-[1.5]
                    text-white
                    min-[420px]:text-[26px]
                    sm:text-[30px]
                    lg:text-[34px]
                  "
                                >
                                    {current.title}
                                </h2>

                                <div className="mt-5 flex items-center justify-between gap-4">
                                    <Link
                                        href={current.href}
                                        className="
                      inline-flex
                      min-h-[44px]
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/15
                      bg-white/10
                      px-5
                      text-[10px]
                      font-black
                      text-white
                      backdrop-blur-md
                      transition
                      hover:bg-white/15
                      sm:min-h-[48px]
                      sm:text-[11px]
                    "
                                    >
                                        مشاهده دوره‌ها ←
                                    </Link>

                                    <div className="flex items-center gap-2">
                                        {heroSlides.map((slide, index) => (
                                            <button
                                                key={slide.id}
                                                type="button"
                                                onClick={() => setActive(index)}
                                                aria-label={`نمایش اسلاید ${index + 1}`}
                                                className={`h-2 rounded-full transition-all duration-300 ${active === index
                                                        ? "w-8 bg-orange-400"
                                                        : "w-2 bg-white/35"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MOBILE buttons */}
                    <div className="order-2 grid grid-cols-1 gap-3 min-[520px]:grid-cols-3 lg:hidden">
                        {categories.map((item) => {
                            const tone =
                                item.tone === "cyan"
                                    ? "border-cyan-400/55 bg-cyan-400/[0.045]"
                                    : item.tone === "orange"
                                        ? "border-orange-400/55 bg-orange-400/[0.045]"
                                        : "border-blue-400/55 bg-blue-400/[0.045]";

                            const iconTone =
                                item.tone === "cyan"
                                    ? "text-cyan-300"
                                    : item.tone === "orange"
                                        ? "text-orange-400"
                                        : "text-blue-400";

                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className={`
                    flex
                    min-h-[72px]
                    items-center
                    justify-between
                    rounded-[20px]
                    border
                    px-4
                    py-3
                    ${tone}
                  `}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`text-2xl ${iconTone}`}>{item.icon}</span>
                                        <strong className="text-[13px] font-black leading-6 text-white">
                                            {item.title}
                                        </strong>
                                    </div>

                                    <span
                                        className={`
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      text-sm
                      font-black
                      ${item.tone === "cyan"
                                                ? "bg-cyan-400 text-[#062039]"
                                                : item.tone === "orange"
                                                    ? "bg-orange-400 text-[#062039]"
                                                    : "bg-blue-500 text-white"
                                            }
                    `}
                                    >
                                        ←
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
