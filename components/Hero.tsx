"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
        id: "organization",
        title: "دوره‌های اختصاصی",
        short: "ویژه سازمان‌ها",
        href: "/courses?category=organization",
        accent: "orange",
    },
    {
        id: "international",
        title: "بین‌المللی",
        short: "دوره‌های بین‌المللی",
        href: "/courses?category=international",
        accent: "cyan",
    },
    {
        id: "technical",
        title: "فنی و حرفه‌ای",
        short: "دوره‌های مهارتی",
        href: "/courses?category=technical",
        accent: "orange",
    },
] as const;

export default function Hero() {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const touchStartX = useRef<number | null>(null);

    useEffect(() => {
        if (paused) return;

        const timer = window.setInterval(() => {
            setActive((prev) => (prev + 1) % heroSlides.length);
        }, 5000);

        return () => window.clearInterval(timer);
    }, [paused]);

    function nextSlide() {
        setActive((prev) => (prev + 1) % heroSlides.length);
    }

    function prevSlide() {
        setActive((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    }

    function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
        touchStartX.current = event.touches[0]?.clientX ?? null;
    }

    function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
        if (touchStartX.current === null) return;

        const endX =
            event.changedTouches[0]?.clientX ?? touchStartX.current;
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

    const current = heroSlides[active];

    return (
        <section
            dir="rtl"
            className="relative overflow-hidden px-3 pb-5 pt-2 sm:px-5 sm:pb-7 lg:px-8 lg:pb-12 lg:pt-4"
        >
            <div className="pointer-events-none absolute -right-40 top-0 h-[360px] w-[360px] rounded-full bg-orange-400/[0.07] blur-[140px] lg:h-[420px] lg:w-[420px]" />
            <div className="pointer-events-none absolute -left-40 bottom-0 h-[360px] w-[360px] rounded-full bg-cyan-300/[0.06] blur-[140px] lg:h-[420px] lg:w-[420px]" />

            <div className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[24px] border border-white/[0.08] bg-gradient-to-bl from-[#173953] via-[#102B43] to-[#0B2137] shadow-[0_22px_65px_rgba(0,0,0,0.18)] sm:rounded-[30px] lg:rounded-[40px] lg:shadow-[0_28px_90px_rgba(0,0,0,0.20)]">
                {/* MOBILE / TABLET */}
                <div className="lg:hidden">
                    <div className="px-4 pb-4 pt-4 sm:px-6 sm:pb-5 sm:pt-5">
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-1.5 text-[9px] font-black text-cyan-100 sm:text-[10px]">
                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                                آکادمی تخصصی آتش‌نشانی و HSE
                            </div>

                            <h1 className="mt-3 font-black tracking-[-0.4px] text-white">
                                <span className="block text-[24px] leading-[1.35] min-[390px]:text-[27px] sm:text-[32px]">
                                    قدرت واقعی
                                </span>
                                <span className="mt-1 block whitespace-nowrap text-[22px] leading-[1.4] text-orange-400 min-[390px]:text-[25px] sm:text-[30px]">
                                    با آموزش ظاهر می‌شود
                                </span>
                            </h1>

                            <p className="mx-auto mt-2 max-w-[430px] text-[9px] leading-5 text-slate-300 min-[390px]:text-[10px] sm:text-[11px] sm:leading-6">
                                آموزش تخصصی آتش‌نشانی و HSE برای افراد و سازمان‌ها
                            </p>
                        </div>

                        {/* 3 TYPES - ALWAYS ABOVE THE MOBILE BANNER */}
                        <div className="mt-4 grid grid-cols-[1.15fr_.85fr_1fr] gap-1.5 sm:gap-2.5">
                            {categories.map((item) => (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className="group flex min-h-[48px] items-center justify-center gap-1.5 rounded-[14px] border border-white/[0.09] bg-white/[0.045] px-1.5 py-2 text-center transition active:scale-[0.98] sm:min-h-[56px] sm:rounded-[17px] sm:px-2.5"
                                >
                                    <span
                                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${item.accent === "cyan"
                                                ? "bg-cyan-300"
                                                : "bg-orange-400"
                                            }`}
                                    />
                                    <strong className="whitespace-nowrap text-[8px] font-black leading-none text-white min-[360px]:text-[8.5px] min-[390px]:text-[9.5px] sm:text-[11px]">
                                        {item.title}
                                    </strong>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* COMPACT MOBILE BANNER */}
                    <div
                        className="relative mx-3 mb-3 h-[122px] overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#081C2F] min-[390px]:h-[138px] sm:mx-5 sm:mb-5 sm:h-[190px] sm:rounded-[22px]"
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
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
                                    className="h-full w-full object-cover"
                                    onError={(event) => {
                                        event.currentTarget.style.display = "none";
                                    }}
                                />
                            </div>
                        ))}

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06192E]/90 via-[#06192E]/20 to-transparent" />

                        <button
                            type="button"
                            onClick={prevSlide}
                            aria-label="اسلاید قبلی"
                            className="absolute right-2.5 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#06192E]/65 text-sm text-white backdrop-blur-md sm:h-9 sm:w-9"
                        >
                            →
                        </button>

                        <button
                            type="button"
                            onClick={nextSlide}
                            aria-label="اسلاید بعدی"
                            className="absolute left-2.5 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#06192E]/65 text-sm text-white backdrop-blur-md sm:h-9 sm:w-9"
                        >
                            ←
                        </button>

                        <div className="absolute inset-x-0 bottom-0 z-10 p-3 sm:p-4">
                            {current.subtitle && (
                                <span className="mb-1 block text-[8px] font-bold text-orange-200 sm:text-[9px]">
                                    {current.subtitle}
                                </span>
                            )}

                            <div className="flex items-end justify-between gap-3">
                                <h2 className="truncate text-[15px] font-black text-white sm:text-lg">
                                    {current.title}
                                </h2>

                                <Link
                                    href={current.href}
                                    className="shrink-0 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-[8px] font-black text-white backdrop-blur-md sm:text-[9px]"
                                >
                                    مشاهده
                                </Link>
                            </div>

                            <div className="mt-2 flex gap-1">
                                {heroSlides.map((slide, index) => (
                                    <button
                                        key={slide.id}
                                        type="button"
                                        onClick={() => setActive(index)}
                                        aria-label={`رفتن به اسلاید ${index + 1}`}
                                        className={`h-1 rounded-full transition-all duration-300 ${index === active
                                                ? "w-6 bg-orange-400"
                                                : "w-1.5 bg-white/35"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* DESKTOP */}
                <div className="hidden min-h-[520px] grid-cols-[0.93fr_1.07fr] items-center gap-10 p-8 lg:grid xl:min-h-[560px] xl:gap-12 xl:p-10">
                    {/* SLIDER */}
                    <div
                        className="relative h-[430px] overflow-hidden rounded-[30px] border border-white/[0.09] bg-[#081C2F] shadow-[0_24px_70px_rgba(0,0,0,0.24)] xl:h-[500px]"
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
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
                                    className="h-full w-full object-cover"
                                    onError={(event) => {
                                        event.currentTarget.style.display = "none";
                                    }}
                                />
                            </div>
                        ))}

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06192E]/90 via-[#06192E]/10 to-transparent" />

                        <button
                            type="button"
                            onClick={prevSlide}
                            aria-label="اسلاید قبلی"
                            className="absolute right-5 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#06192E]/60 text-lg text-white backdrop-blur-md transition hover:bg-[#06192E]/80"
                        >
                            →
                        </button>

                        <button
                            type="button"
                            onClick={nextSlide}
                            aria-label="اسلاید بعدی"
                            className="absolute left-5 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#06192E]/60 text-lg text-white backdrop-blur-md transition hover:bg-[#06192E]/80"
                        >
                            ←
                        </button>

                        <div className="absolute inset-x-0 bottom-0 z-10 p-7">
                            {current.subtitle && (
                                <span className="mb-2 block text-[10px] font-bold text-orange-200">
                                    {current.subtitle}
                                </span>
                            )}

                            <h2 className="text-[28px] font-black text-white xl:text-[32px]">
                                {current.title}
                            </h2>

                            <div className="mt-5 flex items-center justify-between gap-5">
                                <div className="flex gap-1.5">
                                    {heroSlides.map((slide, index) => (
                                        <button
                                            key={slide.id}
                                            type="button"
                                            onClick={() => setActive(index)}
                                            aria-label={`رفتن به اسلاید ${index + 1}`}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${index === active
                                                    ? "w-8 bg-orange-400"
                                                    : "w-2 bg-white/35"
                                                }`}
                                        />
                                    ))}
                                </div>

                                <Link
                                    href={current.href}
                                    className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-[11px] font-black text-white backdrop-blur-md transition hover:bg-white/15"
                                >
                                    مشاهده دوره‌ها ←
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* TEXT */}
                    <div className="text-right">
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-2.5 text-xs font-black text-cyan-100">
                            <span className="h-2 w-2 rounded-full bg-cyan-300" />
                            آکادمی تخصصی آتش‌نشانی و HSE
                        </div>

                        <h1 className="mt-6 text-[50px] font-black leading-[1.48] tracking-[-1.5px] text-white xl:text-[60px]">
                            قدرت واقعی
                            <br />
                            <span className="bg-gradient-to-l from-orange-300 via-orange-400 to-[#ff825d] bg-clip-text text-transparent">
                                با آموزش ظاهر می‌شود
                            </span>
                        </h1>

                        <p className="mt-5 max-w-[610px] text-sm leading-8 text-slate-300 xl:text-base xl:leading-9">
                            آموزش تخصصی آتش‌نشانی و HSE برای افراد و سازمان‌ها؛
                            از دوره‌های اختصاصی تا مسیرهای فنی و حرفه‌ای و بین‌المللی.
                        </p>

                        <div className="mt-8 grid grid-cols-3 gap-2.5">
                            {categories.map((item) => (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className="group rounded-[18px] border border-white/[0.08] bg-white/[0.035] px-4 py-4 transition hover:-translate-y-1 hover:bg-white/[0.06]"
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <span
                                            className={`h-2 w-2 shrink-0 rounded-full ${item.accent === "cyan"
                                                    ? "bg-cyan-300"
                                                    : "bg-orange-400"
                                                }`}
                                        />
                                        <span className="text-sm font-black text-white">
                                            {item.title}
                                        </span>
                                        <span className="text-sm text-slate-500 transition group-hover:-translate-x-1 group-hover:text-white">
                                            ←
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <Link
                                href="/courses?category=organization"
                                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-orange-400 px-6 text-sm font-black text-[#06192E] shadow-[0_12px_32px_rgba(251,146,60,0.18)] transition hover:-translate-y-1 hover:bg-orange-300"
                            >
                                مشاهده دوره‌های اختصاصی
                                <span>←</span>
                            </Link>

                            <Link
                                href="/about"
                                className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.04] px-6 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-white/[0.08]"
                            >
                                درباره کاردو
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
