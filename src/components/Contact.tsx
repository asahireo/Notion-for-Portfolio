"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import MagneticButton from "./MagneticButton";
import ContactForm from "./ContactForm";

export default function Contact() {

    const email = "alfahadniloy@gmail.com";

    return (
        <section className="py-32 px-4 md:px-12 w-full max-w-7xl mx-auto relative overflow-hidden" id="contact">
            <div className="w-full">

                {/* Grid Layout */}
                <div className="relative z-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left: Title & Socials */}
                    <div className="flex flex-col justify-between h-full">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="max-w-2xl"
                        >
                            <span className="text-brand-neon font-mono text-lg uppercase tracking-widest mb-4 block">
                                Initiate Protocol
                            </span>
                            <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-12 leading-[0.9]">
                                Let's Build <br />
                                The <br />
                                <span className="text-brand-neon">Future</span>.
                            </h2>

                            <div className="flex flex-col gap-8">
                                <h3 className="text-brand-light/50 font-mono text-sm uppercase tracking-widest">Connect Locally</h3>
                                <div className="flex gap-8">
                                    {[
                                        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/al-fahad-niloy/' },
                                        { name: 'TikTok', url: 'https://www.tiktok.com/@al.fahad.niloy?lang=en' },
                                        { name: 'Instagram', url: 'https://www.instagram.com/alfahadniloy/' }
                                    ].map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-brand-light hover:text-brand-neon uppercase text-base font-mono tracking-widest flex items-center gap-1 transition-colors relative group"
                                        >
                                            {social.name}
                                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-neon group-hover:w-full transition-all duration-300" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full"
                    >
                        <ContactForm />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
