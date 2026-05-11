"use client";

import { motion } from "framer-motion";

const platforms = [
    {
        name: "Artificial Intelligence",
        ticker: "AI",
        thesis: "Deep learning, natural language processing, and intelligent agents transforming every industry from healthcare to logistics",
        isActive: true,
    },
    {
        name: "Robotics & Automation",
        ticker: "ROBO",
        thesis: "Autonomous vehicles, industrial robots, and 3D printing creating a new era of manufacturing and mobility",
        isActive: true,
    },
    {
        name: "Energy Storage",
        ticker: "ENERGY",
        thesis: "Battery technology, solar, and grid-scale storage accelerating the global transition to renewable energy",
        isActive: true,
    },
    {
        name: "Genomic Revolution",
        ticker: "GENE",
        thesis: "CRISPR gene editing, targeted therapies, and molecular diagnostics rewriting the future of healthcare",
        isActive: true,
    },
    {
        name: "Fintech Innovation",
        ticker: "FINTECH",
        thesis: "Digital wallets, blockchain, and decentralised finance disrupting traditional banking and payments infrastructure",
        isActive: true,
    },
    {
        name: "Blockchain & Crypto",
        ticker: "CRYPTO",
        thesis: "Decentralised protocols, smart contracts, and digital assets building a new financial system from the ground up",
        isActive: true,
    },
];

export default function MarketFocus() {
    return (
        <section id="markets" className="relative w-full bg-black py-24 sm:py-32 overflow-hidden">
            {/* Subtle grid */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
                    `,
                    backgroundSize: "80px 80px",
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Label */}
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="inline-block text-[11px] tracking-[0.3em] uppercase text-blue-500 font-semibold mb-6"
                >
                    Innovation Platforms
                </motion.span>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[0.06em] leading-[1.1] text-white mb-8 w-full"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                    Disruptive
                    <br />
                    <span className="text-white/40">Innovation</span>
                </motion.h2>

                {/* Philosophy */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-base sm:text-lg text-white/50 font-light max-w-2xl leading-relaxed mb-16"
                >
                    We believe innovation is the key to growth. Our strategies focus on technologies that are transforming industries and creating exponential value across five major innovation platforms.
                </motion.p>

                {/* Company Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {platforms.map((company, i) => (
                        <motion.div
                            key={company.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -3 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.08 * i }}
                            className={`group relative rounded-xl p-6 border transition-colors duration-400 ${
                                company.isActive
                                    ? "border-blue-500/20 bg-blue-500/[0.04] hover:bg-blue-500/[0.07] hover:border-blue-500/35 cursor-pointer"
                                    : "border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/[0.10] cursor-default"
                            }`}
                        >
                            {/* Active badge */}
                            {company.isActive && (
                                <div className="flex items-center gap-1.5 mb-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-emerald-400">
                                        Active Strategy
                                    </span>
                                </div>
                            )}

                            {/* Name + ticker */}
                            <div className="flex items-baseline gap-3 mb-3">
                                <span
                                    className="text-2xl sm:text-3xl font-black text-white tracking-tight"
                                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                                >
                                    {company.name}
                                </span>
                                <span className="text-xs font-mono tracking-wider text-white/25">
                                    {company.ticker}
                                </span>
                            </div>

                            {/* Thesis */}
                            <p className="text-sm text-white/50 font-light leading-relaxed">
                                {company.thesis}
                            </p>

                            {/* Subtle accent line */}
                            <div className={`absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent to-transparent transition-all duration-500 ${
                                company.isActive
                                    ? "via-blue-500/30 group-hover:via-blue-500/50"
                                    : "via-white/[0.06] group-hover:via-white/[0.12]"
                            }`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
