"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";

export default function NotFound() {
    return (
        <div className="h-screen w-full bg-brand-dark flex flex-col items-center justify-center relative overflow-hidden text-brand-light">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute top-[20%] left-[20%] w-[30vw] h-[30vw] bg-brand-neon/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-[20%] right-[20%] w-[25vw] h-[25vw] bg-white/5 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="z-10 text-center"
            >
                <h1 className="text-[12rem] font-bold leading-none text-transparent text-outline font-mono">404</h1>
                <h2 className="text-4xl font-bold uppercase tracking-wider mb-6 text-brand-neon">System Malfunction</h2>
                <p className="text-brand-light/60 max-w-md mx-auto mb-12 font-mono">
                    The requested trajectory is invalid. You have drifted into deep space.
                </p>

                <Link href="/">
                    <MagneticButton>
                        <div className="bg-brand-neon text-brand-dark px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white transition-colors">
                            Return to Base
                        </div>
                    </MagneticButton>
                </Link>
            </motion.div>
        </div>
    );
}
