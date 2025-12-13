import { motion } from 'motion/react';
import { ArrowLeft, Trophy, Medal, Award, Crown } from 'lucide-react';

interface LeaderboardProps {
  onNavigate: (page: string) => void;
  userStats: any;
}

export function Leaderboard({ onNavigate, userStats }: LeaderboardProps) {
  const leaderboardData = [
    { rank: 1, name: 'Sarah Chen', xp: 2850, avatar: '👩', streak: 15 },
    { rank: 2, name: 'Alex Kumar', xp: 2340, avatar: '👨', streak: 12 },
    { rank: 3, name: 'Emma Wilson', xp: 1980, avatar: '👱‍♀️', streak: 10 },
    { rank: 4, name: 'You', xp: userStats.points, avatar: '🦉', streak: userStats.streak, isCurrentUser: true },
    { rank: 5, name: 'Chris Lee', xp: 1180, avatar: '👦', streak: 8 },
    { rank: 6, name: 'Maya Patel', xp: 1050, avatar: '👧', streak: 6 },
    { rank: 7, name: 'John Smith', xp: 920, avatar: '👨‍🦰', streak: 5 },
    { rank: 8, name: 'Lisa Brown', xp: 780, avatar: '👩‍🦱', streak: 4 }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-600" />;
      default:
        return <span className="text-gray-500">#{rank}</span>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-20 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 pt-8 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onNavigate('home')}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          <h1 className="text-white">Leaderboard</h1>
        </div>
        <p className="text-purple-100">Compete with learners worldwide</p>
      </div>

      <main className="flex-1 px-6 py-8">
        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-end justify-center gap-4 mb-8"
        >
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-3xl mb-2 shadow-lg">
              {leaderboardData[1].avatar}
            </div>
            <div className="text-sm text-gray-700 mb-1">{leaderboardData[1].name.split(' ')[0]}</div>
            <div className="bg-gradient-to-br from-gray-300 to-gray-400 rounded-t-2xl w-20 h-24 flex items-center justify-center">
              <Medal className="w-8 h-8 text-white" />
            </div>
            <div className="text-xs text-gray-600 mt-1">{leaderboardData[1].xp} XP</div>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="relative"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-4xl mb-2 shadow-xl">
                {leaderboardData[0].avatar}
              </div>
              <div className="absolute -top-2 -right-2">
                <Crown className="w-8 h-8 text-yellow-500" />
              </div>
            </motion.div>
            <div className="text-gray-700 mb-1">{leaderboardData[0].name.split(' ')[0]}</div>
            <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-t-2xl w-24 h-32 flex items-center justify-center">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <div className="text-xs text-gray-600 mt-1">{leaderboardData[0].xp} XP</div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-3xl mb-2 shadow-lg">
              {leaderboardData[2].avatar}
            </div>
            <div className="text-sm text-gray-700 mb-1">{leaderboardData[2].name.split(' ')[0]}</div>
            <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-t-2xl w-20 h-20 flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="text-xs text-gray-600 mt-1">{leaderboardData[2].xp} XP</div>
          </motion.div>
        </motion.div>

        {/* Rest of leaderboard */}
        <div className="space-y-3 max-w-md mx-auto">
          {leaderboardData.slice(3).map((user, index) => (
            <motion.div
              key={user.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className={`rounded-2xl p-4 shadow-md flex items-center gap-4 ${
                user.isCurrentUser
                  ? 'bg-gradient-to-r from-green-400 to-green-500 ring-2 ring-green-600'
                  : 'bg-white'
              }`}
            >
              <div className="w-8 text-center">
                {getRankIcon(user.rank)}
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                user.isCurrentUser ? 'bg-white/20' : 'bg-gradient-to-br from-blue-400 to-purple-400'
              }`}>
                {user.avatar}
              </div>
              <div className="flex-1">
                <div className={user.isCurrentUser ? 'text-white' : 'text-gray-800'}>
                  {user.name}
                </div>
                <div className={`text-sm ${user.isCurrentUser ? 'text-green-100' : 'text-gray-500'}`}>
                  {user.streak} day streak 🔥
                </div>
              </div>
              <div className={user.isCurrentUser ? 'text-white' : 'text-gray-700'}>
                {user.xp} XP
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
