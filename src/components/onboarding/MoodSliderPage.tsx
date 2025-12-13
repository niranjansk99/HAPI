"use client";
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MoodSliderPageProps = {
    value?: number;              // 0..100 controlled
    defaultValue?: number;       // uncontrolled
    onChange?: (value: number) => void;
    title?: string;
    className?: string;
};

const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function colorRamp(v: number) {
    // Apple-ish vibe: red -> orange -> yellow -> green
    // 0 red, 35 orange, 65 yellow, 100 green
    const stops = [
        { p: 0, c: { r: 239, g: 68, b: 68 } },  // red
        { p: 35, c: { r: 249, g: 115, b: 22 } },  // orange
        { p: 65, c: { r: 234, g: 179, b: 8 } },  // yellow
        { p: 100, c: { r: 34, g: 197, b: 94 } },  // green
    ];

    const x = clamp(v, 0, 100);
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
    const bch = Math.round(lerp(a.c.b, b.c.b, t));

    return {
        rgb: `rgb(${r}, ${g}, ${bch})`,
        rgbaSoft: `rgba(${r}, ${g}, ${bch}, 0.18)`,
        rgbaRing: `rgba(${r}, ${g}, ${bch}, 0.35)`,
    };
}

function moodText(v: number) {
    if (v < 15) return { label: "Foul", emoji: "😠" };
    if (v < 35) return { label: "Bad", emoji: "🙁" };
    if (v < 55) return { label: "Okay", emoji: "😐" };
    if (v < 75) return { label: "Good", emoji: "🙂" };
    return { label: "Happy", emoji: "😄" };
}

export function MoodSliderPage({
    value,
    defaultValue = 60,
    onChange,
    title = "Mood",
    className,
}: MoodSliderPageProps) {
    const [internal, setInternal] = useState(clamp(defaultValue, 0, 100));
    const [isDragging, setIsDragging] = useState(false);

    const v = value !== undefined ? clamp(value, 0, 100) : internal;
    const c = useMemo(() => colorRamp(v), [v]);
    const m = useMemo(() => moodText(v), [v]);

    const percent = v; // 0..100

    const setVal = (next: number) => {
        const nv = clamp(next, 0, 100);
        if (value === undefined) setInternal(nv);
        onChange?.(nv);
    };

    return (
        <motion.div
            className={className}
            animate={{ backgroundColor: c.rgbaSoft, borderColor: c.rgbaRing }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            style={{
                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: 22,
                padding: 16,
                maxWidth: 520,
                fontFamily:
                    'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
            }}
        >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                    <div style={{ fontSize: 13, opacity: 0.75, marginBottom: 4 }}>{title}</div>

                    <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={m.label}
                                initial={{ y: 6, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -6, opacity: 0 }}
                                transition={{ duration: 0.18 }}
                                style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.4 }}
                            >
                                {m.label}
                            </motion.div>
                        </AnimatePresence>

                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={m.emoji}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.18 }}
                                style={{ fontSize: 24 }}
                            >
                                {m.emoji}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <motion.div
                    animate={{ color: c.rgb }}
                    transition={{ type: "spring", stiffness: 220, damping: 26 }}
                    style={{
                        fontSize: 13,
                        fontWeight: 700,
                        padding: "6px 10px",
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.75)",
                        border: "1px solid rgba(0,0,0,0.08)",
                        alignSelf: "flex-start",
                    }}
                >
                    {v}/100
                </motion.div>
            </div>

            {/* Track */}
            <div style={{ marginTop: 14, position: "relative" }}>
                <div
                    style={{
                        height: 16,
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.55)",
                        border: "1px solid rgba(0,0,0,0.08)",
                        overflow: "hidden",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        boxShadow: "0 8px 22px rgba(0,0,0,0.08) inset",
                    }}
                >
                    {/* Filled portion (smooth color) */}
                    <motion.div
                        animate={{ width: `${percent}%`, backgroundColor: c.rgb }}
                        transition={{ type: "spring", stiffness: 240, damping: 28 }}
                        style={{ height: "100%" }}
                    />
                </div>

                {/* Thumb (animated like Apple Health) */}
                <motion.div
                    animate={{
                        left: `calc(${percent}% - 14px)`,
                        scale: isDragging ? 1.18 : 1,
                        boxShadow: isDragging
                            ? "0 10px 30px rgba(0,0,0,0.18)"
                            : "0 8px 22px rgba(0,0,0,0.14)",
                        borderColor: c.rgbaRing,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 26 }}
                    style={{
                        position: "absolute",
                        top: -6,
                        width: 28,
                        height: 28,
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.95)",
                        borderWidth: 2,
                        borderStyle: "solid",
                        display: "grid",
                        placeItems: "center",
                        pointerEvents: "none", // thumb follows input; actual input is invisible on top
                    }}
                >
                    <motion.div
                        animate={{ backgroundColor: c.rgb }}
                        transition={{ type: "spring", stiffness: 220, damping: 26 }}
                        style={{ width: 10, height: 10, borderRadius: 999 }}
                    />
                </motion.div>

                {/* Invisible range input on top */}
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={v}
                    onChange={(e) => setVal(Number(e.target.value))}
                    onPointerDown={() => setIsDragging(true)}
                    onPointerUp={() => setIsDragging(false)}
                    onPointerCancel={() => setIsDragging(false)}
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: 28,
                        opacity: 0,
                        cursor: "pointer",
                    }}
                    aria-label="Mood slider"
                />

                {/* Ends */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 10,
                        fontSize: 12,
                        opacity: 0.7,
                    }}
                >
                    <span>Foul</span>
                    <span>Happy</span>
                </div>
            </div>
        </motion.div>
    );
}