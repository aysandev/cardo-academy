"use client";

import Link from "next/link";

const categories = [
    {
        id: "organization",
        number: "01",
        title: "دوره‌های اختصاصی",
        description:
            "آموزش‌های تخصصی متناسب با نیاز واقعی سازمان‌ها، شرکت‌ها و تیم‌های حرفه‌ای.",
        href: "/courses?category=organization",
        badge: "ویژه سازمان‌ها",
        accent: "orange",
        image: "/images/categories/organization.jpg",
    },
    {
        id: "international",
        number: "02",
        title: "بین‌المللی",
        description:
            "دوره‌های تخصصی با رویکرد بین‌المللی برای توسعه مهارت‌ها و فرصت‌های حرفه‌ای.",
        href: "/courses?category=international",
        badge: "مسیر بین‌المللی",
        accent: "cyan",
        image: "/images/categories/international.jpg",
    },
    {
        id: "technical",
        number: "03",
        title: "فنی و حرفه‌ای",
        description:
            "دوره‌های مهارتی و کاربردی برای ارتقای توانمندی فردی و ورود حرفه‌ای‌تر به بازار کار.",
        href: "/courses?category=technical",
        badge: "مهارت‌محور",
        accent: "orange",
        image: "/images/categories/technical.jpg",
    },
] as const;

function CategoryImage({
    src,
    alt,
}: {
    src: string;
    alt: string;
}) {
    return (
        <div
            className="
        relative
        h-[170px]
        w-full
        overflow-hidden
        rounded-[18px]
        border
        border-white/[0.07]
        bg-gradient-to-br
        from-[#143650]
        to-[#081D31]

        sm:h-[210px]

        lg:h-[220px]
        lg:w-[38%]
        lg:shrink-0
        lg:rounded-[22px]
      "
        >
            <div
                className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          text-[10px]
          font-black
          text-slate-600
        "
            >
                تصویر دسته
            </div>

            <img
                src={src}
                alt={alt}
                className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          object-center
          transition
          duration-500
          group-hover:scale-[1.025]
        "
                onError={(event) => {
                    event.currentTarget.style.display = "none";
                }}
            />

            <div
                className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-[#06192E]/55
          via-transparent
          to-transparent
        "
            />
        </div>
    );
}

export default function Courses() {
    return (
        <section
            dir="rtl"
            className="
        relative
        overflow-hidden
        bg-[#071B2F]
        px-3
        py-8

        sm:px-5
        sm:py-10

        lg:px-8
        lg:py-12
      "
        >
            <div
                className="
          pointer-events-none
          absolute
          -right-32
          top-0
          h-[320px]
          w-[320px]
          rounded-full
          bg-orange-400/[0.05]
          blur-[120px]
        "
            />

            <div
                className="
          pointer-events-none
          absolute
          -left-32
          bottom-0
          h-[320px]
          w-[320px]
          rounded-full
          bg-cyan-300/[0.05]
          blur-[120px]
        "
            />

            <div
                className="
          relative
          mx-auto
          max-w-[1280px]
        "
            >
                {/* HEADER */}
                <div
                    className="
            mb-6
            text-center

            sm:mb-8
          "
                >
                    <span
                        className="
              text-[9px]
              font-black
              tracking-[0.14em]
              text-orange-300

              sm:text-[10px]
            "
                    >
                        مسیر آموزشی خود را انتخاب کنید
                    </span>

                    <h2
                        className="
              mt-2
              text-[24px]
              font-black
              leading-[1.5]
              text-white

              sm:text-[30px]

              lg:text-[34px]
            "
                    >
                        دسته‌بندی دوره‌های کاردو
                    </h2>

                    <p
                        className="
              mx-auto
              mt-2
              max-w-2xl
              text-[10px]
              leading-6
              text-slate-400

              sm:text-xs
            "
                    >
                        از بین سه مسیر اصلی، دسته مناسب خود را انتخاب کنید.
                    </p>

                </div>
                {/* =========================================================
    CERTIFICATIONS / STANDARDS
========================================================= */}

                <div className="mt-8 sm:mt-10">

                    <div className="mb-4 text-center">
                        <span className="
    text-[8px]
    font-black
    tracking-[0.18em]
    text-slate-500
    sm:text-[9px]
  ">
                            استانداردها و مراجع آموزشی
                        </span>
                    </div>

                    <div
                        dir="ltr"
                        className="
    mx-auto
    flex
    max-w-[850px]
    items-center
    justify-center
    gap-3
    overflow-x-auto
    px-2
    pb-2
    sm:gap-5
    [scrollbar-width:none]
    [&::-webkit-scrollbar]:hidden
  "
                    >

                        {[
                            {
                                name: "IFSAC",
                                image: "/images/certificates/ifsac.png",
                            },
                            {
                                name: "NEBOSH",
                                image: "/images/certificates/nebosh.png",
                            },
                            {
                                name: "IOSH",
                                image: "/images/certificates/iosh.png",
                            },
                            {
                                name: "NFPA",
                                image: "/images/certificates/nfpa.png",
                            },
                            {
                                name: "فنی و حرفه‌ای",
                                image: "/images/certificates/tvto.png",
                            },
                        ].map((item) => (
                            <div
                                key={item.name}
                                className="
        group
        flex
        shrink-0
        flex-col
        items-center
        gap-2
      "
                            >

                                {/* LOGO CIRCLE */}

                                <div
                                    className="
          relative
          flex
          h-[66px]
          w-[66px]
          items-center
          justify-center
          overflow-hidden
          rounded-full
          border
          border-white/[0.10]
          bg-white/[0.06]
          p-2
          shadow-[0_10px_30px_rgba(0,0,0,0.12)]
          backdrop-blur-xl
          transition-all
          duration-300
          group-hover:-translate-y-1
          group-hover:border-orange-300/30
          group-hover:bg-white/[0.10]
          group-hover:shadow-[0_14px_35px_rgba(0,0,0,0.20)]
          sm:h-[76px]
          sm:w-[76px]
          sm:p-2.5
        "
                                >

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="
            h-full
            w-full
            rounded-full
            object-contain
          "
                                        onError={(event) => {
                                            event.currentTarget.style.display = "none";
                                        }}
                                    />

                                </div>

                                {/* NAME */}

                                <span
                                    dir={item.name === "فنی و حرفه‌ای" ? "rtl" : "ltr"}
                                    className="
          max-w-[90px]
          text-center
          text-[8px]
          font-black
          text-slate-500
          transition
          duration-300
          group-hover:text-orange-200
          sm:text-[9px]
        "
                                >
                                    {item.name}
                                </span>

                            </div>
                        ))}

                    </div>

                </div>

                {/* STACKED CATEGORY CARDS */}
                <div
                    className="
            flex
            flex-col
            gap-4

            sm:gap-5
          "
                >
                    {categories.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className="
                group
                relative
                overflow-hidden
                rounded-[24px]
                border
                border-white/[0.08]
                bg-gradient-to-br
                from-[#143650]
                via-[#102B43]
                to-[#0B2439]
                p-3
                shadow-[0_16px_45px_rgba(0,0,0,0.12)]
                transition
                duration-300

                hover:-translate-y-0.5
                hover:border-white/[0.15]
                hover:shadow-[0_22px_58px_rgba(0,0,0,0.18)]

                sm:p-4

                lg:flex
                lg:min-h-[245px]
                lg:items-stretch
                lg:gap-6
                lg:rounded-[28px]
                lg:p-4
              "
                        >
                            <div
                                className={`
                  pointer-events-none
                  absolute
                  -right-24
                  -top-24
                  h-60
                  w-60
                  rounded-full
                  blur-[95px]

                  ${item.accent === "cyan"
                                        ? "bg-cyan-300/[0.09]"
                                        : "bg-orange-400/[0.09]"
                                    }
                `}
                            />

                            <CategoryImage
                                src={item.image}
                                alt={item.title}
                            />

                            <div
                                className="
                  relative
                  flex
                  min-w-0
                  flex-1
                  flex-col
                  justify-between
                  px-1
                  pb-1
                  pt-4

                  sm:px-2

                  lg:px-3
                  lg:py-4
                "
                            >
                                <div>
                                    <div
                                        className="
                      flex
                      flex-wrap
                      items-center
                      justify-between
                      gap-2
                    "
                                    >
                                        <span
                                            className={`
                        inline-flex
                        items-center
                        rounded-full
                        border
                        px-3
                        py-1.5
                        text-[8px]
                        font-black

                        ${item.accent === "cyan"
                                                    ? "border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-200"
                                                    : "border-orange-300/20 bg-orange-300/[0.07] text-orange-200"
                                                }
                      `}
                                        >
                                            {item.badge}
                                        </span>

                                        <span
                                            className="
                        text-[10px]
                        font-black
                        tracking-[0.14em]
                        text-slate-600
                      "
                                        >
                                            {item.number}
                                        </span>
                                    </div>

                                    <h3
                                        className="
                      mt-4
                      text-[22px]
                      font-black
                      leading-8
                      text-white

                      sm:text-[25px]

                      lg:text-[28px]
                    "
                                    >
                                        {item.title}
                                    </h3>

                                    <p
                                        className="
                      mt-2
                      max-w-2xl
                      text-[10px]
                      leading-6
                      text-slate-400

                      sm:text-[11px]
                      sm:leading-7

                      lg:text-xs
                    "
                                    >
                                        {item.description}
                                    </p>
                                </div>

                                <div
                                    className="
                    mt-5
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                                >
                                    <span
                                        className="
                      text-[10px]
                      font-black
                      text-white

                      sm:text-[11px]
                    "
                                    >
                                        مشاهده دوره‌ها
                                    </span>

                                    <span
                                        className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/[0.09]
                      bg-white/[0.045]
                      text-sm
                      text-white
                      transition

                      group-hover:-translate-x-1
                      group-hover:bg-white/[0.08]
                    "
                                    >
                                        ←
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
