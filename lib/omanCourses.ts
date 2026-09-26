export type OmanCourseGroup =
    | "فرماندهی فرودگاهی"
    | "آتش‌نشانی و نجات فرودگاهی"
    | "مدیریت حوادث هوانوردی"
    | "هلیکوپتر و نظامی"
    | "خدمه پرواز"
    | "مانورهای عملی";

export type OmanCourse = {
    id: string;
    title: string;
    englishTitle: string;
    duration: string;
    group: OmanCourseGroup;
    source: "عمان";
    image: string;
};

export const omanCourses: OmanCourse[] = [
    {
        id: "airport-crew-commander-initial",
        title: "فرمانده گروه هواپیمایی - مبتدی",
        englishTitle: "Airport Crew Commander – Initial",
        duration: "۳ هفته / ۱۲۰ ساعت",
        group: "فرماندهی فرودگاهی",
        source: "عمان",
        image: "/images/education.png",
    },

    {
        id: "airport-crew-commander-revalidation",
        title: "فرمانده گروه هواپیمایی - حرفه‌ای",
        englishTitle: "Airport Crew Commander – Revalidation",
        duration: "۱ هفته / ۴۰ ساعت",
        group: "فرماندهی فرودگاهی",
        source: "عمان",
        image: "/images/education.png",
    },

    {
        id: "airport-watch-commander-initial",
        title: "فرمانده دیده‌بان فرودگاه - مبتدی",
        englishTitle: "Airport Watch Commander – Initial",
        duration: "۳ هفته / ۱۲۰ ساعت",
        group: "فرماندهی فرودگاهی",
        source: "عمان",
        image: "/images/education.png",
    },

    {
        id: "airport-watch-commander-revalidation",
        title: "فرمانده دیده‌بان فرودگاه - حرفه‌ای",
        englishTitle: "Airport Watch Commander – Revalidation",
        duration: "۱ هفته / ۴۰ ساعت",
        group: "فرماندهی فرودگاهی",
        source: "عمان",
        image: "/images/education.png",
    },

    {
        id: "watch-room-attendant",
        title: "متصدی اتاق کنترل",
        englishTitle: "Watch Room Attendant",
        duration: "۲ روز / ۱۶ ساعت",
        group: "فرماندهی فرودگاهی",
        source: "عمان",
        image: "/images/education.png",
    },

    {
        id: "airport-fire-fighter-bridging",
        title: "تعلیمات آتش‌نشانان فرودگاهی",
        englishTitle: "Airport Fire Fighter Bridging",
        duration: "۳ هفته / ۱۲۰ ساعت",
        group: "آتش‌نشانی و نجات فرودگاهی",
        source: "عمان",
        image: "/images/firefighter.png",
    },

    {
        id: "airport-rescue-firefighter-initial",
        title: "عملیات نجات و آتش‌نشانی هواپیمایی - مبتدی",
        englishTitle: "Airport Rescue & Firefighter – Initial",
        duration: "۶ هفته / ۲۴۰ ساعت",
        group: "آتش‌نشانی و نجات فرودگاهی",
        source: "عمان",
        image: "/images/firefighter.png",
    },

    {
        id: "airport-rescue-firefighter-revalidation",
        title: "عملیات نجات و آتش‌نشانی هواپیمایی - حرفه‌ای",
        englishTitle: "Airport Rescue & Firefighter – Revalidation",
        duration: "۱ هفته / ۴۰ ساعت",
        group: "آتش‌نشانی و نجات فرودگاهی",
        source: "عمان",
        image: "/images/firefighter.png",
    },

    {
        id: "nfpa-1003-airport-fire-fighter",
        title: "آتش‌نشانی فرودگاه",
        englishTitle: "NFPA 1003 Airport Fire Fighter",
        duration: "۳ هفته / ۱۲۰ ساعت",
        group: "آتش‌نشانی و نجات فرودگاهی",
        source: "عمان",
        image: "/images/firefighter.png",
    },

    {
        id: "aviation-incident-command-system",
        title: "سیستم فرماندهی حوادث هوانوردی",
        englishTitle: "Aviation Incident Command System",
        duration: "۱ هفته / ۴۰ ساعت",
        group: "مدیریت حوادث هوانوردی",
        source: "عمان",
        image: "/images/environment.png",
    },

    {
        id: "public-authority-airport-emergency-response",
        title: "مدیریت بحران فرودگاهی برای نهادهای دولتی",
        englishTitle: "Public Authority Airport Emergency Response",
        duration: "۲ هفته / ۸۰ ساعت",
        group: "مدیریت حوادث هوانوردی",
        source: "عمان",
        image: "/images/environment.png",
    },

    {
        id: "cabin-crew-flight-deck-fire-training",
        title: "آموزش اطفای حریق برای خدمه کابین و خلبانان",
        englishTitle: "Cabin Crew / Flight Deck Fire Training",
        duration: "۱ روز / ۸ ساعت",
        group: "خدمه پرواز",
        source: "عمان",
        image: "/images/hsecourse.png",
    },

    {
        id: "helideck-fire-fighting-24h",
        title: "عملیات اطفای حریق در پد بالگرد",
        englishTitle: "Helideck Fire Fighting Operations",
        duration: "۳ روز / ۲۴ ساعت",
        group: "هلیکوپتر و نظامی",
        source: "عمان",
        image: "/images/firefighter.png",
    },

    {
        id: "helideck-fire-fighting-8h",
        title: "عملیات اطفای حریق در پد بالگرد",
        englishTitle: "Helideck Fire Fighting Operations",
        duration: "۱ روز / ۸ ساعت",
        group: "هلیکوپتر و نظامی",
        source: "عمان",
        image: "/images/firefighter.png",
    },

    {
        id: "military-helicopter-fire-fighting",
        title: "عملیات آتش‌نشانی نظامی و هلیکوپتر",
        englishTitle: "Military & Helicopter Fire Fighting Operation",
        duration: "۱ هفته / ۴۰ ساعت",
        group: "هلیکوپتر و نظامی",
        source: "عمان",
        image: "/images/firefighter.png",
    },

    {
        id: "royal-flight-military",
        title: "پرواز سلطنتی نظامی",
        englishTitle: "Royal Flight Military",
        duration: "۲ روز / ۱۶ ساعت",
        group: "هلیکوپتر و نظامی",
        source: "عمان",
        image: "/images/hsecourse.png",
    },

    {
        id: "live-fire-drills-16h",
        title: "مانورهای عملی اطفای حریق و آتش‌سوزی ناشی از سوخت فشار",
        englishTitle: "Live Fire Drills & Pressure Fed Fuel Fire",
        duration: "۲ روز / ۱۶ ساعت",
        group: "مانورهای عملی",
        source: "عمان",
        image: "/images/firefighter.png",
    },

    {
        id: "live-fire-drills-8h",
        title: "مانورهای عملی اطفای حریق و آتش‌سوزی ناشی از سوخت فشار",
        englishTitle: "Live Fire Drills & Pressure Fed Fuel Fire",
        duration: "۱ روز / ۸ ساعت",
        group: "مانورهای عملی",
        source: "عمان",
        image: "/images/firefighter.png",
    },
];