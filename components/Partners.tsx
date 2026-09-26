const partners = [
    {
        name: "گروه صنعتی ماموت",
        logo: "/images/partners/mammut.png",
        number: "01",
    },
    {
        name: "شرکت خطوط لوله و مخابرات نفت ایران",
        logo: "/images/partners/pipeline.png",
        number: "02",
    },
    {
        name: "ناردیس",
        logo: "/images/partners/nardis.png",
        number: "03",
    },
    {
        name: "شرکت ملی نفت ایران",
        logo: "/images/partners/nioc.png",
        number: "04",
    },
    {
        name: "شرکت ملی صنایع پتروشیمی",
        logo: "/images/partners/nipc.png",
        number: "05",
    },
    {
        name: "شرکت ملی گاز ایران",
        logo: "/images/partners/nigc.png",
        number: "06",
    },
    {
        name: "وزارت صنعت، معدن و تجارت",
        logo: "/images/partners/samt.png",
        number: "07",
    },
    {
        name: "جمعیت هلال احمر جمهوری اسلامی ایران",
        logo: "/images/partners/red-crescent.png",
        number: "08",
    },
];

export default function Partners() {
    return (
        <section
            dir="rtl"
            className="
          relative
          overflow-hidden
          bg-gradient-to-b
          from-[#17364F]
          via-[#1B405B]
          to-[#204963]
          py-24
          sm:py-28
        "
        >
            {/* background lights */}

            <div className="pointer-events-none absolute inset-0">
                <div
                    className="
              absolute
              -right-[220px]
              top-0
              h-[550px]
              w-[550px]
              rounded-full
              bg-cyan-300/[0.09]
              blur-[160px]
            "
                />

                <div
                    className="
              absolute
              -left-[220px]
              bottom-0
              h-[550px]
              w-[550px]
              rounded-full
              bg-orange-300/[0.08]
              blur-[160px]
            "
                />

                <div
                    className="
              absolute
              left-1/2
              top-1/2
              h-[300px]
              w-[700px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-white/[0.025]
              blur-[100px]
            "
                />

                <div
                    className="
              absolute
              inset-0
              opacity-20
            "
                    style={{
                        backgroundImage: `
                linear-gradient(
                  rgba(255,255,255,0.03) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(255,255,255,0.03) 1px,
                  transparent 1px
                )
              `,
                        backgroundSize: "80px 80px",
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
                {/* HEADER */}

                <div className="mx-auto max-w-4xl text-center">
                    <div
                        className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-orange-300/25
                bg-orange-300/[0.10]
                px-4
                py-2
                text-xs
                font-black
                text-orange-200
                backdrop-blur-xl
              "
                    >
                        <span
                            className="
                  h-2
                  w-2
                  rounded-full
                  bg-orange-300
                "
                        />

                        افتخار همراهی
                    </div>

                    <h2
                        className="
                mt-6
                text-4xl
                font-black
                leading-[1.55]
                text-white
                sm:text-5xl
                lg:text-[58px]
              "
                    >
                        همراه مجموعه‌هایی که
                        <br className="hidden sm:block" />

                        <span
                            className="
                  bg-gradient-to-l
                  from-cyan-200
                  via-white
                  to-cyan-100
                  bg-clip-text
                  text-transparent
                "
                        >
                            {" "}
                            مسیر حرفه‌ای را جدی می‌گیرند
                        </span>
                    </h2>

                    <p
                        className="
                mx-auto
                mt-5
                max-w-2xl
                text-sm
                leading-8
                text-slate-200/80
                sm:text-base
              "
                    >
                        در مسیر آموزش و توسعه حرفه‌ای،
                        افتخار همراهی با سازمان‌ها و
                        مجموعه‌های ارزشمندی را داشته‌ایم
                        که اعتماد آن‌ها برای کاردو
                        ارزشمند است.
                    </p>

                    <div
                        className="
                mx-auto
                mt-7
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-white/[0.10]
                bg-white/[0.05]
                px-5
                py-3
                backdrop-blur-xl
              "
                    >
                        <div className="flex -space-x-2 space-x-reverse">
                            <span
                                className="
                    h-7
                    w-7
                    rounded-full
                    border-2
                    border-[#1B405B]
                    bg-orange-400
                  "
                            />

                            <span
                                className="
                    h-7
                    w-7
                    rounded-full
                    border-2
                    border-[#1B405B]
                    bg-cyan-300
                  "
                            />

                            <span
                                className="
                    h-7
                    w-7
                    rounded-full
                    border-2
                    border-[#1B405B]
                    bg-blue-400
                  "
                            />
                        </div>

                        <span
                            className="
                  text-xs
                  font-bold
                  text-white/70
                "
                        >
                            همراهی با مجموعه‌های صنعتی،
                            سازمانی و ملی
                        </span>
                    </div>
                </div>

                {/* PARTNERS GRID */}

                <div
                    className="
              mt-16
              grid
              grid-cols-2
              gap-4
              md:grid-cols-3
              lg:grid-cols-4
            "
                >
                    {partners.map((partner) => (
                        <div
                            key={partner.name}
                            className="
                  group
                  relative
                  min-h-[210px]
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-white/[0.11]
                  bg-white/[0.055]
                  p-[1px]
                  transition
                  duration-500
  
                  hover:-translate-y-2
                  hover:border-cyan-200/30
                  hover:bg-white/[0.08]
                  hover:shadow-[0_30px_80px_rgba(0,0,0,0.22)]
                "
                        >
                            {/* glows */}

                            <div
                                className="
                    pointer-events-none
                    absolute
                    -bottom-20
                    left-1/2
                    h-[180px]
                    w-[180px]
                    -translate-x-1/2
                    rounded-full
                    bg-cyan-300/0
                    blur-[60px]
                    transition
                    duration-500
  
                    group-hover:bg-cyan-300/[0.16]
                  "
                            />

                            <div
                                className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    h-[130px]
                    w-[130px]
                    rounded-full
                    bg-orange-300/0
                    blur-[50px]
                    transition
                    duration-500
  
                    group-hover:bg-orange-300/[0.12]
                  "
                            />

                            {/* inner */}

                            <div
                                className="
                    relative
                    flex
                    h-full
                    min-h-[208px]
                    flex-col
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-[29px]
                    bg-gradient-to-b
                    from-white/[0.07]
                    to-white/[0.025]
                    px-5
                    py-6
                    backdrop-blur-xl
                  "
                            >
                                {/* top line */}

                                <div
                                    className="
                      pointer-events-none
                      absolute
                      left-10
                      right-10
                      top-0
                      h-px
                      bg-gradient-to-r
                      from-transparent
                      via-white/35
                      to-transparent
                    "
                                />

                                {/* number */}

                                <span
                                    className="
                      absolute
                      left-4
                      top-4
                      text-[10px]
                      font-black
                      tracking-[0.16em]
                      text-white/30
                      transition
                      duration-300
  
                      group-hover:text-cyan-200
                    "
                                >
                                    {partner.number}
                                </span>

                                {/* LOGO BOX */}

                                <div
                                    className="
                      flex
                      h-[105px]
                      w-full
                      items-center
                      justify-center
                      rounded-[22px]
                      border
                      border-white/20
                      bg-white/[0.92]
                      px-5
                      py-3
                      shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                      transition
                      duration-500
  
                      group-hover:bg-white
                      group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)]
                    "
                                >
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="
                        max-h-[82px]
                        max-w-[170px]
                        object-contain
                        opacity-90
                        transition
                        duration-500
  
                        group-hover:scale-105
                        group-hover:opacity-100
                      "
                                    />
                                </div>

                                {/* divider */}

                                <div
                                    className="
                      my-4
                      h-px
                      w-10
                      bg-white/15
                      transition-all
                      duration-500
  
                      group-hover:w-20
                      group-hover:bg-cyan-200/40
                    "
                                />

                                {/* name */}

                                <p
                                    className="
                      max-w-[220px]
                      text-center
                      text-xs
                      font-black
                      leading-6
                      text-white/75
                      transition
                      duration-300
  
                      group-hover:text-white
                    "
                                >
                                    {partner.name}
                                </p>

                                {/* bottom accent */}

                                <div
                                    className="
                      absolute
                      bottom-0
                      left-1/2
                      h-[2px]
                      w-0
                      -translate-x-1/2
                      rounded-full
                      bg-gradient-to-r
                      from-orange-300
                      via-cyan-200
                      to-orange-300
                      transition-all
                      duration-500
  
                      group-hover:w-[55%]
                    "
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* BOTTOM STRIP */}

                <div
                    className="
              mx-auto
              mt-12
              max-w-4xl
            "
                >
                    <div
                        className="
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-white/[0.10]
                bg-white/[0.055]
                px-6
                py-5
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
                  w-[3px]
                  bg-gradient-to-b
                  from-cyan-200
                  via-orange-300
                  to-transparent
                "
                        />

                        <div
                            className="
                  flex
                  flex-col
                  items-center
                  gap-4
                  text-center
                  sm:flex-row
                  sm:text-right
                "
                        >
                            <div
                                className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-cyan-200/25
                    bg-cyan-200/[0.10]
                    text-lg
                    font-black
                    text-cyan-200
                  "
                            >
                                ✓
                            </div>

                            <div>
                                <p
                                    className="
                      text-sm
                      font-black
                      text-white
                    "
                                >
                                    اعتماد مجموعه‌ها، بخشی از مسیر کاردو
                                </p>

                                <p
                                    className="
                      mt-1
                      text-xs
                      leading-6
                      text-slate-200/65
                    "
                                >
                                    تجربه همکاری با سازمان‌های مختلف،
                                    به ما کمک کرده آموزش‌ها را به نیازهای
                                    واقعی محیط کار نزدیک‌تر کنیم.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}