"use client";

import Image from "next/image";

type RoadmapItem = {
    id: number;
    step: string;
    title: string;
    subtitle: string;
    description: string;
    mediaType: "image" | "video";
    mediaSrc: string;
    badge: string;
};

const roadmapItems: RoadmapItem[] = [
    {
        id: 1,
        step: "01",
        title: "شروع مسیر با کاردو",
        subtitle: "آشنایی با دوره‌ها و انتخاب مسیر مناسب",
        description:
            "در کاردو، مسیر یادگیری از یک انتخاب آگاهانه شروع می‌شود. مخاطب می‌تواند براساس نیاز شخصی، سازمانی یا فرصت‌های بین‌المللی، بهترین دوره را انتخاب کند.",
        mediaType: "image",
        mediaSrc: "/images/about/about-1.jpg",
        badge: "آغاز مسیر",
    },
    {
        id: 2,
        step: "02",
        title: "آموزش‌های تخصصی و کاربردی",
        subtitle: "دوره‌هایی با رویکرد عملی و بازارمحور",
        description:
            "دوره‌های کاردو با تمرکز بر مهارت‌های واقعی طراحی شده‌اند تا یادگیری فقط محدود به تئوری نباشد و خروجی نهایی، آمادگی بهتر برای محیط کار و رشد حرفه‌ای باشد.",
        mediaType: "video",
        mediaSrc: "/videos/about/course-1.mp4",
        badge: "آموزش عملی",
    },
    {
        id: 3,
        step: "03",
        title: "همراهی با سازمان‌ها",
        subtitle: "طراحی و اجرای دوره‌های اختصاصی برای مجموعه‌ها",
        description:
            "کاردو علاوه بر دوره‌های عمومی، برای شرکت‌ها و سازمان‌ها نیز آموزش‌های اختصاصی طراحی می‌کند تا فرآیند رشد، توسعه نیروی انسانی و ارتقای مهارت‌ها هدفمندتر انجام شود.",
        mediaType: "image",
        mediaSrc: "/images/about/about-2.jpg",
        badge: "سازمانی",
    },
    {
        id: 4,
        step: "04",
        title: "مسیرهای آموزشی عمان",
        subtitle: "دسترسی به فرصت‌های یادگیری و توسعه بین‌المللی",
        description:
            "یکی از مسیرهای متمایز کاردو، معرفی و هدایت مخاطبان به دوره‌ها و فرصت‌های آموزشی عمان است؛ مسیری که می‌تواند پنجره‌ای تازه برای توسعه فردی و حرفه‌ای باشد.",
        mediaType: "video",
        mediaSrc: "/videos/about/course-2.mp4",
        badge: "بین‌المللی",
    },
];

function MediaCard({
    item,
}: {
    item: RoadmapItem;
}) {
    return (
        <div
            className="
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-slate-200
        bg-white
        shadow-[0_20px_60px_rgba(15,23,42,0.08)]
      "
        >
            <div
                className="
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-slate-300
          to-transparent
        "
            />

            <div
                className="
          relative
          aspect-[16/10]
          w-full
          overflow-hidden
          bg-slate-100
        "
            >
                {item.mediaType === "image" ? (
                    <Image
                        src={item.mediaSrc}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />
                ) : (
                    <video
                        src={item.mediaSrc}
                        className="h-full w-full object-cover"
                        controls
                        muted
                        playsInline
                        preload="metadata"
                    />
                )}

                <div
                    className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-slate-900/20
            via-transparent
            to-transparent
          "
                />

                <div
                    className="
            absolute
            right-4
            top-4
            rounded-full
            bg-white/90
            px-3
            py-1.5
            text-[11px]
            font-black
            text-slate-700
            shadow-sm
            backdrop-blur
          "
                >
                    {item.badge}
                </div>
            </div>
        </div>
    );
}

function ContentCard({
    item,
}: {
    item: RoadmapItem;
}) {
    return (
        <div
            className="
        relative
        rounded-[30px]
        border
        border-slate-200
        bg-white/90
        p-6
        shadow-[0_20px_60px_rgba(15,23,42,0.06)]
        backdrop-blur-xl
        sm:p-7
      "
        >
            <div
                className="
          absolute
          left-6
          top-6
          text-[11px]
          font-black
          tracking-[0.22em]
          text-slate-300
        "
            >
                STEP {item.step}
            </div>

            <div
                className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-cyan-200
          bg-cyan-50
          px-3
          py-1.5
          text-[11px]
          font-black
          text-cyan-700
        "
            >
                <span className="h-2 w-2 rounded-full bg-cyan-500" />
                {item.badge}
            </div>

            <h3
                className="
          mt-5
          text-2xl
          font-black
          leading-[1.6]
          text-slate-900
          sm:text-[28px]
        "
            >
                {item.title}
            </h3>

            <p
                className="
          mt-3
          text-sm
          font-bold
          leading-7
          text-slate-600
        "
            >
                {item.subtitle}
            </p>

            <p
                className="
          mt-4
          text-sm
          leading-8
          text-slate-500
          sm:text-[15px]
        "
            >
                {item.description}
            </p>
        </div>
    );
}

export default function AboutRoadmap() {
    return (
        <section
            id="about-kardo"
            dir="rtl"
            className="
        relative
        overflow-hidden
        bg-gradient-to-b
        from-[#EAF7FF]
        via-[#F7FBFF]
        to-[#FFFFFF]
        py-24
        sm:py-28
      "
        >
            {/* background effects */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="
            absolute
            right-[-120px]
            top-[40px]
            h-[320px]
            w-[320px]
            rounded-full
            bg-cyan-200/50
            blur-[90px]
          "
                />
                <div
                    className="
            absolute
            left-[-100px]
            bottom-[30px]
            h-[280px]
            w-[280px]
            rounded-full
            bg-orange-200/40
            blur-[90px]
          "
                />

                <div
                    className="
            absolute
            inset-0
            opacity-40
          "
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(15,23,42,0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15,23,42,0.035) 1px, transparent 1px)
            `,
                        backgroundSize: "70px 70px",
                    }}
                />
            </div>

            <div
                className="
          relative
          mx-auto
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
            >
                {/* heading */}
                <div className="mx-auto max-w-4xl text-center">
                    <div
                        className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-orange-200
              bg-white/80
              px-4
              py-2
              text-xs
              font-black
              text-orange-600
              shadow-sm
            "
                    >
                        <span className="h-2 w-2 rounded-full bg-orange-400" />
                        درباره کاردو
                    </div>

                    <h2
                        className="
              mt-6
              text-4xl
              font-black
              leading-[1.5]
              text-slate-900
              sm:text-5xl
              lg:text-[58px]
            "
                    >
                        مسیر یادگیری در{" "}
                        <span
                            className="
                bg-gradient-to-l
                from-cyan-600
                via-cyan-500
                to-blue-600
                bg-clip-text
                text-transparent
              "
                        >
                            کاردو
                        </span>
                    </h2>

                    <p
                        className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-8
              text-slate-600
              sm:text-base
            "
                    >
                        کاردو فقط یک مجموعه آموزشی نیست؛
                        یک مسیر رشد است که از انتخاب دوره
                        شروع می‌شود و تا آموزش کاربردی،
                        همکاری با سازمان‌ها و فرصت‌های
                        بین‌المللی ادامه پیدا می‌کند.
                    </p>
                </div>

                {/* roadmap */}
                <div className="relative mt-16 sm:mt-20">
                    {/* center line for desktop */}
                    <div
                        className="
              absolute
              right-1/2
              top-0
              hidden
              h-full
              w-[2px]
              translate-x-1/2
              bg-gradient-to-b
              from-cyan-300
              via-cyan-400
              to-orange-300
              lg:block
            "
                    />

                    <div className="space-y-10 lg:space-y-16">
                        {roadmapItems.map((item, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <div
                                    key={item.id}
                                    className="
                    relative
                    grid
                    items-center
                    gap-6
                    lg:grid-cols-2
                    lg:gap-14
                  "
                                >
                                    {/* dot desktop */}
                                    <div
                                        className="
                      absolute
                      right-1/2
                      top-1/2
                      z-20
                      hidden
                      h-6
                      w-6
                      translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      border-4
                      border-white
                      bg-cyan-500
                      shadow-[0_0_0_8px_rgba(34,211,238,0.15)]
                      lg:block
                    "
                                    />

                                    {/* mobile top step */}
                                    <div
                                        className="
                      flex
                      items-center
                      gap-3
                      lg:hidden
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
                        bg-slate-900
                        text-sm
                        font-black
                        text-white
                        shadow-lg
                      "
                                        >
                                            {item.step}
                                        </div>

                                        <div
                                            className="
                        h-[2px]
                        flex-1
                        bg-gradient-to-r
                        from-cyan-400
                        to-orange-300
                      "
                                        />
                                    </div>

                                    {/* desktop alternating layout */}
                                    {isEven ? (
                                        <>
                                            <div className="lg:pl-10">
                                                <ContentCard item={item} />
                                            </div>

                                            <div className="lg:pr-10">
                                                <MediaCard item={item} />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="order-2 lg:order-1 lg:pl-10">
                                                <MediaCard item={item} />
                                            </div>

                                            <div className="order-1 lg:order-2 lg:pr-10">
                                                <ContentCard item={item} />
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* bottom note */}
                <div className="mx-auto mt-16 max-w-4xl">
                    <div
                        className="
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-slate-200
              bg-white/85
              px-6
              py-6
              shadow-[0_20px_60px_rgba(15,23,42,0.06)]
              backdrop-blur-xl
              sm:px-8
            "
                    >
                        <div
                            className="
                absolute
                right-0
                top-0
                h-full
                w-[4px]
                bg-gradient-to-b
                from-cyan-400
                via-blue-500
                to-orange-300
              "
                        />

                        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-right">
                            <div
                                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-cyan-50
                  text-xl
                  font-black
                  text-cyan-700
                "
                            >
                                +
                            </div>

                            <div>
                                <p className="text-sm font-black text-slate-900">
                                    این بخش کاملاً قابل ویرایش است
                                </p>
                                <p className="mt-1 text-xs leading-6 text-slate-500 sm:text-sm">
                                    هر مرحله را می‌توانی بعداً با عکس واقعی، ویدیوی کوتاه،
                                    توضیحات جدید یا حتی تعداد مراحل بیشتر توسعه بدهی.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}