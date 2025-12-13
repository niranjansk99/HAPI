import { motion } from "framer-motion";
import { ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onNext: () => void;
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 20,
          duration: 0.8 
        }}
        className="mb-8"
      >
        <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
          <span className="text-7xl"></span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-12"
      >
        <h1 className="mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Welcome to LearnLingo
        </h1>
        <p className="text-gray-600 text-lg max-w-sm mx-auto">
          The fun, effective way to learn a new language!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-6 mb-12 max-w-sm"
      >
        {[
          { emoji: '🎯', text: 'Personalized learning path' },
          { emoji: '🏆', text: 'Track your progress' },
          { emoji: '⚡', text: 'Quick, bite-sized lessons' }
        ].map((item, index) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + index * 0.15 }}
            className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-md"
          >
            <div className="text-4xl">{item.emoji}</div>
            <span className="text-gray-700">{item.text}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-12 py-5 rounded-full shadow-lg flex items-center gap-3 text-lg"
      >
        Get Started
        <ArrowRight className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
