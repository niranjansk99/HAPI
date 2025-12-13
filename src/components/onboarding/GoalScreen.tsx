import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Briefcase, GraduationCap, Plane, Users, Heart, Brain } from 'lucide-react';

interface GoalScreenProps {
  onNext: () => void;
  onBack: () => void;
  userData: any;
  updateUserData: (key: string, value: string) => void;
}

export function GoalScreen({ onNext, onBack, userData, updateUserData }: GoalScreenProps) {
  const goals = [
    { id: 'career', label: 'Boost my career', icon: Briefcase, color: 'from-blue-400 to-blue-500' },
    { id: 'school', label: 'Study for school', icon: GraduationCap, color: 'from-purple-400 to-purple-500' },
    { id: 'travel', label: 'Travel abroad', icon: Plane, color: 'from-green-400 to-green-500' },
    { id: 'culture', label: 'Connect with culture', icon: Users, color: 'from-orange-400 to-orange-500' },
    { id: 'family', label: 'Talk with family', icon: Heart, color: 'from-pink-400 to-pink-500' },
    { id: 'brain', label: 'Exercise my brain', icon: Brain, color: 'from-indigo-400 to-indigo-500' }
  ];

  const handleSelect = (goalId: string) => {
    updateUserData('goal', goalId);
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
        <div className="text-5xl mb-4">🎯</div>
        <h1 className="mb-3">What's your main goal?</h1>
        <p className="text-gray-600">Choose what motivates you most</p>
      </motion.div>

      <div className="flex-1 max-w-md mx-auto w-full">
        <div className="grid grid-cols-2 gap-4 mb-8">
          {goals.map((goal, index) => (
            <motion.button
              key={goal.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(goal.id)}
              className={`rounded-3xl p-6 shadow-lg transition-all ${
                userData.goal === goal.id
                  ? `bg-gradient-to-br ${goal.color} ring-4 ring-green-400`
                  : 'bg-white'
              }`}
            >
              <goal.icon className={`w-10 h-10 mx-auto mb-3 ${
                userData.goal === goal.id ? 'text-white' : 'text-gray-600'
              }`} />
              <span className={`text-sm ${
                userData.goal === goal.id ? 'text-white' : 'text-gray-700'
              }`}>
                {goal.label}
              </span>
            </motion.button>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: userData.goal ? 1 : 0.5, y: 0 }}
          whileHover={userData.goal ? { scale: 1.05 } : {}}
          whileTap={userData.goal ? { scale: 0.95 } : {}}
          onClick={onNext}
          disabled={!userData.goal}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-5 rounded-full shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
        >
          Continue
          <ArrowRight className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
}
