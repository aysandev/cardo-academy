"use client";

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
        id: "hamidreza-faraji",
        name: "حمیدرضا فرجی",
        role: "رئیس دپارتمان آتش‌نشانی",
        degree: "مدرس تخصصی آتش‌نشانی",
        experience: "۱۵ سال سابقه حرفه‌ای",
        bio: "آتش‌نشان حرفه‌ای با سابقه فعالیت در سازمان آتش‌نشانی تهران و مدرس دوره‌های آتش‌نشانی سازمان آموزش فنی و حرفه‌ای کشور.",
        image: "/images/instructors/hamidreza-faraji.jpeg",
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
        id: "afshin",
        name: "مهندس افشین کاکاوند",
        role: "مدرس آکادمی کاردو",
        degree: "اطلاعات تکمیلی در حال ثبت",
        experience: "مدرس تخصصی",
        bio: "اطلاعات تکمیلی این مدرس پس از دریافت رزومه و مشخصات رسمی به این بخش اضافه می‌شود.",
        image: "/images/instructors/a.jpg",
    },
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
        id: "hoda-akhoundi",
        name: "دکتر هدی آخوندی",
        role: "رئیس دپارتمان سلامت",
        degree: "دکترای حرفه‌ای پزشکی",
        experience: "مدرس و مدیر حوزه سلامت",
        bio: "پزشک، مدرس و رئیس دپارتمان سلامت و مدیر کلینیک پوست و زیبایی بیمارستان نیکان.",
        image: "/images/instructors/hoda-akhoundi.jpeg",
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
];

export default function WhyKardo() {
    return (
        <section
            dir="rtl"
            className="
        relative
        w-full
        overflow-hidden
        bg-gradient-to-b
        from-[#0B2942]
        via-[#0A243A]
        to-[#061B2D]
        px-4
        py-14

        sm:px-6
        sm:py-16

        lg:px-8
        lg:py-20
      "
        >
            {/* BACKGROUND GLOWS */}

            <div
                className="
          pointer-events-none
          absolute
          -right-40
          -top-32
          h-[420px]
          w-[420px]
          rounded-full
          bg-orange-400/[0.07]
          blur-[140px]
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
          bg-cyan-300/[0.06]
          blur-[140px]
        "
            />

            <div className="relative mx-auto w-full max-w-[1380px]">

                {/* =========================
            HEADER
        ========================== */}

                <div className="mx-auto max-w-4xl text-center">

                    <div
                        className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-orange-300/30
              bg-orange-400/[0.06]
              px-4
              py-2
              text-[11px]
              font-black
              text-orange-300

              sm:text-xs
            "
                    >
                        <span className="h-2 w-2 rounded-full bg-orange-400" />

                        تیم آموزشی ما
                    </div>


                    <h2
                        className="
              mt-4
              text-[34px]
              font-black
              leading-tight
              text-white

              sm:text-4xl

              lg:text-[50px]
            "
                    >
                        اساتید ما
                    </h2>


                    <p
                        className="
              mx-auto
              mt-3
              max-w-3xl
              text-[13px]
              font-medium
              leading-7
              text-slate-300

              sm:text-sm

              lg:text-base
              lg:leading-8
            "
                    >
                        با تجربه‌ترین متخصصان صنعت، در کنار شما برای یادگیری
                        مهارت‌های واقعی، تخصصی و کاربردی
                    </p>

                </div>


                {/* =========================
            GRID
        ========================== */}

                <div
                    className="
            mt-10
            grid
            grid-cols-1
            gap-5

            md:grid-cols-2

            lg:mt-12
            lg:grid-cols-3
            lg:gap-5

            xl:gap-6
          "
                >
                    {instructors.map((instructor, index) => (
                        <InstructorCard
                            key={instructor.id}
                            instructor={instructor}
                            number={index + 1}
                        />
                    ))}
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
    const isFounder = instructor.id === "saleh-salehi";

    return (
        <article
            className="
        group
        relative
        min-w-0
        overflow-hidden

        rounded-[22px]

        border
        border-white/[0.10]

        bg-[#0B2B45]

        shadow-[0_14px_36px_rgba(0,0,0,0.18)]

        transition-all
        duration-500

        hover:-translate-y-1.5
        hover:border-orange-300/30
        hover:shadow-[0_24px_60px_rgba(0,0,0,0.28)]

        lg:rounded-[25px]
      "
        >

            {/* =====================================
          IMAGE — FULL IMAGE WITHOUT CROPPING
      ====================================== */}

            <div
                className="
          relative
          h-[250px]
          w-full
          overflow-hidden
          bg-[#071C2F]

          sm:h-[270px]

          lg:h-[290px]
        "
            >

                {instructor.image ? (
                    <>
                        {/* blurred background */}

                        <img
                            src={instructor.image}
                            alt=""
                            aria-hidden="true"
                            className="
                absolute
                inset-[-25px]
                h-[calc(100%+50px)]
                w-[calc(100%+50px)]
                scale-110
                object-cover
                opacity-45
                blur-2xl
              "
                        />


                        {/* dark layer */}

                        <div
                            className="
                absolute
                inset-0
                z-[1]
                bg-[#061a2b]/35
              "
                        />


                        {/* FULL REAL IMAGE */}

                        <img
                            src={instructor.image}
                            alt={instructor.name}
                            loading="lazy"
                            className="
                absolute
                inset-0
                z-[2]

                h-full
                w-full

                object-contain

                transition-transform
                duration-700

                group-hover:scale-[1.025]
              "
                        />
                    </>
                ) : (

                    /* NO PHOTO */

                    <div
                        className="
              absolute
              inset-0
              flex
              items-center
              justify-center

              bg-gradient-to-br
              from-[#173B56]
              via-[#102E47]
              to-[#071B2E]
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
                  text-4xl
                  font-black
                  text-orange-200
                "
                            >
                                {instructor.name.charAt(0)}
                            </span>
                        </div>
                    </div>

                )}


                {/* subtle bottom fade */}

                <div
                    className="
            pointer-events-none
            absolute
            inset-0
            z-[3]

            bg-gradient-to-t
            from-[#071B2D]/55
            via-transparent
            to-transparent
          "
                />


                {/* NUMBER */}

                <div
                    className="
            absolute
            left-3
            top-3
            z-[5]

            rounded-full

            border
            border-white/15

            bg-[#071B2D]/80

            px-2.5
            py-1

            text-[10px]
            font-black
            tracking-[0.14em]
            text-white

            shadow-lg

            backdrop-blur-md
          "
                >
                    {String(number).padStart(2, "0")}
                </div>

            </div>


            {/* =====================================
          CONTENT
      ====================================== */}

            <div
                className="
          relative

          px-5
          pb-5
          pt-0

          sm:px-6
          sm:pb-6
        "
            >

                {/* ROLE BADGE */}

                <div
                    className="
            relative
            z-10

            -mt-4
            mb-4
          "
                >
                    <span
                        className={`
              inline-flex
              max-w-full
              items-center

              rounded-full

              border

              px-3.5
              py-1.5

              text-[11px]
              font-black
              leading-5

              shadow-[0_7px_20px_rgba(0,0,0,0.28)]

              backdrop-blur-xl

              sm:text-xs

              ${isFounder
                                ? `
                    border-orange-200/50
                    bg-orange-400
                    text-[#07192D]
                  `
                                : `
                    border-orange-300/25

                    bg-gradient-to-l
                    from-[#A8442B]
                    to-[#7D332B]

                    text-orange-100
                  `
                            }
            `}
                    >
                        {instructor.role}
                    </span>
                </div>


                {/* NAME */}

                <h3
                    className="
            text-[20px]
            font-black
            leading-[1.6]
            text-white

            sm:text-[22px]

            lg:text-[24px]
          "
                >
                    {instructor.name}
                </h3>


                {/* DEGREE */}

                <p
                    className="
            mt-1.5

            text-[12px]
            font-bold
            leading-6

            text-orange-200

            sm:text-[13px]
          "
                >
                    {instructor.degree}
                </p>


                {/* EXPERIENCE */}

                <div
                    className="
            mt-3

            inline-flex
            items-center

            rounded-full

            border
            border-white/[0.09]

            bg-white/[0.045]

            px-3
            py-1.5

            text-[11px]
            font-bold

            text-slate-200

            sm:text-xs
          "
                >
                    {instructor.experience}
                </div>


                {/* BIO */}

                <p
                    className="
            mt-4

            min-h-[64px]

            text-[12px]
            leading-7

            text-slate-300

            sm:text-[13px]

            lg:min-h-[72px]
            lg:text-[13px]
            lg:leading-7
          "
                >
                    {instructor.bio}
                </p>

            </div>

        </article>
    );
}