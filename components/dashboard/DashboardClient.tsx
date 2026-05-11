"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";

// Investment Components
import InvestmentOverview from "@/components/dashboard/invest/InvestmentOverview";
import InvestmentPlans from "@/components/dashboard/invest/InvestmentPlans";
import RecentActivity from "@/components/dashboard/invest/RecentActivity";
import MarketCharts from "@/components/dashboard/invest/MarketCharts";
import MarketTicker from "@/components/dashboard/invest/MarketTicker";

interface DashboardClientProps {
    userData: {
        totalBalance: number;
        totalProfits: number;
        totalInvested: number;
        activePlansCount: number;
        currency: string;
    };
    activePlans: any[];
    recentActivities: any[];
    currency: string;
}

function DashboardContent({ userData, activePlans, recentActivities, currency }: DashboardClientProps) {
    return (
        <div className="flex flex-col w-full max-w-[100vw] overflow-x-hidden">
            {/* Global Market Ticker */}
            <MarketTicker />

            <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <InvestmentOverview userData={userData} currency={currency} />
                    <InvestmentPlans activePlans={activePlans} />
                    <RecentActivity activities={recentActivities} />
                    <MarketCharts />
                </motion.div>
            </div>
        </div>
    );
}

export default function DashboardClient(props: DashboardClientProps) {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <DashboardContent {...props} />
        </Suspense>
    );
}
