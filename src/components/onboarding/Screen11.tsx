import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";

interface Screen11Props {
    onNext: () => void;
    onBack: () => void;
    userData: any;
    updateUserData: (key: string, value: any) => void;
}

const OPTIONS = [
    "Kindness",
    "Gratitude",
    "Freedom",
    "Creativity",
    "Stability",
    "Connection",
    "I’m not sure",
];

function pickEmoji(choice?: string) {
    if (!choice) return "✨";
    if (choice === "Kindness") return "🤝";
    if (choice === "Gratitude") return "🙏";
    if (choice === "Freedom") return "🕊️";
    if (choice === "Creativity") return "🎨";
    if (choice === "Stability") return "🏡";
    if (choice === "Connection") return "🫂";
    return "🤷";
}

export function Screen11({ onNext, onBack, userData, updateUserData }: Screen11Props) {
    // ✅ Use a Screen11-specific key so Screen9 isn't overwritten
    const KEY = "worldValue";

    const initial = typeof userData?.[KEY] === "string" ? userData[KEY] : "";
    const [selected, setSelected] = useState<string>(initial);

    const emoji = useMemo(() => pickEmoji(selected), [selected]);
    const canContinue = selected.trim().length > 0;

    const handleContinue = () => {
        updateUserData(KEY, selected);
        onNext();
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
            >
                <motion.div
                    key={emoji}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.22 }}
                    className="text-5xl mb-4"
                >
                    {emoji}
                </motion.div>

                <h1 className="mb-3">If one thing mattered more in the world, what should it be?</h1>
                <p className="text-gray-600">Pick the option that fits best — there’s no wrong answer.</p>
            </motion.div>

            {/* Content */}
            <div className="flex-1 max-w-md mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-3xl p-6 shadow-lg mb-6"
                >
                    <div className="grid gap-3">
                        {OPTIONS.map((option, idx) => {
                            const isActive = selected === option;

                            return (
                                <motion.button
                                    key={option}
                                    onClick={() => setSelected(option)}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.35 + idx * 0.05 }}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={[
                                        "w-full text-left rounded-2xl px-5 py-4 border transition shadow-sm",
                                        isActive
                                            ? "border-green-400 bg-green-50"
                                            : "border-gray-200 bg-white hover:bg-gray-50",
                                    ].join(" ")}
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-gray-800">{option}</span>

                                        {/* selection indicator */}
                                        <motion.span
                                            animate={{
                                                scale: isActive ? 1 : 0.9,
                                                opacity: isActive ? 1 : 0.45,
                                            }}
                                            transition={{ type: "spring", stiffness: 300, damping: 22 }}
                                            className={[
                                                "w-6 h-6 rounded-full border flex items-center justify-center",
                                                isActive ? "border-green-500" : "border-gray-300",
                                            ].join(" ")}
                                            aria-hidden="true"
                                        >
                                            <motion.span
                                                animate={{ scale: isActive ? 1 : 0 }}
                                                transition={{ type: "spring", stiffness: 420, damping: 26 }}
                                                className="w-3 h-3 rounded-full bg-green-500"
                                            />
                                        </motion.span>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Feedback row */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.55 }}
                        className="mt-5 flex items-center justify-between text-sm text-gray-600"
                    >
                        <span className="opacity-80">Selected</span>
                        <span className="font-semibold text-gray-800">{selected || "—"}</span>
                    </motion.div>
                </motion.div>

                {/* Continue */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={canContinue ? { scale: 1.05 } : {}}
                    whileTap={canContinue ? { scale: 0.95 } : {}}
                    onClick={handleContinue}
                    disabled={!canContinue}
                    className={[
                        "w-full px-8 py-5 rounded-full shadow-lg flex items-center justify-center gap-3",
                        canContinue
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
