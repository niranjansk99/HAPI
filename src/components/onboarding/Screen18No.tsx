import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

interface Screen18NoProps {
    onNext: () => void;
    onBack: () => void;
    userData: any;
    updateUserData: (key: string, value: any) => void;
}

const OPTIONS: Array<{ label: string; value: "helpful" | "unsure" | "practical" }> = [
    { label: "Yes, that sounds helpful", value: "helpful" },
    { label: "I’m not sure yet", value: "unsure" },
    { label: "I just want something practical", value: "practical" },
];

export function Screen18No({ onNext, onBack, userData, updateUserData }: Screen18NoProps) {
    const initial =
        userData?.screen18Preference === "helpful" ||
            userData?.screen18Preference === "unsure" ||
            userData?.screen18Preference === "practical"
            ? userData.screen18Preference
            : "";

    const [selected, setSelected] = useState<"" | "helpful" | "unsure" | "practical">(initial);

    const canContinue = selected !== "";

    const handleContinue = () => {
        if (!canContinue) return;
        updateUserData("screen18Preference", selected);
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
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="text-5xl mb-4"
                >
                    🧭
                </motion.div>

                <h1 className="mb-3">
                    I won’t tell you who you are.
                    <br />
                    But I can help you notice patterns — if you want.
                </h1>
                <p className="text-gray-600">What would you prefer?</p>
            </motion.div>

            {/* Card */}
            <div className="flex-1 max-w-md mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-3xl p-6 shadow-lg mb-6"
                >
                    <div className="grid gap-3">
                        {OPTIONS.map((opt, idx) => {
                            const active = selected === opt.value;
                            return (
                                <motion.button
                                    key={opt.value}
                                    onClick={() => setSelected(opt.value)}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.35 + idx * 0.06 }}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={[
                                        "w-full text-left rounded-2xl px-5 py-4 border transition shadow-sm",
                                        active ? "border-green-400 bg-green-50" : "border-gray-200 bg-white hover:bg-gray-50",
                                    ].join(" ")}
                                >
                                    <span className="text-gray-800">{opt.label}</span>
                                </motion.button>
                            );
                        })}
                    </div>
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