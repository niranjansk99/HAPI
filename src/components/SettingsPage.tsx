import { motion } from 'motion/react';
import { ArrowLeft, Bell, Volume2, Globe, Moon, Lock, HelpCircle, Info, LogOut } from 'lucide-react';
import { useState } from 'react';

interface SettingsPageProps {
  onNavigate: (page: string) => void;
}

export function SettingsPage({ onNavigate }: SettingsPageProps) {
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const settingsSections = [
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Push Notifications', value: notifications, onChange: setNotifications, type: 'toggle' },
        { icon: Volume2, label: 'Sound Effects', value: sound, onChange: setSound, type: 'toggle' },
        { icon: Moon, label: 'Dark Mode', value: darkMode, onChange: setDarkMode, type: 'toggle' }
      ]
    },
    {
      title: 'Account',
      items: [
        { icon: Globe, label: 'Language', value: 'English', type: 'link' },
        { icon: Lock, label: 'Privacy', value: '', type: 'link' }
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', value: '', type: 'link' },
        { icon: Info, label: 'About', value: 'v1.0.0', type: 'link' }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col pb-20 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 pt-8 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onNavigate('profile')}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          <h1 className="text-white">Settings</h1>
        </div>
        <p className="text-blue-100">Customize your learning experience</p>
      </div>

      <main className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <h3 className="text-gray-800 mb-3">{section.title}</h3>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                {section.items.map((item, index) => (
                  <div key={item.label}>
                    {index > 0 && <div className="border-t border-gray-100 mx-4" />}
                    <motion.div
                      whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                      className="px-4 py-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-gray-700">{item.label}</span>
                      </div>
                      {item.type === 'toggle' && (
                        <button
                          onClick={() => item.onChange && item.onChange(!item.value)}
                          className={`w-14 h-8 rounded-full transition-colors relative ${
                            item.value ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        >
                          <motion.div
                            animate={{ x: item.value ? 24 : 2 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                          />
                        </button>
                      )}
                      {item.type === 'link' && (
                        <span className="text-gray-400 text-sm">{item.value || '›'}</span>
                      )}
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-red-500 text-white rounded-2xl p-4 shadow-md flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </motion.button>
        </div>
      </main>
    </div>
  );
}
