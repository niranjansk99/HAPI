import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";

interface TooMuchScreenProps {
    onNext: () => void;
    onBack: () => void;
    userData: any;
    updateUserData: (key: string, value: any) => void;
}

type TooMuchChoice = "yes_definitely" | "a_bit" | "not_really";

const CHOICES: {
    id: TooMuchChoice;
    label: string;
    emoji: string;
    gradient: string; // tailwind gradient classes
    description: string;
}[] = [
        {
            id: "yes_definitely",
            label: "Yes, definitely",
            emoji: "😮‍💨",
            gradient: "from-rose-400 to-red-500",
            description: "It felt heavy today",
        },
        {
            id: "a_bit",
            label: "A bit",
            emoji: "😵‍💫",
            gradient: "from-amber-400 to-orange-500",
            description: "Some moments were intense",
        },
        {
            id: "not_really",
            label: "Not really",
            emoji: "🙂",
            gradient: "from-emerald-400 to-teal-500",
            description: "It was manageable",
        },
    ];

export function TooMuchScreen({
    onNext,
    onBack,
    userData,
    updateUserData,
}: TooMuchScreenProps) {
    const initial =
        (userData?.tooMuchToday as TooMuchChoice | undefined) ?? "a_bit";
    const [selected, setSelected] = useState<TooMuchChoice>(initial);

    const selectedChoice = CHOICES.find((c) => c.id === selected)!;

    const handleContinue = () => {
        updateUserData("tooMuchToday", selected);
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
                    {selectedChoice.emoji}
                </motion.div>

                <h1 className="mb-3">Did today feel like too much?</h1>
                <p className="text-gray-600">Choose the option that fits best</p>
            </motion.div>

            {/* Content */}
            <div className="flex-1 max-w-md mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-3xl p-6 shadow-lg mb-6"
                >
                    <div className="space-y-3">
                        {CHOICES.map((choice, index) => {
                            const isSelected = selected === choice.id;

                            return (
                                <motion.button
                                    key={choice.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.08 * index }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelected(choice.id)}
                                    className={[
                                        "w-full p-4 rounded-2xl transition-all flex items-center justify-between",
                                        isSelected
                                            ? `bg-gradient-to-r ${choice.gradient} text-white shadow-md`
                                            : "bg-gray-50 text-gray-700 hover:bg-gray-100",
                                    ].join(" ")}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{choice.emoji}</span>
                                        <div className="text-left">
                                            <div className="font-medium">{choice.label}</div>
                                            <div
                                                className={
                                                    isSelected ? "text-white/85 text-sm" : "text-gray-500 text-sm"
                                                }
                                            >
                                                {choice.description}
                                            </div>
                                        </div>
                                    </div>

                                    {/* selection dot */}
                                    <motion.div
                                        animate={{
                                            scale: isSelected ? 1 : 0.9,
                                            opacity: isSelected ? 1 : 0.7,
                                        }}
                                        className={[
                                            "w-6 h-6 rounded-full border flex items-center justify-center",
                                            isSelected ? "border-white/70" : "border-gray-300",
                                        ].join(" ")}
                                    >
                                        <div
                                            className={[
                                                "w-3 h-3 rounded-full",
                                                isSelected ? "bg-white" : "bg-transparent",
                                            ].join(" ")}
                                        />
                                    </motion.div>
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleContinue}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-5 rounded-full shadow-lg flex items-center justify-center gap-3"
                >
                    Continue
                    <ArrowRight className="w-6 h-6" />
                </motion.button>
            </div>
        </div>
    );
}