'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface NoteCardProps {
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    slug: string;
    index: number;
}

export default function NoteCard({
    title,
    date,
    excerpt,
    tags,
    slug,
    index,
}: NoteCardProps) {
    // Format date
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <Link href={`/ai-notes/${slug}`} className="block h-full">
            <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer h-full"
            >
                <div className="relative h-full overflow-hidden rounded-2xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 transition-all duration-500 hover:bg-white/[0.06] hover:border-brand-neon/40 hover:shadow-[0_0_50px_rgba(210,255,0,0.1)] flex flex-col">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-neon/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col flex-grow">
                        {/* Date & Tags */}
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="font-mono text-xs text-brand-light/40 uppercase tracking-wider">
                                {formattedDate}
                            </span>
                            {tags.length > 0 && (
                                <>
                                    <span className="text-brand-light/20">•</span>
                                    <div className="flex flex-wrap gap-2">
                                        {tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-brand-neon/5 text-brand-neon/80 border border-brand-neon/20 group-hover:bg-brand-neon/10 group-hover:text-brand-neon transition-colors duration-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Title */}
                        <h2 className="text-xl sm:text-2xl font-bold text-brand-light mb-4 group-hover:text-brand-neon transition-colors duration-300 leading-tight">
                            {title}
                        </h2>

                        {/* Excerpt */}
                        {excerpt && (
                            <p className="text-brand-light/50 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                {excerpt}
                            </p>
                        )}

                        {/* Read More Link */}
                        <div className="flex items-center gap-2 text-brand-neon text-xs font-mono uppercase tracking-widest opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            Read Note
                            <svg
                                className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>

                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-neon/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-[4rem]" />
                </div>
            </motion.article>
        </Link>
    );
}
