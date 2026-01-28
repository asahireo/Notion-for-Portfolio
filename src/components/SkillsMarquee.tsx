"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkillsMarqueeProps {
    items: string[];
    direction?: "left" | "right";
    speed?: number;
    className?: string;
}

export default function SkillsMarquee({
    items,
    direction = "left",
    speed = 20,
    className,
}: SkillsMarqueeProps) {
    return (
        <div className={cn("relative flex overflow-hidden group", className)}>
            {/* Gradient Masks */}
            <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-brand-dark to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-brand-dark to-transparent z-10 pointer-events-none" />

            {/* Marquee Container */}
            <motion.div
                initial={{ x: direction === "left" ? 0 : "-100%" }}
                animate={{ x: direction === "left" ? "-100%" : 0 }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="flex flex-shrink-0 gap-4 py-2"
            >
                {/* First Set */}
                {items.map((item, i) => (
                    <SkillTag key={`a-${i}`} text={item} />
                ))}
                {/* Duplicate Set for Loop */}
                {items.map((item, i) => (
                    <SkillTag key={`b-${i}`} text={item} />
                ))}
                {/* Triplicate Set for safety on wide screens */}
                {items.map((item, i) => (
                    <SkillTag key={`c-${i}`} text={item} />
                ))}
            </motion.div>

            {/* Second Marquee Container (Identical copy for seamless loop) */}
            <motion.div
                initial={{ x: direction === "left" ? 0 : "-100%" }}
                animate={{ x: direction === "left" ? "-100%" : 0 }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="flex flex-shrink-0 gap-4 py-2"
            >
                {items.map((item, i) => (
                    <SkillTag key={`d-${i}`} text={item} />
                ))}
                {items.map((item, i) => (
                    <SkillTag key={`e-${i}`} text={item} />
                ))}
                {items.map((item, i) => (
                    <SkillTag key={`f-${i}`} text={item} />
                ))}
            </motion.div>
        </div>
    );
}

function SkillTag({ text }: { text: string }) {
    return (
        <div className="
            relative px-4 py-2 
            bg-white/5 border border-white/10 rounded-full 
            backdrop-blur-sm
            text-sm text-brand-light/80 font-mono whitespace-nowrap
            transition-all duration-300
            hover:border-brand-neon hover:text-brand-neon hover:shadow-[0_0_15px_rgba(210,255,0,0.3)]
            cursor-default
        ">
            {text}
        </div>
    );
}
