"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

const courseLinks = [
    {
        title: "اختصاصی سازمان‌ها",
        href: "/courses?category=organization",
    },
    {
        title: "بین‌المللی",
        href: "/courses?category=international",
    },
    {
        title: "فنی و حرفه‌ای",
        href: "/courses?category=technical",
    },
];

export default function Navbar() {
    const pathname = usePathname();

    const [open, setOpen] = useState(false);

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

    return (
        <header
            dir="rtl"
            className="
        sticky
        top-0
        z-[100]
        w-full
        bg-[#0B2239]/95
        px-3
        py-2
        backdrop-blur-xl

        sm:px-4
        lg:bg-transparent
        lg:px-8
        lg:pt-3
      "
            style={{
                paddingTop:
                    "max(8px, env(safe-area-inset-top))",
            }}
        >
            <div
                className="
          mx-auto
          max-w-[1500px]
        "
            >
                {/* =========================
            NAVBAR
        ========================= */}

                <nav
                    className="
            flex
            min-h-[64px]
            items-center
            justify-between
            rounded-[22px]
            border
            border-white/[0.08]
            bg-[#102A43]/95
            px-3
            shadow-[0_14px_40px_rgba(0,0,0,0.18)]
            backdrop-blur-xl

            sm:min-h-[70px]
            sm:px-4

            lg:min-h-[86px]
            lg:rounded-[30px]
            lg:px-6
          "
                >
                    {/* LOGO */}

                    <Link
                        href="/"
                        onClick={() =>
                            setOpen(false)
                        }
                        className="
              flex
              shrink-0
              items-center
              gap-2
            "
                    >
                        <div
                            className="
                flex
                h-[45px]
                w-[45px]
                items-center
                justify-center
                rounded-[14px]
                bg-white
                p-1.5

                sm:h-[50px]
                sm:w-[50px]

                lg:h-[58px]
                lg:w-[58px]
                lg:rounded-[17px]
              "
                        >
                            <Image
                                src="/logo.png"
                                alt="مجتمع آموزشی کاردو"
                                width={58}
                                height={58}
                                priority
                                className="
                  h-full
                  w-full
                  object-contain
                "
                            />
                        </div>

                        <div
                            className="
                hidden
                sm:block
                lg:hidden
              "
                        >
                            <p
                                className="
                  text-xs
                  font-black
                  text-white
                "
                            >
                                کاردو
                            </p>

                            <p
                                className="
                  mt-0.5
                  text-[8px]
                  text-slate-500
                "
                            >
                                CARDO ACADEMY
                            </p>
                        </div>
                    </Link>


                    {/* =========================
              DESKTOP MENU
          ========================= */}

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
                    text-[13px]
                    font-black
                    transition

                    ${active
                                            ? "text-white"
                                            : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                                        }
                  `}
                                >
                                    {item.title}

                                    {active && (
                                        <span
                                            className="
                        absolute
                        -bottom-[4px]
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

                        <Link
                            href="/#partners"
                            className="
                rounded-full
                px-4
                py-3
                text-[13px]
                font-black
                text-slate-300
                transition

                hover:bg-white/[0.05]
                hover:text-white
              "
                        >
                            مشتریان ما
                        </Link>
                    </div>


                    {/* =========================
              DESKTOP BUTTONS
          ========================= */}

                    <div
                        className="
              hidden
              items-center
              gap-2
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

                hover:text-white
              "
                        >
                            ورود
                        </button>

                        <button
                            type="button"
                            className="
                rounded-[17px]
                bg-orange-400
                px-6
                py-3.5
                text-sm
                font-black
                text-[#07192D]
                transition

                hover:bg-orange-300
              "
                        >
                            ثبت‌نام
                        </button>
                    </div>


                    {/* =========================
              MOBILE ACTIONS
          ========================= */}

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
                py-2.5
                text-[10px]
                font-black
                text-[#07192D]

                sm:inline-flex
              "
                        >
                            دوره‌ها
                        </Link>

                        <button
                            type="button"
                            onClick={() =>
                                setOpen((prev) => !prev)
                            }
                            aria-label="منوی سایت"
                            aria-expanded={open}
                            className="
                flex
                h-[44px]
                w-[44px]
                items-center
                justify-center
                rounded-[14px]
                border
                border-white/10
                bg-white/[0.05]
              "
                        >
                            <div
                                className="
                  relative
                  h-[16px]
                  w-[20px]
                "
                            >
                                <span
                                    className={`
                    absolute
                    left-0
                    top-0
                    h-[2px]
                    w-full
                    rounded-full
                    bg-white
                    transition-all
                    duration-300

                    ${open
                                            ? "top-[7px] rotate-45"
                                            : ""
                                        }
                  `}
                                />

                                <span
                                    className={`
                    absolute
                    left-0
                    top-[7px]
                    h-[2px]
                    rounded-full
                    bg-white
                    transition-all
                    duration-300

                    ${open
                                            ? "w-0 opacity-0"
                                            : "w-[14px]"
                                        }
                  `}
                                />

                                <span
                                    className={`
                    absolute
                    bottom-0
                    left-0
                    h-[2px]
                    w-full
                    rounded-full
                    bg-white
                    transition-all
                    duration-300

                    ${open
                                            ? "bottom-[7px] -rotate-45"
                                            : ""
                                        }
                  `}
                                />
                            </div>
                        </button>
                    </div>
                </nav>


                {/* =========================
            MOBILE MENU
        ========================= */}

                <div
                    className={`
            overflow-hidden
            transition-all
            duration-300
            lg:hidden

            ${open
                            ? `
                  mt-2
                  max-h-[calc(100dvh-95px)]
                  opacity-100
                `
                            : `
                  max-h-0
                  opacity-0
                `
                        }
          `}
                >
                    <div
                        className="
              max-h-[calc(100dvh-105px)]
              overflow-y-auto
              rounded-[24px]
              border
              border-white/[0.08]
              bg-[#0D263D]/98
              p-3
              shadow-[0_20px_55px_rgba(0,0,0,0.28)]
              backdrop-blur-2xl
            "
                    >
                        {/* MAIN LINKS */}

                        <div
                            className="
                space-y-1
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
                      min-h-[48px]
                      items-center
                      justify-between
                      rounded-[15px]
                      px-4
                      text-[12px]
                      font-black

                      ${active
                                                ? `
                            bg-orange-400/[0.10]
                            text-orange-200
                          `
                                                : `
                            text-slate-200
                          `
                                            }
                    `}
                                    >
                                        <span>
                                            {item.title}
                                        </span>

                                        <span
                                            className="
                        text-sm
                        text-slate-500
                      "
                                        >
                                            ←
                                        </span>
                                    </Link>
                                );
                            })}


                            <Link
                                href="/#partners"
                                onClick={() =>
                                    setOpen(false)
                                }
                                className="
                  flex
                  min-h-[48px]
                  items-center
                  justify-between
                  rounded-[15px]
                  px-4
                  text-[12px]
                  font-black
                  text-slate-200
                "
                            >
                                <span>
                                    مشتریان ما
                                </span>

                                <span
                                    className="
                    text-sm
                    text-slate-500
                  "
                                >
                                    ←
                                </span>
                            </Link>
                        </div>


                        {/* DIVIDER */}

                        <div
                            className="
                my-3
                h-px
                bg-white/[0.07]
              "
                        />


                        {/* COURSE LINKS */}

                        <div
                            className="
                rounded-[18px]
                bg-white/[0.025]
                p-3
              "
                        >
                            <p
                                className="
                  mb-3
                  text-[9px]
                  font-black
                  text-slate-500
                "
                            >
                                مسیرهای آموزشی
                            </p>

                            <div
                                className="
                  grid
                  grid-cols-1
                  gap-2
                "
                            >
                                {courseLinks.map(
                                    (item) => (
                                        <Link
                                            key={
                                                item.title
                                            }
                                            href={
                                                item.href
                                            }
                                            onClick={() =>
                                                setOpen(
                                                    false
                                                )
                                            }
                                            className="
                        flex
                        min-h-[44px]
                        items-center
                        justify-between
                        rounded-[13px]
                        border
                        border-white/[0.06]
                        bg-white/[0.025]
                        px-3
                        text-[10px]
                        font-black
                        text-white
                      "
                                        >
                                            <span>
                                                {item.title}
                                            </span>

                                            <span
                                                className="
                          text-orange-300
                        "
                                            >
                                                ←
                                            </span>
                                        </Link>
                                    )
                                )}
                            </div>
                        </div>


                        {/* MOBILE AUTH */}

                        <div
                            className="
                mt-3
                grid
                grid-cols-2
                gap-2
              "
                        >
                            <button
                                type="button"
                                className="
                  min-h-[44px]
                  rounded-[14px]
                  border
                  border-white/10
                  bg-white/[0.035]
                  text-[11px]
                  font-black
                  text-white
                "
                            >
                                ورود
                            </button>

                            <button
                                type="button"
                                className="
                  min-h-[44px]
                  rounded-[14px]
                  bg-orange-400
                  text-[11px]
                  font-black
                  text-[#07192D]
                "
                            >
                                ثبت‌نام
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}