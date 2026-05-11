"use client";

import { motion } from "framer-motion";
import { Rocket, Brain, Zap, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

const affiliations = [
    {
        icon: Rocket,
        label: "SpaceX",
        desc: "Pioneering commercial space exploration and interplanetary transport systems.",
    },
    {
        icon: Brain,
        label: "Neuralink",
        desc: "Developing brain-computer interfaces to unlock human cognitive potential.",
    },
    {
        icon: Zap,
        label: "Tesla Energy",
        desc: "Accelerating the global transition to sustainable energy and autonomous transport.",
    },
    {
        icon: Globe,
        label: "xAI",
        desc: "Building AI systems that advance our collective understanding of the universe.",
    },
];

export default function StrategicAdvisory() {
    return (
        <section className="relative w-full bg-black py-24 sm:py-32 overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[150px] pointer-events-none" />

            {/* Grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
                    `,
                    backgroundSize: "80px 80px",
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16 sm:mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-block text-[11px] tracking-[0.3em] uppercase text-blue-500 font-semibold mb-6"
                    >
                        Strategic Affiliation
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[0.06em] leading-[1.1] text-white mb-6"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                    >
                        Backed by a Vision
                        <br />
                        <span className="text-white/30">That Moves Markets</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base sm:text-lg text-white/50 font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        ARK Invest operates in strategic affiliation with{" "}
                        <strong className="text-white font-semibold">Elon Musk</strong> — aligning our investment
                        thesis with the architect of some of the most consequential technology ventures of our generation.
                    </motion.p>
                </div>

                {/* Featured advisory card */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="relative max-w-4xl mx-auto mb-16 sm:mb-20"
                >
                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-8 sm:p-12 overflow-hidden">
                        {/* Accent line */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

                        <div>
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                                    <h3
                                        className="text-xl sm:text-2xl font-black text-white tracking-[0.04em]"
                                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                                    >
                                        Elon Musk
                                    </h3>
                                    <span className="text-[10px] tracking-[0.2em] uppercase text-blue-400 font-bold bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 w-fit">
                                        Strategic Affiliate
                                    </span>
                                </div>

                                <p className="text-sm sm:text-base text-white/50 font-light leading-relaxed mb-6">
                                    As the CEO of Tesla, SpaceX, and xAI, Elon Musk represents the intersection of
                                    visionary leadership and disruptive execution. ARK Invest&apos;s strategic affiliation
                                    with Musk provides our platform with unique insight into the innovation themes
                                    driving tomorrow&apos;s markets — from autonomous energy systems and AI infrastructure
                                    to commercial space exploration and neural interfaces.
                                </p>

                                <p className="text-sm text-white/35 font-light leading-relaxed">
                                    This affiliation reflects a shared conviction: the most transformative technologies
                                    are not speculative — they are investable, and their compounding potential
                                    is best captured early by those who understand the trajectory.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Venture affiliations grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {affiliations.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 * i }}
                                className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-7 hover:border-blue-500/20 hover:bg-white/[0.05] transition-all duration-300"
                            >
                                <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center mb-4">
                                    <Icon className="w-5 h-5 text-blue-500" />
                                </div>
                                <h4
                                    className="text-sm font-bold text-white tracking-[0.04em] mb-2"
                                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                                >
                                    {item.label}
                                </h4>
                                <p className="text-xs text-white/40 font-light leading-relaxed">{item.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-14"
                >
                    <Link
                        href="/about"
                        className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.06em] uppercase text-white/30 hover:text-white/60 transition-colors duration-300"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                    >
                        Learn more about our leadership <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
