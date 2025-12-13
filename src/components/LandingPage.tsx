import { motion } from 'framer-motion';
import { ArrowRight, Star, Heart, Zap, Shield, Users } from 'lucide-react';

interface LandingPageProps {
    onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
            {/* Navigation */}
            <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
                >
                    HAPI
                </motion.div>
                <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onStart}
                    className="px-6 py-2 bg-white rounded-full text-indigo-600 font-semibold shadow-md hover:shadow-lg transition-all"
                >
                    Get Started
                </motion.button>
            </nav>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-6 pt-10 pb-20 md:pt-20 md:pb-32">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="md:w-1/2 space-y-8"
                    >
                        <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium">
                            <span className="flex h-2 w-2 rounded-full bg-indigo-600"></span>
                            <span>Unleash your goal!</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
                            Master pivoting your life <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
                                In Minutes
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 max-w-lg">
                            Gamified journey that stick. Join over 100,000 learners mastering pivoting your life the fun way.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onStart}
                                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group"
                            >
                                Start the Journey Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>

                            {/*<motion.button
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white text-gray-700 rounded-2xl font-bold text-lg shadow-lg shadow-gray-100 flex items-center justify-center gap-2"
                            >
                                View Demo
                            </motion.button>*/}
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center bg-gray-200 overflow-hidden`}>
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} alt="User" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex text-yellow-500">
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                </div>
                                <p className="text-sm text-gray-500 font-medium">Loved by 10k+ students</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="md:w-1/2 relative"
                    >
                        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                        <div className="absolute -bottom-8 left-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                        <div className="absolute -bottom-8 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

                        <div className="relative bg-white/40 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50">
                            {/* Mock UI Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h3 className="font-bold text-gray-800">Daily Progress</h3>
                                        <p className="text-gray-500 text-sm">Keep it up!</p>
                                    </div>
                                    <div className="bg-orange-100 p-2 rounded-xl">
                                        <Zap className="w-6 h-6 text-orange-500" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 w-3/4 rounded-full"></div>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Lesson 4/5</span>
                                        <span className="font-bold text-indigo-600">80%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-purple-50 p-4 rounded-2xl">
                                    <Heart className="w-8 h-8 text-purple-500 mb-2" />
                                    <div className="font-bold text-gray-800">Health</div>
                                    <div className="text-xs text-gray-500">12 Lessons</div>
                                </div>
                                <div className="bg-green-50 p-4 rounded-2xl">
                                    <Shield className="w-8 h-8 text-green-500 mb-2" />
                                    <div className="font-bold text-gray-800">Logic</div>
                                    <div className="text-xs text-gray-500">8 Lessons</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="mt-32 grid md:grid-cols-3 gap-8">
                    {[
                        { title: "Gamified Learning", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-50", desc: "Earn points, badges, and compete with friends." },
                        { title: "Expert Content", icon: Star, color: "text-purple-500", bg: "bg-purple-50", desc: "Lessons crafted by industry leaders and experts." },
                        { title: "Community Driven", icon: Users, color: "text-pink-500", bg: "bg-pink-50", desc: "Join thousands of learners on the same journey." },
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                        >
                            <div className={`${feature.bg} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
                                <feature.icon className={`w-8 h-8 ${feature.color}`} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
