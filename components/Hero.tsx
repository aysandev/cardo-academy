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

const categoryLinks = [
    {
        title: "اختصاصی سازمان‌ها",
        href: "/courses?category=organization",
    },
    {
        title: "فنی و حرفه‌ای",
        href: "/courses?category=technical",
    },
    {
        title: "بین‌المللی",
        href: "/courses?category=oman",
    },
];

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
        setActive((prev) =>
            prev === 0 ? heroSlides.length - 1 : prev - 1
        );
    }

    function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
        touchStartX.current = event.touches[0]?.clientX ?? null;
    }

    function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
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
            className="relative overflow-hidden px-3 pb-8 pt-3 sm:px-5 lg:px-8 lg:pb-12 lg:pt-4"
        >
            <div className="pointer-events-none absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-orange-400/[0.07] blur-[150px]" />
            <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-cyan-300/[0.06] blur-[150px]" />

            <div className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-bl from-[#173953] via-[#102B43] to-[#0B2137] shadow-[0_28px_90px_rgba(0,0,0,0.20)] sm:rounded-[34px] lg:rounded-[40px]">
                <div className="grid items-center gap-6 p-5 sm:p-7 lg:min-h-[545px] lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:p-9 xl:gap-12 xl:p-10">
                    {/* TEXT */}
                    <div className="order-2 text-center lg:order-1 lg:text-right">
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3.5 py-2 text-[9px] font-black text-cyan-100 sm:text-[10px] lg:px-4 lg:py-2.5 lg:text-xs">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 lg:h-2 lg:w-2" />
                            تحت نظر سازمان آموزش فنی و حرفه‌ای
                        </div>

                        <h1 className="mt-4 text-[31px] font-black leading-[1.55] tracking-[-1px] text-white sm:text-[40px] lg:mt-6 lg:text-[52px] xl:text-[60px]">
                            قدرت واقعی
                            <br />
                            <span className="bg-gradient-to-l from-orange-300 via-orange-400 to-[#ff825d] bg-clip-text text-transparent">
                                با آموزش ظاهر می‌شود
                            </span>
                        </h1>

                        <p className="mx-auto mt-3 max-w-[620px] text-[11px] leading-7 text-slate-300 sm:text-xs lg:mx-0 lg:mt-5 lg:text-sm lg:leading-8 xl:text-base">
                            مجتمع آموزشی کاردو، مسیرهای آموزشی تخصصی برای افراد،
                            سازمان‌ها و فرصت‌های بین‌المللی ارائه می‌دهد.
                        </p>

                        <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3 lg:mt-8">
                            {categoryLinks.map((item, index) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="group flex min-h-[54px] items-center justify-between rounded-[17px] border border-white/[0.08] bg-white/[0.035] px-4 text-right transition hover:-translate-y-0.5 hover:bg-white/[0.06]"
                                >
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`h-2 w-2 rounded-full ${index === 2 ? "bg-cyan-300" : "bg-orange-400"
                                                }`}
                                        />
                                        <strong className="text-[11px] font-black text-white sm:text-[12px]">
                                            {item.title}
                                        </strong>
                                    </div>

                                    <span className="text-sm text-slate-400 transition group-hover:-translate-x-1 group-hover:text-white">
                                        ←
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* SLIDER */}
                    <div className="order-1 lg:order-2">
                        <div
                            className="relative mx-auto h-[280px] w-full max-w-[620px] overflow-hidden rounded-[24px] border border-white/[0.10] bg-[#081C2F] shadow-[0_24px_65px_rgba(0,0,0,0.24)] sm:h-[350px] lg:h-[410px] lg:rounded-[30px] xl:h-[430px]"
                            onMouseEnter={() => setPaused(true)}
                            onMouseLeave={() => setPaused(false)}
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                            {heroSlides.map((slide, index) => (
                                <div
                                    key={slide.id}
                                    className={`absolute inset-0 transition-all duration-700 ${index === active
                                            ? "z-10 scale-100 opacity-100"
                                            : "z-0 scale-[1.025] opacity-0"
                                        }`}
                                >
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="h-full w-full object-cover"
                                        onError={(event) => {
                                            event.currentTarget.src = "/images/hsecourse.png";
                                        }}
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#06192E]/95 via-[#06192E]/30 to-transparent" />

                                    <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5 lg:p-6">
                                        <span className="inline-flex rounded-full border border-orange-300/15 bg-[#06192E]/70 px-3 py-1.5 text-[9px] font-black text-orange-200 backdrop-blur-md">
                                            آموزش کاردو
                                        </span>

                                        <h2 className="mt-2 max-w-[95%] text-[21px] font-black leading-8 text-white sm:text-2xl lg:text-[30px] lg:leading-[1.5]">
                                            {slide.title}
                                        </h2>

                                        {slide.subtitle && (
                                            <p className="mt-1.5 max-w-[92%] text-[10px] leading-6 text-slate-300 sm:text-xs lg:text-sm">
                                                {slide.subtitle}
                                            </p>
                                        )}

                                        <Link
                                            href={slide.href}
                                            className="mt-3 inline-flex min-h-[40px] items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.10] px-4 text-[10px] font-black text-white backdrop-blur-md transition hover:bg-white/[0.16] sm:text-xs"
                                        >
                                            مشاهده دوره‌ها
                                            <span>←</span>
                                        </Link>
                                    </div>
                                </div>
                            ))}

                            {/* Desktop arrows */}
                            <button
                                type="button"
                                onClick={prevSlide}
                                aria-label="اسلاید قبلی"
                                className="absolute right-4 top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#06192E]/60 text-white backdrop-blur-md transition hover:bg-[#06192E]/85 lg:flex"
                            >
                                →
                            </button>

                            <button
                                type="button"
                                onClick={nextSlide}
                                aria-label="اسلاید بعدی"
                                className="absolute left-4 top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#06192E]/60 text-white backdrop-blur-md transition hover:bg-[#06192E]/85 lg:flex"
                            >
                                ←
                            </button>

                            {/* Dots */}
                            <div className="absolute bottom-4 left-4 z-30 flex items-center gap-1.5 rounded-full bg-[#06192E]/55 px-2.5 py-2 backdrop-blur-md">
                                {heroSlides.map((slide, index) => (
                                    <button
                                        key={slide.id}
                                        type="button"
                                        aria-label={`نمایش اسلاید ${index + 1}`}
                                        onClick={() => setActive(index)}
                                        className={`h-1.5 rounded-full transition-all ${active === index
                                                ? "w-7 bg-orange-400"
                                                : "w-1.5 bg-white/35"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        <p className="mt-2 text-center text-[8px] text-slate-600 lg:hidden">
                            برای تغییر تصویر، به چپ یا راست بکشید
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
