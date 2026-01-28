"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev === 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 20);

        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ y: 0 }}
                    exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                    className="fixed inset-0 z-[10001] bg-black flex items-center justify-center overflow-hidden"
                >
                    <div className="flex flex-col items-center">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-brand-neon font-mono text-xs tracking-widest mb-4 uppercase"
                        >
                            System Initializing
                        </motion.p>
                        <div className="text-[15vw] font-bold leading-none text-brand-light font-mono tabular-nums">
                            {count}%
                        </div>
                        <div className="w-64 h-1 bg-white/10 mt-8 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-brand-neon"
                                style={{ width: `${count}%` }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
