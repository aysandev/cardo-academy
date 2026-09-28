"use client";

import { useEffect, useMemo, useState } from "react";

type Instructor = {
    id: string;
    name: string;
    role: string;
    degree: string;
    experience: string;
    bio: string;
    image?: string;
};

const AUTO_PLAY_MS = 3800;

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

    /*
     * AUTO SLIDER
     *
     * هیچ Scroll وجود ندارد.
     * فقط state کارت فعال عوض می‌شود.
     */
    useEffect(() => {
        if (paused) return;

        const timer = window.setTimeout(() => {
            setActive((current) => (current + 1) % instructors.length);
        }, AUTO_PLAY_MS);

        return () => window.clearTimeout(timer);
    }, [active, paused]);

    const current = instructors[active];

    const previousIndex =
        active === 0 ? instructors.length - 1 : active - 1;

    const nextIndex =
        active === instructors.length - 1 ? 0 : active + 1;

    const previous = instructors[previousIndex];
    const next = instructors[nextIndex];

    const progress = useMemo(
        () => `${active + 1}`.padStart(2, "0"),
        [active]
    );

    function goNext() {
        setActive((current) => (current + 1) % instructors.length);
    }

    function goPrevious() {
        setActive((current) =>
            current === 0 ? instructors.length - 1 : current - 1
        );
    }

    return (
        <section
            dir="rtl"
            className="
                relative
                w-full
                max-w-full
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
                lg:py-16
                xl:px-10
            "
        >
            {/* BACKGROUND GLOW */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -right-40
                    top-20
                    h-[420px]
                    w-[420px]
                    rounded-full
                    bg-cyan-300/[0.06]
                    blur-[150px]
                    lg:h-[520px]
                    lg:w-[520px]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -left-40
                    bottom-0
                    h-[420px]
                    w-[420px]
                    rounded-full
                    bg-orange-400/[0.07]
                    blur-[150px]
                    lg:h-[520px]
                    lg:w-[520px]
                "
            />

            <div
                className="
                    relative
                    mx-auto
                    w-full
                    max-w-[1450px]
                    min-w-0
                "
            >
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
                            px-3.5
                            py-2
                            text-[9px]
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
                            lg:text-5xl
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
                        بخشی از تیم مدرسان و متخصصان کاردو در حوزه‌های
                        HSE، آتش‌نشانی، سلامت، مدیریت بحران، امداد و نجات
                        و خدمات حقوقی.
                    </p>
                </div>

                {/* ================================================= */}
                {/* DESKTOP SLIDER */}
                {/* ================================================= */}

                <div
                    className="
                        mt-9
                        hidden
                        grid-cols-[0.72fr_1fr_0.72fr]
                        items-center
                        gap-5
                        lg:grid
                        xl:gap-6
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
                            min-w-0
                            overflow-hidden
                            rounded-[30px]
                            border
                            border-white/[0.07]
                            bg-white/[0.025]
                            p-4
                            text-right
                            opacity-45
                            transition
                            duration-500
                            hover:-translate-y-1
                            hover:opacity-90
                            xl:p-5
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
                                xl:text-xl
                            "
                        >
                            {previous.name}
                        </h3>

                        <p
                            className="
                                mt-2
                                truncate
                                text-[11px]
                                text-cyan-200
                                xl:text-xs
                            "
                        >
                            {previous.role}
                        </p>
                    </button>

                    {/* CURRENT */}
                    <article
                        key={`desktop-${current.id}`}
                        className="
                            instructor-slide
                            relative
                            min-w-0
                            overflow-hidden
                            rounded-[36px]
                            border
                            border-orange-300/20
                            bg-white/[0.045]
                            p-5
                            shadow-[0_35px_100px_rgba(0,0,0,0.22)]
                            backdrop-blur-xl
                            xl:p-7
                        "
                    >
                        <div
                            className="
                                absolute
                                left-5
                                top-5
                                z-20
                                text-[9px]
                                font-black
                                tracking-[0.22em]
                                text-orange-300
                                xl:text-xs
                            "
                        >
                            {progress} /{" "}
                            {String(instructors.length).padStart(2, "0")}
                        </div>

                        <InstructorVisual instructor={current} />

                        <InstructorContent instructor={current} />

                        <SliderNavigation
                            active={active}
                            onPrevious={goPrevious}
                            onNext={goNext}
                            onSelect={setActive}
                        />

                        <SliderTimer
                            id={`desktop-${current.id}`}
                            paused={paused}
                        />
                    </article>

                    {/* NEXT */}
                    <button
                        type="button"
                        onClick={() => setActive(nextIndex)}
                        className="
                            group
                            min-w-0
                            overflow-hidden
                            rounded-[30px]
                            border
                            border-white/[0.07]
                            bg-white/[0.025]
                            p-4
                            text-right
                            opacity-45
                            transition
                            duration-500
                            hover:-translate-y-1
                            hover:opacity-90
                            xl:p-5
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
                                xl:text-xl
                            "
                        >
                            {next.name}
                        </h3>

                        <p
                            className="
                                mt-2
                                truncate
                                text-[11px]
                                text-cyan-200
                                xl:text-xs
                            "
                        >
                            {next.role}
                        </p>
                    </button>
                </div>

                {/* ================================================= */}
                {/* MOBILE / TABLET SLIDER */}
                {/* ================================================= */}

                <div
                    className="
                        mx-auto
                        mt-7
                        w-full
                        max-w-[760px]
                        min-w-0
                        lg:hidden
                    "
                >
                    <article
                        key={`mobile-${current.id}`}
                        className="
                            instructor-slide
                            w-full
                            min-w-0
                            overflow-hidden
                            rounded-[25px]
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

                        <SliderNavigation
                            active={active}
                            onPrevious={goPrevious}
                            onNext={goNext}
                            onSelect={setActive}
                            compact
                        />

                        <SliderTimer
                            id={`mobile-${current.id}`}
                            paused={false}
                        />
                    </article>
                </div>
            </div>

            {/* ================================================= */}
            {/* ANIMATION */}
            {/* ================================================= */}

            <style jsx global>{`
                @keyframes instructorSlide {
                    0% {
                        opacity: 0;
                        transform: translateX(-28px) scale(0.985);
                    }

                    100% {
                        opacity: 1;
                        transform: translateX(0) scale(1);
                    }
                }

                @keyframes instructorTimer {
                    from {
                        transform: scaleX(0);
                    }

                    to {
                        transform: scaleX(1);
                    }
                }

                .instructor-slide {
                    animation: instructorSlide
                        550ms
                        cubic-bezier(0.22, 1, 0.36, 1);
                }

                .instructor-timer {
                    width: 100%;
                    animation-name: instructorTimer;
                    animation-timing-function: linear;
                    animation-fill-mode: forwards;
                }

                @media (prefers-reduced-motion: reduce) {
                    .instructor-slide,
                    .instructor-timer {
                        animation: none !important;
                    }
                }
            `}</style>
        </section>
    );
}

/* ========================================================= */
/* CONTENT */
/* ========================================================= */

function InstructorContent({
    instructor,
}: {
    instructor: Instructor;
}) {
    return (
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
                {instructor.role}
            </span>

            <h3
                className="
                    mt-4
                    text-2xl
                    font-black
                    text-white
                    xl:text-3xl
                "
            >
                {instructor.name}
            </h3>

            <p
                className="
                    mt-2
                    text-xs
                    font-bold
                    text-orange-200
                    xl:text-sm
                "
            >
                {instructor.degree}
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
                {instructor.experience}
            </span>

            <p
                className="
                    mt-4
                    text-xs
                    leading-7
                    text-slate-400
                    xl:text-sm
                    xl:leading-8
                "
            >
                {instructor.bio}
            </p>
        </div>
    );
}

/* ========================================================= */
/* NAVIGATION */
/* ========================================================= */

function SliderNavigation({
    active,
    onPrevious,
    onNext,
    onSelect,
    compact = false,
}: {
    active: number;
    onPrevious: () => void;
    onNext: () => void;
    onSelect: (index: number) => void;
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
                onClick={onPrevious}
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
                {instructors.map((teacher, index) => (
                    <button
                        key={teacher.id}
                        type="button"
                        onClick={() => onSelect(index)}
                        aria-label={`نمایش ${teacher.name}`}
                        className={`
                            h-2
                            rounded-full
                            transition-all
                            duration-300

                            ${active === index
                                ? "w-7 bg-orange-400"
                                : "w-2 bg-white/20 hover:bg-white/40"
                            }
                        `}
                    />
                ))}
            </div>

            <button
                type="button"
                onClick={onNext}
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

/* ========================================================= */
/* TIMER */
/* ========================================================= */

function SliderTimer({
    id,
    paused,
}: {
    id: string;
    paused: boolean;
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
                key={id}
                className="
                    instructor-timer
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

/* ========================================================= */
/* PHOTO */
/* ========================================================= */

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
                    : "aspect-[4/4.5] sm:aspect-[16/11] md:aspect-[16/10] lg:aspect-[4/4.8]"
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