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
        title: "PIP",
        subtitle: "Pre Incident Plan | طرح‌ریزی پیش از رویداد",
        image: "/images/hero/hero-fire-behavior.jpg",
        href: "/courses?category=organization",
    },

    {
        id: 2,
        title: "فرماندهی عملیات اطفاء حریق",
        subtitle: "Pre Start-Up Safety Review | بازبینی ایمنی پیش از راه‌اندازی",
        image: "/images/hero/s2.jpg",
        href: "/courses?category=organization",
    },

    {
        id: 3,
        title: "مدیریت ریسک‌های بهداشت، ایمنی و محیط زیست",
        subtitle: "Risk Management",
        image: "images/hero/hero-urban-firefighting.jpg ",
        href: "/courses?category=organization",
    },

    {
        id: 4,
        title: "آموزش عملی اطفاء حریق در میدان",
        subtitle: "بررسی میدانی، ارزیابی مخاطرات و تاکتیک‌های عملیات اطفاء حریق",
        image: "/images/hero/hero-fire-motorcycle.jpg",
        href: "/images/hero/hero-fire-motorcycle.jpg",
    },

    {
        id: 5,
        title: "جستجو و عملیات نجات",
        subtitle: "مقدماتی و پیشرفته",
        image: "/images/hero/s1.jpg",
        href: "/courses?category=organization",
    },

];

const categories = [
    {
        id: "organization",
        title: "دوره‌های اختصاصی",
        href: "/courses?category=organization",
        accent: "orange",
    },
    {
        id: "international",
        title: "دوره‌های بین‌المللی",
        href: "/courses?category=international",
        accent: "cyan",
    },
    {
        id: "technical",
        title: "دوره‌های فنی و حرفه‌ای",
        href: "/courses?category=technical",
        accent: "blue",
    },
] as const;

export default function Hero() {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const [typedSlogan, setTypedSlogan] = useState("");
    const [typingDone, setTypingDone] = useState(false);
    const touchStartX = useRef<number | null>(null);

    const slogans = [
        "قدرت واقعی با آموزش ظاهر می‌شود",
        "ایمنی از آموزش شروع می‌شود",
        "متخصص امروز، ایمنی فردا را می‌سازد",
        "آموزش درست، از حادثه پیشگیری می‌کند",
        "دانش ایمنی، سرمایه‌ای برای آینده است",
    ];
    useEffect(() => {
        const timer = window.setInterval(() => {
            setActive((prev) => (prev + 1) % heroSlides.length);
        }, 5000);

        return () => window.clearInterval(timer);
    }, []);

    useEffect(() => {
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reduceMotion) {
            setTypedSlogan(slogans[0]);
            setTypingDone(true);
            return;
        }

        let typingTimer: number | undefined;
        let pauseTimer: number | undefined;
        let sloganIndex = 0;

        const typeSlogan = () => {
            const currentSlogan = slogans[sloganIndex];

            let charIndex = 0;

            setTypedSlogan("");
            setTypingDone(false);

            typingTimer = window.setInterval(() => {
                charIndex += 1;

                setTypedSlogan(
                    currentSlogan.slice(0, charIndex)
                );

                if (charIndex >= currentSlogan.length) {
                    if (typingTimer) {
                        window.clearInterval(typingTimer);
                    }

                    setTypingDone(true);

                    pauseTimer = window.setTimeout(() => {
                        sloganIndex =
                            (sloganIndex + 1) % slogans.length;

                        typeSlogan();
                    }, 3500);
                }
            }, 65);
        };

        typeSlogan();

        return () => {
            if (typingTimer) {
                window.clearInterval(typingTimer);
            }

            if (pauseTimer) {
                window.clearTimeout(pauseTimer);
            }
        };
    }, []);
    const current = heroSlides[active];

    const nextSlide = () =>
        setActive((prev) => (prev + 1) % heroSlides.length);

    const prevSlide = () =>
        setActive((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));

    function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
        touchStartX.current = event.touches[0]?.clientX ?? null;
    }

    function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
        if (touchStartX.current === null) return;
        const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
        const diff = endX - touchStartX.current;

        if (Math.abs(diff) > 45) {
            diff > 0 ? prevSlide() : nextSlide();
        }

        touchStartX.current = null;
    }

    const Slogan = () => (
        <div className="relative">
            <p className="text-right text-[23px] font-black leading-[1.8] tracking-[-0.03em] text-white min-[390px]:text-[26px] sm:text-[32px] lg:text-[34px] xl:text-[38px]">
                <span className="bg-gradient-to-l from-white via-orange-100 to-orange-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(251,146,60,0.26)]">
                    {typedSlogan}
                </span>
                <span
                    aria-hidden="true"
                    className={`mr-1 inline-block h-[1em] w-[2px] translate-y-[0.14em] rounded-full bg-orange-300 ${typingDone ? "animate-pulse opacity-35" : "animate-pulse opacity-100"
                        }`}
                />
            </p>
            <div className="mt-2 h-[3px] w-[96px] rounded-full bg-gradient-to-l from-orange-400 via-orange-300 to-transparent sm:w-[120px]" />
        </div>
    );

    const Slider = () => (
        <div
            className="relative overflow-hidden rounded-[24px] border border-cyan-300/20 bg-[#0B2239] shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:rounded-[30px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="relative h-[300px] min-[390px]:h-[330px] sm:h-[420px] lg:h-[520px] xl:h-[560px]">
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

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#04121F]/92 via-[#06192E]/10 to-transparent" />

                <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="اسلاید قبلی"
                    className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#0B2239]/75 text-lg text-white backdrop-blur-md"
                >
                    →
                </button>

                <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="اسلاید بعدی"
                    className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#0B2239]/75 text-lg text-white backdrop-blur-md"
                >
                    ←
                </button>

                <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-6">
                    {current.subtitle && (
                        <p className="mb-1.5 text-right text-[9px] font-bold leading-5 text-orange-200 sm:text-[10px]">
                            {current.subtitle}
                        </p>
                    )}

                    <h2 className="max-w-[90%] text-right text-[22px] font-black leading-[1.55] text-white min-[390px]:text-[25px] sm:text-[31px] lg:text-[34px]">
                        {current.title}
                    </h2>

                    <div className="mt-4 flex items-center justify-between gap-3">
                        <Link
                            href={current.href}
                            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 text-[10px] font-black text-white backdrop-blur-md sm:text-[11px]"
                        >
                            مشاهده دوره‌ها
                        </Link>

                        <div className="flex items-center gap-1.5">
                            {heroSlides.map((slide, index) => (
                                <button
                                    key={slide.id}
                                    type="button"
                                    onClick={() => setActive(index)}
                                    aria-label={`نمایش اسلاید ${index + 1}`}
                                    className={`h-2 rounded-full transition-all duration-300 ${index === active ? "w-7 bg-orange-400" : "w-2 bg-white/35"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <section dir="rtl" className="relative overflow-hidden bg-[#06192E] px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
            <div className="pointer-events-none absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-cyan-400/[0.06] blur-[145px]" />
            <div className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-orange-400/[0.08] blur-[145px]" />

            <div className="relative mx-auto max-w-[1820px] overflow-hidden rounded-[28px] border border-cyan-300/15 bg-[linear-gradient(135deg,#092D51_0%,#082944_42%,#0A2137_100%)] shadow-[0_28px_90px_rgba(0,0,0,0.25)] sm:rounded-[34px] lg:rounded-[44px]">

                {/* MOBILE + TABLET: exact requested order */}
                <div className="lg:hidden p-4 sm:p-6">
                    {/* 1. BOTH IMPORTANT MESSAGES FIRST */}
                    <div className="text-right">
                        <h1 className="text-[31px] font-black leading-[1.45] tracking-[-0.04em] text-white min-[390px]:text-[35px] sm:text-[44px]">
                            آکادمی تخصصی
                            <span className="mt-1 block bg-gradient-to-l from-[#FFB458] via-[#FF982D] to-[#FF7D14] bg-clip-text text-transparent">
                                آتش‌نشانی و HSE
                            </span>
                        </h1>

                        <div className="mt-5">
                            <Slogan />
                        </div>
                    </div>

                    {/* 2. COURSE TYPES */}
                    <div className="mt-6 grid grid-cols-1 gap-3 min-[520px]:grid-cols-3">
                        {categories.map((item) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={`flex min-h-[68px] items-center justify-between rounded-[20px] border px-4 py-3 text-right ${item.accent === "cyan"
                                    ? "border-cyan-400/45 bg-cyan-400/[0.05]"
                                    : item.accent === "orange"
                                        ? "border-orange-400/45 bg-orange-400/[0.05]"
                                        : "border-blue-400/45 bg-blue-400/[0.05]"
                                    }`}
                            >
                                <span className="text-[13px] font-black text-white sm:text-[14px]">
                                    {item.title}
                                </span>
                                <span
                                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-black ${item.accent === "cyan"
                                        ? "bg-cyan-400 text-[#062039]"
                                        : item.accent === "orange"
                                            ? "bg-orange-400 text-[#062039]"
                                            : "bg-blue-500 text-white"
                                        }`}
                                >
                                    ←
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* 3. IMAGES LAST */}
                    <div className="mt-6">
                        <Slider />
                    </div>
                </div>

                {/* DESKTOP */}
                <div className="hidden grid-cols-[1.02fr_.98fr] gap-8 p-10 lg:grid xl:p-14">
                    <div className="flex flex-col justify-center text-right">
                        <h1 className="text-[58px] font-black leading-[1.25] tracking-[-0.04em] text-white xl:text-[68px]">
                            آکادمی تخصصی
                            <span className="mt-1 block bg-gradient-to-l from-[#FFB458] via-[#FF982D] to-[#FF7D14] bg-clip-text text-transparent">
                                آتش‌نشانی و HSE
                            </span>
                        </h1>

                        <div className="mt-7">
                            <Slogan />
                        </div>

                        <div className="mt-8 grid grid-cols-3 gap-4">
                            {categories.map((item) => (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className={`flex min-h-[120px] flex-col items-center justify-center rounded-[24px] border px-4 text-center transition hover:-translate-y-1 ${item.accent === "cyan"
                                        ? "border-cyan-400/45 bg-cyan-400/[0.05]"
                                        : item.accent === "orange"
                                            ? "border-orange-400/45 bg-orange-400/[0.05]"
                                            : "border-blue-400/45 bg-blue-400/[0.05]"
                                        }`}
                                >
                                    <span className="text-[15px] font-black text-white xl:text-base">
                                        {item.title}
                                    </span>
                                    <span className="mt-4 text-xl text-white">←</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Slider />
                </div>
            </div>
        </section>
    );
}
