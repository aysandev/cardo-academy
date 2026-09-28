"use client";

import Image from "next/image";
import { useState } from "react";

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
    const [openCertificate, setOpenCertificate] =
        useState<Certificate | null>(null);

    return (
        <>
            <section
                id="certificates"
                dir="rtl"
                className="
                    relative
                    w-full
                    overflow-hidden
                    bg-[#F7FBFD]
                    px-4
                    py-12
                    sm:px-6
                    sm:py-14
                    lg:px-10
                    lg:py-16
                "
            >
                {/* DECORATIVE BACKGROUND */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-32
                        top-20
                        h-[350px]
                        w-[350px]
                        rounded-full
                        bg-cyan-400/[0.05]
                        blur-[120px]
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        -left-32
                        bottom-10
                        h-[350px]
                        w-[350px]
                        rounded-full
                        bg-orange-400/[0.05]
                        blur-[120px]
                    "
                />

                <div className="relative mx-auto w-full max-w-[1450px]">
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
                            نمونه مدارک قابل ارائه در دوره‌های آموزشی مجتمع
                            آموزشی کاردو
                        </p>
                    </div>

                    {/* ================================================= */}
                    {/* THREE CERTIFICATES */}
                    {/* ================================================= */}

                    <div
                        className="
                            mx-auto
                            mt-8
                            grid
                            w-full
                            max-w-[1250px]
                            grid-cols-1
                            gap-5
                            sm:mt-10
                            md:grid-cols-3
                            md:gap-4
                            lg:gap-6
                        "
                    >
                        {certificates.map((item, index) => (
                            <div
                                key={item.id}
                                className="
                                    group
                                    flex
                                    min-w-0
                                    flex-col
                                "
                            >
                                {/* TITLE ABOVE EACH CARD */}
                                <div
                                    className="
                                        mb-3
                                        flex
                                        min-h-[64px]
                                        items-center
                                        justify-center
                                        rounded-[18px]
                                        border
                                        border-slate-200
                                        bg-white
                                        px-4
                                        py-3
                                        text-center
                                        shadow-[0_8px_25px_rgba(15,40,60,0.04)]
                                        transition
                                        duration-300
                                        group-hover:border-cyan-300
                                        group-hover:shadow-[0_10px_30px_rgba(15,100,130,0.08)]
                                        sm:min-h-[70px]
                                    "
                                >
                                    <div>
                                        <span
                                            className="
                                                mb-1
                                                block
                                                text-[8px]
                                                font-black
                                                tracking-[0.16em]
                                                text-orange-500
                                            "
                                        >
                                            0{index + 1}
                                        </span>

                                        <h3
                                            className="
                                                text-[11px]
                                                font-black
                                                leading-6
                                                text-[#07192D]
                                                sm:text-xs
                                                lg:text-sm
                                            "
                                        >
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* CERTIFICATE CARD */}
                                <article
                                    className="
                                        relative
                                        flex
                                        h-full
                                        flex-col
                                        overflow-hidden
                                        rounded-[24px]
                                        border
                                        border-slate-200
                                        bg-white
                                        shadow-[0_16px_45px_rgba(15,40,60,0.07)]
                                        transition
                                        duration-500
                                        hover:-translate-y-1
                                        hover:border-cyan-200
                                        hover:shadow-[0_24px_60px_rgba(15,70,100,0.12)]
                                        sm:rounded-[26px]
                                        lg:rounded-[30px]
                                    "
                                >
                                    {/* CARD HEADER */}
                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            gap-2
                                            border-b
                                            border-slate-100
                                            px-4
                                            py-3
                                            sm:px-5
                                            sm:py-4
                                        "
                                    >
                                        <span
                                            className="
                                                text-[8px]
                                                font-black
                                                tracking-[0.15em]
                                                text-slate-400
                                            "
                                        >
                                            CERTIFICATE
                                        </span>

                                        <span
                                            className="
                                                shrink-0
                                                rounded-full
                                                bg-emerald-50
                                                px-2.5
                                                py-1.5
                                                text-[8px]
                                                font-black
                                                text-emerald-700
                                                sm:px-3
                                                sm:py-2
                                                sm:text-[9px]
                                            "
                                        >
                                            {item.badge}
                                        </span>
                                    </div>

                                    {/* IMAGE */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenCertificate(item)
                                        }
                                        aria-label={`مشاهده ${item.title}`}
                                        className="
                                            group/image
                                            relative
                                            block
                                            aspect-[4/3]
                                            w-full
                                            overflow-hidden
                                            bg-[#F1F6F8]
                                            md:aspect-[4/3.3]
                                            xl:aspect-[4/3.1]
                                        "
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            sizes="
                                                (max-width: 767px) 100vw,
                                                (max-width: 1200px) 33vw,
                                                400px
                                            "
                                            className="
                                                object-contain
                                                p-3
                                                transition
                                                duration-700
                                                ease-out
                                                group-hover/image:scale-[1.025]
                                                sm:p-4
                                                lg:p-5
                                            "
                                        />

                                        {/* OVERLAY */}
                                        <div
                                            className="
                                                pointer-events-none
                                                absolute
                                                inset-0
                                                bg-gradient-to-t
                                                from-[#07192D]/20
                                                via-transparent
                                                to-transparent
                                                opacity-60
                                                transition
                                                duration-500
                                                group-hover/image:opacity-100
                                            "
                                        />

                                        {/* VIEW BUTTON */}
                                        <span
                                            className="
                                                absolute
                                                bottom-3
                                                left-1/2
                                                -translate-x-1/2
                                                whitespace-nowrap
                                                rounded-full
                                                border
                                                border-white/60
                                                bg-white/90
                                                px-3
                                                py-2
                                                text-[9px]
                                                font-black
                                                text-[#07192D]
                                                shadow-md
                                                backdrop-blur-md
                                                transition
                                                duration-300
                                                group-hover/image:-translate-y-1
                                                sm:bottom-4
                                                sm:px-4
                                                sm:text-[10px]
                                            "
                                        >
                                            مشاهده مدرک
                                        </span>
                                    </button>

                                    {/* FOOTER */}
                                    <div
                                        className="
                                            mt-auto
                                            flex
                                            items-center
                                            justify-between
                                            gap-3
                                            px-4
                                            py-4
                                            sm:px-5
                                        "
                                    >
                                        <div className="min-w-0">
                                            <p
                                                className="
                                                    line-clamp-2
                                                    text-[10px]
                                                    font-black
                                                    leading-6
                                                    text-[#07192D]
                                                    sm:text-[11px]
                                                    lg:text-xs
                                                "
                                            >
                                                {item.title}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setOpenCertificate(item)
                                            }
                                            aria-label={`باز کردن ${item.title}`}
                                            className="
                                                flex
                                                h-9
                                                w-9
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-[#07192D]
                                                text-sm
                                                text-white
                                                transition
                                                duration-300
                                                hover:bg-orange-400
                                                hover:text-[#07192D]
                                                sm:h-10
                                                sm:w-10
                                            "
                                        >
                                            ↗
                                        </button>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>

                    {/* SMALL NOTE */}
                    <div
                        className="
                            mx-auto
                            mt-7
                            flex
                            max-w-3xl
                            items-center
                            justify-center
                            gap-2
                            text-center
                            text-[9px]
                            font-bold
                            leading-6
                            text-slate-400
                            sm:mt-8
                            sm:text-[10px]
                        "
                    >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                        برای مشاهده هر گواهینامه در ابعاد بزرگ، روی تصویر آن کلیک
                        کنید.
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* LARGE PREVIEW MODAL */}
            {/* ========================================================= */}

            {openCertificate && (
                <div
                    className="
                        fixed
                        inset-0
                        z-[200]
                        flex
                        items-center
                        justify-center
                        bg-[#03111F]/85
                        p-3
                        backdrop-blur-md
                        sm:p-5
                    "
                    onClick={() => setOpenCertificate(null)}
                >
                    <div
                        className="
                            relative
                            flex
                            max-h-[92vh]
                            w-full
                            max-w-[1000px]
                            flex-col
                            overflow-hidden
                            rounded-[22px]
                            border
                            border-white/10
                            bg-white
                            shadow-[0_35px_120px_rgba(0,0,0,0.40)]
                            sm:rounded-[28px]
                        "
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >
                        {/* CLOSE */}
                        <button
                            type="button"
                            onClick={() =>
                                setOpenCertificate(null)
                            }
                            aria-label="بستن"
                            className="
                                absolute
                                left-3
                                top-3
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
                                backdrop-blur
                                transition
                                hover:bg-slate-100
                                sm:left-4
                                sm:top-4
                            "
                        >
                            ×
                        </button>

                        {/* PREVIEW IMAGE */}
                        <div
                            className="
                                relative
                                h-[68vh]
                                min-h-[320px]
                                w-full
                                bg-[#EEF4F7]
                                sm:min-h-[420px]
                            "
                        >
                            <Image
                                src={openCertificate.image}
                                alt={openCertificate.title}
                                fill
                                sizes="100vw"
                                className="
                                    object-contain
                                    p-4
                                    sm:p-7
                                    lg:p-9
                                "
                                priority
                            />
                        </div>

                        {/* MODAL FOOTER */}
                        <div
                            dir="rtl"
                            className="
                                flex
                                items-center
                                justify-between
                                gap-3
                                border-t
                                border-slate-200
                                bg-white
                                px-4
                                py-4
                                sm:px-6
                            "
                        >
                            <h3
                                className="
                                    text-xs
                                    font-black
                                    leading-6
                                    text-[#07192D]
                                    sm:text-base
                                "
                            >
                                {openCertificate.title}
                            </h3>

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
                                {openCertificate.badge}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}