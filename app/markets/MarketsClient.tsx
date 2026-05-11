"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Rocket,
    Zap,
    Brain,
    Bot,
    Pickaxe,
    MessageSquare,
    TrendingUp,
    Users,
    DollarSign,
    ArrowRight,
    Globe,
    BarChart3,
} from "lucide-react";

/* ─── Types ─── */
interface Tranche {
    name: string;
    badge: string | null;
    minimumAmount: number;
    maximumAmount: number | null;
    yieldLow: number;
    yieldHigh: number | null;
    spotsTotal: number;
    spotsFilled: number;
    isCustomTerms: boolean;
}

interface ProjectData {
    _id: string;
    name: string;
    company: string;
    slug: string;
    tagline: string;
    heroImage: string;
    heroBgColor: string;
    status: "upcoming" | "open" | "funded" | "closed";
    totalRaiseTarget: number;
    currentRaised: number;
    investorCount: number;
    expectedYieldLow: number;
    expectedYieldHigh: number | null;
    yieldType: string;
    yieldCycle: string | null;
    riskLevel: string;
    closeDate: string | null;
    minimumInvestment: number;
    tranches: Tranche[];
    highlights: string[];
}

/* ─── Company data ─── */
const companies = [
    {
        key: "AI & Robotics",
        icon: Bot,
        ticker: "ARKQ",
        sector: "Artificial Intelligence · Autonomous Systems · Robotics",
        color: "#3B82F6",
        isOpen: true,
        valuationLabel: "$2T+ TAM",
        foundedYear: 2014,
        thesis:
            "Artificial intelligence and robotics are converging to automate physical and cognitive tasks at scale. Companies building autonomous vehicles, industrial robots, and AI infrastructure are positioned for exponential growth.",
        keyFacts: [
            "Global AI market projected to reach $1.8T by 2030",
            "Autonomous vehicle deployment accelerating globally",
            "Industrial robotics growing 15%+ annually",
            "AI infrastructure spend exceeding $200B/year",
        ],
        opportunity:
            "Early exposure to the companies building the autonomous economy — from self-driving fleets to warehouse robotics to AI chip infrastructure.",
    },
    {
        key: "Genomic Revolution",
        icon: Zap,
        ticker: "ARKG",
        sector: "Genomics · CRISPR · Molecular Diagnostics",
        color: "#8b5cf6",
        isOpen: true,
        valuationLabel: "$600B+ TAM",
        foundedYear: 2014,
        thesis:
            "Gene editing, gene therapy, and multi-omic diagnostics are transforming healthcare from reactive treatment to proactive prevention. CRISPR-based therapies are reaching commercial approval.",
        keyFacts: [
            "First CRISPR therapy approved by FDA (2023)",
            "Gene sequencing costs dropped 99.9% in 20 years",
            "Liquid biopsy market growing 20%+ annually",
            "Cell and gene therapy pipeline exceeding 2,000 trials",
        ],
        opportunity:
            "Genomics is at an inflection point similar to the internet in 1999 — commercial viability is proven but mass adoption is just beginning.",
    },
    {
        key: "Fintech Innovation",
        icon: TrendingUp,
        ticker: "ARKF",
        sector: "Digital Wallets · Blockchain · Payments",
        color: "#10b981",
        isOpen: true,
        valuationLabel: "$1.5T+ TAM",
        foundedYear: 2019,
        thesis:
            "Financial technology is reshaping how the world transacts, saves, lends, and insures. Digital wallets, blockchain settlement, and embedded finance are replacing legacy banking infrastructure.",
        keyFacts: [
            "Digital wallet users projected to reach 5.2B by 2026",
            "Blockchain settlement reducing costs by 80%+",
            "Buy-now-pay-later market doubling every 2 years",
            "Embedded finance projected at $7T+ in transaction value",
        ],
        opportunity:
            "Fintech companies are capturing market share from traditional banks at an accelerating pace. The total addressable market in global financial services exceeds $25T.",
    },
    {
        key: "Next Gen Internet",
        icon: Globe,
        ticker: "ARKW",
        sector: "Cloud · Streaming · Web3",
        color: "#f59e0b",
        isOpen: false,
        valuationLabel: "$3T+ TAM",
        foundedYear: 2014,
        thesis:
            "The next generation of internet infrastructure is being built on cloud computing, edge AI, and decentralised protocols. Companies enabling this transition are experiencing compounding network effects.",
        keyFacts: [
            "Cloud computing growing 20%+ annually to $1.5T+",
            "Edge computing market projected at $232B by 2028",
            "Digital advertising shifting to AI-personalised delivery",
            "Decentralised protocols handling $10B+ in daily volume",
        ],
        opportunity:
            "Internet infrastructure is undergoing its largest upgrade cycle since mobile. Companies building the rails for AI-native applications will capture outsized returns.",
    },
    {
        key: "Energy Storage",
        icon: Zap,
        ticker: "ARKE",
        sector: "Batteries · Solar · Grid Storage",
        color: "#FF6600",
        isOpen: false,
        valuationLabel: "$800B+ TAM",
        foundedYear: 2021,
        thesis:
            "Battery technology and renewable energy storage are the enabling layers of the clean energy transition. Declining cost curves in lithium-ion and solid-state batteries are unlocking mass adoption.",
        keyFacts: [
            "Battery costs declined 90% in 15 years",
            "Grid-scale storage deployments growing 40%+ annually",
            "Solar + storage reaching grid parity in 100+ markets",
            "EV adoption driving massive battery manufacturing scale",
        ],
        opportunity:
            "Energy storage is a critical bottleneck for the renewable transition. Companies solving storage at scale will benefit from decade-long secular tailwinds.",
    },
    {
        key: "Space Exploration",
        icon: Rocket,
        ticker: "ARKX",
        sector: "Satellites · Launch · Earth Observation",
        color: "#0047AB",
        isOpen: false,
        valuationLabel: "$1T+ TAM",
        foundedYear: 2021,
        thesis:
            "The space economy is entering a commercialisation phase driven by reusable launch vehicles, satellite broadband, and earth observation data. Private companies are leading this transformation.",
        keyFacts: [
            "Global space economy projected at $1.8T by 2035",
            "Satellite broadband reaching underserved 3B+ people",
            "Launch costs reduced 95% through reusability",
            "Earth observation data market growing 25%+ annually",
        ],
        opportunity:
            "Space is transitioning from government-funded exploration to commercial infrastructure. Companies with proven launch and satellite capabilities will dominate this multi-trillion-dollar market.",
    },
];

/* ─── Helpers ─── */
function fmt(n: number): string {
    if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
    return `$${n}`;
}

function fmtPct(val: number) {
    return `${val}%`;
}

const statusLabel: Record<string, string> = {
    open: "Open for Investment",
    upcoming: "Opening Soon",
    funded: "Fully Funded",
    closed: "Closed",
};

const statusColor: Record<string, string> = {
    open: "text-emerald-400 border-emerald-400/30 bg-emerald-400/[0.06]",
    upcoming: "text-amber-400 border-amber-400/30 bg-amber-400/[0.06]",
    funded: "text-blue-400 border-blue-400/30 bg-blue-400/[0.06]",
    closed: "text-white/30 border-white/10 bg-white/[0.03]",
};


/* ─── Project Card ─── */
function ProjectCard({ p, index }: { p: ProjectData; index: number }) {
    const pct = Math.min(100, Math.round((p.currentRaised / p.totalRaiseTarget) * 100));

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 * index }}
            className="group bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/[0.14] transition-colors duration-400 flex flex-col"
        >
            {/* Colour bar */}
            <div className="h-1 w-full" style={{ backgroundColor: p.heroBgColor }} />

            <div className="p-6 sm:p-7 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                        <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 font-medium">{p.company}</span>
                        <h3
                            className="text-base font-bold text-white mt-0.5 leading-snug"
                            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                        >
                            {p.name}
                        </h3>
                    </div>
                    <span className={`shrink-0 text-[9px] font-semibold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full border ${statusColor[p.status]}`}>
                        {statusLabel[p.status]}
                    </span>
                </div>

                <p className="text-xs text-white/40 font-light leading-relaxed mb-5">{p.tagline}</p>

                {/* Funding bar */}
                <div className="mb-5">
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[10px] text-white/30 tracking-wide">Funded</span>
                        <span className="text-[10px] font-semibold text-white/60">{pct}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${pct}%`, backgroundColor: p.heroBgColor || "#3B82F6" }}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-1.5">
                        <span className="text-[10px] text-white/25">{fmt(p.currentRaised)} raised</span>
                        <span className="text-[10px] text-white/25">Target {fmt(p.totalRaiseTarget)}</span>
                    </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <div>
                        <p className="text-[9px] tracking-[0.15em] uppercase text-white/25 mb-0.5">Yield</p>
                        <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                            {p.expectedYieldHigh
                                ? `${fmtPct(p.expectedYieldLow)}–${fmtPct(p.expectedYieldHigh)}`
                                : `+${fmtPct(p.expectedYieldLow)}`}
                        </p>
                    </div>
                    <div>
                        <p className="text-[9px] tracking-[0.15em] uppercase text-white/25 mb-0.5">Min.</p>
                        <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                            {fmt(p.minimumInvestment)}
                        </p>
                    </div>
                    <div>
                        <p className="text-[9px] tracking-[0.15em] uppercase text-white/25 mb-0.5">Investors</p>
                        <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                            {p.investorCount.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-end mt-auto pt-4 border-t border-white/[0.06]">
                    <Link
                        href={`/projects/${p.slug}`}
                        className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.08em] uppercase text-white/50 hover:text-white transition-colors duration-300"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                    >
                        View Details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Main Component ─── */
export default function MarketsClient({ projects }: { projects: ProjectData[] }) {
    const openProjects = projects.filter((p) => p.status === "open");
    const upcomingProjects = projects.filter((p) => p.status === "upcoming");
    const otherProjects = projects.filter((p) => p.status !== "open" && p.status !== "upcoming");
    const orderedProjects = [...openProjects, ...upcomingProjects, ...otherProjects];

    const totalRaised = projects.reduce((s, p) => s + p.currentRaised, 0);
    const totalInvestors = projects.reduce((s, p) => s + p.investorCount, 0);
    const openCount = openProjects.length;

    return (
        <main className="bg-black text-white overflow-hidden">
            {/* ── Hero ── */}
            <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden pt-[70px]">
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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/[0.05] rounded-full blur-[130px] pointer-events-none" />

                <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 sm:py-32 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block text-[11px] tracking-[0.35em] uppercase text-blue-500 font-semibold mb-6"
                    >
                        Strategic Exposure
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.04em] leading-[1.05] text-white mb-8"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                    >
                        Innovation
                        <br />
                        <span className="text-white/25">Platforms</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.25 }}
                        className="text-base sm:text-lg text-white/50 font-light max-w-2xl mx-auto leading-relaxed mb-12"
                    >
                        Every strategy in our portfolio targets the convergence of exponential technologies — AI, genomics, fintech, energy storage, and the next generation internet.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="/ai-plans"
                            className="px-8 py-3.5 rounded-full bg-blue-600 text-white text-sm font-semibold tracking-[0.08em] uppercase hover:bg-blue-500 transition-colors duration-300"
                            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                        >
                            View All Strategies
                        </Link>
                        <Link
                            href="/invest/signup"
                            className="px-8 py-3.5 rounded-full border border-white/20 text-white/70 text-sm font-semibold tracking-[0.08em] uppercase hover:border-white/50 hover:text-white transition-all duration-300"
                            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                        >
                            Create Account
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ── Stats Bar ── */}
            <section className="relative w-full bg-zinc-950 border-t border-b border-white/[0.04] py-10">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                        {[
                            { icon: Globe, label: "Portfolio Companies", value: `${companies.length}` },
                            { icon: BarChart3, label: "Open to Invest", value: openCount > 0 ? `${openCount} Active` : "Coming Soon" },
                            { icon: DollarSign, label: "Total Raised", value: "$1.8B" },
                            { icon: Users, label: "Active Investors", value: "110.1K" },
                        ].map((stat, i) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.08 * i }}
                                    className="text-center"
                                >
                                    <Icon className="w-4 h-4 text-white/20 mx-auto mb-2" />
                                    <p
                                        className="text-xl sm:text-2xl font-black text-white mb-1"
                                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                                    >
                                        {stat.value}
                                    </p>
                                    <p className="text-[10px] tracking-[0.2em] uppercase text-white/30">{stat.label}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Why Private Markets ── */}
            <section className="relative w-full bg-zinc-50 py-20 sm:py-28 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.06] pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)
                        `,
                        backgroundSize: "80px 80px",
                    }}
                />
                <div className="relative z-10 max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-14"
                    >
                        <span className="inline-block text-[11px] tracking-[0.3em] uppercase text-blue-600 font-semibold mb-4">
                            The Case for Innovation Investing
                        </span>
                        <h2
                            className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-[0.05em] text-black"
                            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                        >
                            The Biggest Returns
                            <br />
                            <span className="text-black/30">Happen Before the IPO</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                stat: "10–100×",
                                title: "Pre-IPO Upside",
                                desc: "Companies like Uber, Airbnb, and Palantir generated most of their value growth while private — before public markets could participate.",
                            },
                            {
                                stat: "$12T+",
                                title: "Private Market Size",
                                desc: "Global private equity and venture capital AUM has surpassed $12 trillion. The world's most valuable companies are staying private longer than ever.",
                            },
                            {
                                stat: "11+ yrs",
                                title: "Avg. Time to IPO",
                                desc: "The average time from founding to IPO has more than doubled since 2000. Waiting for public markets means missing the compounding years.",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 * i }}
                                className="bg-white rounded-2xl p-7 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.04)] border border-black/[0.04]"
                            >
                                <p
                                    className="text-3xl sm:text-4xl font-black text-black mb-3"
                                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                                >
                                    {item.stat}
                                </p>
                                <div className="w-8 h-[3px] bg-blue-500 rounded-full mb-4" />
                                <h3
                                    className="text-base font-bold text-black mb-2"
                                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                                >
                                    {item.title}
                                </h3>
                                <p className="text-sm text-black/60 font-light leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Company Profiles ── */}
            <section className="relative w-full bg-black py-20 sm:py-28 border-t border-white/[0.04]">
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
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <span className="inline-block text-[11px] tracking-[0.3em] uppercase text-white/40 font-medium mb-4">
                            Portfolio Companies
                        </span>
                        <h2
                            className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-[0.05em] text-white"
                            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                        >
                            Six Platforms.
                            <br />
                            <span className="text-white/30">One Innovation Thesis.</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {companies.map((co, i) => {
                            const Icon = co.icon;
                            return (
                                <motion.div
                                    key={co.key}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.07 * i }}
                                    className={`relative rounded-2xl p-7 sm:p-8 border transition-all duration-400 flex flex-col gap-5 ${
                                        co.isOpen
                                            ? "border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.06]"
                                            : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"
                                    }`}
                                >
                                    {/* Top row */}
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                                style={{ backgroundColor: `${co.color}18` }}
                                            >
                                                <Icon className="w-5 h-5" style={{ color: co.color }} />
                                            </div>
                                            <div>
                                                <h3
                                                    className="text-lg font-black text-white tracking-[0.03em]"
                                                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                                                >
                                                    {co.key}
                                                </h3>
                                                <span className="text-[10px] font-mono tracking-wider text-white/25">{co.ticker}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                                            {co.isOpen ? (
                                                <span className="flex items-center gap-1.5 text-[9px] font-bold tracking-[0.18em] uppercase text-emerald-400">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                    Open
                                                </span>
                                            ) : (
                                                <span className="text-[9px] font-semibold tracking-[0.18em] uppercase text-white/20">
                                                    Coming Soon
                                                </span>
                                            )}
                                            <span className="text-xs font-bold text-white/50" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                                                {co.valuationLabel}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Sector + founded */}
                                    <div className="flex flex-wrap gap-2">
                                        {co.sector.split(" · ").map((tag) => (
                                            <span key={tag} className="text-[9px] tracking-[0.15em] uppercase text-white/30 border border-white/[0.08] rounded-full px-2.5 py-0.5">
                                                {tag}
                                            </span>
                                        ))}
                                        <span className="text-[9px] tracking-[0.15em] uppercase text-white/20 border border-white/[0.05] rounded-full px-2.5 py-0.5">
                                            Est. {co.foundedYear}
                                        </span>
                                    </div>

                                    {/* Thesis */}
                                    <p className="text-sm text-white/50 font-light leading-relaxed">{co.thesis}</p>

                                    {/* Key facts */}
                                    <ul className="flex flex-col gap-2">
                                        {co.keyFacts.map((fact) => (
                                            <li key={fact} className="flex items-start gap-2.5">
                                                <span
                                                    className="w-1 h-1 rounded-full mt-[7px] shrink-0"
                                                    style={{ backgroundColor: co.color }}
                                                />
                                                <span className="text-xs text-white/45 leading-relaxed">{fact}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Opportunity */}
                                    <div className="pt-4 border-t border-white/[0.06]">
                                        <p className="text-xs text-white/35 font-light leading-relaxed italic">{co.opportunity}</p>
                                    </div>

                                    {/* Accent bottom line */}
                                    <div
                                        className="absolute bottom-0 left-7 right-7 h-[1px] rounded-full opacity-20"
                                        style={{ background: `linear-gradient(90deg, transparent, ${co.color}, transparent)` }}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Live Projects ── */}
            {orderedProjects.length > 0 && (
                <section className="relative w-full bg-zinc-950 py-20 sm:py-28 border-t border-white/[0.04]">
                    <div className="max-w-6xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-14"
                        >
                            <div>
                                <span className="inline-block text-[11px] tracking-[0.3em] uppercase text-white/40 font-medium mb-4">
                                    Live Opportunities
                                </span>
                                <h2
                                    className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-[0.05em] text-white"
                                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                                >
                                    Active Projects
                                </h2>
                            </div>
                            <Link
                                href="/projects"
                                className="group inline-flex items-center gap-2 text-sm font-semibold tracking-[0.06em] uppercase text-white/40 hover:text-white transition-colors duration-300 self-start sm:self-auto"
                                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                            >
                                View All <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                            </Link>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {orderedProjects.map((p, i) => (
                                <ProjectCard key={p._id} p={p} index={i} />
                            ))}
                        </div>

                        <p className="mt-10 text-[11px] text-white/15 text-center max-w-xl mx-auto leading-relaxed">
                            Projected yields are estimates only. All private market investments carry risk including possible loss of principal.
                        </p>
                    </div>
                </section>
            )}

            {/* ── CTA ── */}
            <section className="relative w-full bg-zinc-950 py-24 sm:py-32 border-t border-white/[0.04] overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/[0.05] rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-block text-[11px] tracking-[0.35em] uppercase text-blue-500 font-semibold mb-6"
                    >
                        Get Exposure
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[0.04em] leading-[1.05] text-white mb-6"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                    >
                        Own a Stake in the
                        <br />
                        <span className="text-white/30">Companies Shaping Tomorrow</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="text-sm sm:text-base text-white/40 font-light leading-relaxed mb-12 max-w-xl mx-auto"
                    >
                        Create a free account, complete verification, and access private equity investment opportunities not available on any public market.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="/invest/signup"
                            className="px-10 py-4 rounded-full bg-blue-600 text-white text-sm font-semibold tracking-[0.1em] uppercase hover:bg-blue-500 transition-colors duration-300 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                        >
                            Start Investing
                        </Link>
                        <Link
                            href="/projects"
                            className="px-10 py-4 rounded-full border border-white/20 text-white/60 text-sm font-semibold tracking-[0.1em] uppercase hover:border-white/40 hover:text-white transition-all duration-300"
                            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                        >
                            Explore Projects
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
