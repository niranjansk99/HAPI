import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from './Navigation';
import { Map, CheckCircle2, Lock, X, PlayCircle } from 'lucide-react';

interface JourneyScreenProps {
    onNavigate: (page: string) => void;
    userStats: any; // Using any for flexibility with stats structure
}

export function JourneyScreen({ onNavigate }: JourneyScreenProps) {
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    const days = [
        { day: 1, status: 'active', label: '🌱 Day 1 – Check-in & reflection' },
        { day: 2, status: 'locked', label: '👣 Day 2 – One small real-world step' },
        { day: 3, status: 'locked', label: '🔄 Day 3 – Emotional check-in' },
        { day: 4, status: 'locked', label: '🧪 Day 4 – Mini experiment' },
        { day: 5, status: 'locked', label: '🪞 Day 5 – Reflection' },
        { day: 6, status: 'locked', label: '👀 Day 6 – Observation' },
        { day: 7, status: 'locked', label: '🧭 Day 7 – Summary & insight' },
    ];

    const handleDayClick = (day: number) => {
        if (day === 1) {
            setSelectedDay(1);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 pb-24 relative overflow-hidden">
            {/* Slide-in Day Detail */}
            <AnimatePresence>
                {selectedDay === 1 && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-white z-[60] overflow-y-auto"
                    >
                        <div className="p-6 min-h-screen flex flex-col">
                            <button
                                onClick={() => setSelectedDay(null)}
                                className="self-end w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-8 hover:bg-gray-200 transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-600" />
                            </button>

                            <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-center space-y-8"
                                >
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-4xl shadow-sm">
                                        🌱
                                    </div>

                                    <h2 className="text-2xl font-bold text-gray-800">
                                        Do this now.<br />It takes 2 minutes.
                                    </h2>

                                    <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-medium">
                                        <p>Sit down.</p>
                                        <p>Put both feet on the ground.</p>
                                        <p>Breathe in slowly.</p>
                                        <p>Breathe out slowly.</p>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setSelectedDay(null)}
                                        className="mt-12 bg-green-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-green-600 transition-colors flex items-center gap-2 mx-auto"
                                    >
                                        <PlayCircle className="w-5 h-5" />
                                        Start Exercise
                                    </motion.button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <header className="pt-12 px-6 mb-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block p-3 bg-white rounded-2xl shadow-md mb-4"
                >
                    <Map className="w-8 h-8 text-green-600" />
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl font-bold text-gray-800"
                >
                    Your Journey
                </motion.h1>
            </header>

            {/* Roadmap */}
            <div className="max-w-md mx-auto px-6 relative">
                {/* Connecting Line */}
                <div className="absolute left-[2.85rem] top-8 bottom-8 w-1 bg-gray-200 rounded-full" />

                <div className="space-y-8 relative">
                    {days.map((item, index) => (
                        <motion.div
                            key={item.day}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="flex items-center gap-6"
                        >
                            {/* Dot / Button */}
                            <button
                                onClick={() => handleDayClick(item.day)}
                                disabled={item.status === 'locked'}
                                className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all z-10 
                  ${item.status === 'active'
                                        ? 'bg-green-500 text-white scale-110 ring-4 ring-green-100 cursor-pointer'
                                        : item.status === 'completed'
                                            ? 'bg-green-600 text-white'
                                            : 'bg-white text-gray-300'
                                    }`}
                            >
                                {item.status === 'completed' ? (
                                    <CheckCircle2 className="w-6 h-6" />
                                ) : item.status === 'locked' ? (
                                    <span className="font-bold text-lg">{item.day}</span>
                                ) : (
                                    <span className="font-bold text-lg">{item.day}</span>
                                )}

                                {/* Visual pulse for active item */}
                                {item.status === 'active' && (
                                    <span className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-20" />
                                )}
                            </button>

                            {/* Text */}
                            <div className={`flex-1 p-4 rounded-xl transition-colors ${item.status === 'active' ? 'bg-white shadow-md border border-green-100' : ''
                                }`}>
                                <div className="flex items-center justify-between">
                                    <span className={`font-medium ${item.status === 'locked' ? 'text-gray-400' : 'text-gray-800'
                                        }`}>
                                        {item.label}
                                    </span>
                                    {item.status === 'locked' && (
                                        <Lock className="w-4 h-4 text-gray-300" />
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <Navigation currentPage="journey" onNavigate={onNavigate} />
        </div>
    );
}
