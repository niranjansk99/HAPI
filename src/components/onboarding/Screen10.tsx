import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Screen10Props {
    onNext: () => void;
}

export function Screen10({ onNext }: Screen10Props) {
    return (
        <div className="min-h-screen flex flex-col px-6 py-12">
            {/* Spacer to center content vertically */}
            <div className="flex-1 flex flex-col items-center justify-center text-center">
                {/* Gentle animated icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-5xl mb-6"
                >
                    🌱
                </motion.div>

                {/* Text */}
                <motion.h1
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-4"
                >
                    You don’t need perfect answers. Patterns matter more than clarity
                </motion.h1>
            </div>

            {/* Continue */}
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="w-full max-w-md mx-auto bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-5 rounded-full shadow-lg flex items-center justify-center gap-3"
            >
                Continue
                <ArrowRight className="w-6 h-6" />
            </motion.button>
        </div>
    );
}
