"use client";

import Link from "next/link";

export default function ArabicButton({
    mobile = false,
}: {
    mobile?: boolean;
}) {
    if (mobile) {
        return (
            <Link
                href="/ar"
                dir="rtl"
                className="
          flex
          min-h-[46px]
          w-full
          items-center
          justify-center
          gap-2
          rounded-[16px]
          border
          border-cyan-300/20
          bg-cyan-300/[0.07]
          px-4
          text-sm
          font-black
          text-cyan-100
          transition
          active:scale-[0.98]
        "
            >
                <span className="text-[15px]">العربية</span>
                <span
                    dir="ltr"
                    className="
            rounded-full
            bg-cyan-300/10
            px-2
            py-0.5
            text-[9px]
            font-black
            text-cyan-200
          "
                >
                    AR
                </span>
            </Link>
        );
    }

    return (
        <Link
            href="/ar"
            dir="rtl"
            className="
        inline-flex
        min-h-[40px]
        shrink-0
        items-center
        justify-center
        gap-2
        rounded-full
        border
        border-cyan-300/20
        bg-cyan-300/[0.07]
        px-4
        text-[11px]
        font-black
        text-cyan-100
        transition
        hover:-translate-y-0.5
        hover:border-cyan-300/35
        hover:bg-cyan-300/[0.12]
      "
        >
            <span>العربية</span>
            <span
                dir="ltr"
                className="
          rounded-full
          bg-cyan-300/10
          px-1.5
          py-0.5
          text-[8px]
          text-cyan-200
        "
            >
                AR
            </span>
        </Link>
    );
}
