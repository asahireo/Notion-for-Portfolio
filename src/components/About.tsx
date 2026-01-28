"use client";

import { motion } from "framer-motion";
import SkillsMarquee from "./SkillsMarquee";

const experience = [
    {
        company: "XPAT Platform",
        role: "Founder / Product Builder",
        period: "Present",
        description: "Designed and developed a digital ecosystem for expatriates and migrant workers. Architected service modules including SIM, remittance, payroll, visa processing, and recruitment.",
        link: "https://xpat.com.my"
    },
    {
        company: "XPAT Jobs",
        role: "Product Builder",
        period: "Talent Marketplace Module",
        description: "Created a recruitment marketplace for foreign workers. Designed employer and worker workflows and optimized UX for non-native English users.",
        link: "https://xpat.com.my/jobs"
    },
    {
        company: "VisaFlowPro",
        role: "Product Developer",
        period: "Project",
        description: "Developed a visa workflow web application using AI-assisted frontend development. Designed document management and onboarding flows.",
        link: "https://visaflowpro.web.app"
    },
    {
        company: "TFP Solution Malaysia",
        role: "Marketing Consultant",
        period: "Past",
        description: "Developed marketing campaigns for SIM, remittance, and payroll platforms. Supported UX improvements for PocketPay, MiPay, and OneTransfer platforms.",
    },
];

const education = [
    {
        institution: "Universiti Kuala Lumpur",
        degree: "PhD in Management",
        year: "Running - 2025",
    },
    {
        institution: "De Montfort University, United Kingdom",
        degree: "Master of Business Administration (MBA)",
        year: "2024",
        cgpa: "3.61/4.00",
    },
    {
        institution: "Asia Pacific University of Technology and Innovation",
        degree: "Master of Business Administration (MBA)",
        year: "2024",
        cgpa: "3.61/4.00",
    },
    {
        institution: "American International University-Bangladesh",
        degree: "Bachelor of Business Administration (BBA)",
        year: "2023",
        cgpa: "3.88/4.00",
        major: "Operations and Supply Chain Management",
    },
];

const skills = {
    "Product & Business": ["Product Strategy", "Rapid Prototyping", "Growth & Funnel Design", "UX Research", "Stakeholder Collaboration", "Analytics (GA4)"],
    "Technical & AI": ["AI-Assisted Web Dev", "Frontend UI/UX (React, Tailwind)", "Prompt Engineering", "Firebase & Hosting", "Marketing Automation"],
    "Creative": ["Frontend Website Design", "Ad Design & Campaigns", "Short-Form Video", "Canva / CapCut", "AI Image Gen"],
};

export default function About() {
    return (
        <section className="py-24 px-4 md:px-12 w-full max-w-7xl mx-auto">
            {/* Summary */}
            <div className="mb-24">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8"
                >
                    Professional <span className="text-brand-neon">Summary</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl text-brand-light/80 max-w-4xl leading-relaxed"
                >
                    Product builder and marketing technologist with a strong business background and hands-on experience developing AI-assisted web platforms, digital ecosystems, and growth campaigns for migrant and expatriate services in Malaysia. Skilled in rapid prototyping, UX/UI design, frontend development, automation, and turning concepts into deployed, revenue-oriented products.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Experience */}
                <div>
                    <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl font-bold uppercase mb-8 flex items-center gap-4"
                    >
                        <span className="w-8 h-[1px] bg-brand-neon"></span> Experience
                    </motion.h3>
                    <div className="space-y-12 border-l border-white/10 pl-8 relative">
                        {experience.map((job, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative"
                            >
                                <div className="absolute -left-[37px] top-2 w-4 h-4 rounded-full bg-brand-dark border border-brand-neon" />
                                <h4 className="text-xl font-bold text-white">{job.role}</h4>
                                <div className="text-brand-neon font-mono text-sm mb-2">{job.company} <span className="text-white/30 px-2">|</span> {job.period}</div>
                                <p className="text-brand-light/60 text-sm leading-relaxed">{job.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Education */}
                <div>
                    <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl font-bold uppercase mb-8 flex items-center gap-4"
                    >
                        <span className="w-8 h-[1px] bg-brand-neon"></span> Education
                    </motion.h3>
                    <div className="space-y-6">
                        {education.map((edu, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="border border-white/5 bg-white/5 p-6 rounded-sm hover:border-brand-neon/30 transition-colors"
                            >
                                <h4 className="font-bold text-lg">{edu.degree}</h4>
                                <div className="flex justify-between items-center mt-2 text-sm font-mono text-brand-light/50">
                                    <span>{edu.institution}</span>
                                    <span className="text-brand-neon">{edu.year}</span>
                                </div>
                                {edu.cgpa && (
                                    <div className="mt-2 text-sm font-mono text-brand-neon">
                                        CGPA: {edu.cgpa}
                                    </div>
                                )}
                                {edu.major && (
                                    <div className="mt-2 text-sm text-brand-light/70">
                                        Major: {edu.major}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>



            {/* Core Skills - Full Width Animated Marquee */}
            <div className="mt-24 w-full">
                <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl font-bold uppercase mb-12 flex items-center gap-4 px-4 md:px-0"
                >
                    <span className="w-8 h-[1px] bg-brand-neon"></span> Core Skills
                </motion.h3>

                <div className="space-y-8 -mx-4 md:-mx-12">
                    <SkillsMarquee
                        items={[
                            ...skills["Product & Business"],
                            ...skills["Creative"],
                        ]}
                        direction="left"
                        speed={40}
                    />
                    <SkillsMarquee
                        items={[
                            ...skills["Technical & AI"],
                            ...skills["Product & Business"], // Filling more content
                        ]}
                        direction="right"
                        speed={50}
                    />
                </div>
            </div>
        </section>
    );
}
