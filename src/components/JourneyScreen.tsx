import { motion } from 'framer-motion';
import { Navigation } from './Navigation';
import { Map, CheckCircle2, Lock } from 'lucide-react';

interface JourneyScreenProps {
    onNavigate: (page: string) => void;
    userStats: any; // Using any for flexibility with stats structure
}

export function JourneyScreen({ onNavigate }: JourneyScreenProps) {
    const days = [
        { day: 1, status: 'active', label: 'Start Here' },
        { day: 2, status: 'locked', label: 'Day 2' },
        { day: 3, status: 'locked', label: 'Day 3' },
        { day: 4, status: 'locked', label: 'Day 4' },
        { day: 5, status: 'locked', label: 'Day 5' },
        { day: 6, status: 'locked', label: 'Day 6' },
        { day: 7, status: 'locked', label: 'Day 7' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 pb-24">
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
                                disabled={item.status === 'locked'}
                                className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all z-10 
                  ${item.status === 'active'
                                        ? 'bg-green-500 text-white scale-110 ring-4 ring-green-100'
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
