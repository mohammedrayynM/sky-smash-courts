"use client";

import { useState } from 'react';

interface BookingFormProps {
    onSubmit: (data: any) => void;
    selectedSlot: string | null;
    selectedDate: Date;
    selectedSport: string;
}

export default function BookingForm({ onSubmit, selectedSlot, selectedDate, selectedSport }: BookingFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!selectedSlot) {
        return (
            <div className="bg-card p-6 rounded-2xl shadow-xl border border-border h-full flex items-center justify-center text-muted-foreground">
                Please select a time slot to proceed.
            </div>
        );
    }

    return (
        <div className="bg-card p-6 rounded-2xl shadow-xl border border-border animate-fade-in">
            <h3 className="text-xl font-semibold mb-6 text-foreground">Complete Booking</h3>
            <div className="mb-4 text-sm text-muted-foreground">
                Booking <span className="text-primary font-bold">{selectedSport}</span> for <span className="text-foreground font-medium">{selectedDate.toDateString()}</span> at <span className="text-foreground font-medium">{selectedSlot}</span>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        required
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        required
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        required
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full rounded-md bg-primary py-2.5 px-4 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Confirm Booking
                </button>
            </form>
        </div>
    );
}
