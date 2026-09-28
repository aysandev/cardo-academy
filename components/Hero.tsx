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

        title: "دوره تخصصی بین‌المللی آتش‌نشانی |  Fire Ground",

        subtitle: "سازمان امداد و نجات جمعیت هلال احمر",

        image: "/images/hero/hero-fire-motorcycle.jpg",

        href: "/courses?category=organization",

    },
    {

        id: 6,

        title: "دوره آشنایی با تجهیزات و روش‌های اطفای حریق",

        subtitle: "سازمان آتش نشانی ",

        image: "/images/hero/s1.jpg",

        href: "/courses?category=organization",

    },
    {

        id: 7,

        title: "دوره ایمنی حریق و کار با خاموش‌کننده‌ها",

        subtitle: "سازمان آتش نشانی ",

        image: "/images/hero/s2.jpg",

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

        title: "دوره‌های بین‌المللی",

        short: "دوره‌های بین‌المللی",

        href: "/courses?category=international",

        accent: "cyan",

    },

    {

        id: "technical",

        title: "دوره‌های فنی و حرفه‌ای",

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

            className="relative overflow-hidden px-2.5 pb-5 pt-2 min-[380px]:px-3 sm:px-5 sm:pb-7 lg:px-8 lg:pb-10 lg:pt-4"

        >

            <div className="pointer-events-none absolute -right-40 top-0 h-[360px] w-[360px] rounded-full bg-orange-400/[0.07] blur-[140px] lg:h-[420px] lg:w-[420px]" />

            <div className="pointer-events-none absolute -left-40 bottom-0 h-[360px] w-[360px] rounded-full bg-cyan-300/[0.06] blur-[140px] lg:h-[420px] lg:w-[420px]" />



            <div className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[22px] border border-white/[0.08] bg-gradient-to-bl from-[#173953] via-[#102B43] to-[#0B2137] shadow-[0_22px_65px_rgba(0,0,0,0.18)] sm:rounded-[30px] lg:rounded-[38px] lg:shadow-[0_28px_90px_rgba(0,0,0,0.20)]">

                {/* MOBILE / TABLET */}

                <div className="lg:hidden">

                    <div className="px-3 pb-3 pt-4 min-[380px]:px-4 sm:px-6 sm:pb-5 sm:pt-5">

                        <div className="text-center">

                            <div className="relative mx-auto max-w-[560px]">

                                <div className="pointer-events-none absolute inset-x-10 top-1/2 h-16 -translate-y-1/2 rounded-full bg-orange-400/[0.10] blur-[38px]" />



                                <h1 className="relative mt-0 font-black leading-[1.35] tracking-[-0.7px]">

                                    <span className="block text-[22px] text-white min-[380px]:text-[25px] sm:text-[32px]">

                                        آکادمی  تخصصی

                                    </span>



                                    <span className="mt-1 block bg-gradient-to-l from-orange-300 via-orange-400 to-cyan-300 bg-clip-text text-[28px] text-transparent drop-shadow-[0_0_18px_rgba(251,146,60,0.18)] min-[380px]:text-[32px] sm:text-[42px]">

                                        آتش‌نشانی و HSE

                                    </span>

                                </h1>





                                <div className="relative mx-auto mt-3 max-w-[430px] overflow-hidden rounded-[14px] border border-orange-300/20 bg-orange-400/[0.07] px-3 py-2.5 shadow-[0_10px_28px_rgba(251,146,60,0.08)] sm:rounded-[16px] sm:px-4 sm:py-3">
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-white/[0.04] to-transparent" />
                                    <p className="relative text-[11px] font-black leading-6 text-white min-[380px]:text-[12px] sm:text-[14px]">
                                        قدرت واقعی با آموزش ظاهر می‌شود
                                    </p>
                                </div>

                            </div>

                        </div>



                        {/* 3 TYPES - ALWAYS ABOVE THE MOBILE BANNER */}

                        <div className="mt-4 grid grid-cols-1 gap-2 min-[460px]:grid-cols-3 min-[460px]:gap-2 sm:gap-2.5">

                            {categories.map((item) => (

                                <Link

                                    key={item.id}

                                    href={item.href}

                                    className="group flex min-h-[52px] items-center justify-between gap-2 rounded-[14px] border border-white/[0.09] bg-white/[0.045] px-3 py-2.5 text-right transition active:scale-[0.98] min-[460px]:min-h-[64px] min-[460px]:flex-col min-[460px]:justify-center min-[460px]:px-2 min-[460px]:text-center sm:rounded-[18px] sm:px-3"

                                >

                                    <span

                                        className={`h-2 w-2 shrink-0 rounded-full min-[460px]:mb-1.5 min-[460px]:h-1.5 min-[460px]:w-1.5 ${item.accent === "cyan"

                                            ? "bg-cyan-300"

                                            : "bg-orange-400"

                                            }`}

                                    />

                                    <strong className="text-[10px] font-black leading-[1.6] text-white min-[380px]:text-[11px] min-[460px]:text-[9px] sm:text-[12px]">

                                        {item.title}

                                    </strong>

                                    <span className="mt-0.5 hidden text-[8px] leading-4 text-slate-500 sm:block">

                                        {item.short}

                                    </span>

                                </Link>

                            ))}

                        </div>

                    </div>



                    {/* COMPACT MOBILE BANNER */}

                    <div

                        className="relative mx-3 mb-3 aspect-[16/9] min-h-[165px] overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#081C2F] min-[380px]:min-h-[185px] sm:mx-5 sm:mb-5 sm:min-h-0 sm:rounded-[22px]"

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

                                <h2 className="line-clamp-2 min-w-0 flex-1 text-[14px] font-black leading-6 text-white min-[380px]:text-[15px] sm:text-lg sm:leading-7">

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

                <div className="hidden min-h-[500px] grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-center gap-7 p-7 lg:grid xl:min-h-[560px] xl:gap-10 xl:p-10 2xl:gap-12">

                    {/* SLIDER */}

                    <div

                        className="relative aspect-[4/3] w-full max-h-[500px] min-h-[390px] overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#081C2F] shadow-[0_24px_70px_rgba(0,0,0,0.24)] xl:min-h-[440px] xl:rounded-[30px]"

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



                            <h2 className="line-clamp-2 text-[24px] font-black leading-[1.5] text-white xl:text-[30px]">

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

                        <div className="relative max-w-[720px]">

                            <div className="pointer-events-none absolute -inset-x-8 top-1/2 h-28 -translate-y-1/2 rounded-full bg-orange-400/[0.08] blur-[55px]" />



                            <h1 className="relative mt-0 font-black leading-[1.24] tracking-[-1.6px]">

                                <span className="block text-[36px] text-white xl:text-[46px] 2xl:text-[50px]">

                                    آکادمی  تخصصی

                                </span>



                                <span className="mt-2 block bg-gradient-to-l from-orange-300 via-orange-400 to-cyan-300 bg-clip-text text-[46px] text-transparent drop-shadow-[0_0_22px_rgba(251,146,60,0.20)] xl:text-[58px] 2xl:text-[64px]">

                                    آتش‌نشانی و HSE

                                </span>

                            </h1>



                            <div className="relative mt-5 max-w-[560px] overflow-hidden rounded-[18px] border border-orange-300/20 bg-gradient-to-l from-orange-400/[0.10] via-white/[0.035] to-cyan-300/[0.06] px-5 py-4 shadow-[0_15px_40px_rgba(251,146,60,0.09)] xl:px-6">
                                <div className="pointer-events-none absolute -right-16 top-1/2 h-20 w-40 -translate-y-1/2 rounded-full bg-orange-400/10 blur-[35px]" />
                                <p className="relative text-[16px] font-black leading-8 text-white xl:text-[19px]">
                                    قدرت واقعی با آموزش ظاهر می‌شود
                                </p>
                            </div>





                        </div>



                        <div className="mt-6 grid grid-cols-3 gap-2 xl:gap-2.5">

                            {categories.map((item) => (

                                <Link

                                    key={item.id}

                                    href={item.href}

                                    className="group min-w-0 rounded-[16px] border border-white/[0.08] bg-white/[0.035] px-3 py-3 transition hover:-translate-y-1 hover:bg-white/[0.06] xl:rounded-[18px] xl:px-4 xl:py-4"

                                >

                                    <div className="flex items-center justify-between gap-2">

                                        <span

                                            className={`h-2 w-2 shrink-0 rounded-full ${item.accent === "cyan"

                                                ? "bg-cyan-300"

                                                : "bg-orange-400"

                                                }`}

                                        />

                                        <span className="min-w-0 text-center text-[11px] font-black leading-5 text-white xl:text-[13px]">

                                            {item.title}

                                        </span>

                                        <span className="text-sm text-slate-500 transition group-hover:-translate-x-1 group-hover:text-white">

                                            ←

                                        </span>

                                    </div>

                                </Link>

                            ))}

                        </div>



                    </div>

                </div>

            </div>

        </section>

    );

}
