import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import React, { useMemo } from "react";

interface InputScreenProps {
    onNext: () => void;
    onBack: () => void;
    text: string;
    setText: (text: string) => void;
    placeholder?: string;
    maxLength?: number;
    headline: string;
    subline?: string;
    topIcon: React.ReactNode;
    allowSkip?: boolean;
    skipText?: string;
    onSkip?: (skip: boolean) => void;
    isSkipped?: boolean;
    buttonText?: string;
}

export function InputScreen({
    onNext,
    onBack,
    text,
    setText,
    placeholder = "Type here...",
    maxLength = 200,
    headline,
    subline,
    topIcon,
    allowSkip = false,
    skipText = "Nothing comes to mind",
    onSkip,
    isSkipped = false,
    buttonText = "Continue"
}: InputScreenProps) {

    const canContinue = useMemo(() => {
        if (allowSkip && isSkipped) return true;
        return text.trim().length > 0;
    }, [allowSkip, isSkipped, text]);

    const handleContinue = () => {
        onNext();
    };

    const handleToggleSkip = () => {
        if (onSkip) {
            const nextState = !isSkipped;
            onSkip(nextState);
            if (nextState) {
                setText("");
            }
        }
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
                    {topIcon}
                </motion.div>

                <h1 className="mb-3">{headline}</h1>
                {subline && <p className="text-gray-600">{subline}</p>}
            </motion.div>

            {/* Content */}
            <div className="flex-1 max-w-md mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-3xl p-6 shadow-lg mb-6"
                >
                    {/* Textfield */}
                    <AnimatePresence initial={false}>
                        {(!isSkipped) && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder={placeholder}
                                    className="w-full min-h-[120px] rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                                    maxLength={maxLength}
                                />
                                <div className="mt-2 text-xs text-gray-400 text-right">
                                    {text.trim().length}/{maxLength}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Skip Toggle */}
                    {allowSkip && onSkip && (
                        <>
                            {(!isSkipped) && <div className="my-5 h-px bg-gray-100" />}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleToggleSkip}
                                className={`w-full p-4 rounded-2xl transition-all flex items-center justify-between ${isSkipped
                                    ? "bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md"
                                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">🤍</span>
                                    <div className="text-left">
                                        <div className="font-medium">{skipText}</div>
                                        <div className={isSkipped ? "text-white/85 text-sm" : "text-gray-500 text-sm"}>
                                            That’s okay — we’ll keep it gentle.
                                        </div>
                                    </div>
                                </div>

                                {/* selection dot */}
                                <motion.div
                                    animate={{
                                        scale: isSkipped ? 1 : 0.9,
                                        opacity: isSkipped ? 1 : 0.7,
                                    }}
                                    className={[
                                        "w-6 h-6 rounded-full border flex items-center justify-center",
                                        isSkipped ? "border-white/70" : "border-gray-300",
                                    ].join(" ")}
                                >
                                    <div className={["w-3 h-3 rounded-full", isSkipped ? "bg-white" : "bg-transparent"].join(" ")} />
                                </motion.div>
                            </motion.button>
                        </>
                    )}
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
                    className={`w-full px-8 py-5 rounded-full shadow-lg flex items-center justify-center gap-3 transition-all ${canContinue
                        ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    {buttonText}
                    <ArrowRight className="w-6 h-6" />
                </motion.button>
            </div>
        </div>
    );
}
