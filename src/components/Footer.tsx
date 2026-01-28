'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/al-fahad-niloy/' },
        { name: 'TikTok', url: 'https://www.tiktok.com/@al.fahad.niloy?lang=en' },
        { name: 'Instagram', url: 'https://www.instagram.com/alfahadniloy/' },
        { name: 'Email', url: 'mailto:alfahadniloy@gmail.com' },
    ];

    const quickLinks = [
        { name: 'Home', url: '/' },
        { name: 'Projects', url: '/#projects' },
        { name: 'AI Notes', url: '/ai-notes' },
        { name: 'Contact', url: '/#contact' },
    ];

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <footer className="w-full bg-black/40 border-t border-white/5 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Brand Column */}
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="group">
                            <h3 className="text-2xl font-bold tracking-tighter text-brand-light group-hover:text-brand-neon transition-colors duration-300">
                                AFN<span className="text-brand-neon">.</span>
                            </h3>
                        </Link>
                        <p className="text-brand-light/50 text-sm leading-relaxed max-w-xs">
                            Crafting digital experiences at the intersection of design, engineering, and artificial intelligence.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-mono text-xs uppercase tracking-widest text-brand-light/40">
                            Navigation
                        </h4>
                        <ul className="flex flex-col gap-4">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.url}
                                        className="text-sm text-brand-light/70 hover:text-brand-neon transition-colors duration-300 flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-brand-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-mono text-xs uppercase tracking-widest text-brand-light/40">
                            Connect
                        </h4>
                        <ul className="flex flex-col gap-4">
                            {socialLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-brand-light/70 hover:text-brand-neon transition-colors duration-300 flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-brand-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Back to Top */}
                    <div className="flex flex-col justify-end items-start md:items-end lg:items-end">
                        <motion.button
                            onClick={scrollToTop}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-brand-neon/30 hover:bg-white/10 text-xs font-mono uppercase tracking-widest text-brand-light hover:text-brand-neon transition-all duration-300"
                        >
                            Back to Top
                        </motion.button>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="font-mono text-xs text-brand-light/30 uppercase tracking-wider">
                        © {currentYear} Alfahad Niloy. All rights reserved.
                    </p>
                    <p className="font-mono text-[10px] text-brand-light/20 uppercase tracking-widest">
                        Designed & Built with ❤️
                    </p>
                </div>
            </div>
        </footer>
    );
}
