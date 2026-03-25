"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

interface Booking {
    _id: string;
    name: string;
    phone: string;
    email: string;
    sport: string;
    date: string;
    slot: string;
    status: string;
    createdAt: string;
}

interface Stats {
    total: number;
    confirmed: number;
    rejected: number;
    uniqueCustomers: number;
}

export default function AdminDashboard() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [stats, setStats] = useState<Stats>({ total: 0, confirmed: 0, rejected: 0, uniqueCustomers: 0 });
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'bookings' | 'customers'>('bookings');
    const [dateFilter, setDateFilter] = useState<'today' | 'lastMonth'>('today');
    const router = useRouter();

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            let bookingQuery = '/bookings?includeRejected=true';
            
            if (dateFilter === 'today') {
                const today = new Date().toISOString().split('T')[0];
                bookingQuery += `&date=${today}`;
            } else if (dateFilter === 'lastMonth') {
                const end = new Date();
                const start = new Date();
                start.setDate(end.getDate() - 30);
                const endStr = end.toISOString().split('T')[0];
                const startStr = start.toISOString().split('T')[0];
                bookingQuery += `&startDate=${startStr}&endDate=${endStr}`;
            }

            const [bookingsData, statsData] = await Promise.all([
                api.get(bookingQuery),
                api.get('/bookings/stats'),
            ]);
            setBookings(bookingsData);
            setStats(statsData);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    }, [dateFilter]);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/admin/login');
            return;
        }
        fetchData();
    }, [router, fetchData]);

    const handleReject = async (id: string) => {
        setActionLoading(id);
        try {
            await api.patch(`/bookings/${id}/status`, { status: 'rejected' });
            await fetchData();
        } catch (error) {
            console.error('Failed to reject booking:', error);
        } finally {
            setActionLoading(null);
        }
    };




    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to permanently delete this booking?')) return;
        setActionLoading(id);
        try {
            await api.delete(`/bookings/${id}`);
            await fetchData();
        } catch (error) {
            console.error('Failed to delete booking:', error);
        } finally {
            setActionLoading(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminName');
        router.push('/admin/login');
    };

    // Build unique customers list
    const customers = bookings.reduce<Record<string, { name: string; email: string; phone: string; bookings: number }>>((acc, b) => {
        if (b.email && !acc[b.email]) {
            acc[b.email] = { name: b.name, email: b.email, phone: b.phone, bookings: 0 };
        }
        if (b.email) acc[b.email].bookings++;
        return acc;
    }, {});
    const customerList = Object.values(customers);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-3">
                    <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    <p className="text-muted-foreground text-sm">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Admin Navbar */}
            <nav className="border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold">
                            <span className="text-primary">Sky</span>
                            <span className="text-foreground">Smash</span>
                        </h1>
                        <span className="text-muted-foreground text-sm hidden sm:block">|</span>
                        <span className="text-muted-foreground text-sm hidden sm:block">Admin Dashboard</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-muted-foreground text-sm hidden sm:block">
                            👋 {localStorage.getItem('adminName') || 'Admin'}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {/* Total Bookings */}
                    <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border hover:border-primary/30 transition-all group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">📋</div>
                            <h3 className="text-muted-foreground text-sm font-medium">Total Bookings</h3>
                        </div>
                        <p className="text-3xl font-bold text-foreground">{stats.total}</p>
                    </div>

                    {/* Confirmed */}
                    <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border hover:border-green-500/30 transition-all group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">✅</div>
                            <h3 className="text-muted-foreground text-sm font-medium">Confirmed</h3>
                        </div>
                        <p className="text-3xl font-bold text-green-400">{stats.confirmed}</p>
                    </div>

                    {/* Rejected */}
                    <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border hover:border-red-500/30 transition-all group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">❌</div>
                            <h3 className="text-muted-foreground text-sm font-medium">Rejected</h3>
                        </div>
                        <p className="text-3xl font-bold text-red-400">{stats.rejected}</p>
                    </div>

                    {/* Unique Customers */}
                    <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border hover:border-secondary/30 transition-all group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">👥</div>
                            <h3 className="text-muted-foreground text-sm font-medium">Customers</h3>
                        </div>
                        <p className="text-3xl font-bold text-secondary">{stats.uniqueCustomers}</p>
                    </div>
                </div>

                {/* Date Filter & Tab Navigation */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div className="flex gap-1 bg-card/50 p-1 rounded-xl border border-border w-fit">
                        <button
                            onClick={() => setActiveTab('bookings')}
                            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${activeTab === 'bookings' ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            📋 Bookings
                        </button>
                        <button
                            onClick={() => setActiveTab('customers')}
                            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${activeTab === 'customers' ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            👥 Customers
                        </button>
                    </div>

                    <div className="flex gap-1 bg-card/50 p-1 rounded-xl border border-border w-fit">
                        <button
                            onClick={() => setDateFilter('today')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${dateFilter === 'today' ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Today
                        </button>
                        <button
                            onClick={() => setDateFilter('lastMonth')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${dateFilter === 'lastMonth' ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Last 1 Month
                        </button>
                    </div>
                </div>

                {/* Bookings Table */}
                {activeTab === 'bookings' && (
                    <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border overflow-hidden">
                        <div className="px-6 py-4 border-b border-border">
                            <h2 className="text-lg font-semibold text-foreground">All Bookings</h2>
                            <p className="text-muted-foreground text-sm mt-0.5">Manage and review all court bookings</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Phone</th>
                                        <th className="px-6 py-4">Email</th>
                                        <th className="px-6 py-4">Sport</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Slot</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {bookings.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="px-6 py-12 text-center text-muted-foreground">
                                                <div className="flex flex-col items-center gap-2">
                                                    <span className="text-3xl">📭</span>
                                                    <p>No bookings yet</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        bookings.map((booking) => (
                                            <tr key={booking._id} className="hover:bg-muted/30 transition-colors">
                                                <td className="px-6 py-4 text-foreground font-medium whitespace-nowrap">{booking.name}</td>
                                                <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                                                    <a href={`tel:${booking.phone}`} className="hover:text-primary transition-colors">{booking.phone}</a>
                                                </td>
                                                <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                                                    <a href={`mailto:${booking.email}`} className="hover:text-primary transition-colors">{booking.email}</a>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                                                        {booking.sport}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">{new Date(booking.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                                                <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">{booking.slot}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {booking.status === 'confirmed' ? (
                                                        <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
                                                            ● Confirmed
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-500/20">
                                                            ● Rejected
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        {booking.status !== 'rejected' && (
                                                            <button
                                                                onClick={() => handleReject(booking._id)}
                                                                disabled={actionLoading === booking._id}
                                                                className="px-3 py-1.5 text-xs font-medium text-orange-400 hover:text-orange-300 bg-orange-500/10 hover:bg-orange-500/20 rounded-lg ring-1 ring-inset ring-orange-500/20 transition-all disabled:opacity-50 cursor-pointer"
                                                            >
                                                                Reject
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => handleDelete(booking._id)}
                                                            disabled={actionLoading === booking._id}
                                                            className="px-3 py-1.5 text-xs font-medium text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-lg ring-1 ring-inset ring-red-500/20 transition-all disabled:opacity-50 cursor-pointer"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Customers Table */}
                {activeTab === 'customers' && (
                    <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border overflow-hidden">
                        <div className="px-6 py-4 border-b border-border">
                            <h2 className="text-lg font-semibold text-foreground">Customers</h2>
                            <p className="text-muted-foreground text-sm mt-0.5">Unique customers with contact details</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">#</th>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Email</th>
                                        <th className="px-6 py-4">Phone</th>
                                        <th className="px-6 py-4">Total Bookings</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {customerList.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                                <div className="flex flex-col items-center gap-2">
                                                    <span className="text-3xl">👥</span>
                                                    <p>No customers yet</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        customerList.map((c, i) => (
                                            <tr key={c.email} className="hover:bg-muted/30 transition-colors">
                                                <td className="px-6 py-4 text-muted-foreground">{i + 1}</td>
                                                <td className="px-6 py-4 text-foreground font-medium">{c.name}</td>
                                                <td className="px-6 py-4">
                                                    <a href={`mailto:${c.email}`} className="text-primary hover:text-primary/80 transition-colors">{c.email}</a>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <a href={`tel:${c.phone}`} className="text-muted-foreground hover:text-primary transition-colors">{c.phone}</a>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                                                        {c.bookings}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
