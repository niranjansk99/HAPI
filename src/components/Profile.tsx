import { motion } from 'framer-motion';
import { Settings, Globe, Trophy, ChevronRight, Flame, Zap } from 'lucide-react';
import { Navigation } from './Navigation';

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
    { emoji: '🔥', title: 'Consistency', desc: '5 day streak', unlocked: true },
    { emoji: '⭐', title: 'Dedication', desc: 'Complete 20 insights', unlocked: true },
    { emoji: '💎', title: 'Growth', desc: 'Reach stage 5', unlocked: true },
    { emoji: '🏆', title: 'Mastery', desc: 'Reach stage 10', unlocked: false },
    { emoji: '🎯', title: 'Clarity', desc: '10 perfect moments', unlocked: false },
    { emoji: '👑', title: 'Sage', desc: 'Reach stage 25', unlocked: false }
  ];

  return (
    <div className="min-h-screen flex flex-col pb-20 bg-gray-50">
      <div className="bg-white px-6 pt-12 pb-8 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Your Space</h2>
          <button
            onClick={() => onNavigate('settings')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4 relative">
            <span className="text-4xl">🧘</span>
            <div className="absolute bottom-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-full border-2 border-white">
              Lvl {userStats.level}
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-800">Life Explorer</h3>
          <p className="text-gray-500">Joined recently</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-orange-50 p-4 rounded-2xl flex items-center gap-3">
            <Flame className="w-8 h-8 text-orange-500" />
            <div>
              <div className="text-2xl font-bold text-gray-800">{userStats.streak}</div>
              <div className="text-xs text-gray-500">Days of Clarity</div>
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-2xl flex items-center gap-3">
            <Zap className="w-8 h-8 text-yellow-500" />
            <div>
              <div className="text-2xl font-bold text-gray-800">{userStats.points}</div>
              <div className="text-xs text-gray-500">Total Sparks</div>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-6 shadow-sm mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-800 font-bold">Milestones</h3>
            <button
              onClick={() => onNavigate('achievements')}
              className="flex items-center gap-1 text-green-600 font-medium"
            >
              <span className="text-sm">View All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((achievement, index) => (
              <motion.button
                key={achievement.title}
                onClick={() => onNavigate('achievements')}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05, type: "spring", stiffness: 200 }}
                whileHover={{ scale: achievement.unlocked ? 1.05 : 1 }}
                whileTap={{ scale: achievement.unlocked ? 0.95 : 1 }}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 border ${achievement.unlocked
                  ? 'border-green-100 bg-green-50'
                  : 'border-gray-100 bg-gray-50'
                  }`}
              >
                <span className={`text-3xl mb-1 ${!achievement.unlocked && 'grayscale opacity-50'}`}>
                  {achievement.emoji}
                </span>
                {achievement.unlocked && (
                  <span className="text-[10px] text-gray-600 text-center font-medium leading-tight">{achievement.title}</span>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-6 shadow-sm mb-6"
        >
          <h3 className="text-gray-800 font-bold mb-4">Quick Settings</h3>
          <div className="space-y-3">
            {[
              { icon: Settings, label: 'All Settings', page: 'settings' },
              { icon: Trophy, label: 'Community', page: 'leaderboard' },
              { icon: Globe, label: 'Daily Spark', page: 'daily-challenge' }
            ].map((item, index) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.page)}
                className="w-full flex items-center justify-between py-3 px-2 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
                    <item.icon className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </motion.div>
      </main>

      <Navigation currentPage="profile" onNavigate={onNavigate} />
    </div>
  );
}