import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Star, Zap, Heart } from 'lucide-react';
import { useState } from 'react';

interface LessonDetailProps {
  onNavigate: (page: string) => void;
  lesson: any;
  userStats: any;
  setUserStats: (stats: any) => void;
}

export function LessonDetail({ onNavigate, lesson, userStats, setUserStats }: LessonDetailProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [lives, setLives] = useState(3);

  const questions = [
    {
      question: 'What does "Hello" mean?',
      answers: ['Goodbye', 'Hi', 'Thank you', 'Please'],
      correct: 1,
      emoji: '👋'
    },
    {
      question: 'Choose the correct translation of "Good morning"',
      answers: ['Buenos días', 'Buenas noches', 'Buenas tardes', 'Adiós'],
      correct: 0,
      emoji: '🌅'
    },
    {
      question: 'What is "Thank you" in Spanish?',
      answers: ['Por favor', 'De nada', 'Gracias', 'Hola'],
      correct: 2,
      emoji: '🙏'
    }
  ];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    
    setTimeout(() => {
      const isCorrect = index === questions[currentQuestion].correct;
      
      if (isCorrect) {
        setScore(score + 1);
      } else {
        setLives(lives - 1);
      }

      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
        } else {
          const earnedXP = score * 20 + 30;
          setUserStats({
            ...userStats,
            points: userStats.points + earnedXP,
            completedLessons: userStats.completedLessons + 1
          });
          setShowResult(true);
        }
      }, 1000);
    }, 500);
  };

  if (showResult) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br from-green-50 to-blue-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-8 shadow-xl text-center max-w-md w-full"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: 2 }}
            className="text-7xl mb-4"
          >
            {score === questions.length ? '🎉' : score >= 2 ? '⭐' : '💪'}
          </motion.div>
          <h2 className="text-gray-800 mb-2">
            {score === questions.length ? 'Perfect!' : score >= 2 ? 'Great Job!' : 'Keep Practicing!'}
          </h2>
          <p className="text-gray-600 mb-6">
            You got {score} out of {questions.length} correct
          </p>
          
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 mb-6">
            <div className="text-white text-4xl mb-2">+{score * 20 + 30} XP</div>
            <div className="flex justify-center gap-1">
              {[...Array(3)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < score ? 'fill-white text-white' : 'text-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('lessons')}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-2xl shadow-lg"
          >
            Continue
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-blue-50">
      <div className={`bg-gradient-to-r ${lesson?.color || 'from-green-400 to-green-500'} px-6 pt-8 pb-6`}>
        <div className="flex items-center justify-between mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onNavigate('lessons')}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          
          <div className="flex gap-2">
            {[...Array(lives)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Heart className="w-6 h-6 fill-red-500 text-red-500" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-2">
          <div className="flex justify-between text-white text-sm mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <motion.div
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              className="bg-white h-full rounded-full"
            />
          </div>
        </div>
      </div>

      <main className="flex-1 px-6 py-8 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 flex flex-col"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-7xl text-center mb-8"
            >
              {questions[currentQuestion].emoji}
            </motion.div>

            <h2 className="text-gray-800 text-center mb-8">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-4 max-w-md mx-auto w-full">
              {questions[currentQuestion].answers.map((answer, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === questions[currentQuestion].correct;
                const showFeedback = selectedAnswer !== null;

                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={!showFeedback ? { scale: 1.02 } : {}}
                    whileTap={!showFeedback ? { scale: 0.98 } : {}}
                    onClick={() => !showFeedback && handleAnswer(index)}
                    disabled={showFeedback}
                    className={`w-full p-4 rounded-2xl border-2 transition-all ${
                      showFeedback
                        ? isCorrect
                          ? 'bg-green-100 border-green-500'
                          : isSelected
                          ? 'bg-red-100 border-red-500'
                          : 'bg-white border-gray-200'
                        : 'bg-white border-gray-200 hover:border-green-400'
                    }`}
                  >
                    <span className={`${
                      showFeedback
                        ? isCorrect
                          ? 'text-green-700'
                          : isSelected
                          ? 'text-red-700'
                          : 'text-gray-600'
                        : 'text-gray-700'
                    }`}>
                      {answer}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
