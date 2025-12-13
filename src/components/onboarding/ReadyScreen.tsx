import { motion } from "framer-motion";
import { Sparkles, Target, Trophy, Zap } from 'lucide-react';

interface ReadyScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export function ReadyScreen({ onNext }: ReadyScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 150, 
          damping: 15,
          duration: 0.8 
        }}
        className="mb-8"
      >
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-7xl">🎉</span>
          </div>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                x: [0, Math.cos(i * 60 * Math.PI / 180) * 80],
                y: [0, Math.sin(i * 60 * Math.PI / 180) * 80]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                repeatDelay: 1
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center mb-12"
      >
        <h1 className="mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          You're all set!
        </h1>
        <p className="text-gray-600 text-lg max-w-sm mx-auto">
          Your personalized learning path is ready. Let's start your journey!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-2 gap-4 mb-12 max-w-md w-full"
      >
        {[
          { icon: Target, label: 'Custom Path', color: 'from-blue-400 to-blue-500' },
          { icon: Trophy, label: 'Track Progress', color: 'from-purple-400 to-purple-500' },
          { icon: Zap, label: 'Earn Rewards', color: 'from-yellow-400 to-orange-500' },
          { icon: Sparkles, label: 'Have Fun', color: 'from-pink-400 to-pink-500' }
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
            className={`bg-gradient-to-br ${item.color} rounded-3xl p-6 shadow-lg flex flex-col items-center text-white`}
          >
            <item.icon className="w-10 h-10 mb-3" />
            <span className="text-sm">{item.label}</span>
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
        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-16 py-6 rounded-full shadow-xl text-lg relative overflow-hidden"
      >
        <motion.div
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
        <span className="relative z-10">Start Learning! 🚀</span>
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-gray-500 text-sm mt-6"
      >
        It only takes 5 minutes a day
      </motion.p>
    </div>
  );
}
