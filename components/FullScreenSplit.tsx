"use client";

import HeroSplitSection from "./HeroSplitSection";

export default function FullScreenSplit() {
    return (
        <div className="w-full h-[100dvh] bg-black overflow-hidden relative">
            {/* Single Full-Screen Hero — Invest */}
            <div className="absolute inset-0 z-[1]">
                <HeroSplitSection
                    title="Own What's Next"
                    subtitle="Disruptive Innovation · AI · Robotics · Genomics · Blockchain"
                    bgImage="/invest-bg.png"
                    buttonText="Start Investing"
                    buttonLink="/invest"
                    isHovered={false}
                    isDimmed={false}
                    onMouseEnter={() => {}}
                    onMouseLeave={() => {}}
                    titleColor="text-blue-500"
                    position="top"
                />
            </div>
        </div>
    );
}
