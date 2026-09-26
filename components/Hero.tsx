"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type SlideItem = {
    id: number;
    title: string;
    description: string;
    tag: string;
    href: string;
    image: string;
};

const slides: SlideItem[] = [
    {
        id: 1,
        title: "دوره‌های فنی و حرفه‌ای",
        description:
            "دوره‌های مهارتی و کاربردی برای توسعه توانمندی‌های حرفه‌ای و ورود مؤثرتر به بازار کار.",
        tag: "دوره‌های فنی و حرفه‌ای",
        href: "/courses?category=technical",
        image: "/images/01.png",
    },
    {
        id: 2,
        title: "آموزش اختصاصی سازمان‌ها",
        description:
            "طراحی و اجرای دوره‌های آموزشی اختصاصی متناسب با نیاز شرکت‌ها، سازمان‌ها و مجموعه‌ها.",
        tag: "آموزش اختصاصی سازمان‌ها",
        href: "/courses?category=organization",
        image: "/images/02.png",
    },
    {
        id: 3,
        title: "دوره‌های بین‌المللی",
        description:
            "مسیرهای آموزشی ویژه برای توسعه مهارت‌های کاربردی در سطح بین‌المللی و فرصت‌های شغلی جدید.",
        tag: "دوره‌های بین‌المللی",
        href: "/courses?category=international",
        image: "/images/03.png",
    },
];

const mobileQuickLinks = [
    {
        title: "آموزش اختصاصی سازمان‌ها",
        href: "/courses?category=organization",
    },
    {
        title: "دوره‌های بین‌المللی",
        href: "/courses?category=international",
    },
    {
        title: "دوره‌های فنی و حرفه‌ای",
        href: "/courses?category=technical",
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

    const nextSlide = () => {
        setActive((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setActive((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section
            dir="rtl"
            className="
        relative
        px-4
        pt-24
        pb-12
        sm:px-6
        lg:px-10
        lg:pt-28
        lg:pb-20
      "
        >
            <div
                className="
          relative
          mx-auto
          max-w-7xl
          overflow-hidden
          rounded-[34px]
          border
          border-white/10
          bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]
          px-4
          py-5
          shadow-[0_25px_80px_rgba(0,0,0,0.25)]
          backdrop-blur-2xl
          sm:px-6
          sm:py-6
          lg:rounded-[42px]
          lg:px-8
          lg:py-8
        "
            >
                <div
                    className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.10),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(251,146,60,0.10),transparent_30%)]
          "
                />

                {/* =========================
                    MOBILE HERO
                ========================= */}
                <div className="relative lg:hidden">
                    <div className="text-center">
                        <span
                            className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-cyan-400/25
                bg-cyan-400/10
                px-4
                py-2
                text-[11px]
                font-black
                text-cyan-200
              "
                        >
                            <span className="h-2 w-2 rounded-full bg-cyan-300" />
                            تحت نظر سازمان آموزش فنی و حرفه‌ای
                        </span>

                        <h1
                            className="
                mt-6
                text-4xl
                font-black
                leading-[1.5]
                text-white
              "
                        >
                            آموزش
                            <br />
                            <span className="text-orange-400">برای رشد واقعی</span>
                        </h1>

                        <p
                            className="
                mt-4
                text-sm
                leading-8
                text-slate-300
              "
                        >
                            مسیر مناسب خودت را انتخاب کن و وارد صفحه اختصاصی دوره‌ها شو.
                        </p>
                    </div>

                    {/* quick links mobile */}
                    <div className="mt-6 grid grid-cols-1 gap-3">
                        {mobileQuickLinks.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="
                  flex
                  items-center
                  justify-between
                  rounded-[22px]
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-4
                  py-4
                  text-sm
                  font-black
                  text-white
                  transition
                  hover:-translate-y-0.5
                  hover:border-orange-300/40
                  hover:bg-white/[0.06]
                "
                            >
                                <span>{item.title}</span>
                                <span
                                    className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-orange-400
                    text-lg
                    text-[#06192E]
                  "
                                >
                                    ←
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* mobile image slider */}
                    <div className="mt-6">
                        <div
                            className="
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-white/10
                bg-[#071a2b]
              "
                        >
                            <div className="relative h-[280px]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={slides[active].id}
                                        initial={{ opacity: 0, scale: 1.03 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ duration: 0.55 }}
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src={slides[active].image}
                                            alt={slides[active].title}
                                            fill
                                            priority
                                            sizes="100vw"
                                            className="object-cover"
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                <div className="absolute inset-0 bg-gradient-to-t from-[#06192E] via-[#06192E]/20 to-transparent" />

                                <button
                                    type="button"
                                    onClick={prevSlide}
                                    className="
                    absolute
                    right-3
                    top-3
                    z-20
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    bg-[#06192E]/70
                    text-white
                    backdrop-blur-md
                  "
                                >
                                    →
                                </button>

                                <button
                                    type="button"
                                    onClick={nextSlide}
                                    className="
                    absolute
                    left-3
                    top-3
                    z-20
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    bg-[#06192E]/70
                    text-white
                    backdrop-blur-md
                  "
                                >
                                    ←
                                </button>

                                <div className="absolute right-0 bottom-0 left-0 p-5">
                                    <span
                                        className="
                      inline-flex
                      rounded-full
                      border
                      border-orange-300/20
                      bg-orange-400/10
                      px-3
                      py-1.5
                      text-[10px]
                      font-black
                      text-orange-200
                    "
                                    >
                                        {slides[active].tag}
                                    </span>

                                    <h2
                                        className="
                      mt-3
                      text-2xl
                      font-black
                      leading-[1.6]
                      text-white
                    "
                                    >
                                        {slides[active].title}
                                    </h2>

                                    <p
                                        className="
                      mt-2
                      text-xs
                      leading-7
                      text-slate-300
                    "
                                    >
                                        {slides[active].description}
                                    </p>

                                    <Link
                                        href={slides[active].href}
                                        className="
                      mt-4
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-white/10
                      px-4
                      py-3
                      text-xs
                      font-black
                      text-white
                      transition
                      hover:bg-white/15
                    "
                                    >
                                        مشاهده دوره‌ها
                                        <span>←</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* mobile dots */}
                        <div className="mt-4 flex items-center justify-center gap-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setActive(index)}
                                    className={`h-2.5 rounded-full transition-all ${index === active
                                        ? "w-7 bg-orange-400"
                                        : "w-2.5 bg-white/25"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* =========================
                    DESKTOP HERO
                ========================= */}
                <div
                    className="
            relative
            hidden
            items-center
            gap-8
            lg:grid
            lg:grid-cols-[1.05fr_0.95fr]
          "
                >
                    {/* text */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="order-2 xl:pr-8"
                    >
                        <span
                            className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-cyan-400/25
                bg-cyan-400/10
                px-5
                py-3
                text-sm
                font-black
                text-cyan-200
              "
                        >
                            <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                            تحت نظر سازمان آموزش فنی و حرفه‌ای
                        </span>

                        <h1
                            className="
                mt-8
                text-6xl
                font-black
                leading-[1.45]
                text-white
              "
                        >
                            آموزش حرفه‌ای
                            <br />
                            <span className="text-orange-400">برای رشد واقعی</span>
                        </h1>

                        <p
                            className="
                mt-7
                max-w-[720px]
                text-xl
                leading-[2.1]
                text-slate-300
              "
                        >
                            مجتمع آموزشی کاردو، ارائه‌دهنده
                            <span className="font-black text-white">
                                {" "}
                                دوره‌های فنی و حرفه‌ای، دوره‌های اختصاصی سازمان‌ها
                            </span>
                            {" "}و
                            <span className="font-black text-white">
                                {" "}دوره‌های بین‌المللی
                            </span>
                            ، با مسیرهای آموزشی متنوع و کاربردی.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link
                                href="/courses?category=organization"
                                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  bg-[#314863]
                  px-8
                  py-5
                  text-base
                  font-black
                  text-white
                  transition
                  hover:bg-[#3b5675]
                "
                            >
                                درخواست دوره اختصاصی
                            </Link>

                            <Link
                                href="/courses?category=technical"
                                className="
                  inline-flex
                  items-center
                  gap-3
                  justify-center
                  rounded-full
                  bg-orange-400
                  px-8
                  py-5
                  text-base
                  font-black
                  text-[#06192E]
                  shadow-[0_18px_40px_rgba(251,146,60,0.20)]
                  transition
                  hover:translate-y-[-2px]
                  hover:bg-orange-300
                "
                            >
                                مشاهده دوره‌ها
                                <span>←</span>
                            </Link>
                        </div>

                        <div className="mt-10 grid grid-cols-3 gap-4">
                            {[
                                {
                                    title: "دوره‌های بین‌المللی",
                                    href: "/courses?category=international",
                                },
                                {
                                    title: "آموزش اختصاصی سازمان‌ها",
                                    href: "/courses?category=organization",
                                },
                                {
                                    title: "دوره‌های فنی و حرفه‌ای",
                                    href: "/courses?category=technical",
                                },
                            ].map((item, index) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className={`
                    rounded-[24px]
                    border
                    px-5
                    py-6
                    text-center
                    text-base
                    font-black
                    transition
                    ${index === 2
                                            ? "border-orange-400/50 bg-orange-400/10 text-white"
                                            : "border-white/10 bg-white/[0.035] text-slate-200 hover:bg-white/[0.05]"
                                        }
                  `}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    {/* slider */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="order-1"
                    >
                        <div
                            className="
                relative
                overflow-hidden
                rounded-[38px]
                border
                border-white/10
                bg-[#071a2b]
              "
                        >
                            <div className="relative h-[650px]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={slides[active].id}
                                        initial={{
                                            opacity: 0,
                                            scale: 1.03,
                                            filter: "blur(6px)",
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            filter: "blur(0px)",
                                        }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.65 }}
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src={slides[active].image}
                                            alt={slides[active].title}
                                            fill
                                            priority
                                            sizes="(max-width: 1200px) 45vw, 40vw"
                                            className="object-cover"
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                <div className="absolute inset-0 bg-gradient-to-t from-[#06192E] via-[#06192E]/25 to-transparent" />

                                <button
                                    type="button"
                                    onClick={prevSlide}
                                    className="
                    absolute
                    right-6
                    top-1/2
                    z-20
                    flex
                    h-14
                    w-14
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    bg-[#06192E]/70
                    text-2xl
                    text-white
                    backdrop-blur-md
                    transition
                    hover:bg-[#0c2740]
                  "
                                >
                                    →
                                </button>

                                <button
                                    type="button"
                                    onClick={nextSlide}
                                    className="
                    absolute
                    left-6
                    top-1/2
                    z-20
                    flex
                    h-14
                    w-14
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    bg-[#06192E]/70
                    text-2xl
                    text-white
                    backdrop-blur-md
                    transition
                    hover:bg-[#0c2740]
                  "
                                >
                                    ←
                                </button>

                                <div className="absolute right-0 bottom-0 left-0 p-8">
                                    <span
                                        className="
                      inline-flex
                      rounded-full
                      border
                      border-orange-300/20
                      bg-orange-400/10
                      px-4
                      py-2
                      text-xs
                      font-black
                      text-orange-200
                    "
                                    >
                                        {slides[active].tag}
                                    </span>

                                    <h2
                                        className="
                      mt-5
                      text-5xl
                      font-black
                      leading-[1.4]
                      text-white
                    "
                                    >
                                        {slides[active].title}
                                    </h2>

                                    <p
                                        className="
                      mt-4
                      max-w-[90%]
                      text-lg
                      leading-9
                      text-slate-300
                    "
                                    >
                                        {slides[active].description}
                                    </p>

                                    <Link
                                        href={slides[active].href}
                                        className="
                      mt-7
                      inline-flex
                      items-center
                      gap-3
                      rounded-full
                      bg-white/10
                      px-6
                      py-4
                      text-sm
                      font-black
                      text-white
                      transition
                      hover:bg-white/15
                    "
                                    >
                                        مشاهده {slides[active].title}
                                        <span>←</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 flex items-center justify-center gap-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setActive(index)}
                                    className={`h-2.5 rounded-full transition-all ${index === active
                                        ? "w-8 bg-orange-400"
                                        : "w-2.5 bg-white/25"
                                        }`}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}