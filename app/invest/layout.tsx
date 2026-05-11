import type { Metadata } from "next";
import Navbar from "@/components/invest/Navbar";
import Footer from "@/components/invest/Footer";

export const metadata: Metadata = {
    title: "ARK Invest — Own What's Next",
    description: "Gain exposure to AI, robotics, genomics, fintech, and energy storage — the disruptive innovation platforms shaping the future.",
};

export default function InvestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
