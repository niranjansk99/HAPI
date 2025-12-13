import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Lock } from 'lucide-react';

interface AchievementsProps {
  onNavigate: (page: string) => void;
  userStats: any;
}

export function Achievements({ onNavigate, userStats }: AchievementsProps) {
  const achievements = [
    { 
      emoji: '🔥', 
      title: 'Fire Starter', 
      desc: 'Complete a 5 day streak', 
      unlocked: true,
      reward: '50 XP',
      progress: 5,
      total: 5
    },
    { 
      emoji: '⭐', 
      title: 'Star Student', 
      desc: 'Complete 20 lessons', 
      unlocked: true,
      reward: '100 XP',
      progress: 23,
      total: 20
    },
    { 
      emoji: '💎', 
      title: 'Diamond League', 
      desc: 'Reach level 5', 
      unlocked: true,
      reward: '200 XP',
      progress: 7,
      total: 5
    },
    { 
      emoji: '🏆', 
      title: 'Champion', 
      desc: 'Reach level 10', 
      unlocked: false,
      reward: '300 XP',
      progress: 7,
      total: 10
    },
    { 
      emoji: '🎯', 
      title: 'Perfect Score', 
      desc: 'Get 10 perfect lessons', 
      unlocked: false,
      reward: '150 XP',
      progress: 4,
      total: 10
    },
    { 
      emoji: '👑', 
      title: 'Legend', 
      desc: 'Reach level 25', 
      unlocked: false,
      reward: '500 XP',
      progress: 7,
      total: 25
    },
    { 
      emoji: '⚡', 
      title: 'Speed Demon', 
      desc: 'Complete 5 lessons in one day', 
      unlocked: false,
      reward: '100 XP',
      progress: 2,
      total: 5
    },
    { 
      emoji: '🌟', 
      title: 'Superstar', 
      desc: 'Earn 5000 XP', 
      unlocked: false,
      reward: '250 XP',
      progress: 1250,
      total: 5000
    }
  ];

  return (
    <div className="min-h-screen flex flex-col pb-20 bg-gradient-to-b from-yellow-50 to-orange-50">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 px-6 pt-8 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onNavigate('home')}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          <h1 className="text-white">Achievements</h1>
        </div>
        <p className="text-yellow-100">Unlock badges by completing challenges</p>
      </div>

      <main className="flex-1 px-6 py-8">
        <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: achievement.unlocked ? 1.02 : 1 }}
              className={`rounded-3xl p-6 shadow-lg ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-400'
                  : 'bg-white'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 ${
                  achievement.unlocked ? 'bg-white/20' : 'bg-gray-100'
                }`}>
                  {achievement.unlocked ? achievement.emoji : <Lock className="w-8 h-8 text-gray-400" />}
                </div>
                <div className="flex-1">
                  <h3 className={achievement.unlocked ? 'text-white' : 'text-gray-800'}>
                    {achievement.title}
                  </h3>
                  <p className={`text-sm mb-3 ${achievement.unlocked ? 'text-yellow-100' : 'text-gray-600'}`}>
                    {achievement.desc}
                  </p>
                  {!achievement.unlocked && (
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>{achievement.progress}/{achievement.total}</span>
                        <span>{Math.round((achievement.progress / achievement.total) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-green-500 h-full rounded-full"
                          style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
                    achievement.unlocked 
                      ? 'bg-white/20 text-white' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    <Trophy className="w-3 h-3" />
                    {achievement.reward}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
