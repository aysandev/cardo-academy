import Link from "next/link";

const courses = [
    {
        title: "دوره‌های اختصاصی",
        href: "/courses?category=organization",
        dot: "bg-orange-400",
    },
    {
        title: "دوره‌های فنی و حرفه‌ای",
        href: "/courses?category=technical",
        dot: "bg-orange-400",
    },
    {
        title: "دوره‌های بین‌المللی",
        href: "/courses?category=international",
        dot: "bg-cyan-300",
    },
] as const;

export default function Navbar() {
    return (
        <header
            dir="rtl"
            className="sticky top-0 z-[100] w-full border-b border-white/[0.07] bg-[#06192E]/95 pt-[env(safe-area-inset-top)] text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-2xl"
        >
            <div className="relative mx-auto flex min-h-[68px] max-w-[1500px] items-center justify-between gap-3 px-3 sm:min-h-[74px] sm:px-5 lg:min-h-[82px] lg:px-8 xl:px-10">
                <Link
                    href="/"
                    aria-label="خانه کاردو"
                    className="flex shrink-0 items-center gap-2.5"
                >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[13px] bg-white p-1.5 shadow-[0_8px_22px_rgba(0,0,0,0.14)] sm:h-11 sm:w-11">
                        <img
                            src="/logo.png"
                            alt="کاردو"
                            className="h-full w-full object-contain"
                        />
                    </div>

                    <div className="hidden leading-none sm:block">
                        <strong className="block text-[14px] font-black tracking-[0.04em]">
                            CARDO
                        </strong>
                        <span className="mt-1 block text-[7px] font-bold tracking-[0.08em] text-slate-500">
                            TRAINING ACADEMY
                        </span>
                    </div>
                </Link>

                <nav
                    aria-label="منوی اصلی"
                    className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex xl:gap-2"
                >
                    <Link
                        href="/"
                        className="rounded-full px-3 py-2.5 text-[10px] font-black text-slate-300 transition hover:bg-white/[0.05] hover:text-white xl:px-4 xl:text-[11px]"
                    >
                        خانه
                    </Link>

                    <details className="group relative">
                        <summary className="flex cursor-pointer list-none items-center gap-1.5 rounded-full px-3 py-2.5 text-[10px] font-black text-slate-300 transition hover:bg-white/[0.05] hover:text-white xl:px-4 xl:text-[11px] [&::-webkit-details-marker]:hidden">
                            دوره‌ها
                            <span className="text-[10px] transition-transform duration-200 group-open:rotate-180">
                                ▼
                            </span>
                        </summary>

                        <div className="absolute right-1/2 top-[calc(100%+10px)] z-[150] w-[470px] translate-x-1/2 rounded-[24px] border border-white/[0.10] bg-[#0B2238]/95 p-2.5 shadow-[0_28px_90px_rgba(0,0,0,0.38)] backdrop-blur-[28px]">
                            <div className="grid grid-cols-3 gap-2">
                                {courses.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="group/card rounded-[18px] border border-white/[0.07] bg-white/[0.035] p-3.5 transition hover:-translate-y-0.5 hover:bg-white/[0.065]"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className={`h-2 w-2 rounded-full ${item.dot}`} />
                                            <span className="text-xs text-slate-500">←</span>
                                        </div>

                                        <strong className="mt-3 block text-[11px] font-black leading-6 text-white">
                                            {item.title}
                                        </strong>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </details>

                    <a
                        href="/#customers"
                        className="rounded-full px-3 py-2.5 text-[10px] font-black text-slate-300 transition hover:bg-white/[0.05] hover:text-white xl:px-4 xl:text-[11px]"
                    >
                        مشتریان
                    </a>

                    <Link
                        href="/licenses"
                        className="rounded-full px-3 py-2.5 text-[10px] font-black text-slate-300 transition hover:bg-white/[0.05] hover:text-white xl:px-4 xl:text-[11px]"
                    >
                        مدارک
                    </Link>

                    <Link
                        href="/about"
                        className="rounded-full px-3 py-2.5 text-[10px] font-black text-slate-300 transition hover:bg-white/[0.05] hover:text-white xl:px-4 xl:text-[11px]"
                    >
                        درباره ما
                    </Link>
                </nav>

                <div className="hidden shrink-0 items-center gap-2 lg:flex">
                    <Link
                        href="/ar"
                        className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-3 text-[9px] font-black text-cyan-100 xl:px-4 xl:text-[10px]"
                    >
                        العربية
                        <span className="rounded-full bg-cyan-300/10 px-1.5 py-0.5 text-[8px]">
                            AR
                        </span>
                    </Link>

                    <Link
                        href="/courses?category=organization"
                        className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full bg-orange-400 px-4 text-[9px] font-black text-[#06192E] transition hover:bg-orange-300 xl:px-5 xl:text-[10px]"
                    >
                        درخواست دوره
                        <span>←</span>
                    </Link>
                </div>

                <details className="group relative lg:hidden">
                    <summary
                        aria-label="منو"
                        className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.045] text-white [&::-webkit-details-marker]:hidden"
                    >
                        <span className="text-lg leading-none group-open:hidden">☰</span>
                        <span className="hidden text-lg leading-none group-open:inline">×</span>
                    </summary>

                    <div className="absolute left-0 top-[calc(100%+10px)] z-[160] w-[min(88vw,340px)] rounded-[22px] border border-white/[0.09] bg-[#0A2035]/97 p-2.5 shadow-[0_24px_70px_rgba(0,0,0,0.36)] backdrop-blur-[28px]">
                        <div className="max-h-[calc(100dvh-110px)] overflow-y-auto">
                            <Link
                                href="/"
                                className="flex min-h-[46px] items-center justify-between rounded-[15px] px-4 text-[12px] font-black text-slate-200"
                            >
                                خانه
                                <span>←</span>
                            </Link>

                            <details className="mt-1 overflow-hidden rounded-[15px] border border-white/[0.06] bg-white/[0.025]">
                                <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between px-4 text-[12px] font-black text-slate-200 [&::-webkit-details-marker]:hidden">
                                    دوره‌ها
                                    <span>▼</span>
                                </summary>

                                <div className="grid gap-1 px-2 pb-2">
                                    {courses.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="flex min-h-[46px] items-center justify-between rounded-[13px] border border-white/[0.05] bg-white/[0.025] px-3.5 text-[10px] font-black text-slate-300"
                                        >
                                            <span className="flex items-center gap-2">
                                                <span className={`h-2 w-2 rounded-full ${item.dot}`} />
                                                {item.title}
                                            </span>
                                            <span>←</span>
                                        </Link>
                                    ))}
                                </div>
                            </details>

                            <a
                                href="/#customers"
                                className="mt-1 flex min-h-[46px] items-center justify-between rounded-[15px] px-4 text-[12px] font-black text-slate-200"
                            >
                                مشتریان
                                <span>←</span>
                            </a>

                            <Link
                                href="/licenses"
                                className="mt-1 flex min-h-[46px] items-center justify-between rounded-[15px] px-4 text-[12px] font-black text-slate-200"
                            >
                                مدارک
                                <span>←</span>
                            </Link>

                            <Link
                                href="/about"
                                className="mt-1 flex min-h-[46px] items-center justify-between rounded-[15px] px-4 text-[12px] font-black text-slate-200"
                            >
                                درباره ما
                                <span>←</span>
                            </Link>

                            <Link
                                href="/ar"
                                className="mt-2 flex min-h-[46px] items-center justify-center rounded-[15px] border border-cyan-300/15 bg-cyan-300/[0.06] px-4 text-[11px] font-black text-cyan-100"
                            >
                                العربية
                            </Link>

                            <Link
                                href="/courses?category=organization"
                                className="mt-2 flex min-h-[48px] items-center justify-center rounded-[15px] bg-orange-400 px-4 text-[11px] font-black text-[#06192E]"
                            >
                                درخواست دوره
                            </Link>
                        </div>
                    </div>
                </details>
            </div>
        </header>
    );
}
