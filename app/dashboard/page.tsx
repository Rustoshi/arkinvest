import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import UserPlan from "@/models/UserPlan";
import Transaction from "@/models/Transaction";
import DashboardClient from "@/components/dashboard/DashboardClient";

export default async function DashboardPage() {
    // 1. Get the active session
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/invest/login");
    }

    // 2. Fetch the user's fresh database record
    await dbConnect();

    // Fetch user totals and currency
    const user = await User.findById(session.user.id).select(
        "totalBalance totalProfit totalInvested activePlans currency"
    ).lean();

    if (!user) {
        redirect("/invest/login");
    }

    // Fetch user's active plans
    const activePlansDocs = await UserPlan.find({
        userId: session.user.id,
        status: 'active'
    }).sort({ createdAt: -1 }).lean();

    // Fetch user's recent transactions
    const transactionsDocs = await Transaction.find({
        userId: session.user.id
    }).sort({ createdAt: -1 }).limit(5).lean();


    // 3. Prepare the data payload for the client component
    const userData = {
        totalBalance: user.totalBalance || 0,
        totalProfits: user.totalProfit || 0,
        totalInvested: user.totalInvested || 0,
        activePlansCount: user.activePlans || 0,
        currency: user.currency || "$",
    };

    const formattedPlans = activePlansDocs.map((plan: any) => ({
        id: plan.planId,
        name: plan.name,
        capital: `${user.currency}${plan.capital.toLocaleString(undefined, { minimumFractionDigits: 0 })}`,
        cycle: plan.cycle,
        target: plan.target,
        currentPnL: plan.currentPnL >= 0
            ? `+${user.currency}${plan.currentPnL.toLocaleString()}`
            : `-${user.currency}${Math.abs(plan.currentPnL).toLocaleString()}`
    }));

    const formattedActivities = transactionsDocs.map((tx: any) => {
        let title = "Transaction";
        let typeStr = "Transfer";
        let positive = true;

        switch (tx.type) {
            case "deposit":
                title = tx.paymentMethod ? `Deposit (${tx.paymentMethod})` : "Deposit";
                typeStr = "Deposit";
                break;
            case "withdrawal":
                title = tx.paymentMethod ? `Withdrawal (${tx.paymentMethod})` : "Withdrawal";
                typeStr = "Withdrawal";
                positive = false;
                break;
            case "investment":
                title = "Plan Subscription";
                typeStr = "Shopping"; // Reuse shopping icon
                positive = false;
                break;
            case "profit":
                title = "Yield Payout";
                typeStr = "Yield";
                break;
            case "transfer":
                title = "Fund Transfer";
                typeStr = "Transfer";
                break;
        }

        return {
            id: tx._id.toString(),
            type: typeStr,
            title,
            date: new Date(tx.createdAt || tx.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
            amount: `${positive ? '+' : '-'}${user.currency}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            status: tx.status.charAt(0).toUpperCase() + tx.status.slice(1),
            positive
        };
    });

    return <DashboardClient userData={userData} activePlans={formattedPlans} recentActivities={formattedActivities} currency={user.currency || "$"} />;
}
