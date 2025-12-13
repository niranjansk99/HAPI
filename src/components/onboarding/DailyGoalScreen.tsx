import { motion } from "framer-motion";
;
import { ArrowRight, ArrowLeft, Coffee, Zap, Flame, Rocket } from 'lucide-react';

interface DailyGoalScreenProps {
  onNext: () => void;
  onBack: () => void;
  userData: any;
  updateUserData: (key: string, value: string) => void;
}

export function DailyGoalScreen({ onNext, onBack, userData, updateUserData }: DailyGoalScreenProps) {
  const goals = [
    { 
      id: 'casual', 
      label: 'Casual', 
      minutes: 5,
      desc: 'Just a few minutes',
      icon: Coffee,
      color: 'from-green-400 to-emerald-500'
    },
    { 
      id: 'regular', 
      label: 'Regular', 
      minutes: 10,
      desc: 'Keep it balanced',
      icon: Zap,
      color: 'from-blue-400 to-cyan-500',
      recommended: true
    },
    { 
      id: 'serious', 
      label: 'Serious', 
      minutes: 15,
      desc: 'Really committed',
      icon: Flame,
      color: 'from-orange-400 to-red-500'
    },
    { 
      id: 'intense', 
      label: 'Intense', 
      minutes: 20,
      desc: 'Go all in!',
      icon: Rocket,
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const handleSelect = (goalId: string) => {
    updateUserData('dailyGoal', goalId);
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-12">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onBack}
        className="self-start mb-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
      >
        <ArrowLeft className="w-5 h-5 text-gray-600" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 1
          }}
          className="text-5xl mb-4"
        >
          ⏰
        </motion.div>
        <h1 className="mb-3">Set your daily goal</h1>
        <p className="text-gray-600">How much time per day?</p>
      </motion.div>

      <div className="flex-1 max-w-md mx-auto w-full">
        <div className="space-y-4 mb-8">
          {goals.map((goal, index) => (
            <motion.button
              key={goal.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.03, x: 5 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(goal.id)}
              className={`relative w-full rounded-3xl p-5 shadow-lg transition-all flex items-center gap-4 ${
                userData.dailyGoal === goal.id
                  ? `bg-gradient-to-r ${goal.color} ring-4 ring-green-400`
                  : 'bg-white'
              }`}
            >
              {goal.recommended && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-3 right-4 bg-yellow-400 text-yellow-900 text-xs px-3 py-1 rounded-full shadow-md"
                >
                  ⭐ Recommended
                </motion.div>
              )}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                userData.dailyGoal === goal.id ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                <goal.icon className={`w-7 h-7 ${
                  userData.dailyGoal === goal.id ? 'text-white' : 'text-gray-600'
                }`} />
              </div>
              <div className="flex-1 text-left">
                <div className={`mb-1 ${
                  userData.dailyGoal === goal.id ? 'text-white' : 'text-gray-800'
                }`}>
                  {goal.label}
                </div>
                <div className={`text-sm ${
                  userData.dailyGoal === goal.id ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {goal.desc}
                </div>
              </div>
              <div className={`text-right ${
                userData.dailyGoal === goal.id ? 'text-white' : 'text-gray-600'
              }`}>
                <div className="text-2xl">{goal.minutes}</div>
                <div className="text-xs">min/day</div>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: userData.dailyGoal ? 1 : 0.5, y: 0 }}
          whileHover={userData.dailyGoal ? { scale: 1.05 } : {}}
          whileTap={userData.dailyGoal ? { scale: 0.95 } : {}}
          onClick={onNext}
          disabled={!userData.dailyGoal}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-5 rounded-full shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
        >
          Continue
          <ArrowRight className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
}
