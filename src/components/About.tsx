import { motion } from 'framer-motion';
import { Heart, Target, Award } from 'lucide-react';
import { Navigation } from './Navigation';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export function About({ onNavigate }: AboutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage="about" onNavigate={onNavigate} />

      <main className="flex-1 px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-10">
            <h1 className="mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              About Us
            </h1>
            <p className="text-gray-600">
              Building beautiful experiences with passion
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mb-6 shadow-sm"
          >
            <p className="text-gray-700 leading-relaxed mb-4">
              We believe in the power of gentle design. Every pixel, every interaction,
              every moment is crafted to bring joy and simplicity to your daily life.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to create digital experiences that feel natural,
              intuitive, and delightful.
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              { icon: Heart, title: 'Our Values', text: 'Care, quality, and user happiness' },
              { icon: Target, title: 'Our Mission', text: 'Make technology more human' },
              { icon: Award, title: 'Our Goal', text: 'Excellence in every detail' }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 flex items-center gap-4 shadow-sm"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
