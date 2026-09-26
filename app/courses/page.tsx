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
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    const springX =
        useSpring(rotateX, {
            stiffness: 180,
            damping: 22,
        });

    const springY =
        useSpring(rotateY, {
            stiffness: 180,
            damping: 22,
        });


    function move(
        event: React.MouseEvent<HTMLElement>
    ) {
        if (window.innerWidth < 1024) {
            return;
        }

        const rect =
            event.currentTarget.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) / rect.width;

        const y =
            (event.clientY - rect.top) / rect.height;

        rotateY.set((x - 0.5) * 5);
        rotateX.set((0.5 - y) * 3);
    }


    const image =
        course.image ||
        getTechnicalImage(course, index);


    return (
        <div
            style={{
                perspective: "1200px",
            }}
            className="h-full"
        >
            <motion.article
                initial={{
                    opacity: 0,
                    y: 45,
                    scale: 0.96,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                }}
                viewport={{
                    once: true,
                    amount: 0.1,
                }}
                whileHover={{
                    y: -5,
                }}
                onMouseMove={move}
                onMouseLeave={() => {
                    rotateX.set(0);
                    rotateY.set(0);
                }}
                style={{
                    rotateX: springX,
                    rotateY: springY,
                    transformStyle: "preserve-3d",
                }}
                className={`
          group
          flex
          h-full
          min-h-[400px]
          flex-col
          overflow-hidden
          rounded-[28px]
          border
          backdrop-blur-xl
          transition

          ${oman
                        ? `
                border-cyan-300/[0.10]
                bg-[#09263A]/85
                hover:border-cyan-300/30
              `
                        : `
                border-white/[0.09]
                bg-[#0B2137]/85
                hover:border-orange-400/25
              `
                    }
        `}
            >
                <div
                    className="
            relative
            h-[205px]
            overflow-hidden
          "
                >
                    <Image
                        src={image}
                        alt={course.title}
                        fill
                        sizes="(max-width:768px) 100vw, 33vw"
                        className="
              object-cover
              transition
              duration-700
              group-hover:scale-[1.055]
            "
                    />

                    <div
                        className="
              absolute
              inset-0
              bg-gradient-to-t
              from-[#0B2137]
              via-transparent
              to-transparent
            "
                    />

                    <div
                        className="
              absolute
              left-4
              right-4
              top-4
              flex
              justify-between
              gap-2
            "
                    >
                        <span
                            className="
                max-w-[70%]
                truncate
                rounded-full
                border
                border-white/10
                bg-[#0B2239]/70
                px-3
                py-2
                text-[10px]
                font-bold
                backdrop-blur-xl
              "
                        >
                            {course.group}
                        </span>

                        <span
                            className={`
                rounded-full
                border
                px-3
                py-2
                text-[10px]
                font-black
                backdrop-blur-xl

                ${oman
                                    ? `
                      border-cyan-300/20
                      bg-cyan-300/[0.08]
                      text-cyan-200
                    `
                                    : `
                      border-orange-300/20
                      bg-orange-300/[0.08]
                      text-orange-200
                    `
                                }
              `}
                        >
                            {course.source}
                        </span>
                    </div>
                </div>


                <div
                    className="
            flex
            flex-1
            flex-col
            px-5
            pb-5
            pt-4
          "
                >
                    {course.englishTitle && (
                        <p
                            dir="ltr"
                            className="
                mb-2
                truncate
                text-left
                text-[9px]
                font-bold
                uppercase
                tracking-[1px]
                text-orange-300/70
              "
                        >
                            {course.englishTitle}
                        </p>
                    )}

                    <h2
                        className="
              text-[19px]
              font-black
              leading-8
            "
                    >
                        {course.title}
                    </h2>


                    {course.duration && (
                        <div className="mt-4">
                            <span
                                className="
                  inline-flex
                  rounded-full
                  border
                  border-white/[0.07]
                  bg-white/[0.04]
                  px-3
                  py-2
                  text-[11px]
                  font-bold
                  text-slate-300
                "
                            >
                                {course.duration}
                            </span>
                        </div>
                    )}


                    <div className="flex-1" />


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
                            onClick={() => onTopics(course)}
                            className="
                flex
                items-center
                justify-center
                gap-2
                rounded-[17px]
                border
                border-white/10
                bg-white/[0.04]
                px-3
                py-3.5
                text-xs
                font-bold
                transition
                hover:bg-white/[0.08]
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
                items-center
                justify-between
                gap-2
                rounded-[17px]
                border
                px-4
                py-3.5
                text-xs
                font-black
                transition

                ${oman
                                    ? `
                      border-cyan-300/20
                      bg-cyan-300/[0.07]
                      text-cyan-100
                      hover:bg-cyan-300
                      hover:text-[#06192E]
                    `
                                    : `
                      border-orange-400/25
                      bg-orange-400/[0.08]
                      text-orange-200
                      hover:bg-orange-400
                      hover:text-[#06192E]
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
        </div>
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
            {/* HERO */}

            <section
                className="
          mx-auto
          max-w-[1500px]
          px-4
          pb-7
          pt-8
          sm:px-5
          lg:px-10
        "
            >
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className={`
            relative
            overflow-hidden
            rounded-[34px]
            border
            px-6
            py-10
            backdrop-blur-2xl
            sm:px-10
            lg:px-14

            ${isOman
                            ? `
                  border-cyan-300/[0.10]
                  bg-gradient-to-l
                  from-cyan-300/[0.05]
                  to-white/[0.025]
                `
                            : `
                  border-white/[0.09]
                  bg-white/[0.035]
                `
                        }
          `}
                >
                    <div
                        className="
              grid
              gap-10
              lg:grid-cols-[1fr_480px]
              lg:items-center
            "
                    >
                        <div>
                            <span
                                className={`
                  inline-flex
                  rounded-full
                  border
                  px-4
                  py-2
                  text-xs
                  font-bold

                  ${isOman
                                        ? `
                        border-cyan-300/20
                        bg-cyan-300/[0.07]
                        text-cyan-200
                      `
                                        : `
                        border-orange-400/20
                        bg-orange-400/[0.08]
                        text-orange-300
                      `
                                    }
                `}
                            >
                                {isOman
                                    ? "آموزش‌های بین‌المللی"
                                    : "مجتمع آموزشی کاردو"}
                            </span>


                            <h1
                                className="
                  mt-6
                  text-3xl
                  font-black
                  leading-[1.5]
                  sm:text-5xl
                  lg:text-[56px]
                "
                            >
                                {isOman ? (
                                    <>
                                        دوره‌های{" "}
                                        <span
                                            className="
                        text-cyan-300
                      "
                                        >
                                            عمان
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        دوره‌های{" "}
                                        <span
                                            className="
                        text-orange-400
                      "
                                        >
                                            فنی و حرفه‌ای
                                        </span>
                                    </>
                                )}
                            </h1>


                            <p
                                className="
                  mt-4
                  max-w-2xl
                  text-sm
                  leading-8
                  text-slate-300
                  sm:text-base
                "
                            >
                                {isOman
                                    ? "دوره‌های تخصصی هوانوردی، عملیات فرودگاهی، آتش‌نشانی و واکنش در شرایط اضطراری."
                                    : "دوره موردنظر خود را جستجو کنید، اطلاعات آن را بررسی کنید و درخواست دوره را ارسال کنید."}
                            </p>
                        </div>


                        <div
                            className="
                relative
                rounded-[22px]
                border
                border-white/10
                bg-[#06192E]/50
                p-2
              "
                        >
                            <span
                                className="
                  absolute
                  right-6
                  top-1/2
                  -translate-y-1/2
                  text-slate-500
                "
                            >
                                <SearchIcon />
                            </span>

                            <input
                                value={search}
                                onChange={(
                                    event
                                ) =>
                                    setSearch(
                                        event.target.value
                                    )
                                }
                                placeholder={
                                    isOman
                                        ? "مثلاً Airport، NFPA 1003..."
                                        : "مثلاً NFPA، HSE، IOSH..."
                                }
                                className="
                  h-16
                  w-full
                  rounded-[17px]
                  bg-white/[0.03]
                  pr-12
                  pl-5
                  text-sm
                  outline-none
                  placeholder:text-slate-500
                "
                            />
                        </div>
                    </div>
                </motion.div>
            </section>


            {/* FILTER */}

            <div
                className="
          sticky
          top-0
          z-[100]
          border-y
          border-white/[0.06]
          bg-[#06192E]/90
          backdrop-blur-2xl
        "
            >
                <div
                    className="
            mx-auto
            flex
            max-w-[1500px]
            gap-2
            overflow-x-auto
            px-4
            py-3
            lg:px-10
          "
                >
                    {groups.map(
                        (group) => (
                            <button
                                key={group}
                                onClick={() =>
                                    setActiveGroup(
                                        group
                                    )
                                }
                                className={`
                  shrink-0
                  rounded-full
                  border
                  px-4
                  py-2.5
                  text-xs
                  font-bold

                  ${activeGroup ===
                                        group
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
                        `
                                        : `
                        border-white/10
                        bg-white/[0.04]
                        text-slate-300
                      `
                                    }
                `}
                            >
                                {group}
                            </button>
                        )
                    )}
                </div>
            </div>


            {/* COURSES */}

            <section
                className="
          mx-auto
          max-w-[1500px]
          px-4
          pb-32
          pt-10
          lg:px-10
        "
            >
                <div
                    className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
          "
                >
                    {filtered.map(
                        (course, index) => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                index={index}
                                oman={isOman}
                                onRequest={(
                                    item
                                ) => {
                                    setSelectedCourse(
                                        item
                                    );
                                    setSubmitted(
                                        false
                                    );
                                    setError("");
                                }}
                                onTopics={
                                    setTopicsCourse
                                }
                            />
                        )
                    )}
                </div>
            </section>


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
        duration: "۴ ساعت",
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
                    result.message ||
                    "ثبت درخواست انجام نشد."
                );
            }

            setSuccess(true);
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
            {/* =====================================================
            HERO
        ====================================================== */}

            <section
                className="
            mx-auto
            max-w-[1500px]
            px-3
            pb-8
            pt-5
            sm:px-4
            sm:pb-12
            sm:pt-8
            lg:px-10
          "
            >
                <div
                    className="
              relative
              overflow-hidden
              rounded-[28px]
              border
              border-cyan-300/[0.10]
              bg-gradient-to-bl
              from-cyan-300/[0.08]
              via-white/[0.035]
              to-orange-400/[0.05]
              px-5
              py-9
              sm:rounded-[38px]
              sm:px-8
              sm:py-14
              lg:px-16
              lg:py-20
            "
                >
                    {/* background glows */}

                    <div
                        className="
                pointer-events-none
                absolute
                -right-32
                -top-32
                h-[360px]
                w-[360px]
                rounded-full
                bg-cyan-300/[0.08]
                blur-[120px]
              "
                    />

                    <div
                        className="
                pointer-events-none
                -bottom-32
                -left-32
                absolute
                h-[360px]
                w-[360px]
                rounded-full
                bg-orange-300/[0.08]
                blur-[120px]
              "
                    />

                    <div
                        className="
                relative
                grid
                gap-10
                lg:grid-cols-[1.05fr_.95fr]
                lg:items-center
              "
                    >
                        {/* CONTENT */}

                        <div>
                            <span
                                className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-cyan-300/20
                    bg-cyan-300/[0.07]
                    px-3.5
                    py-2
                    text-[10px]
                    font-black
                    text-cyan-200
                    sm:px-4
                    sm:text-xs
                  "
                            >
                                <span
                                    className="
                      h-2
                      w-2
                      rounded-full
                      bg-orange-400
                    "
                                />

                                آموزش اختصاصی سازمان‌ها
                            </span>

                            <h1
                                className="
                    mt-5
                    text-[31px]
                    font-black
                    leading-[1.6]
                    text-white
                    sm:text-5xl
                    lg:text-[60px]
                  "
                            >
                                آموزش متناسب با{" "}

                                <span
                                    className="
                      bg-gradient-to-l
                      from-cyan-300
                      via-white
                      to-orange-300
                      bg-clip-text
                      text-transparent
                    "
                                >
                                    نیاز واقعی سازمان
                                </span>
                            </h1>

                            <p
                                className="
                    mt-4
                    max-w-2xl
                    text-xs
                    leading-7
                    text-slate-300
                    sm:mt-6
                    sm:text-base
                    sm:leading-8
                  "
                            >
                                بخشی از فعالیت‌های کاردو به طراحی و اجرای
                                آموزش‌های تخصصی برای سازمان‌ها، شرکت‌ها و
                                مجموعه‌های صنعتی اختصاص دارد. در ادامه
                                نمونه‌ای از دوره‌های برگزارشده را مشاهده می‌کنید.
                            </p>

                            <a
                                href="#completed-organization-courses"
                                className="
                    mt-6
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-2xl
                    bg-orange-400
                    px-5
                    py-4
                    text-xs
                    font-black
                    text-[#06192E]
                    transition
                    hover:bg-orange-300
  
                    sm:w-auto
                    sm:rounded-full
                    sm:px-7
                    sm:text-sm
                  "
                            >
                                مشاهده دوره‌های برگزارشده

                                <span>↓</span>
                            </a>
                        </div>

                        {/* DESKTOP PANEL */}

                        <div
                            className="
                  relative
                  hidden
                  min-h-[350px]
                  lg:block
                "
                        >
                            <div
                                className="
                    absolute
                    inset-8
                    rotate-[-4deg]
                    rounded-[36px]
                    border
                    border-cyan-300/10
                    bg-cyan-300/[0.035]
                  "
                            />

                            <div
                                className="
                    absolute
                    inset-8
                    rotate-[4deg]
                    rounded-[36px]
                    border
                    border-orange-300/10
                    bg-orange-300/[0.035]
                  "
                            />

                            <div
                                className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    rounded-[36px]
                    border
                    border-white/[0.10]
                    bg-[#0B2137]/75
                    p-8
                    backdrop-blur-2xl
                  "
                            >
                                <div
                                    className="
                      grid
                      w-full
                      grid-cols-2
                      gap-4
                    "
                                >
                                    {[
                                        ["12+", "نمونه دوره برگزارشده"],
                                        ["HSE", "ایمنی و محیط زیست"],
                                        ["FIRE", "آتش‌نشانی تخصصی"],
                                        ["RESCUE", "امداد و نجات"],
                                    ].map((item, index) => (
                                        <div
                                            key={item[0]}
                                            className="
                          rounded-[24px]
                          border
                          border-white/[0.07]
                          bg-white/[0.04]
                          p-5
                        "
                                        >
                                            <span
                                                className={`
                            text-3xl
                            font-black
                            ${index % 2 === 0
                                                        ? "text-orange-300"
                                                        : "text-cyan-300"
                                                    }
                          `}
                                            >
                                                {item[0]}
                                            </span>

                                            <p
                                                className="
                            mt-2
                            text-xs
                            leading-6
                            text-slate-300
                          "
                                            >
                                                {item[1]}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* =====================================================
            TITLE
        ====================================================== */}

            <section
                id="completed-organization-courses"
                className="
            mx-auto
            max-w-[1450px]
            scroll-mt-28
            px-4
            pb-6
            pt-12
            sm:pb-10
            sm:pt-16
            lg:px-10
          "
            >
                <div>
                    <div
                        className="
                flex
                items-center
                gap-2
              "
                    >
                        <span
                            className="
                  h-2
                  w-2
                  rounded-full
                  bg-orange-400
                "
                        />

                        <span
                            className="
                  text-[9px]
                  font-black
                  tracking-[0.15em]
                  text-orange-300
                  sm:text-xs
                "
                        >
                            RECENT TRAININGS
                        </span>
                    </div>

                    <h2
                        className="
                mt-3
                text-2xl
                font-black
                leading-[1.7]
                text-white
                sm:text-4xl
                lg:text-5xl
              "
                    >
                        برخی از دوره‌های اخیر
                        <br className="sm:hidden" />{" "}
                        <span className="text-orange-400">
                            برگزارشده
                        </span>
                    </h2>

                    <p
                        className="
                mt-3
                text-xs
                leading-7
                text-slate-400
                sm:max-w-2xl
                sm:text-sm
                sm:leading-8
              "
                    >
                        دوره را انتخاب کنید تا اطلاعات مدرس، مدت و
                        نوع آموزش را سریع مشاهده کنید.
                    </p>
                </div>
            </section>


            {/* =====================================================
            MOBILE COURSE LIST
        ====================================================== */}

            <section
                className="
            mx-auto
            max-w-[1450px]
            px-3
            pb-20
            sm:px-4
            lg:hidden
          "
            >
                <div className="space-y-3">
                    {completedOrganizationCourses.map(
                        (course, index) => (
                            <motion.article
                                key={course.id}
                                initial={{
                                    opacity: 0,
                                    y: 15,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                    amount: 0.15,
                                }}
                                transition={{
                                    duration: 0.35,
                                }}
                                className="
                    relative
                    overflow-hidden
                    rounded-[22px]
                    border
                    border-white/[0.08]
                    bg-white/[0.035]
                    p-2.5
                  "
                            >
                                <div
                                    className="
                      grid
                      grid-cols-[105px_1fr]
                      gap-3
                    "
                                >
                                    {/* IMAGE */}

                                    <div
                                        className="
                        relative
                        h-[125px]
                        overflow-hidden
                        rounded-[17px]
                        bg-[#0B2137]
                      "
                                    >
                                        <Image
                                            src={course.image}
                                            alt={course.title}
                                            fill
                                            sizes="105px"
                                            className="object-cover"
                                        />

                                        <div
                                            className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-[#06192E]/60
                          to-transparent
                        "
                                        />

                                        <div
                                            className="
                          absolute
                          bottom-2
                          right-2
                          rounded-full
                          bg-[#06192E]/80
                          px-2
                          py-1
                          text-[8px]
                          font-black
                          text-white
                          backdrop-blur-md
                        "
                                        >
                                            {String(index + 1).padStart(
                                                2,
                                                "0"
                                            )}
                                        </div>
                                    </div>


                                    {/* CONTENT */}

                                    <div
                                        className="
                        flex
                        min-w-0
                        flex-col
                        justify-center
                      "
                                    >
                                        <span
                                            className="
                          w-fit
                          rounded-full
                          border
                          border-cyan-300/15
                          bg-cyan-300/[0.06]
                          px-2.5
                          py-1
                          text-[8px]
                          font-black
                          text-cyan-200
                        "
                                        >
                                            {course.group}
                                        </span>

                                        <h3
                                            className="
                          mt-2
                          line-clamp-2
                          text-sm
                          font-black
                          leading-6
                          text-white
                        "
                                        >
                                            {course.title}
                                        </h3>

                                        <p
                                            className="
                          mt-1
                          line-clamp-1
                          text-[10px]
                          text-slate-500
                        "
                                        >
                                            {course.subtitle}
                                        </p>

                                        <div
                                            className="
                          mt-3
                          flex
                          flex-wrap
                          gap-x-3
                          gap-y-1
                          text-[9px]
                          text-slate-400
                        "
                                        >
                                            <span>
                                                👤 {course.instructor}
                                            </span>

                                            <span>
                                                ⏱ {course.duration}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* BOTTOM INFO */}

                                <div
                                    className="
                      mt-2.5
                      flex
                      items-center
                      justify-between
                      rounded-[15px]
                      bg-white/[0.025]
                      px-3
                      py-2.5
                    "
                                >
                                    <div
                                        className="
                        flex
                        items-center
                        gap-2
                      "
                                    >
                                        <span
                                            className="
                          h-1.5
                          w-1.5
                          rounded-full
                          bg-emerald-300
                        "
                                        />

                                        <span
                                            className="
                          text-[9px]
                          font-bold
                          text-emerald-200
                        "
                                        >
                                            برگزارشده
                                        </span>
                                    </div>

                                    <span
                                        className="
                        text-[9px]
                        font-black
                        text-orange-200
                      "
                                    >
                                        {course.format}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        requestCourse(course.title)
                                    }
                                    className="
                      mt-2.5
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-[15px]
                      bg-orange-400
                      px-4
                      py-3
                      text-[11px]
                      font-black
                      text-[#06192E]
                      transition
                      hover:bg-orange-300
                    "
                                >
                                    درخواست این دوره
                                    <ArrowIcon />
                                </button>
                            </motion.article>
                        )
                    )}
                </div>
            </section>


            {/* =====================================================
            DESKTOP COURSE GRID
        ====================================================== */}

            <section
                className="
            mx-auto
            hidden
            max-w-[1450px]
            px-4
            pb-24
            lg:block
            lg:px-10
          "
            >
                <div
                    className="
              grid
              gap-5
              lg:grid-cols-3
            "
                >
                    {completedOrganizationCourses.map(
                        (course, index) => (
                            <motion.article
                                key={course.id}
                                initial={{
                                    opacity: 0,
                                    y: 35,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                    amount: 0.15,
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay:
                                        (index % 3) *
                                        0.08,
                                }}
                                className="
                    group
                    relative
                    overflow-hidden
                    rounded-[30px]
                    border
                    border-white/[0.08]
                    bg-white/[0.035]
                    p-2
                    transition
                    duration-500
  
                    hover:-translate-y-2
                    hover:border-orange-300/20
                    hover:bg-white/[0.055]
                  "
                            >
                                {/* IMAGE */}

                                <div
                                    className="
                      relative
                      aspect-square
                      overflow-hidden
                      rounded-[24px]
                      bg-[#0B2137]
                    "
                                >
                                    <Image
                                        src={course.image}
                                        alt={course.title}
                                        fill
                                        sizes="33vw"
                                        className="
                        object-cover
                        transition
                        duration-700
                        group-hover:scale-[1.04]
                      "
                                    />

                                    <div
                                        className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-[#06192E]/85
                        via-transparent
                        to-transparent
                      "
                                    />

                                    <div
                                        className="
                        absolute
                        left-4
                        top-4
                        rounded-full
                        border
                        border-white/10
                        bg-[#06192E]/80
                        px-3
                        py-2
                        text-[10px]
                        font-black
                        text-white
                      "
                                    >
                                        {String(index + 1).padStart(
                                            2,
                                            "0"
                                        )}
                                    </div>
                                </div>


                                {/* CONTENT */}

                                <div
                                    className="
                      px-4
                      pb-5
                      pt-5
                    "
                                >
                                    <span
                                        className="
                        rounded-full
                        border
                        border-cyan-300/15
                        bg-cyan-300/[0.06]
                        px-3
                        py-1.5
                        text-[10px]
                        font-black
                        text-cyan-200
                      "
                                    >
                                        {course.group}
                                    </span>

                                    <h3
                                        className="
                        mt-5
                        text-xl
                        font-black
                        leading-8
                        text-white
                      "
                                    >
                                        {course.title}
                                    </h3>

                                    <p
                                        className="
                        mt-2
                        min-h-[48px]
                        text-xs
                        leading-6
                        text-slate-400
                      "
                                    >
                                        {course.subtitle}
                                    </p>

                                    <div
                                        className="
                        my-5
                        h-px
                        bg-white/[0.07]
                      "
                                    />

                                    <div
                                        className="
                        grid
                        grid-cols-2
                        gap-3
                      "
                                    >
                                        <div
                                            className="
                          rounded-2xl
                          bg-white/[0.025]
                          p-3
                        "
                                        >
                                            <span
                                                className="
                            text-[9px]
                            text-slate-500
                          "
                                            >
                                                مدرس
                                            </span>

                                            <p
                                                className="
                            mt-1
                            text-xs
                            font-black
                            leading-6
                            text-slate-200
                          "
                                            >
                                                {course.instructor}
                                            </p>
                                        </div>

                                        <div
                                            className="
                          rounded-2xl
                          bg-white/[0.025]
                          p-3
                        "
                                        >
                                            <span
                                                className="
                            text-[9px]
                            text-slate-500
                          "
                                            >
                                                مدت
                                            </span>

                                            <p
                                                className="
                            mt-1
                            text-xs
                            font-black
                            text-slate-200
                          "
                                            >
                                                {course.duration}
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        className="
                        mt-3
                        flex
                        items-center
                        justify-between
                        rounded-2xl
                        bg-white/[0.025]
                        px-4
                        py-3
                      "
                                    >
                                        <span
                                            className="
                          text-[10px]
                          text-slate-500
                        "
                                        >
                                            شیوه آموزش
                                        </span>

                                        <span
                                            className="
                          text-xs
                          font-black
                          text-orange-200
                        "
                                        >
                                            {course.format}
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            requestCourse(course.title)
                                        }
                                        className="
                        mt-4
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        bg-orange-400
                        px-4
                        py-3.5
                        text-xs
                        font-black
                        text-[#06192E]
                        transition
                        hover:bg-orange-300
                      "
                                    >
                                        درخواست این دوره
                                        <ArrowIcon />
                                    </button>
                                </div>
                            </motion.article>
                        )
                    )}
                </div>
            </section>


            {/* =====================================================
            PROCESS
        ====================================================== */}

            <section
                className="
            mx-auto
            max-w-[1300px]
            px-4
            pb-24
            pt-6
            sm:pb-32
            sm:pt-10
            lg:px-10
          "
            >
                <div
                    className="
              mb-7
              text-center
              sm:mb-10
            "
                >
                    <span
                        className="
                text-[10px]
                font-black
                text-cyan-300
                sm:text-xs
              "
                    >
                        آموزش سازمانی در کاردو
                    </span>

                    <h2
                        className="
                mt-3
                text-2xl
                font-black
                text-white
                sm:text-3xl
              "
                    >
                        فرآیند اجرای دوره اختصاصی
                    </h2>
                </div>

                <div
                    className="
              grid
              gap-3
              sm:gap-5
              md:grid-cols-3
            "
                >
                    {[
                        {
                            number: "01",
                            title: "نیازسنجی",
                            text: "نیاز آموزشی و سطح تخصص شرکت‌کنندگان بررسی می‌شود.",
                        },

                        {
                            number: "02",
                            title: "طراحی آموزش",
                            text: "ساختار دوره متناسب با شرایط مجموعه تنظیم می‌شود.",
                        },

                        {
                            number: "03",
                            title: "اجرای دوره",
                            text: "آموزش توسط مدرس تخصصی به‌صورت نظری یا عملی اجرا می‌شود.",
                        },
                    ].map((step) => (
                        <div
                            key={step.number}
                            className="
                  rounded-[22px]
                  border
                  border-white/[0.07]
                  bg-white/[0.03]
                  p-5
                  sm:rounded-[28px]
                  sm:p-7
                "
                        >
                            <span
                                className="
                    text-3xl
                    font-black
                    text-orange-300/30
                  "
                            >
                                {step.number}
                            </span>

                            <h3
                                className="
                    mt-4
                    text-base
                    font-black
                    text-white
                    sm:text-xl
                  "
                            >
                                {step.title}
                            </h3>

                            <p
                                className="
                    mt-2
                    text-xs
                    leading-7
                    text-slate-400
                    sm:text-sm
                  "
                            >
                                {step.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* =====================================================
                ORGANIZATION REQUEST FORM
            ====================================================== */}

            <section
                id="organization-request"
                className="
          mx-auto
          max-w-[1100px]
          scroll-mt-28
          px-4
          pb-32
          pt-4
          lg:px-10
        "
            >
                <div
                    className="
            relative
            overflow-hidden
            rounded-[34px]
            border
            border-white/[0.09]
            bg-white/[0.035]
            p-5
            sm:p-9
          "
                >
                    <div
                        className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-56
              w-56
              rounded-full
              bg-orange-400/[0.06]
              blur-[80px]
            "
                    />

                    {!success ? (
                        <div className="relative">
                            <span
                                className="
                  inline-flex
                  rounded-full
                  border
                  border-orange-300/20
                  bg-orange-300/[0.07]
                  px-3
                  py-2
                  text-[10px]
                  font-black
                  text-orange-300
                  sm:text-xs
                "
                            >
                                فرم درخواست سازمانی
                            </span>

                            <h2
                                className="
                  mt-4
                  text-2xl
                  font-black
                  leading-[1.6]
                  text-white
                  sm:text-3xl
                "
                            >
                                درخواست دوره اختصاصی برای سازمان
                            </h2>

                            <p
                                className="
                  mt-3
                  max-w-2xl
                  text-xs
                  leading-7
                  text-slate-400
                  sm:text-sm
                "
                            >
                                یکی از دوره‌های برگزارشده را انتخاب کنید
                                یا درخواست آموزش اختصاصی جدید برای مجموعه
                                خود ثبت کنید.
                            </p>

                            {selectedOrgCourse && (
                                <div
                                    className="
                    mt-5
                    flex
                    flex-col
                    gap-2
                    rounded-2xl
                    border
                    border-orange-300/15
                    bg-orange-300/[0.05]
                    p-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                                >
                                    <span
                                        className="
                      text-[10px]
                      text-slate-400
                    "
                                    >
                                        دوره انتخاب‌شده
                                    </span>

                                    <strong
                                        className="
                      text-sm
                      text-orange-200
                    "
                                    >
                                        {selectedOrgCourse}
                                    </strong>
                                </div>
                            )}

                            <form
                                onSubmit={submitOrganizationRequest}
                                className="
                  mt-7
                  grid
                  gap-4
                  sm:grid-cols-2
                "
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
                                        setSelectedOrgCourse(
                                            event.target.value
                                        )
                                    }
                                    className="
                    h-14
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#0B2137]
                    px-4
                    text-sm
                    text-white
                    outline-none
                    focus:border-orange-400/40
                  "
                                >
                                    <option value="">
                                        انتخاب دوره یا درخواست جدید
                                    </option>

                                    {completedOrganizationCourses.map(
                                        (course) => (
                                            <option
                                                key={course.id}
                                                value={course.title}
                                            >
                                                {course.title}
                                            </option>
                                        )
                                    )}

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
                    text-sm
                    text-white
                    outline-none
                    focus:border-orange-400/40
                  "
                                >
                                    <option value="">
                                        حوزه آموزشی
                                    </option>
                                    <option value="HSE و ایمنی">
                                        HSE و ایمنی
                                    </option>
                                    <option value="آتش‌نشانی">
                                        آتش‌نشانی
                                    </option>
                                    <option value="مواد خطرناک">
                                        مواد خطرناک
                                    </option>
                                    <option value="امداد و نجات">
                                        امداد و نجات
                                    </option>
                                    <option value="مدیریت بحران">
                                        مدیریت بحران
                                    </option>
                                    <option value="سایر">
                                        سایر
                                    </option>
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
                    text-sm
                    text-white
                    outline-none
                    focus:border-orange-400/40
                    sm:col-span-2
                  "
                                >
                                    <option value="">
                                        محل پیشنهادی برگزاری
                                    </option>
                                    <option value="organization">
                                        محل سازمان / شرکت
                                    </option>
                                    <option value="academy">
                                        مجتمع آموزشی کاردو
                                    </option>
                                    <option value="negotiable">
                                        قابل هماهنگی
                                    </option>
                                </select>

                                <textarea
                                    name="notes"
                                    placeholder="توضیحات درباره نیاز آموزشی، زمان پیشنهادی، تعداد نفرات یا سایر موارد..."
                                    className="
                    min-h-[140px]
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    p-4
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-slate-500
                    focus:border-orange-400/40
                    sm:col-span-2
                  "
                                />

                                {error && (
                                    <div
                                        className="
                      rounded-2xl
                      border
                      border-red-300/10
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
                                    type="submit"
                                    disabled={submitting}
                                    className="
                    flex
                    min-h-14
                    items-center
                    justify-center
                    gap-3
                    rounded-2xl
                    bg-orange-400
                    px-6
                    py-4
                    text-sm
                    font-black
                    text-[#06192E]
                    transition
                    hover:bg-orange-300
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    sm:col-span-2
                    sm:rounded-full
                  "
                                >
                                    {submitting
                                        ? "در حال ثبت درخواست..."
                                        : "ارسال درخواست سازمانی"}

                                    {!submitting && <ArrowIcon />}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div
                            className="
                relative
                py-10
              "
                        >
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
                  transition
                  hover:bg-white/[0.08]
                "
                            >
                                ثبت درخواست جدید
                            </button>
                        </div>
                    )}
                </div>
            </section>
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