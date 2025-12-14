import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface Option {
    id: string;
    label: string;
    desc: string;
    icon: any;
    color: string;
    recommended?: boolean;
}

interface SelectionScreenProps {
    onNext: () => void;
    onBack: () => void;
    headline: string;
    subline: string;
    options: Option[];
    selectedValues: string | string[];
    onSelect: (value: string | string[]) => void;
    multiSelect?: boolean;
    buttonText?: string;
    topIcon?: React.ReactNode;
}

export function SelectionScreen({
    onNext,
    onBack,
    headline,
    subline,
    options,
    selectedValues,
    onSelect,
    multiSelect = false,
    buttonText = "Continue",
    topIcon
}: SelectionScreenProps) {

    const handleSelect = (id: string) => {
        if (multiSelect) {
            const current = Array.isArray(selectedValues) ? selectedValues : [];
            if (current.includes(id)) {
                onSelect(current.filter(v => v !== id));
            } else {
                onSelect([...current, id]);
            }
        } else {
            onSelect(id);
        }
    };

    const isSelected = (id: string) => {
        if (multiSelect) {
            return Array.isArray(selectedValues) && selectedValues.includes(id);
        }
        return selectedValues === id;
    };

    const hasSelection = multiSelect
        ? Array.isArray(selectedValues) && selectedValues.length > 0
        : Boolean(selectedValues);

    return (
        <div className="min-h-screen flex flex-col px-6 py-12 relative">
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onBack}
                className="absolute top-12 left-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md z-10"
            >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
            </motion.button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
            >
                {topIcon && (
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 1
                        }}
                        className="text-5xl mb-4"
                    >
                        {topIcon}
                    </motion.div>
                )}
                <h1 className="mb-3">{headline}</h1>
                <p className="text-gray-600">{subline}</p>
            </motion.div>

            <div className="flex-1 max-w-md mx-auto w-full">
                <div className="space-y-4 mb-8">
                    {options.map((option, index) => {
                        const selected = isSelected(option.id);
                        return (
                            <motion.button
                                key={option.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                                whileHover={{ scale: 1.03, x: 5 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => handleSelect(option.id)}
                                className={`relative w-full rounded-3xl p-5 shadow-lg transition-all flex items-center gap-4 ${selected
                                    ? `bg-gradient-to-r ${option.color} ring-4 ring-green-400`
                                    : 'bg-white'
                                    }`}
                            >
                                {option.recommended && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute -top-3 right-4 bg-yellow-400 text-yellow-900 text-xs px-3 py-1 rounded-full shadow-md"
                                    >
                                        ⭐ Recommended
                                    </motion.div>
                                )}
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${selected ? 'bg-white/20' : 'bg-gray-100'
                                    }`}>
                                    <option.icon className={`w-7 h-7 ${selected ? 'text-black' : 'text-gray-600'
                                        }`} />
                                </div>
                                <div className="flex-1 text-left">
                                    <div className={`mb-1 ${selected ? 'text-black font-medium' : 'text-gray-800'
                                        }`}>
                                        {option.label}
                                    </div>
                                    <div className={`text-sm ${selected ? 'text-black/70' : 'text-gray-500'
                                        }`}>
                                        {option.desc}
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: hasSelection ? 1 : 0.5, y: 0 }}
                    whileHover={hasSelection ? { scale: 1.05 } : {}}
                    whileTap={hasSelection ? { scale: 0.95 } : {}}
                    onClick={onNext}
                    disabled={!hasSelection}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-5 rounded-full shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
                >
                    {buttonText}
                    <ArrowRight className="w-6 h-6" />
                </motion.button>
            </div>
        </div>
    );
}
