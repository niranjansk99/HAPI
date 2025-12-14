import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface Screen18YesProps {
    onNext: () => void;
    onBack: () => void;
}

export function Screen18Yes({ onNext, onBack }: Screen18YesProps) {
    const bullets = useMemo(
        () => [
            "As you were answering, one thing became very clear.",
            "You seem to feel most at peace when there’s space. When no one is rushing you.\nWhen nothing is expected from you.",
            "And that’s actually something really beautiful.",
            "It often means you’re someone who listens deeply.",
            "Someone who feels a lot.",
            "Someone who gives more when things feel honest and calm.",
            "There’s nothing wrong with needing space.",
            "For many people, that’s exactly where they feel most like themselves.",
            "This doesn’t mean you’re lost.",
            "It usually means you’re in a moment where you’re becoming more aware of what truly matters to you.",
        ],
        []
    );

    const [index, setIndex] = useState(0);

    // Optional: auto-advance every 2.5s (remove if you want only tap-to-advance)
    useEffect(() => {
        if (index >= bullets.length - 1) return;
        const t = setTimeout(() => setIndex((i) => i + 1), 2500);
        return () => clearTimeout(t);
    }, [index, bullets.length]);

    const isLast = index >= bullets.length - 1;

    const nextBullet = () => {
        if (!isLast) setIndex((i) => i + 1);
    };

    return (
        <div className="min-h-screen flex flex-col px-6 py-12">
            {/* Back */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onBack}
                className="self-start mb-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
                aria-label="Go back"
            >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
            </motion.button>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-center mb-8"
            >
                <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="text-5xl mb-4"
                >
                    🌿
                </motion.div>
                <h1 className="mb-2">Something I noticed</h1>
                <p className="text-gray-600">Tap to continue</p>
            </motion.div>

            {/* Card */}
            <div className="flex-1 max-w-md mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="bg-white rounded-3xl p-6 shadow-lg mb-6"
                >
                    <button
                        onClick={nextBullet}
                        className="w-full text-left"
                        aria-label="Next message"
                    >
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.35 }}
                                className="text-gray-800 text-lg leading-relaxed whitespace-pre-line"
                            >
                                {bullets[index]}
                            </motion.p>
                        </AnimatePresence>
                    </button>

                    {/* Progress dots */}
                    <div className="mt-6 flex justify-center gap-2">
                        {bullets.map((_, i) => (
                            <div
                                key={i}
                                className={[
                                    "h-1.5 rounded-full transition-all",
                                    i === index ? "w-8 bg-green-500" : "w-3 bg-gray-200",
                                ].join(" ")}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Continue (only enabled at end) */}
                <motion.button
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    whileHover={isLast ? { scale: 1.05 } : {}}
                    whileTap={isLast ? { scale: 0.95 } : {}}
                    onClick={onNext}
                    disabled={!isLast}
                    className={[
                        "w-full px-8 py-5 rounded-full shadow-lg flex items-center justify-center gap-3",
                        isLast
                            ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed",
                    ].join(" ")}
                >
                    Continue
                    <ArrowRight className="w-6 h-6" />
                </motion.button>
            </div>
        </div>
    );
}
