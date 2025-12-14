import { motion } from 'framer-motion';
import { Flame, Zap, Trophy, ArrowRight, Star, Gift, Target, Users } from 'lucide-react';
import { Navigation } from './Navigation';

interface HomeProps {
  onNavigate: (page: string) => void;
  userStats: {
    streak: number;
    points: number;
    level: number;
    completedLessons: number;
    gems: number;
  };
}

export function Home({ onNavigate, userStats }: HomeProps) {
  return (
    <div className="min-h-screen flex flex-col pb-20">
      <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 pt-8 pb-6 rounded-b-3xl shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h2 className="text-white text-2xl mb-1">Hello, Explorer! 👋</h2>
            <p className="text-green-100">Your journey unfolds.</p>
          </div>
          <motion.button
            onClick={() => onNavigate('profile')}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
          >
            <span className="text-3xl">🦉</span>
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Flame, value: userStats.streak, label: 'Days of Clarity', color: 'from-orange-400 to-red-500', page: 'progress' },
            { icon: Zap, value: userStats.points, label: 'Questions', color: 'from-yellow-400 to-orange-400', page: 'progress' },
            { icon: Trophy, value: userStats.level, label: 'Stage', color: 'from-purple-400 to-pink-500', page: 'leaderboard' }
          ].map((stat, index) => (
            <motion.button
              key={stat.label}
              onClick={() => onNavigate(stat.page)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-2xl p-4 shadow-md"
            >
              <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-2 mx-auto`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-center">
                <div className="text-gray-800">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <main className="flex-1 px-6 py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h3 className="text-gray-800 mb-2">Daily Reflection</h3>
          <motion.button
            onClick={() => onNavigate('daily-challenge')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white rounded-2xl p-4 shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">15 minutes of focus</span>
              <span className="text-green-600">8/15 min</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '53%' }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                className="bg-gradient-to-r from-green-400 to-green-500 h-full rounded-full"
              />
            </div>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-6"
        >
          <h3 className="text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Target, label: 'Daily Spark', color: 'from-red-400 to-pink-500', page: 'daily-challenge' },
              { icon: Users, label: 'Shared Journey', color: 'from-blue-400 to-purple-500', page: 'leaderboard' },
              { icon: Gift, label: 'Toolbox', color: 'from-yellow-400 to-orange-500', page: 'shop' },
              { icon: Star, label: 'Milestones', color: 'from-green-400 to-teal-500', page: 'achievements' }
            ].map((action, index) => (
              <motion.button
                key={action.label}
                onClick={() => onNavigate(action.page)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-gradient-to-br ${action.color} rounded-2xl p-4 shadow-md flex flex-col items-center gap-2`}
              >
                <action.icon className="w-8 h-8 text-white" />
                <span className="text-white text-sm">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-gray-800 mb-4">Continue Journey</h3>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('journey')}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center"
              >
                <span className="text-4xl">📚</span>
              </motion.div>
              <div className="text-left">
                <div className="mb-1">Insight 24</div>
                <div className="text-sm text-green-100">Self Awareness</div>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-800">Milestones</h3>
            <motion.button
              onClick={() => onNavigate('achievements')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-green-600 text-sm"
            >
              View All →
            </motion.button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { emoji: '🔥', unlocked: true, label: 'Consistency' },
              { emoji: '⭐', unlocked: true, label: 'Dedication' },
              { emoji: '💎', unlocked: true, label: 'Growth' },
              { emoji: '🏆', unlocked: false, label: 'Mastery' }
            ].map((achievement, index) => (
              <motion.button
                key={achievement.label}
                onClick={() => achievement.unlocked && onNavigate('achievements')}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: achievement.unlocked ? 1.1 : 1 }}
                whileTap={{ scale: achievement.unlocked ? 0.95 : 1 }}
                className={`aspect-square rounded-2xl flex items-center justify-center text-4xl ${achievement.unlocked
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-400 shadow-md'
                  : 'bg-gray-200'
                  }`}
              >
                <span className={achievement.unlocked ? '' : 'opacity-30'}>
                  {achievement.emoji}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </main>

      <Navigation currentPage="home" onNavigate={onNavigate} />
    </div>
  );
}