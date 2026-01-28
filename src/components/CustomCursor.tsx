"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [clicked, setClicked] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        const addEventListeners = () => {
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mousedown", onMouseDown);
            document.addEventListener("mouseup", onMouseUp);
            document.addEventListener("mouseenter", onMouseEnter);
            document.addEventListener("mouseleave", onMouseLeave);
        };

        const removeEventListeners = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("mouseenter", onMouseEnter);
            document.removeEventListener("mouseleave", onMouseLeave);
        };

        const onMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const onMouseDown = () => {
            setClicked(true);
        };

        const onMouseUp = () => {
            setClicked(false);
        };

        const onMouseLeave = () => {
            setIsHidden(true);
        };

        const onMouseEnter = () => {
            setIsHidden(false);
        };

        addEventListeners();
        return () => removeEventListeners();
    }, []);

    return (
        <>
            <div className={`fixed top-0 left-0 w-full h-full pointer-events-none z-[10000] hidden md:block overflow-hidden`}>
                {/* Main Cursor Dot */}
                <motion.div
                    className="absolute w-2 h-2 bg-brand-neon rounded-full"
                    style={{ x: position.x - 4, y: position.y - 4 }}
                    animate={{ scale: clicked ? 0.8 : 1 }}
                    transition={{ duration: 0.1 }}
                />

                {/* Trailing Ring */}
                <motion.div
                    className="absolute w-8 h-8 border border-brand-neon/50 rounded-full"
                    animate={{
                        x: position.x - 16,
                        y: position.y - 16,
                        scale: clicked ? 1.5 : 1,
                        opacity: isHidden ? 0 : 1,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 15,
                        mass: 0.5
                    }}
                />
            </div>
            <style jsx global>{`
        @media (min-width: 768px) {
          body {
            cursor: none;
          }
          a, button {
            cursor: none;
          }
        }
      `}</style>
        </>
    );
}
