"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Loader2 } from "lucide-react";
import { useState } from "react";

interface Project {
    id: number;
    title: string;
    link?: string;
}

interface ProjectPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project | null;
}

export default function ProjectPreviewModal({ isOpen, onClose, project }: ProjectPreviewModalProps) {
    const [isLoading, setIsLoading] = useState(true);

    if (!isOpen || !project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-6xl h-[85vh] bg-brand-dark border border-white/10 rounded-xl overflow-hidden flex flex-col shadow-2xl"
                    >
                        {/* Overlay Header */}
                        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 pointer-events-none">
                            {/* Title Block */}
                            <div className="bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg pointer-events-auto">
                                <h3 className="text-xl font-bold uppercase text-white tracking-tight">{project.title}</h3>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-3 pointer-events-auto">
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-xs font-mono border border-white/10 transition-colors text-white"
                                >
                                    <span className="hidden md:inline">Open in New Tab</span>
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full bg-black/50 hover:bg-red-500/20 backdrop-blur-md border border-white/10 transition-colors text-white hover:text-red-500 hover:border-red-500/50"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Iframe Container */}
                        <div className="flex-1 relative bg-white w-full">
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center text-brand-dark">
                                    <Loader2 className="w-8 h-8 animate-spin text-brand-dark/30" />
                                </div>
                            )}
                            <iframe
                                src={project.link}
                                className="w-full h-full border-0"
                                onLoad={() => setIsLoading(false)}
                                title={`${project.title} Preview`}
                                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
