"use client";

import Image from "next/image";

import {
    motion,
    useMotionValue,
    useSpring,
} from "framer-motion";

import {
    useEffect,
    useState,
} from "react";


/* =========================================================
   TYPES
========================================================= */

type Expert = {
    id: number;

    name: string;

    title: string;

    subtitle: string;

    image?: string;

    tags: string[];

    accent:
    | "orange"
    | "cyan"
    | "blue";
};


/* =========================================================
   DATA
========================================================= */

const experts: Expert[] = [
    {
        id: 1,

        name:
            "دکتر هاشم ستاره",

        title:
            "رئیس دپارتمان HSE",

        subtitle:
            "مدرس و متخصص حوزه HSE و ایمنی",

        image: "",

        tags: [
            "HSE",
            "ایمنی",
            "مدیریت ایمنی",
        ],

        accent:
            "orange",
    },

    {
        id: 2,

        name:
            "صالح صالحی",

        title:
            "کارشناس ارشد حقوق بین‌الملل",

        subtitle:
            "مدرس دوره‌های حقوقی و قراردادهای بین‌المللی",

        image: "",

        tags: [
            "حقوق بین‌الملل",
            "قراردادها",
            "حقوق",
        ],

        accent:
            "blue",
    },

    {
        id: 3,

        name:
            "دکتر فرجی",

        title:
            "مدرس تخصصی کاردو",

        subtitle:
            "مدرس دوره‌های تخصصی مجتمع آموزشی کاردو",

        image: "",

        tags: [
            "آموزش تخصصی",
            "کاردو",
        ],

        accent:
            "cyan",
    },
];


const AUTO_TIME =
    6000;


/* =========================================================
   HELPERS
========================================================= */

function mod(
    value: number,
    length: number
) {
    return (
        (value % length + length) %
        length
    );
}


function relativePosition(
    index: number,
    active: number,
    length: number
) {
    let delta =
        index - active;

    const half =
        Math.floor(
            length / 2
        );


    if (
        delta > half
    ) {
        delta -= length;
    }


    if (
        delta < -half
    ) {
        delta += length;
    }


    return delta;
}


function getInitials(
    name: string
) {
    const cleanName =
        name
            .replace("دکتر", "")
            .trim();


    const parts =
        cleanName
            .split(" ")
            .filter(Boolean);


    if (
        parts.length === 1
    ) {
        return parts[0]
            .slice(0, 1);
    }


    return (
        parts[0].slice(0, 1) +
        parts[
            parts.length - 1
        ].slice(0, 1)
    );
}


function accentStyles(
    accent:
        Expert["accent"]
) {
    if (
        accent ===
        "orange"
    ) {
        return {
            glow:
                "from-orange-400/40 via-orange-400/10 to-transparent",

            badge:
                "border-orange-400/25 bg-orange-400/10 text-orange-300",

            tag:
                "border-orange-400/20 bg-orange-400/10 text-orange-200",

            dot:
                "bg-orange-400",
        };
    }


    if (
        accent === "blue"
    ) {
        return {
            glow:
                "from-blue-400/40 via-blue-400/10 to-transparent",

            badge:
                "border-blue-400/25 bg-blue-400/10 text-blue-300",

            tag:
                "border-blue-400/20 bg-blue-400/10 text-blue-200",

            dot:
                "bg-blue-400",
        };
    }


    return {
        glow:
            "from-cyan-400/40 via-cyan-400/10 to-transparent",

        badge:
            "border-cyan-400/25 bg-cyan-400/10 text-cyan-300",

        tag:
            "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",

        dot:
            "bg-cyan-400",
    };
}


/* =========================================================
   ARROWS
========================================================= */

function ArrowButton({
    direction,
    onClick,
}: {
    direction:
    | "next"
    | "prev";

    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={
                onClick
            }
            aria-label={
                direction ===
                    "next"
                    ? "مدرس بعدی"
                    : "مدرس قبلی"
            }
            className="
        group
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border
        border-white/[0.10]
        bg-white/[0.045]
        text-white
        backdrop-blur-xl
        transition
        duration-300

        hover:-translate-y-1
        hover:border-orange-400/35
        hover:bg-white/[0.09]
      "
        >
            <span
                className="
          text-xl
          transition
          duration-300

          group-hover:text-orange-300
        "
            >
                {direction ===
                    "next"
                    ? "←"
                    : "→"}
            </span>
        </button>
    );
}


/* =========================================================
   EXPERT CARD
========================================================= */

function ExpertCard({
    expert,
    active,
    onClick,
}: {
    expert: Expert;

    active: boolean;

    onClick: () => void;
}) {
    const accent =
        accentStyles(
            expert.accent
        );


    const rotateX =
        useMotionValue(0);

    const rotateY =
        useMotionValue(0);


    const smoothX =
        useSpring(
            rotateX,
            {
                stiffness: 150,
                damping: 20,
            }
        );


    const smoothY =
        useSpring(
            rotateY,
            {
                stiffness: 150,
                damping: 20,
            }
        );


    function handleMouseMove(
        event:
            React.MouseEvent<HTMLElement>
    ) {
        if (
            !active ||
            window.innerWidth <
            1024
        ) {
            return;
        }


        const rect =
            event.currentTarget
                .getBoundingClientRect();


        const x =
            (event.clientX -
                rect.left) /
            rect.width;


        const y =
            (event.clientY -
                rect.top) /
            rect.height;


        rotateY.set(
            (x - 0.5) * 4
        );


        rotateX.set(
            (0.5 - y) * 3
        );
    }


    function resetTilt() {
        rotateX.set(0);

        rotateY.set(0);
    }


    return (
        <motion.article
            onClick={
                active
                    ? undefined
                    : onClick
            }
            onMouseMove={
                handleMouseMove
            }
            onMouseLeave={
                resetTilt
            }
            whileHover={
                active
                    ? undefined
                    : {
                        scale:
                            1.035,

                        y: -8,
                    }
            }
            style={{
                rotateX:
                    smoothX,

                rotateY:
                    smoothY,

                transformStyle:
                    "preserve-3d",
            }}
            className={`
        group
        relative
        h-full
        w-full
        overflow-hidden
        rounded-[38px]
        border
        p-4
        backdrop-blur-2xl
        transition-[border-color,box-shadow]
        duration-500

        ${active
                    ? `
              cursor-default
              border-white/[0.14]
              bg-white/[0.055]
              shadow-[0_45px_130px_rgba(0,0,0,.34)]
            `
                    : `
              cursor-pointer
              border-white/[0.08]
              bg-white/[0.03]
              shadow-[0_25px_80px_rgba(0,0,0,.18)]

              hover:border-white/[0.18]
              hover:shadow-[0_38px_100px_rgba(0,0,0,.28)]
            `
                }
      `}
        >
            {/* =====================================================
          COLORED OUTER GLOW
      ====================================================== */}

            <div
                className={`
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-br
          ${accent.glow}
          transition
          duration-500

          ${active
                        ? "opacity-30"
                        : "opacity-10 group-hover:opacity-25"
                    }
        `}
            />


            {/* =====================================================
          INNER CARD
      ====================================================== */}

            <div
                className="
          relative
          h-full
          overflow-hidden
          rounded-[32px]
          border
          border-white/[0.08]
          bg-[#081D31]
        "
            >
                {/* ===================================================
            IMAGE
        ==================================================== */}

                {expert.image ? (
                    <Image
                        src={
                            expert.image
                        }
                        alt={
                            expert.name
                        }
                        fill
                        sizes="
              (max-width:1024px)
              100vw,
              430px
            "
                        className="
              object-cover
              transition
              duration-[900ms]

              group-hover:scale-[1.045]
            "
                    />
                ) : (
                    <div
                        className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              bg-gradient-to-br
              from-[#103858]
              via-[#0B263F]
              to-[#061725]
            "
                    >
                        {/* decorative rings */}

                        <div
                            className="
                absolute
                h-[280px]
                w-[280px]
                rounded-full
                border
                border-white/[0.025]
              "
                        />

                        <div
                            className="
                absolute
                h-[220px]
                w-[220px]
                rounded-full
                border
                border-white/[0.035]
              "
                        />


                        <motion.div
                            animate={
                                active
                                    ? {
                                        y: [
                                            0,
                                            -7,
                                            0,
                                        ],
                                    }
                                    : undefined
                            }
                            transition={{
                                duration: 4,

                                repeat:
                                    Infinity,

                                ease:
                                    "easeInOut",
                            }}
                            className="
                relative
                z-10
                flex
                h-36
                w-36
                items-center
                justify-center
                rounded-[36px]
                border
                border-white/10
                bg-white/[0.055]
                text-5xl
                font-black
                text-white/80
                shadow-[0_30px_80px_rgba(0,0,0,.25)]
                backdrop-blur-xl
              "
                        >
                            {getInitials(
                                expert.name
                            )}
                        </motion.div>
                    </div>
                )}


                {/* ===================================================
            DARK GRADIENT
        ==================================================== */}

                <div
                    className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#04111E]
            via-[#06192E]/30
            to-transparent
          "
                />


                {/* ===================================================
            COLOR GLOW
        ==================================================== */}

                <div
                    className={`
            absolute
            -bottom-24
            left-1/2
            h-[340px]
            w-[340px]
            -translate-x-1/2
            rounded-full
            bg-gradient-to-t
            ${accent.glow}
            blur-[85px]
            transition
            duration-500

            ${active
                            ? "opacity-65"
                            : "opacity-25"
                        }
          `}
                />


                {/* ===================================================
            ACTIVE LIGHT SWEEP
        ==================================================== */}

                {active && (
                    <motion.div
                        initial={{
                            x: "-250%",
                        }}
                        animate={{
                            x: "1000%",
                        }}
                        transition={{
                            duration: 6,

                            repeat:
                                Infinity,

                            repeatDelay: 2,

                            ease:
                                "linear",
                        }}
                        className="
              absolute
              -top-20
              h-[130%]
              w-[45px]
              rotate-[17deg]
              bg-white/[0.045]
              blur-xl
            "
                    />
                )}


                {/* ===================================================
            TOP BADGES
        ==================================================== */}

                <div
                    className="
            absolute
            left-4
            right-4
            top-4
            z-20
            flex
            items-start
            justify-between
            gap-2
          "
                >
                    <span
                        className={`
              inline-flex
              max-w-[75%]
              items-center
              gap-2
              rounded-full
              border
              px-3.5
              py-2
              text-[11px]
              font-black
              backdrop-blur-xl

              ${accent.badge}
            `}
                    >
                        <span
                            className={`
                h-2
                w-2
                shrink-0
                rounded-full

                ${accent.dot}
              `}
                        />

                        <span
                            className="
                truncate
              "
                        >
                            {expert.title}
                        </span>
                    </span>


                    <span
                        className="
              shrink-0
              rounded-full
              border
              border-white/[0.10]
              bg-[#06192E]/60
              px-3
              py-2
              text-[10px]
              font-black
              text-white/60
              backdrop-blur-xl
            "
                    >
                        مدرس کاردو
                    </span>
                </div>


                {/* ===================================================
            SIDE CARD HOVER HINT
        ==================================================== */}

                {!active && (
                    <div
                        className="
              pointer-events-none
              absolute
              inset-0
              z-20
              flex
              items-center
              justify-center
              bg-[#06192E]/0
              opacity-0
              transition
              duration-300

              group-hover:bg-[#06192E]/10
              group-hover:opacity-100
            "
                    >
                        <motion.span
                            initial={{
                                scale: 0.9,
                            }}
                            whileInView={{
                                scale: 1,
                            }}
                            className="
                rounded-full
                border
                border-white/[0.15]
                bg-[#06192E]/80
                px-5
                py-3
                text-xs
                font-black
                text-white
                shadow-[0_15px_40px_rgba(0,0,0,.3)]
                backdrop-blur-2xl
              "
                        >
                            کلیک برای نمایش
                        </motion.span>
                    </div>
                )}


                {/* ===================================================
            GLASS INFO
        ==================================================== */}

                <div
                    className="
            absolute
            bottom-5
            left-5
            right-5
            z-30
            rounded-[28px]
            border
            border-white/[0.12]
            bg-white/[0.085]
            p-5
            shadow-[0_25px_70px_rgba(0,0,0,.25)]
            backdrop-blur-2xl
            transition
            duration-500

            group-hover:-translate-y-1

            sm:p-6
          "
                >
                    <div
                        className="
              flex
              items-center
              justify-between
              gap-3
            "
                    >
                        <span
                            className="
                rounded-full
                border
                border-white/[0.06]
                bg-white/[0.06]
                px-3
                py-1.5
                text-[10px]
                font-bold
                text-white/65
              "
                        >
                            تیم آموزشی
                        </span>


                        <span
                            className="
                text-[9px]
                font-black
                tracking-[0.42em]
                text-orange-300
              "
                        >
                            KARDO EXPERT
                        </span>
                    </div>


                    {/* NAME */}

                    <h3
                        className={`
              mt-4
              font-black
              leading-[1.45]
              text-white

              ${active
                                ? `
                    text-[30px]

                    xl:text-[35px]
                  `
                                : `
                    text-[24px]
                  `
                            }
            `}
                    >
                        {expert.name}
                    </h3>


                    {/* TITLE */}

                    <p
                        className="
              mt-2
              text-sm
              font-black
              leading-7
              text-white/80
            "
                    >
                        {expert.title}
                    </p>


                    {/* DESCRIPTION */}

                    <p
                        className="
              mt-3
              line-clamp-2
              text-sm
              leading-7
              text-slate-300
            "
                    >
                        {expert.subtitle}
                    </p>


                    {/* TAGS */}

                    <div
                        className="
              mt-4
              flex
              flex-wrap
              gap-2
            "
                    >
                        {expert.tags.map(
                            (tag) => (
                                <span
                                    key={tag}
                                    className={`
                    rounded-full
                    border
                    px-3
                    py-1.5
                    text-[10px]
                    font-bold

                    ${accent.tag}
                  `}
                                >
                                    {tag}
                                </span>
                            )
                        )}
                    </div>


                    {/* ACTIVE CTA */}

                    {active && (
                        <motion.button
                            initial={{
                                opacity: 0,
                                y: 8,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            type="button"
                            className="
                mt-5
                flex
                items-center
                gap-3
                rounded-full
                border
                border-white/[0.11]
                bg-white/[0.07]
                px-5
                py-3
                text-xs
                font-black
                text-white
                transition

                hover:border-orange-400/30
                hover:bg-orange-400/[0.10]
                hover:text-orange-200
              "
                        >
                            مشاهده مدرس و دوره‌ها

                            <span
                                className="
                  text-base
                "
                            >
                                ←
                            </span>
                        </motion.button>
                    )}
                </div>
            </div>
        </motion.article>
    );
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function WhyKardo() {
    const [
        active,
        setActive,
    ] =
        useState(0);


    const [
        paused,
        setPaused,
    ] =
        useState(false);


    const [
        progressVersion,
        setProgressVersion,
    ] =
        useState(0);


    const [
        touchStart,
        setTouchStart,
    ] =
        useState(0);


    /* ======================================================
       AUTO SLIDE
    ====================================================== */

    useEffect(() => {
        if (paused) {
            return;
        }


        const timer =
            setTimeout(() => {
                setActive(
                    (current) =>
                        mod(
                            current + 1,
                            experts.length
                        )
                );


                setProgressVersion(
                    (current) =>
                        current + 1
                );
            }, AUTO_TIME);


        return () =>
            clearTimeout(
                timer
            );
    }, [
        active,
        paused,
        progressVersion,
    ]);


    /* ======================================================
       SELECT
    ====================================================== */

    function selectExpert(
        index: number
    ) {
        if (
            index === active
        ) {
            return;
        }


        setActive(index);


        setProgressVersion(
            (current) =>
                current + 1
        );
    }


    function next() {
        selectExpert(
            mod(
                active + 1,
                experts.length
            )
        );
    }


    function previous() {
        selectExpert(
            mod(
                active - 1,
                experts.length
            )
        );
    }


    /* ======================================================
       MOBILE SWIPE
    ====================================================== */

    function handleTouchStart(
        event:
            React.TouchEvent<HTMLDivElement>
    ) {
        setTouchStart(
            event.touches[0]
                .clientX
        );


        setPaused(true);
    }


    function handleTouchEnd(
        event:
            React.TouchEvent<HTMLDivElement>
    ) {
        const end =
            event
                .changedTouches[0]
                .clientX;


        const distance =
            end - touchStart;


        if (
            Math.abs(
                distance
            ) > 50
        ) {
            if (
                distance < 0
            ) {
                next();
            } else {
                previous();
            }
        }


        setPaused(false);


        setProgressVersion(
            (current) =>
                current + 1
        );
    }


    return (
        <section
            id="experts"
            dir="rtl"
            className="
        relative
        overflow-hidden
        bg-[#10263D]
        py-20

        sm:py-24

        lg:py-28
      "
        >
            {/* =====================================================
          BACKGROUND
      ====================================================== */}

            <div
                className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
            >
                <div
                    className="
            absolute
            -right-[260px]
            top-0
            h-[650px]
            w-[650px]
            rounded-full
            bg-cyan-400/[0.07]
            blur-[180px]
          "
                />


                <div
                    className="
            absolute
            -left-[260px]
            bottom-0
            h-[650px]
            w-[650px]
            rounded-full
            bg-orange-400/[0.08]
            blur-[180px]
          "
                />


                <div
                    className="
            absolute
            left-1/2
            top-[40%]
            h-[550px]
            w-[550px]
            -translate-x-1/2
            rounded-full
            bg-blue-400/[0.035]
            blur-[170px]
          "
                />


                {/* GRID */}

                <div
                    style={{
                        backgroundImage:
                            `
              linear-gradient(
                rgba(255,255,255,.012) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,.012) 1px,
                transparent 1px
              )
              `,

                        backgroundSize:
                            "90px 90px",
                    }}
                    className="
            absolute
            inset-0
          "
                />
            </div>


            <div
                className="
          relative
          mx-auto
          max-w-[1500px]
          px-4

          sm:px-6

          lg:px-10
        "
            >
                {/* =====================================================
            HEADER
        ====================================================== */}

                <div
                    className="
            mx-auto
            max-w-3xl
            text-center
          "
                >
                    <motion.span
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
                        }}
                        className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-cyan-400/20
              bg-cyan-400/[0.08]
              px-4
              py-2
              text-xs
              font-black
              text-cyan-300
            "
                    >
                        <span
                            className="
                h-2
                w-2
                rounded-full
                bg-cyan-300
              "
                        />

                        مدرسین و متخصصان کاردو
                    </motion.span>


                    <motion.h2
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
                        }}
                        transition={{
                            delay: 0.06,
                        }}
                        className="
              mt-6
              text-4xl
              font-black
              leading-[1.5]
              text-white

              sm:text-5xl

              lg:text-[58px]
            "
                    >
                        تجربه‌ای که پشت{" "}

                        <span
                            className="
                bg-gradient-to-l
                from-orange-300
                via-orange-400
                to-amber-300
                bg-clip-text
                text-transparent
              "
                        >
                            هر آموزش
                        </span>

                        {" "}
                        قرار دارد
                    </motion.h2>


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
                        همراهی مدرسین و متخصصان
                        کاردو در مسیر آموزش‌های
                        تخصصی، حرفه‌ای و کاربردی.
                    </p>
                </div>


                {/* =====================================================
            CONTROLS
        ====================================================== */}

                <div
                    className="
            mx-auto
            mt-10
            flex
            max-w-[1250px]
            items-center
            justify-between
          "
                >
                    <div
                        className="
              hidden
              items-center
              gap-2

              sm:flex
            "
                    >
                        <span
                            className="
                text-sm
                font-black
                text-white
              "
                        >
                            {String(
                                active + 1
                            ).padStart(
                                2,
                                "0"
                            )}
                        </span>


                        <span
                            className="
                text-white/20
              "
                        >
                            /
                        </span>


                        <span
                            className="
                text-sm
                font-bold
                text-white/35
              "
                        >
                            {String(
                                experts.length
                            ).padStart(
                                2,
                                "0"
                            )}
                        </span>
                    </div>


                    <div
                        className="
              mr-auto
              flex
              gap-3
            "
                    >
                        <ArrowButton
                            direction="prev"
                            onClick={
                                previous
                            }
                        />


                        <ArrowButton
                            direction="next"
                            onClick={
                                next
                            }
                        />
                    </div>
                </div>


                {/* =====================================================
            DESKTOP CAROUSEL
        ====================================================== */}

                <div
                    className="
            relative
            mx-auto
            mt-5
            hidden
            h-[700px]
            max-w-[1250px]

            lg:block
          "
                    onMouseEnter={() =>
                        setPaused(true)
                    }
                    onMouseLeave={() => {
                        setPaused(false);


                        setProgressVersion(
                            (current) =>
                                current + 1
                        );
                    }}
                    style={{
                        perspective:
                            "1800px",
                    }}
                >
                    {experts.map(
                        (
                            expert,
                            index
                        ) => {
                            const relative =
                                relativePosition(
                                    index,
                                    active,
                                    experts.length
                                );


                            const isCenter =
                                relative === 0;


                            const x =
                                isCenter
                                    ? 0
                                    : relative <
                                        0
                                        ? -360
                                        : 360;


                            const y =
                                isCenter
                                    ? 0
                                    : 58;


                            const scale =
                                isCenter
                                    ? 1
                                    : 0.88;


                            const rotateY =
                                relative <
                                    0
                                    ? 8
                                    : relative >
                                        0
                                        ? -8
                                        : 0;


                            return (
                                <motion.div
                                    key={
                                        expert.id
                                    }
                                    initial={
                                        false
                                    }
                                    animate={{
                                        x,
                                        y,
                                        scale,
                                        rotateY,

                                        opacity:
                                            isCenter
                                                ? 1
                                                : 0.68,

                                        zIndex:
                                            isCenter
                                                ? 30
                                                : 10,
                                    }}
                                    transition={{
                                        type:
                                            "spring",

                                        stiffness:
                                            110,

                                        damping:
                                            22,

                                        mass:
                                            0.85,
                                    }}
                                    className="
                    absolute
                    left-1/2
                    top-1/2
                    h-[620px]
                    w-[400px]
                    -translate-x-1/2
                    -translate-y-1/2
                  "
                                >
                                    <ExpertCard
                                        expert={
                                            expert
                                        }
                                        active={
                                            isCenter
                                        }
                                        onClick={() =>
                                            selectExpert(
                                                index
                                            )
                                        }
                                    />
                                </motion.div>
                            );
                        }
                    )}
                </div>


                {/* =====================================================
            MOBILE / TABLET
        ====================================================== */}

                <div
                    className="
            mt-10

            lg:hidden
          "
                    onTouchStart={
                        handleTouchStart
                    }
                    onTouchEnd={
                        handleTouchEnd
                    }
                >
                    <motion.div
                        key={
                            experts[
                                active
                            ].id
                        }
                        initial={{
                            opacity: 0,
                            x: 25,
                            scale: 0.98,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            scale: 1,
                        }}
                        transition={{
                            duration: 0.38,
                        }}
                        className="
              mx-auto
              h-[590px]
              max-w-[450px]
            "
                    >
                        <ExpertCard
                            expert={
                                experts[
                                active
                                ]
                            }
                            active
                            onClick={() => { }}
                        />
                    </motion.div>


                    <p
                        className="
              mt-4
              text-center
              text-[11px]
              text-slate-500
            "
                    >
                        برای تغییر مدرس، کارت را
                        به چپ یا راست بکشید
                    </p>
                </div>


                {/* =====================================================
            AUTOPLAY PROGRESS
        ====================================================== */}

                <div
                    className="
            mx-auto
            mt-7
            h-[3px]
            max-w-[300px]
            overflow-hidden
            rounded-full
            bg-white/[0.07]
          "
                >
                    {!paused && (
                        <motion.div
                            key={
                                progressVersion
                            }
                            initial={{
                                width: "0%",
                            }}
                            animate={{
                                width: "100%",
                            }}
                            transition={{
                                duration:
                                    AUTO_TIME /
                                    1000,

                                ease:
                                    "linear",
                            }}
                            className="
                h-full
                rounded-full
                bg-gradient-to-l
                from-orange-400
                via-orange-300
                to-cyan-300
              "
                        />
                    )}
                </div>


                {/* =====================================================
            SMALL SELECTORS
        ====================================================== */}

                <div
                    className="
            mt-8
            flex
            gap-3
            overflow-x-auto
            pb-4

            lg:justify-center
          "
                >
                    {experts.map(
                        (
                            expert,
                            index
                        ) => {
                            const selected =
                                index ===
                                active;


                            return (
                                <button
                                    key={
                                        expert.id
                                    }
                                    type="button"
                                    onClick={() =>
                                        selectExpert(
                                            index
                                        )
                                    }
                                    className={`
                    flex
                    min-w-[220px]
                    shrink-0
                    items-center
                    gap-3
                    rounded-[20px]
                    border
                    px-4
                    py-3
                    text-right
                    transition
                    duration-300

                    ${selected
                                            ? `
                          border-orange-400/30
                          bg-orange-400/[0.09]
                          shadow-[0_15px_35px_rgba(251,146,60,.08)]
                        `
                                            : `
                          border-white/[0.07]
                          bg-white/[0.03]

                          hover:border-white/[0.13]
                          hover:bg-white/[0.06]
                        `
                                        }
                  `}
                                >
                                    <span
                                        className={`
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      text-xs
                      font-black
                      transition

                      ${selected
                                                ? `
                            bg-orange-400
                            text-[#06192E]
                          `
                                                : `
                            bg-white/[0.07]
                            text-white/55
                          `
                                            }
                    `}
                                    >
                                        {String(
                                            index + 1
                                        ).padStart(
                                            2,
                                            "0"
                                        )}
                                    </span>


                                    <div
                                        className="
                      min-w-0
                    "
                                    >
                                        <p
                                            className="
                        truncate
                        text-sm
                        font-black
                        text-white
                      "
                                        >
                                            {expert.name}
                                        </p>


                                        <p
                                            className="
                        mt-1
                        truncate
                        text-[10px]
                        text-slate-500
                      "
                                        >
                                            {expert.title}
                                        </p>
                                    </div>
                                </button>
                            );
                        }
                    )}
                </div>
            </div>
        </section>
    );
}