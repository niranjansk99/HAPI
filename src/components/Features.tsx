import { motion } from 'framer-motion';
import { Star, Shield, Rocket, Users, Palette, Globe } from 'lucide-react';
import { Navigation } from './Navigation';

interface FeaturesProps {
  onNavigate: (page: string) => void;
}

export function Features({ onNavigate }: FeaturesProps) {
  const features = [
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'Crafted with attention to every detail',
      color: 'from-yellow-400 to-orange-400'
    },
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'Your data is protected with care',
      color: 'from-green-400 to-emerald-400'
    },
    {
      icon: Rocket,
      title: 'Lightning Fast',
      description: 'Optimized for speed and performance',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by users, for users',
      color: 'from-purple-400 to-pink-400'
    },
    {
      icon: Palette,
      title: 'Beautiful Design',
      description: 'Aesthetics that inspire and delight',
      color: 'from-pink-400 to-rose-400'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Available anywhere, anytime',
      color: 'from-indigo-400 to-purple-400'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage="features" onNavigate={onNavigate} />

      <main className="flex-1 px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Amazing Features
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Everything you need, beautifully designed
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
