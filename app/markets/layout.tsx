import type { Metadata } from "next";
import Navbar from "@/components/invest/Navbar";
import Footer from "@/components/invest/Footer";

export const metadata: Metadata = {
    title: "Markets — ARK Invest",
    description: "Explore ARK Invest's innovation platforms: AI, Robotics, Genomics, Fintech, Energy Storage, and Blockchain. Thematic investment strategies for forward-looking investors.",
};

export default function MarketsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
