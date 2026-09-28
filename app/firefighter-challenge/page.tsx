"use client";

import { useEffect, useMemo, useState } from "react";

type FireNode =
    | "جامدات"
    | "مایعات"
    | "برق"
    | "فلزات"
    | "روغن"
    | "آب"
    | "فوم"
    | "CO₂"
    | "M28"
    | "L2"
    | "Wet Chemical";

type Card = {
    id: string;
    top: FireNode;
    bottom: FireNode;
};

type OrientedCard = Card & {
    left: FireNode;
    right: FireNode;
    open: FireNode;
};

const RELATIONS: Record<FireNode, FireNode[]> = {
    جامدات: ["آب", "فوم"],
    مایعات: ["فوم"],
    برق: ["CO₂"],
    فلزات: ["M28", "L2"],
    روغن: ["Wet Chemical"],
    آب: ["جامدات"],
    فوم: ["جامدات", "مایعات"],
    CO₂: ["برق"],
    M28: ["فلزات"],
    L2: ["فلزات"],
    "Wet Chemical": ["روغن"],
};

const DECK_SOURCE: [FireNode, FireNode][] = [
    ["جامدات", "آب"],
    ["جامدات", "فوم"],
    ["مایعات", "فوم"],
    ["برق", "CO₂"],
    ["فلزات", "M28"],
    ["فلزات", "L2"],
    ["روغن", "Wet Chemical"],

    ["آب", "جامدات"],
    ["فوم", "مایعات"],
    ["CO₂", "برق"],
    ["M28", "فلزات"],
    ["L2", "فلزات"],
    ["Wet Chemical", "روغن"],

    ["جامدات", "CO₂"],
    ["مایعات", "آب"],
    ["برق", "فوم"],
    ["فلزات", "CO₂"],
    ["روغن", "آب"],

    ["جامدات", "M28"],
    ["مایعات", "CO₂"],
    ["برق", "L2"],
    ["فلزات", "فوم"],
    ["روغن", "M28"],

    ["جامدات", "Wet Chemical"],
    ["مایعات", "L2"],
    ["برق", "آب"],
    ["فلزات", "Wet Chemical"],
    ["روغن", "فوم"],

    ["آب", "مایعات"],
    ["فوم", "جامدات"],
    ["CO₂", "فلزات"],
    ["M28", "برق"],
    ["L2", "جامدات"],
    ["Wet Chemical", "مایعات"],
];

const VISUALS: Record<
    FireNode,
    {
        icon: string;
        title: string;
        tone: string;
        border: string;
        chip: string;
    }
> = {
    جامدات: {
        icon: "📦",
        title: "حریق جامدات",
        tone: "from-orange-100 to-amber-50",
        border: "border-orange-300/70",
        chip: "bg-orange-500 text-white",
    },
    مایعات: {
        icon: "🛢️",
        title: "حریق مایعات",
        tone: "from-rose-100 to-pink-50",
        border: "border-rose-300/70",
        chip: "bg-rose-500 text-white",
    },
    برق: {
        icon: "⚡",
        title: "حریق الکتریکی",
        tone: "from-yellow-100 to-amber-50",
        border: "border-yellow-300/70",
        chip: "bg-yellow-500 text-slate-900",
    },
    فلزات: {
        icon: "⚙️",
        title: "حریق فلزات",
        tone: "from-slate-200 to-slate-50",
        border: "border-slate-300/80",
        chip: "bg-slate-700 text-white",
    },
    روغن: {
        icon: "🍳",
        title: "روغن و چربی",
        tone: "from-amber-100 to-yellow-50",
        border: "border-amber-300/70",
        chip: "bg-amber-500 text-slate-900",
    },
    آب: {
        icon: "💧",
        title: "خاموش‌کننده آب",
        tone: "from-sky-100 to-cyan-50",
        border: "border-sky-300/70",
        chip: "bg-sky-500 text-white",
    },
    فوم: {
        icon: "🫧",
        title: "خاموش‌کننده فوم",
        tone: "from-lime-100 to-emerald-50",
        border: "border-lime-300/70",
        chip: "bg-emerald-500 text-white",
    },
    CO₂: {
        icon: "🧯",
        title: "خاموش‌کننده CO₂",
        tone: "from-zinc-200 to-zinc-50",
        border: "border-zinc-400/70",
        chip: "bg-zinc-800 text-white",
    },
    M28: {
        icon: "🪨",
        title: "خاموش‌کننده M28",
        tone: "from-indigo-100 to-violet-50",
        border: "border-indigo-300/70",
        chip: "bg-indigo-600 text-white",
    },
    L2: {
        icon: "🧪",
        title: "خاموش‌کننده L2",
        tone: "from-fuchsia-100 to-pink-50",
        border: "border-fuchsia-300/70",
        chip: "bg-fuchsia-600 text-white",
    },
"Wet Chemical": {
    icon: "🥼",
        title: "خاموش‌کننده Wet Chemical",
            tone: "from-teal-100 to-cyan-50",
                border: "border-teal-300/70",
                    chip: "bg-teal-600 text-white",
  },
};

function shuffle<T>(array: T[]) {
    const cloned = [...array];
    for (let i = cloned.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
    }
    return cloned;
}

function makeDeck(): Card[] {
    return shuffle(
        DECK_SOURCE.map((item, index) => ({
            id: `card-${index}`,
            top: item[0],
            bottom: item[1],
        }))
    );
}

function isRelated(a: FireNode, b: FireNode) {
    return RELATIONS[a]?.includes(b) ?? false;
}

function cardPlayable(open: FireNode | null, card: Card) {
    if (!open) return true;
    return isRelated(open, card.top) || isRelated(open, card.bottom);
}

function orientCard(open: FireNode | null, card: Card): OrientedCard | null {
    if (!open) {
        return {
            ...card,
            left: card.top,
            right: card.bottom,
            open: card.bottom,
        };
    }

    if (isRelated(open, card.top)) {
        return {
            ...card,
            left: card.top,
            right: card.bottom,
            open: card.bottom,
        };
    }

    if (isRelated(open, card.bottom)) {
        return {
            ...card,
            left: card.bottom,
            right: card.top,
            open: card.top,
        };
    }

    return null;
}

function getDiscount(score: number) {
    if (score >= 91) return 20;
    if (score >= 71) return 15;
    if (score >= 41) return 10;
    return 5;
}

function getRank(score: number) {
    if (score >= 91) return "Fire Master";
    if (score >= 71) return "Fire Pro";
    if (score >= 41) return "Fire Ready";
    return "Fire Rookie";
}

function MiniNode({
    value,
    compact = false,
}: {
    value: FireNode;
    compact?: boolean;
}) {
    const item = VISUALS[value];

    return (
        <div
            className={[
                "flex h-full w-full flex-col items-center justify-center rounded-[18px] border bg-gradient-to-br px-2 text-center",
                item.tone,
                item.border,
                compact ? "py-2" : "py-3",
            ].join(" ")}
        >
            <div className={compact ? "text-xl" : "text-2xl"}>{item.icon}</div>

            <div
                className={[
                    "mt-1 rounded-full px-2 py-1 font-black",
                    item.chip,
                    compact ? "text-[9px]" : "text-[10px]",
                ].join(" ")}
            >
                {value}
            </div>

            {!compact && (
                <div className="mt-1 line-clamp-2 text-[10px] font-bold leading-4 text-slate-700">
                    {item.title}
                </div>
            )}
        </div>
    );
}

function DominoCard({
    top,
    bottom,
    selected,
    hint,
    disabled,
    onClick,
    compact = false,
}: {
    top: FireNode;
    bottom: FireNode;
    selected?: boolean;
    hint?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    compact?: boolean;
}) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={[
                "group relative overflow-hidden rounded-[24px] border bg-white shadow-sm transition duration-200",
                compact ? "w-[110px]" : "w-full",
                disabled ? "cursor-not-allowed opacity-70" : "hover:-translate-y-1",
                selected
                    ? "border-orange-400 shadow-[0_0_0_3px_rgba(251,146,60,0.18)]"
                    : "border-slate-200",
                hint ? "ring-4 ring-cyan-300/50" : "",
            ].join(" ")}
        >
            <div className="absolute right-2 top-2 z-10 rounded-full bg-white/90 px-2 py-1 text-[9px] font-black text-slate-500 shadow-sm">
                دومینو
            </div>

            <div className="grid grid-rows-2">
                <div className="p-2">
                    <MiniNode value={top} compact={compact} />
                </div>

                <div className="relative">
                    <div className="absolute inset-x-4 top-0 z-10 border-t-2 border-dashed border-slate-300" />
                    <div className="p-2 pt-3">
                        <MiniNode value={bottom} compact={compact} />
                    </div>
                </div>
            </div>
        </button>
    );
}

function GuidePanel() {
    return (
        <div className="rounded-[28px] border border-cyan-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.05)] sm:p-6">
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-2xl">
                    📘
                </div>
                <div>
                    <div className="text-[11px] font-black tracking-[0.12em] text-cyan-600">
                        GAME GUIDE
                    </div>
                    <h3 className="mt-1 text-xl font-black text-slate-900">
                        راهنمای بازی خیلی مهمه
                    </h3>
                </div>
            </div>

            <div className="mt-5 space-y-3">
                {[
                    "هدف بازی اینه که کارت‌های دستت رو زودتر از سیستم تموم کنی.",
                    "هر کارت دو بخش داره و فقط وقتی می‌تونه به زنجیره وصل بشه که ارتباط ایمنی درست داشته باشه.",
                    "اگر اتصال درست بزنی، ۱۵ امتیاز می‌گیری.",
                    "اگر اتصال اشتباه بزنی، ۱۰ امتیاز کم می‌شه و یک کارت جریمه می‌گیری.",
                    "اگر کارت مناسب نداری، روی «کارت ندارم — بکش» بزن.",
                    "اگر شک داشتی، دکمه «راهنمای اتصال» رو بزن؛ یک کارت معتبر بهت نشون می‌ده اما ۵ امتیاز ازت کم می‌شه.",
                ].map((item, index) => (
                    <div
                        key={item}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700"
                    >
                        <span className="ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-black text-white">
                            {index + 1}
                        </span>
                        {item}
                    </div>
                ))}
            </div>

            <div className="mt-5 rounded-2xl border border-orange-200 bg-orange-50 p-4">
                <div className="text-sm font-black text-orange-700">
                    نمونه Matchهای درست:
                </div>
                <div className="mt-3 grid gap-2 text-sm text-slate-700">
                    <div>حریق جامدات ↔ آب / فوم</div>
                    <div>حریق مایعات ↔ فوم</div>
                    <div>حریق برق ↔ CO₂</div>
                    <div>حریق فلزات ↔ M28 / L2</div>
                    <div>روغن و چربی ↔ Wet Chemical</div>
                </div>
            </div>
        </div>
    );
}

export default function FirefighterChallengePage() {
    const [deck, setDeck] = useState<Card[]>([]);
    const [playerHand, setPlayerHand] = useState<Card[]>([]);
    const [botHand, setBotHand] = useState<Card[]>([]);
    const [chain, setChain] = useState<OrientedCard[]>([]);
    const [turn, setTurn] = useState<"player" | "bot">("player");
    const [status, setStatus] = useState("نوبت شماست؛ یک کارت مناسب انتخاب کن.");
    const [score, setScore] = useState(50);
    const [gameOver, setGameOver] = useState(false);
    const [hintIndex, setHintIndex] = useState<number | null>(null);
    const [showFullGuide, setShowFullGuide] = useState(false);

    const openNode = useMemo(() => {
        if (!chain.length) return null;
        return chain[chain.length - 1].open;
    }, [chain]);

    const resetGame = () => {
        const fullDeck = makeDeck();
        const nextPlayer: Card[] = [];
        const nextBot: Card[] = [];

        for (let i = 0; i < 8; i += 1) {
            const playerCard = fullDeck.pop();
            const botCard = fullDeck.pop();

            if (playerCard) nextPlayer.push(playerCard);
            if (botCard) nextBot.push(botCard);
        }

        const first = fullDeck.pop();

        setDeck(fullDeck);
        setPlayerHand(nextPlayer);
        setBotHand(nextBot);
        setScore(50);
        setTurn("player");
        setGameOver(false);
        setHintIndex(null);
        setStatus("نوبت شماست؛ یک کارت مناسب انتخاب کن.");

        if (first) {
            setChain([
                {
                    ...first,
                    left: first.top,
                    right: first.bottom,
                    open: first.bottom,
                },
            ]);
        } else {
            setChain([]);
        }
    };

    useEffect(() => {
        resetGame();
    }, []);

    const finishGame = (playerWon: boolean, finalPlayer = playerHand, finalBot = botHand) => {
        let finalScore = score;
        if (playerWon) finalScore += 25;
        if (finalScore > 100) finalScore = 100;
        if (finalScore < 0) finalScore = 0;

        setScore(finalScore);
        setGameOver(true);

        const discount = getDiscount(finalScore);
        const rank = getRank(finalScore);

        if (playerWon) {
            setStatus(
                `🏆 شما برنده شدی! رتبه: ${rank} | امتیاز نهایی: ${finalScore} | جایزه پیشنهادی: ${discount}% تخفیف`
            );
        } else {
            setStatus(
                `🤖 سیستم این دست را برد. رتبه شما: ${rank} | امتیاز نهایی: ${finalScore} | جایزه پیشنهادی: ${discount}% تخفیف`
            );
        }

        if (!playerWon && finalPlayer.length === 0) {
            setStatus(
                `🏆 شما برنده شدی! رتبه: ${rank} | امتیاز نهایی: ${finalScore} | جایزه پیشنهادی: ${discount}% تخفیف`
            );
        }

        if (playerWon && finalBot.length === 0 && finalPlayer.length > 0) {
            setStatus(
                `🤖 سیستم این دست را برد. رتبه شما: ${rank} | امتیاز نهایی: ${finalScore} | جایزه پیشنهادی: ${discount}% تخفیف`
            );
        }
    };

    const checkEnd = (nextPlayerHand: Card[], nextBotHand: Card[], nextDeck: Card[]) => {
        if (nextPlayerHand.length === 0) {
            finishGame(true, nextPlayerHand, nextBotHand);
            return true;
        }

        if (nextBotHand.length === 0) {
            finishGame(false, nextPlayerHand, nextBotHand);
            return true;
        }

        const playerHasMove = nextPlayerHand.some((card) => cardPlayable(openNode, card));
        const botHasMove = nextBotHand.some((card) => cardPlayable(openNode, card));

        if (nextDeck.length === 0 && !playerHasMove && !botHasMove) {
            finishGame(nextPlayerHand.length < nextBotHand.length, nextPlayerHand, nextBotHand);
            return true;
        }

        return false;
    };

    const playPlayerCard = (index: number) => {
        if (gameOver || turn !== "player") return;

        const selected = playerHand[index];
        const oriented = orientCard(openNode, selected);

        if (!oriented) {
            const nextDeck = [...deck];
            const penaltyCard = nextDeck.pop();

            const nextPlayerHand = [...playerHand];
            if (penaltyCard) nextPlayerHand.push(penaltyCard);

            setDeck(nextDeck);
            setPlayerHand(nextPlayerHand);
            setScore((prev) => Math.max(0, prev - 10));
            setHintIndex(null);
            setStatus("❌ اتصال اشتباه بود؛ ۱۰ امتیاز کم شد و یک کارت جریمه گرفتی.");
            return;
        }

        const nextPlayerHand = playerHand.filter((_, i) => i !== index);
        const nextChain = [...chain, oriented];

        setPlayerHand(nextPlayerHand);
        setChain(nextChain);
        setHintIndex(null);
        setScore((prev) => Math.min(100, prev + 15));
        setStatus("✅ اتصال درست! ۱۵ امتیاز گرفتی.");

        const justPlayedOpen = oriented.open;

        const playerHasMove = nextPlayerHand.some((card) => cardPlayable(justPlayedOpen, card));
        const botHasMove = botHand.some((card) => cardPlayable(justPlayedOpen, card));

        if (nextPlayerHand.length === 0) {
            finishGame(true, nextPlayerHand, botHand);
            return;
        }

        if (deck.length === 0 && !playerHasMove && !botHasMove) {
            finishGame(nextPlayerHand.length < botHand.length, nextPlayerHand, botHand);
            return;
        }

        setTurn("bot");
    };

    useEffect(() => {
        if (turn !== "bot" || gameOver) return;

        const timer = setTimeout(() => {
            const currentOpen = chain.length ? chain[chain.length - 1].open : null;
            const nextBotHand = [...botHand];
            const nextDeck = [...deck];

            const playableIndex = nextBotHand.findIndex((card) =>
                cardPlayable(currentOpen, card)
            );

            if (playableIndex >= 0) {
                const selected = nextBotHand[playableIndex];
                const oriented = orientCard(currentOpen, selected);

                if (oriented) {
                    nextBotHand.splice(playableIndex, 1);
                    const nextChain = [...chain, oriented];

                    setBotHand(nextBotHand);
                    setChain(nextChain);
                    setStatus("🤖 سیستم یک کارت معتبر بازی کرد. حالا نوبت شماست.");

                    const playerHasMove = playerHand.some((card) =>
                        cardPlayable(oriented.open, card)
                    );
                    const botHasMove = nextBotHand.some((card) =>
                        cardPlayable(oriented.open, card)
                    );

                    if (nextBotHand.length === 0) {
                        finishGame(false, playerHand, nextBotHand);
                        return;
                    }

                    if (nextDeck.length === 0 && !playerHasMove && !botHasMove) {
                        finishGame(playerHand.length < nextBotHand.length, playerHand, nextBotHand);
                        return;
                    }

                    setTurn("player");
                    return;
                }
            }

            const draw = nextDeck.pop();
            if (draw) {
                nextBotHand.push(draw);
                setDeck(nextDeck);
                setBotHand(nextBotHand);
                setStatus("🤖 سیستم کارت مناسب نداشت و یک کارت کشید. نوبت شماست.");
            } else {
                setStatus("🤖 سیستم کارت مناسب نداشت و دسته هم تمام شده. نوبت شماست.");
            }

            checkEnd(playerHand, nextBotHand, nextDeck);
            setTurn("player");
        }, 800);

        return () => clearTimeout(timer);
    }, [turn, gameOver, botHand, chain, deck, playerHand, openNode, score]);

    const handleDraw = () => {
        if (gameOver || turn !== "player") return;

        const hasMove = playerHand.some((card) => cardPlayable(openNode, card));
        if (hasMove) {
            setStatus("هنوز کارت قابل بازی داری؛ اول کارت‌هات رو چک کن.");
            return;
        }

        const nextDeck = [...deck];
        const drawn = nextDeck.pop();

        if (!drawn) {
            setStatus("دسته کارت تمام شده.");
            return;
        }

        setDeck(nextDeck);
        setPlayerHand((prev) => [...prev, drawn]);
        setScore((prev) => Math.max(0, prev - 2));
        setStatus("یک کارت کشیدی. ۲ امتیاز هزینه کارت‌کشی بود.");
        setTurn("bot");
    };

    const handleHint = () => {
        if (gameOver || turn !== "player") return;

        const playableIndex = playerHand.findIndex((card) => cardPlayable(openNode, card));
        setScore((prev) => Math.max(0, prev - 5));
        setHintIndex(playableIndex >= 0 ? playableIndex : null);

        if (playableIndex >= 0) {
            setStatus("💡 یک کارت معتبر برات مشخص شد. ۵ امتیاز کم شد.");
        } else {
            setStatus("💡 کارت معتبری نداشتی؛ باید کارت بکشی. ۵ امتیاز کم شد.");
        }

        setTimeout(() => {
            setHintIndex(null);
        }, 2500);
    };

    return (
        <main
            dir="rtl"
            className="min-h-screen bg-[linear-gradient(180deg,#071a2e_0%,#0b2239_40%,#eef6fb_40%,#f7fbfd_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8"
        >
            <div className="mx-auto max-w-[1450px]">
                <div className="rounded-[36px] border border-white/10 bg-[#0B2239] px-5 py-7 text-white shadow-[0_30px_120px_rgba(0,0,0,0.22)] sm:px-7 sm:py-8 lg:px-10">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-300/10 px-3 py-2 text-[10px] font-black tracking-[0.12em] text-orange-200">
                                <span className="h-2 w-2 rounded-full bg-orange-400" />
                                MATCH OR LOSE – FIREFIGHTER EDITION
                            </div>

                            <h1 className="mt-4 text-[28px] font-black leading-[1.5] sm:text-[42px]">
                                انتخاب قهرمان
                            </h1>

                            <p className="mt-3 max-w-3xl text-sm leading-8 text-slate-300 sm:text-base">
                                نسخه تعاملی بازی آموزشی ایمنی حریق؛ کارت‌های دومینویی را درست به هم
                                وصل کن، با سیستم رقابت کن و بر اساس امتیازت برای تخفیف آداکس آماده شو.
                            </p>
                        </div>

                        <div className="grid min-w-[260px] grid-cols-2 gap-2 sm:grid-cols-4">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                                <div className="text-[11px] text-slate-400">کارت شما</div>
                                <div className="mt-1 text-xl font-black">{playerHand.length}</div>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                                <div className="text-[11px] text-slate-400">کارت سیستم</div>
                                <div className="mt-1 text-xl font-black">{botHand.length}</div>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                                <div className="text-[11px] text-slate-400">امتیاز</div>
                                <div className="mt-1 text-xl font-black">{score}</div>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                                <div className="text-[11px] text-slate-400">جایزه فعلی</div>
                                <div className="mt-1 text-xl font-black">{getDiscount(score)}٪</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black text-cyan-100">
                            {turn === "player" ? "نوبت شما" : "نوبت سیستم"}
                        </span>

                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black text-white">
                            رتبه فعلی: {getRank(score)}
                        </span>

                        {openNode && (
                            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black text-white">
                                سر باز زنجیره: {openNode}
                            </span>
                        )}
                    </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
                    <section className="space-y-6">
                        <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-6">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <div className="text-xs font-black tracking-[0.12em] text-slate-400">
                                        CHAIN BOARD
                                    </div>
                                    <h2 className="mt-1 text-xl font-black text-slate-900">
                                        زنجیره بازی
                                    </h2>
                                </div>

                                <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-black text-slate-600">
                                    دسته باقی‌مانده: {deck.length}
                                </div>
                            </div>

                            <div className="mt-5 overflow-x-auto">
                                <div className="flex min-h-[180px] items-center gap-3 rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                                    {chain.map((card) => (
                                        <div key={`${card.id}-${card.left}-${card.right}`} className="shrink-0">
                                            <DominoCard
                                                top={card.left}
                                                bottom={card.right}
                                                compact
                                                disabled
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-4 rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-bold text-cyan-800">
                                {status}
                            </div>

                            <div className="mt-5 flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={handleDraw}
                                    disabled={gameOver || turn !== "player"}
                                    className="min-h-[48px] rounded-full border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    کارت ندارم — بکش
                                </button>

                                <button
                                    type="button"
                                    onClick={handleHint}
                                    disabled={gameOver || turn !== "player"}
                                    className="min-h-[48px] rounded-full bg-orange-400 px-5 text-sm font-black text-slate-900 transition hover:bg-orange-300 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    راهنمای اتصال
                                </button>

                                <button
                                    type="button"
                                    onClick={resetGame}
                                    className="min-h-[48px] rounded-full border border-slate-200 bg-slate-900 px-5 text-sm font-black text-white transition hover:bg-slate-800"
                                >
                                    شروع دوباره
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setShowFullGuide((prev) => !prev)}
                                    className="min-h-[48px] rounded-full border border-cyan-200 bg-cyan-50 px-5 text-sm font-black text-cyan-800 transition hover:bg-cyan-100"
                                >
                                    {showFullGuide ? "بستن راهنمای کامل" : "نمایش راهنمای کامل"}
                                </button>
                            </div>
                        </div>

                        <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-6">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <div className="text-xs font-black tracking-[0.12em] text-slate-400">
                                        YOUR HAND
                                    </div>
                                    <h2 className="mt-1 text-xl font-black text-slate-900">
                                        کارت‌های شما
                                    </h2>
                                </div>

                                <div className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-black text-orange-700">
                                    روی کارت بزن تا بازی شود
                                </div>
                            </div>

                            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                {playerHand.map((card, index) => (
                                    <DominoCard
                                        key={`${card.id}-${index}`}
                                        top={card.top}
                                        bottom={card.bottom}
                                        onClick={() => playPlayerCard(index)}
                                        selected={false}
                                        hint={hintIndex === index}
                                        disabled={gameOver || turn !== "player"}
                                    />
                                ))}
                            </div>
                        </div>

                        {showFullGuide && <GuidePanel />}
                    </section>

                    <aside className="space-y-6">
                        <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
                                    🎁
                                </div>
                                <div>
                                    <div className="text-xs font-black tracking-[0.12em] text-slate-400">
                                        CAMPAIGN REWARD
                                    </div>
                                    <h3 className="mt-1 text-xl font-black text-slate-900">
                                        امتیاز = تخفیف
                                    </h3>
                                </div>
                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-3">
                                {[
                                    ["۰ تا ۴۰", "۵٪ تخفیف"],
                                    ["۴۱ تا ۷۰", "۱۰٪ تخفیف"],
                                    ["۷۱ تا ۹۰", "۱۵٪ تخفیف"],
                                    ["۹۱ تا ۱۰۰", "۲۰٪ تخفیف"],
                                ].map(([range, value]) => (
                                    <div
                                        key={range}
                                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center"
                                    >
                                        <div className="text-xs font-black text-slate-500">{range}</div>
                                        <div className="mt-2 text-sm font-black text-slate-900">{value}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-7 text-emerald-800">
                                امتیاز فعلی شما <strong>{score}</strong> است و در حال حاضر واجد{" "}
                                <strong>{getDiscount(score)}٪ تخفیف</strong> هستی.
                            </div>
                        </div>

                        <GuidePanel />
                    </aside>
                </div>
            </div>
        </main>
    );
}