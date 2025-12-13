import { motion, AnimatePresence } from 'motion/react';
import { Star, Lock, CheckCircle, Play } from 'lucide-react';
import { Navigation } from './Navigation';
import { useState } from 'react';

interface LessonsProps {
  onNavigate: (page: string) => void;
  userStats: {
    streak: number;
    points: number;
    level: number;
    completedLessons: number;
    gems: number;
  };
  setUserStats: (stats: any) => void;
  navigateToLesson: (lesson: any) => void;
}

export function Lessons({ onNavigate, userStats, setUserStats, navigateToLesson }: LessonsProps) {
  const lessons = [
    { id: 1, title: 'Basics 1', status: 'completed', stars: 3, color: 'from-green-400 to-green-500', emoji: '👋' },
    { id: 2, title: 'Basics 2', status: 'completed', stars: 3, color: 'from-blue-400 to-blue-500', emoji: '✨' },
    { id: 3, title: 'Greetings', status: 'completed', stars: 2, color: 'from-purple-400 to-purple-500', emoji: '👋' },
    { id: 4, title: 'Numbers', status: 'active', stars: 0, color: 'from-yellow-400 to-orange-500', emoji: '🔢' },
    { id: 5, title: 'Food', status: 'locked', stars: 0, color: 'from-pink-400 to-red-500', emoji: '🍕' },
    { id: 6, title: 'Travel', status: 'locked', stars: 0, color: 'from-indigo-400 to-purple-500', emoji: '✈️' }
  ];

  const handleLessonClick = (lesson: any) => {
    if (lesson.status === 'locked') return;
    navigateToLesson(lesson);
  };

  return (
    <div className="min-h-screen flex flex-col pb-20">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white"
        >
          <h1 className="mb-2">Learning Path</h1>
          <p className="text-blue-100">Complete lessons to level up!</p>
        </motion.div>
      </div>

      <main className="flex-1 px-6 py-8 relative">
        <div className="max-w-md mx-auto space-y-6">
          {lessons.map((lesson, index) => {
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, type: "spring", stiffness: 100 }}
                style={{ marginLeft: index % 2 === 0 ? 0 : 'auto', marginRight: index % 2 === 0 ? 'auto' : 0 }}
                className="relative"
              >
                {index > 0 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1 h-4 bg-gray-300 -z-10" />
                )}
                
                <motion.button
                  onClick={() => handleLessonClick(lesson)}
                  disabled={lesson.status === 'locked'}
                  whileHover={lesson.status !== 'locked' ? { scale: 1.05 } : {}}
                  whileTap={lesson.status !== 'locked' ? { scale: 0.95 } : {}}
                  className={`w-full rounded-3xl p-6 shadow-lg transition-all ${
                    lesson.status === 'locked'
                      ? 'bg-gray-300'
                      : `bg-gradient-to-br ${lesson.color}`
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        {lesson.status === 'locked' ? (
                          <Lock className="w-8 h-8 text-white" />
                        ) : lesson.status === 'completed' ? (
                          <CheckCircle className="w-8 h-8 text-white" />
                        ) : (
                          <span className="text-3xl">{lesson.emoji}</span>
                        )}
                      </div>
                      <div className="text-left text-white">
                        <div className="mb-1">{lesson.title}</div>
                        {lesson.status === 'completed' && (
                          <div className="flex gap-1">
                            {[...Array(3)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < lesson.stars
                                    ? 'fill-yellow-300 text-yellow-300'
                                    : 'text-white/50'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                        {lesson.status === 'active' && (
                          <div className="text-sm text-white/80">Start lesson</div>
                        )}
                      </div>
                    </div>
                    {lesson.status === 'completed' && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="text-2xl"
                      >
                        ⭐
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </main>

      <Navigation currentPage="lessons" onNavigate={onNavigate} />
    </div>
  );
}