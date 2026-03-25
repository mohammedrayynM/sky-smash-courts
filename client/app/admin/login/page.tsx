"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await api.post('/users/login', { email, password });
            if (data.isAdmin) {
                localStorage.setItem('adminToken', data.token);
                localStorage.setItem('adminName', data.name);
                router.push('/admin/dashboard');
            } else {
                setError('Access denied. Admin privileges required.');
            }
        } catch {
            setError('Invalid email or password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            {/* Glow effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="bg-card/80 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-border w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">
                        <span className="text-primary">Sky</span>
                        <span className="text-foreground">Smash</span>
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">Admin Portal</p>
                </div>

                <h2 className="text-xl font-semibold mb-6 text-foreground text-center">Sign in to Dashboard</h2>

                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label htmlFor="admin-email" className="block text-sm font-medium text-muted-foreground mb-1.5">Email Address</label>
                        <input
                            type="email"
                            id="admin-email"
                            required
                            placeholder="admin@skysmash.com"
                            className="w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted-foreground/50"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="admin-password" className="block text-sm font-medium text-muted-foreground mb-1.5">Password</label>
                        <input
                            type="password"
                            id="admin-password"
                            required
                            placeholder="••••••••"
                            className="w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted-foreground/50"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-primary py-3 px-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                Signing in...
                            </span>
                        ) : 'Sign In'}
                    </button>
                </form>

                <p className="text-center text-muted-foreground/60 text-xs mt-6">
                    Protected admin area &bull; Sky Smash Courts © 2026
                </p>
            </div>
        </div>
    );
}
