import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";

interface MoodScreenProps {
    onNext: () => void;
    onBack: () => void;
    userData: any;
    updateUserData: (key: string, value: any) => void; // mood is number
}

const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function ramp(value: number) {
    // Apple-ish: red -> orange -> yellow -> green
    const stops = [
        { p: 0, c: { r: 239, g: 68, b: 68 } },     // red
        { p: 35, c: { r: 249, g: 115, b: 22 } },   // orange
        { p: 65, c: { r: 234, g: 179, b: 8 } },    // yellow
        { p: 100, c: { r: 34, g: 197, b: 94 } },   // green
    ];

    const x = clamp(value, 0, 100);
    let a = stops[0], b = stops[stops.length - 1];

    for (let i = 0; i < stops.length - 1; i++) {
        if (x >= stops[i].p && x <= stops[i + 1].p) {
            a = stops[i];
            b = stops[i + 1];
            break;
        }
    }
    const t = (x - a.p) / (b.p - a.p || 1);
    const r = Math.round(lerp(a.c.r, b.c.r, t));
    const g = Math.round(lerp(a.c.g, b.c.g, t));
    const bl = Math.round(lerp(a.c.b, b.c.b, t));

    return {
        rgb: `rgb(${r}, ${g}, ${bl})`,
        soft: `rgba(${r}, ${g}, ${bl}, 0.16)`,
        ring: `rgba(${r}, ${g}, ${bl}, 0.35)`,
    };
}

function moodLabel(v: number) {
    if (v < 15) return { label: "Foul", emoji: "😠" };
    if (v < 35) return { label: "Bad", emoji: "🙁" };
    if (v < 55) return { label: "Okay", emoji: "😐" };
    if (v < 75) return { label: "Good", emoji: "🙂" };
    return { label: "Happy", emoji: "😄" };
}

export function MoodScreen({ onNext, onBack, userData, updateUserData }: MoodScreenProps) {
    const initial = typeof userData?.mood === "number" ? userData.mood : 65;
    const [mood, setMood] = useState<number>(clamp(initial, 0, 100));
    const [dragging, setDragging] = useState(false);

    const colors = useMemo(() => ramp(mood), [mood]);
    const meta = useMemo(() => moodLabel(mood), [mood]);

    const percent = mood;

    const handleContinue = () => {
        updateUserData("mood", mood);
        onNext();
    };

    return (
        <div className="min-h-screen flex flex-col px-6 py-12">
            {/* Back */}
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

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
            >
                <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="text-5xl mb-4"
                >
                    {meta.emoji}
                </motion.div>
                <h1 className="mb-3">How’s your mood right now?</h1>
                <p className="text-gray-600">Slide from foul to happy — the color adapts as you move</p>
            </motion.div>

            {/* Content */}
            <div className="flex-1 max-w-md mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-3xl p-6 shadow-lg mb-6"
                >
                    {/* Apple-ish “pill” label */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <motion.div
                                animate={{ backgroundColor: colors.rgb }}
                                transition={{ type: "spring", stiffness: 220, damping: 26 }}
                                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm"
                            >
                                <span className="text-xl">{meta.emoji}</span>
                            </motion.div>

                            <div>
                                <div className="text-gray-800 font-medium">Current Mood</div>
                                <motion.div
                                    key={meta.label}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.18 }}
                                    className="text-sm text-gray-500"
                                >
                                    {meta.label}
                                </motion.div>
                            </div>
                        </div>

                        <motion.div
                            animate={{ color: colors.rgb, borderColor: colors.ring, backgroundColor: colors.soft }}
                            transition={{ type: "spring", stiffness: 220, damping: 26 }}
                            className="text-sm font-semibold px-3 py-1 rounded-full border"
                        >
                            {mood}/100
                        </motion.div>
                    </div>

                    {/* Slider (Apple Health feel) */}
                    <motion.div
                        animate={{ backgroundColor: colors.soft, borderColor: colors.ring }}
                        transition={{ type: "spring", stiffness: 220, damping: 26 }}
                        className="rounded-2xl border p-4"
                    >
                        <div className="relative">
                            {/* Track */}
                            <div className="h-4 rounded-full bg-white/70 border border-black/10 overflow-hidden backdrop-blur-sm shadow-inner">
                                <motion.div
                                    animate={{ width: `${percent}%`, backgroundColor: colors.rgb }}
                                    transition={{ type: "spring", stiffness: 260, damping: 28 }}
                                    className="h-full"
                                />
                            </div>

                            {/* Thumb */}
                            <motion.div
                                animate={{
                                    left: `calc(${percent}% - 14px)`,
                                    scale: dragging ? 1.18 : 1,
                                    borderColor: colors.ring,
                                }}
                                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                                className="absolute -top-2 w-7 h-7 rounded-full bg-white border-2 shadow-lg flex items-center justify-center pointer-events-none"
                            >
                                <motion.div
                                    animate={{ backgroundColor: colors.rgb }}
                                    transition={{ type: "spring", stiffness: 220, damping: 26 }}
                                    className="w-2.5 h-2.5 rounded-full"
                                />
                            </motion.div>

                            {/* Invisible input */}
                            <input
                                type="range"
                                min={0}
                                max={100}
                                value={mood}
                                onChange={(e) => setMood(Number(e.target.value))}
                                onPointerDown={() => setDragging(true)}
                                onPointerUp={() => setDragging(false)}
                                onPointerCancel={() => setDragging(false)}
                                className="absolute inset-0 w-full h-7 opacity-0 cursor-pointer"
                                aria-label="Mood slider"
                            />
                        </div>

                        <div className="flex justify-between mt-3 text-xs text-gray-500">
                            <span>Foul</span>
                            <span>Happy</span>
                        </div>
                    </motion.div>

                    {/* Small “feedback” row like Health */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.45 }}
                        className="mt-5 flex items-center justify-between text-sm text-gray-600"
                    >
                        <span className="opacity-80">You selected</span>
                        <motion.span
                            animate={{ color: colors.rgb }}
                            transition={{ type: "spring", stiffness: 220, damping: 26 }}
                            className="font-semibold"
                        >
                            {meta.label}
                        </motion.span>
                    </motion.div>
                </motion.div>

                {/* Continue */}
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
