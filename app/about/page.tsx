"use client";



import Navbar from "@/components/Navbar";



type TimelineItem = {

    number: string;

    eyebrow: string;

    title: string;

    description: string;

    type: "image";

    media: string;

    mediaLabel: string;

};



const timeline: TimelineItem[] = [

    {

        number: "01",

        eyebrow: "آغاز مسیر",

        title: "شروع داستان کاردو",

        description:

            "کاردو با هدف ایجاد تجربه‌ای متفاوت از آموزش شکل گرفت؛ فضایی که در آن یادگیری فقط به حضور در کلاس محدود نباشد و مهارت، تجربه و نیاز واقعی بازار کار در کنار هم قرار بگیرند.",

        type: "image",

        media: "/images/about/about-01.jpg",

        mediaLabel: "شروع مسیر کاردو",

    },

    {

        number: "02",

        eyebrow: "آموزش در عمل",

        title: "کلاس‌هایی فراتر از آموزش تئوری",

        description:

            "در مسیر کاردو، آموزش باید قابل لمس باشد. بخشی از دوره‌ها با تمرکز بر تجربه عملی، فضای واقعی کار و انتقال دانش توسط متخصصان حوزه برگزار می‌شوند.",

        type: "image",

        media: "/images/about/about-02.jpg",

        mediaLabel: "بخشی از دوره‌های کاردو",

    },

    {

        number: "03",

        eyebrow: "همراهی سازمان‌ها",

        title: "آموزش متناسب با نیاز هر مجموعه",

        description:

            "همکاری با مجموعه‌ها و سازمان‌های مختلف باعث شده بخشی از مسیر کاردو به طراحی و اجرای آموزش‌های اختصاصی برای نیازهای واقعی محیط کار اختصاص پیدا کند.",

        type: "image",

        media: "/images/about/about-03.jpg",

        mediaLabel: "همکاری‌های سازمانی",

    },

    {

        number: "04",

        eyebrow: "توسعه آموزش",

        title: "گسترش مسیرهای تخصصی",

        description:

            "با توسعه کاردو، مسیرهای آموزشی متنوع‌تری شکل گرفتند؛ از دوره‌های فنی و حرفه‌ای تا آموزش‌های سازمانی و دوره‌های بین‌المللی.",

        type: "image",

        media: "/images/about/about-04.jpg",

        mediaLabel: "دوره‌ها و کارگاه‌های تخصصی",

    },

    {

        number: "05",

        eyebrow: "امروز کاردو",

        title: "مسیری که همچنان ادامه دارد",

        description:

            "امروز کاردو در حال توسعه تجربه‌های آموزشی جدید، همکاری با مجموعه‌های بیشتر و ایجاد مسیرهایی است که یادگیری را به رشد حرفه‌ای نزدیک‌تر می‌کنند.",

        type: "image",

        media: "/images/about/about-05.jpg",

        mediaLabel: "امروز کاردو",

    },

];



function MediaFallback({

    label,

}: {

    label: string;

}) {

    return (

        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#E9F3F7] via-[#F4F8FA] to-[#DFEBF0]">

            <div className="max-w-[75%] text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-lg text-cyan-600 shadow-sm">

                    ◇

                </div>



                <p className="mt-3 text-xs font-black text-[#17324A]">

                    {label}

                </p>

            </div>

        </div>

    );

}



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

        <>

            <MediaFallback label={alt} />



            <img

                src={src}

                alt={alt}

                className={`absolute inset-0 h-full w-full object-cover ${className}`}

                onError={(event) => {

                    event.currentTarget.style.display = "none";

                }}

            />

        </>

    );

}



function ImageMedia({

    item,

}: {

    item: TimelineItem;

}) {

    return (

        <div className="group relative aspect-[4/3] overflow-hidden rounded-[22px] bg-[#E8F0F4] sm:aspect-[16/10] sm:rounded-[26px]">

            <SafeImage

                src={item.media}

                alt={item.mediaLabel}

                className="transition duration-700 group-hover:scale-[1.035]"

            />



            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06192E]/55 via-transparent to-transparent" />



            <div className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-[#06192E]/50 px-3 py-1.5 text-[9px] font-black text-white backdrop-blur-lg sm:bottom-4 sm:right-4 sm:text-[10px]">

                {item.mediaLabel}

            </div>

        </div>

    );

}



function Media({

    item,

}: {

    item: TimelineItem;

}) {

    return (

        <div className="relative rounded-[26px] border border-[#DCE7ED] bg-white p-2 shadow-[0_16px_45px_rgba(25,55,75,.07)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(25,55,75,.10)] sm:rounded-[30px] sm:p-2.5">

            <ImageMedia item={item} />

        </div>

    );

}



function StoryCard({

    item,

}: {

    item: TimelineItem;

}) {

    return (

        <div className="relative rounded-[24px] border border-[#DCE7ED] bg-white/95 p-5 shadow-[0_14px_45px_rgba(25,55,75,.05)] backdrop-blur sm:rounded-[28px] sm:p-6 lg:p-7">

            <div className="absolute right-0 top-6 h-14 w-[3px] rounded-full bg-gradient-to-b from-cyan-400 to-orange-300" />



            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-[9px] font-black text-cyan-700 sm:text-[10px]">

                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />

                {item.eyebrow}

            </span>



            <h2 className="mt-4 text-[22px] font-black leading-[1.6] text-[#06192E] sm:text-2xl lg:text-[28px]">

                {item.title}

            </h2>



            <p className="mt-3 text-xs leading-7 text-slate-500 sm:text-[13px] sm:leading-8">

                {item.description}

            </p>



            <div className="mt-5 flex items-center gap-3">

                <div className="h-px flex-1 bg-gradient-to-l from-slate-200 to-transparent" />

                <span className="text-[7px] font-black tracking-[0.20em] text-slate-300 sm:text-[8px]">

                    KARDO JOURNEY

                </span>

            </div>

        </div>

    );

}



export default function AboutPage() {

    return (

        <main

            dir="rtl"

            className="min-h-screen overflow-hidden bg-[#F6FAFC] text-[#06192E]"

        >

            <div className="relative z-50 bg-[#06192E] text-white">

                <Navbar />

            </div>



            {/* INTRO */}

            <section className="relative overflow-hidden bg-gradient-to-b from-[#EAF6FA] via-[#F4F9FB] to-[#F6FAFC] px-4 pb-12 pt-16 sm:px-6 sm:pb-14 sm:pt-20 lg:px-8 lg:pb-16 lg:pt-24">

                <div className="pointer-events-none absolute -right-32 top-0 h-[320px] w-[320px] rounded-full bg-cyan-200/40 blur-[100px]" />

                <div className="pointer-events-none absolute -left-32 top-10 h-[300px] w-[300px] rounded-full bg-orange-200/30 blur-[100px]" />



                <div className="relative mx-auto max-w-4xl text-center">

                    <div className="inline-flex items-center gap-2 rounded-full border border-[#D8E7ED] bg-white/75 px-3.5 py-1.5 text-[9px] font-black text-cyan-700 shadow-sm backdrop-blur sm:text-[10px]">

                        <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />

                        درباره مجتمع آموزشی کاردو

                    </div>



                    <h1 className="mx-auto mt-4 max-w-3xl text-[32px] font-black leading-[1.55] text-[#06192E] sm:text-[42px] lg:text-[52px]">

                        داستانی که با{" "}

                        <span className="bg-gradient-to-l from-cyan-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">

                            آموزش

                        </span>{" "}

                        شروع شد

                    </h1>



                    <p className="mx-auto mt-4 max-w-xl text-xs leading-7 text-slate-500 sm:text-sm sm:leading-8">

                        نگاهی به مسیر کاردو؛ از شکل‌گیری ایده تا تجربه دوره‌ها،

                        همراهی با سازمان‌ها و توسعه مسیرهای آموزشی تخصصی.

                    </p>



                    <a

                        href="#journey"

                        aria-label="مشاهده مسیر کاردو"

                        className="mx-auto mt-6 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-sm text-cyan-600 shadow-[0_8px_22px_rgba(15,70,90,.07)] transition hover:-translate-y-0.5"

                    >

                        ↓

                    </a>

                </div>

            </section>



            {/* TIMELINE */}

            <section

                id="journey"

                className="relative overflow-hidden bg-[#F6FAFC] px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28"

            >

                <div

                    className="pointer-events-none absolute inset-0 opacity-30"

                    style={{

                        backgroundImage:

                            "radial-gradient(rgba(38,107,129,.12) 1px, transparent 1px)",

                        backgroundSize: "26px 26px",

                    }}

                />



                <div className="relative mx-auto max-w-[1180px]">

                    <div className="absolute bottom-24 right-1/2 top-4 z-0 hidden translate-x-1/2 border-r border-dashed border-cyan-700/20 lg:block" />



                    <div className="relative z-10 space-y-8 sm:space-y-10 lg:space-y-16">

                        {timeline.map((item, index) => {

                            const mediaFirst = index % 2 === 0;



                            return (

                                <article

                                    key={item.number}

                                    className="

                    relative

                    grid

                    gap-4

                    rounded-[28px]

                    border

                    border-[#DFE9EE]

                    bg-white/45

                    p-3

                    shadow-[0_14px_42px_rgba(25,55,75,.035)]

                    backdrop-blur-sm



                    sm:gap-5

                    sm:p-4



                    lg:grid-cols-[1fr_64px_1fr]

                    lg:items-center

                    lg:gap-5

                    lg:rounded-none

                    lg:border-0

                    lg:bg-transparent

                    lg:p-0

                    lg:shadow-none

                    lg:backdrop-blur-none

                  "

                                >

                                    {/* MOBILE STEP */}

                                    <div className="flex items-center gap-3 lg:hidden">

                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#06192E] text-[10px] font-black text-white shadow-sm">

                                            {item.number}

                                        </div>



                                        <div className="h-px flex-1 bg-gradient-to-l from-cyan-700/20 to-transparent" />

                                    </div>



                                    {/* LEFT */}

                                    <div className="lg:col-start-1 lg:row-start-1">

                                        {mediaFirst ? (

                                            <Media item={item} />

                                        ) : (

                                            <StoryCard item={item} />

                                        )}

                                    </div>



                                    {/* CENTER */}

                                    <div className="hidden lg:col-start-2 lg:row-start-1 lg:flex lg:justify-center">

                                        <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-[5px] border-[#F6FAFC] bg-[#06192E] text-[11px] font-black text-white shadow-[0_8px_24px_rgba(6,25,46,.14)]">

                                            {item.number}



                                            <span className="absolute -bottom-1 -left-1 h-3 w-3 rounded-full border-2 border-[#F6FAFC] bg-orange-400" />

                                        </div>

                                    </div>



                                    {/* RIGHT */}

                                    <div className="lg:col-start-3 lg:row-start-1">

                                        {mediaFirst ? (

                                            <StoryCard item={item} />

                                        ) : (

                                            <Media item={item} />

                                        )}

                                    </div>

                                </article>

                            );

                        })}

                    </div>



                    {/* END */}

                    <div className="relative z-20 mt-10 sm:mt-12 lg:mt-20">

                        <div className="mx-auto max-w-2xl rounded-[28px] border border-[#DCE7ED] bg-white/95 px-5 py-7 text-center shadow-[0_18px_55px_rgba(25,55,75,.06)] backdrop-blur sm:px-8 sm:py-8">

                            <span className="text-[9px] font-black tracking-[0.18em] text-orange-500">

                                THE JOURNEY CONTINUES

                            </span>



                            <h2 className="mt-3 text-2xl font-black leading-[1.6] text-[#06192E] sm:text-3xl">

                                مسیر کاردو ادامه دارد

                            </h2>



                            <p className="mx-auto mt-3 max-w-lg text-xs leading-7 text-slate-500 sm:text-sm sm:leading-8">

                                این مسیر با دوره‌های تازه، تجربه‌های جدید و همراهی افراد

                                و سازمان‌های بیشتر همچنان در حال ساخته شدن است.

                            </p>



                            <a

                                href="/courses?category=technical"

                                className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#06192E] px-5 text-xs font-black text-white shadow-[0_10px_26px_rgba(6,25,46,.12)] transition hover:-translate-y-0.5 hover:bg-[#0C2C48]"

                            >

                                مشاهده دوره‌های کاردو

                                <span className="text-orange-300">←</span>

                            </a>

                        </div>

                    </div>

                </div>

            </section>

        </main>

    );

}
