"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* =========================================================
   COURSE CATEGORIES
========================================================= */

const courses = [
    {
        number: "01",

        title: "دوره‌های اختصاصی سازمان‌ها",

        icon: "/images/02.png",

        text: "طراحی و اجرای دوره‌های آموزشی اختصاصی متناسب با نیاز شرکت‌ها، سازمان‌ها و تیم‌های حرفه‌ای",

        tags: [
            "نیازسنجی آموزشی",
            "طراحی اختصاصی",
            "آموزش سازمانی",
        ],

        image: "/images/education.png",

        link: "/courses?category=organization",
    },

    {
        number: "02",

        title: "دوره‌های بین‌المللی",

        icon: "/images/03.png",

        text: "دوره‌های تخصصی و حرفه‌ای با رویکرد بین‌المللی در حوزه‌های ایمنی، آتش‌نشانی، هوانوردی و واکنش در شرایط اضطراری",

        tags: [
            "آموزش بین‌المللی",
            "هوانوردی",
            "آتش‌نشانی تخصصی",
        ],

        image: "/images/lacw.png",

        link: "/courses?category=international",
    },

    {
        number: "03",

        title: "دوره‌های فنی و حرفه‌ای",

        icon: "/images/01.png",

        text: "دوره‌های مهارتی، تخصصی و کاربردی در حوزه HSE، ایمنی، آتش‌نشانی و توسعه مهارت‌های حرفه‌ای",

        tags: [
            "HSE و ایمنی",
            "آتش‌نشانی",
            "مهارت‌های تخصصی",
        ],

        image: "/images/hsecourse.png",

        link: "/courses?category=technical",
    },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function Courses() {
    return (
        <section
            id="courses"
            dir="rtl"
            className="
        relative
        min-h-screen
        overflow-hidden
        bg-gradient-to-b
        from-[#07192d]
        via-[#102b47]
        to-[#07192d]
        px-5
        pb-24
        pt-10
        lg:px-24
      "
        >
            {/* =====================================================
          TOP CONNECTION
      ====================================================== */}

            <div
                className="
          pointer-events-none
          absolute
          left-0
          right-0
          top-0
          h-72
          bg-gradient-to-b
          from-[#0b2038]
          via-[#102b47]/70
          to-transparent
        "
            />

            {/* =====================================================
          BACKGROUND GLOWS
      ====================================================== */}

            <div
                className="
          pointer-events-none
          absolute
          right-0
          top-40
          h-[650px]
          w-[650px]
          rounded-full
          bg-orange-400/10
          blur-[180px]
        "
            />

            <div
                className="
          pointer-events-none
          absolute
          -left-[200px]
          bottom-[150px]
          h-[550px]
          w-[550px]
          rounded-full
          bg-cyan-300/[0.06]
          blur-[180px]
        "
            />

            {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

            <div
                className="
          relative
          z-10
          mx-auto
          max-w-7xl
        "
            >
                {/* =================================================
            HEADER
        ================================================== */}

                <div
                    className="
            mb-10
            text-center
          "
                >
                    <p
                        className="
              mb-5
              text-xs
              font-bold
              tracking-[6px]
              text-orange-400
            "
                    >
                        OUR COURSES
                    </p>

                    <h2
                        className="
              text-4xl
              font-black
              text-white
              lg:text-6xl
            "
                    >
                        مسیرهای آموزشی{" "}
                        <span className="text-orange-400">
                            کاردو
                        </span>
                    </h2>

                    <p
                        className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-8
              text-slate-300
              sm:text-base
            "
                    >
                        آموزش تخصصی برای سازمان‌ها، مسیرهای بین‌المللی
                        و توسعه مهارت‌های حرفه‌ای
                    </p>
                </div>

                {/* =================================================
            COURSES TIMELINE
        ================================================== */}

                <div className="relative">
                    {/* VERTICAL LINE */}

                    <div
                        className="
              absolute
              bottom-10
              right-[80px]
              top-10
              hidden
              w-[2px]
              bg-gradient-to-b
              from-transparent
              via-orange-400/40
              to-transparent
              lg:block
            "
                    />

                    {/* =================================================
              COURSE ITEMS
          ================================================== */}

                    {courses.map((course, index) => (
                        <motion.div
                            key={course.number}
                            initial={{
                                opacity: 0,
                                y: 40,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{
                                once: false,
                                amount: 0.2,
                            }}
                            transition={{
                                duration: 0.7,
                                delay: index * 0.15,
                            }}
                            className="
                relative
                grid
                grid-cols-1
                items-center
                gap-8
                rounded-[35px]
                border-b
                border-white/5
                px-5
                py-14
                transition-all
                duration-500

                hover:bg-white/[0.03]

                lg:grid-cols-[100px_1fr_420px_80px]
                lg:gap-10
              "
                        >
                            {/* =============================================
                  TIMELINE NUMBER
              ============================================== */}

                            <div
                                className="
                  z-10
                  hidden
                  justify-center
                  lg:flex
                "
                            >
                                <div
                                    className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-orange-400/70
                    bg-white/10
                    text-xl
                    font-black
                    text-orange-400
                    backdrop-blur-xl
                  "
                                >
                                    {course.number}
                                </div>
                            </div>

                            {/* =============================================
                  CONTENT
              ============================================== */}

                            <div>
                                <p
                                    className="
                    mb-4
                    text-xs
                    font-bold
                    uppercase
                    tracking-[5px]
                    text-orange-400
                  "
                                >
                                    COURSE / {course.number}
                                </p>

                                <div
                                    className="
                    flex
                    items-center
                    gap-4
                  "
                                >
                                    {/* ICON */}

                                    <div
                                        className="
                      flex
                      h-14
                      w-14
                      shrink-0
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-2xl
                      border
                      border-orange-400/20
                      bg-orange-400/10
                    "
                                    >
                                        <Image
                                            src={course.icon}
                                            alt=""
                                            width={35}
                                            height={35}
                                            className="
                        h-auto
                        w-[35px]
                        object-contain
                      "
                                        />
                                    </div>

                                    {/* TITLE */}

                                    <h3
                                        className="
                      text-2xl
                      font-black
                      leading-[1.6]
                      text-white
                      lg:text-3xl
                    "
                                    >
                                        {course.title}
                                    </h3>
                                </div>

                                {/* DESCRIPTION */}

                                <p
                                    className="
                    mt-5
                    max-w-2xl
                    text-sm
                    leading-8
                    text-slate-300
                    sm:text-base
                  "
                                >
                                    {course.text}
                                </p>

                                {/* TAGS */}

                                <div
                                    className="
                    mt-6
                    flex
                    flex-wrap
                    gap-x-5
                    gap-y-3
                    text-sm
                    text-slate-400
                  "
                                >
                                    {course.tags.map((tag) => (
                                        <span
                                            key={tag}
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
                          bg-orange-400
                        "
                                            />

                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* MOBILE BUTTON */}

                                <div className="mt-8 lg:hidden">
                                    <Link
                                        href={course.link}
                                        className="
                      inline-flex
                      items-center
                      gap-3
                      rounded-full
                      border
                      border-orange-400/30
                      bg-orange-400/[0.08]
                      px-5
                      py-3
                      text-xs
                      font-black
                      text-orange-300
                      transition
                      duration-300

                      hover:bg-orange-400
                      hover:text-[#07192d]
                    "
                                    >
                                        مشاهده دوره‌ها

                                        <span>←</span>
                                    </Link>
                                </div>
                            </div>

                            {/* =============================================
                  IMAGE
              ============================================== */}

                            <div
                                className="
                  group
                  relative
                  h-[240px]
                  overflow-hidden
                  rounded-[26px]
                  lg:h-[280px]
                  lg:rounded-none
                  lg:[clip-path:polygon(8%_0,100%_0,92%_100%,0_100%)]
                "
                            >
                                <Image
                                    src={course.image}
                                    alt={course.title}
                                    fill
                                    sizes="
                    (max-width: 768px) 100vw,
                    420px
                  "
                                    className="
                    object-cover
                    transition
                    duration-700
                    group-hover:scale-110
                  "
                                />

                                {/* DARK OVERLAY */}

                                <div
                                    className="
                    absolute
                    inset-0
                    bg-gradient-to-r
                    from-[#07192d]/60
                    via-transparent
                    to-orange-500/10
                  "
                                />

                                {/* CATEGORY LABEL */}

                                <div
                                    className="
                    absolute
                    bottom-4
                    right-4
                    rounded-full
                    border
                    border-white/10
                    bg-[#07192d]/80
                    px-4
                    py-2
                    text-[11px]
                    font-black
                    text-white
                    backdrop-blur-xl
                  "
                                >
                                    {course.title}
                                </div>
                            </div>

                            {/* =============================================
                  DESKTOP BUTTON
              ============================================== */}

                            <div
                                className="
                  hidden
                  justify-center
                  lg:flex
                "
                            >
                                <Link
                                    href={course.link}
                                    aria-label={`مشاهده ${course.title}`}
                                    className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-orange-400
                    text-2xl
                    text-orange-400
                    transition
                    duration-300

                    hover:scale-110
                    hover:bg-orange-400
                    hover:text-[#07192d]
                    hover:shadow-[0_10px_40px_rgba(251,146,60,0.25)]
                  "
                                >
                                    ←
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}