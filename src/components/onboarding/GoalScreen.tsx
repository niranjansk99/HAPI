import { motion } from "framer-motion";
import { ArrowRight } from 'lucide-react';
import jumpingVideo from '../../assets/Jumping-vmake.mov';

interface GoalScreenProps {
  onNext: () => void;
}

export function GoalScreen({ onNext }: GoalScreenProps) {
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
        <div className="w-60 h-60">
          <video
            src={jumpingVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full  pointer-events-none"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-12"
      >
        <p className="text-gray-600 text-lg max-w-sm mx-auto">
          Feeling overwhelmed doesn’t mean something is wrong with you.
          <br />
          <br />
          <br />
          It often means you’re at a point where something new wants to begin.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-6 mb-12 max-w-sm"
      >
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
        Go ahead
        <ArrowRight className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
