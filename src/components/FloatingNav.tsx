'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function FloatingNav() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="fixed bottom-6 right-6 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-50 flex flex-col gap-4"
        >
            <Link
                href="/ai-notes"
                className="group flex items-center gap-3"
            >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-brand-light text-sm font-mono uppercase tracking-wider whitespace-nowrap bg-black/50 px-3 py-1.5 rounded-full border border-brand-neon/30">
                    AI Notes
                </span>
                <div className="relative">
                    {/* Notification pulse ring */}
                    <div className="absolute inset-0 rounded-full bg-brand-neon/20 animate-ping" />

                    {/* Outer glow */}
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-brand-neon/30 to-green-400/30 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Main button */}
                    <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-brand-neon/20 to-brand-neon/5 border-2 border-brand-neon/50 flex items-center justify-center backdrop-blur-md transition-all duration-300 group-hover:border-brand-neon group-hover:shadow-[0_0_30px_rgba(200,255,0,0.4)] group-hover:scale-110">
                        <Sparkles className="w-6 h-6 text-brand-neon transition-transform duration-300 group-hover:rotate-12" />
                    </div>

                    {/* Notification badge */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-neon flex items-center justify-center shadow-[0_0_10px_rgba(200,255,0,0.6)]">
                        <span className="text-[10px] font-bold text-black">!</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
