import { motion } from 'framer-motion';
import { ArrowLeft, Gem, Shield, Zap, Star, Heart, Crown } from 'lucide-react';
import { useState } from 'react';

interface ShopProps {
  onNavigate: (page: string) => void;
  userStats: any;
  setUserStats: (stats: any) => void;
}

export function Shop({ onNavigate, userStats, setUserStats }: ShopProps) {
  const [showPurchase, setShowPurchase] = useState(false);
  const [purchasedItem, setPurchasedItem] = useState<any>(null);

  const shopItems = [
    {
      id: 1,
      icon: Shield,
      name: 'Streak Freeze',
      description: 'Protect your streak for 1 day',
      price: 50,
      color: 'from-blue-400 to-cyan-400',
      emoji: '❄️'
    },
    {
      id: 2,
      icon: Heart,
      name: 'Refill Hearts',
      description: 'Get unlimited hearts for 24hrs',
      price: 100,
      color: 'from-red-400 to-pink-400',
      emoji: '❤️'
    },
    {
      id: 3,
      icon: Zap,
      name: 'XP Boost',
      description: 'Double XP for 2 hours',
      price: 75,
      color: 'from-yellow-400 to-orange-400',
      emoji: '⚡'
    },
    {
      id: 4,
      icon: Star,
      name: 'Legendary Status',
      description: 'Special badge for 7 days',
      price: 200,
      color: 'from-purple-400 to-pink-400',
      emoji: '⭐'
    },
    {
      id: 5,
      icon: Crown,
      name: 'Premium Avatar',
      description: 'Unlock exclusive avatars',
      price: 150,
      color: 'from-yellow-500 to-orange-500',
      emoji: '👑'
    },
    {
      id: 6,
      icon: Gem,
      name: 'Gem Pack',
      description: 'Get 500 extra gems',
      price: 300,
      color: 'from-indigo-400 to-purple-400',
      emoji: '💎'
    }
  ];

  const handlePurchase = (item: any) => {
    if (userStats.gems >= item.price) {
      setUserStats({
        ...userStats,
        gems: userStats.gems - item.price
      });
      setPurchasedItem(item);
      setShowPurchase(true);
      setTimeout(() => setShowPurchase(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-20 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 pt-8 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate('home')}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </motion.button>
            <h1 className="text-white">Shop</h1>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
            <Gem className="w-5 h-5 text-yellow-300" />
            <span className="text-white">{userStats.gems}</span>
          </div>
        </div>
        <p className="text-purple-100">Use gems to get power-ups</p>
      </div>

      <main className="flex-1 px-6 py-8">
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {shopItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="relative"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePurchase(item)}
                disabled={userStats.gems < item.price}
                className={`w-full bg-gradient-to-br ${item.color} rounded-3xl p-5 shadow-lg flex flex-col items-center text-white ${userStats.gems < item.price ? 'opacity-50' : ''
                  }`}
              >
                <div className="text-5xl mb-3">{item.emoji}</div>
                <h3 className="text-sm mb-2 text-center">{item.name}</h3>
                <p className="text-xs text-white/80 mb-3 text-center">{item.description}</p>
                <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                  <Gem className="w-4 h-4" />
                  <span className="text-sm">{item.price}</span>
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {showPurchase && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-24 left-0 right-0 px-6"
          >
            <div className="bg-green-500 text-white px-6 py-4 rounded-2xl shadow-xl text-center max-w-md mx-auto">
              <div className="text-3xl mb-2">{purchasedItem.emoji}</div>
              <div>Purchased {purchasedItem.name}!</div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
