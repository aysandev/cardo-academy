export type TechnicalCourseGroup =

    | "HSE و ایمنی"

    | "آتش‌نشانی"

    | "امداد و نجات"

    | "مدیریت بحران"

    | "مواد خطرناک"

    | "IOSH / NEBOSH"

    | "مدیریت و مهارت‌های فردی"

    | "حقوقی و قراردادها"

    | "سایر دوره‌ها";





export type TechnicalCourse = {

    id: string;

    title: string;

    englishTitle?: string;

    duration?: string;

    group: TechnicalCourseGroup;

    source: "کاردو" | "بین‌المللی";

    image: string;

};





function course(

    id: string,

    title: string,

    duration: string,

    group: TechnicalCourseGroup,

    source: "کاردو" | "بین‌المللی" = "کاردو",

    englishTitle?: string

): TechnicalCourse {

    return {

        id,

        title,

        duration,

        group,

        source,

        englishTitle,

        image: `/images/technical/${id}.jpg`,

    };

}





export const technicalCourses: TechnicalCourse[] = [

    /* =========================================================

       دوره‌های فعلی سایت کاردو

    ========================================================= */



    course(

        "real-estate",

        "متصدی معاملاتی املاک",

        "۲۱۶ ساعت",

        "سایر دوره‌ها"

    ),



    course(

        "fire-system-design",

        "طراحی سیستم‌های اطفای حریق",

        "۵۰ ساعت",

        "آتش‌نشانی"

    ),



    course(

        "personal-strategic-development",

        "برنامه‌ریزی استراتژیک توسعه توانمندی‌های شخصی",

        "۲۲ ساعت",

        "مدیریت و مهارت‌های فردی"

    ),



    course(

        "skin-care",

        "مراقبت‌های پوستی",

        "۲ روز",

        "سایر دوره‌ها"

    ),



    course(

        "senior-industrial-firefighter",

        "سرآتش‌نشان صنعتی",

        "۱۴۵ ساعت",

        "آتش‌نشانی"

    ),



    course(

        "creativity",

        "خلاقیت و نوآوری در محیط کسب و کار",

        "۴۰ ساعت",

        "مدیریت و مهارت‌های فردی"

    ),



    course(

        "time-management",

        "مدیریت زمان",

        "۴۰ ساعت",

        "مدیریت و مهارت‌های فردی"

    ),



    course(

        "professional-speaking",

        "سخنرانی حرفه‌ای",

        "۱۰۰ ساعت",

        "مدیریت و مهارت‌های فردی"

    ),



    course(

        "mbti",

        "شخصیت‌شناسی به روش MBTI",

        "۴۰ ساعت",

        "مدیریت و مهارت‌های فردی"

    ),



    course(

        "international-industrial-contracts",

        "تنظیم قراردادهای صنعتی بین‌المللی",

        "۳۰ ساعت",

        "حقوقی و قراردادها"

    ),



    course(

        "construction-contracts",

        "تنظیم قراردادهای پیمانکاری ساخت و ساز بین‌المللی",

        "۳۰ ساعت",

        "حقوقی و قراردادها"

    ),



    course(

        "pedagogy",

        "پداگوژی (مربیگری فنی و حرفه‌ای)",

        "۹۰ ساعت",

        "سایر دوره‌ها"

    ),



    course(

        "hse-ms",

        "مسئول پیاده‌سازی سامانه مدیریت HSE-MS",

        "۹۰ ساعت",

        "HSE و ایمنی"

    ),



    course(

        "incident-management",

        "مدیریت حادثه",

        "۲۰ ساعت",

        "مدیریت بحران"

    ),



    course(

        "legal-writing",

        "لایحه‌نویسی قضایی",

        "۱۵۰ ساعت",

        "حقوقی و قراردادها"

    ),



    course(

        "administrative-litigation",

        "متخصص دعاوی اداری",

        "۱۲۰ ساعت",

        "حقوقی و قراردادها"

    ),



    course(

        "consortium-contracts",

        "تنظیم قراردادهای کنسرسیوم بین‌المللی",

        "۳۰ ساعت",

        "حقوقی و قراردادها"

    ),



    course(

        "fire-system-inspection",

        "بازرسی و تست سیستم اطفاء حریق",

        "۵۰ ساعت",

        "آتش‌نشانی"

    ),



    course(

        "extinguisher-charging",

        "متصدی دستگاه شارژ آتش‌نشانی",

        "۱۲۰ ساعت",

        "آتش‌نشانی"

    ),



    course(

        "hse-oil-officer",

        "افسر HSE در پروژه‌های صنعت نفت",

        "۱۳۰ ساعت",

        "HSE و ایمنی"

    ),



    course(

        "hse-advanced",

        "بکارگیری HSE در صنایع (پیشرفته)",

        "۶۰ ساعت",

        "HSE و ایمنی"

    ),



    course(

        "hse-basic",

        "بکارگیری HSE در صنایع (مقدماتی)",

        "۴۰ ساعت",

        "HSE و ایمنی"

    ),



    course(

        "emergency-rescuer",

        "امدادگر حوادث",

        "۱۱۶ ساعت",

        "امداد و نجات"

    ),



    course(

        "industrial-firefighter",

        "دوره آموزشی آتش‌نشان صنعتی",

        "۲ روز",

        "آتش‌نشانی"

    ),





    /* =========================================================

       دوره‌های بین‌المللی فایل جدید

    ========================================================= */



    course(

        "nfpa-1001-firefighter-1",

        "آتش‌نشانی یک",

        "۴ هفته / ۱۶۰ ساعت",

        "آتش‌نشانی",

        "بین‌المللی",

        "NFPA 1001 Fire Fighter 1"

    ),



    course(

        "nfpa-1001-firefighter-2",

        "آتش‌نشانی دو",

        "۴ هفته / ۱۶۰ ساعت",

        "آتش‌نشانی",

        "بین‌المللی",

        "NFPA 1001 Fire Fighter 2"

    ),



    course(

        "nfpa-1002-driver-operator",

        "راننده / اپراتور آتش‌نشانی",

        "۱ هفته / ۴۰ ساعت",

        "آتش‌نشانی",

        "بین‌المللی",

        "NFPA 1002 Driver / Operator"

    ),



    course(

        "nfpa-1002-pumper",

        "راننده و اپراتور پمپ",

        "۱ هفته / ۴۰ ساعت",

        "آتش‌نشانی",

        "بین‌المللی",

        "NFPA 1002 Driver / Operator Pumper"

    ),



    course(

        "confined-space-1",

        "نجاتگر حرفه‌ای – محیط بسته سطح ۱",

        "۱ هفته / ۳۰ ساعت",

        "امداد و نجات",

        "بین‌المللی",

        "NFPA 1006 Technical Rescuer – Confined Space Level 1"

    ),



    course(

        "confined-space-2",

        "نجاتگر حرفه‌ای – محیط بسته سطح ۲",

        "۱ هفته / ۳۰ ساعت",

        "امداد و نجات",

        "بین‌المللی",

        "NFPA 1006 Technical Rescuer – Confined Space Level 2"

    ),



    course(

        "vehicle-rescue-1",

        "نجاتگر حرفه‌ای – وسایل حمل سطح ۱",

        "۱ هفته / ۳۰ ساعت",

        "امداد و نجات",

        "بین‌المللی",

        "NFPA 1006 Technical Rescuer – Vehicle Rescue Level 1"

    ),



    course(

        "vehicle-rescue-2",

        "نجاتگر حرفه‌ای – وسایل حمل سطح ۲",

        "۱ هفته / ۳۰ ساعت",

        "امداد و نجات",

        "بین‌المللی",

        "NFPA 1006 Technical Rescuer – Vehicle Rescue Level 2"

    ),



    course(

        "rope-awareness",

        "آشنایی با عملیات نجات با طناب",

        "۱ هفته / ۳۰ ساعت",

        "امداد و نجات",

        "بین‌المللی",

        "NFPA 1006 Rope Rescue Awareness"

    ),



    course(

        "rope-operation",

        "عملیات نجات با طناب",

        "۱ هفته / ۳۰ ساعت",

        "امداد و نجات",

        "بین‌المللی",

        "NFPA 1006 Rope Rescue Operation"

    ),



    course(

        "rope-technician",

        "تکنسین نجات با طناب",

        "۱ هفته / ۳۰ ساعت",

        "امداد و نجات",

        "بین‌المللی",

        "NFPA 1006 Rope Rescue Technician"

    ),



    course(

        "fire-officer-1",

        "افسر آتش ۱",

        "۱ هفته / ۳۰ ساعت",

        "آتش‌نشانی",

        "بین‌المللی",

        "NFPA 1021 Fire Officer 1"

    ),



    course(

        "fire-officer-2",

        "افسر آتش ۲",

        "۳ هفته / ۸۰ ساعت",

        "آتش‌نشانی",

        "بین‌المللی",

        "NFPA 1021 Fire Officer 2"

    ),



    course(

        "fire-inspector-1",

        "سرپرست آتش ۱",

        "۳ هفته / ۸۰ ساعت",

        "آتش‌نشانی",

        "بین‌المللی",

        "NFPA 1031 Fire Inspector 1"

    ),



    course(

        "fire-inspector-2",

        "سرپرست آتش ۲",

        "۳ هفته / ۸۰ ساعت",

        "آتش‌نشانی",

        "بین‌المللی",

        "NFPA 1031 Fire Inspector 2"

    ),



    course(

        "fire-investigator",

        "محقق آتش",

        "۱ هفته / ۴۰ ساعت",

        "آتش‌نشانی",

        "بین‌المللی",

        "NFPA 1033 Fire Investigator"

    ),



    course(

        "fire-instructor",

        "مربی آتش‌نشانی ۱",

        "۲ هفته / ۶۰ ساعت",

        "آتش‌نشانی",

        "بین‌المللی",

        "NFPA 1041 Fire Service Instructor 1"

    ),



    course(

        "breathing-instructor",

        "مربی دستگاه تنفسی",

        "۲ هفته / ۶۰ ساعت",

        "HSE و ایمنی",

        "بین‌المللی",

        "Breathing Apparatus Instructor"

    ),



    course(

        "breathing-wearer",

        "کاربر دستگاه تنفسی",

        "۲ هفته / ۸۰ ساعت",

        "HSE و ایمنی",

        "بین‌المللی",

        "Breathing Apparatus Wearer"

    ),



    course(

        "experienced-firefighter",

        "آتش‌نشان با تجربه",

        "۲ هفته / ۶۰ ساعت",

        "آتش‌نشانی",

        "بین‌المللی",

        "Experienced Fire Fighter"

    ),



    course(

        "fire-awareness",

        "آشنایی با مبانی آتش",

        "۱ روز / ۸ ساعت",

        "آتش‌نشانی",

        "بین‌المللی",

        "Fire Awareness"

    ),



    course(

        "fire-awareness-induction",

        "آموزش مقدماتی آشنایی با آتش",

        "۱ هفته / ۳۰ ساعت",

        "آتش‌نشانی",

        "بین‌المللی",

        "Fire Awareness Induction"

    ),



    course(

        "fire-extinguisher-maintenance",

        "تعمیر و نگهداری کپسول آتش‌نشانی",

        "۱ هفته / ۳۰ ساعت",

        "آتش‌نشانی",

        "بین‌المللی",

        "Fire Extinguisher Maintenance"

    ),



    course(

        "fire-risk-assessment",

        "ارزیابی ریسک آتش",

        "۱ هفته / ۳۰ ساعت",

        "HSE و ایمنی",

        "بین‌المللی",

        "Fire Risk Assessment"

    ),



    course(

        "fire-suppression-system",

        "سیستم اطفای حریق",

        "۱ هفته / ۳۰ ساعت",

        "آتش‌نشانی",

        "بین‌المللی",

        "Fire Suppression System"

    ),



    course(

        "fire-team-leader",

        "رهبر تیم آتش‌نشانی",

        "۱ هفته / ۳۰ ساعت",

        "آتش‌نشانی",

        "بین‌المللی",

        "Fire Team Leader"

    ),



    course(

        "fire-team-members",

        "اعضای تیم آتش‌نشانی",

        "۱ هفته / ۳۰ ساعت",

        "آتش‌نشانی",

        "بین‌المللی",

        "Fire Team Members"

    ),



    course(

        "fire-warden",

        "سرپرست آتش‌نشانان",

        "۱ روز / ۸ ساعت",

        "آتش‌نشانی",

        "بین‌المللی",

        "Fire Warden"

    ),



    course(

        "introduction-breathing",

        "آشنایی با دستگاه تنفسی",

        "۱ هفته / ۳۰ ساعت",

        "HSE و ایمنی",

        "بین‌المللی",

        "Introduction To Breathing Apparatus"

    ),



    course(

        "road-traffic-collision",

        "تصادفات راه و جاده",

        "۱ هفته / ۴۰ ساعت",

        "امداد و نجات",

        "بین‌المللی",

        "Road Traffic Collision"

    ),



    course(

        "incident-command",

        "فرماندهی حادثه",

        "۱ هفته / ۳۰ ساعت",

        "مدیریت بحران",

        "بین‌المللی",

        "Incident Command"

    ),



    course(

        "disaster-management",

        "مدیریت بحران",

        "۲ روز / ۱۶ ساعت",

        "مدیریت بحران",

        "بین‌المللی",

        "Emergency & Disaster Management"

    ),



    course(

        "emergency-planning",

        "برنامه‌ریزی در شرایط بحران",

        "۱ هفته / ۳۰ ساعت",

        "مدیریت بحران",

        "بین‌المللی",

        "Emergency Planning"

    ),



    course(

        "fire-incident-investigation",

        "محقق حوادث آتش‌نشانی",

        "۱ هفته / ۳۰ ساعت",

        "آتش‌نشانی",

        "بین‌المللی",

        "Fire Incident Investigation"

    ),



    course(

        "confined-place-rescue",

        "عملیات نجات در محیط محصور",

        "۱ هفته / ۳۰ ساعت",

        "امداد و نجات",

        "بین‌المللی",

        "Confined Place Rescue"

    ),



    course(

        "international-industrial-fire",

        "آتش‌نشانی صنعتی – بین‌المللی",

        "۱ هفته / ۳۰ ساعت",

        "آتش‌نشانی",

        "بین‌المللی",

        "Industrial Fire Fighting"

    ),



    course(

        "nfpa-technical-rescue",

        "نجات حرفه‌ای",

        "۱ هفته / ۳۰ ساعت",

        "امداد و نجات",

        "بین‌المللی",

        "NFPA 1006 Technical Rescue"

    ),





    /* =========================================================

       HAZMAT

    ========================================================= */



    course(

        "hazmat-awareness",

        "آشنایی با مواد مخاطره‌آمیز",

        "۱ هفته / ۴۰ ساعت",

        "مواد خطرناک",

        "بین‌المللی",

        "NFPA 1072 Hazardous Material Awareness"

    ),



    course(

        "hazmat-operations",

        "عملیات مواد مخاطره‌آمیز",

        "۱ هفته / ۴۰ ساعت",

        "مواد خطرناک",

        "بین‌المللی",

        "NFPA 1072 Hazardous Material Operations"

    ),



    course(

        "hazmat-product-control",

        "کنترل نشت و انتشار مواد و تجهیزات حفاظت فردی",

        "۱ هفته / ۳۰ ساعت",

        "مواد خطرناک",

        "بین‌المللی",

        "NFPA 1072 Product Control & Personal Protective Equipment"

    ),



    course(

        "hazmat-technician",

        "تکنسین مواد مخاطره‌آمیز",

        "۱ هفته / ۴۰ ساعت",

        "مواد خطرناک",

        "بین‌المللی",

        "NFPA 1072 Hazardous Material Technician"

    ),



    course(

        "chemical-handling",

        "کنترل مواد شیمیایی",

        "۱ روز / ۸ ساعت",

        "مواد خطرناک",

        "بین‌المللی",

        "Chemical Handling"

    ),



    course(

        "fuel-loading",

        "ایمنی بارگیری و تخلیه سوخت",

        "۱ هفته / ۳۰ ساعت",

        "مواد خطرناک",

        "بین‌المللی",

        "Fuel Loading & Unloading Safety Area"

    ),



    course(

        "gas-detector",

        "دتکتور گاز",

        "۱ روز / ۸ ساعت",

        "مواد خطرناک",

        "بین‌المللی",

        "Gas Detector"

    ),



    course(

        "h2s",

        "هیدروژن سولفید H2S",

        "۱ روز / ۸ ساعت",

        "مواد خطرناک",

        "بین‌المللی",

        "Hydrogen Sulphide (H2S)"

    ),



    course(

        "spill-prevention",

        "جلوگیری از نشت",

        "۴ روز / ۳۰ ساعت",

        "مواد خطرناک",

        "بین‌المللی",

        "Spill Prevention"

    ),





    /* =========================================================

       IOSH / NEBOSH

    ========================================================= */



    course(

        "iosh-working-safely",

        "IOSH: کار ایمن",

        "استعلام زمان برگزاری",

        "IOSH / NEBOSH",

        "بین‌المللی",

        "IOSH Working Safely"

    ),



    course(

        "iosh-managing-safely",

        "IOSH: مدیریت ایمن",

        "استعلام زمان برگزاری",

        "IOSH / NEBOSH",

        "بین‌المللی",

        "IOSH Managing Safely"

    ),



    course(

        "nebosh-igc",

        "دوره NEBOSH IGC",

        "استعلام زمان برگزاری",

        "IOSH / NEBOSH",

        "بین‌المللی",

        "NEBOSH IGC"

    ),

];