"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = {
    label: string;
    href: string;
};

const navItems: NavItem[] = [
    {
        label: "خانه",
        href: "/",
    },
    {
        label: "دوره‌های اختصاصی",
        href: "/courses?category=organization",
    },
    {
        label: "فنی و حرفه‌ای",
        href: "/courses?category=technical",
    },
    {
        label: "بین‌المللی",
        href: "/courses?category=international",
    },
    {
        label: "مجوزها",
        href: "/licenses",
    },
    {
        label: "درباره ما",
        href: "/about",
    },
];

function MenuIcon({ open }: { open: boolean }) {
    return (
        <span className="relative block h-5 w-5">
            <span
                className={`
          absolute left-0 top-[3px]
          h-[2px] w-5
          rounded-full bg-current
          transition-all duration-300
          ${open ? "translate-y-[6px] rotate-45" : ""}
        `}
            />

            <span
                className={`
          absolute left-0 top-[9px]
          h-[2px] w-5
          rounded-full bg-current
          transition-all duration-300
          ${open ? "opacity-0" : "opacity-100"}
        `}
            />

            <span
                className={`
          absolute left-0 top-[15px]
          h-[2px] w-5
          rounded-full bg-current
          transition-all duration-300
          ${open ? "-translate-y-[6px] -rotate-45" : ""}
        `}
            />
        </span>
    );
}

function ArrowIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M19 12H5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />

            <path
                d="M10 7L5 12L10 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function Navbar() {
    const pathname = usePathname();

    const [mobileOpen, setMobileOpen] =
        useState(false);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 1024) {
                setMobileOpen(false);
            }
        }

        window.addEventListener(
            "resize",
            handleResize
        );

        return () => {
            window.removeEventListener(
                "resize",
                handleResize
            );
        };
    }, []);

    function isActive(href: string) {
        if (href === "/") {
            return pathname === "/";
        }

        const cleanHref =
            href.split("?")[0];

        return pathname === cleanHref;
    }

    return (
        <header
            dir="rtl"
            className="
        sticky
        top-0
        z-[100]
        w-full

        border-b
        border-white/[0.07]

        bg-[#06192E]/95

        pt-[env(safe-area-inset-top)]

        text-white

        shadow-[0_8px_30px_rgba(0,0,0,0.12)]

        backdrop-blur-2xl
      "
        >
            <div
                className="
          relative
          mx-auto

          flex
          min-h-[68px]
          max-w-[1500px]
          items-center
          justify-between
          gap-3

          px-3

          sm:min-h-[74px]
          sm:px-5

          lg:min-h-[82px]
          lg:px-8

          xl:px-10
        "
            >
                {/* ================================
            LOGO
        ================================= */}

                <Link
                    href="/"
                    aria-label="صفحه اصلی کاردو"
                    className="
            group
            flex
            shrink-0
            items-center
            gap-2.5
          "
                >
                    <div
                        className="
              relative

              flex
              h-10
              w-10

              shrink-0

              items-center
              justify-center

              overflow-hidden

              rounded-[13px]

              bg-white

              shadow-[0_8px_22px_rgba(0,0,0,0.14)]

              sm:h-11
              sm:w-11
            "
                    >
                        <Image
                            src="/logo.png"
                            alt="کاردو"
                            fill
                            priority
                            sizes="44px"
                            className="
                object-contain
                p-1.5
              "
                        />
                    </div>

                    <div
                        className="
              hidden
              leading-none
              sm:block
            "
                    >
                        <strong
                            className="
                block
                text-[14px]
                font-black
                tracking-[0.04em]
                text-white
              "
                        >
                            CARDO
                        </strong>

                        <span
                            className="
                mt-1
                block
                text-[7px]
                font-bold
                tracking-[0.08em]
                text-slate-500
              "
                        >
                            TRAINING ACADEMY
                        </span>
                    </div>
                </Link>

                {/* ================================
            DESKTOP MENU
        ================================= */}

                <nav
                    aria-label="منوی اصلی"
                    className="
            hidden
            min-w-0
            flex-1
            items-center
            justify-center
            gap-1

            lg:flex

            xl:gap-1.5
          "
                >
                    {navItems.map((item) => {
                        const active =
                            isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                  relative

                  whitespace-nowrap

                  rounded-full

                  px-3
                  py-2.5

                  text-[10px]
                  font-black

                  transition-all
                  duration-200

                  xl:px-3.5
                  xl:text-[11px]

                  ${active
                                        ? `
                        bg-white/[0.07]
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
                                {item.label}

                                {active && (
                                    <span
                                        className="
                      absolute
                      -bottom-[1px]
                      left-1/2

                      h-[2px]
                      w-5

                      -translate-x-1/2

                      rounded-full

                      bg-orange-400
                    "
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* ================================
            DESKTOP ACTIONS
        ================================= */}

                <div
                    className="
            hidden
            shrink-0
            items-center
            gap-2

            lg:flex
          "
                >
                    {/* ARABIC */}

                    <Link
                        href="/ar"
                        aria-label="نسخه عربی سایت"
                        className="
              inline-flex
              min-h-[40px]

              items-center
              justify-center
              gap-1.5

              rounded-full

              border
              border-cyan-300/20

              bg-cyan-300/[0.06]

              px-3.5

              text-[10px]
              font-black
              text-cyan-100

              transition

              hover:-translate-y-0.5
              hover:border-cyan-300/35
              hover:bg-cyan-300/[0.10]
            "
                    >
                        <span>العربية</span>

                        <span
                            dir="ltr"
                            className="
                rounded-full

                bg-cyan-300/10

                px-1.5
                py-0.5

                text-[8px]
                text-cyan-200
              "
                        >
                            AR
                        </span>
                    </Link>

                    {/* REQUEST */}

                    <Link
                        href="/courses?category=organization"
                        className="
              inline-flex
              min-h-[42px]

              items-center
              justify-center
              gap-2

              rounded-full

              bg-orange-400

              px-4

              text-[10px]
              font-black
              text-[#06192E]

              shadow-[0_10px_24px_rgba(251,146,60,0.16)]

              transition

              hover:-translate-y-0.5
              hover:bg-orange-300

              xl:px-5
              xl:text-[11px]
            "
                    >
                        درخواست دوره

                        <ArrowIcon />
                    </Link>
                </div>

                {/* ================================
            MOBILE BUTTONS
        ================================= */}

                <div
                    className="
            flex
            items-center
            gap-2

            lg:hidden
          "
                >
                    {/* AR MOBILE */}

                    <Link
                        href="/ar"
                        aria-label="نسخه عربی"
                        className="
              inline-flex

              h-10
              min-w-[46px]

              items-center
              justify-center

              rounded-full

              border
              border-cyan-300/20

              bg-cyan-300/[0.06]

              px-3

              text-[10px]
              font-black
              text-cyan-100

              transition

              active:scale-[0.97]
            "
                    >
                        AR
                    </Link>

                    {/* MENU */}

                    <button
                        type="button"
                        onClick={() =>
                            setMobileOpen(
                                (current) => !current
                            )
                        }
                        aria-expanded={mobileOpen}
                        aria-label={
                            mobileOpen
                                ? "بستن منو"
                                : "باز کردن منو"
                        }
                        className="
              flex
              h-10
              w-10

              items-center
              justify-center

              rounded-full

              border
              border-white/[0.09]

              bg-white/[0.045]

              text-white

              transition

              hover:bg-white/[0.08]

              active:scale-[0.97]
            "
                    >
                        <MenuIcon
                            open={mobileOpen}
                        />
                    </button>
                </div>

                {/* ================================
            MOBILE MENU
        ================================= */}

                <div
                    className={`
            absolute

            inset-x-3

            top-[calc(100%+8px)]

            z-[120]

            origin-top

            overflow-hidden

            rounded-[22px]

            border
            border-white/[0.08]

            bg-[#0A2035]/98

            shadow-[0_24px_70px_rgba(0,0,0,0.36)]

            backdrop-blur-2xl

            transition-all
            duration-200

            lg:hidden

            ${mobileOpen
                            ? `
                  pointer-events-auto
                  translate-y-0
                  scale-100
                  opacity-100
                `
                            : `
                  pointer-events-none
                  -translate-y-2
                  scale-[0.98]
                  opacity-0
                `
                        }
          `}
                >
                    <div
                        className="
              max-h-[calc(100dvh-105px-env(safe-area-inset-top))]

              overflow-y-auto

              p-2.5

              [scrollbar-width:none]

              [&::-webkit-scrollbar]:hidden
            "
                    >
                        <nav
                            aria-label="منوی موبایل"
                            className="grid gap-1"
                        >
                            {navItems.map((item) => {
                                const active =
                                    isActive(item.href);

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() =>
                                            setMobileOpen(false)
                                        }
                                        className={`
                      flex
                      min-h-[46px]

                      items-center
                      justify-between
                      gap-3

                      rounded-[15px]

                      px-4

                      text-[12px]
                      font-black

                      transition

                      ${active
                                                ? `
                            bg-orange-400
                            text-[#06192E]
                          `
                                                : `
                            bg-white/[0.025]
                            text-slate-200

                            hover:bg-white/[0.06]
                          `
                                            }
                    `}
                                    >
                                        <span>
                                            {item.label}
                                        </span>

                                        <span
                                            className={`
                        text-sm

                        ${active
                                                    ? "text-[#06192E]"
                                                    : "text-slate-600"
                                                }
                      `}
                                        >
                                            ←
                                        </span>
                                    </Link>
                                );
                            })}
                        </nav>

                        <div
                            className="
                my-2.5
                h-px
                bg-white/[0.07]
              "
                        />

                        {/* ARABIC MOBILE */}

                        <Link
                            href="/ar"
                            onClick={() =>
                                setMobileOpen(false)
                            }
                            className="
                flex
                min-h-[48px]

                items-center
                justify-between
                gap-3

                rounded-[15px]

                border
                border-cyan-300/15

                bg-cyan-300/[0.06]

                px-4

                text-sm
                font-black
                text-cyan-100

                transition

                hover:bg-cyan-300/[0.10]
              "
                        >
                            <span>
                                النسخة العربية
                            </span>

                            <span
                                dir="ltr"
                                className="
                  rounded-full

                  bg-cyan-300/10

                  px-2
                  py-1

                  text-[9px]
                  text-cyan-200
                "
                            >
                                AR
                            </span>
                        </Link>

                        {/* REQUEST MOBILE */}

                        <Link
                            href="/courses?category=organization"
                            onClick={() =>
                                setMobileOpen(false)
                            }
                            className="
                mt-2

                flex
                min-h-[50px]

                items-center
                justify-center
                gap-2

                rounded-[15px]

                bg-orange-400

                px-4

                text-xs
                font-black
                text-[#06192E]

                transition

                active:scale-[0.99]
              "
                        >
                            درخواست دوره اختصاصی

                            <ArrowIcon />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}