import { motion } from 'motion/react';
import { Crown, Settings, Bell, Globe, Moon, Volume2, Trophy, ChevronRight } from 'lucide-react';
import { Navigation } from './Navigation';
import { useState } from 'react';

interface ProfileProps {
  onNavigate: (page: string) => void;
  userStats: {
    streak: number;
    points: number;
    level: number;
    completedLessons: number;
    gems: number;
  };
}

export function Profile({ onNavigate, userStats }: ProfileProps) {
  const achievements = [
    { emoji: '🔥', title: 'Fire Starter', desc: '5 day streak', unlocked: true },
    { emoji: '⭐', title: 'Star Student', desc: 'Complete 20 lessons', unlocked: true },
    { emoji: '💎', title: 'Diamond League', desc: 'Reach level 5', unlocked: true },
    { emoji: '🏆', title: 'Champion', desc: 'Reach level 10', unlocked: false },
    { emoji: '🎯', title: 'Perfect Score', desc: '10 perfect lessons', unlocked: false },
    { emoji: '👑', title: 'Legend', desc: 'Reach level 25', unlocked: false }
  ];

  return (
    <div className="min-h-screen flex flex-col pb-20">
      <div className="bg-gradient-to-r from-orange-500 to-pink-600 px-6 pt-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="relative inline-block mb-4"
          >
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl shadow-xl">
              🦉
            </div>
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg"
            >
              <Crown className="w-5 h-5 text-white" />
            </motion.div>
          </motion.div>
          <h2 className="mb-1">Super Learner</h2>
          <p className="text-orange-100">Level {userStats.level} • {userStats.points} XP</p>
        </motion.div>
      </div>

      <main className="flex-1 px-6 -mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-800">Achievements</h3>
            <motion.button
              onClick={() => onNavigate('achievements')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 text-orange-600"
            >
              <span className="text-sm">View All</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((achievement, index) => (
              <motion.button
                key={achievement.title}
                onClick={() => onNavigate('achievements')}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05, type: "spring", stiffness: 200 }}
                whileHover={{ scale: achievement.unlocked ? 1.1 : 1, rotate: achievement.unlocked ? 5 : 0 }}
                whileTap={{ scale: achievement.unlocked ? 0.95 : 1 }}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-3 ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-400 shadow-md'
                    : 'bg-gray-100'
                }`}
              >
                <span className={`text-3xl mb-1 ${!achievement.unlocked && 'opacity-30'}`}>
                  {achievement.emoji}
                </span>
                {achievement.unlocked && (
                  <span className="text-xs text-white text-center">{achievement.title}</span>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-6"
        >
          <h3 className="text-gray-800 mb-4">Quick Settings</h3>
          <div className="space-y-3">
            {[
              { icon: Settings, label: 'All Settings', page: 'settings' },
              { icon: Trophy, label: 'Leaderboard', page: 'leaderboard' },
              { icon: Globe, label: 'Daily Challenge', page: 'daily-challenge' }
            ].map((item, index) => (
              <motion.button
                key={item.label}
                onClick={() => onNavigate(item.page)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-between py-3 px-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </main>

      <Navigation currentPage="profile" onNavigate={onNavigate} />
    </div>
  );
}