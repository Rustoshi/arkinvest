import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MetricCard from "@/components/admin/MetricCard";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Transaction from "@/models/Transaction";
// import ShopProduct from "@/models/ShopProduct";
// import ShopOrder from "@/models/ShopOrder";
import { QuickActions, UsersTable, PendingUsersTable, TransactionsTable, InventoryTable, OrdersTable } from "@/components/admin/DashboardTables";

export default async function AdminDashboard() {
    // Ensure session is valid
    await getServerSession(authOptions);

    // Connect DB
    await dbConnect();

    // 1. Fetch Aggregated Metrics
    const totalUsersCount = await User.countDocuments({ role: 'user' });
    const pendingAccountsCount = await User.countDocuments({ role: 'user', accountStatus: 'pending' });
    const pendingTransactionsCount = await Transaction.countDocuments({ status: 'pending' });
    const pendingKycCount = await User.countDocuments({ kycStatus: 'pending' });

    // Shopping metrics hidden
    // const totalInventoryCount = await ShopProduct.countDocuments();
    // const pendingOrdersCount = await ShopOrder.countDocuments({ orderStatus: 'PENDING' });

    // 2. Fetch Tabular Data
    const rawPendingUsers = await User.find({ role: 'user', accountStatus: 'pending' }).sort({ createdAt: -1 }).limit(50).lean();
    const serializedPendingUsers = rawPendingUsers.map(u => ({
        _id: u._id?.toString(),
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        country: u.country,
        createdAt: u.createdAt?.toISOString(),
    }));

    const rawUsers = await User.find({ role: 'user' }).sort({ createdAt: -1 }).limit(100).lean();
    const serializedUsers = rawUsers.map(u => ({
        ...u,
        _id: u._id?.toString(),
    }));

    const rawTransactions = await Transaction.find({ status: 'pending' }).sort({ createdAt: -1 }).limit(50).lean();
    const serializedTransactions = rawTransactions.map(t => ({
        ...t,
        _id: t._id?.toString(),
        createdAt: t.createdAt?.toISOString()
    }));

    // Inventory and orders data fetching hidden
    const serializedInventory: any[] = [];
    const serializedOrders: any[] = [];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Platform Overview Metrics */}
            <section>
                <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-white/50 mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Platform Overview</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard
                        title="Total Users"
                        value={totalUsersCount.toLocaleString()}
                    />
                    <MetricCard
                        title="Pending Accounts"
                        value={pendingAccountsCount.toLocaleString()}
                        trend={pendingAccountsCount > 0 ? { value: "Action Required", positive: false } : undefined}
                    />
                    <MetricCard
                        title="Pending Transactions"
                        value={pendingTransactionsCount.toLocaleString()}
                        trend={pendingTransactionsCount > 0 ? { value: "Action Required", positive: false } : undefined}
                    />
                    <MetricCard
                        title="Pending KYC"
                        value={pendingKycCount.toLocaleString()}
                        trend={pendingKycCount > 0 ? { value: "Action Required", positive: false } : undefined}
                    />
                </div>
            </section>

            {/* Quick Actions */}
            <QuickActions />

            {/* Data Tables */}
            <PendingUsersTable initialUsers={serializedPendingUsers} />
            <UsersTable initialUsers={serializedUsers} />
            <TransactionsTable transactions={serializedTransactions} />
            <InventoryTable initialInventory={serializedInventory} />
            <OrdersTable initialOrders={serializedOrders} />

        </div>
    );
}
