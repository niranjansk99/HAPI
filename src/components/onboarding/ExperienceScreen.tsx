import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface ExperienceScreenProps {
  onNext: () => void;
  onBack: () => void;
  userData: any;
  updateUserData: (key: string, value: string) => void;
}

export function ExperienceScreen({ onNext, onBack, userData, updateUserData }: ExperienceScreenProps) {
  const experiences = [
    { 
      id: 'beginner', 
      label: 'New to languages', 
      desc: "I'm just starting out",
      emoji: '🌱',
      color: 'from-green-400 to-emerald-500'
    },
    { 
      id: 'intermediate', 
      label: 'Some experience', 
      desc: 'I know some basics',
      emoji: '🌿',
      color: 'from-blue-400 to-cyan-500'
    },
    { 
      id: 'advanced', 
      label: 'Pretty comfortable', 
      desc: 'I can hold conversations',
      emoji: '🌳',
      color: 'from-purple-400 to-pink-500'
    },
    { 
      id: 'expert', 
      label: 'Very experienced', 
      desc: 'I want to perfect my skills',
      emoji: '🏆',
      color: 'from-orange-400 to-red-500'
    }
  ];

  const handleSelect = (experienceId: string) => {
    updateUserData('experience', experienceId);
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
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 2
          }}
          className="text-5xl mb-4"
        >
          📚
        </motion.div>
        <h1 className="mb-3">What's your level?</h1>
        <p className="text-gray-600">We'll personalize your lessons</p>
      </motion.div>

      <div className="flex-1 max-w-md mx-auto w-full">
        <div className="space-y-4 mb-8">
          {experiences.map((experience, index) => (
            <motion.button
              key={experience.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(experience.id)}
              className={`w-full rounded-3xl p-6 shadow-lg transition-all flex items-center gap-4 ${
                userData.experience === experience.id
                  ? `bg-gradient-to-r ${experience.color} ring-4 ring-green-400`
                  : 'bg-white'
              }`}
            >
              <div className="text-5xl">{experience.emoji}</div>
              <div className="flex-1 text-left">
                <div className={`mb-1 ${
                  userData.experience === experience.id ? 'text-white' : 'text-gray-800'
                }`}>
                  {experience.label}
                </div>
                <div className={`text-sm ${
                  userData.experience === experience.id ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {experience.desc}
                </div>
              </div>
              {userData.experience === experience.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
                >
                  <span className="text-green-500">✓</span>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: userData.experience ? 1 : 0.5, y: 0 }}
          whileHover={userData.experience ? { scale: 1.05 } : {}}
          whileTap={userData.experience ? { scale: 0.95 } : {}}
          onClick={onNext}
          disabled={!userData.experience}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-5 rounded-full shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
        >
          Continue
          <ArrowRight className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
}
