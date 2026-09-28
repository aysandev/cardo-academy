"use client";

import { useEffect, useState } from "react";

type Instructor = {
    id: string;
    name: string;
    role: string;
    degree: string;
    experience: string;
    bio: string;
    image?: string;
};

const AUTO_PLAY_MS = 2500;

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

export default function WhyKardo() {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;

        const timer = window.setInterval(() => {
            setActive((prev) => (prev + 1) % instructors.length);
        }, AUTO_PLAY_MS);

        return () => window.clearInterval(timer);
    }, [paused]);

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
        px-4
        py-10
        sm:px-6
        sm:py-12
        lg:px-10
        lg:py-16
      "
        >
            {/* BACKGROUND */}
            <div
                className="
          pointer-events-none
          absolute
          -right-40
          top-24
          h-[500px]
          w-[500px]
          rounded-full
          bg-cyan-300/[0.06]
          blur-[160px]
        "
            />

            <div
                className="
          pointer-events-none
          absolute
          -left-40
          bottom-10
          h-[500px]
          w-[500px]
          rounded-full
          bg-orange-400/[0.07]
          blur-[160px]
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
              px-4
              py-2
              text-[10px]
              font-black
              text-cyan-200
              sm:text-xs
            "
                    >
                        <span className="h-2 w-2 rounded-full bg-orange-400" />

                        اساتید مجتمع آموزشی کاردو
                    </span>

                    <h2
                        className="
              mt-5
              text-3xl
              font-black
              leading-[1.6]
              text-white
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
              mt-4
              max-w-2xl
              text-sm
              leading-8
              text-slate-400
            "
                    >
                        بخشی از تیم مدرسان و متخصصان کاردو در حوزه‌های HSE،
                        آتش‌نشانی، سلامت، مدیریت بحران، امداد و نجات و خدمات حقوقی.
                    </p>
                </div>

                {/* ================================================= */}
                {/* DESKTOP */}
                {/* ================================================= */}

                <div
                    className="
            mt-8
            hidden
            grid-cols-[0.72fr_1fr_0.72fr]
            items-center
            gap-6
            lg:grid
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
              rounded-[32px]
              border
              border-white/[0.07]
              bg-white/[0.025]
              p-5
              text-right
              opacity-55
              transition
              duration-500
              hover:-translate-y-1
              hover:opacity-90
            "
                    >
                        <InstructorVisual instructor={previous} muted />

                        <h3 className="mt-5 truncate text-xl font-black text-white">
                            {previous.name}
                        </h3>

                        <p className="mt-2 truncate text-xs text-cyan-200">
                            {previous.role}
                        </p>
                    </button>

                    {/* CURRENT */}
                    <article
                        key={current.id}
                        className="
              relative
              min-w-0
              overflow-hidden
              rounded-[38px]
              border
              border-orange-300/20
              bg-white/[0.045]
              p-6
              shadow-[0_35px_100px_rgba(0,0,0,0.22)]
              backdrop-blur-xl
              sm:p-8
            "
                    >
                        <div
                            className="
                absolute
                left-6
                top-6
                z-20
                text-xs
                font-black
                text-orange-300
              "
                        >
                            {String(active + 1).padStart(2, "0")} /{" "}
                            {String(instructors.length).padStart(2, "0")}
                        </div>

                        <InstructorVisual instructor={current} />

                        <div className="mt-7">
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

                            <h3 className="mt-4 text-3xl font-black text-white">
                                {current.name}
                            </h3>

                            <p className="mt-2 text-sm font-bold text-orange-200">
                                {current.degree}
                            </p>

                            <div
                                className="
                  mt-5
                  inline-flex
                  rounded-full
                  border
                  border-white/[0.08]
                  bg-white/[0.03]
                  px-4
                  py-2
                  text-xs
                  font-bold
                  text-slate-300
                "
                            >
                                {current.experience}
                            </div>

                            <p className="mt-5 text-sm leading-8 text-slate-400">
                                {current.bio}
                            </p>
                        </div>

                        <Navigation
                            active={active}
                            goPrevious={goPrevious}
                            goNext={goNext}
                            setActive={setActive}
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
              rounded-[32px]
              border
              border-white/[0.07]
              bg-white/[0.025]
              p-5
              text-right
              opacity-55
              transition
              duration-500
              hover:-translate-y-1
              hover:opacity-90
            "
                    >
                        <InstructorVisual instructor={next} muted />

                        <h3 className="mt-5 truncate text-xl font-black text-white">
                            {next.name}
                        </h3>

                        <p className="mt-2 truncate text-xs text-cyan-200">
                            {next.role}
                        </p>
                    </button>
                </div>

                {/* ================================================= */}
                {/* MOBILE / TABLET */}
                {/* ================================================= */}

                <div
                    className="
            mx-auto
            mt-7
            w-full
            max-w-[720px]
            lg:hidden
          "
                >
                    <article
                        key={`mobile-${current.id}`}
                        className="
              w-full
              overflow-hidden
              rounded-[28px]
              border
              border-white/[0.08]
              bg-white/[0.035]
              p-4
              sm:p-6
            "
                    >
                        <InstructorVisual instructor={current} />

                        <div className="mt-5">
                            <span className="text-[9px] font-black text-orange-300">
                                {String(active + 1).padStart(2, "0")} /{" "}
                                {String(instructors.length).padStart(2, "0")}
                            </span>

                            <h3
                                className="
                  mt-2
                  text-xl
                  font-black
                  leading-8
                  text-white
                  sm:text-2xl
                "
                            >
                                {current.name}
                            </h3>

                            <p className="mt-1 text-xs font-bold text-cyan-200">
                                {current.role}
                            </p>

                            <p className="mt-4 text-xs font-bold text-orange-200">
                                {current.degree}
                            </p>

                            <span
                                className="
                  mt-4
                  inline-flex
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

                            <p
                                className="
                  mt-4
                  text-xs
                  leading-7
                  text-slate-400
                  sm:text-sm
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
                    </article>
                </div>
            </div>
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
        ${compact ? "mt-6" : "mt-7"}
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
          ${compact
                        ? "h-10 w-10"
                        : "h-12 w-12 text-xl"
                    }
        `}
            >
                →
            </button>

            <div className="flex flex-wrap justify-center gap-1.5">
                {instructors.map((teacher, index) => (
                    <button
                        key={teacher.id}
                        type="button"
                        onClick={() => setActive(index)}
                        aria-label={`نمایش ${teacher.name}`}
                        className={`
              h-2
              rounded-full
              transition-all
              ${active === index
                                ? "w-7 bg-orange-400"
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
          ${compact
                        ? "h-10 w-10"
                        : "h-12 w-12 text-xl"
                    }
        `}
            >
                ←
            </button>
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
        rounded-[26px]
        border
        border-white/[0.08]
        bg-[#091D31]
        ${muted
                    ? "h-[260px] xl:h-[300px]"
                    : "h-[280px] sm:h-[330px] md:h-[360px] xl:h-[390px]"
                }
      `}
        >
            {instructor.image ? (
                <img
                    src={instructor.image}
                    alt={instructor.name}
                    className={`
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-top
            transition
            duration-700
            ${muted ? "grayscale-[35%]" : ""}
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
                    <span className="text-4xl font-black text-orange-200">
                        {instructor.name.charAt(0)}
                    </span>
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
          bottom-4
          right-4
          rounded-full
          border
          border-white/10
          bg-[#07192D]/75
          px-3
          py-2
          text-[9px]
          font-black
          text-white
          backdrop-blur-lg
        "
            >
                CARDO INSTRUCTOR
            </div>
        </div>
    );
}