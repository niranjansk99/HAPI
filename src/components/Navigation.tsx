import { motion } from 'framer-motion';
import { Home, BookOpen, TrendingUp, User } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'lessons', icon: BookOpen, label: 'Learn' },
    { id: 'progress', icon: TrendingUp, label: 'Progress' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
      <div className="flex justify-around items-center px-4 py-3 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              whileTap={{ scale: 0.9 }}
              className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-colors min-w-[60px]"
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavTab"
                  className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-2xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <motion.div
                animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <item.icon
                  className={`w-6 h-6 relative z-10 transition-colors ${isActive ? 'text-green-600' : 'text-gray-400'
                    }`}
                />
              </motion.div>
              <span
                className={`text-xs relative z-10 transition-colors ${isActive ? 'text-green-600' : 'text-gray-400'
                  }`}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
