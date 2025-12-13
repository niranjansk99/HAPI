import { motion } from 'motion/react';
import { ArrowLeft, Target, Clock, Trophy, Zap } from 'lucide-react';

interface DailyChallengeProps {
  onNavigate: (page: string) => void;
  userStats: any;
  setUserStats: (stats: any) => void;
}

export function DailyChallenge({ onNavigate, userStats, setUserStats }: DailyChallengeProps) {
  const challenges = [
    {
      id: 1,
      title: 'Speed Round',
      description: 'Complete 5 lessons in under 10 minutes',
      reward: 100,
      progress: 2,
      total: 5,
      icon: Zap,
      color: 'from-yellow-400 to-orange-400',
      timeLeft: '18h 32m'
    },
    {
      id: 2,
      title: 'Perfect Practice',
      description: 'Get 3 perfect scores today',
      reward: 150,
      progress: 1,
      total: 3,
      icon: Target,
      color: 'from-green-400 to-emerald-400',
      timeLeft: '18h 32m'
    },
    {
      id: 3,
      title: 'Marathon Learning',
      description: 'Study for 30 minutes straight',
      reward: 200,
      progress: 8,
      total: 30,
      icon: Clock,
      color: 'from-blue-400 to-purple-400',
      timeLeft: '18h 32m'
    }
  ];

  const weeklyChallenge = {
    title: 'Weekly Champion',
    description: 'Complete 20 lessons this week',
    reward: 500,
    progress: 12,
    total: 20,
    icon: Trophy,
    color: 'from-purple-500 to-pink-500',
    timeLeft: '4d 18h'
  };

  const handleStartChallenge = (challenge: any) => {
    onNavigate('lessons');
  };

  return (
    <div className="min-h-screen flex flex-col pb-20 bg-gradient-to-b from-orange-50 to-red-50">
      <div className="bg-gradient-to-r from-orange-500 to-red-600 px-6 pt-8 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onNavigate('home')}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          <h1 className="text-white">Daily Challenges</h1>
        </div>
        <p className="text-orange-100">Complete challenges to earn bonus XP</p>
      </div>

      <main className="flex-1 px-6 py-8">
        {/* Weekly Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h3 className="text-gray-800 mb-4">🏆 Weekly Challenge</h3>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`bg-gradient-to-br ${weeklyChallenge.color} rounded-3xl p-6 shadow-xl text-white`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="mb-2">{weeklyChallenge.title}</h3>
                <p className="text-sm text-white/80 mb-4">{weeklyChallenge.description}</p>
              </div>
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <weeklyChallenge.icon className="w-8 h-8" />
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-2">
                <span>{weeklyChallenge.progress}/{weeklyChallenge.total}</span>
                <span>{Math.round((weeklyChallenge.progress / weeklyChallenge.total) * 100)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(weeklyChallenge.progress / weeklyChallenge.total) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-white h-full rounded-full"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span className="text-sm">+{weeklyChallenge.reward} XP</span>
              </div>
              <div className="text-sm text-white/80">
                <Clock className="w-4 h-4 inline mr-1" />
                {weeklyChallenge.timeLeft}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Daily Challenges */}
        <div className="mb-6">
          <h3 className="text-gray-800 mb-4">⚡ Daily Challenges</h3>
          <div className="space-y-4">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleStartChallenge(challenge)}
                  className="w-full bg-white rounded-2xl p-5 shadow-md text-left"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${challenge.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <challenge.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-800 mb-1">{challenge.title}</h4>
                      <p className="text-sm text-gray-600">{challenge.description}</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>{challenge.progress}/{challenge.total}</span>
                      <span>{Math.round((challenge.progress / challenge.total) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`bg-gradient-to-r ${challenge.color} h-full rounded-full`}
                        style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-orange-600">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm">+{challenge.reward} XP</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {challenge.timeLeft}
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
