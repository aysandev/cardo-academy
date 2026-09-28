"use client";



import { useMemo, useState } from "react";



type InstructorCategory =

    | "HSE و ایمنی"

    | "آتش‌نشانی و امداد"

    | "سلامت"

    | "حقوقی و مدیریت";



type Instructor = {

    id: string;

    name: string;

    role: string;

    degree: string;

    experience: string;

    category: InstructorCategory;

    bio: string;

    image?: string;

};



const instructors: Instructor[] = [

    {

        id: "hashem-setareh",

        name: "دکتر هاشم ستاره",

        role: "رئیس دپارتمان HSE",

        degree: "دکتری مدیریت محیط زیست",

        experience: "بیش از دو دهه تجربه",

        category: "HSE و ایمنی",

        bio: "فعال در حوزه بهداشت حرفه‌ای، مدیریت محیط زیست و ایمنی؛ مدرس دانشگاه، مشاور ارشد پروژه‌های صنعتی و نظامی و نویسنده و مترجم آثار تخصصی.",

        image: "/images/instructors/hashem-setareh.png",

    },

    {

        id: "saleh-salehi",

        name: "صالح صالحی",

        role: "رئیس دپارتمان حقوقی",

        degree: "کارشناسی ارشد حقوق تجارت بین‌الملل",

        experience: "بیش از ۲۲ سال سابقه",

        category: "حقوقی و مدیریت",

        bio: "مؤسس مجتمع آموزشی کاردو و رئیس هیئت‌مدیره گروه دانش‌بنیان ایمن سپهر؛ فعال در حوزه ایمنی و آتش‌نشانی و مدرس قراردادهای بین‌المللی، کارآفرینی و HSE.",

        image: "/images/instructors/saleh-salehi.jpeg",

    },

    {

        id: "hamidreza-faraji",

        name: "حمیدرضا فرجی",

        role: "رئیس دپارتمان آتش‌نشانی",

        degree: "مدرس تخصصی آتش‌نشانی",

        experience: "۱۵ سال سابقه حرفه‌ای",

        category: "آتش‌نشانی و امداد",

        bio: "آتش‌نشان حرفه‌ای با سابقه فعالیت در سازمان آتش‌نشانی تهران و مدرس دوره‌های آتش‌نشانی سازمان آموزش فنی و حرفه‌ای کشور.",

        image: "/images/instructors/hamidreza-faraji.jpeg",

    },

    {

        id: "hoda-akhoundi",

        name: "دکتر هدی آخوندی",

        role: "رئیس دپارتمان سلامت",

        degree: "دکترای حرفه‌ای پزشکی",

        experience: "مدرس و مدیر حوزه سلامت",

        category: "سلامت",

        bio: "پزشک، مدرس و رئیس دپارتمان سلامت و مدیر کلینیک پوست و زیبایی بیمارستان نیکان.",

        image: "/images/instructors/hoda-akhoundi.jpeg",

    },

    {

        id: "ebrahim-panahizadeh",

        name: "مهندس ابراهیم پناهی‌زاده",

        role: "مدرس HSE و ایمنی",

        degree: "کارشناسی مهندسی شیمی ـ صنایع گاز",

        experience: "بیش از ۲۶ سال تجربه",

        category: "HSE و ایمنی",

        bio: "دارای سابقه فعالیت به‌عنوان افسر ارشد HSE و رئیس آموزش بهداشت و ایمنی در صنایع مختلف و تجربه آموزش تخصصی ایمنی و آتش‌نشانی.",

        image: "/images/instructors/ebrahim-panahizadeh.jpeg",

    },

    {

        id: "majid-aliyari",

        name: "مجید علیاری",

        role: "مدرس و مشاور HSE",

        degree: "کارشناسی ارشد HSE",

        experience: "بیش از یک دهه تجربه",

        category: "HSE و ایمنی",

        bio: "فعال در صنایع نفت، گاز، خودرو، فولاد و معادن و دارای تجربه در مدیریت ریسک، سیستم‌های مدیریتی، مشاوره، تدریس و سرممیزی.",

        image: "/images/instructors/majid-aliyari.jpeg",

    },

    {

        id: "mohammad-shams",

        name: "دکتر محمد شمس",

        role: "مدرس و مشاور بهداشت و ایمنی",

        degree: "دکتری بهداشت و ایمنی",

        experience: "بیش از ۲۰ سال تجربه",

        category: "HSE و ایمنی",

        bio: "دارای تجربه در صنایع نفت، گاز و پتروشیمی و سابقه فعالیت در حوزه ایمنی، آتش‌نشانی و تجهیزات تخصصی امداد و نجات.",

        image: "/images/instructors/mohammad-shams.jpg",

    },

    {

        id: "ahmad-akrami",

        name: "دکتر احمد اکرمی",

        role: "مدرس HSE و مدیریت بحران",

        degree: "دکتری شیمی",

        experience: "مدرس، مشاور و سرممیز",

        category: "HSE و ایمنی",

        bio: "متخصص حوزه‌های HSE، پدافند غیرعامل و مدیریت بحران؛ دارای سابقه تدریس دانشگاهی و تألیف و ترجمه آثار تخصصی.",

        image: "/images/instructors/ahmad-akrami.jpeg",

    },

    {

        id: "sadegh-topchi",

        name: "صادق توپچی خسروشاهی",

        role: "متخصص ایمنی و آتش‌نشانی",

        degree: "کارشناسی ارشد مهندسی صنایع",

        experience: "بیش از ۳۳ سال تجربه",

        category: "آتش‌نشانی و امداد",

        bio: "دارای تجربه گسترده در طراحی سیستم‌های اطفای حریق، مدیریت HSE، ایمنی و آتش‌نشانی، پدافند غیرعامل و مدیریت بحران صنایع پتروشیمی.",

        image: "/images/instructors/sadegh-topchi.jpg",

    },

    {

        id: "hamzeh-esmailifar",

        name: "حمزه اسماعیلی‌فر",

        role: "مدرس و متخصص HSE",

        degree: "کارشناسی ارشد HSE",

        experience: "بیش از ۱۴ سال تجربه",

        category: "HSE و ایمنی",

        bio: "دارای سابقه فعالیت در پروژه‌های پالایشگاهی و پتروشیمی پارس جنوبی در حوزه ساخت، پیش‌راه‌اندازی، راه‌اندازی، بهره‌برداری، ایمنی و آتش‌نشانی.",

        image: "/images/instructors/hamzeh-esmailifar.jpg",

    },

    {

        id: "naser-rahbar",

        name: "ناصر رهبر",

        role: "کارشناس رسمی و مدرس علوم آتش‌نشانی",

        degree: "کارشناسی ارشد HSE",

        experience: "۲۰ سال سابقه تدریس",

        category: "آتش‌نشانی و امداد",

        bio: "کارشناس رسمی دادگستری در رشته آتش‌سوزی، مؤلف، مشاور و مدرس علوم آتش‌نشانی با سوابق متعدد آموزشی و عملیاتی.",

        image: "/images/instructors/naser-rahbar.jpg",

    },

    {

        id: "amirhossein-khosravi",

        name: "دکتر امیرحسین خسروی",

        role: "مدرس امداد، نجات و مدیریت عملیات",

        degree: "دکترای تخصصی مدیریت آموزشی",

        experience: "۱۲ سال سابقه در جمعیت هلال احمر",

        category: "آتش‌نشانی و امداد",

        bio: "دارای سابقه اجرایی و آموزشی در امداد و نجات، جست‌وجوی شهری، مدیریت و فرماندهی عملیات، کمک‌های اولیه و آتش‌نشانی.",

        image: "/images/instructors/amirhossein-khosravi.jpg",

    },

];



const filters: Array<"همه" | InstructorCategory> = [

    "همه",

    "HSE و ایمنی",

    "آتش‌نشانی و امداد",

    "سلامت",

    "حقوقی و مدیریت",

];



function initials(name: string) {

    return name

        .replace("دکتر", "")

        .replace("مهندس", "")

        .trim()

        .split(" ")

        .slice(0, 2)

        .map((part) => part[0])

        .join("");

}



export default function WhyKardo() {

    const [filter, setFilter] =

        useState<(typeof filters)[number]>("همه");

    const [activeId, setActiveId] = useState(instructors[0].id);



    const visible = useMemo(() => {

        if (filter === "همه") return instructors;

        return instructors.filter((item) => item.category === filter);

    }, [filter]);



    const activeIndex = Math.max(

        0,

        visible.findIndex((item) => item.id === activeId)

    );



    const active = visible[activeIndex] ?? visible[0] ?? instructors[0];



    function changeFilter(next: (typeof filters)[number]) {

        setFilter(next);



        const nextList =

            next === "همه"

                ? instructors

                : instructors.filter((item) => item.category === next);



        if (nextList[0]) setActiveId(nextList[0].id);

    }



    function goNext() {

        const next = (activeIndex + 1) % visible.length;

        setActiveId(visible[next].id);

    }



    function goPrevious() {

        const next =

            activeIndex === 0 ? visible.length - 1 : activeIndex - 1;

        setActiveId(visible[next].id);

    }



    return (

        <section

            id="instructors"

            dir="rtl"

            className="

        relative

        overflow-hidden

        bg-[#081E33]

        px-4

        py-12

        sm:px-6

        sm:py-14

        lg:px-10

        lg:py-16

      "

        >

            <div className="pointer-events-none absolute -right-40 top-12 h-[320px] w-[320px] rounded-full bg-orange-400/[0.06] blur-[120px]" />

            <div className="pointer-events-none absolute -left-40 bottom-0 h-[340px] w-[340px] rounded-full bg-cyan-300/[0.05] blur-[130px]" />



            <div className="relative mx-auto max-w-[1320px]">

                {/* HEADER */}

                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

                    <div className="max-w-2xl">

                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-1.5 text-[9px] font-black text-cyan-200 sm:text-[10px]">

                            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />

                            تیم آموزشی کاردو

                        </span>



                        <h2 className="mt-3 text-[26px] font-black leading-[1.55] text-white sm:text-[32px] lg:text-[38px]">

                            تجربه‌ای که{" "}

                            <span className="bg-gradient-to-l from-orange-300 to-cyan-300 bg-clip-text text-transparent">

                                به آموزش تبدیل می‌شود

                            </span>

                        </h2>



                        <p className="mt-2 max-w-xl text-[11px] leading-6 text-slate-400 sm:text-xs sm:leading-7">

                            با بخشی از مدرسان و متخصصان کاردو در حوزه‌های تخصصی آشنا شوید.

                        </p>

                    </div>



                    <div className="text-[10px] font-bold text-slate-500">

                        {String(activeIndex + 1).padStart(2, "0")}

                        <span className="mx-2 text-slate-700">/</span>

                        {String(visible.length).padStart(2, "0")}

                    </div>

                </div>



                {/* FILTERS */}

                <div className="-mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0">

                    {filters.map((item) => (

                        <button

                            key={item}

                            type="button"

                            onClick={() => changeFilter(item)}

                            className={`

                min-h-[38px]

                shrink-0

                rounded-full

                border

                px-3.5

                text-[9px]

                font-black

                transition

                sm:text-[10px]



                ${filter === item

                                    ? "border-orange-400/70 bg-orange-400 text-[#07192D]"

                                    : "border-white/10 bg-white/[0.025] text-slate-300 hover:bg-white/[0.055]"

                                }

              `}

                        >

                            {item}

                        </button>

                    ))}

                </div>



                {/* FEATURED INSTRUCTOR */}

                <div className="mx-auto mt-6 max-w-[1180px] overflow-hidden rounded-[26px] border border-white/[0.08] bg-white/[0.028] shadow-[0_24px_75px_rgba(0,0,0,0.20)] lg:rounded-[30px]">

                    <div className="grid lg:grid-cols-[0.78fr_1.22fr]">

                        {/* PORTRAIT */}

                        <div className="relative min-h-[280px] overflow-hidden border-b border-white/[0.07] bg-[#0A2239] sm:min-h-[340px] lg:min-h-[430px] lg:border-b-0 lg:border-l">

                            <SafePortrait instructor={active} />



                            <div className="absolute bottom-3 right-3 rounded-full border border-white/10 bg-[#06192E]/65 px-2.5 py-1.5 text-[8px] font-black tracking-[0.08em] text-white backdrop-blur-lg">

                                CARDO

                            </div>

                        </div>



                        {/* INFO */}

                        <div className="flex flex-col justify-center p-5 sm:p-7 lg:p-8 xl:p-9">

                            <div className="flex flex-wrap items-center gap-2">

                                <span className="rounded-full border border-cyan-300/15 bg-cyan-300/[0.05] px-2.5 py-1 text-[8px] font-black text-cyan-200">

                                    {active.category}

                                </span>



                                <span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 text-[8px] font-bold text-slate-400">

                                    {active.experience}

                                </span>

                            </div>



                            <h3 className="mt-4 text-[26px] font-black leading-[1.45] text-white sm:text-[32px] lg:text-[36px]">

                                {active.name}

                            </h3>



                            <p className="mt-1.5 text-xs font-black text-orange-200 sm:text-sm">

                                {active.role}

                            </p>



                            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">

                                <InfoPill label="تحصیلات / تخصص" value={active.degree} />

                                <InfoPill label="سابقه" value={active.experience} />

                            </div>



                            <p className="mt-5 max-w-2xl text-[11px] leading-7 text-slate-300 sm:text-xs sm:leading-7 lg:text-[13px]">

                                {active.bio}

                            </p>



                            <div className="mt-6 flex items-center justify-between">

                                <div className="h-px flex-1 bg-white/[0.06]" />



                                <div className="mr-4 flex items-center gap-2">

                                    <button

                                        type="button"

                                        onClick={goPrevious}

                                        aria-label="استاد قبلی"

                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm text-white transition hover:bg-white/[0.07]"

                                    >

                                        →

                                    </button>



                                    <button

                                        type="button"

                                        onClick={goNext}

                                        aria-label="استاد بعدی"

                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-400 text-sm font-black text-[#07192D] transition hover:bg-orange-300"

                                    >

                                        ←

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>



                {/* THUMB RAIL */}

                <div className="mx-auto mt-4 max-w-[1180px]">

                    <div className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0">

                        {visible.map((teacher, index) => {

                            const selected = teacher.id === active.id;



                            return (

                                <button

                                    key={teacher.id}

                                    type="button"

                                    onClick={() => setActiveId(teacher.id)}

                                    className={`

                    group

                    flex

                    min-w-[138px]

                    snap-start

                    items-center

                    gap-2.5

                    rounded-[16px]

                    border

                    p-2

                    text-right

                    transition

                    sm:min-w-[158px]



                    ${selected

                                            ? "border-orange-400/35 bg-orange-400/[0.07]"

                                            : "border-white/[0.06] bg-white/[0.018] hover:bg-white/[0.04]"

                                        }

                  `}

                                >

                                    <div

                                        className={`

                      relative

                      h-11

                      w-11

                      shrink-0

                      overflow-hidden

                      rounded-[13px]

                      border

                      ${selected

                                                ? "border-orange-300/40"

                                                : "border-white/10"

                                            }

                    `}

                                    >

                                        <SafeMiniPortrait instructor={teacher} />

                                    </div>



                                    <div className="min-w-0">

                                        <strong className="block truncate text-[10px] font-black text-white">

                                            {teacher.name}

                                        </strong>



                                        <span className="mt-1 block truncate text-[7px] text-slate-500">

                                            {teacher.role}

                                        </span>

                                    </div>



                                    <span

                                        className={`mr-auto text-[7px] font-black ${selected ? "text-orange-300" : "text-slate-700"

                                            }`}

                                    >

                                        {String(index + 1).padStart(2, "0")}

                                    </span>

                                </button>

                            );

                        })}

                    </div>

                </div>

            </div>

        </section>

    );

}



function SafePortrait({

    instructor,

}: {

    instructor: Instructor;

}) {

    return (

        <>

            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#173953] via-[#102B43] to-[#07192D]">

                <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-orange-300/15 bg-orange-400/[0.06] text-3xl font-black text-orange-200 sm:h-28 sm:w-28">

                    {initials(instructor.name)}

                </div>

            </div>



            {instructor.image && (

                <img

                    src={instructor.image}

                    alt={instructor.name}

                    className="absolute inset-0 h-full w-full object-cover object-top"

                    onError={(event) => {

                        event.currentTarget.style.display = "none";

                    }}

                />

            )}



            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07192D]/65 via-transparent to-transparent" />

        </>

    );

}



function SafeMiniPortrait({

    instructor,

}: {

    instructor: Instructor;

}) {

    return (

        <>

            <div className="absolute inset-0 flex items-center justify-center bg-[#12314C] text-xs font-black text-orange-200">

                {initials(instructor.name)}

            </div>



            {instructor.image && (

                <img

                    src={instructor.image}

                    alt={instructor.name}

                    className="absolute inset-0 h-full w-full object-cover object-top"

                    onError={(event) => {

                        event.currentTarget.style.display = "none";

                    }}

                />

            )}

        </>

    );

}



function InfoPill({

    label,

    value,

}: {

    label: string;

    value: string;

}) {

    return (

        <div className="rounded-[16px] border border-white/[0.06] bg-white/[0.02] px-3.5 py-3">

            <span className="block text-[7px] font-black text-slate-600">

                {label}

            </span>



            <strong className="mt-1 block text-[10px] font-black leading-5 text-white sm:text-[11px]">

                {value}

            </strong>

        </div>

    );

}
