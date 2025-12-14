import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from './Navigation';
import { Map, CheckCircle2, Lock, X, PlayCircle, Moon, Sun } from 'lucide-react';

interface JourneyScreenProps {
    onNavigate: (page: string) => void;
    userStats: any; // Using any for flexibility with stats structure
}

export function JourneyScreen({ onNavigate }: JourneyScreenProps) {
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [timerStatus, setTimerStatus] = useState<'idle' | 'starting' | 'running' | 'finished'>('idle');
    const [countdown, setCountdown] = useState(5);
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
    const [focusMode, setFocusMode] = useState(false);

    const days = [
        { day: 1, status: 'active', label: '🌱 Day 1 – Check-in & reflection' },
        { day: 2, status: 'locked', label: '👣 Day 2 – One small real-world step' },
        { day: 3, status: 'locked', label: '🔄 Day 3 – Emotional check-in' },
        { day: 4, status: 'locked', label: '🧪 Day 4 – Mini experiment' },
        { day: 5, status: 'locked', label: '🪞 Day 5 – Reflection' },
        { day: 6, status: 'locked', label: '👀 Day 6 – Observation' },
        { day: 7, status: 'locked', label: '🧭 Day 7 – Summary & insight' },
    ];

    useEffect(() => {
        let interval: any;

        if (timerStatus === 'starting') {
            interval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        setTimerStatus('running');
                        return 5;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else if (timerStatus === 'running') {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 0) {
                        setTimerStatus('finished');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [timerStatus]);

    const handleDayClick = (day: number) => {
        if (day === 1) {
            setSelectedDay(1);
            // Reset states when opening
            setTimerStatus('idle');
            setCountdown(5);
            setTimeLeft(120);
            setFocusMode(false);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
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
                        className={`fixed inset-0 z-[60] overflow-y-auto transition-colors duration-700 ${focusMode ? 'bg-black' : 'bg-white'
                            }`}
                    >
                        <div className="p-6 min-h-screen flex flex-col">
                            <div className="flex justify-end items-center gap-4 mb-8">
                                {timerStatus === 'running' && (
                                    <button
                                        onClick={() => setFocusMode(!focusMode)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${focusMode ? 'bg-gray-800 text-yellow-300' : 'bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        {focusMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                    </button>
                                )}
                                <button
                                    onClick={() => setSelectedDay(null)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${focusMode ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-center space-y-8"
                                >
                                    {/* Icon / Timer Area */}
                                    <div className="relative h-32 flex items-center justify-center">
                                        <AnimatePresence mode="wait">
                                            {timerStatus === 'idle' && (
                                                <motion.div
                                                    key="idle-icon"
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 0.8, opacity: 0 }}
                                                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl shadow-sm"
                                                >
                                                    🌱
                                                </motion.div>
                                            )}
                                            {timerStatus === 'starting' && (
                                                <motion.div
                                                    key="countdown"
                                                    initial={{ scale: 0.5, opacity: 0 }}
                                                    animate={{ scale: 1.5, opacity: 1 }}
                                                    exit={{ scale: 2, opacity: 0 }}
                                                    className={`text-6xl font-black ${focusMode ? 'text-white' : 'text-green-600'}`}
                                                >
                                                    {countdown}
                                                </motion.div>
                                            )}
                                            {timerStatus === 'running' && (
                                                <motion.div
                                                    key="timer"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className={`text-5xl font-mono tracking-wider ${focusMode ? 'text-white' : 'text-gray-800'}`}
                                                >
                                                    {formatTime(timeLeft)}
                                                </motion.div>
                                            )}
                                            {timerStatus === 'finished' && (
                                                <motion.div
                                                    key="done"
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg"
                                                >
                                                    <CheckCircle2 className="w-10 h-10" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Text Content */}
                                    <div className={`transition-all duration-700 ${focusMode ? 'opacity-0 blur-sm pointer-events-none' : 'opacity-100'}`}>
                                        <h2 className="text-2xl font-bold mb-8 text-gray-800">
                                            {timerStatus === 'finished' ? "Well done." : <>Do this now.<br />It takes 2 minutes.</>}
                                        </h2>

                                        <div className="space-y-6 text-lg leading-relaxed font-medium text-gray-600">
                                            <p className={timerStatus === 'starting' ? 'animate-pulse' : ''}>Sit down.</p>
                                            <p>Put both feet on the ground.</p>
                                            <p>Breathe in slowly.</p>
                                            <p>Breathe out slowly.</p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    {timerStatus === 'idle' && (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setTimerStatus('starting')}
                                            className="mt-12 bg-green-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-green-600 transition-colors flex items-center gap-2 mx-auto"
                                        >
                                            <PlayCircle className="w-5 h-5" />
                                            Start Timer
                                        </motion.button>
                                    )}

                                    {timerStatus === 'running' && !focusMode && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-sm text-gray-400 mt-8"
                                        >
                                            Tap the moon icon to focus
                                        </motion.p>
                                    )}
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
