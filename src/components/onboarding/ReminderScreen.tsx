import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Bell, BellOff } from 'lucide-react';
import { useState } from 'react';

interface ReminderScreenProps {
  onNext: () => void;
  onBack: () => void;
  userData: any;
  updateUserData: (key: string, value: string) => void;
}

export function ReminderScreen({ onNext, onBack, userData, updateUserData }: ReminderScreenProps) {
  const [enableReminders, setEnableReminders] = useState(true);
  const [selectedTime, setSelectedTime] = useState('18:00');

  const timeSlots = [
    { time: '08:00', label: 'Morning', emoji: '🌅' },
    { time: '12:00', label: 'Lunch', emoji: '☀️' },
    { time: '18:00', label: 'Evening', emoji: '🌆' },
    { time: '21:00', label: 'Night', emoji: '🌙' }
  ];

  const handleContinue = () => {
    updateUserData('reminderTime', enableReminders ? selectedTime : 'none');
    onNext();
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
            rotate: [0, 15, -15, 0],
            scale: [1, 1.1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 2
          }}
          className="text-5xl mb-4"
        >
          🔔
        </motion.div>
        <h1 className="mb-3">Practice reminders?</h1>
        <p className="text-gray-600">Get a gentle nudge to practice daily</p>
      </motion.div>

      <div className="flex-1 max-w-md mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                enableReminders ? 'bg-gradient-to-br from-green-400 to-green-500' : 'bg-gray-200'
              }`}>
                {enableReminders ? (
                  <Bell className="w-6 h-6 text-white" />
                ) : (
                  <BellOff className="w-6 h-6 text-gray-500" />
                )}
              </div>
              <div>
                <div className="text-gray-800">Daily Reminders</div>
                <div className="text-sm text-gray-500">Stay on track</div>
              </div>
            </div>
            <button
              onClick={() => setEnableReminders(!enableReminders)}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                enableReminders ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <motion.div
                animate={{ x: enableReminders ? 24 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
              />
            </button>
          </div>

          {enableReminders && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-3"
            >
              {timeSlots.map((slot, index) => (
                <motion.button
                  key={slot.time}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTime(slot.time)}
                  className={`w-full p-4 rounded-2xl transition-all flex items-center justify-between ${
                    selectedTime === slot.time
                      ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                      : 'bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{slot.emoji}</span>
                    <span>{slot.label}</span>
                  </div>
                  <span className={selectedTime === slot.time ? 'text-white' : 'text-gray-500'}>
                    {slot.time}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleContinue}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-5 rounded-full shadow-lg flex items-center justify-center gap-3"
        >
          Continue
          <ArrowRight className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
}
