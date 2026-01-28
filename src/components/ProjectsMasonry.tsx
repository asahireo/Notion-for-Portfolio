"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import ProjectPreviewModal from "./ProjectPreviewModal";

import { projects } from "@/data/projects";

export default function ProjectsMasonry() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    return (
        <section className="py-24 px-4 md:px-12 w-full max-w-7xl mx-auto">
            <ProjectPreviewModal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                project={selectedProject}
            />

            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
                <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                    Selected <span className="text-brand-neon">Works</span>
                </h2>
                <p className="text-brand-light/60 max-w-sm text-sm md:text-right mt-4 md:mt-0 font-mono">
                    A collection of high-performance websites and applications built for scale.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {projects.map((project, i) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2, duration: 0.8 }}
                        className={`group relative ${project.className || ""}`}
                    >
                        <div
                            onClick={() => setSelectedProject(project)}
                            className="block cursor-pointer"
                        >
                            <div className="relative overflow-hidden aspect-[4/5] bg-white/5 border border-white/10 transition-all duration-500 group-hover:border-brand-neon/50">
                                <div className="absolute inset-0 bg-brand-neon/0 group-hover:bg-brand-neon/10 transition-colors duration-500 z-10" />
                                {/* Image Placeholder */}
                                <div className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110" style={{ backgroundImage: `url(${project.image})` }} />

                                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-10 h-10 bg-brand-neon rounded-full flex items-center justify-center text-brand-dark">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-between items-start">
                                <div>
                                    <span className="text-brand-neon font-mono text-xs uppercase tracking-widest block mb-1">
                                        {project.category}
                                    </span>
                                    <h3 className="text-xl font-bold uppercase">{project.title}</h3>
                                </div>
                                <span className="font-mono text-xs text-brand-light/40">0{project.id}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
