/* =========================================================
   CARDO — CENTRAL DATA
========================================================= */


/* =========================================================
   TYPES
========================================================= */

export type CourseCategory =
    | "technical"
    | "organization"
    | "oman";


export type UserType =
    | "person"
    | "organization";


export type FormFieldType =
    | "text"
    | "number"
    | "tel"
    | "textarea";


export type FormField = {
    name: string;
    label: string;
    type: FormFieldType;
    required: boolean;
};


/* =========================================================
   SITE INFORMATION
========================================================= */

export const siteInfo = {
    name: "کاردو",

    englishName: "CARDO",

    fullName: "مجتمع آموزشی کاردو",

    description:
        "مجتمع آموزشی کاردو؛ ارائه‌دهنده دوره‌های فنی و حرفه‌ای، دوره‌های اختصاصی سازمان‌ها و دوره‌های عمان.",

    supervision:
        "تحت نظر سازمان آموزش فنی و حرفه‌ای",

    website:
        "https://cardoacademy.ir",
};


/* =========================================================
   COURSE CATEGORIES
========================================================= */

export const categories = [
    /* =====================================================
       01 — TECHNICAL
    ===================================================== */

    {
        id: "technical" as CourseCategory,

        number: "01",

        title: "دوره‌های فنی و حرفه‌ای",

        shortTitle: "دوره‌های فنی و حرفه‌ای",

        description:
            "دوره‌های مهارتی، تخصصی و کاربردی برای توسعه مهارت‌های حرفه‌ای و ورود مؤثرتر به بازار کار.",

        tags: [
            "HSE و ایمنی",
            "آتش‌نشانی",
            "مهارت‌های تخصصی",
        ],

        href: "/courses?category=technical",

        accent: "orange",
    },


    /* =====================================================
       02 — ORGANIZATIONS
    ===================================================== */

    {
        id: "organization" as CourseCategory,

        number: "02",

        title: "دوره‌های اختصاصی سازمان‌ها",

        shortTitle: "آموزش اختصاصی سازمان‌ها",

        description:
            "طراحی و اجرای دوره‌های آموزشی اختصاصی متناسب با نیاز شرکت‌ها، سازمان‌ها و مجموعه‌ها.",

        tags: [
            "آموزش اختصاصی",
            "نیازسنجی سازمانی",
            "برگزاری درون‌سازمانی",
        ],

        href: "/courses?category=organization",

        accent: "blue",
    },


    /* =====================================================
       03 — OMAN
    ===================================================== */

    {
        id: "oman" as CourseCategory,

        number: "03",

        title: "دوره‌های عمان",

        shortTitle: "دوره‌های عمان",

        description:
            "دوره‌ها و مسیرهای آموزشی مرتبط با مهارت‌آموزی و مسیرهای حرفه‌ای عمان.",

        tags: [
            "دوره‌های عمان",
            "مهارت حرفه‌ای",
            "مسیر بین‌المللی",
        ],

        href: "/courses?category=oman",

        accent: "cyan",
    },
];


/* =========================================================
   REQUEST TYPES
========================================================= */

export const requestTypes = [
    /* =====================================================
       PERSON
    ===================================================== */

    {
        id: "person" as UserType,

        title: "شخص هستم",

        shortTitle: "ثبت‌نام شخصی",

        description:
            "برای مشاهده دوره‌های موجود و ثبت درخواست شرکت در دوره.",

        buttonText:
            "ثبت درخواست دوره",
    },


    /* =====================================================
       ORGANIZATION
    ===================================================== */

    {
        id: "organization" as UserType,

        title: "سازمان هستیم",

        shortTitle: "درخواست سازمانی",

        description:
            "برای درخواست طراحی و اجرای دوره اختصاصی متناسب با نیاز سازمان.",

        buttonText:
            "درخواست دوره اختصاصی",
    },
];


/* =========================================================
   PERSON FORM FIELDS
========================================================= */

export const personFields: FormField[] = [
    {
        name: "fullName",

        label: "نام و نام خانوادگی",

        type: "text",

        required: true,
    },

    {
        name: "city",

        label: "شهر محل سکونت",

        type: "text",

        required: true,
    },

    {
        name: "age",

        label: "سن",

        type: "number",

        required: true,
    },

    {
        name: "job",

        label: "شغل",

        type: "text",

        required: true,
    },

    {
        name: "phone",

        label: "شماره تماس",

        type: "tel",

        required: true,
    },
];


/* =========================================================
   ORGANIZATION FORM FIELDS
========================================================= */

export const organizationFields: FormField[] = [
    {
        name: "organizationName",

        label: "نام سازمان / شرکت",

        type: "text",

        required: true,
    },

    {
        name: "contactName",

        label: "نام و نام خانوادگی رابط",

        type: "text",

        required: true,
    },

    {
        name: "phone",

        label: "شماره تماس",

        type: "tel",

        required: true,
    },

    {
        name: "city",

        label: "شهر",

        type: "text",

        required: true,
    },

    {
        name: "industry",

        label: "حوزه فعالیت سازمان",

        type: "text",

        required: false,
    },

    {
        name: "employees",

        label: "تعداد تقریبی شرکت‌کنندگان",

        type: "number",

        required: false,
    },

    {
        name: "requestedCourse",

        label: "عنوان دوره موردنیاز",

        type: "text",

        required: true,
    },

    {
        name: "details",

        label: "توضیحات درخواست",

        type: "textarea",

        required: false,
    },
];