"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const menuItems = [
    {
        title: "خانه",
        href: "/",
        exact: true,
    },
    {
        title: "دوره‌ها",
        href: "/courses",
    },
    {
        title: "درباره ما",
        href: "/about",
    },
    {
        title: "مجوزها",
        href: "/licenses",
        exact: true,
    },
    {
        title: "مدارک و گواهی‌ها",
        href: "/about#certificates",
    },
];

export default function Navbar() {
    const pathname = usePathname();

    const [open, setOpen] = useState(false);

    /* =========================================================
       CLOSE MOBILE MENU ON ROUTE CHANGE
    ========================================================= */

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    /* =========================================================
       LOCK BODY WHEN MENU OPEN
    ========================================================= */

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    function isActive(
        href: string,
        exact?: boolean
    ) {
        if (href.includes("#")) {
            return false;
        }

        if (exact) {
            return pathname === href;
        }

        return pathname.startsWith(href);
    }

    function goToPartners() {
        setOpen(false);

        if (pathname === "/") {
            setTimeout(() => {
                document
                    .getElementById("partners")
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
            }, 50);

            return;
        }

        window.location.href = "/#partners";
    }

    return (
        <>
            <header
                dir="rtl"
                className="
          relative
          z-[500]
          px-3
          pt-3
          sm:px-5
          lg:px-8
        "
            >
                <nav
                    className="
            mx-auto
            flex
            h-[74px]
            max-w-[1500px]
            items-center
            justify-between
            rounded-[28px]
            border
            border-white/[0.10]
            bg-[#0B2239]/90
            px-4
            shadow-[0_18px_60px_rgba(0,0,0,0.18)]
            backdrop-blur-2xl

            sm:h-[82px]
            sm:px-5

            lg:h-[90px]
            lg:rounded-[34px]
            lg:px-7
          "
                >
                    {/* =====================================================
              LOGO
          ====================================================== */}

                    <Link
                        href="/"
                        className="
              relative
              flex
              shrink-0
              items-center
              justify-center
              rounded-[17px]
              bg-white
              p-2
              transition
              duration-300
              hover:scale-[1.03]

              sm:rounded-[19px]
              sm:p-2.5
            "
                    >
                        <Image
                            src="/logo.png"
                            alt="مجتمع آموزشی کاردو"
                            width={58}
                            height={58}
                            priority
                            className="
                h-[42px]
                w-[42px]
                object-contain

                sm:h-[48px]
                sm:w-[48px]
              "
                        />
                    </Link>


                    {/* =====================================================
              DESKTOP MENU
          ====================================================== */}

                    <div
                        className="
              hidden
              items-center
              gap-1
              lg:flex
            "
                    >
                        {menuItems.map((item) => {
                            const active =
                                isActive(
                                    item.href,
                                    item.exact
                                );

                            return (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className={`
                    relative
                    rounded-full
                    px-4
                    py-3
                    text-sm
                    font-black
                    transition
                    duration-300

                    ${active
                                            ? `
                          text-white
                        `
                                            : `
                          text-slate-300
                          hover:bg-white/[0.05]
                          hover:text-white
                        `
                                        }
                  `}
                                >
                                    {item.title}

                                    {active && (
                                        <span
                                            className="
                        absolute
                        -bottom-[7px]
                        right-1/2
                        h-[3px]
                        w-7
                        translate-x-1/2
                        rounded-full
                        bg-orange-400
                      "
                                        />
                                    )}
                                </Link>
                            );
                        })}


                        {/* CUSTOMERS */}

                        <button
                            type="button"
                            onClick={goToPartners}
                            className="
                rounded-full
                px-4
                py-3
                text-sm
                font-black
                text-slate-300
                transition
                duration-300

                hover:bg-white/[0.05]
                hover:text-white
              "
                        >
                            مشتریان ما
                        </button>
                    </div>


                    {/* =====================================================
              DESKTOP AUTH
          ====================================================== */}

                    <div
                        className="
              hidden
              items-center
              gap-3
              lg:flex
            "
                    >
                        <button
                            type="button"
                            className="
                rounded-full
                px-5
                py-3
                text-sm
                font-black
                text-slate-300
                transition

                hover:bg-white/[0.05]
                hover:text-white
              "
                        >
                            ورود
                        </button>

                        <button
                            type="button"
                            className="
                rounded-[18px]
                bg-orange-400
                px-7
                py-4
                text-sm
                font-black
                text-[#07192D]
                shadow-[0_12px_35px_rgba(251,146,60,0.20)]
                transition
                duration-300

                hover:-translate-y-0.5
                hover:bg-orange-300
              "
                        >
                            ثبت‌نام
                        </button>
                    </div>


                    {/* =====================================================
              MOBILE RIGHT SIDE
          ====================================================== */}

                    <div
                        className="
              flex
              items-center
              gap-2
              lg:hidden
            "
                    >
                        <Link
                            href="/courses"
                            className="
                hidden
                rounded-full
                bg-orange-400
                px-4
                py-3
                text-[11px]
                font-black
                text-[#07192D]
                sm:inline-flex
              "
                        >
                            مشاهده دوره‌ها
                        </Link>

                        <button
                            type="button"
                            aria-label={
                                open
                                    ? "بستن منو"
                                    : "باز کردن منو"
                            }
                            onClick={() =>
                                setOpen((prev) => !prev)
                            }
                            className="
                relative
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-[16px]
                border
                border-white/10
                bg-white/[0.05]
                text-white
                transition

                hover:bg-white/[0.08]
              "
                        >
                            <div
                                className="
                  relative
                  h-[18px]
                  w-[22px]
                "
                            >
                                <span
                                    className={`
                    absolute
                    left-0
                    top-0
                    h-[2px]
                    w-[22px]
                    rounded-full
                    bg-white
                    transition
                    duration-300

                    ${open
                                            ? `
                          top-[8px]
                          rotate-45
                        `
                                            : ""
                                        }
                  `}
                                />

                                <span
                                    className={`
                    absolute
                    left-0
                    top-[8px]
                    h-[2px]
                    rounded-full
                    bg-white
                    transition
                    duration-300

                    ${open
                                            ? `
                          w-0
                          opacity-0
                        `
                                            : `
                          w-[16px]
                        `
                                        }
                  `}
                                />

                                <span
                                    className={`
                    absolute
                    bottom-0
                    left-0
                    h-[2px]
                    w-[22px]
                    rounded-full
                    bg-white
                    transition
                    duration-300

                    ${open
                                            ? `
                          bottom-[8px]
                          -rotate-45
                        `
                                            : ""
                                        }
                  `}
                                />
                            </div>
                        </button>
                    </div>
                </nav>
            </header>


            {/* =====================================================
          MOBILE BACKDROP
      ====================================================== */}

            <div
                onClick={() => setOpen(false)}
                className={`
          fixed
          inset-0
          z-[580]
          bg-[#020812]/70
          backdrop-blur-sm
          transition
          duration-300
          lg:hidden

          ${open
                        ? `
                visible
                opacity-100
              `
                        : `
                invisible
                opacity-0
              `
                    }
        `}
            />


            {/* =====================================================
          MOBILE MENU
      ====================================================== */}

            <aside
                dir="rtl"
                className={`
          fixed
          bottom-0
          right-0
          top-0
          z-[600]
          w-[86%]
          max-w-[360px]
          border-l
          border-white/10
          bg-[#081D31]/95
          p-5
          shadow-[-30px_0_80px_rgba(0,0,0,0.35)]
          backdrop-blur-2xl
          transition-transform
          duration-500
          lg:hidden

          ${open
                        ? `
                translate-x-0
              `
                        : `
                translate-x-full
              `
                    }
        `}
            >
                {/* MOBILE MENU HEADER */}

                <div
                    className="
            flex
            items-center
            justify-between
          "
                >
                    <Link
                        href="/"
                        onClick={() => setOpen(false)}
                        className="
              flex
              items-center
              gap-3
            "
                    >
                        <div
                            className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-[15px]
                bg-white
                p-2
              "
                        >
                            <Image
                                src="/logo.png"
                                alt="کاردو"
                                width={42}
                                height={42}
                                className="
                  h-full
                  w-full
                  object-contain
                "
                            />
                        </div>

                        <div>
                            <p
                                className="
                  text-sm
                  font-black
                  text-white
                "
                            >
                                مجتمع آموزشی کاردو
                            </p>

                            <p
                                className="
                  mt-1
                  text-[9px]
                  text-slate-500
                "
                            >
                                CARDO ACADEMY
                            </p>
                        </div>
                    </Link>


                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/[0.04]
              text-xl
              text-white
            "
                    >
                        ×
                    </button>
                </div>


                {/* DIVIDER */}

                <div
                    className="
            my-6
            h-px
            bg-white/[0.07]
          "
                />


                {/* MOBILE NAVIGATION */}

                <div
                    className="
            space-y-2
          "
                >
                    {menuItems.map((item) => {
                        const active =
                            isActive(
                                item.href,
                                item.exact
                            );

                        return (
                            <Link
                                key={item.title}
                                href={item.href}
                                onClick={() =>
                                    setOpen(false)
                                }
                                className={`
                  flex
                  min-h-[54px]
                  items-center
                  justify-between
                  rounded-[18px]
                  border
                  px-4
                  text-sm
                  font-black
                  transition

                  ${active
                                        ? `
                        border-orange-400/20
                        bg-orange-400/[0.09]
                        text-orange-200
                      `
                                        : `
                        border-transparent
                        text-slate-200
                        hover:border-white/[0.06]
                        hover:bg-white/[0.04]
                      `
                                    }
                `}
                            >
                                <span>{item.title}</span>

                                <span
                                    className={`
                    text-lg

                    ${active
                                            ? "text-orange-300"
                                            : "text-slate-600"
                                        }
                  `}
                                >
                                    ←
                                </span>
                            </Link>
                        );
                    })}


                    {/* CUSTOMERS */}

                    <button
                        type="button"
                        onClick={goToPartners}
                        className="
              flex
              min-h-[54px]
              w-full
              items-center
              justify-between
              rounded-[18px]
              px-4
              text-right
              text-sm
              font-black
              text-slate-200
              transition

              hover:bg-white/[0.04]
            "
                    >
                        <span>مشتریان ما</span>

                        <span
                            className="
                text-lg
                text-slate-600
              "
                        >
                            ←
                        </span>
                    </button>
                </div>


                {/* =================================================
            MOBILE COURSES QUICK LINKS
        ================================================== */}

                <div
                    className="
            mt-7
            rounded-[22px]
            border
            border-white/[0.07]
            bg-white/[0.025]
            p-3
          "
                >
                    <p
                        className="
              px-2
              pb-3
              text-[10px]
              font-black
              text-slate-500
            "
                    >
                        مسیرهای آموزشی
                    </p>


                    <div
                        className="
              space-y-2
            "
                    >
                        <Link
                            href="/courses?category=organization"
                            onClick={() =>
                                setOpen(false)
                            }
                            className="
                flex
                items-center
                justify-between
                rounded-[15px]
                bg-white/[0.035]
                px-3
                py-3
                text-[11px]
                font-bold
                text-white
              "
                        >
                            اختصاصی سازمان‌ها

                            <span className="text-orange-300">
                                ←
                            </span>
                        </Link>


                        <Link
                            href="/courses?category=international"
                            onClick={() =>
                                setOpen(false)
                            }
                            className="
                flex
                items-center
                justify-between
                rounded-[15px]
                bg-white/[0.035]
                px-3
                py-3
                text-[11px]
                font-bold
                text-white
              "
                        >
                            دوره‌های بین‌المللی

                            <span className="text-orange-300">
                                ←
                            </span>
                        </Link>


                        <Link
                            href="/courses?category=technical"
                            onClick={() =>
                                setOpen(false)
                            }
                            className="
                flex
                items-center
                justify-between
                rounded-[15px]
                bg-white/[0.035]
                px-3
                py-3
                text-[11px]
                font-bold
                text-white
              "
                        >
                            فنی و حرفه‌ای

                            <span className="text-orange-300">
                                ←
                            </span>
                        </Link>
                    </div>
                </div>


                {/* =================================================
            MOBILE AUTH
        ================================================== */}

                <div
                    className="
            absolute
            bottom-5
            left-5
            right-5
            grid
            grid-cols-2
            gap-2
          "
                >
                    <button
                        type="button"
                        className="
              rounded-[17px]
              border
              border-white/10
              bg-white/[0.04]
              py-3.5
              text-xs
              font-black
              text-white
            "
                    >
                        ورود
                    </button>

                    <button
                        type="button"
                        className="
              rounded-[17px]
              bg-orange-400
              py-3.5
              text-xs
              font-black
              text-[#07192D]
            "
                    >
                        ثبت‌نام
                    </button>
                </div>
            </aside>
        </>
    );
}