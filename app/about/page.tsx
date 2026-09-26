import Navbar from "@/components/Navbar";

const timeline = [
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
        type: "video",
        media: "/videos/about/about-01.mp4",
        mediaLabel: "بخشی از دوره‌های کاردو",
    },

    {
        number: "03",
        eyebrow: "همراهی سازمان‌ها",
        title: "آموزش متناسب با نیاز هر مجموعه",
        description:
            "همکاری با مجموعه‌ها و سازمان‌های مختلف باعث شده بخشی از مسیر کاردو به طراحی و اجرای آموزش‌های اختصاصی برای نیازهای واقعی محیط کار اختصاص پیدا کند.",
        type: "gallery",
        media: "",
        mediaLabel: "همکاری‌های سازمانی",
        gallery: [
            "/images/about/org-01.jpg",
            "/images/about/org-02.jpg",
            "/images/about/org-03.jpg",
        ],
    },

    {
        number: "04",
        eyebrow: "توسعه آموزش",
        title: "گسترش مسیرهای تخصصی",
        description:
            "با توسعه کاردو، مسیرهای آموزشی متنوع‌تری شکل گرفتند؛ از دوره‌های فنی و حرفه‌ای تا آموزش‌های سازمانی و دوره‌های مرتبط با فرصت‌های آموزشی عمان.",
        type: "video",
        media: "/videos/about/about-02.mp4",
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

type TimelineItem = (typeof timeline)[number];

function ImageMedia({ item }: { item: TimelineItem }) {
    return (
        <div className="group relative aspect-[16/10] overflow-hidden rounded-[32px] bg-[#E8F0F4]">
            <img
                src={item.media}
                alt={item.mediaLabel}
                className="
          h-full
          w-full
          object-cover
          transition
          duration-700
          group-hover:scale-[1.04]
        "
            />

            <div
                className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-[#06192E]/55
          via-transparent
          to-transparent
        "
            />

            <div
                className="
          absolute
          bottom-5
          right-5
          rounded-full
          border
          border-white/20
          bg-[#06192E]/40
          px-4
          py-2
          text-[11px]
          font-black
          text-white
          backdrop-blur-xl
        "
            >
                {item.mediaLabel}
            </div>
        </div>
    );
}

function VideoMedia({ item }: { item: TimelineItem }) {
    return (
        <div
            className="
        group
        relative
        aspect-[16/10]
        overflow-hidden
        rounded-[32px]
        bg-[#0B2439]
      "
        >
            <video
                src={item.media}
                controls
                muted
                playsInline
                preload="metadata"
                className="
          h-full
          w-full
          object-cover
        "
            />

            <div
                className="
          pointer-events-none
          absolute
          left-5
          top-5
          rounded-full
          border
          border-white/15
          bg-[#06192E]/45
          px-4
          py-2
          text-[10px]
          font-black
          text-white/80
          backdrop-blur-xl
        "
            >
                VIDEO / KARDO
            </div>
        </div>
    );
}

function GalleryMedia({ item }: { item: TimelineItem }) {
    const gallery = item.gallery ?? [];

    return (
        <div
            className="
        grid
        aspect-[16/10]
        grid-cols-[1.35fr_.65fr]
        gap-2
        overflow-hidden
        rounded-[32px]
        bg-[#E8F0F4]
        p-2
      "
        >
            <div className="group relative overflow-hidden rounded-[25px]">
                <img
                    src={gallery[0]}
                    alt={item.mediaLabel}
                    className="
            h-full
            w-full
            object-cover
            transition
            duration-700
            group-hover:scale-105
          "
                />

                <div
                    className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#06192E]/40
            to-transparent
          "
                />

                <div
                    className="
            absolute
            bottom-4
            right-4
            rounded-full
            bg-white/85
            px-3
            py-1.5
            text-[10px]
            font-black
            text-[#06192E]
            backdrop-blur
          "
                >
                    {item.mediaLabel}
                </div>
            </div>

            <div className="grid grid-rows-2 gap-2">
                {gallery.slice(1, 3).map((image, index) => (
                    <div
                        key={image}
                        className="
              group
              overflow-hidden
              rounded-[22px]
            "
                    >
                        <img
                            src={image}
                            alt={`${item.mediaLabel} ${index + 2}`}
                            className="
                h-full
                w-full
                object-cover
                transition
                duration-700
                group-hover:scale-105
              "
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

function Media({ item }: { item: TimelineItem }) {
    return (
        <div
            className="
        relative
        rounded-[38px]
        border
        border-[#DCE7ED]
        bg-white
        p-3
        shadow-[0_25px_70px_rgba(25,55,75,.08)]
        transition
        duration-500

        hover:-translate-y-1
        hover:shadow-[0_32px_90px_rgba(25,55,75,.13)]
      "
        >
            <div
                className="
          pointer-events-none
          absolute
          -left-4
          -top-4
          h-20
          w-20
          rounded-full
          bg-orange-300/20
          blur-[35px]
        "
            />

            <div
                className="
          pointer-events-none
          absolute
          -bottom-5
          -right-5
          h-24
          w-24
          rounded-full
          bg-cyan-300/20
          blur-[40px]
        "
            />

            <div className="relative">
                {item.type === "image" && <ImageMedia item={item} />}

                {item.type === "video" && <VideoMedia item={item} />}

                {item.type === "gallery" && <GalleryMedia item={item} />}
            </div>
        </div>
    );
}

function StoryCard({ item }: { item: TimelineItem }) {
    return (
        <div
            className="
        relative
        rounded-[32px]
        border
        border-[#DCE7ED]
        bg-white/90
        p-7
        shadow-[0_20px_60px_rgba(25,55,75,.06)]
        backdrop-blur-xl
        sm:p-8
      "
        >
            <div
                className="
          absolute
          right-0
          top-8
          h-20
          w-[3px]
          rounded-full
          bg-gradient-to-b
          from-cyan-400
          to-orange-300
        "
            />

            <span
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

                {item.eyebrow}
            </span>

            <h2
                className="
          mt-5
          text-2xl
          font-black
          leading-[1.6]
          text-[#06192E]

          sm:text-3xl
        "
            >
                {item.title}
            </h2>

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

            <div
                className="
          mt-7
          flex
          items-center
          gap-3
        "
            >
                <div
                    className="
            h-px
            flex-1
            bg-gradient-to-l
            from-slate-200
            to-transparent
          "
                />

                <span
                    className="
            text-[9px]
            font-black
            tracking-[0.26em]
            text-slate-300
          "
                >
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
            className="
        min-h-screen
        overflow-hidden
        bg-[#F6FAFC]
        text-[#06192E]
      "
        >
            {/* =====================================================
          NAVBAR AREA
      ====================================================== */}

            <div
                className="
          relative
          z-50
          bg-[#06192E]
          text-white
        "
            >
                <Navbar />
            </div>

            {/* =====================================================
          SIMPLE INTRO
      ====================================================== */}

            <section
                className="
          relative
          overflow-hidden
          bg-gradient-to-b
          from-[#EAF6FA]
          via-[#F4F9FB]
          to-[#F6FAFC]
          px-4
          pb-24
          pt-28

          sm:px-6
          sm:pt-32

          lg:px-8
          lg:pb-28
        "
            >
                <div
                    className="
            pointer-events-none
            absolute
            -right-32
            top-0
            h-[420px]
            w-[420px]
            rounded-full
            bg-cyan-200/45
            blur-[110px]
          "
                />

                <div
                    className="
            pointer-events-none
            absolute
            -left-32
            top-20
            h-[380px]
            w-[380px]
            rounded-full
            bg-orange-200/35
            blur-[110px]
          "
                />

                <div
                    className="
            relative
            mx-auto
            max-w-5xl
            text-center
          "
                >
                    <div
                        className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#D8E7ED]
              bg-white/70
              px-4
              py-2
              text-xs
              font-black
              text-cyan-700
              shadow-sm
              backdrop-blur
            "
                    >
                        <span
                            className="
                h-2
                w-2
                rounded-full
                bg-orange-400
              "
                        />

                        درباره مجتمع آموزشی کاردو
                    </div>

                    <h1
                        className="
              mx-auto
              mt-7
              max-w-4xl
              text-4xl
              font-black
              leading-[1.55]
              text-[#06192E]

              sm:text-5xl

              lg:text-[62px]
            "
                    >
                        داستانی که با{" "}

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
                            آموزش
                        </span>

                        {" "}
                        شروع شد
                    </h1>

                    <p
                        className="
              mx-auto
              mt-6
              max-w-2xl
              text-sm
              leading-8
              text-slate-500

              sm:text-base
            "
                    >
                        نگاهی به مسیر کاردو؛ از شکل‌گیری ایده تا
                        تجربه دوره‌ها، همراهی با سازمان‌ها و توسعه
                        مسیرهای آموزشی تخصصی.
                    </p>

                    <div
                        className="
              mx-auto
              mt-10
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              text-lg
              text-cyan-600
              shadow-[0_12px_30px_rgba(15,70,90,.08)]
            "
                    >
                        ↓
                    </div>
                </div>
            </section>

            {/* =====================================================
          TIMELINE SECTION
      ====================================================== */}

            <section
                className="
          relative
          overflow-hidden
          bg-[#F6FAFC]
          px-4
          pb-28

          sm:px-6

          lg:px-8
          lg:pb-36
        "
            >
                {/* background dots */}

                <div
                    className="
            pointer-events-none
            absolute
            inset-0
            opacity-40
          "
                    style={{
                        backgroundImage:
                            "radial-gradient(rgba(38,107,129,.13) 1px, transparent 1px)",
                        backgroundSize: "26px 26px",
                    }}
                />

                <div
                    className="
            relative
            mx-auto
            max-w-7xl
          "
                >
                    {/* =================================================
              CENTRAL DASHED LINE
          ================================================== */}

                    <div
                        className="
              absolute
              bottom-20
              right-[25px]
              top-4
              z-0
              border-r-2
              border-dashed
              border-cyan-700/20

              lg:right-1/2
              lg:translate-x-1/2
            "
                    />

                    {/* =================================================
              ITEMS
          ================================================== */}

                    <div
                        className="
              relative
              z-10
              space-y-24

              lg:space-y-32
            "
                    >
                        {timeline.map((item, index) => {
                            const mediaLeft =
                                index % 2 === 0;

                            return (
                                <article
                                    key={item.number}
                                    className="
                    relative
                    grid
                    items-center
                    gap-8
                    pr-16

                    lg:grid-cols-2
                    lg:gap-24
                    lg:pr-0
                  "
                                >
                                    {/* =========================================
                      CENTER NUMBER
                  ========================================== */}

                                    <div
                                        className="
                      absolute
                      right-[1px]
                      top-6
                      z-30

                      lg:right-1/2
                      lg:top-1/2
                      lg:translate-x-1/2
                      lg:-translate-y-1/2
                    "
                                    >
                                        {/* halo */}

                                        <div
                                            className="
                        absolute
                        left-1/2
                        top-1/2
                        h-[72px]
                        w-[72px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-cyan-400/10
                        blur-xl
                      "
                                        />

                                        {/* circle */}

                                        <div
                                            className="
                        relative
                        flex
                        h-[52px]
                        w-[52px]
                        items-center
                        justify-center
                        rounded-full
                        border-[6px]
                        border-[#F6FAFC]
                        bg-[#06192E]
                        text-xs
                        font-black
                        text-white
                        shadow-[0_8px_25px_rgba(6,25,46,.15)]

                        lg:h-[64px]
                        lg:w-[64px]
                        lg:text-sm
                      "
                                        >
                                            {item.number}

                                            <span
                                                className="
                          absolute
                          -bottom-1
                          -left-1
                          h-3
                          w-3
                          rounded-full
                          border-2
                          border-[#F6FAFC]
                          bg-orange-400
                        "
                                            />
                                        </div>
                                    </div>

                                    {/* =========================================
                      DESKTOP DASH CONNECTORS
                  ========================================== */}

                                    <div
                                        className={`
                      pointer-events-none
                      absolute
                      top-1/2
                      hidden
                      w-[9%]
                      -translate-y-1/2
                      border-t-2
                      border-dashed
                      border-cyan-700/20

                      lg:block

                      ${mediaLeft
                                                ? "left-[41%]"
                                                : "right-[41%]"
                                            }
                    `}
                                    />

                                    {/* =========================================
                      CONTENT
                  ========================================== */}

                                    {mediaLeft ? (
                                        <>
                                            <div
                                                className="
                          lg:pl-8
                        "
                                            >
                                                <Media item={item} />
                                            </div>

                                            <div
                                                className="
                          lg:pr-8
                        "
                                            >
                                                <StoryCard item={item} />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div
                                                className="
                          order-2
                          lg:order-1
                          lg:pl-8
                        "
                                            >
                                                <StoryCard item={item} />
                                            </div>

                                            <div
                                                className="
                          order-1
                          lg:order-2
                          lg:pr-8
                        "
                                            >
                                                <Media item={item} />
                                            </div>
                                        </>
                                    )}
                                </article>
                            );
                        })}
                    </div>

                    {/* =================================================
              END OF ROAD
          ================================================== */}

                    <div
                        className="
              relative
              z-20
              mt-28
              pr-16

              lg:mt-36
              lg:pr-0
              lg:text-center
            "
                    >
                        <div
                            className="
                absolute
                right-[1px]
                top-0

                lg:right-1/2
                lg:translate-x-1/2
              "
                        >
                            <div
                                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-24
                  w-24
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-orange-300/20
                  blur-[30px]
                "
                            />

                            <div
                                className="
                  relative
                  flex
                  h-[54px]
                  w-[54px]
                  items-center
                  justify-center
                  rounded-full
                  border-[6px]
                  border-[#F6FAFC]
                  bg-orange-400
                  text-xl
                  font-black
                  text-[#06192E]
                  shadow-[0_10px_30px_rgba(251,146,60,.22)]

                  lg:h-[70px]
                  lg:w-[70px]
                "
                            >
                                ∞
                            </div>
                        </div>

                        <div
                            className="
                rounded-[34px]
                border
                border-[#DCE7ED]
                bg-white/90
                px-7
                py-9
                shadow-[0_25px_70px_rgba(25,55,75,.07)]
                backdrop-blur-xl

                lg:mx-auto
                lg:mt-28
                lg:max-w-3xl
                lg:px-12
              "
                        >
                            <span
                                className="
                  text-xs
                  font-black
                  tracking-[0.20em]
                  text-orange-500
                "
                            >
                                THE JOURNEY CONTINUES
                            </span>

                            <h2
                                className="
                  mt-4
                  text-3xl
                  font-black
                  leading-[1.6]
                  text-[#06192E]

                  sm:text-4xl
                "
                            >
                                مسیر کاردو ادامه دارد
                            </h2>

                            <p
                                className="
                  mx-auto
                  mt-4
                  max-w-xl
                  text-sm
                  leading-8
                  text-slate-500
                "
                            >
                                این مسیر با دوره‌های تازه، تجربه‌های جدید
                                و همراهی افراد و سازمان‌های بیشتر همچنان
                                در حال ساخته شدن است.
                            </p>

                            <a
                                href="/courses?category=technical"
                                className="
                  mt-7
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-[#06192E]
                  px-6
                  py-3.5
                  text-sm
                  font-black
                  text-white
                  shadow-[0_12px_30px_rgba(6,25,46,.15)]
                  transition
                  duration-300

                  hover:-translate-y-1
                  hover:bg-[#0C2C48]
                "
                            >
                                مشاهده دوره‌های کاردو

                                <span className="text-orange-300">
                                    ←
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}