import Navbar from "@/components/Navbar";
import CertificatesShowcase from "@/components/CertificatesShowcase";



const licenses = [

    {

        id: "tvto",

        title: "مجوز رسمی فعالیت آموزشی",

        issuer: "سازمان آموزش فنی و حرفه‌ای کشور",

        date: "۱۴/۰۵/۱۴۰۰",

        image: "/images/licenses/tvto-license.jpg",

        description:

            "مجتمع آموزشی کاردو با دریافت مجوز رسمی از سازمان آموزش فنی و حرفه‌ای کشور، فعالیت آموزشی خود را در مسیر توسعه آموزش‌های تخصصی و مهارتی ادامه داده است.",

        status: "مجوز رسمی",

    },

];



export default function LicensesPage() {

    return (

        <main

            dir="rtl"

            className="

        min-h-screen

        overflow-hidden

        bg-[#F5F9FC]

        text-[#06192E]

      "

        >

            {/* =========================================

          NAVBAR AREA

      ========================================== */}



            <div

                className="

          relative

          z-50

          bg-[#0B2239]

          text-white

        "

            >

                <Navbar />

            </div>



            {/* =========================================

          HERO

      ========================================== */}



            <section

                className="

          relative

          overflow-hidden

          bg-gradient-to-b

          from-[#DFF4FA]

          via-[#EDF8FB]

          to-[#F5F9FC]

          px-4

          pb-20

          pt-36

          sm:px-6

          lg:px-8

        "

            >

                {/* background */}

                <div className="pointer-events-none absolute inset-0">

                    <div

                        className="

              absolute

              -right-40

              top-0

              h-[420px]

              w-[420px]

              rounded-full

              bg-cyan-300/30

              blur-[120px]

            "

                    />



                    <div

                        className="

              absolute

              -left-40

              top-24

              h-[380px]

              w-[380px]

              rounded-full

              bg-orange-200/35

              blur-[120px]

            "

                    />



                    <div

                        className="

              absolute

              inset-0

              opacity-40

            "

                        style={{

                            backgroundImage:

                                "radial-gradient(rgba(26,93,120,.12) 1px, transparent 1px)",

                            backgroundSize: "26px 26px",

                        }}

                    />

                </div>



                <div

                    className="

            relative

            mx-auto

            max-w-6xl

            text-center

          "

                >

                    {/* badge */}



                    <div

                        className="

              inline-flex

              items-center

              gap-2

              rounded-full

              border

              border-cyan-200

              bg-white/75

              px-4

              py-2

              text-xs

              font-black

              text-cyan-700

              shadow-sm

              backdrop-blur-xl

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



                        اعتبار و مجوزهای کاردو

                    </div>



                    {/* title */}



                    <h1

                        className="

              mx-auto

              mt-7

              max-w-4xl

              text-4xl

              font-black

              leading-[1.55]

              sm:text-5xl

              lg:text-[62px]

            "

                    >

                        مجوزها و{" "}

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

                            اعتبارهای رسمی

                        </span>

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

                        اطلاعات مجوزهای رسمی و مدارک فعالیت مجتمع آموزشی کاردو

                        در این بخش قابل مشاهده است.

                    </p>



                    {/* mini trust */}



                    <div

                        className="

              mx-auto

              mt-8

              inline-flex

              items-center

              gap-3

              rounded-2xl

              border

              border-slate-200

              bg-white/80

              px-5

              py-3

              shadow-[0_12px_30px_rgba(15,50,70,.06)]

              backdrop-blur-xl

            "

                    >

                        <div

                            className="

                flex

                h-9

                w-9

                items-center

                justify-center

                rounded-xl

                bg-emerald-50

                text-sm

                font-black

                text-emerald-600

              "

                        >

                            ✓

                        </div>



                        <span

                            className="

                text-xs

                font-bold

                text-slate-600

              "

                        >

                            اطلاعات این صفحه بر اساس مدارک و رزومه رسمی کاردو درج می‌شود

                        </span>

                    </div>

                </div>

            </section>



            {/* =========================================

          LICENSES

      ========================================== */}



            <section

                className="

          relative

          px-4

          pb-28

          sm:px-6

          lg:px-8

        "

            >

                <div

                    className="

            mx-auto

            max-w-7xl

          "

                >

                    {licenses.map((license, index) => (

                        <article

                            key={license.id}

                            className="

                relative

                grid

                items-center

                gap-8

                overflow-hidden

                rounded-[40px]

                border

                border-[#DDE8EE]

                bg-white

                p-5

                shadow-[0_30px_90px_rgba(35,70,90,.08)]



                md:p-7

                lg:grid-cols-[1.05fr\_.95fr]

                lg:gap-12

                lg:p-10

              "

                        >

                            {/* decorative glows */}



                            <div

                                className="

                  pointer-events-none

                  absolute

                  -right-20

                  -top-20

                  h-56

                  w-56

                  rounded-full

                  bg-cyan-200/30

                  blur-[70px]

                "

                            />



                            <div

                                className="

                  pointer-events-none

                  absolute

                  -bottom-20

                  -left-20

                  h-56

                  w-56

                  rounded-full

                  bg-orange-200/30

                  blur-[70px]

                "

                            />



                            {/* =================================

                  LICENSE IMAGE

              ================================== */}



                            <div

                                className="

                  relative

                  order-2

                  lg:order-1

                "

                            >

                                {/* back paper */}



                                <div

                                    className="

                    absolute

                    inset-5

                    rotate-[-4deg]

                    rounded-[30px]

                    border

                    border-cyan-200

                    bg-cyan-50

                  "

                                />



                                <div

                                    className="

                    absolute

                    inset-5

                    rotate-[4deg]

                    rounded-[30px]

                    border

                    border-orange-200

                    bg-orange-50

                  "

                                />



                                {/* main certificate */}



                                <div

                                    className="

                    group

                    relative

                    z-10

                    overflow-hidden

                    rounded-[32px]

                    border

                    border-slate-200

                    bg-[#F8FBFC]

                    p-3

                    shadow-[0_25px_60px_rgba(15,50,70,.10)]

                  "

                                >

                                    <div

                                        className="

                      relative

                      aspect-[4/3]

                      overflow-hidden

                      rounded-[25px]

                      bg-white

                    "

                                    >

                                        <img

                                            src={license.image}

                                            alt={license.title}

                                            className="

                        h-full

                        w-full

                        object-contain

                        p-3

                        transition

                        duration-500

                        group-hover:scale-[1.02]

                      "

                                        />



                                        {/* fallback visual */}

                                        <div

                                            className="

                        absolute

                        bottom-4

                        left-4

                        rounded-full

                        border

                        border-slate-200

                        bg-white/90

                        px-3

                        py-2

                        text-[10px]

                        font-black

                        text-slate-500

                        backdrop-blur

                      "

                                        >

                                            سند رسمی

                                        </div>

                                    </div>

                                </div>

                            </div>



                            {/* =================================

                  INFO

              ================================== */}



                            <div

                                className="

                  relative

                  order-1

                  lg:order-2

                "

                            >

                                <div

                                    className="

                    flex

                    items-center

                    gap-3

                  "

                                >

                                    <span

                                        className="

                      flex

                      h-12

                      w-12

                      items-center

                      justify-center

                      rounded-2xl

                      bg-[#06192E]

                      text-sm

                      font-black

                      text-white

                    "

                                    >

                                        {String(index + 1).padStart(2, "0")}

                                    </span>



                                    <span

                                        className="

                      rounded-full

                      border

                      border-emerald-200

                      bg-emerald-50

                      px-4

                      py-2

                      text-[11px]

                      font-black

                      text-emerald-700

                    "

                                    >

                                        {license.status}

                                    </span>

                                </div>



                                <h2

                                    className="

                    mt-7

                    text-3xl

                    font-black

                    leading-[1.6]

                    text-[#06192E]

                    sm:text-4xl

                  "

                                >

                                    {license.title}

                                </h2>



                                <p

                                    className="

                    mt-5

                    text-sm

                    leading-8

                    text-slate-500

                    sm:text-[15px]

                  "

                                >

                                    {license.description}

                                </p>



                                {/* info cards */}



                                <div

                                    className="

                    mt-8

                    grid

                    gap-3

                    sm:grid-cols-2

                  "

                                >

                                    <div

                                        className="

                      rounded-[22px]

                      border

                      border-slate-200

                      bg-[#F7FAFC]

                      p-5

                    "

                                    >

                                        <span

                                            className="

                        text-[10px]

                        font-black

                        text-slate-400

                      "

                                        >

                                            صادرکننده

                                        </span>



                                        <p

                                            className="

                        mt-2

                        text-sm

                        font-black

                        leading-7

                        text-[#06192E]

                      "

                                        >

                                            {license.issuer}

                                        </p>

                                    </div>



                                    <div

                                        className="

                      rounded-[22px]

                      border

                      border-slate-200

                      bg-[#F7FAFC]

                      p-5

                    "

                                    >

                                        <span

                                            className="

                        text-[10px]

                        font-black

                        text-slate-400

                      "

                                        >

                                            تاریخ

                                        </span>



                                        <p

                                            className="

                        mt-2

                        text-sm

                        font-black

                        text-[#06192E]

                      "

                                        >

                                            {license.date}

                                        </p>

                                    </div>

                                </div>



                                {/* accent */}



                                <div

                                    className="

                    mt-8

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

                      from-cyan-300

                      to-transparent

                    "

                                    />



                                    <span

                                        className="

                      text-[9px]

                      font-black

                      tracking-[0.24em]

                      text-slate-300

                    "

                                    >

                                        KARDO ACADEMY

                                    </span>

                                </div>

                            </div>

                        </article>

                    ))}



                    {/* =========================================

              MORE LICENSES

          ========================================== */}



                    <div

                        className="

              mt-8

              rounded-[32px]

              border

              border-dashed

              border-slate-300

              bg-white/55

              px-6

              py-9

              text-center

              backdrop-blur-xl

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

                rounded-2xl

                border

                border-cyan-200

                bg-cyan-50

                text-2xl

                font-black

                text-cyan-600

              "

                        >

                            +

                        </div>



                        <h3

                            className="

                mt-5

                text-lg

                font-black

                text-[#06192E]

              "

                        >

                            سایر مجوزها

                        </h3>



                        <p

                            className="

                mx-auto

                mt-2

                max-w-xl

                text-xs

                leading-7

                text-slate-500

              "

                        >

                            در صورت اضافه شدن مجوز یا تأییدیه جدید،

                            اطلاعات آن در همین بخش قرار می‌گیرد.

                        </p>

                    </div>

                </div>

            </section>


            {/* =========================================
                نمونه مدارک ارائه‌شده
            ========================================== */}

            <CertificatesShowcase />

        </main>

    );

}