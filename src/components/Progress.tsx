import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Award, Zap } from 'lucide-react';
import { Navigation } from './Navigation';

interface ProgressProps {
  onNavigate: (page: string) => void;
  userStats: {
    streak: number;
    points: number;
    level: number;
    completedLessons: number;
  };
}

export function Progress({ onNavigate, userStats }: ProgressProps) {
  const weeklyActivity = [
    { day: 'Mon', xp: 120, completed: true },
    { day: 'Tue', xp: 80, completed: true },
    { day: 'Wed', xp: 150, completed: true },
    { day: 'Thu', xp: 90, completed: true },
    { day: 'Fri', xp: 110, completed: true },
    { day: 'Sat', xp: 0, completed: false },
    { day: 'Sun', xp: 0, completed: false }
  ];

  const maxXp = Math.max(...weeklyActivity.map(d => d.xp));

  return (
    <div className="min-h-screen flex flex-col pb-20">
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white"
        >
          <h1 className="mb-2">Your Progress</h1>
          <p className="text-purple-100">Track your learning journey</p>
        </motion.div>
      </div>

      <main className="flex-1 px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-gray-800">Current Level</h3>
              <p className="text-gray-600">Level {userStats.level}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{userStats.points} XP</span>
              <span>{userStats.level * 200} XP</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(userStats.points / (userStats.level * 200)) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-gray-800">Weekly Activity</h3>
              <p className="text-gray-600">Keep the streak going!</p>
            </div>
          </div>

          <div className="flex justify-between items-end h-40 gap-2">
            {weeklyActivity.map((day, index) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: day.xp > 0 ? `${(day.xp / maxXp) * 100}%` : '8px' }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 100 }}
                  className={`w-full rounded-lg ${day.completed
                      ? 'bg-gradient-to-t from-green-400 to-green-500'
                      : 'bg-gray-200'
                    } min-h-2 relative group`}
                >
                  {day.xp > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                    >
                      {day.xp} XP
                    </motion.div>
                  )}
                </motion.div>
                <span className="text-xs text-gray-600">{day.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h3 className="text-gray-800">Statistics</h3>

          {[
            { icon: Zap, label: 'Total XP Earned', value: userStats.points, color: 'from-yellow-400 to-orange-400' },
            { icon: Award, label: 'Lessons Completed', value: userStats.completedLessons, color: 'from-blue-400 to-purple-400' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-5 shadow-md flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-700">{stat.label}</span>
              </div>
              <span className="text-2xl text-gray-800">{stat.value}</span>
            </motion.div>
          ))}
        </motion.div>
      </main>

      <Navigation currentPage="progress" onNavigate={onNavigate} />
    </div>
  );
}
