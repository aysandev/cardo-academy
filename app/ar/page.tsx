"use client";

import {
    FormEvent,
    useEffect,
    useMemo,
    useState,
} from "react";

type Course = {
    id: string;
    title: string;
    englishTitle?: string;
    description: string;
    image: string;
    group: string;
    instructor?: string;
    topics: string[];
};

type Instructor = {
    id: string;
    name: string;
    role: string;
    degree: string;
    experience: string;
    bio: string;
    image?: string;
};

const customCourses: Course[] = [
    {
        id: "pip-pre-incident-plan",
        title: "خطة ما قبل الحادث",
        englishTitle:
            "PIP | Pre Incident Plan",
        description:
            "إعداد خطة استباقية للحوادث ومراجعة المعايير والعناصر الأساسية لخطة ما قبل الحادث.",
        image:
            "/images/organization/pip.jpg",
        group:
            "HSE وإدارة المخاطر",
        topics: [
            "مبادئ وأسس التخطيط لما قبل الحادث.",
            "مراجعة معايير NFPA 1620 وNFPA 1660 ودليل CCPS.",
            "شرح المكونات الأربعة عشر لخطة PIP.",
        ],
    },

    {
        id: "pssr",
        title:
            "مراجعة السلامة قبل بدء التشغيل",
        englishTitle:
            "PSSR | Pre Start-Up Safety Review",
        description:
            "مراجعة متطلبات السلامة من اكتمال التركيب الميكانيكي حتى مرحلة التشغيل النهائي.",
        image:
            "/images/organization/pssr.jpg",
        group:
            "السلامة الصناعية",
        topics: [
            "مبادئ وأسس PSSR وموقعها ضمن سلامة العمليات.",
            "مبادئ السلامة في المراحل المختلفة من اكتمال التركيب الميكانيكي حتى التشغيل النهائي.",
            "مراجعة أنواع الاختبارات في المراحل المختلفة لبدء التشغيل.",
            "مراجعة أنواع المخاطر والمخاطر المحتملة في المراحل المختلفة لبدء التشغيل.",
            "مبادئ مراجعة السلامة قبل بدء التشغيل وفق OSHA وCCPS.",
            "مراجعة المتطلبات القانونية لـ PSSR وفق اللوائح والأنظمة.",
        ],
    },

    {
        id: "fire-risk-assessment",
        title:
            "تقييم مخاطر الحريق",
        englishTitle:
            "Fire Risk Assessment",
        description:
            "التعرف على أسس سلوك الحريق والانفجار وتطبيق تقنيات تقييم وإدارة مخاطر الحريق.",
        image:
            "/images/organization/fire-risk.jpg",
        group:
            "الحريق وإدارة المخاطر",
        topics: [
            "مبادئ وأسس سلوك الحريق والانفجار.",
            "مبادئ وأساليب تقييم مخاطر الحريق وفق NFPA 550.",
            "مبادئ شجرة سلامة الحريق وفق NFPA 551.",
            "مبادئ تقييم حمل الحريق وفق NFPA 557.",
            "مبادئ وتقنيات FRAM وETA في تقييم مخاطر الحريق.",
            "مبادئ إدارة مخاطر الحريق باستخدام منهج BowTie.",
        ],
    },

    {
        id: "incident-investigation",
        title:
            "التحقيق في الحوادث",
        englishTitle:
            "Incident Investigation",
        description:
            "تحليل الحوادث وأسبابها باستخدام تقنيات منهجية وإعداد تقارير أكثر دقة وفعالية.",
        image:
            "/images/organization/incident-investigation.jpg",
        group:
            "HSE وإدارة الحوادث",
        topics: [
            "مبادئ وأسس الأحداث والحوادث في بيئات العمل.",
            "مراجعة أنواع نظريات ونماذج الأحداث والحوادث.",
            "شرح المبادئ والأساليب والتقنيات المستخدمة في التحقيق في الحوادث.",
            "تقنيات Step و5Why وFish Bone في تحليل عوامل الحادث.",
            "تقنيات Bow Tie وTripod Beta وETA في التحقيق في الحوادث.",
            "مبادئ وأسس كتابة تقارير الأحداث والحوادث.",
        ],
    },

    {
        id: "hse-risk-management",
        title:
            "إدارة مخاطر الصحة والسلامة والبيئة",
        englishTitle:
            "HSE Risk Management",
        description:
            "التعرف على المخاطر وتقييمها وترتيب أولويات إجراءات الوقاية وخفض مستوى المخاطر.",
        image:
            "/images/organization/hse-risk.jpg",
        group:
            "HSE وإدارة المخاطر",
        topics: [
            "المبادئ والأسس الأساسية في إدارة المخاطر.",
            "مبادئ التعرف على المخاطر المحتملة Hazard Identification - HazID.",
            "تقنية FMEA في تقييم المخاطر الناتجة عن المعدات.",
            "تقنية JHA في تحليل المخاطر والمخاطر المهنية.",
            "تقنيتا Barrier Analysis وBow-Tie في تقييم فعالية طبقات الحماية.",
            "مبادئ تقييم أساليب التحكم في المخاطر.",
            "مبادئ ترتيب أولويات الإجراءات الوقائية وإجراءات خفض المخاطر.",
        ],
    },

    {
        id: "fire-extinguishing",
        title:
            "التدريب العملي على مكافحة الحريق في الميدان",
        englishTitle:
            "Practical Firefighting",
        description:
            "تدريب ميداني على تقييم موقع الحريق واختيار التكتيكات الدفاعية والهجومية المناسبة.",
        image:
            "/images/organization/fire-extinguishing.jpg",
        group:
            "مكافحة الحريق",
        instructor:
            "د. هاشم ستاره",
        topics: [
            "المعاينة الميدانية للحريق ومبادئ Size Up في موقع الحادث.",
            "مبادئ تقييم المخاطر في الميدان.",
            "دراسة واختيار التكتيكات والتقنيات المناسبة لعمليات مكافحة الحريق.",
            "تدريب عملي على التكتيكات الدفاعية والهجومية.",
        ],
    },

    {
        id: "incident-command",
        title:
            "قيادة عمليات مكافحة الحريق",
        englishTitle:
            "Fire Incident Command",
        description:
            "مبادئ القيادة والتحكم والاستراتيجيات والتكتيكات المستخدمة في إدارة عمليات مكافحة الحريق.",
        image:
            "/images/organization/incident-command.jpg",
        group:
            "القيادة وإدارة العمليات",
        instructor:
            "د. هاشم ستاره",
        topics: [
            "مبادئ وأسس قيادة العمليات وهيكل القيادة والتحكم Command & Control.",
            "مبادئ الاستراتيجيات والتكتيكات والتقنيات المختلفة لعمليات مكافحة الحريق.",
            "مبادئ الأساليب الدفاعية والهجومية والمختلطة في العمليات.",
            "مراجعة مبادئ وأساليب قيادة العمليات وفق مراجع موثوقة مثل NFCC.",
        ],
    },
];

const instructors: Instructor[] = [
    {
        id: "hashem-setareh",
        name:
            "د. هاشم ستاره",
        role:
            "رئيس قسم HSE",
        degree:
            "دكتوراه في الإدارة البيئية",
        experience:
            "أكثر من عقدين من الخبرة",
        bio:
            "خبير ومدرب في الصحة المهنية والسلامة والإدارة البيئية، وله خبرة في التدريب الجامعي والاستشارات للمشروعات الصناعية.",
        image:
            "/images/instructors/hashem-setareh.jpg",
    },

    {
        id: "saleh-salehi",
        name:
            "صالح صالحي",
        role:
            "رئيس القسم القانوني",
        degree:
            "ماجستير قانون التجارة الدولية",
        experience:
            "أكثر من 22 عاماً من الخبرة",
        bio:
            "مؤسس مجمع كاردو التدريبي، ومدرب في العقود الدولية وريادة الأعمال ومجالات السلامة وHSE.",
        image:
            "/images/instructors/saleh-salehi.jpeg",
    },

    {
        id: "hamidreza-faraji",
        name:
            "حميدرضا فرجي",
        role:
            "رئيس قسم مكافحة الحريق",
        degree:
            "مدرب متخصص في مكافحة الحريق",
        experience:
            "15 عاماً من الخبرة المهنية",
        bio:
            "رجل إطفاء محترف ومدرب متخصص، وله خبرة عملية في منظمة إطفاء طهران والتدريب المهني.",
        image:
            "/images/instructors/hamidreza-faraji.jpg",
    },

    {
        id: "ebrahim-panahizadeh",
        name:
            "م. إبراهيم بناهي زاده",
        role:
            "مدرب HSE والسلامة",
        degree:
            "هندسة كيميائية – صناعات الغاز",
        experience:
            "أكثر من 26 عاماً من الخبرة",
        bio:
            "خبرة واسعة في السلامة والصحة المهنية والتدريب في الصناعات المختلفة ومجالات الإطفاء والسلامة.",
        image:
            "/images/instructors/ebrahim-panahizadeh.jpg",
    },

    {
        id: "majid-aliyari",
        name:
            "مجيد علياري",
        role:
            "مدرب ومستشار HSE",
        degree:
            "ماجستير HSE",
        experience:
            "أكثر من عقد من الخبرة",
        bio:
            "خبرة في النفط والغاز والسيارات والصلب والمناجم، وإدارة المخاطر والأنظمة الإدارية والتدريب والتدقيق.",
        image:
            "/images/instructors/majid-aliyari.jpeg",
    },

    {
        id: "mohammad-shams",
        name:
            "د. محمد شمس",
        role:
            "مدرب ومستشار الصحة والسلامة",
        degree:
            "دكتوراه في الصحة والسلامة",
        experience:
            "أكثر من 20 عاماً من الخبرة",
        bio:
            "خبرة في صناعات النفط والغاز والبتروكيماويات ومجالات السلامة والإطفاء ومعدات الإنقاذ المتخصصة.",
        image:
            "/images/instructors/mohammad-shams.jpg",
    },

    {
        id: "ahmad-akrami",
        name:
            "د. أحمد أكرمي",
        role:
            "مدرب HSE وإدارة الأزمات",
        degree:
            "دكتوراه في الكيمياء",
        experience:
            "مدرب ومستشار ومدقق",
        bio:
            "متخصص في HSE وإدارة الأزمات والدفاع غير النشط، وله خبرة في التدريس الجامعي والتأليف والترجمة التخصصية.",
        image:
            "/images/instructors/ahmad-akrami.jpg",
    },

    {
        id: "naser-rahbar",
        name:
            "ناصر رهبر",
        role:
            "مدرب وخبير في علوم الحريق",
        degree:
            "ماجستير HSE",
        experience:
            "20 عاماً من خبرة التدريس",
        bio:
            "خبير ومستشار ومدرب في علوم الحريق، وله خبرة تعليمية وعملية في مجالات مكافحة الحريق.",
        image:
            "/images/instructors/naser-rahbar.jpg",
    },
];

const process = [
    {
        number: "01",
        title:
            "فهم احتياج المؤسسة",
        text:
            "نحدد طبيعة النشاط، مستوى الفريق، المخاطر والهدف التدريبي.",
    },

    {
        number: "02",
        title:
            "تصميم البرنامج",
        text:
            "نختار المحتوى والمدرب والمحاور بما يتناسب مع بيئة العمل.",
    },

    {
        number: "03",
        title:
            "تنفيذ التدريب",
        text:
            "يمكن تنفيذ التدريب بصورة نظرية أو عملية أو مزيج بينهما.",
    },

    {
        number: "04",
        title:
            "التطوير والمتابعة",
        text:
            "يمكن بناء مسار تدريبي متدرج وفق احتياجات المؤسسة المستقبلية.",
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

function initials(
    name: string
) {
    return name
        .replace("د.", "")
        .replace("م.", "")
        .trim()
        .split(" ")
        .slice(0, 2)
        .map(
            (part) =>
                part[0]
        )
        .join("");
}

function imageCandidates(
    src?: string
) {
    if (!src) {
        return [];
    }

    const base =
        src.replace(
            /\.(jpg|jpeg|png|webp)$/i,
            ""
        );

    return Array.from(
        new Set([
            src,
            `${base}.jpg`,
            `${base}.jpeg`,
            `${base}.png`,
            `${base}.webp`,
        ])
    );
}

function ResilientImage({
    src,
    alt,
    className = "",
}: {
    src?: string;
    alt: string;
    className?: string;
}) {
    const candidates =
        useMemo(
            () =>
                imageCandidates(
                    src
                ),
            [src]
        );

    const [
        imageIndex,
        setImageIndex,
    ] =
        useState(0);

    useEffect(() => {
        setImageIndex(0);
    }, [src]);

    if (
        !src ||
        imageIndex >=
        candidates.length
    ) {
        return null;
    }

    return (
        <img
            src={
                candidates[
                imageIndex
                ]
            }
            alt={alt}
            className={
                className
            }
            onError={() => {
                setImageIndex(
                    (current) =>
                        current + 1
                );
            }}
        />
    );
}

function SafePhoto({
    src,
    alt,
    className = "",
}: {
    src?: string;
    alt: string;
    className?: string;
}) {
    return (
        <div
            className={`
        relative
        overflow-hidden
        ${className}
      `}
        >
            <div
                className="
          absolute
          inset-0

          flex
          items-center
          justify-center

          bg-gradient-to-br
          from-[#16364F]
          to-[#0A2035]

          text-lg
          font-black
          text-cyan-200
        "
            >
                {initials(
                    alt
                )}
            </div>

            <ResilientImage
                src={src}
                alt={alt}
                className="
          absolute
          inset-0
          z-10

          h-full
          w-full

          object-cover
        "
            />
        </div>
    );
}

export default function ArabicPage() {
    const [
        activeInstructor,
        setActiveInstructor,
    ] =
        useState(
            instructors[0].id
        );

    const [
        topicsCourse,
        setTopicsCourse,
    ] =
        useState<Course | null>(
            null
        );

    const [
        selectedCourseId,
        setSelectedCourseId,
    ] =
        useState("");

    const [
        submitting,
        setSubmitting,
    ] =
        useState(false);

    const [
        success,
        setSuccess,
    ] =
        useState(false);

    const [
        error,
        setError,
    ] =
        useState("");

    const currentInstructor =
        useMemo(
            () =>
                instructors.find(
                    (item) =>
                        item.id ===
                        activeInstructor
                ) ??
                instructors[0],
            [
                activeInstructor,
            ]
        );

    function requestCourse(
        courseId: string
    ) {
        setSelectedCourseId(
            courseId
        );

        setSuccess(false);
        setError("");

        window.setTimeout(
            () => {
                document
                    .getElementById(
                        "request"
                    )
                    ?.scrollIntoView({
                        behavior:
                            "smooth",
                        block:
                            "start",
                    });
            },
            50
        );
    }

    async function submitRequest(
        event:
            FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (submitting) {
            return;
        }

        setSubmitting(true);
        setSuccess(false);
        setError("");

        try {
            const data =
                new FormData(
                    event.currentTarget
                );

            const courseId =
                String(
                    data.get(
                        "courseId"
                    ) || ""
                );

            const selectedCourse =
                customCourses.find(
                    (item) =>
                        item.id ===
                        courseId
                );

            const response =
                await fetch(
                    "/api/requests",
                    {
                        method:
                            "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body:
                            JSON.stringify(
                                {
                                    fullName:
                                        data.get(
                                            "fullName"
                                        ),

                                    phone:
                                        data.get(
                                            "phone"
                                        ),

                                    city:
                                        data.get(
                                            "city"
                                        ),

                                    organizationName:
                                        data.get(
                                            "organizationName"
                                        ),

                                    industry:
                                        data.get(
                                            "industry"
                                        ),

                                    participantCount:
                                        data.get(
                                            "participantCount"
                                        ),

                                    preferredLocation:
                                        data.get(
                                            "preferredLocation"
                                        ),

                                    trainingArea:
                                        selectedCourse?.group ||
                                        data.get(
                                            "trainingArea"
                                        ),

                                    notes:
                                        data.get(
                                            "notes"
                                        ),

                                    courseId:
                                        selectedCourse?.id ||
                                        "custom-organization-training",

                                    courseTitle:
                                        selectedCourse?.title ||
                                        "برنامج تدريبي مخصص للمؤسسة",

                                    courseGroup:
                                        "الدورات المخصصة",

                                    requestType:
                                        "organization",
                                }
                            ),
                    }
                );

            const result =
                await response.json();

            if (
                !response.ok ||
                !result.success
            ) {
                throw new Error(
                    result.message ||
                    "تعذر إرسال الطلب. يرجى المحاولة مرة أخرى."
                );
            }

            setSuccess(true);
            setSelectedCourseId(
                ""
            );

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
            className="
        min-h-screen
        overflow-x-hidden
        bg-[#06192E]
        text-white
      "
        >
            {/* =====================================
          HEADER
      ====================================== */}

            <header
                className="
          sticky
          top-0
          z-50

          border-b
          border-white/[0.07]

          bg-[#06192E]/94

          backdrop-blur-2xl
        "
            >
                <div
                    className="
            mx-auto
            flex
            min-h-[66px]
            max-w-[1320px]
            items-center
            justify-between
            gap-3

            px-4

            sm:px-6
            lg:px-8
          "
                >
                    <a
                        href="#top"
                        className="
              flex
              items-center
              gap-2.5
            "
                    >
                        <div
                            className="
                flex
                h-10
                w-10

                items-center
                justify-center

                rounded-[13px]

                bg-white

                text-sm
                font-black
                text-[#06192E]
              "
                        >
                            C
                        </div>

                        <div className="leading-none">
                            <strong
                                className="
                  block

                  text-sm
                  font-black
                  tracking-[0.08em]
                "
                            >
                                CARDO
                            </strong>

                            <span
                                className="
                  mt-1
                  block

                  text-[7px]
                  tracking-[0.08em]
                  text-slate-500
                "
                            >
                                PROFESSIONAL TRAINING
                            </span>
                        </div>
                    </a>

                    <nav
                        className="
              hidden

              items-center
              gap-5

              text-[11px]
              font-bold
              text-slate-300

              lg:flex
            "
                    >
                        <a
                            href="#courses"
                            className="
                transition
                hover:text-white
              "
                        >
                            الدورات المخصصة
                        </a>

                        <a
                            href="#instructors"
                            className="
                transition
                hover:text-white
              "
                        >
                            المدربون
                        </a>

                        <a
                            href="#process"
                            className="
                transition
                hover:text-white
              "
                        >
                            آلية العمل
                        </a>

                        <a
                            href="#partners"
                            className="
                transition
                hover:text-white
              "
                        >
                            شركاؤنا
                        </a>
                    </nav>

                    <div
                        className="
              flex
              items-center
              gap-2
            "
                    >
                        <a
                            href="/"
                            className="
                hidden
                min-h-[40px]

                items-center
                justify-center

                rounded-full

                border
                border-white/10

                bg-white/[0.04]

                px-4

                text-[10px]
                font-black
                text-slate-200

                transition
                hover:bg-white/[0.08]

                sm:inline-flex
              "
                        >
                            فارسی
                        </a>

                        <a
                            href="#request"
                            className="
                inline-flex
                min-h-[40px]

                items-center
                justify-center

                rounded-full

                bg-orange-400

                px-4

                text-[10px]
                font-black
                text-[#06192E]

                transition
                hover:bg-orange-300

                sm:px-5
              "
                        >
                            اطلب برنامجاً
                        </a>
                    </div>
                </div>
            </header>

            {/* =====================================
          HERO
      ====================================== */}

            <section
                className="
          relative
          overflow-hidden

          px-4
          pb-12
          pt-10

          sm:px-6
          sm:pb-16
          sm:pt-14

          lg:px-8
          lg:pb-20
          lg:pt-16
        "
            >
                <div
                    className="
            pointer-events-none
            absolute
            -right-40
            top-0

            h-[420px]
            w-[420px]

            rounded-full
            bg-orange-400/[0.08]
            blur-[150px]
          "
                />

                <div
                    className="
            pointer-events-none
            absolute
            -left-44
            bottom-0

            h-[440px]
            w-[440px]

            rounded-full
            bg-cyan-300/[0.06]
            blur-[150px]
          "
                />

                <div
                    className="
            relative

            mx-auto
            grid
            max-w-[1320px]
            gap-8

            lg:grid-cols-[1fr_.9fr]
            lg:items-center
            lg:gap-12
          "
                >
                    <div>
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
                text-cyan-100

                sm:text-[10px]
              "
                        >
                            <span
                                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-orange-400
                "
                            />

                            أكاديمية متخصصة في مكافحة الحريق و HSE
                        </span>

                        <h1
                            className="
                mt-5

                text-[38px]
                font-black
                leading-[1.45]

                sm:text-[48px]
                lg:text-[58px]
              "
                        >
                            التدريب المتخصص

                            <br />

                            <span
                                className="
                  bg-gradient-to-l
                  from-orange-300
                  via-orange-400
                  to-cyan-300

                  bg-clip-text
                  text-transparent
                "
                            >
                                حسب احتياج مؤسستك
                            </span>
                        </h1>

                        <p
                            className="
                mt-5
                max-w-2xl

                text-sm
                leading-8
                text-slate-300

                sm:text-base
                sm:leading-9
              "
                        >
                            نصمم برامج تدريبية مخصصة للمؤسسات
                            في مجالات HSE، مكافحة الحريق،
                            إدارة المخاطر، التحقيق في الحوادث
                            وقيادة العمليات.
                        </p>

                        <div
                            className="
                mt-7
                flex
                flex-col
                gap-3

                sm:flex-row
              "
                        >
                            <a
                                href="#request"
                                className="
                  inline-flex
                  min-h-[50px]

                  items-center
                  justify-center
                  gap-2

                  rounded-full

                  bg-orange-400

                  px-6

                  text-sm
                  font-black
                  text-[#06192E]

                  transition

                  hover:-translate-y-0.5
                  hover:bg-orange-300
                "
                            >
                                اطلب برنامجاً لمؤسستك

                                <span>
                                    ←
                                </span>
                            </a>

                            <a
                                href="#instructors"
                                className="
                  inline-flex
                  min-h-[50px]

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-white/10

                  bg-white/[0.04]

                  px-6

                  text-sm
                  font-black
                  text-white

                  transition

                  hover:bg-white/[0.08]
                "
                            >
                                تعرف على المدربين
                            </a>
                        </div>

                        <div
                            className="
                mt-8
                grid
                grid-cols-3
                gap-2
              "
                        >
                            {[
                                [
                                    "محتوى مخصص",
                                    "حسب بيئة العمل",
                                ],

                                [
                                    "مدربون متخصصون",
                                    "خبرة عملية",
                                ],

                                [
                                    "تنفيذ مرن",
                                    "نظري وعملي",
                                ],
                            ].map(
                                ([
                                    title,
                                    text,
                                ]) => (
                                    <div
                                        key={
                                            title
                                        }
                                        className="
                      rounded-[18px]

                      border
                      border-white/[0.08]

                      bg-white/[0.035]

                      p-3

                      text-center

                      sm:p-4
                    "
                                    >
                                        <strong
                                            className="
                        block

                        text-[10px]
                        font-black
                        text-white

                        sm:text-xs
                      "
                                        >
                                            {
                                                title
                                            }
                                        </strong>

                                        <span
                                            className="
                        mt-1
                        block

                        text-[8px]
                        text-slate-500

                        sm:text-[9px]
                      "
                                        >
                                            {
                                                text
                                            }
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    <div
                        className="
              relative

              min-h-[300px]

              overflow-hidden

              rounded-[30px]

              border
              border-white/10

              bg-[#0B2941]

              sm:min-h-[420px]
            "
                    >
                        <div
                            className="
                absolute
                inset-0

                bg-gradient-to-br
                from-[#173953]
                to-[#081D31]
              "
                        />

                        <ResilientImage
                            src="/images/organization/fire-extinguishing.jpg"
                            alt="التدريب المؤسسي المتخصص"
                            className="
                absolute
                inset-0

                h-full
                w-full

                object-cover
              "
                        />

                        <div
                            className="
                absolute
                inset-0

                bg-gradient-to-t
                from-[#06192E]/95
                via-[#06192E]/20
                to-transparent
              "
                        />

                        <div
                            className="
                absolute
                inset-x-0
                bottom-0

                p-5

                sm:p-7
              "
                        >
                            <span
                                className="
                  inline-flex

                  rounded-full

                  border
                  border-orange-300/20

                  bg-orange-400/[0.10]

                  px-3
                  py-1.5

                  text-[9px]
                  font-black
                  text-orange-200
                "
                            >
                                TRAINING ON REQUEST
                            </span>

                            <h2
                                className="
                  mt-3
                  max-w-xl

                  text-xl
                  font-black
                  leading-8
                  text-white

                  sm:text-2xl
                "
                            >
                                برنامج تدريبي مصمم وفق المخاطر
                                والاحتياجات الفعلية لفريقك
                            </h2>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================
          COURSES
      ====================================== */}

            <section
                id="courses"
                className="
          bg-[#F6FAFC]

          px-4
          py-14

          text-[#07192D]

          sm:px-6
          sm:py-16

          lg:px-8
          lg:py-20
        "
            >
                <div
                    className="
            mx-auto
            max-w-[1320px]
          "
                >
                    <div
                        className="
              mx-auto
              max-w-3xl
              text-center
            "
                    >
                        <span
                            className="
                text-[9px]
                font-black
                tracking-[0.16em]
                text-orange-500
              "
                        >
                            CUSTOM TRAINING
                        </span>

                        <h2
                            className="
                mt-3

                text-[30px]
                font-black
                leading-[1.55]

                sm:text-[40px]
              "
                        >
                            نماذج من الدورات المخصصة
                        </h2>

                        <p
                            className="
                mt-3

                text-xs
                leading-7
                text-slate-500

                sm:text-sm
                sm:leading-8
              "
                        >
                            يمكن تخصيص المحتوى، المدة، مستوى
                            التدريب وطريقة التنفيذ حسب احتياج
                            كل مؤسسة.
                        </p>
                    </div>

                    <div
                        className="
              mt-9
              grid
              gap-4

              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
                    >
                        {customCourses.map(
                            (course) => (
                                <article
                                    key={
                                        course.id
                                    }
                                    className="
                    group

                    overflow-hidden

                    rounded-[24px]

                    border
                    border-slate-200

                    bg-white

                    shadow-[0_14px_40px_rgba(20,45,65,.05)]

                    transition

                    hover:-translate-y-1
                    hover:shadow-[0_20px_55px_rgba(20,45,65,.09)]
                  "
                                >
                                    <div
                                        className="
                      relative

                      h-[170px]

                      overflow-hidden

                      bg-gradient-to-br
                      from-[#15354D]
                      to-[#0B2439]
                    "
                                    >
                                        <ResilientImage
                                            src={
                                                course.image
                                            }
                                            alt={
                                                course.title
                                            }
                                            className="
                        absolute
                        inset-0

                        h-full
                        w-full

                        object-cover

                        transition
                        duration-500

                        group-hover:scale-[1.035]
                      "
                                        />

                                        <div
                                            className="
                        absolute
                        inset-0

                        bg-gradient-to-t
                        from-[#07192D]/80
                        via-transparent
                        to-transparent
                      "
                                        />

                                        <span
                                            className="
                        absolute
                        right-3
                        top-3

                        rounded-full

                        border
                        border-white/15

                        bg-[#06192E]/55

                        px-3
                        py-1.5

                        text-[8px]
                        font-black
                        text-white

                        backdrop-blur
                      "
                                        >
                                            {
                                                course.group
                                            }
                                        </span>
                                    </div>

                                    <div className="p-4">
                                        {course.englishTitle && (
                                            <p
                                                dir="ltr"
                                                className="
                          truncate
                          text-left

                          text-[8px]
                          font-black
                          uppercase
                          tracking-[0.08em]
                          text-orange-500/70
                        "
                                            >
                                                {
                                                    course.englishTitle
                                                }
                                            </p>
                                        )}

                                        <h3
                                            className="
                        mt-2
                        min-h-[52px]

                        text-[15px]
                        font-black
                        leading-7
                        text-[#07192D]
                      "
                                        >
                                            {
                                                course.title
                                            }
                                        </h3>

                                        <p
                                            className="
                        mt-2
                        min-h-[72px]

                        text-[10px]
                        leading-6
                        text-slate-500
                      "
                                        >
                                            {
                                                course.description
                                            }
                                        </p>

                                        {course.instructor && (
                                            <p
                                                className="
                          mt-2

                          text-[9px]
                          font-bold
                          text-cyan-700
                        "
                                            >
                                                المدرب:{" "}
                                                {
                                                    course.instructor
                                                }
                                            </p>
                                        )}

                                        <div
                                            className="
                        mt-4
                        grid
                        grid-cols-2
                        gap-2
                      "
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setTopicsCourse(
                                                        course
                                                    )
                                                }
                                                className="
                          flex
                          min-h-[42px]

                          items-center
                          justify-center

                          rounded-full

                          border
                          border-[#07192D]/10

                          bg-slate-100

                          px-3

                          text-[10px]
                          font-black
                          text-[#07192D]

                          transition

                          hover:bg-slate-200
                        "
                                            >
                                                محاور الدورة
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    requestCourse(
                                                        course.id
                                                    )
                                                }
                                                className="
                          flex
                          min-h-[42px]

                          items-center
                          justify-center

                          rounded-full

                          bg-[#07192D]

                          px-3

                          text-[10px]
                          font-black
                          text-white

                          transition

                          hover:bg-[#0E304D]
                        "
                                            >
                                                طلب الدورة
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            )
                        )}

                        <article
                            className="
                flex
                min-h-[355px]
                flex-col

                items-center
                justify-center

                rounded-[24px]

                border
                border-dashed
                border-cyan-700/20

                bg-cyan-50/50

                p-6

                text-center
              "
                        >
                            <div
                                className="
                  flex
                  h-12
                  w-12

                  items-center
                  justify-center

                  rounded-2xl

                  bg-cyan-100

                  text-xl
                  text-cyan-700
                "
                            >
                                +
                            </div>

                            <h3
                                className="
                  mt-4

                  text-base
                  font-black
                "
                            >
                                تحتاج إلى برنامج مختلف؟
                            </h3>

                            <p
                                className="
                  mt-2

                  text-[10px]
                  leading-6
                  text-slate-500
                "
                            >
                                يمكن لكاردو تصميم برنامج جديد
                                بالكامل وفق احتياج مؤسستك.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    requestCourse(
                                        ""
                                    )
                                }
                                className="
                  mt-5

                  rounded-full

                  border
                  border-cyan-700/15

                  bg-white

                  px-5
                  py-3

                  text-[10px]
                  font-black
                  text-cyan-800
                "
                            >
                                اطلب برنامجاً جديداً
                            </button>
                        </article>
                    </div>
                </div>
            </section>

            {/* =====================================
          INSTRUCTORS
      ====================================== */}

            <section
                id="instructors"
                className="
          relative
          overflow-hidden

          bg-[#0B2439]

          px-4
          py-14

          sm:px-6
          sm:py-16

          lg:px-8
          lg:py-20
        "
            >
                <div
                    className="
            pointer-events-none
            absolute
            -left-40
            top-0

            h-[420px]
            w-[420px]

            rounded-full

            bg-cyan-300/[0.05]

            blur-[150px]
          "
                />

                <div
                    className="
            relative
            mx-auto
            max-w-[1240px]
          "
                >
                    <div className="text-center">
                        <span
                            className="
                text-[9px]
                font-black
                tracking-[0.16em]
                text-cyan-300
              "
                        >
                            EXPERT INSTRUCTORS
                        </span>

                        <h2
                            className="
                mt-3

                text-[30px]
                font-black

                sm:text-[40px]
              "
                        >
                            تعرف على مدربي كاردو
                        </h2>

                        <p
                            className="
                mx-auto
                mt-3
                max-w-2xl

                text-xs
                leading-7
                text-slate-400

                sm:text-sm
              "
                        >
                            نخبة من المدربين ذوي الخبرة
                            المهنية والأكاديمية في مجالات
                            السلامة، HSE، مكافحة الحريق
                            وإدارة العمليات.
                        </p>
                    </div>

                    <div
                        className="
              mt-9
              grid
              gap-4

              lg:grid-cols-[.72fr_1.28fr]
              lg:items-stretch
            "
                    >
                        <div
                            className="
                rounded-[28px]

                border
                border-white/[0.08]

                bg-white/[0.04]

                p-3

                sm:p-4
              "
                        >
                            <SafePhoto
                                src={
                                    currentInstructor.image
                                }
                                alt={
                                    currentInstructor.name
                                }
                                className="
                  h-[260px]

                  rounded-[22px]

                  sm:h-[340px]

                  lg:h-full
                  lg:min-h-[390px]
                "
                            />
                        </div>

                        <div
                            className="
                flex
                flex-col
                justify-center

                rounded-[28px]

                border
                border-white/[0.08]

                bg-white/[0.035]

                p-5

                sm:p-7
              "
                        >
                            <span
                                className="
                  text-[9px]
                  font-black
                  text-orange-300
                "
                            >
                                {
                                    currentInstructor.role
                                }
                            </span>

                            <h3
                                className="
                  mt-2

                  text-[25px]
                  font-black
                  leading-[1.5]

                  sm:text-[34px]
                "
                            >
                                {
                                    currentInstructor.name
                                }
                            </h3>

                            <div
                                className="
                  mt-4
                  flex
                  flex-wrap
                  gap-2
                "
                            >
                                <span
                                    className="
                    rounded-full

                    border
                    border-white/[0.08]

                    bg-white/[0.04]

                    px-3
                    py-2

                    text-[9px]
                    text-slate-300
                  "
                                >
                                    {
                                        currentInstructor.degree
                                    }
                                </span>

                                <span
                                    className="
                    rounded-full

                    border
                    border-cyan-300/15

                    bg-cyan-300/[0.05]

                    px-3
                    py-2

                    text-[9px]
                    text-cyan-200
                  "
                                >
                                    {
                                        currentInstructor.experience
                                    }
                                </span>
                            </div>

                            <p
                                className="
                  mt-5
                  max-w-2xl

                  text-xs
                  leading-8
                  text-slate-300

                  sm:text-sm
                  sm:leading-9
                "
                            >
                                {
                                    currentInstructor.bio
                                }
                            </p>

                            <div
                                className="
                  mt-7
                  flex
                  gap-2

                  overflow-x-auto

                  pb-1

                  [scrollbar-width:none]

                  [&::-webkit-scrollbar]:hidden
                "
                            >
                                {instructors.map(
                                    (item) => (
                                        <button
                                            key={
                                                item.id
                                            }
                                            type="button"
                                            onClick={() =>
                                                setActiveInstructor(
                                                    item.id
                                                )
                                            }
                                            className={`
                        flex
                        min-w-[148px]

                        items-center
                        gap-2

                        rounded-[16px]

                        border

                        p-2

                        text-right

                        transition

                        ${currentInstructor.id ===
                                                    item.id
                                                    ? `
                              border-orange-400/40
                              bg-orange-400/[0.08]
                            `
                                                    : `
                              border-white/[0.07]
                              bg-white/[0.025]

                              hover:bg-white/[0.05]
                            `
                                                }
                      `}
                                        >
                                            <SafePhoto
                                                src={
                                                    item.image
                                                }
                                                alt={
                                                    item.name
                                                }
                                                className="
                          h-10
                          w-10
                          shrink-0

                          rounded-xl
                        "
                                            />

                                            <span
                                                className="
                          min-w-0
                        "
                                            >
                                                <strong
                                                    className="
                            block
                            truncate

                            text-[9px]
                            font-black
                            text-white
                          "
                                                >
                                                    {
                                                        item.name
                                                    }
                                                </strong>

                                                <span
                                                    className="
                            mt-1
                            block
                            truncate

                            text-[7px]
                            text-slate-500
                          "
                                                >
                                                    {
                                                        item.role
                                                    }
                                                </span>
                                            </span>
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================
          PROCESS
      ====================================== */}

            <section
                id="process"
                className="
          bg-[#F6FAFC]

          px-4
          py-14

          text-[#07192D]

          sm:px-6
          sm:py-16

          lg:px-8
          lg:py-20
        "
            >
                <div
                    className="
            mx-auto
            max-w-[1180px]
          "
                >
                    <div
                        className="
              mx-auto
              max-w-2xl
              text-center
            "
                    >
                        <span
                            className="
                text-[9px]
                font-black
                tracking-[0.16em]
                text-cyan-700
              "
                        >
                            HOW IT WORKS
                        </span>

                        <h2
                            className="
                mt-3

                text-[28px]
                font-black

                sm:text-[36px]
              "
                        >
                            كيف نصمم التدريب لمؤسستك؟
                        </h2>
                    </div>

                    <div
                        className="
              mt-8
              grid
              gap-3

              sm:grid-cols-2
              lg:grid-cols-4
            "
                    >
                        {process.map(
                            (item) => (
                                <article
                                    key={
                                        item.number
                                    }
                                    className="
                    rounded-[22px]

                    border
                    border-slate-200

                    bg-white

                    p-5

                    shadow-[0_12px_35px_rgba(20,45,65,.04)]
                  "
                                >
                                    <span
                                        className="
                      text-[10px]
                      font-black
                      text-orange-500
                    "
                                    >
                                        {
                                            item.number
                                        }
                                    </span>

                                    <h3
                                        className="
                      mt-3

                      text-sm
                      font-black
                    "
                                    >
                                        {
                                            item.title
                                        }
                                    </h3>

                                    <p
                                        className="
                      mt-2

                      text-[10px]
                      leading-6
                      text-slate-500
                    "
                                    >
                                        {
                                            item.text
                                        }
                                    </p>
                                </article>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* =====================================
          PARTNERS
      ====================================== */}

            <section
                id="partners"
                className="
          border-y
          border-white/[0.06]

          bg-[#081E33]

          px-4
          py-10

          sm:px-6
          lg:px-8
        "
            >
                <div
                    className="
            mx-auto
            max-w-[1180px]
          "
                >
                    <p
                        className="
              text-center

              text-[9px]
              font-black
              tracking-[0.12em]
              text-slate-500
            "
                    >
                        بعض الجهات التي عملت معها كاردو
                    </p>

                    <div
                        className="
              mt-6
              grid
              grid-cols-4
              items-center
              gap-3

              sm:grid-cols-8
            "
                    >
                        {partnerLogos.map(
                            (logo) => (
                                <div
                                    key={
                                        logo
                                    }
                                    className="
                    flex
                    h-14

                    items-center
                    justify-center

                    rounded-2xl

                    border
                    border-white/[0.06]

                    bg-white/[0.035]

                    p-2
                  "
                                >
                                    <ResilientImage
                                        src={
                                            logo
                                        }
                                        alt="شريك كاردو"
                                        className="
                      max-h-9
                      max-w-full

                      object-contain

                      opacity-75
                    "
                                    />
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* =====================================
          REQUEST FORM
      ====================================== */}

            <section
                id="request"
                className="
          relative
          overflow-hidden

          bg-[#06192E]

          px-4
          py-14

          sm:px-6
          sm:py-16

          lg:px-8
          lg:py-20
        "
            >
                <div
                    className="
            relative

            mx-auto
            grid
            max-w-[1180px]
            gap-7

            lg:grid-cols-[.75fr_1.25fr]
            lg:items-start
            lg:gap-10
          "
                >
                    <div>
                        <span
                            className="
                text-[9px]
                font-black
                tracking-[0.14em]
                text-orange-300
              "
                        >
                            REQUEST TRAINING
                        </span>

                        <h2
                            className="
                mt-3

                text-[30px]
                font-black
                leading-[1.55]

                sm:text-[38px]
              "
                        >
                            أخبرنا باحتياج مؤسستك
                        </h2>

                        <p
                            className="
                mt-4
                max-w-md

                text-xs
                leading-7
                text-slate-400

                sm:text-sm
              "
                        >
                            أرسل المعلومات الأساسية، وسيتم
                            تسجيل طلب التدريب المخصص في نظام
                            كاردو.
                        </p>
                    </div>

                    <div
                        className="
              rounded-[28px]

              border
              border-white/[0.09]

              bg-white/[0.045]

              p-4

              shadow-[0_28px_80px_rgba(0,0,0,.20)]

              backdrop-blur-xl

              sm:p-6
            "
                    >
                        {success ? (
                            <div
                                className="
                  py-10
                  text-center
                "
                            >
                                <div
                                    className="
                    mx-auto

                    flex
                    h-14
                    w-14

                    items-center
                    justify-center

                    rounded-full

                    bg-emerald-400/15

                    text-2xl
                    text-emerald-300
                  "
                                >
                                    ✓
                                </div>

                                <h3
                                    className="
                    mt-4

                    text-xl
                    font-black
                  "
                                >
                                    تم استلام طلبك
                                </h3>

                                <p
                                    className="
                    mt-2

                    text-xs
                    leading-7
                    text-slate-400
                  "
                                >
                                    تم تسجيل المعلومات بنجاح.
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setSuccess(
                                            false
                                        )
                                    }
                                    className="
                    mt-5

                    rounded-full

                    border
                    border-white/10

                    bg-white/[0.04]

                    px-5
                    py-3

                    text-[10px]
                    font-black
                  "
                                >
                                    إرسال طلب آخر
                                </button>
                            </div>
                        ) : (
                            <form
                                onSubmit={
                                    submitRequest
                                }
                                className="
                  grid
                  gap-3

                  sm:grid-cols-2
                "
                            >
                                <Field
                                    name="fullName"
                                    label="الاسم واللقب"
                                    placeholder="الاسم"
                                    required
                                />

                                <Field
                                    name="phone"
                                    label="رقم الهاتف"
                                    placeholder="رقم التواصل"
                                    required
                                />

                                <Field
                                    name="organizationName"
                                    label="اسم المؤسسة"
                                    placeholder="اسم الشركة أو المؤسسة"
                                    required
                                />

                                <Field
                                    name="city"
                                    label="المدينة / البلد"
                                    placeholder="المدينة"
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

                                <label>
                                    <span
                                        className="
                      mb-1.5
                      block

                      text-[9px]
                      font-black
                      text-slate-400
                    "
                                    >
                                        الدورة المطلوبة
                                    </span>

                                    <select
                                        name="courseId"
                                        value={
                                            selectedCourseId
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            setSelectedCourseId(
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                        className="
                      min-h-[46px]
                      w-full

                      rounded-[16px]

                      border
                      border-white/10

                      bg-[#071A2D]/65

                      px-4

                      text-xs
                      text-white

                      outline-none

                      focus:border-cyan-300/35
                    "
                                    >
                                        <option value="">
                                            برنامج مخصص جديد
                                        </option>

                                        {customCourses.map(
                                            (
                                                course
                                            ) => (
                                                <option
                                                    key={
                                                        course.id
                                                    }
                                                    value={
                                                        course.id
                                                    }
                                                >
                                                    {
                                                        course.title
                                                    }
                                                </option>
                                            )
                                        )}
                                    </select>
                                </label>

                                <Field
                                    name="preferredLocation"
                                    label="مكان التدريب"
                                    placeholder="في المؤسسة / موقع آخر"
                                />

                                <label
                                    className="
                    sm:col-span-2
                  "
                                >
                                    <span
                                        className="
                      mb-1.5
                      block

                      text-[9px]
                      font-black
                      text-slate-400
                    "
                                    >
                                        تفاصيل الاحتياج
                                    </span>

                                    <textarea
                                        name="notes"
                                        rows={4}
                                        placeholder="اكتب باختصار نوع التدريب أو المخاطر أو المهارات التي تريد تطويرها..."
                                        className="
                      w-full

                      resize-none

                      rounded-[18px]

                      border
                      border-white/10

                      bg-[#071A2D]/65

                      px-4
                      py-3

                      text-xs
                      text-white

                      outline-none

                      placeholder:text-slate-600

                      focus:border-cyan-300/35
                    "
                                    />
                                </label>

                                {error && (
                                    <div
                                        className="
                      rounded-2xl

                      border
                      border-red-400/20

                      bg-red-400/[0.07]

                      px-4
                      py-3

                      text-[10px]
                      leading-6
                      text-red-200

                      sm:col-span-2
                    "
                                    >
                                        {
                                            error
                                        }
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={
                                        submitting
                                    }
                                    className="
                    min-h-[48px]

                    rounded-full

                    bg-orange-400

                    text-xs
                    font-black
                    text-[#07192D]

                    transition

                    hover:bg-orange-300

                    disabled:opacity-50

                    sm:col-span-2
                  "
                                >
                                    {submitting
                                        ? "جارٍ الإرسال..."
                                        : "إرسال طلب التدريب"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* =====================================
          COURSE TOPICS MODAL
      ====================================== */}

            {topicsCourse && (
                <div
                    className="
            fixed
            inset-0
            z-[200]

            flex
            items-end
            justify-center

            bg-[#020B13]/75

            p-3

            backdrop-blur-sm

            sm:items-center
            sm:p-5
          "
                    onMouseDown={(
                        event
                    ) => {
                        if (
                            event.currentTarget ===
                            event.target
                        ) {
                            setTopicsCourse(
                                null
                            );
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label={`محاور ${topicsCourse.title}`}
                        className="
              max-h-[88dvh]
              w-full
              max-w-[760px]

              overflow-y-auto

              rounded-[26px]

              border
              border-white/[0.10]

              bg-[#0A2035]

              p-4

              shadow-[0_30px_100px_rgba(0,0,0,.45)]

              sm:rounded-[30px]
              sm:p-6
            "
                    >
                        <div
                            className="
                flex
                items-start
                justify-between
                gap-4
              "
                        >
                            <div>
                                <span
                                    className="
                    text-[9px]
                    font-black
                    tracking-[0.12em]
                    text-orange-300
                  "
                                >
                                    COURSE OUTLINE
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
                                    {
                                        topicsCourse.title
                                    }
                                </h3>

                                {topicsCourse.englishTitle && (
                                    <p
                                        dir="ltr"
                                        className="
                      mt-1
                      text-left

                      text-[9px]
                      font-bold
                      text-slate-500
                    "
                                    >
                                        {
                                            topicsCourse.englishTitle
                                        }
                                    </p>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setTopicsCourse(
                                        null
                                    )
                                }
                                aria-label="إغلاق"
                                className="
                  flex
                  h-10
                  w-10
                  shrink-0

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-white/10

                  bg-white/[0.05]

                  text-lg
                  text-white

                  transition

                  hover:bg-white/[0.10]
                "
                            >
                                ×
                            </button>
                        </div>

                        <div
                            className="
                mt-5
                space-y-2.5
              "
                        >
                            {topicsCourse.topics.map(
                                (
                                    topic,
                                    index
                                ) => (
                                    <div
                                        key={`${topicsCourse.id}-${index}`}
                                        className="
                      flex
                      gap-3

                      rounded-[17px]

                      border
                      border-white/[0.07]

                      bg-white/[0.035]

                      p-3.5

                      sm:p-4
                    "
                                    >
                                        <span
                                            className="
                        flex
                        h-7
                        w-7
                        shrink-0

                        items-center
                        justify-center

                        rounded-full

                        bg-orange-400/[0.12]

                        text-[9px]
                        font-black
                        text-orange-300
                      "
                                        >
                                            {String(
                                                index +
                                                1
                                            ).padStart(
                                                2,
                                                "0"
                                            )}
                                        </span>

                                        <p
                                            className="
                        text-xs
                        leading-7
                        text-slate-200

                        sm:text-sm
                      "
                                        >
                                            {
                                                topic
                                            }
                                        </p>
                                    </div>
                                )
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                const id =
                                    topicsCourse.id;

                                setTopicsCourse(
                                    null
                                );

                                requestCourse(
                                    id
                                );
                            }}
                            className="
                mt-6

                flex
                min-h-[48px]
                w-full

                items-center
                justify-center

                rounded-full

                bg-orange-400

                px-5

                text-xs
                font-black
                text-[#06192E]

                transition

                hover:bg-orange-300
              "
                        >
                            طلب هذه الدورة
                        </button>
                    </div>
                </div>
            )}

            {/* =====================================
          FOOTER
      ====================================== */}

            <footer
                className="
          border-t
          border-white/[0.07]

          bg-[#041522]

          px-4
          py-7

          sm:px-6
          lg:px-8
        "
            >
                <div
                    className="
            mx-auto

            flex
            max-w-[1180px]
            flex-col
            gap-3

            text-center

            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:text-right
          "
                >
                    <div>
                        <strong
                            className="
                text-sm
                font-black
              "
                        >
                            CARDO
                        </strong>

                        <p
                            className="
                mt-1

                text-[9px]
                text-slate-600
              "
                        >
                            برامج تدريبية مخصصة للمؤسسات
                        </p>
                    </div>

                    <div
                        className="
              flex
              items-center
              justify-center
              gap-4

              text-[9px]
              font-bold
              text-slate-500
            "
                    >
                        <a
                            href="#courses"
                            className="
                hover:text-white
              "
                        >
                            الدورات
                        </a>

                        <a
                            href="#instructors"
                            className="
                hover:text-white
              "
                        >
                            المدربون
                        </a>

                        <a
                            href="/"
                            className="
                hover:text-white
              "
                        >
                            فارسی
                        </a>
                    </div>
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
            <span
                className="
          mb-1.5
          block

          text-[9px]
          font-black
          text-slate-400
        "
            >
                {label}

                {required && (
                    <span
                        className="
              mr-1
              text-orange-300
            "
                    >
                        *
                    </span>
                )}
            </span>

            <input
                name={name}
                required={
                    required
                }
                placeholder={
                    placeholder
                }
                className="
          min-h-[46px]
          w-full

          rounded-[16px]

          border
          border-white/10

          bg-[#071A2D]/65

          px-4

          text-xs
          text-white

          outline-none

          transition

          placeholder:text-slate-600

          focus:border-cyan-300/35
        "
            />
        </label>
    );
}