"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { TrendingUp, ArrowDownRight, DollarSign } from "lucide-react";
import { NAMES_BY_COUNTRY, COUNTRY_NAMES } from "@/lib/notification-names";

const ACTIONS: { label: string; icon: typeof TrendingUp; color: string }[] = [
    { label: "traded", icon: TrendingUp, color: "text-blue-400" },
    { label: "profited", icon: DollarSign, color: "text-emerald-400" },
    { label: "withdrawn", icon: ArrowDownRight, color: "text-amber-400" },
];

function randomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAmount(): string {
    const raw = randomBetween(534, 237000);
    return raw >= 1000
        ? `$${(raw / 1000).toFixed(raw >= 10000 ? 0 : 1)}K`
        : `$${raw.toLocaleString()}`;
}

interface Notification {
    id: number;
    name: string;
    country: string;
    action: string;
    amount: string;
    icon: typeof TrendingUp;
    color: string;
}

export default function ActivityNotifications() {
    const pathname = usePathname();
    const isHidden =
        pathname?.startsWith("/admin") ||
        pathname?.startsWith("/dashboard") ||
        pathname?.startsWith("/invest/login") ||
        pathname?.startsWith("/invest/signup") ||
        pathname?.startsWith("/invest/forgot-password");

    const [notification, setNotification] = useState<Notification | null>(null);
    const [visible, setVisible] = useState(false);
    const [idCounter, setIdCounter] = useState(0);

    const showNotification = useCallback(() => {
        const country = COUNTRY_NAMES[randomBetween(0, COUNTRY_NAMES.length - 1)];
        const names = NAMES_BY_COUNTRY[country];
        const name = names[randomBetween(0, names.length - 1)];
        const action = ACTIONS[randomBetween(0, ACTIONS.length - 1)];
        const amount = generateAmount();

        setIdCounter((prev) => prev + 1);
        setNotification({
            id: idCounter,
            name,
            country,
            action: action.label,
            amount,
            icon: action.icon,
            color: action.color,
        });
        setVisible(true);

        setTimeout(() => setVisible(false), 4000);
    }, [idCounter]);

    useEffect(() => {
        if (isHidden) return;

        const initialDelay = setTimeout(() => {
            showNotification();
        }, randomBetween(3000, 6000));

        return () => clearTimeout(initialDelay);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHidden]);

    useEffect(() => {
        if (isHidden) return;
        if (!notification) return;

        const nextDelay = randomBetween(5000, 15000);
        const timer = setTimeout(() => {
            showNotification();
        }, nextDelay);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notification, isHidden]);

    if (isHidden || !notification) return null;

    const Icon = notification.icon;

    return (
        <div
            className="fixed left-4 z-[9998] pointer-events-none"
            style={{ bottom: "140px" }}
        >
            <div
                className={`pointer-events-auto flex items-center gap-3 bg-zinc-900/95 backdrop-blur-md border border-white/[0.08] rounded-xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] max-w-[340px] transition-all duration-500 ease-out ${
                    visible
                        ? "opacity-100 translate-y-0 translate-x-0"
                        : "opacity-0 translate-y-2 -translate-x-4"
                }`}
            >
                <div className={`shrink-0 w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${notification.color}`} />
                </div>

                <div className="min-w-0">
                    <p className="text-[12px] text-white/80 leading-tight">
                        <span className="font-semibold text-white">{notification.name}</span>{" "}
                        from{" "}
                        <span className="text-white/60">{notification.country}</span>{" "}
                        just{" "}
                        <span className={`font-semibold ${notification.color}`}>
                            {notification.action}
                        </span>{" "}
                        <span className="font-bold text-white">{notification.amount}</span>
                    </p>
                    <p className="text-[10px] text-white/25 mt-0.5">Just now</p>
                </div>
            </div>
        </div>
    );
}
