import { motion } from "framer-motion";
;
import { ArrowRight, ArrowLeft, Coffee, CloudLightning, Waves, BatteryLow, HelpCircle } from 'lucide-react';

interface CurrentFeelingsScreenProps {
  onNext: () => void;
  onBack: () => void;
  userData: any;
  updateUserData: (key: string, value: string) => void;
}

export function CurrentFeelingsScreen({ onNext, onBack, userData, updateUserData }: CurrentFeelingsScreenProps) {
  const goals = [
    {
      id: 'Calm',
      label: 'Calm',
      desc: 'Your mind is clear.',
      icon: Coffee,
      color: 'from-amber-300 to-yellow-400'
    },
    {
      id: 'Stressed',
      label: 'Stressed',
      desc: 'Lets bring back some balance.',
      icon: CloudLightning,
      color: 'from-blue-400 to-cyan-500',
    },
    {
      id: 'Overwhelmed',
      label: 'Overwhelmed',
      desc: 'Sometimes its all too much - lets start small.',
      icon: Waves,
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 'Empty',
      label: 'Empty',
      desc: 'Lets see how we can charge you up again.',
      icon: BatteryLow,
      color: 'from-indigo-300 to-purple-300'
    },
    {
      id: 'Unsure',
      label: 'Unsure',
      desc: 'No worries - we will figure it out together!',
      icon: HelpCircle,
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
          ✨
        </motion.div>
        <h1 className="mb-3">How are you feeling right now?</h1>
        <p className="text-gray-600">Don't overthink it - just follow you first intention</p>
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
              className={`relative w-full rounded-3xl p-5 shadow-lg transition-all flex items-center gap-4 ${userData.dailyGoal === goal.id
                ? `bg-gradient-to-r ${goal.color} ring-4 ring-green-400`
                : 'bg-white'
                }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${userData.dailyGoal === goal.id ? 'bg-white/20' : 'bg-gray-100'
                }`}>
                <goal.icon className={`w-7 h-7 ${userData.dailyGoal === goal.id ? 'text-white' : 'text-gray-600'
                  }`} />
              </div>
              <div className="flex-1 text-left">
                <div className={`mb-1 ${userData.dailyGoal === goal.id ? 'text-white' : 'text-gray-800'
                  }`}>
                  {goal.label}
                </div>
                <div className={`text-sm ${userData.dailyGoal === goal.id ? 'text-white/80' : 'text-gray-500'
                  }`}>
                  {goal.desc}
                </div>
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
