"use client";

import Image from "next/image";
import Link from "next/link";

import {
    Suspense,
    useMemo,
    useState,
} from "react";

import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
} from "framer-motion";

import {
    useSearchParams,
} from "next/navigation";

import Navbar from "@/components/Navbar";

import {
    technicalCourses,
    TechnicalCourse,
} from "@/lib/technicalCourses";

import {
    omanCourses,
} from "@/lib/omanCourses";


/* =========================================================
   TYPES
========================================================= */

type Category =
    | "technical"
    | "oman"
    | "organization";

type CatalogCourse = {
    id: string;
    title: string;
    englishTitle?: string;
    duration?: string;
    group: string;
    source: string;
    image?: string;
};


/* =========================================================
   TECHNICAL TOPICS
========================================================= */

const technicalTopics: Record<
    string,
    string[]
> = {
    "fire-system-design": [
        "طراحی و نصب سیستم‌های اطفاء حریق اسپرینکلر",
        "طراحی سیستم‌های لوله ایستاده",
        "جانمایی و طراحی سیستم اسپرینکلر در نرم‌افزار اتوکد",
        "طراحی سیستم اسپرینکلر با نرم‌افزار PipeNet",
        "طراحی سیستم اسپرینکلر با نرم‌افزار AutoSPRINK",
    ],

    "senior-industrial-firefighter": [
        "برنامه‌ریزی گردش کار و نگارش دستورالعمل‌های پیشگیرانه از حریق",
        "واکنش در شرایط اضطراری و حوادث غیرمترقبه",
        "نصب و کنترل تجهیزات اطفاء حریق",
        "مدیریت مانورهای شرایط اضطراری",
        "استقرار و سازماندهی نیروها و تجهیزات",
        "امداد و نجات اولیه در شرایط اضطراری",
        "ارزیابی ریسک و اولویت‌بندی خطرات",
    ],

    "real-estate": [
        "تشخیص عوامل مؤثر محیط کار",
        "تشخیص انواع سند ملکی و درک متون آن",
        "آرشیو اطلاعات و اسناد ملکی",
        "تشخیص انواع کاربری املاک",
        "قیمت‌گذاری املاک و اراضی",
        "انجام مذاکرات ملکی",
        "تنظیم و نگارش قراردادهای ملکی",
    ],
};


/* =========================================================
   ICONS
========================================================= */

function SearchIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
        >
            <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="1.8"
            />

            <path
                d="M20 20L16.5 16.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}


function ListIcon() {
    return (
        <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M9 6H20M9 12H20M9 18H20"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />

            <circle cx="5" cy="6" r="1" fill="currentColor" />
            <circle cx="5" cy="12" r="1" fill="currentColor" />
            <circle cx="5" cy="18" r="1" fill="currentColor" />
        </svg>
    );
}


function ArrowIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M19 12H5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />

            <path
                d="M10 7L5 12L10 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}


function CloseIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}


/* =========================================================
   CATEGORY SWITCH
========================================================= */

function CategorySwitch({
    active,
}: {
    active: Category;
}) {
    const items = [
        {
            id: "technical",
            title: "فنی و حرفه‌ای",
        },

        {
            id: "organization",
            title: "اختصاصی سازمان‌ها",
        },

        {
            id: "oman",
            title: "دوره‌های عمان",
        },
    ] as const;

    return (
        <div
            className="
        mx-auto
        flex
        max-w-[1500px]
        gap-2
        overflow-x-auto
        px-4
        py-4
        sm:px-5
        lg:px-10
      "
        >
            {items.map((item) => (
                <Link
                    key={item.id}
                    href={`/courses?category=${item.id}`}
                    className={`
            shrink-0
            rounded-full
            border
            px-5
            py-3
            text-xs
            font-black
            transition

            ${active === item.id
                            ? `
                  border-orange-400
                  bg-orange-400
                  text-[#06192E]
                `
                            : `
                  border-white/10
                  bg-white/[0.04]
                  text-slate-300
                  hover:bg-white/[0.08]
                `
                        }
          `}
                >
                    {item.title}
                </Link>
            ))}
        </div>
    );
}


/* =========================================================
   COURSE CARD
========================================================= */

function CourseCard({
    course,
    index,
    oman,
    onRequest,
    onTopics,
}: {
    course: CatalogCourse;
    index: number;
    oman: boolean;
    onRequest: (course: CatalogCourse) => void;
    onTopics: (course: CatalogCourse) => void;
}) {
    const image =
        course.image ||
        getTechnicalImage(course, index);

    return (
        <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{
                duration: 0.45,
                delay: Math.min(index * 0.025, 0.18),
            }}
            className={`
                group
                relative
                flex
                h-full
                flex-col
                overflow-hidden
                rounded-[26px]
                border
                bg-[#0B2137]/90
                shadow-[0_18px_55px_rgba(0,0,0,0.16)]
                transition-all
                duration-300
                hover:-translate-y-1

                ${oman
                    ? `
                            border-cyan-300/[0.10]
                            hover:border-cyan-300/30
                        `
                    : `
                            border-white/[0.08]
                            hover:border-orange-300/25
                        `
                }
            `}
        >
            <div
                className="
                    relative
                    h-[175px]
                    overflow-hidden
                    sm:h-[190px]
                    lg:h-[205px]
                "
            >
                <Image
                    src={image}
                    alt={course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-[1.045]
                    "
                />

                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-[#0B2137]
                        via-[#0B2137]/15
                        to-transparent
                    "
                />

                <div
                    className="
                        absolute
                        right-3
                        top-3
                        flex
                        max-w-[72%]
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-white/10
                        bg-[#06192E]/75
                        px-3
                        py-2
                        text-[9px]
                        font-black
                        text-white
                        backdrop-blur-xl
                    "
                >
                    <span
                        className={`
                            h-1.5
                            w-1.5
                            shrink-0
                            rounded-full
                            ${oman ? "bg-cyan-300" : "bg-orange-400"}
                        `}
                    />
                    <span className="truncate">
                        {course.group}
                    </span>
                </div>

                {course.source && (
                    <div
                        className="
                            absolute
                            bottom-3
                            left-3
                            rounded-full
                            border
                            border-white/10
                            bg-[#06192E]/70
                            px-3
                            py-1.5
                            text-[9px]
                            font-bold
                            text-slate-200
                            backdrop-blur-xl
                        "
                    >
                        {course.source}
                    </div>
                )}
            </div>

            <div
                className="
                    flex
                    flex-1
                    flex-col
                    p-4
                    sm:p-5
                "
            >
                {course.englishTitle && (
                    <p
                        dir="ltr"
                        className={`
                            mb-2
                            truncate
                            text-left
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[1.2px]
                            ${oman ? "text-cyan-200/65" : "text-orange-300/65"}
                        `}
                    >
                        {course.englishTitle}
                    </p>
                )}

                <h2
                    className="
                        min-h-[58px]
                        text-[17px]
                        font-black
                        leading-7
                        text-white
                        sm:text-[18px]
                    "
                >
                    {course.title}
                </h2>

                <div
                    className="
                        mt-4
                        flex
                        flex-wrap
                        items-center
                        gap-2
                    "
                >
                    {course.duration && (
                        <span
                            className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-full
                                border
                                border-white/[0.07]
                                bg-white/[0.035]
                                px-3
                                py-2
                                text-[10px]
                                font-bold
                                text-slate-300
                            "
                        >
                            <span className="text-xs">◷</span>
                            {course.duration}
                        </span>
                    )}

                    <span
                        className={`
                            inline-flex
                            rounded-full
                            border
                            px-3
                            py-2
                            text-[10px]
                            font-black
                            ${oman
                                ? `
                                        border-cyan-300/15
                                        bg-cyan-300/[0.06]
                                        text-cyan-200
                                    `
                                : `
                                        border-orange-300/15
                                        bg-orange-300/[0.06]
                                        text-orange-200
                                    `
                            }
                        `}
                    >
                        دوره تخصصی
                    </span>
                </div>

                <div className="flex-1" />

                <div
                    className="
                        mt-5
                        grid
                        grid-cols-[0.9fr_1.1fr]
                        gap-2
                    "
                >
                    <button
                        type="button"
                        onClick={() => onTopics(course)}
                        className="
                            flex
                            min-h-[46px]
                            items-center
                            justify-center
                            gap-2
                            rounded-[15px]
                            border
                            border-white/[0.08]
                            bg-white/[0.035]
                            px-3
                            text-[11px]
                            font-bold
                            text-slate-200
                            transition
                            hover:bg-white/[0.07]
                        "
                    >
                        <ListIcon />
                        سرفصل‌ها
                    </button>

                    <button
                        type="button"
                        onClick={() => onRequest(course)}
                        className={`
                            flex
                            min-h-[46px]
                            items-center
                            justify-center
                            gap-2
                            rounded-[15px]
                            px-3
                            text-[11px]
                            font-black
                            transition-all
                            duration-300

                            ${oman
                                ? `
                                        bg-cyan-300
                                        text-[#06192E]
                                        hover:bg-cyan-200
                                    `
                                : `
                                        bg-orange-400
                                        text-[#06192E]
                                        shadow-[0_10px_25px_rgba(251,146,60,0.12)]
                                        hover:bg-orange-300
                                    `
                            }
                        `}
                    >
                        درخواست دوره
                        <ArrowIcon />
                    </button>
                </div>
            </div>
        </motion.article>
    );
}



/* =========================================================
   COMPACT TECHNICAL CARD
========================================================= */

function CompactCatalogCard({
    course,
    index,
    onRequest,
    onTopics,
    onPreview,
    oman,
}: {
    course: CatalogCourse;
    index: number;
    onRequest: (course: CatalogCourse) => void;
    onTopics: (course: CatalogCourse) => void;
    onPreview: (course: CatalogCourse) => void;
    oman: boolean;
}) {
    const image =
        course.image ||
        getTechnicalImage(course, index);

    return (
        <motion.article
            initial={{
                opacity: 0,
                y: 20,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{
                once: true,
                amount: 0.08,
            }}
            transition={{
                duration: 0.4,
                delay: Math.min(index * 0.02, 0.14),
            }}
            className="
                group
                overflow-hidden
                rounded-[22px]
                border
                border-white/[0.08]
                bg-white/[0.03]
                transition
                duration-300
                hover:-translate-y-1
                hover:border-orange-300/20
                hover:bg-white/[0.045]
            "
        >
            <button
                type="button"
                onClick={() => onPreview(course)}
                className="
                    relative
                    block
                    aspect-[16/10]
                    w-full
                    overflow-hidden
                    bg-[#0B2137]
                    text-right
                "
            >
                <Image
                    src={image}
                    alt={course.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="
                        object-contain
                        transition
                        duration-500
                        group-hover:scale-[1.02]
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-[#06192E]/35
                        via-transparent
                        to-transparent
                    "
                />

                <span
                    className="
                        absolute
                        right-3
                        top-3
                        max-w-[72%]
                        truncate
                        rounded-full
                        border
                        border-white/10
                        bg-[#06192E]/78
                        px-3
                        py-1.5
                        text-[8px]
                        font-black
                        text-white
                        backdrop-blur-md
                    "
                >
                    {course.group}
                </span>

                <span
                    className="
                        absolute
                        bottom-3
                        left-3
                        rounded-full
                        border
                        border-white/10
                        bg-[#06192E]/78
                        px-3
                        py-1.5
                        text-[8px]
                        font-black
                        text-white
                        backdrop-blur-md
                    "
                >
                    مشاهده کامل
                </span>
            </button>

            <div className="p-3.5 sm:p-4">
                {course.englishTitle && (
                    <p
                        dir="ltr"
                        className={`
                            truncate
                            text-left
                            text-[8px]
                            font-bold
                            uppercase
                            tracking-[1px]
                            ${oman ? "text-cyan-200/65" : "text-orange-300/60"}
                        `}
                    >
                        {course.englishTitle}
                    </p>
                )}

                <h3
                    className="
                        mt-1.5
                        line-clamp-2
                        min-h-[48px]
                        text-sm
                        font-black
                        leading-6
                        text-white
                        sm:text-[15px]
                    "
                >
                    {course.title}
                </h3>

                <div
                    className="
                        mt-3
                        flex
                        flex-wrap
                        items-center
                        gap-2
                    "
                >
                    {course.duration && (
                        <span
                            className="
                                rounded-full
                                border
                                border-white/[0.07]
                                bg-white/[0.03]
                                px-2.5
                                py-1.5
                                text-[8px]
                                font-bold
                                text-slate-300
                            "
                        >
                            {course.duration}
                        </span>
                    )}

                    {course.source && (
                        <span
                            className="
                                max-w-[150px]
                                truncate
                                rounded-full
                                border
                                border-cyan-300/10
                                bg-cyan-300/[0.05]
                                px-2.5
                                py-1.5
                                text-[8px]
                                font-bold
                                text-cyan-200
                            "
                        >
                            {course.source}
                        </span>
                    )}
                </div>

                <div
                    className="
                        mt-3
                        grid
                        grid-cols-[0.9fr_1.1fr]
                        gap-2
                    "
                >
                    <button
                        type="button"
                        onClick={() => onTopics(course)}
                        className="
                            flex
                            min-h-[40px]
                            items-center
                            justify-center
                            gap-1.5
                            rounded-[13px]
                            border
                            border-white/[0.09]
                            bg-white/[0.035]
                            px-2
                            text-[9px]
                            font-black
                            text-slate-200
                            transition
                            hover:bg-white/[0.07]
                            sm:text-[10px]
                        "
                    >
                        <ListIcon />
                        سرفصل‌ها
                    </button>

                    <button
                        type="button"
                        onClick={() => onRequest(course)}
                        className={`
                            flex
                            min-h-[40px]
                            items-center
                            justify-center
                            gap-1.5
                            rounded-[13px]
                            px-2
                            text-[9px]
                            font-black
                            text-[#06192E]
                            transition
                            sm:text-[10px]

                            ${oman
                                ? "bg-cyan-300 hover:bg-cyan-200"
                                : "bg-orange-400 hover:bg-orange-300"
                            }
                        `}
                    >
                        درخواست دوره
                        <ArrowIcon />
                    </button>
                </div>
            </div>
        </motion.article>
    );
}


/* =========================================================
   TECH IMAGE
========================================================= */

function getTechnicalImage(
    course: CatalogCourse,
    index: number
) {
    const map: Record<
        string,
        string[]
    > = {
        "آتش‌نشانی": [
            "/images/firefighter.png",
            "/images/hsecourse.png",
        ],

        "HSE و ایمنی": [
            "/images/hse.png",
            "/images/hsecourse.png",
        ],

        "امداد و نجات": [
            "/images/hsecourse.png",
        ],

        "مدیریت بحران": [
            "/images/environment.png",
        ],

        "مواد خطرناک": [
            "/images/environment.png",
        ],

        "IOSH / NEBOSH": [
            "/images/hse.png",
        ],

        "مدیریت و مهارت‌های فردی": [
            "/images/education.png",
        ],

        "حقوقی و قراردادها": [
            "/images/lacw.png",
        ],
    };

    const images =
        map[course.group] || [
            "/images/education.png",
        ];

    return images[index % images.length];
}


/* =========================================================
   CATALOG
========================================================= */

function Catalog({
    category,
}: {
    category: "technical" | "oman";
}) {
    const isOman =
        category === "oman";

    const courses:
        CatalogCourse[] =
        isOman
            ? omanCourses
            : (
                technicalCourses as TechnicalCourse[]
            );


    const groups = [
        "همه دوره‌ها",
        ...Array.from(
            new Set(
                courses.map(
                    (course) =>
                        course.group
                )
            )
        ),
    ];


    const [
        activeGroup,
        setActiveGroup,
    ] = useState(
        "همه دوره‌ها"
    );


    const [
        search,
        setSearch,
    ] = useState("");


    const [
        selectedCourse,
        setSelectedCourse,
    ] =
        useState<CatalogCourse | null>(
            null
        );


    const [
        topicsCourse,
        setTopicsCourse,
    ] =
        useState<CatalogCourse | null>(
            null
        );


    const [
        previewCatalogCourse,
        setPreviewCatalogCourse,
    ] =
        useState<CatalogCourse | null>(
            null
        );


    const [
        submitting,
        setSubmitting,
    ] = useState(false);


    const [
        submitted,
        setSubmitted,
    ] = useState(false);


    const [
        error,
        setError,
    ] = useState("");


    const filtered =
        useMemo(() => {
            const query =
                search
                    .trim()
                    .toLowerCase();

            return courses.filter(
                (course) => {
                    const groupMatch =
                        activeGroup ===
                        "همه دوره‌ها" ||
                        course.group ===
                        activeGroup;

                    const searchMatch =
                        !query ||
                        course.title
                            .toLowerCase()
                            .includes(query) ||
                        (
                            course.englishTitle ||
                            ""
                        )
                            .toLowerCase()
                            .includes(query);

                    return (
                        groupMatch &&
                        searchMatch
                    );
                }
            );
        }, [
            courses,
            search,
            activeGroup,
        ]);


    const topics =
        topicsCourse && !isOman
            ? technicalTopics[
            topicsCourse.id
            ] || []
            : [];


    async function submit(
        event:
            React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (
            !selectedCourse ||
            submitting
        ) {
            return;
        }

        setSubmitting(true);
        setError("");

        try {
            const data =
                new FormData(
                    event.currentTarget
                );

            const response =
                await fetch(
                    "/api/requests",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body:
                            JSON.stringify({
                                fullName:
                                    data.get(
                                        "fullName"
                                    ),

                                phone:
                                    data.get(
                                        "phone"
                                    ),

                                city:
                                    data.get(
                                        "city"
                                    ),

                                age:
                                    data.get(
                                        "age"
                                    ),

                                job:
                                    data.get(
                                        "job"
                                    ),

                                notes:
                                    data.get(
                                        "notes"
                                    ),

                                courseId:
                                    selectedCourse.id,

                                courseTitle:
                                    selectedCourse.title,

                                courseGroup:
                                    selectedCourse.group,

                                requestType:
                                    isOman
                                        ? "oman"
                                        : "technical",
                            }),
                    }
                );

            const result =
                await response.json();

            if (
                !response.ok ||
                !result.success
            ) {
                throw new Error(
                    result.message ||
                    "ثبت درخواست انجام نشد."
                );
            }

            setSubmitted(true);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "خطایی رخ داد."
            );
        } finally {
            setSubmitting(false);
        }
    }


    return (
        <>
            {/* COMPACT COURSE HERO */}
            <section
                className="
                    mx-auto
                    max-w-[1450px]
                    px-3
                    pb-4
                    pt-4
                    sm:px-5
                    sm:pt-6
                    lg:px-10
                "
            >
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 16,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.45,
                    }}
                    className={`
                        relative
                        overflow-hidden
                        rounded-[28px]
                        border
                        px-5
                        py-6
                        sm:rounded-[32px]
                        sm:px-8
                        sm:py-8

                        ${isOman
                            ? `
                                    border-cyan-300/[0.10]
                                    bg-gradient-to-l
                                    from-[#12364C]
                                    via-[#0E293E]
                                    to-[#091E31]
                                `
                            : `
                                    border-white/[0.08]
                                    bg-gradient-to-l
                                    from-[#173953]
                                    via-[#102B43]
                                    to-[#0B2137]
                                `
                        }
                    `}
                >
                    <div
                        className={`
                            pointer-events-none
                            absolute
                            -right-20
                            -top-20
                            h-56
                            w-56
                            rounded-full
                            blur-[95px]
                            ${isOman
                                ? "bg-cyan-300/[0.08]"
                                : "bg-orange-400/[0.08]"
                            }
                        `}
                    />

                    <div
                        className="
                            relative
                            grid
                            gap-5
                            lg:grid-cols-[1fr_390px]
                            lg:items-center
                        "
                    >
                        <div>
                            <div
                                className="
                                    flex
                                    flex-wrap
                                    items-center
                                    gap-2
                                "
                            >
                                <span
                                    className={`
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        border
                                        px-3
                                        py-1.5
                                        text-[9px]
                                        font-black
                                        sm:text-[10px]

                                        ${isOman
                                            ? `
                                                    border-cyan-300/20
                                                    bg-cyan-300/[0.06]
                                                    text-cyan-200
                                                `
                                            : `
                                                    border-orange-300/20
                                                    bg-orange-300/[0.06]
                                                    text-orange-200
                                                `
                                        }
                                    `}
                                >
                                    <span
                                        className={`
                                            h-1.5
                                            w-1.5
                                            rounded-full
                                            ${isOman
                                                ? "bg-cyan-300"
                                                : "bg-orange-400"
                                            }
                                        `}
                                    />

                                    {isOman
                                        ? "دوره‌های بین‌المللی"
                                        : "تحت نظر سازمان آموزش فنی و حرفه‌ای"}
                                </span>

                                <span
                                    className="
                                        rounded-full
                                        border
                                        border-white/[0.08]
                                        bg-white/[0.03]
                                        px-3
                                        py-1.5
                                        text-[9px]
                                        font-bold
                                        text-slate-300
                                    "
                                >
                                    {courses.length} دوره
                                </span>
                            </div>

                            <h1
                                className="
                                    mt-4
                                    text-[28px]
                                    font-black
                                    leading-[1.55]
                                    text-white
                                    sm:text-4xl
                                    lg:text-[42px]
                                "
                            >
                                {isOman ? (
                                    <>
                                        دوره‌های{" "}
                                        <span className="text-cyan-300">
                                            بین‌المللی
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        دوره‌های{" "}
                                        <span className="text-orange-400">
                                            فنی و حرفه‌ای
                                        </span>
                                    </>
                                )}
                            </h1>

                            <p
                                className="
                                    mt-2
                                    max-w-2xl
                                    text-[10px]
                                    leading-6
                                    text-slate-400
                                    sm:text-xs
                                    sm:leading-7
                                "
                            >
                                دوره را پیدا کنید، تصویر کامل دوره را ببینید،
                                سرفصل‌ها را بررسی کنید و درخواست خود را ثبت کنید.
                            </p>
                        </div>

                        <div>
                            <label
                                className="
                                    mb-2
                                    block
                                    text-[9px]
                                    font-bold
                                    text-slate-500
                                "
                            >
                                جستجو بین دوره‌ها
                            </label>

                            <div
                                className="
                                    relative
                                    rounded-[18px]
                                    border
                                    border-white/[0.08]
                                    bg-[#06192E]/55
                                    p-1.5
                                "
                            >
                                <span
                                    className="
                                        absolute
                                        right-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-slate-500
                                    "
                                >
                                    <SearchIcon />
                                </span>

                                <input
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(
                                            event.target.value
                                        )
                                    }
                                    placeholder={
                                        isOman
                                            ? "نام دوره را جستجو کنید..."
                                            : "مثلاً HSE، آتش‌نشانی، IOSH..."
                                    }
                                    className="
                                        h-12
                                        w-full
                                        rounded-[14px]
                                        bg-white/[0.02]
                                        pr-11
                                        pl-4
                                        text-xs
                                        text-white
                                        outline-none
                                        placeholder:text-slate-600
                                    "
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* CATEGORY FILTER */}
            <div
                className="
                    sticky
                    top-[76px]
                    z-[80]
                    border-y
                    border-white/[0.05]
                    bg-[#06192E]/94
                    backdrop-blur-2xl
                    sm:top-[84px]
                    lg:top-[94px]
                "
            >
                <div
                    className="
                        mx-auto
                        max-w-[1500px]
                        px-3
                        py-3
                        sm:px-5
                        lg:px-10
                    "
                >
                    <div
                        className="
                            flex
                            gap-2
                            overflow-x-auto
                            pb-1
                            [scrollbar-width:none]
                            [&::-webkit-scrollbar]:hidden
                        "
                    >
                        {groups.map((group) => (
                            <button
                                key={group}
                                type="button"
                                onClick={() => setActiveGroup(group)}
                                className={`
                                    shrink-0
                                    rounded-full
                                    border
                                    px-4
                                    py-2.5
                                    text-[10px]
                                    font-black
                                    transition-all
                                    duration-300
                                    sm:text-xs

                                    ${activeGroup === group
                                        ? isOman
                                            ? `
                                                    border-cyan-300
                                                    bg-cyan-300
                                                    text-[#06192E]
                                                `
                                            : `
                                                    border-orange-400
                                                    bg-orange-400
                                                    text-[#06192E]
                                                    shadow-[0_8px_20px_rgba(251,146,60,0.13)]
                                                `
                                        : `
                                                border-white/[0.08]
                                                bg-white/[0.035]
                                                text-slate-300
                                                hover:bg-white/[0.07]
                                            `
                                    }
                                `}
                            >
                                {group}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* COURSE GRID */}
            <section
                className="
                    mx-auto
                    max-w-[1500px]
                    px-3
                    pb-24
                    pt-6
                    sm:px-5
                    sm:pt-7
                    lg:px-10
                "
            >
                <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-black text-white sm:text-xl">
                            {activeGroup === "همه دوره‌ها"
                                ? "همه دوره‌ها"
                                : activeGroup}
                        </h2>

                        <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                            {filtered.length} دوره پیدا شد
                        </p>
                    </div>

                    {(search || activeGroup !== "همه دوره‌ها") && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearch("");
                                setActiveGroup("همه دوره‌ها");
                            }}
                            className="
                                rounded-full
                                border
                                border-white/[0.08]
                                bg-white/[0.035]
                                px-4
                                py-2.5
                                text-[10px]
                                font-black
                                text-slate-300
                                transition
                                hover:bg-white/[0.07]
                            "
                        >
                            پاک کردن فیلترها
                        </button>
                    )}
                </div>

                {filtered.length > 0 ? (
                    <div
                        className={`
                            grid
                            gap-3
                            sm:grid-cols-2
                            lg:gap-4

                            lg:grid-cols-3
                            xl:grid-cols-4
                        `}
                    >
                        {filtered.map((course, index) => (
                            <CompactCatalogCard
                                key={course.id}
                                course={course}
                                index={index}
                                oman={isOman}
                                onRequest={(item) => {
                                    setSelectedCourse(item);
                                    setSubmitted(false);
                                    setError("");
                                }}
                                onTopics={setTopicsCourse}
                                onPreview={setPreviewCatalogCourse}
                            />
                        ))}
                    </div>
                ) : (
                    <div
                        className="
                            rounded-[28px]
                            border
                            border-dashed
                            border-white/[0.10]
                            bg-white/[0.025]
                            px-5
                            py-14
                            text-center
                        "
                    >
                        <div
                            className="
                                mx-auto
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-full
                                bg-white/[0.04]
                                text-2xl
                            "
                        >
                            ⌕
                        </div>

                        <h3 className="mt-5 text-lg font-black text-white">
                            دوره‌ای پیدا نشد
                        </h3>

                        <p className="mt-2 text-xs leading-7 text-slate-500">
                            عبارت جستجو یا دسته‌بندی را تغییر دهید.
                        </p>

                        <button
                            type="button"
                            onClick={() => {
                                setSearch("");
                                setActiveGroup("همه دوره‌ها");
                            }}
                            className="
                                mt-5
                                rounded-full
                                bg-orange-400
                                px-5
                                py-3
                                text-xs
                                font-black
                                text-[#06192E]
                            "
                        >
                            نمایش همه دوره‌ها
                        </button>
                    </div>
                )}
            </section>

            {/* COURSE IMAGE PREVIEW */}
            <AnimatePresence>
                {previewCatalogCourse && (
                    <Modal
                        close={() =>
                            setPreviewCatalogCourse(
                                null
                            )
                        }
                    >
                        <div>
                            <span
                                className={`
                                    inline-flex
                                    rounded-full
                                    border
                                    px-3
                                    py-1.5
                                    text-[9px]
                                    font-black
                                    ${isOman
                                        ? "border-cyan-300/15 bg-cyan-300/[0.06] text-cyan-200"
                                        : "border-orange-300/15 bg-orange-300/[0.06] text-orange-200"
                                    }
                                `}
                            >
                                {previewCatalogCourse.group}
                            </span>

                            <h2
                                className="
                                    mt-3
                                    text-xl
                                    font-black
                                    leading-8
                                    text-white
                                    sm:text-2xl
                                "
                            >
                                {previewCatalogCourse.title}
                            </h2>
                        </div>

                        <div
                            className="
                                relative
                                mt-5
                                aspect-[16/10]
                                overflow-hidden
                                rounded-[20px]
                                border
                                border-white/[0.08]
                                bg-[#0B2137]
                            "
                        >
                            <Image
                                src={
                                    previewCatalogCourse.image ||
                                    getTechnicalImage(
                                        previewCatalogCourse,
                                        0
                                    )
                                }
                                alt={
                                    previewCatalogCourse.title
                                }
                                fill
                                sizes="90vw"
                                className="
                                    object-contain
                                "
                            />
                        </div>

                        <div
                            className="
                                mt-4
                                grid
                                grid-cols-[0.9fr_1.1fr]
                                gap-2
                            "
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    const course =
                                        previewCatalogCourse;

                                    setPreviewCatalogCourse(
                                        null
                                    );

                                    setTimeout(
                                        () =>
                                            setTopicsCourse(
                                                course
                                            ),
                                        80
                                    );
                                }}
                                className="
                                    flex
                                    min-h-[48px]
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-white/10
                                    bg-white/[0.04]
                                    px-3
                                    text-[10px]
                                    font-black
                                    text-slate-200
                                    transition
                                    hover:bg-white/[0.08]
                                    sm:text-xs
                                "
                            >
                                <ListIcon />
                                سرفصل‌ها
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    const course =
                                        previewCatalogCourse;

                                    setPreviewCatalogCourse(
                                        null
                                    );

                                    setSelectedCourse(
                                        course
                                    );

                                    setSubmitted(
                                        false
                                    );

                                    setError("");
                                }}
                                className={`
                                    flex
                                    min-h-[48px]
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-full
                                    px-3
                                    text-[10px]
                                    font-black
                                    text-[#06192E]
                                    transition
                                    sm:text-xs

                                    ${isOman
                                        ? "bg-cyan-300 hover:bg-cyan-200"
                                        : "bg-orange-400 hover:bg-orange-300"
                                    }
                                `}
                            >
                                درخواست دوره
                                <ArrowIcon />
                            </button>
                        </div>
                    </Modal>
                )}
            </AnimatePresence>


            {/* TOPICS */}

            <AnimatePresence>
                {topicsCourse && (
                    <Modal
                        close={() =>
                            setTopicsCourse(
                                null
                            )
                        }
                    >
                        <h2
                            className="
                text-2xl
                font-black
              "
                        >
                            {topicsCourse.title}
                        </h2>

                        <p
                            className="
                mt-2
                text-xs
                text-slate-500
              "
                        >
                            سرفصل‌های دوره
                        </p>


                        <div
                            className="
                mt-7
                space-y-3
              "
                        >
                            {topics.length >
                                0 ? (
                                topics.map(
                                    (
                                        topic,
                                        index
                                    ) => (
                                        <div
                                            key={topic}
                                            className="
                        flex
                        gap-4
                        rounded-2xl
                        border
                        border-white/[0.07]
                        bg-white/[0.03]
                        p-4
                      "
                                        >
                                            <span
                                                className="
                          text-orange-300
                        "
                                            >
                                                {String(
                                                    index + 1
                                                ).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </span>

                                            <p
                                                className="
                          text-sm
                          leading-7
                        "
                                            >
                                                {topic}
                                            </p>
                                        </div>
                                    )
                                )
                            ) : (
                                <div
                                    className="
                    rounded-2xl
                    border
                    border-dashed
                    border-white/10
                    p-6
                    text-sm
                    leading-8
                    text-slate-400
                  "
                                >
                                    سرفصل تفصیلی این
                                    دوره در اطلاعات
                                    فعلی ثبت نشده است.
                                    برای دریافت جزئیات
                                    می‌توانید درخواست
                                    دوره را ارسال کنید.
                                </div>
                            )}
                        </div>


                        <button
                            type="button"
                            onClick={() => {
                                setSelectedCourse(
                                    topicsCourse
                                );

                                setTopicsCourse(
                                    null
                                );

                                setSubmitted(
                                    false
                                );
                            }}
                            className="
                mt-7
                w-full
                rounded-full
                bg-orange-400
                py-4
                font-black
                text-[#06192E]
              "
                        >
                            درخواست دوره
                        </button>
                    </Modal>
                )}
            </AnimatePresence>


            {/* REQUEST */}

            <AnimatePresence>
                {selectedCourse && (
                    <Modal
                        close={() => {
                            if (!submitting) {
                                setSelectedCourse(
                                    null
                                );
                            }
                        }}
                    >
                        {!submitted ? (
                            <>
                                <h2
                                    className="
                    text-2xl
                    font-black
                  "
                                >
                                    درخواست دوره
                                </h2>

                                <p
                                    className="
                    mt-2
                    text-sm
                    text-orange-300
                  "
                                >
                                    {
                                        selectedCourse.title
                                    }
                                </p>


                                <form
                                    onSubmit={submit}
                                    className="
                    mt-7
                    grid
                    gap-4
                    sm:grid-cols-2
                  "
                                >
                                    <Input
                                        name="fullName"
                                        placeholder="نام و نام خانوادگی"
                                        required
                                    />

                                    <Input
                                        name="phone"
                                        placeholder="شماره تماس"
                                        required
                                    />

                                    <Input
                                        name="city"
                                        placeholder="شهر محل سکونت"
                                        required
                                    />

                                    <Input
                                        name="job"
                                        placeholder="شغل"
                                    />

                                    <Input
                                        name="age"
                                        type="number"
                                        placeholder="سن"
                                    />


                                    <div
                                        className="
                      flex
                      items-center
                      rounded-2xl
                      border
                      border-orange-400/15
                      bg-orange-400/[0.05]
                      px-4
                      text-xs
                      text-orange-200
                    "
                                    >
                                        {
                                            selectedCourse.title
                                        }
                                    </div>


                                    <textarea
                                        name="notes"
                                        placeholder="توضیحات یا سوال..."
                                        className="
                      min-h-[125px]
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.04]
                      p-4
                      outline-none
                      sm:col-span-2
                    "
                                    />


                                    {error && (
                                        <div
                                            className="
                        rounded-2xl
                        bg-red-400/[0.08]
                        p-4
                        text-sm
                        text-red-200
                        sm:col-span-2
                      "
                                        >
                                            {error}
                                        </div>
                                    )}


                                    <button
                                        disabled={
                                            submitting
                                        }
                                        className="
                      rounded-full
                      bg-orange-400
                      py-4
                      font-black
                      text-[#06192E]
                      disabled:opacity-50
                      sm:col-span-2
                    "
                                    >
                                        {submitting
                                            ? "در حال ثبت..."
                                            : "ارسال درخواست"}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <Success />
                        )}
                    </Modal>
                )}
            </AnimatePresence>
        </>
    );
}


/* =========================================================
   COMPLETED ORGANIZATION COURSES
========================================================= */

const completedOrganizationCourses = [
    {
        id: "pssr",
        title: "PSSR",
        subtitle: "بازبینی ایمنی پیش از راه‌اندازی",
        instructor: "دکتر هاشم ستاره",
        duration: "۱ روز",
        format: "نظری",
        image: "/images/organization/pssr.jpg",
        group: "HSE و ایمنی",
    },
    {
        id: "hse-risk-management",
        title: "مدیریت ریسک",
        subtitle: "بهداشت، ایمنی و محیط زیست",
        instructor: "دکتر هاشم ستاره",
        duration: "۲۴ ساعت",
        format: "نظری",
        image: "/images/organization/hse-risk.jpg",
        group: "HSE و ایمنی",
    },
    {
        id: "fire-extinguishing",
        title: "اطفاء حریق",
        subtitle: "اصول و تکنیک‌های عملیات اطفاء حریق",
        instructor: "دکتر هاشم ستاره",
        duration: "۴۰ ساعت",
        format: "عملی",
        image: "/images/organization/fire-extinguishing.jpg",
        group: "آتش‌نشانی",
    },
    {
        id: "hazmat",
        title: "HAZMAT",
        subtitle: "مقدماتی و پیشرفته",
        instructor: "دکتر هاشم ستاره",
        duration: "۱۶ ساعت",
        format: "نظری",
        image: "/images/organization/hazmat.jpg",
        group: "مواد خطرناک",
    },
    {
        id: "fire-risk-assessment",
        title: "ارزیابی ریسک حریق",
        subtitle: "مدیریت و ارزیابی ریسک حریق حرفه‌ای",
        instructor: "دکتر هاشم ستاره",
        duration: "۱۶ ساعت",
        format: "نظری",
        image: "/images/organization/fire-risk.jpg",
        group: "HSE و ایمنی",
    },
    {
        id: "incident-command",
        title: "فرماندهی عملیات اطفاء حریق",
        subtitle: "مدیریت و فرماندهی عملیات حریق",
        instructor: "دکتر هاشم ستاره",
        duration: "۱۶ ساعت",
        format: "نظری",
        image: "/images/organization/incident-command.jpg",
        group: "آتش‌نشانی",
    },
    {
        id: "fire-behavior",
        title: "رفتار حریق‌شناسی",
        subtitle: "اصول، تکنیک‌ها و مدیریت رفتار حریق",
        instructor: "مهندس حمیدرضا فرجی",
        duration: "۲ روز",
        format: "نظری و عملی",
        image: "/images/organization/fire-behavior.jpg",
        group: "آتش‌نشانی",
    },
    {
        id: "relay-water-supply",
        title: "رله و آبرسانی",
        subtitle: "اصول و تکنیک‌های مدیریت رله و عملیات آبرسانی",
        instructor: "مهندس حمیدرضا فرجی",
        duration: "۲ روز",
        format: "نظری و عملی",
        image: "/images/organization/relay-water-supply.jpg",
        group: "آتش‌نشانی",
    },
    {
        id: "search-rescue",
        title: "جستجو و عملیات نجات",
        subtitle: "اصول، تکنیک‌ها و مدیریت عملیات جستجو و نجات",
        instructor: "مهندس حمیدرضا فرجی",
        duration: "۲ روز",
        format: "نظری و عملی",
        image: "/images/organization/search-rescue.jpg",
        group: "امداد و نجات",
    },
    {
        id: "nozzle-technique",
        title: "تکنیک نازل",
        subtitle: "اصول و تکنیک‌های مدیریت عملیات با نازل آتش‌نشانی",
        instructor: "مهندس حمیدرضا فرجی",
        duration: "۲ روز",
        format: "نظری و عملی",
        image: "/images/organization/nozzle-technique.jpg",
        group: "آتش‌نشانی",
    },
    {
        id: "incident-investigation",
        title: "بررسی رویداد",
        subtitle: "تجزیه و تحلیل رویدادها",
        instructor: "دکتر هاشم ستاره",
        duration: "۲۴ ساعت",
        format: "نظری",
        image: "/images/organization/incident-investigation.jpg",
        group: "HSE و ایمنی",
    },
    {
        id: "industrial-firefighter",
        title: "آتش‌نشانی صنعتی",
        subtitle: "مدیریت عملیات آتش‌نشانی در محیط‌های صنعتی",
        instructor: "مهندس حمیدرضا فرجی",
        duration: "۲ روز",
        format: "نظری و عملی",
        image: "/images/organization/industrial-firefighter.jpg",
        group: "آتش‌نشانی",
    },
];

/* =========================================================
   ORGANIZATION PAGE
========================================================= */
function OrganizationPage() {
    const [selectedOrgCourse, setSelectedOrgCourse] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [orgSearch, setOrgSearch] = useState("");
    const [orgGroup, setOrgGroup] = useState("همه");
    const [previewCourse, setPreviewCourse] =
        useState<(typeof completedOrganizationCourses)[number] | null>(null);

    const [outlineCourse, setOutlineCourse] =
        useState<(typeof completedOrganizationCourses)[number] | null>(null);

    const orgGroups = [
        "همه",
        ...Array.from(
            new Set(
                completedOrganizationCourses.map((course) => course.group)
            )
        ),
    ];

    const filteredOrgCourses = useMemo(() => {
        const query = orgSearch.trim().toLowerCase();

        return completedOrganizationCourses.filter((course) => {
            const groupMatch =
                orgGroup === "همه" || course.group === orgGroup;

            const searchMatch =
                !query ||
                course.title.toLowerCase().includes(query) ||
                course.subtitle.toLowerCase().includes(query) ||
                course.instructor.toLowerCase().includes(query) ||
                course.group.toLowerCase().includes(query);

            return groupMatch && searchMatch;
        });
    }, [orgSearch, orgGroup]);

    function requestCourse(courseTitle: string) {
        setSelectedOrgCourse(courseTitle);
        setSuccess(false);
        setError("");

        setTimeout(() => {
            document
                .getElementById("organization-request")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
        }, 50);
    }

    async function submitOrganizationRequest(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        if (submitting) return;

        setSubmitting(true);
        setError("");

        try {
            const data = new FormData(event.currentTarget);

            const response = await fetch("/api/requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName: data.get("contactName"),
                    phone: data.get("phone"),
                    city: data.get("city"),
                    organizationName: data.get("organizationName"),
                    industry: data.get("industry"),
                    participantCount: data.get("participantCount"),
                    preferredLocation: data.get("preferredLocation"),
                    trainingArea: data.get("trainingArea"),
                    notes: data.get("notes"),
                    courseTitle:
                        selectedOrgCourse ||
                        "درخواست آموزش اختصاصی سازمانی",
                    courseGroup: "آموزش اختصاصی سازمان‌ها",
                    requestType: "organization",
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "ثبت درخواست انجام نشد."
                );
            }

            setSuccess(true);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "خطایی رخ داد."
            );
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            {/* COMPACT INTRO */}
            <section
                className="
                    mx-auto
                    max-w-[1450px]
                    px-3
                    pb-4
                    pt-4
                    sm:px-5
                    lg:px-10
                "
            >
                <div
                    className="
                        flex
                        flex-col
                        gap-5
                        rounded-[26px]
                        border
                        border-white/[0.08]
                        bg-gradient-to-l
                        from-[#15364F]
                        to-[#0B2239]
                        px-5
                        py-6
                        sm:px-7
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                        lg:px-9
                        lg:py-7
                    "
                >
                    <div className="max-w-3xl">
                        <span
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-cyan-300/20
                                bg-cyan-300/[0.06]
                                px-3
                                py-1.5
                                text-[9px]
                                font-black
                                text-cyan-200
                            "
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                            آموزش اختصاصی سازمان‌ها
                        </span>

                        <h1
                            className="
                                mt-3
                                text-2xl
                                font-black
                                leading-[1.6]
                                text-white
                                sm:text-3xl
                                lg:text-[38px]
                            "
                        >
                            دوره‌های برگزارشده کاردو
                        </h1>

                        <p
                            className="
                                mt-2
                                max-w-2xl
                                text-[11px]
                                leading-7
                                text-slate-400
                                sm:text-xs
                            "
                        >
                            پوستر کامل هر دوره را ببینید و اگر برای سازمان شما مناسب بود،
                            مستقیماً درخواست برگزاری همان دوره را ثبت کنید.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => requestCourse("آموزش اختصاصی جدید")}
                        className="
                            inline-flex
                            min-h-[46px]
                            shrink-0
                            items-center
                            justify-center
                            gap-2
                            rounded-full
                            bg-orange-400
                            px-6
                            text-xs
                            font-black
                            text-[#06192E]
                            transition
                            hover:bg-orange-300
                        "
                    >
                        درخواست دوره اختصاصی
                        <ArrowIcon />
                    </button>
                </div>
            </section>

            {/* SEARCH + FILTER */}
            <section
                className="
                    mx-auto
                    max-w-[1450px]
                    px-3
                    pb-4
                    pt-3
                    sm:px-5
                    lg:px-10
                "
            >
                <div
                    className="
                        flex
                        flex-col
                        gap-3
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                    "
                >
                    <div className="relative w-full lg:max-w-[360px]">
                        <span
                            className="
                                absolute
                                right-4
                                top-1/2
                                -translate-y-1/2
                                text-slate-500
                            "
                        >
                            <SearchIcon />
                        </span>

                        <input
                            value={orgSearch}
                            onChange={(event) => setOrgSearch(event.target.value)}
                            placeholder="جستجو دوره یا مدرس..."
                            className="
                                h-12
                                w-full
                                rounded-[16px]
                                border
                                border-white/[0.08]
                                bg-white/[0.035]
                                pr-11
                                pl-4
                                text-xs
                                text-white
                                outline-none
                                placeholder:text-slate-600
                                focus:border-orange-300/25
                            "
                        />
                    </div>

                    <div
                        className="
                            flex
                            gap-2
                            overflow-x-auto
                            pb-1
                            [scrollbar-width:none]
                            [&::-webkit-scrollbar]:hidden
                        "
                    >
                        {orgGroups.map((group) => (
                            <button
                                key={group}
                                type="button"
                                onClick={() => setOrgGroup(group)}
                                className={`
                                    shrink-0
                                    rounded-full
                                    border
                                    px-4
                                    py-2.5
                                    text-[10px]
                                    font-black
                                    transition
                                    ${orgGroup === group
                                        ? "border-orange-400 bg-orange-400 text-[#06192E]"
                                        : "border-white/[0.08] bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]"
                                    }
                                `}
                            >
                                {group}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* COMPACT FULL-POSTER GALLERY */}
            <section
                className="
                    mx-auto
                    max-w-[1450px]
                    px-3
                    pb-16
                    sm:px-5
                    lg:px-10
                "
            >
                <div
                    className="
                        mb-3
                        flex
                        items-center
                        justify-between
                        gap-3
                    "
                >
                    <p className="text-[10px] font-bold text-slate-500 sm:text-xs">
                        {filteredOrgCourses.length} دوره
                    </p>

                    {(orgSearch || orgGroup !== "همه") && (
                        <button
                            type="button"
                            onClick={() => {
                                setOrgSearch("");
                                setOrgGroup("همه");
                            }}
                            className="
                                rounded-full
                                border
                                border-white/[0.08]
                                px-3
                                py-2
                                text-[9px]
                                font-black
                                text-slate-300
                            "
                        >
                            پاک کردن فیلترها
                        </button>
                    )}
                </div>

                {filteredOrgCourses.length > 0 ? (
                    <div
                        className="
                            grid
                            grid-cols-2
                            gap-3
                            sm:grid-cols-3
                            lg:grid-cols-4
                            xl:grid-cols-5
                        "
                    >
                        {filteredOrgCourses.map((course, index) => (
                            <motion.article
                                key={course.id}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.08 }}
                                transition={{
                                    duration: 0.35,
                                    delay: Math.min(index * 0.02, 0.12),
                                }}
                                className="
                                    group
                                    overflow-hidden
                                    rounded-[20px]
                                    border
                                    border-white/[0.08]
                                    bg-white/[0.025]
                                    transition
                                    hover:-translate-y-1
                                    hover:border-orange-300/20
                                "
                            >
                                <button
                                    type="button"
                                    onClick={() => setPreviewCourse(course)}
                                    className="
                                        relative
                                        block
                                        aspect-[4/5]
                                        w-full
                                        overflow-hidden
                                        bg-[#081C2F]
                                    "
                                >
                                    <Image
                                        src={course.image}
                                        alt={course.title}
                                        fill
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                        className="
                                            object-contain
                                            transition
                                            duration-500
                                            group-hover:scale-[1.015]
                                        "
                                    />

                                    <div
                                        className="
                                            absolute
                                            inset-x-0
                                            bottom-0
                                            h-16
                                            bg-gradient-to-t
                                            from-[#06192E]/85
                                            to-transparent
                                        "
                                    />

                                    <span
                                        className="
                                            absolute
                                            bottom-2
                                            left-2
                                            rounded-full
                                            border
                                            border-white/10
                                            bg-[#06192E]/75
                                            px-2.5
                                            py-1.5
                                            text-[8px]
                                            font-black
                                            text-white
                                            backdrop-blur-md
                                        "
                                    >
                                        بزرگ‌نمایی
                                    </span>
                                </button>

                                <div className="p-3">
                                    <div
                                        className="
                                            flex
                                            items-start
                                            justify-between
                                            gap-2
                                        "
                                    >
                                        <div className="min-w-0">
                                            <h3
                                                className="
                                                    truncate
                                                    text-[12px]
                                                    font-black
                                                    text-white
                                                    sm:text-sm
                                                "
                                            >
                                                {course.title}
                                            </h3>

                                            <p
                                                className="
                                                    mt-1
                                                    truncate
                                                    text-[8px]
                                                    text-slate-500
                                                    sm:text-[9px]
                                                "
                                            >
                                                {course.duration} · {course.format}
                                            </p>
                                        </div>

                                        <span
                                            className="
                                                shrink-0
                                                rounded-full
                                                bg-cyan-300/[0.07]
                                                px-2
                                                py-1
                                                text-[7px]
                                                font-black
                                                text-cyan-200
                                            "
                                        >
                                            {course.group}
                                        </span>
                                    </div>

                                    <div
                                        className="
                                            mt-3
                                            grid
                                            grid-cols-[0.9fr_1.1fr]
                                            gap-2
                                        "
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setOutlineCourse(course)}
                                            className="
                                                flex
                                                min-h-[40px]
                                                items-center
                                                justify-center
                                                gap-1.5
                                                rounded-[13px]
                                                border
                                                border-white/[0.09]
                                                bg-white/[0.035]
                                                px-2
                                                text-[9px]
                                                font-black
                                                text-slate-200
                                                transition
                                                hover:bg-white/[0.07]
                                                sm:text-[10px]
                                            "
                                        >
                                            <ListIcon />
                                            سرفصل‌ها
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => requestCourse(course.title)}
                                            className="
                                                flex
                                                min-h-[40px]
                                                items-center
                                                justify-center
                                                gap-1.5
                                                rounded-[13px]
                                                bg-orange-400
                                                px-2
                                                text-[9px]
                                                font-black
                                                text-[#06192E]
                                                transition
                                                hover:bg-orange-300
                                                sm:text-[10px]
                                            "
                                        >
                                            درخواست برگزاری
                                            <ArrowIcon />
                                        </button>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                ) : (
                    <div
                        className="
                            rounded-[22px]
                            border
                            border-dashed
                            border-white/10
                            bg-white/[0.02]
                            px-5
                            py-12
                            text-center
                        "
                    >
                        <h3 className="text-base font-black text-white">
                            دوره‌ای پیدا نشد
                        </h3>
                        <button
                            type="button"
                            onClick={() => {
                                setOrgSearch("");
                                setOrgGroup("همه");
                            }}
                            className="
                                mt-4
                                rounded-full
                                bg-orange-400
                                px-5
                                py-3
                                text-[10px]
                                font-black
                                text-[#06192E]
                            "
                        >
                            نمایش همه دوره‌ها
                        </button>
                    </div>
                )}
            </section>

            {/* REQUEST FORM */}
            <section
                id="organization-request"
                className="
                    mx-auto
                    max-w-[1000px]
                    scroll-mt-32
                    px-3
                    pb-28
                    sm:px-5
                    lg:px-10
                "
            >
                <div
                    className="
                        rounded-[28px]
                        border
                        border-orange-300/15
                        bg-gradient-to-bl
                        from-orange-400/[0.05]
                        via-white/[0.025]
                        to-cyan-300/[0.035]
                        p-5
                        sm:p-7
                    "
                >
                    {!success ? (
                        <>
                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-3
                                    sm:flex-row
                                    sm:items-end
                                    sm:justify-between
                                "
                            >
                                <div>
                                    <span className="text-[9px] font-black text-orange-300">
                                        درخواست سازمانی
                                    </span>
                                    <h2 className="mt-2 text-2xl font-black text-white">
                                        درخواست برگزاری دوره
                                    </h2>
                                </div>

                                {selectedOrgCourse && (
                                    <div
                                        className="
                                            rounded-[14px]
                                            border
                                            border-orange-300/15
                                            bg-orange-300/[0.06]
                                            px-4
                                            py-2.5
                                        "
                                    >
                                        <span className="block text-[8px] text-slate-500">
                                            دوره انتخاب‌شده
                                        </span>
                                        <strong className="mt-1 block text-xs font-black text-orange-200">
                                            {selectedOrgCourse}
                                        </strong>
                                    </div>
                                )}
                            </div>

                            <form
                                onSubmit={submitOrganizationRequest}
                                className="mt-5 grid gap-3 sm:grid-cols-2"
                            >
                                <Input
                                    name="organizationName"
                                    placeholder="نام سازمان / شرکت *"
                                    required
                                />
                                <Input
                                    name="contactName"
                                    placeholder="نام فرد رابط *"
                                    required
                                />
                                <Input
                                    name="phone"
                                    placeholder="شماره تماس *"
                                    required
                                />
                                <Input
                                    name="city"
                                    placeholder="شهر *"
                                    required
                                />
                                <Input
                                    name="industry"
                                    placeholder="حوزه فعالیت سازمان"
                                />
                                <Input
                                    name="participantCount"
                                    type="number"
                                    placeholder="تعداد تقریبی شرکت‌کنندگان"
                                />

                                <select
                                    value={selectedOrgCourse}
                                    onChange={(event) =>
                                        setSelectedOrgCourse(event.target.value)
                                    }
                                    className="
                                        h-14
                                        rounded-2xl
                                        border
                                        border-white/10
                                        bg-[#0B2137]
                                        px-4
                                        text-xs
                                        text-white
                                        outline-none
                                        focus:border-orange-400/40
                                    "
                                >
                                    <option value="">انتخاب دوره</option>
                                    {completedOrganizationCourses.map((course) => (
                                        <option key={course.id} value={course.title}>
                                            {course.title}
                                        </option>
                                    ))}
                                    <option value="آموزش اختصاصی جدید">
                                        آموزش اختصاصی جدید
                                    </option>
                                </select>

                                <select
                                    name="trainingArea"
                                    className="
                                        h-14
                                        rounded-2xl
                                        border
                                        border-white/10
                                        bg-[#0B2137]
                                        px-4
                                        text-xs
                                        text-white
                                        outline-none
                                        focus:border-orange-400/40
                                    "
                                >
                                    <option value="">حوزه آموزشی</option>
                                    <option value="HSE و ایمنی">HSE و ایمنی</option>
                                    <option value="آتش‌نشانی">آتش‌نشانی</option>
                                    <option value="مواد خطرناک">مواد خطرناک</option>
                                    <option value="امداد و نجات">امداد و نجات</option>
                                    <option value="مدیریت بحران">مدیریت بحران</option>
                                    <option value="سایر">سایر</option>
                                </select>

                                <select
                                    name="preferredLocation"
                                    className="
                                        h-14
                                        rounded-2xl
                                        border
                                        border-white/10
                                        bg-[#0B2137]
                                        px-4
                                        text-xs
                                        text-white
                                        outline-none
                                        focus:border-orange-400/40
                                        sm:col-span-2
                                    "
                                >
                                    <option value="">محل پیشنهادی برگزاری</option>
                                    <option value="organization">محل سازمان / شرکت</option>
                                    <option value="academy">مجتمع آموزشی کاردو</option>
                                    <option value="negotiable">قابل هماهنگی</option>
                                </select>

                                <textarea
                                    name="notes"
                                    placeholder="توضیحات تکمیلی، زمان پیشنهادی یا نیاز خاص مجموعه..."
                                    className="
                                        min-h-[110px]
                                        rounded-2xl
                                        border
                                        border-white/10
                                        bg-white/[0.04]
                                        p-4
                                        text-xs
                                        text-white
                                        outline-none
                                        placeholder:text-slate-600
                                        focus:border-orange-400/40
                                        sm:col-span-2
                                    "
                                />

                                {error && (
                                    <div
                                        className="
                                            rounded-2xl
                                            bg-red-400/[0.08]
                                            p-4
                                            text-xs
                                            text-red-200
                                            sm:col-span-2
                                        "
                                    >
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="
                                        min-h-14
                                        rounded-full
                                        bg-orange-400
                                        px-6
                                        text-xs
                                        font-black
                                        text-[#06192E]
                                        transition
                                        hover:bg-orange-300
                                        disabled:opacity-50
                                        sm:col-span-2
                                    "
                                >
                                    {submitting
                                        ? "در حال ثبت درخواست..."
                                        : "ارسال درخواست سازمانی"}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="py-8">
                            <Success />
                            <button
                                type="button"
                                onClick={() => {
                                    setSuccess(false);
                                    setSelectedOrgCourse("");
                                }}
                                className="
                                    mx-auto
                                    mt-4
                                    block
                                    rounded-full
                                    border
                                    border-white/10
                                    bg-white/[0.04]
                                    px-6
                                    py-3
                                    text-xs
                                    font-black
                                    text-slate-200
                                "
                            >
                                ثبت درخواست جدید
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* POSTER MODAL */}
            <AnimatePresence>
                {previewCourse && (
                    <Modal close={() => setPreviewCourse(null)}>
                        <h2 className="text-xl font-black text-white">
                            {previewCourse.title}
                        </h2>

                        <div
                            className="
                                relative
                                mt-4
                                aspect-[4/5]
                                overflow-hidden
                                rounded-[18px]
                                bg-[#081C2F]
                            "
                        >
                            <Image
                                src={previewCourse.image}
                                alt={previewCourse.title}
                                fill
                                sizes="90vw"
                                className="object-contain"
                            />
                        </div>

                        <div
                            className="
                                mt-4
                                grid
                                grid-cols-[0.9fr_1.1fr]
                                gap-2
                            "
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    const course = previewCourse;
                                    setPreviewCourse(null);
                                    setTimeout(
                                        () => setOutlineCourse(course),
                                        80
                                    );
                                }}
                                className="
                                    flex
                                    min-h-[48px]
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-white/10
                                    bg-white/[0.04]
                                    px-3
                                    text-[10px]
                                    font-black
                                    text-slate-200
                                    transition
                                    hover:bg-white/[0.08]
                                    sm:text-xs
                                "
                            >
                                <ListIcon />
                                سرفصل‌ها
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    const title = previewCourse.title;
                                    setPreviewCourse(null);
                                    setTimeout(() => requestCourse(title), 80);
                                }}
                                className="
                                    min-h-[48px]
                                    rounded-full
                                    bg-orange-400
                                    px-3
                                    text-[10px]
                                    font-black
                                    text-[#06192E]
                                    transition
                                    hover:bg-orange-300
                                    sm:text-xs
                                "
                            >
                                درخواست برگزاری
                            </button>
                        </div>
                    </Modal>
                )}
            </AnimatePresence>

            {/* COURSE OUTLINE MODAL */}
            <AnimatePresence>
                {outlineCourse && (
                    <Modal close={() => setOutlineCourse(null)}>
                        <div
                            className="
                                flex
                                items-start
                                justify-between
                                gap-4
                            "
                        >
                            <div>
                                <span
                                    className="
                                        inline-flex
                                        rounded-full
                                        border
                                        border-cyan-300/15
                                        bg-cyan-300/[0.06]
                                        px-3
                                        py-1.5
                                        text-[9px]
                                        font-black
                                        text-cyan-200
                                    "
                                >
                                    {outlineCourse.group}
                                </span>

                                <h2
                                    className="
                                        mt-3
                                        text-xl
                                        font-black
                                        leading-8
                                        text-white
                                        sm:text-2xl
                                    "
                                >
                                    سرفصل‌های {outlineCourse.title}
                                </h2>

                                <p
                                    className="
                                        mt-1
                                        text-[10px]
                                        text-slate-500
                                        sm:text-xs
                                    "
                                >
                                    {outlineCourse.duration}
                                    {" · "}
                                    {outlineCourse.format}
                                </p>
                            </div>
                        </div>

                        <div
                            className="
                                mt-6
                                rounded-[20px]
                                border
                                border-white/[0.08]
                                bg-white/[0.03]
                                p-4
                            "
                        >
                            <span
                                className="
                                    text-[9px]
                                    font-black
                                    text-orange-300
                                "
                            >
                                محور اصلی دوره
                            </span>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    font-bold
                                    leading-7
                                    text-white
                                "
                            >
                                {outlineCourse.subtitle}
                            </p>
                        </div>

                        <div
                            className="
                                mt-3
                                rounded-[20px]
                                border
                                border-dashed
                                border-white/[0.10]
                                bg-white/[0.02]
                                p-4
                            "
                        >
                            <div
                                className="
                                    flex
                                    gap-3
                                "
                            >
                                <span
                                    className="
                                        mt-0.5
                                        flex
                                        h-7
                                        w-7
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-orange-400/[0.10]
                                        text-[11px]
                                        font-black
                                        text-orange-300
                                    "
                                >
                                    i
                                </span>

                                <p
                                    className="
                                        text-[10px]
                                        leading-6
                                        text-slate-400
                                        sm:text-xs
                                        sm:leading-7
                                    "
                                >
                                    سرفصل تفصیلی این دوره در اطلاعات فعلی
                                    پوستر درج نشده است. برای دریافت برنامه
                                    کامل آموزشی و جزئیات سرفصل‌ها، درخواست
                                    برگزاری دوره را ثبت کنید.
                                </p>
                            </div>
                        </div>

                        <div
                            className="
                                mt-5
                                grid
                                grid-cols-[0.85fr_1.15fr]
                                gap-2
                            "
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    const course = outlineCourse;
                                    setOutlineCourse(null);
                                    setTimeout(
                                        () => setPreviewCourse(course),
                                        80
                                    );
                                }}
                                className="
                                    flex
                                    min-h-[48px]
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-white/10
                                    bg-white/[0.04]
                                    px-3
                                    text-[10px]
                                    font-black
                                    text-slate-200
                                    transition
                                    hover:bg-white/[0.08]
                                    sm:text-xs
                                "
                            >
                                مشاهده پوستر
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    const title = outlineCourse.title;
                                    setOutlineCourse(null);
                                    setTimeout(
                                        () => requestCourse(title),
                                        80
                                    );
                                }}
                                className="
                                    flex
                                    min-h-[48px]
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-full
                                    bg-orange-400
                                    px-3
                                    text-[10px]
                                    font-black
                                    text-[#06192E]
                                    transition
                                    hover:bg-orange-300
                                    sm:text-xs
                                "
                            >
                                درخواست برگزاری
                                <ArrowIcon />
                            </button>
                        </div>
                    </Modal>
                )}
            </AnimatePresence>
        </>
    );
}


/* =========================================================
   GENERIC UI
========================================================= */

function Input(
    props:
        React.InputHTMLAttributes<HTMLInputElement>
) {
    return (
        <input
            {...props}
            className="
        h-14
        rounded-2xl
        border
        border-white/10
        bg-white/[0.04]
        px-4
        text-sm
        outline-none
        placeholder:text-slate-500
        focus:border-orange-400/40
      "
        />
    );
}


function Modal({
    children,
    close,
}: {
    children:
    React.ReactNode;

    close: () => void;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            onClick={close}
            className="
        fixed
        inset-0
        z-[700]
        flex
        items-end
        justify-center
        bg-[#020812]/85
        backdrop-blur-md
        sm:items-center
        sm:p-5
      "
        >
            <motion.div
                initial={{
                    y: 80,
                    opacity: 0,
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                exit={{
                    y: 60,
                    opacity: 0,
                }}
                onClick={(
                    event
                ) =>
                    event.stopPropagation()
                }
                className="
          relative
          max-h-[92vh]
          w-full
          max-w-2xl
          overflow-y-auto
          rounded-t-[32px]
          border
          border-white/10
          bg-[#0B2137]
          p-6
          sm:rounded-[34px]
          sm:p-8
        "
            >
                <button
                    type="button"
                    onClick={close}
                    className="
            absolute
            left-5
            top-5
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-white/[0.05]
          "
                >
                    <CloseIcon />
                </button>

                {children}
            </motion.div>
        </motion.div>
    );
}


function Success() {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 10,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            className="
        py-12
        text-center
      "
        >
            <div
                className="
          mx-auto
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          border
          border-emerald-300/20
          bg-emerald-400/[0.08]
          text-4xl
          text-emerald-300
        "
            >
                ✓
            </div>

            <h2
                className="
          mt-6
          text-2xl
          font-black
        "
            >
                درخواست ثبت شد
            </h2>

            <p
                className="
          mt-3
          text-sm
          leading-8
          text-slate-400
        "
            >
                درخواست با موفقیت در سیستم
                کاردو ثبت شد و قابل پیگیری است.
            </p>
        </motion.div>
    );
}


/* =========================================================
   PAGE CONTENT
========================================================= */

function CoursesContent() {
    const searchParams =
        useSearchParams();

    const rawCategory =
        searchParams.get(
            "category"
        );


    const category:
        Category =
        rawCategory === "oman"
            ? "oman"
            : rawCategory ===
                "organization"
                ? "organization"
                : "technical";


    return (
        <main
            dir="rtl"
            className="
        relative
        min-h-screen
        overflow-x-hidden
        bg-[#06192E]
        text-white
      "
        >
            <div
                className="
          fixed
          inset-0
          -z-20
          bg-gradient-to-b
          from-[#06192E]
          via-[#0A2035]
          to-[#0D2942]
        "
            />

            <Navbar />

            <CategorySwitch
                active={category}
            />


            {category ===
                "organization" ? (
                <OrganizationPage />
            ) : (
                <Catalog
                    category={
                        category
                    }
                />
            )}
        </main>
    );
}


/* =========================================================
   EXPORT
========================================================= */

export default function CoursesPage() {
    return (
        <Suspense
            fallback={
                <main
                    className="
            min-h-screen
            bg-[#06192E]
          "
                />
            }
        >
            <CoursesContent />
        </Suspense>
    );
}