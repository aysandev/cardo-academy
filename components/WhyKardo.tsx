"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Instructor = {
    id: string;
    name: string;
    role: string;
    degree: string;
    experience: string;
    bio: string;
    image?: string;
};

const AUTO_PLAY_MS = 5000;

const instructors: Instructor[] = [
    {
        id: "hashem-setareh",
        name: "دکتر هاشم ستاره",
        role: "رئیس دپارتمان HSE",
        degree: "دکتری مدیریت محیط زیست",
        experience: "بیش از دو دهه تجربه",
        bio: "فعال در حوزه بهداشت حرفه‌ای، مدیریت محیط زیست و ایمنی؛ مدرس دانشگاه، مشاور ارشد پروژه‌های صنعتی و نظامی و نویسنده و مترجم آثار تخصصی.",
        image: "/images/instructors/hashem-setareh.png",
    },
    {
        id: "saleh-salehi",
        name: "صالح صالحی",
        role: "رئیس دپارتمان حقوقی",
        degree: "کارشناسی ارشد حقوق تجارت بین‌الملل",
        experience: "بیش از ۲۲ سال سابقه",
        bio: "مؤسس مجتمع آموزشی کاردو و رئیس هیئت‌مدیره گروه دانش‌بنیان ایمن سپهر؛ فعال در حوزه ایمنی و آتش‌نشانی و مدرس قراردادهای بین‌المللی، کارآفرینی و HSE.",
        image: "/images/instructors/saleh-salehi.jpeg",
    },
    {
        id: "hamidreza-faraji",
        name: "حمیدرضا فرجی",
        role: "رئیس دپارتمان آتش‌نشانی",
        degree: "مدرس تخصصی آتش‌نشانی",
        experience: "۱۵ سال سابقه حرفه‌ای",
        bio: "آتش‌نشان حرفه‌ای با سابقه فعالیت در سازمان آتش‌نشانی تهران و مدرس دوره‌های آتش‌نشانی سازمان آموزش فنی و حرفه‌ای کشور.",
        image: "/images/instructors/hamidreza-faraji.jpeg",
    },
    {
        id: "manouchehr-ahanj",
        name: "مهندس منوچهر آهنج",
        role: "مدرس و متخصص HSE و ایمنی فرایند",
        degree: "دکترای HSE",
        experience: "مدیر و مدرس حوزه HSE و ایمنی فرایند",
        bio: "متخصص HSE و ایمنی فرایند با سابقه مدیریت HSE پروژه‌های نفت و گاز، ایمنی راه‌اندازی، PSM، PSSR، HAZID/HIRA، MOC و ممیزی رفتاری.",
        image: "/images/instructors/manoch.jpeg",
    },
    {
        id: "hoda-akhoundi",
        name: "دکتر هدی آخوندی",
        role: "رئیس دپارتمان سلامت",
        degree: "دکترای حرفه‌ای پزشکی",
        experience: "مدرس و مدیر حوزه سلامت",
        bio: "پزشک، مدرس و رئیس دپارتمان سلامت و مدیر کلینیک پوست و زیبایی بیمارستان نیکان.",
        image: "/images/instructors/hoda-akhoundi.jpeg",
    },
    {
        id: "majid-aliyari",
        name: "مجید علیاری",
        role: "مدرس و مشاور HSE",
        degree: "کارشناسی ارشد HSE",
        experience: "بیش از یک دهه تجربه",
        bio: "فعال در صنایع نفت، گاز، خودرو، فولاد و معادن و دارای تجربه در مدیریت ریسک، سیستم‌های مدیریتی، مشاوره، تدریس و سرممیزی.",
        image: "/images/instructors/majid-aliyari.jpeg",
    },
    {
        id: "mohammad-shams",
        name: "دکتر محمد شمس",
        role: "مدرس و مشاور بهداشت و ایمنی",
        degree: "دکتری بهداشت و ایمنی",
        experience: "بیش از ۲۰ سال تجربه",
        bio: "دارای تجربه در صنایع نفت، گاز و پتروشیمی و سابقه فعالیت در حوزه ایمنی، آتش‌نشانی و تجهیزات تخصصی امداد و نجات.",
        image: "/images/instructors/mohammad-shams.jpg",
    },
    {
        id: "ahmad-akrami",
        name: "دکتر احمد اکرمی",
        role: "مدرس HSE و مدیریت بحران",
        degree: "دکتری شیمی",
        experience: "مدرس، مشاور و سرممیز",
        bio: "متخصص حوزه‌های HSE، پدافند غیرعامل و مدیریت بحران؛ دارای سابقه تدریس دانشگاهی و تألیف و ترجمه آثار تخصصی.",
        image: "/images/instructors/ahmad-akrami.jpeg",
    },
    {
        id: "naser-rahbar",
        name: "ناصر رهبر",
        role: "کارشناس رسمی و مدرس علوم آتش‌نشانی",
        degree: "کارشناس ارشد HSE",
        experience: "۲۰ سال سابقه تدریس",
        bio: "کارشناس رسمی دادگستری در رشته آتش‌سوزی، مؤلف، مشاور و مدرس علوم آتش‌نشانی با سوابق متعدد آموزشی و عملیاتی.",
        image: "/images/instructors/naser-rahbar.jpg",
    },
];

function initials(name: string) {
    return name
        .replace("دکتر", "")
        .replace("مهندس", "")
        .trim()
        .split(" ")
        .slice(0, 2)
        .map((part) => part[0])
        .join("");
}

export default function WhyKardo() {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);

    const teacherStripRef = useRef<HTMLDivElement>(null);

    // AUTO PLAY
    useEffect(() => {
        if (paused) return;

        const timer = window.setTimeout(() => {
            setActive((prev) => (prev + 1) % instructors.length);
        }, AUTO_PLAY_MS);

        return () => window.clearTimeout(timer);
    }, [active, paused]);

    /*
     * فقط خود نوار افقی اساتید جابه‌جا می‌شود.
     * هیچ scrollIntoViewای وجود ندارد،
     * بنابراین صفحه هنگام لود به پایین نمی‌پرد.
     */
    useEffect(() => {
        const strip = teacherStripRef.current;

        if (!strip) return;

        const activeButton = strip.querySelector<HTMLButtonElement>(
            `[data-teacher-index="${active}"]`
        );

        if (!activeButton) return;

        const target =
            activeButton.offsetLeft -
            strip.clientWidth / 2 +
            activeButton.clientWidth / 2;

        strip.scrollTo({
            left: target,
            behavior: "smooth",
        });
    }, [active]);

    const current = instructors[active];

    const previousIndex =
        active === 0 ? instructors.length - 1 : active - 1;

    const nextIndex =
        active === instructors.length - 1 ? 0 : active + 1;

    const previous = instructors[previousIndex];
    const next = instructors[nextIndex];

    const goNext = () => {
        setActive((prev) => (prev + 1) % instructors.length);
    };

    const goPrevious = () => {
        setActive((prev) =>
            prev === 0 ? instructors.length - 1 : prev - 1
        );
    };

    const progress = useMemo(
        () => `${active + 1}`.padStart(2, "0"),
        [active]
    );

    return (
        <section
            dir="rtl"
            className="
                relative
                w-full
                overflow-hidden
                bg-gradient-to-b
                from-[#0B2239]
                via-[#14314A]
                to-[#0B2239]
                px-3
                py-10
                sm:px-5
                sm:py-12
                md:px-6
                md:py-14
                lg:px-8
                xl:px-10
                xl:py-16
            "
        >
            {/* BACKGROUND LIGHTS */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-40
                    top-20
                    h-[350px]
                    w-[350px]
                    rounded-full
                    bg-cyan-300/[0.06]
                    blur-[130px]
                    sm:h-[450px]
                    sm:w-[450px]
                    xl:h-[550px]
                    xl:w-[550px]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -left-40
                    bottom-0
                    h-[350px]
                    w-[350px]
                    rounded-full
                    bg-orange-400/[0.07]
                    blur-[130px]
                    sm:h-[450px]
                    sm:w-[450px]
                    xl:h-[550px]
                    xl:w-[550px]
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
                            border-cyan-300/20
                            bg-cyan-300/[0.06]
                            px-3
                            py-2
                            text-[9px]
                            font-black
                            text-cyan-200
                            sm:px-4
                            sm:text-xs
                        "
                    >
                        <span className="h-2 w-2 rounded-full bg-orange-400" />

                        اساتید مجتمع آموزشی کاردو
                    </span>

                    <h2
                        className="
                            mt-4
                            text-[28px]
                            font-black
                            leading-[1.65]
                            text-white
                            sm:mt-5
                            sm:text-4xl
                            md:text-[42px]
                            xl:text-5xl
                        "
                    >
                        تجربه‌ای که{" "}
                        <span
                            className="
                                bg-gradient-to-l
                                from-cyan-300
                                to-orange-300
                                bg-clip-text
                                text-transparent
                            "
                        >
                            به آموزش تبدیل می‌شود
                        </span>
                    </h2>

                    <p
                        className="
                            mx-auto
                            mt-3
                            max-w-2xl
                            px-2
                            text-xs
                            leading-7
                            text-slate-400
                            sm:mt-4
                            sm:text-sm
                            sm:leading-8
                        "
                    >
                        بخشی از تیم مدرسان و متخصصان کاردو در حوزه‌های HSE،
                        آتش‌نشانی، سلامت، مدیریت بحران، امداد و نجات و خدمات
                        حقوقی.
                    </p>
                </div>

                {/* ====================================================== */}
                {/* LARGE DESKTOP */}
                {/* ====================================================== */}

                <div
                    className="
                        mt-10
                        hidden
                        grid-cols-[0.68fr_1fr_0.68fr]
                        items-center
                        gap-5
                        xl:grid
                        2xl:gap-7
                    "
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    {/* PREVIOUS */}

                    <button
                        type="button"
                        onClick={() => setActive(previousIndex)}
                        className="
                            group
                            relative
                            min-w-0
                            overflow-hidden
                            rounded-[30px]
                            border
                            border-white/[0.07]
                            bg-white/[0.025]
                            p-4
                            text-right
                            opacity-50
                            transition
                            duration-500
                            hover:-translate-y-1
                            hover:opacity-90
                            2xl:p-5
                        "
                    >
                        <InstructorVisual
                            instructor={previous}
                            muted
                        />

                        <h3
                            className="
                                mt-4
                                truncate
                                text-lg
                                font-black
                                text-white
                                2xl:text-xl
                            "
                        >
                            {previous.name}
                        </h3>

                        <p
                            className="
                                mt-2
                                line-clamp-1
                                text-[11px]
                                text-cyan-200
                            "
                        >
                            {previous.role}
                        </p>
                    </button>

                    {/* ACTIVE */}

                    <article
                        key={`desktop-current-${current.id}`}
                        className="
                            instructor-card-swap
                            relative
                            min-w-0
                            overflow-hidden
                            rounded-[36px]
                            border
                            border-orange-300/20
                            bg-white/[0.045]
                            p-6
                            shadow-[0_35px_100px_rgba(0,0,0,0.22)]
                            backdrop-blur-xl
                            2xl:p-8
                        "
                    >
                        <div
                            className="
                                absolute
                                left-6
                                top-6
                                z-20
                                text-[10px]
                                font-black
                                tracking-[0.2em]
                                text-orange-300
                            "
                        >
                            {progress} /{" "}
                            {String(instructors.length).padStart(2, "0")}
                        </div>

                        <InstructorVisual instructor={current} />

                        <div className="mt-6">
                            <span
                                className="
                                    inline-flex
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
                                {current.role}
                            </span>

                            <h3
                                className="
                                    mt-4
                                    text-2xl
                                    font-black
                                    text-white
                                    2xl:text-3xl
                                "
                            >
                                {current.name}
                            </h3>

                            <p
                                className="
                                    mt-2
                                    text-xs
                                    font-bold
                                    text-orange-200
                                    2xl:text-sm
                                "
                            >
                                {current.degree}
                            </p>

                            <span
                                className="
                                    mt-4
                                    inline-flex
                                    rounded-full
                                    border
                                    border-white/[0.08]
                                    bg-white/[0.03]
                                    px-4
                                    py-2
                                    text-[11px]
                                    font-bold
                                    text-slate-300
                                "
                            >
                                {current.experience}
                            </span>

                            <p
                                className="
                                    mt-4
                                    text-xs
                                    leading-7
                                    text-slate-400
                                    2xl:text-sm
                                    2xl:leading-8
                                "
                            >
                                {current.bio}
                            </p>
                        </div>

                        <Navigation
                            active={active}
                            goPrevious={goPrevious}
                            goNext={goNext}
                            setActive={setActive}
                        />

                        <AutoProgress
                            currentId={current.id}
                            paused={paused}
                            prefix="desktop"
                        />
                    </article>

                    {/* NEXT */}

                    <button
                        type="button"
                        onClick={() => setActive(nextIndex)}
                        className="
                            group
                            relative
                            min-w-0
                            overflow-hidden
                            rounded-[30px]
                            border
                            border-white/[0.07]
                            bg-white/[0.025]
                            p-4
                            text-right
                            opacity-50
                            transition
                            duration-500
                            hover:-translate-y-1
                            hover:opacity-90
                            2xl:p-5
                        "
                    >
                        <InstructorVisual
                            instructor={next}
                            muted
                        />

                        <h3
                            className="
                                mt-4
                                truncate
                                text-lg
                                font-black
                                text-white
                                2xl:text-xl
                            "
                        >
                            {next.name}
                        </h3>

                        <p
                            className="
                                mt-2
                                line-clamp-1
                                text-[11px]
                                text-cyan-200
                            "
                        >
                            {next.role}
                        </p>
                    </button>
                </div>

                {/* ====================================================== */}
                {/* PHONE / TABLET / LAPTOP */}
                {/* ====================================================== */}

                <div
                    className="
                        mx-auto
                        mt-7
                        w-full
                        max-w-[820px]
                        sm:mt-8
                        xl:hidden
                    "
                >
                    <article
                        key={`responsive-current-${current.id}`}
                        className="
                            instructor-card-swap
                            overflow-hidden
                            rounded-[24px]
                            border
                            border-white/[0.08]
                            bg-white/[0.035]
                            p-3
                            shadow-[0_20px_70px_rgba(0,0,0,0.18)]
                            sm:rounded-[30px]
                            sm:p-5
                            md:p-6
                        "
                    >
                        <InstructorVisual instructor={current} />

                        <div className="mt-5">
                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-3
                                    sm:flex-row
                                    sm:items-start
                                    sm:justify-between
                                "
                            >
                                <div className="min-w-0">
                                    <span
                                        className="
                                            text-[9px]
                                            font-black
                                            text-orange-300
                                            sm:text-[10px]
                                        "
                                    >
                                        {progress} /{" "}
                                        {String(
                                            instructors.length
                                        ).padStart(2, "0")}
                                    </span>

                                    <h3
                                        className="
                                            mt-1.5
                                            text-xl
                                            font-black
                                            leading-8
                                            text-white
                                            sm:text-2xl
                                            md:text-3xl
                                        "
                                    >
                                        {current.name}
                                    </h3>

                                    <p
                                        className="
                                            mt-1
                                            text-[11px]
                                            font-bold
                                            leading-6
                                            text-cyan-200
                                            sm:text-xs
                                        "
                                    >
                                        {current.role}
                                    </p>
                                </div>

                                <span
                                    className="
                                        w-fit
                                        shrink-0
                                        rounded-full
                                        bg-orange-400/[0.10]
                                        px-3
                                        py-2
                                        text-[9px]
                                        font-black
                                        text-orange-200
                                        sm:text-[10px]
                                    "
                                >
                                    {current.experience}
                                </span>
                            </div>

                            <p
                                className="
                                    mt-4
                                    text-[11px]
                                    font-bold
                                    leading-6
                                    text-orange-200
                                    sm:text-xs
                                    md:text-sm
                                "
                            >
                                {current.degree}
                            </p>

                            <p
                                className="
                                    mt-3
                                    text-[11px]
                                    leading-7
                                    text-slate-400
                                    sm:text-xs
                                    md:text-sm
                                    md:leading-8
                                "
                            >
                                {current.bio}
                            </p>
                        </div>

                        <Navigation
                            active={active}
                            goPrevious={goPrevious}
                            goNext={goNext}
                            setActive={setActive}
                            compact
                        />

                        <AutoProgress
                            currentId={current.id}
                            paused={paused}
                            prefix="mobile"
                        />
                    </article>

                    {/* TEACHERS HORIZONTAL MENU */}

                    <div
                        ref={teacherStripRef}
                        dir="ltr"
                        className="
                            mt-4
                            flex
                            w-full
                            gap-2
                            overflow-x-auto
                            overscroll-x-contain
                            scroll-smooth
                            px-1
                            pb-3
                            [scrollbar-width:none]
                            [&::-webkit-scrollbar]:hidden
                        "
                    >
                        {instructors.map((teacher, index) => (
                            <button
                                key={teacher.id}
                                data-teacher-index={index}
                                dir="rtl"
                                type="button"
                                onClick={() => setActive(index)}
                                className={`
                                    shrink-0
                                    whitespace-nowrap
                                    rounded-full
                                    border
                                    px-3
                                    py-2.5
                                    text-[9px]
                                    font-black
                                    transition
                                    duration-300
                                    sm:px-4
                                    sm:text-[10px]
                                    ${active === index
                                        ? "border-orange-400 bg-orange-400 text-[#07192D]"
                                        : "border-white/10 bg-white/[0.03] text-slate-300"
                                    }
                                `}
                            >
                                {teacher.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes instructorCardSwap {
                    from {
                        opacity: 0;
                        transform: translateY(12px) scale(0.99);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes teacherAutoplayProgress {
                    from {
                        transform: scaleX(0);
                    }

                    to {
                        transform: scaleX(1);
                    }
                }

                .instructor-card-swap {
                    animation: instructorCardSwap
                        500ms
                        cubic-bezier(0.22, 1, 0.36, 1);
                }

                .teacher-autoplay-progress {
                    width: 100%;
                    animation-name: teacherAutoplayProgress;
                    animation-timing-function: linear;
                    animation-fill-mode: forwards;
                }

                @media (prefers-reduced-motion: reduce) {
                    .instructor-card-swap,
                    .teacher-autoplay-progress {
                        animation: none !important;
                    }
                }
            `}</style>
        </section>
    );
}

function Navigation({
    active,
    goPrevious,
    goNext,
    setActive,
    compact = false,
}: {
    active: number;
    goPrevious: () => void;
    goNext: () => void;
    setActive: (index: number) => void;
    compact?: boolean;
}) {
    return (
        <div
            className={`
                flex
                items-center
                justify-between
                gap-3
                ${compact ? "mt-5" : "mt-7"}
            `}
        >
            <button
                type="button"
                onClick={goPrevious}
                aria-label="استاد قبلی"
                className={`
                    flex
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.04]
                    text-white
                    transition
                    hover:bg-white/[0.08]
                    active:scale-95
                    ${compact
                        ? "h-10 w-10 text-base"
                        : "h-12 w-12 text-xl"
                    }
                `}
            >
                →
            </button>

            <div
                className="
                    flex
                    min-w-0
                    flex-wrap
                    justify-center
                    gap-1.5
                "
            >
                {instructors.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setActive(index)}
                        aria-label={`استاد ${index + 1}`}
                        className={`
                            h-2
                            rounded-full
                            transition-all
                            duration-300
                            ${active === index
                                ? "w-6 bg-orange-400 sm:w-7"
                                : "w-2 bg-white/20"
                            }
                        `}
                    />
                ))}
            </div>

            <button
                type="button"
                onClick={goNext}
                aria-label="استاد بعدی"
                className={`
                    flex
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-orange-400
                    text-[#07192D]
                    transition
                    hover:bg-orange-300
                    active:scale-95
                    ${compact
                        ? "h-10 w-10 text-base"
                        : "h-12 w-12 text-xl"
                    }
                `}
            >
                ←
            </button>
        </div>
    );
}

function AutoProgress({
    currentId,
    paused,
    prefix,
}: {
    currentId: string;
    paused: boolean;
    prefix: string;
}) {
    return (
        <div
            className="
                mt-4
                h-[3px]
                w-full
                overflow-hidden
                rounded-full
                bg-white/[0.06]
            "
        >
            <span
                key={`${prefix}-${currentId}`}
                className="
                    teacher-autoplay-progress
                    block
                    h-full
                    origin-right
                    rounded-full
                    bg-gradient-to-l
                    from-orange-400
                    via-orange-300
                    to-cyan-300
                "
                style={{
                    animationDuration: `${AUTO_PLAY_MS}ms`,
                    animationPlayState: paused
                        ? "paused"
                        : "running",
                }}
            />
        </div>
    );
}

function InstructorVisual({
    instructor,
    muted = false,
}: {
    instructor: Instructor;
    muted?: boolean;
}) {
    return (
        <div
            className={`
                relative
                w-full
                overflow-hidden
                rounded-[20px]
                border
                border-white/[0.08]
                bg-[#091D31]
                sm:rounded-[24px]
                ${muted
                    ? "aspect-[4/4.7]"
                    : "aspect-[4/4.5] sm:aspect-[16/11] md:aspect-[16/10] xl:aspect-[4/4.8]"
                }
            `}
        >
            {instructor.image ? (
                <img
                    src={instructor.image}
                    alt={instructor.name}
                    loading="lazy"
                    className={`
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                        object-top
                        transition
                        duration-700
                        ${muted
                            ? "grayscale-[35%] group-hover:grayscale-0"
                            : ""
                        }
                    `}
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
                        from-[#102E49]
                        via-[#0B2239]
                        to-[#07192D]
                    "
                >
                    <div
                        className="
                            flex
                            h-24
                            w-24
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-orange-300/20
                            bg-orange-400/[0.08]
                            text-3xl
                            font-black
                            text-orange-200
                            sm:h-28
                            sm:w-28
                            sm:text-4xl
                        "
                    >
                        {initials(instructor.name)}
                    </div>
                </div>
            )}

            <div
                className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#07192D]
                    via-transparent
                    to-transparent
                "
            />

            <div
                className="
                    absolute
                    bottom-3
                    right-3
                    rounded-full
                    border
                    border-white/10
                    bg-[#07192D]/75
                    px-2.5
                    py-1.5
                    text-[7px]
                    font-black
                    tracking-[0.08em]
                    text-white
                    backdrop-blur-lg
                    sm:bottom-4
                    sm:right-4
                    sm:px-3
                    sm:py-2
                    sm:text-[9px]
                "
            >
                CARDO INSTRUCTOR
            </div>
        </div>
    );
}