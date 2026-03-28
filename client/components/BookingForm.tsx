"use client";

import { useState } from 'react';

interface BookingFormProps {
    onSubmit: (data: any) => void;
    selectedSlot: string | null;
    selectedDate: Date;
    selectedSport: string;
    isLoading: boolean;
}

export default function BookingForm({ onSubmit, selectedSlot, selectedDate, selectedSport, isLoading }: BookingFormProps) {
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
            <div className="mb-4 text-sm text-muted-foreground p-3 bg-muted/30 rounded-lg">
                <div className="flex justify-between mb-1">
                    <span>Sport:</span>
                    <span className="text-primary font-bold">{selectedSport}</span>
                </div>
                <div className="flex justify-between mb-1">
                    <span>Date:</span>
                    <span className="text-foreground font-medium">{selectedDate.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between mb-1">
                    <span>Slot:</span>
                    <span className="text-foreground font-medium">{selectedSlot}</span>
                </div>
                <div className="flex justify-between mt-2 pt-2 border-t border-border/50 text-base">
                    <span className="font-bold text-foreground">Total Amount:</span>
                    <span className="text-primary font-extrabold text-lg">
                        ₹{selectedSport === "Turf Football" ? "1200" : "600"}
                    </span>
                </div>
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
                    disabled={isLoading}
                    className="w-full rounded-md bg-primary py-2.5 px-4 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Preparing Payment...
                        </>
                    ) : (
                        `Confirm & Pay ₹${selectedSport === "Turf Football" ? "1200" : "600"}`
                    )}
                </button>
            </form>
        </div>
    );
}
