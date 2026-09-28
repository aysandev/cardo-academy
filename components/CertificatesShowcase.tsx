"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Certificate = {
    id: string;
    title: string;
    badge: string;
    image: string;
};

const certificates: Certificate[] = [
    {
        id: "tvet",
        title: "گواهینامه دوره‌های فنی و حرفه‌ای",
        badge: "رسمی",
        image: "/images/certificates/tvet-certificate.jpg",
    },
    {
        id: "organization",
        title: "گواهینامه دوره‌های اختصاصی",
        badge: "اختصاصی",
        image: "/images/certificates/organization-certificate.jpg",
    },
    {
        id: "international",
        title: "گواهینامه دوره‌های بین‌الملل",
        badge: "بین‌الملل",
        image: "/images/certificates/international-certificate.jpg",
    },
];

export default function CertificatesShowcase() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [open, setOpen] = useState(false);

    const active = useMemo(
        () => certificates[activeIndex],
        [activeIndex]
    );

    useEffect(() => {
        if (paused) return;

        const timer = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % certificates.length);
        }, 3200);

        return () => window.clearInterval(timer);
    }, [paused]);

    function next() {
        setActiveIndex((current) => (current + 1) % certificates.length);
    }

    function previous() {
        setActiveIndex((current) =>
            current === 0 ? certificates.length - 1 : current - 1
        );
    }

    return (
        <>
            <section
                id="certificates"
                dir="rtl"
                className="
          bg-[#F7FBFD]
          px-4
          py-12

          sm:px-6
          sm:py-14

          lg:px-10
          lg:py-16
        "
            >
                <div className="mx-auto max-w-[1450px]">
                    {/* HEADER */}
                    <div className="mx-auto max-w-3xl text-center">
                        <span
                            className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-cyan-500/15
                bg-cyan-500/[0.06]
                px-3.5
                py-2
                text-[9px]
                font-black
                tracking-[0.10em]
                text-cyan-700

                sm:text-[10px]
              "
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                            CERTIFICATES
                        </span>

                        <h2
                            className="
                mt-4
                text-[28px]
                font-black
                leading-[1.6]
                text-[#07192D]

                sm:text-[36px]
                lg:text-[42px]
              "
                        >
                            نمونه گواهینامه‌های ارائه‌شده
                        </h2>

                        <p
                            className="
                mx-auto
                mt-3
                max-w-2xl
                text-[11px]
                leading-7
                text-slate-500

                sm:text-sm
                sm:leading-8
              "
                        >
                            نمونه مدارک به‌صورت خودکار نمایش داده می‌شوند.
                        </p>
                    </div>

                    {/* THREE TITLES */}
                    <div
                        className="
              mx-auto
              mt-7
              grid
              max-w-5xl
              gap-2

              sm:grid-cols-3
              sm:gap-3
            "
                    >
                        {certificates.map((item, index) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setActiveIndex(index)}
                                className={`
                  rounded-2xl
                  border
                  px-4
                  py-3
                  text-center
                  text-[11px]
                  font-black
                  leading-6
                  transition

                  sm:text-xs

                  ${activeIndex === index
                                        ? "border-cyan-300 bg-cyan-50 text-cyan-800 shadow-sm"
                                        : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                                    }
                `}
                            >
                                {item.title}
                            </button>
                        ))}
                    </div>

                    {/* SINGLE CERTIFICATE CARD */}
                    <div
                        className="
              mx-auto
              mt-6
              max-w-5xl
            "
                    >
                        <article
                            onMouseEnter={() => setPaused(true)}
                            onMouseLeave={() => setPaused(false)}
                            className="
                overflow-hidden
                rounded-[30px]
                border
                border-slate-200
                bg-white
                shadow-[0_18px_60px_rgba(15,40,60,0.08)]
              "
                        >
                            <div
                                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                  border-b
                  border-slate-100
                  px-4
                  py-4

                  sm:px-6
                "
                            >
                                <div>
                                    <span className="text-[8px] font-black tracking-[0.15em] text-orange-500">
                                        CERTIFICATE
                                    </span>

                                    <h3
                                        className="
                      mt-1
                      text-sm
                      font-black
                      text-[#07192D]

                      sm:text-base
                    "
                                    >
                                        {active.title}
                                    </h3>
                                </div>

                                <span
                                    className="
                    shrink-0
                    rounded-full
                    bg-emerald-50
                    px-3
                    py-2
                    text-[9px]
                    font-black
                    text-emerald-700
                  "
                                >
                                    {active.badge}
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={() => setOpen(true)}
                                className="
                  group
                  relative
                  block
                  h-[330px]
                  w-full
                  overflow-hidden
                  bg-[#F2F7FA]

                  sm:h-[420px]
                  lg:h-[520px]
                "
                                aria-label={`مشاهده ${active.title}`}
                            >
                                <Image
                                    key={active.id}
                                    src={active.image}
                                    alt={active.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 1000px"
                                    className="
                    object-contain
                    p-5
                    transition
                    duration-700
                    group-hover:scale-[1.01]

                    sm:p-7
                    lg:p-8
                  "
                                />

                                <div
                                    className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    h-28
                    bg-gradient-to-t
                    from-[#07192D]/20
                    to-transparent
                  "
                                />

                                <span
                                    className="
                    absolute
                    bottom-4
                    left-1/2
                    -translate-x-1/2
                    rounded-full
                    border
                    border-white/50
                    bg-white/90
                    px-4
                    py-2
                    text-[10px]
                    font-black
                    text-[#07192D]
                    shadow-sm
                    backdrop-blur
                  "
                                >
                                    مشاهده مدرک
                                </span>
                            </button>

                            <div
                                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                  px-4
                  py-4

                  sm:px-6
                "
                            >
                                <button
                                    type="button"
                                    onClick={previous}
                                    aria-label="مدرک قبلی"
                                    className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-slate-200
                    bg-white
                    text-lg
                    text-[#07192D]
                    transition
                    hover:bg-slate-50
                  "
                                >
                                    →
                                </button>

                                <div className="flex items-center gap-2">
                                    {certificates.map((item, index) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => setActiveIndex(index)}
                                            aria-label={`نمایش ${item.title}`}
                                            className={`
                        h-2
                        rounded-full
                        transition-all
                        ${activeIndex === index
                                                    ? "w-7 bg-orange-400"
                                                    : "w-2 bg-slate-300"
                                                }
                      `}
                                        />
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={next}
                                    aria-label="مدرک بعدی"
                                    className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-slate-200
                    bg-white
                    text-lg
                    text-[#07192D]
                    transition
                    hover:bg-slate-50
                  "
                                >
                                    ←
                                </button>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* LARGE PREVIEW */}
            {open && (
                <div
                    className="
            fixed
            inset-0
            z-[200]
            flex
            items-center
            justify-center
            bg-[#03111F]/82
            p-4
            backdrop-blur-md
          "
                    onClick={() => setOpen(false)}
                >
                    <div
                        className="
              relative
              w-full
              max-w-[980px]
              overflow-hidden
              rounded-[28px]
              border
              border-white/10
              bg-white
              shadow-[0_35px_120px_rgba(0,0,0,0.35)]
            "
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-label="بستن"
                            className="
                absolute
                left-4
                top-4
                z-30
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-slate-200
                bg-white/95
                text-xl
                text-[#07192D]
                shadow-md
              "
                        >
                            ×
                        </button>

                        <div
                            className="
                relative
                h-[72vh]
                min-h-[420px]
                bg-[#EEF4F7]
              "
                        >
                            <Image
                                src={active.image}
                                alt={active.title}
                                fill
                                sizes="100vw"
                                className="object-contain p-5 sm:p-8"
                                priority
                            />
                        </div>

                        <div
                            className="
                flex
                items-center
                justify-between
                gap-3
                border-t
                border-slate-200
                bg-white
                px-5
                py-4
              "
                        >
                            <h3 className="text-sm font-black text-[#07192D] sm:text-base">
                                {active.title}
                            </h3>

                            <span
                                className="
                  rounded-full
                  bg-emerald-50
                  px-3
                  py-2
                  text-[9px]
                  font-black
                  text-emerald-700
                "
                            >
                                {active.badge}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
