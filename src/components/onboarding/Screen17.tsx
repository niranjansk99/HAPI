import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

interface Screen17Props {
    onNext: () => void;
    onBack: () => void;
    userData: any;
    updateUserData: (key: string, value: any) => void;
}

export function Screen17({
    onNext,
    onBack,
    userData,
    updateUserData,
}: Screen17Props) {
    const initial =
        typeof userData?.shareObservationConsent === "boolean"
            ? userData.shareObservationConsent
            : null;

    const [answer, setAnswer] = useState<boolean | null>(initial);

    const handleContinue = () => {
        if (answer === null) return;
        updateUserData("shareObservationConsent", answer);
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
                className="text-center mb-10"
            >
                <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="text-5xl mb-4"
                >
                    💬
                </motion.div>

                <h1 className="mb-3">Can I share something I noticed about you?</h1>
                <p className="text-gray-600">
                    You’re always free to say no.
                </p>
            </motion.div>

            {/* Content */}
            <div className="flex-1 max-w-md mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-3xl p-6 shadow-lg mb-6"
                >
                    <div className="grid gap-4">
                        {[
                            { label: "Yes", value: true },
                            { label: "No", value: false },
                        ].map((opt, idx) => {
                            const isActive = answer === opt.value;

                            return (
                                <motion.button
                                    key={opt.label}
                                    onClick={() => setAnswer(opt.value)}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.35 + idx * 0.08 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    className={[
                                        "w-full rounded-2xl px-6 py-5 border transition shadow-sm text-center",
                                        isActive
                                            ? "border-green-400 bg-green-50"
                                            : "border-gray-200 bg-white hover:bg-gray-50",
                                    ].join(" ")}
                                >
                                    <span className="text-lg font-medium text-gray-800">
                                        {opt.label}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Feedback */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.55 }}
                        className="mt-5 text-sm text-gray-600 flex justify-between"
                    >
                        <span className="opacity-80">Selected</span>
                        <span className="font-semibold">
                            {answer === null ? "—" : answer ? "Yes" : "No"}
                        </span>
                    </motion.div>
                </motion.div>

                {/* Continue */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={answer !== null ? { scale: 1.05 } : {}}
                    whileTap={answer !== null ? { scale: 0.95 } : {}}
                    onClick={handleContinue}
                    disabled={answer === null}
                    className={[
                        "w-full px-8 py-5 rounded-full shadow-lg flex items-center justify-center gap-3",
                        answer !== null
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