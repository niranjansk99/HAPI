import { motion } from "framer-motion";
import { Compass } from 'lucide-react';

interface ReadyScreenProps {
  onNext: () => void;
  onBack?: () => void;
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
          <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
            <Compass className="w-16 h-16 text-green-600" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center mb-12"
      >
        <h1 className="mb-6 text-3xl font-bold text-gray-800 leading-tight">
          What if we explored this together — just for a few days?
        </h1>
        <div className="space-y-3 text-lg text-gray-600 font-medium">
          <p>No pressure.</p>
          <p>No big decisions.</p>
          <p>Just small steps.</p>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-5 rounded-full shadow-xl text-lg font-semibold relative overflow-hidden w-full max-w-sm"
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
        <span className="relative z-10">Start my 7-day journey</span>
      </motion.button>
    </div>
  );
}
