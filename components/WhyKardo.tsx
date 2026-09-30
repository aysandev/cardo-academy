"use client";

import { useMemo, useState } from "react";

type Instructor = {
    id: string;
    name: string;
    role: string;
    degree: string;
    experience: string;
    bio: string;
    image?: string;
};

const instructors: Instructor[] = [
    {
        id: "saleh-salehi",
        name: "صالح صالحی",
        role: "مؤسس آکادمی کاردو",
        degree: "کارشناسی ارشد حقوق تجارت بین‌الملل",
        experience: "بیش از ۲۲ سال سابقه",
        bio: "مؤسس مجتمع آموزشی کاردو و رئیس هیئت‌مدیره گروه دانش‌بنیان ایمن سپهر؛ فعال در حوزه ایمنی و آتش‌نشانی و مدرس قراردادهای بین‌المللی، کارآفرینی و HSE.",
        image: "/images/instructors/saleh-salehi.jpeg",
    },

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
        id: "hoda-akhoundi",
        name: "دکتر هدی آخوندی",
        role: "رئیس دپارتمان سلامت",
        degree: "دکترای حرفه‌ای پزشکی",
        experience: "مدرس و مدیر حوزه سلامت",
        bio: "پزشک، مدرس و رئیس دپارتمان سلامت و مدیر کلینیک پوست و زیبایی بیمارستان نیکان.",
        image: "/images/instructors/hoda-akhoundi.jpeg",
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
        id: "afshin",
        name: "افشین",
        role: "مدرس آکادمی کاردو",
        degree: "اطلاعات تکمیلی در حال ثبت",
        experience: "مدرس تخصصی",
        bio: "اطلاعات تکمیلی این مدرس پس از دریافت رزومه و مشخصات رسمی به این بخش اضافه می‌شود.",
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

const DESKTOP_PAGE_SIZE = 4;

export default function WhyKardo() {
    const [page, setPage] = useState(0);

    const totalPages = Math.ceil(
        instructors.length / DESKTOP_PAGE_SIZE
    );

    const visibleInstructors = useMemo(() => {
        const start = page * DESKTOP_PAGE_SIZE;

        return instructors.slice(
            start,
            start + DESKTOP_PAGE_SIZE
        );
    }, [page]);

    const goNext = () => {
        setPage((prev) =>
            prev >= totalPages - 1 ? 0 : prev + 1
        );
    };

    const goPrevious = () => {
        setPage((prev) =>
            prev <= 0 ? totalPages - 1 : prev - 1
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
        py-12
        sm:px-6
        sm:py-14
        lg:px-10
        lg:py-16
      "
        >
            {/* BACKGROUND LIGHTS */}

            <div
                className="
          pointer-events-none
          absolute
          -right-40
          top-20
          h-[460px]
          w-[460px]
          rounded-full
          bg-cyan-300/[0.06]
          blur-[150px]
        "
            />

            <div
                className="
          pointer-events-none
          absolute
          -left-40
          bottom-0
          h-[460px]
          w-[460px]
          rounded-full
          bg-orange-400/[0.07]
          blur-[150px]
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
              text-xs
              leading-7
              text-slate-400
              sm:text-sm
              sm:leading-8
            "
                    >
                        تیمی از مدرسان و متخصصان با تجربه در حوزه‌های
                        HSE، آتش‌نشانی، سلامت، مدیریت بحران، امداد و نجات
                        و آموزش‌های تخصصی.
                    </p>
                </div>

                {/* PAGE INFO */}

                <div
                    className="
            mt-10
            flex
            items-center
            justify-between
            gap-4
          "
                >
                    <div className="text-right">
                        <span
                            className="
                text-[10px]
                font-black
                tracking-[0.16em]
                text-orange-300
              "
                        >
                            INSTRUCTORS
                        </span>

                        <p
                            className="
                mt-1
                text-[11px]
                text-slate-400
                sm:text-xs
              "
                        >
                            صفحه {page + 1} از {totalPages}
                        </p>
                    </div>

                    {/* DESKTOP NAV */}

                    <div className="hidden items-center gap-2 sm:flex">
                        <button
                            type="button"
                            onClick={goPrevious}
                            aria-label="اساتید قبلی"
                            className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-white/[0.04]
                text-lg
                text-white
                transition
                hover:bg-white/[0.09]
              "
                        >
                            →
                        </button>

                        <button
                            type="button"
                            onClick={goNext}
                            aria-label="اساتید بعدی"
                            className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-orange-400
                text-lg
                font-black
                text-[#07192D]
                transition
                hover:bg-orange-300
              "
                        >
                            ←
                        </button>
                    </div>
                </div>

                {/* INSTRUCTORS GRID */}

                <div
                    key={page}
                    className="
            mt-5
            grid
            grid-cols-1
            gap-5

            sm:grid-cols-2

            lg:grid-cols-4
            lg:gap-5

            xl:gap-6
          "
                >
                    {visibleInstructors.map((instructor, index) => (
                        <InstructorCard
                            key={instructor.id}
                            instructor={instructor}
                            number={
                                page * DESKTOP_PAGE_SIZE +
                                index +
                                1
                            }
                        />
                    ))}
                </div>

                {/* MOBILE NAV */}

                <div
                    className="
            mt-7
            flex
            items-center
            justify-between
            gap-3
            sm:hidden
          "
                >
                    <button
                        type="button"
                        onClick={goPrevious}
                        className="
              flex
              h-12
              flex-1
              items-center
              justify-center
              gap-2
              rounded-[16px]
              border
              border-white/10
              bg-white/[0.04]
              text-xs
              font-black
              text-white
            "
                    >
                        <span>→</span>
                        قبلی
                    </button>

                    <span
                        className="
              min-w-[52px]
              text-center
              text-[10px]
              font-black
              text-slate-400
            "
                    >
                        {page + 1} / {totalPages}
                    </span>

                    <button
                        type="button"
                        onClick={goNext}
                        className="
              flex
              h-12
              flex-1
              items-center
              justify-center
              gap-2
              rounded-[16px]
              bg-orange-400
              text-xs
              font-black
              text-[#07192D]
            "
                    >
                        بعدی
                        <span>←</span>
                    </button>
                </div>

                {/* DOTS */}

                <div
                    className="
            mt-7
            hidden
            items-center
            justify-center
            gap-2
            sm:flex
          "
                >
                    {Array.from({ length: totalPages }).map(
                        (_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setPage(index)}
                                aria-label={`صفحه ${index + 1}`}
                                className={`
                  h-2
                  rounded-full
                  transition-all
                  duration-300
                  ${page === index
                                        ? "w-8 bg-orange-400"
                                        : "w-2 bg-white/20 hover:bg-white/40"
                                    }
                `}
                            />
                        )
                    )}
                </div>
            </div>
        </section>
    );
}

function InstructorCard({
    instructor,
    number,
}: {
    instructor: Instructor;
    number: number;
}) {
    return (
        <article
            className="
        group
        min-w-0
        overflow-hidden
        rounded-[28px]
        border
        border-white/[0.08]
        bg-white/[0.035]
        transition
        duration-500

        hover:-translate-y-1
        hover:border-white/[0.13]
        hover:bg-white/[0.05]
        hover:shadow-[0_24px_70px_rgba(0,0,0,0.18)]
      "
        >
            {/* IMAGE */}

            <div
                className="
          relative
          aspect-[4/4.4]
          w-full
          overflow-hidden
          bg-[#091D31]

          sm:aspect-[4/4.2]

          lg:aspect-[4/4.6]
        "
            >
                {instructor.image ? (
                    <img
                        src={instructor.image}
                        alt={instructor.name}
                        loading="lazy"
                        className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              object-top
              transition
              duration-700
              group-hover:scale-[1.025]
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
              from-[#173953]
              via-[#102B43]
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
              "
                        >
                            <span
                                className="
                  text-3xl
                  font-black
                  text-orange-200
                "
                            >
                                {instructor.name.charAt(0)}
                            </span>
                        </div>
                    </div>
                )}

                {/* IMAGE OVERLAY */}

                <div
                    className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-[#07192D]/90
            via-transparent
            to-transparent
          "
                />

                {/* NUMBER */}

                <div
                    className="
            absolute
            left-4
            top-4
            rounded-full
            border
            border-white/10
            bg-[#07192D]/65
            px-3
            py-1.5
            text-[9px]
            font-black
            tracking-[0.14em]
            text-white
            backdrop-blur-md
          "
                >
                    {String(number).padStart(2, "0")}
                </div>

                {/* ROLE */}

                <div
                    className="
            absolute
            bottom-4
            right-4
            left-4
          "
                >
                    <span
                        className="
              inline-flex
              max-w-full
              rounded-full
              border
              border-white/10
              bg-[#07192D]/70
              px-3
              py-2
              text-[9px]
              font-black
              leading-5
              text-cyan-100
              backdrop-blur-lg
            "
                    >
                        {instructor.role}
                    </span>
                </div>
            </div>

            {/* CONTENT */}

            <div className="p-5">
                <h3
                    className="
            text-[20px]
            font-black
            leading-8
            text-white
          "
                >
                    {instructor.name}
                </h3>

                <p
                    className="
            mt-2
            text-[11px]
            font-bold
            leading-6
            text-orange-200
          "
                >
                    {instructor.degree}
                </p>

                <div
                    className="
            mt-4
            inline-flex
            rounded-full
            border
            border-white/[0.07]
            bg-white/[0.035]
            px-3
            py-1.5
            text-[9px]
            font-bold
            text-slate-300
          "
                >
                    {instructor.experience}
                </div>

                <p
                    className="
            mt-4
            line-clamp-4
            min-h-[96px]
            text-[11px]
            leading-6
            text-slate-400
          "
                >
                    {instructor.bio}
                </p>
            </div>
        </article>
    );
}