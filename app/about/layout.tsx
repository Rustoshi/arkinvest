import type { Metadata } from "next";
import Navbar from "@/components/invest/Navbar";
import Footer from "@/components/invest/Footer";

export const metadata: Metadata = {
    title: "About Us — ARK Invest",
    description: "ARK Invest is an AI-powered investment platform focused on disruptive innovation — giving everyday investors structured access to the technologies shaping the future.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
