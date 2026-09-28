"use client";

import Image from "next/image";
import { useState } from "react";

type Certificate = {
    id: string;
    title: string;
    issuer: string;
    badge: string;
    image: string;
};

const certificates: Certificate[] = [
    {
        id: "tvet",
        title: "گواهینامه فنی و حرفه‌ای",
        issuer: "سازمان آموزش فنی و حرفه‌ای کشور",
        badge: "رسمی",
        image: "/images/certificates/tvet-certificate.jpg",
    },
    {
        id: "organization",
        title: "گواهی دوره‌های سازمانی",
        issuer: "مجتمع آموزشی کاردو",
        badge: "سازمانی",
        image: "/images/certificates/organization-certificate.jpg",
    },
    {
        id: "international",
        title: "گواهی دوره‌های بین‌المللی",
        issuer: "برگزارکننده / شریک آموزشی بین‌المللی",
        badge: "بین‌المللی",
        image: "/images/certificates/international-certificate.jpg",
    },

];

export default function CertificatesShowcase() {
    const [activeCertificate, setActiveCertificate] =
        useState<Certificate | null>(null);

    return (
        <>
            <section
                id="certificates"
                dir="rtl"
                className="
          bg-[#F7FBFD]
          px-4
          py-14
          sm:px-6
          sm:py-16
          lg:px-10
          lg:py-20
        "
            >
                <div className="mx-auto max-w-[1450px]">
                    {/* Heading */}
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
                text-[29px]
                font-black
                leading-[1.6]
                text-[#07192D]
                sm:text-[38px]
                lg:text-[44px]
              "
                        >
                            نمونه گواهی های  ارائه‌شده
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
                            بخشی از گواهینامه‌ها و مدارکی که متناسب با نوع دوره
                            و شرایط برگزاری، پس از اتمام آموزش ارائه می‌شوند.
                        </p>
                    </div>

                    {/* Cards */}
                    <div
                        className="
              mt-9
              grid
              gap-4
              sm:grid-cols-2
              lg:mt-11
              xl:grid-cols-4
            "
                    >
                        {certificates.map((item, index) => (
                            <article
                                key={item.id}
                                className="
                  group
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-slate-200
                  bg-white
                  shadow-[0_14px_42px_rgba(15,40,60,0.06)]
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_22px_60px_rgba(15,40,60,0.10)]
                "
                            >
                                <button
                                    type="button"
                                    onClick={() => setActiveCertificate(item)}
                                    className="
                    relative
                    block
                    h-[235px]
                    w-full
                    overflow-hidden
                    bg-[#F2F7FA]
                    text-right
                    sm:h-[260px]
                  "
                                    aria-label={`مشاهده ${item.title}`}
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                                        className="
                      object-contain
                      p-4
                      transition
                      duration-500
                      group-hover:scale-[1.02]
                    "
                                    />

                                    <span
                                        className="
                      absolute
                      right-3
                      top-3
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      border
                      border-emerald-500/15
                      bg-white/90
                      px-2.5
                      py-1.5
                      text-[8px]
                      font-black
                      text-emerald-700
                      shadow-sm
                      backdrop-blur
                    "
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        {item.badge}
                                    </span>

                                    <span
                                        className="
                      absolute
                      bottom-3
                      left-3
                      rounded-full
                      border
                      border-slate-200
                      bg-white/90
                      px-3
                      py-2
                      text-[9px]
                      font-black
                      text-[#07192D]
                      shadow-sm
                      backdrop-blur
                    "
                                    >
                                        مشاهده مدرک
                                    </span>
                                </button>

                                <div className="p-4 sm:p-5">
                                    <span
                                        className="
                      text-[8px]
                      font-black
                      tracking-[0.12em]
                      text-orange-500
                    "
                                    >
                                        0{index + 1}
                                    </span>

                                    <h3
                                        className="
                      mt-2
                      text-[15px]
                      font-black
                      leading-7
                      text-[#07192D]
                      sm:text-base
                    "
                                    >
                                        {item.title}
                                    </h3>

                                    <p
                                        className="
                      mt-1.5
                      text-[10px]
                      leading-6
                      text-slate-500
                    "
                                    >
                                        {item.issuer}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Small note */}
                    <div
                        className="
              mt-6
              rounded-[18px]
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-center
              text-[9px]
              leading-6
              text-slate-500
              sm:text-[10px]
            "
                    >
                        نوع مدرک نهایی هر دوره بر اساس عنوان دوره، شیوه برگزاری
                        و مرجع صادرکننده مشخص می‌شود.
                    </div>
                </div>
            </section>

            {/* Preview Modal */}
            {activeCertificate && (
                <div
                    className="
            fixed
            inset-0
            z-[200]
            flex
            items-center
            justify-center
            bg-[#03111F]/80
            p-4
            backdrop-blur-md
          "
                    onClick={() => setActiveCertificate(null)}
                >
                    <div
                        className="
              relative
              w-full
              max-w-[980px]
              overflow-hidden
              rounded-[26px]
              border
              border-white/10
              bg-white
              shadow-[0_35px_120px_rgba(0,0,0,0.35)]
            "
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setActiveCertificate(null)}
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
                transition
                hover:bg-slate-100
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
                                src={activeCertificate.image}
                                alt={activeCertificate.title}
                                fill
                                sizes="100vw"
                                className="object-contain p-5 sm:p-8"
                                priority
                            />
                        </div>

                        <div
                            className="
                flex
                flex-col
                gap-2
                border-t
                border-slate-200
                bg-white
                px-5
                py-4
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
                        >
                            <div>
                                <h3 className="text-sm font-black text-[#07192D] sm:text-base">
                                    {activeCertificate.title}
                                </h3>
                                <p className="mt-1 text-[10px] text-slate-500">
                                    {activeCertificate.issuer}
                                </p>
                            </div>

                            <span
                                className="
                  inline-flex
                  w-fit
                  rounded-full
                  bg-emerald-50
                  px-3
                  py-2
                  text-[9px]
                  font-black
                  text-emerald-700
                "
                            >
                                {activeCertificate.badge}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
