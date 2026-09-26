"use client";

import { FormEvent, useState } from "react";

type RequestMode = "organization" | "oman";

const customTrainingAreas = [
    {
        title: "السلامة والصحة المهنية HSE",
        text: "برامج تدريبية مخصصة حسب طبيعة العمل ومستوى الفريق واحتياجات المؤسسة.",
        image: "/images/organization/hse-risk.jpg",
    },
    {
        title: "مكافحة الحرائق",
        text: "تدريب نظري وعملي لفرق الإطفاء والسلامة والاستجابة للطوارئ.",
        image: "/images/organization/fire-extinguishing.jpg",
    },
    {
        title: "المواد الخطرة HAZMAT",
        text: "تدريب متخصص للتعامل الآمن مع المواد الخطرة والاستجابة للحوادث.",
        image: "/images/organization/hazmat.jpg",
    },
    {
        title: "إدارة الحوادث والطوارئ",
        text: "برامج لرفع الجاهزية وتطوير مهارات القيادة والاستجابة في الحالات الطارئة.",
        image: "/images/organization/incident-command.jpg",
    },
];

const processSteps = [
    {
        number: "01",
        title: "نستمع إلى احتياجكم",
        text: "نحدد طبيعة النشاط، عدد المشاركين، المستوى المطلوب ومكان التدريب.",
    },
    {
        number: "02",
        title: "نصمم البرنامج",
        text: "نرتب المحتوى والمحاور وطريقة التنفيذ بما يتناسب مع احتياج المؤسسة.",
    },
    {
        number: "03",
        title: "ننظم التدريب",
        text: "ننسق الجدول والمدرب وآلية التنفيذ وفق الخطة المتفق عليها.",
    },
    {
        number: "04",
        title: "نطور المسار",
        text: "يمكن تحويل التدريب إلى مسار متدرج ومستمر حسب احتياجات الفريق.",
    },
];

const partnerLogos = [
    "/images/partners/nioc.png",
    "/images/partners/nipc.png",
    "/images/partners/nigc.png",
    "/images/partners/red-crescent.png",
    "/images/partners/mammut.png",
    "/images/partners/pipeline.png",
    "/images/partners/nardis.png",
    "/images/partners/samt.png",
];

function SafeImage({
    src,
    alt,
    className = "",
}: {
    src: string;
    alt: string;
    className?: string;
}) {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={(event) => {
                event.currentTarget.style.display = "none";
            }}
        />
    );
}

export default function ArabicLandingPage() {
    const [mode, setMode] = useState<RequestMode>("organization");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    async function submitRequest(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (submitting) return;

        setSubmitting(true);
        setSuccess(false);
        setError("");

        try {
            const data = new FormData(event.currentTarget);

            const common = {
                fullName: data.get("fullName"),
                phone: data.get("phone"),
                city: data.get("city"),
                notes: data.get("notes"),
            };

            const payload =
                mode === "organization"
                    ? {
                        ...common,
                        organizationName: data.get("organizationName"),
                        industry: data.get("industry"),
                        participantCount: data.get("participantCount"),
                        preferredLocation: data.get("preferredLocation"),
                        trainingArea: data.get("trainingArea"),
                        courseTitle: "طلب برنامج تدريبي مؤسسي مخصص",
                        courseGroup: "التدريب المؤسسي المخصص",
                        requestType: "organization",
                    }
                    : {
                        ...common,
                        job: data.get("job"),
                        courseId: "oman-general",
                        courseTitle: "طلب معلومات عن برامج عمان",
                        courseGroup: "برامج عمان",
                        requestType: "oman",
                    };

            const response = await fetch("/api/requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "تعذر إرسال الطلب. يرجى المحاولة مرة أخرى."
                );
            }

            setSuccess(true);
            event.currentTarget.reset();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "حدث خطأ أثناء إرسال الطلب."
            );
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main
            id="top"
            dir="rtl"
            lang="ar"
            className="min-h-screen overflow-hidden bg-[#06192E] text-white"
        >
            {/* HEADER */}
            <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#06192E]/90 backdrop-blur-xl">
                <div className="mx-auto flex min-h-[68px] max-w-[1380px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
                    <a href="#top" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[13px] font-black text-[#06192E]">
                            C
                        </div>

                        <div className="leading-tight">
                            <div className="text-sm font-black tracking-[0.08em]">
                                CARDO
                            </div>
                            <div className="mt-0.5 text-[8px] text-slate-400">
                                PROFESSIONAL TRAINING
                            </div>
                        </div>
                    </a>

                    <nav className="hidden items-center gap-6 text-[11px] font-bold text-slate-300 lg:flex">
                        <a href="#custom" className="transition hover:text-white">
                            التدريب المؤسسي
                        </a>
                        <a href="#oman" className="transition hover:text-white">
                            برامج عمان
                        </a>
                        <a href="#process" className="transition hover:text-white">
                            آلية العمل
                        </a>
                        <a href="#request" className="transition hover:text-white">
                            تواصل معنا
                        </a>
                    </nav>

                    <a
                        href="#request"
                        className="inline-flex min-h-[42px] items-center justify-center rounded-full bg-orange-400 px-4 text-[10px] font-black text-[#06192E] transition hover:bg-orange-300 sm:px-5 sm:text-xs"
                    >
                        اطلب برنامجاً تدريبياً
                    </a>
                </div>
            </header>

            {/* HERO */}
            <section className="relative overflow-hidden px-4 pb-14 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-10 lg:pb-20 lg:pt-16">
                <div className="pointer-events-none absolute -right-40 top-0 h-[440px] w-[440px] rounded-full bg-orange-400/[0.08] blur-[150px]" />
                <div className="pointer-events-none absolute -left-44 bottom-0 h-[480px] w-[480px] rounded-full bg-cyan-300/[0.07] blur-[160px]" />

                <div className="relative mx-auto grid max-w-[1380px] items-center gap-8 lg:grid-cols-[0.93fr_1.07fr] lg:gap-12">
                    {/* TEXT */}
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2 text-[10px] font-black text-cyan-200 sm:text-xs">
                            <span className="h-2 w-2 rounded-full bg-orange-400" />
                            CARDO TRAINING
                        </div>

                        <h1 className="mt-5 max-w-3xl text-[38px] font-black leading-[1.5] tracking-[-1px] text-white sm:text-[50px] lg:text-[62px]">
                            تدريب متخصص
                            <br />
                            <span className="bg-gradient-to-l from-orange-300 via-orange-400 to-cyan-300 bg-clip-text text-transparent">
                                للمؤسسات وبرامج عمان
                            </span>
                        </h1>

                        <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base sm:leading-9">
                            نصمم برامج تدريبية حسب احتياجات المؤسسات، ونوفر مساراً
                            مخصصاً للتعرف على برامج كاردو المتعلقة بعُمان.
                        </p>

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <a
                                href="#request"
                                onClick={() => setMode("organization")}
                                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-orange-400 px-6 text-sm font-black text-[#06192E] transition hover:-translate-y-0.5 hover:bg-orange-300"
                            >
                                اطلب تدريباً لمؤسستك
                                <span>←</span>
                            </a>

                            <a
                                href="#oman"
                                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 text-sm font-black text-white transition hover:bg-white/[0.08]"
                            >
                                استكشف برامج عمان
                            </a>
                        </div>

                        <div className="mt-8 grid gap-2.5 sm:grid-cols-2">
                            <a
                                href="#custom"
                                className="group rounded-[20px] border border-white/[0.08] bg-white/[0.035] p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.06]"
                            >
                                <span className="text-[9px] font-black text-orange-300">
                                    01
                                </span>
                                <h2 className="mt-2 text-sm font-black text-white">
                                    برامج مخصصة للمؤسسات
                                </h2>
                                <p className="mt-1 text-[10px] leading-6 text-slate-500">
                                    محتوى تدريبي مصمم حسب طبيعة العمل واحتياج الفريق.
                                </p>
                            </a>

                            <a
                                href="#oman"
                                className="group rounded-[20px] border border-white/[0.08] bg-white/[0.035] p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.06]"
                            >
                                <span className="text-[9px] font-black text-cyan-300">
                                    02
                                </span>
                                <h2 className="mt-2 text-sm font-black text-white">
                                    برامج عمان
                                </h2>
                                <p className="mt-1 text-[10px] leading-6 text-slate-500">
                                    مسار مخصص للاستفسار والتسجيل في البرامج المرتبطة بعُمان.
                                </p>
                            </a>
                        </div>
                    </div>

                    {/* VISUAL */}
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        <div className="relative min-h-[260px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0B2941] sm:min-h-[320px]">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#173953] to-[#081D31]" />
                            <SafeImage
                                src="/images/ar/organization.jpg"
                                alt="التدريب المؤسسي"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#06192E]/95 via-[#06192E]/25 to-transparent" />

                            <div className="absolute inset-x-0 bottom-0 p-5">
                                <span className="inline-flex rounded-full border border-orange-300/20 bg-orange-400/[0.10] px-3 py-1.5 text-[9px] font-black text-orange-200">
                                    للمؤسسات
                                </span>
                                <h3 className="mt-3 text-xl font-black text-white sm:text-2xl">
                                    برنامج مصمم لاحتياج فريقك
                                </h3>
                            </div>
                        </div>

                        <div className="relative min-h-[260px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0B2941] sm:min-h-[320px]">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0D344A] to-[#071A2D]" />
                            <SafeImage
                                src="/images/ar/oman.jpg"
                                alt="برامج عمان"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#06192E]/95 via-[#06192E]/25 to-transparent" />

                            <div className="absolute inset-x-0 bottom-0 p-5">
                                <span className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1.5 text-[9px] font-black text-cyan-200">
                                    عُمان
                                </span>
                                <h3 className="mt-3 text-xl font-black text-white sm:text-2xl">
                                    برامج كاردو المرتبطة بعُمان
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CUSTOM TRAINING */}
            <section
                id="custom"
                className="relative bg-[#F7FAFC] px-4 py-14 text-[#07192D] sm:px-6 sm:py-16 lg:px-10 lg:py-20"
            >
                <div className="mx-auto max-w-[1280px]">
                    <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
                        <div>
                            <span className="text-[10px] font-black tracking-[0.12em] text-orange-500">
                                TRAINING ON REQUEST
                            </span>
                            <h2 className="mt-3 text-[30px] font-black leading-[1.55] sm:text-[38px]">
                                التدريب المتخصص
                                <br />
                                <span className="text-cyan-700">حسب طلب المؤسسة</span>
                            </h2>
                        </div>

                        <p className="max-w-2xl text-xs leading-7 text-slate-500 sm:text-sm sm:leading-8">
                            بدلاً من برنامج ثابت، يمكن تصميم التدريب وفق طبيعة النشاط،
                            مستوى المشاركين، مكان التنفيذ والمهارات التي تريد المؤسسة تطويرها.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {customTrainingAreas.map((item) => (
                            <article
                                key={item.title}
                                className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(20,45,65,.05)] transition hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(20,45,65,.09)]"
                            >
                                <div className="relative h-[170px] overflow-hidden bg-[#E8F0F4]">
                                    <SafeImage
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#07192D]/65 to-transparent" />
                                </div>

                                <div className="p-4">
                                    <h3 className="text-sm font-black text-[#07192D]">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-[10px] leading-6 text-slate-500">
                                        {item.text}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-7 flex justify-center">
                        <a
                            href="#request"
                            onClick={() => setMode("organization")}
                            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#07192D] px-6 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0D2C48]"
                        >
                            ابدأ طلب برنامج مخصص
                            <span className="text-orange-300">←</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* OMAN */}
            <section
                id="oman"
                className="relative overflow-hidden bg-[#0B2439] px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20"
            >
                <div className="pointer-events-none absolute -right-36 top-8 h-[360px] w-[360px] rounded-full bg-cyan-300/[0.07] blur-[130px]" />

                <div className="relative mx-auto grid max-w-[1280px] gap-7 lg:grid-cols-[1fr_.9fr] lg:items-center lg:gap-12">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-3.5 py-1.5 text-[9px] font-black text-cyan-200">
                            OMAN PROGRAMS
                        </span>

                        <h2 className="mt-4 text-[30px] font-black leading-[1.6] text-white sm:text-[40px] lg:text-[48px]">
                            برامج عمان
                            <br />
                            <span className="text-orange-300">
                                مسار واضح للاستفسار والتسجيل
                            </span>
                        </h2>

                        <p className="mt-4 max-w-2xl text-xs leading-7 text-slate-300 sm:text-sm sm:leading-8">
                            هذا القسم مخصص لبرامج كاردو المرتبطة بعُمان. يمكنكم إرسال
                            بياناتكم واهتماماتكم ليتم التواصل معكم حول البرنامج المناسب.
                        </p>

                        <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
                            {[
                                "معلومات واضحة عن البرنامج",
                                "متابعة طلب التسجيل",
                                "التواصل حسب احتياج المتقدم",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="rounded-[18px] border border-white/[0.08] bg-white/[0.035] p-3.5 text-[10px] font-bold leading-6 text-slate-300"
                                >
                                    <span className="ml-2 text-cyan-300">◆</span>
                                    {item}
                                </div>
                            ))}
                        </div>

                        <a
                            href="#request"
                            onClick={() => setMode("oman")}
                            className="mt-7 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 text-xs font-black text-[#07192D] transition hover:-translate-y-0.5 hover:bg-cyan-200"
                        >
                            الاستفسار عن برامج عمان
                            <span>←</span>
                        </a>
                    </div>

                    <div className="relative min-h-[320px] overflow-hidden rounded-[30px] border border-white/10 bg-[#071A2D] sm:min-h-[400px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0F3A50] to-[#071A2D]" />
                        <SafeImage
                            src="/images/ar/oman.jpg"
                            alt="برامج عمان"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#06192E]/90 via-transparent to-transparent" />

                        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                            <span className="text-[9px] font-black text-cyan-200">
                                CARDO / OMAN
                            </span>
                            <p className="mt-2 max-w-md text-sm font-black leading-7 text-white sm:text-base">
                                تعرف على البرامج المتاحة واختر المسار المناسب لاحتياجك.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section
                id="process"
                className="bg-[#F7FAFC] px-4 py-14 text-[#07192D] sm:px-6 sm:py-16 lg:px-10 lg:py-20"
            >
                <div className="mx-auto max-w-[1180px]">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-[9px] font-black tracking-[0.12em] text-cyan-700">
                            HOW IT WORKS
                        </span>
                        <h2 className="mt-3 text-[28px] font-black sm:text-[36px]">
                            من الطلب إلى تنفيذ التدريب
                        </h2>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {processSteps.map((step) => (
                            <div
                                key={step.number}
                                className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(20,45,65,.04)]"
                            >
                                <span className="text-[10px] font-black text-orange-500">
                                    {step.number}
                                </span>
                                <h3 className="mt-3 text-sm font-black">{step.title}</h3>
                                <p className="mt-2 text-[10px] leading-6 text-slate-500">
                                    {step.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PARTNERS */}
            <section className="border-y border-white/[0.06] bg-[#081E33] px-4 py-10 sm:px-6 lg:px-10">
                <div className="mx-auto max-w-[1180px]">
                    <p className="text-center text-[9px] font-black tracking-[0.12em] text-slate-500">
                        جهات ومؤسسات سبق لكاردو العمل معها
                    </p>

                    <div className="mt-6 grid grid-cols-4 items-center gap-4 sm:grid-cols-8">
                        {partnerLogos.map((logo) => (
                            <div
                                key={logo}
                                className="flex h-14 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.035] p-2"
                            >
                                <SafeImage
                                    src={logo}
                                    alt="شريك كاردو"
                                    className="max-h-9 max-w-full object-contain opacity-75"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* REQUEST */}
            <section
                id="request"
                className="relative overflow-hidden bg-[#06192E] px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20"
            >
                <div className="pointer-events-none absolute -left-40 top-0 h-[440px] w-[440px] rounded-full bg-orange-400/[0.07] blur-[150px]" />

                <div className="relative mx-auto grid max-w-[1180px] gap-7 lg:grid-cols-[.8fr_1.2fr] lg:items-start lg:gap-10">
                    <div>
                        <span className="text-[9px] font-black tracking-[0.12em] text-orange-300">
                            REQUEST A PROGRAM
                        </span>
                        <h2 className="mt-3 text-[30px] font-black leading-[1.6] sm:text-[38px]">
                            ابدأ طلبك
                            <br />
                            <span className="text-cyan-300">وسنتواصل معك</span>
                        </h2>
                        <p className="mt-4 max-w-md text-xs leading-7 text-slate-400 sm:text-sm">
                            اختر نوع الطلب وأرسل المعلومات الأساسية. لا تحتاج إلى تحديد
                            جميع التفاصيل الآن.
                        </p>

                        <div className="mt-6 flex gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setMode("organization");
                                    setSuccess(false);
                                    setError("");
                                }}
                                className={`min-h-[42px] rounded-full border px-4 text-[10px] font-black transition ${mode === "organization"
                                        ? "border-orange-400 bg-orange-400 text-[#07192D]"
                                        : "border-white/10 bg-white/[0.03] text-slate-300"
                                    }`}
                            >
                                تدريب للمؤسسة
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setMode("oman");
                                    setSuccess(false);
                                    setError("");
                                }}
                                className={`min-h-[42px] rounded-full border px-4 text-[10px] font-black transition ${mode === "oman"
                                        ? "border-cyan-300 bg-cyan-300 text-[#07192D]"
                                        : "border-white/10 bg-white/[0.03] text-slate-300"
                                    }`}
                            >
                                برامج عمان
                            </button>
                        </div>
                    </div>

                    <div className="rounded-[28px] border border-white/[0.09] bg-white/[0.045] p-4 shadow-[0_28px_80px_rgba(0,0,0,.20)] backdrop-blur-xl sm:p-6">
                        {success ? (
                            <div className="py-10 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/15 text-2xl text-emerald-300">
                                    ✓
                                </div>
                                <h3 className="mt-4 text-xl font-black text-white">
                                    تم استلام طلبك
                                </h3>
                                <p className="mt-2 text-xs leading-7 text-slate-400">
                                    شكراً لك. تم تسجيل المعلومات المرسلة بنجاح.
                                </p>
                            </div>
                        ) : (
                            <form
                                onSubmit={submitRequest}
                                className="grid gap-3 sm:grid-cols-2"
                            >
                                <Field
                                    name="fullName"
                                    label="الاسم واللقب"
                                    placeholder="اكتب اسمك"
                                    required
                                />
                                <Field
                                    name="phone"
                                    label="رقم الهاتف"
                                    placeholder="رقم التواصل"
                                    required
                                />
                                <Field
                                    name="city"
                                    label="المدينة"
                                    placeholder="المدينة / البلد"
                                />

                                {mode === "organization" ? (
                                    <>
                                        <Field
                                            name="organizationName"
                                            label="اسم المؤسسة"
                                            placeholder="اسم الشركة أو المؤسسة"
                                        />
                                        <Field
                                            name="industry"
                                            label="مجال النشاط"
                                            placeholder="مثال: النفط والغاز"
                                        />
                                        <Field
                                            name="participantCount"
                                            label="عدد المشاركين"
                                            placeholder="العدد التقريبي"
                                        />
                                        <Field
                                            name="preferredLocation"
                                            label="مكان التدريب"
                                            placeholder="في المؤسسة / موقع آخر"
                                        />
                                        <Field
                                            name="trainingArea"
                                            label="مجال التدريب المطلوب"
                                            placeholder="HSE، إطفاء، HAZMAT..."
                                        />
                                    </>
                                ) : (
                                    <Field
                                        name="job"
                                        label="المجال المهني"
                                        placeholder="مجالك أو تخصصك"
                                    />
                                )}

                                <label className="sm:col-span-2">
                                    <span className="mb-1.5 block text-[9px] font-black text-slate-400">
                                        ملاحظات
                                    </span>
                                    <textarea
                                        name="notes"
                                        rows={4}
                                        placeholder={
                                            mode === "organization"
                                                ? "اكتب باختصار نوع التدريب الذي تحتاجه مؤسستك..."
                                                : "اكتب ما الذي تريد معرفته عن برامج عمان..."
                                        }
                                        className="w-full resize-none rounded-[18px] border border-white/10 bg-[#071A2D]/65 px-4 py-3 text-xs text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/35"
                                    />
                                </label>

                                {error && (
                                    <div className="sm:col-span-2 rounded-2xl border border-red-400/20 bg-red-400/[0.07] px-4 py-3 text-[10px] leading-6 text-red-200">
                                        {error}
                                    </div>
                                )}

                                <button
                                    disabled={submitting}
                                    className={`sm:col-span-2 min-h-[48px] rounded-full text-xs font-black transition disabled:opacity-50 ${mode === "organization"
                                            ? "bg-orange-400 text-[#07192D] hover:bg-orange-300"
                                            : "bg-cyan-300 text-[#07192D] hover:bg-cyan-200"
                                        }`}
                                >
                                    {submitting
                                        ? "جارٍ الإرسال..."
                                        : mode === "organization"
                                            ? "إرسال طلب التدريب المؤسسي"
                                            : "إرسال طلب برامج عمان"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-white/[0.07] bg-[#041522] px-4 py-7 sm:px-6 lg:px-10">
                <div className="mx-auto flex max-w-[1180px] flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-right">
                    <div>
                        <strong className="text-sm font-black text-white">
                            CARDO
                        </strong>
                        <p className="mt-1 text-[9px] text-slate-600">
                            التدريب المؤسسي المتخصص وبرامج عمان
                        </p>
                    </div>

                    <a
                        href="#top"
                        className="text-[10px] font-bold text-slate-400 transition hover:text-white"
                    >
                        العودة إلى الأعلى ↑
                    </a>
                </div>
            </footer>
        </main>
    );
}

function Field({
    name,
    label,
    placeholder,
    required = false,
}: {
    name: string;
    label: string;
    placeholder: string;
    required?: boolean;
}) {
    return (
        <label>
            <span className="mb-1.5 block text-[9px] font-black text-slate-400">
                {label}
                {required && <span className="mr-1 text-orange-300">*</span>}
            </span>

            <input
                name={name}
                required={required}
                placeholder={placeholder}
                className="min-h-[46px] w-full rounded-[16px] border border-white/10 bg-[#071A2D]/65 px-4 text-xs text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/35"
            />
        </label>
    );
}
