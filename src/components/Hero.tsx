"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function Hero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <section className="relative h-[100dvh] w-full flex flex-col justify-center md:justify-between items-center overflow-hidden py-12 md:py-12 gap-12 md:gap-0">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[50vw] md:w-[30vw] h-[50vw] md:h-[30vw] bg-brand-neon/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-[20%] right-[10%] w-[40vw] md:w-[25vw] h-[40vw] md:h-[25vw] bg-white/5 rounded-full blur-3xl" />
            </div>

            {/* Spacer for centering */}
            <div className="flex-1 flex items-center justify-center z-10 text-center px-4 mix-blend-difference">
                <div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-brand-neon font-mono tracking-widest uppercase text-xs md:text-sm lg:text-base mb-4 md:mb-6"
                    >
                        Product Builder | Marketing Technologist <br className="md:hidden" />
                        <span className="text-brand-light/50 text-[10px] md:text-xs normal-case block md:inline md:ml-2 mt-1 md:mt-0">
                            Kuala Lumpur, Malaysia
                        </span>
                    </motion.p>

                    <motion.h1
                        style={{ y: y1 }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-[13vw] md:text-[12vw] leading-[0.85] font-bold tracking-tighter text-brand-light uppercase select-none"
                    >
                        Alfahad
                        <br />
                        <span className="text-outline text-transparent stroke-white/20">Niloy</span>
                    </motion.h1>
                </div>
            </div>

            <MagneticButton>
                <motion.div
                    style={{ y: y2 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="flex flex-col items-center gap-2 text-brand-light/50 cursor-pointer"
                >
                    <span className="text-[10px] md:text-xs uppercase tracking-widest">Scroll</span>
                    <ArrowDown className="w-3 h-3 md:w-4 md:h-4 animate-bounce" />
                </motion.div>
            </MagneticButton>
        </section>
    );
}
