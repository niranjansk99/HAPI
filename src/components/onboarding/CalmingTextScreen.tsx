import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';

interface CalmingTextScreenProps {
    onNext: () => void;
    onBack?: () => void;
    videoSrc?: string;
    videoSources?: {
        mov: string;
        webm: string;
    };
    headline?: string;
    subtext: React.ReactNode;
    buttonText: string;
}

export function CalmingTextScreen({
    onNext,
    onBack,
    videoSrc,
    videoSources,
    headline,
    subtext,
    buttonText
}: CalmingTextScreenProps) {
    return (
        <div className="min-h-screen flex flex-col px-6 py-12 relative">
            {onBack && (
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onBack}
                    className="absolute top-12 left-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md z-10"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </motion.button>
            )}

            <div className="flex-1 flex flex-col items-center justify-center">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                        duration: 0.8
                    }}
                    className="mb-8"
                >
                    <div className="w-60 h-60">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full pointer-events-none"
                            {...(!videoSources ? { src: videoSrc } : {})}
                        >
                            {videoSources && (
                                <>
                                    <source src={videoSources.mov} type="video/quicktime" />
                                    <source src={videoSources.webm} type="video/webm" />
                                </>
                            )}
                        </video>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-12"
                >
                    {headline && (
                        <h1 className="mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                            {headline}
                        </h1>
                    )}
                    <div className="text-gray-600 text-lg max-w-sm mx-auto">
                        {subtext}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-6 mb-12 max-w-sm"
                >
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-12 py-5 rounded-full shadow-lg flex items-center gap-3 text-lg"
                >
                    {buttonText}
                    <ArrowRight className="w-6 h-6" />
                </motion.button>
            </div>
        </div>
    );
}
