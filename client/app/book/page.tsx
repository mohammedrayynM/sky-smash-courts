"use client";

import { useState, useEffect } from 'react';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import BookingCalendar from '@/components/BookingCalendar';
import BookingForm from '@/components/BookingForm';
import Footer from '@/components/Footer';
import { api } from '@/lib/api';

declare global {
    interface Window {
        Razorpay: any;
    }
}

const TIME_SLOTS = [
    "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
    "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM"
];

const SPORTS = ["Turf Football", "Badminton", "Other"];

const backgroundImages: Record<string, string> = {
    'Turf Football': 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2000&auto=format&fit=crop',
    'Badminton': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2000&auto=format&fit=crop',
    'Other': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop'
};

export default function BookPage() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedSport, setSelectedSport] = useState(SPORTS[0]);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [bookedSlots, setBookedSlots] = useState<string[]>([]);
    const [isBooking, setIsBooking] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchBookedSlots = async () => {
        try {
            // Use local date string YYYY-MM-DD
            const formattedDate = selectedDate.toISOString().split('T')[0];
            const data = await api.get(`/bookings?date=${formattedDate}&sport=${selectedSport}`);
            setBookedSlots(data.map((b: any) => b.slot));
        } catch (err) {
            console.error("Failed to fetch slots", err);
        }
    };

    useEffect(() => {
        fetchBookedSlots();
    }, [selectedDate, selectedSport]);

    const handleBookingSubmit = async (data: any) => {
        setIsBooking(true);
        setError(null);
        try {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            
            // 1. Create Razorpay Order
            const orderRes = await api.post('/bookings/create-order', {
                sport: selectedSport,
                date: formattedDate,
                slot: selectedSlot
            });

            if (!orderRes || !orderRes.id) {
                throw new Error("Failed to create payment order");
            }

            if (!window.Razorpay) {
                throw new Error("Razorpay SDK not loaded. Please refresh the page.");
            }

            // 2. Initialize Razorpay Checkout
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'YOUR_RAZORPAY_KEY_ID_HERE',
                amount: orderRes.amount,
                currency: "INR",
                name: "Sky Smash Courts",
                description: `Booking for ${selectedSport} at ${selectedSlot}`,
                order_id: orderRes.id,
                handler: async function (response: any) {
                    try {
                        // 3. Verify Payment and Finalize Booking
                        await api.post('/bookings', {
                            ...data,
                            date: formattedDate,
                            slot: selectedSlot,
                            sport: selectedSport,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature
                        });
                        setSuccess(true);
                        setSelectedSlot(null);
                        fetchBookedSlots();
                    } catch (err: any) {
                        setError(err.message === 'API Error' ? 'Payment verification failed. Backend down.' : err.message);
                    } finally {
                        setIsBooking(false);
                    }
                },
                prefill: {
                    name: data.name,
                    email: data.email,
                    contact: data.phone
                },
                theme: {
                    color: "#f97316" // Orange primary matching
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response: any) {
                setError("Payment failed: " + response.error.description);
                setIsBooking(false);
            });
            rzp.open();

        } catch (err: any) {
            setError(err.message === 'API Error' ? 'Failed to prepare booking. Backend might be down.' : err.message);
            setIsBooking(false);
        }
    };


    return (
        <main className="min-h-screen flex flex-col bg-background relative overflow-hidden">
            <Script 
                src="https://checkout.razorpay.com/v1/checkout.js" 
                strategy="afterInteractive" 
                onLoad={() => console.log('Razorpay Script Loaded')}
                onError={(e) => {
                    console.error('Razorpay Script Load Error', e);
                    setError('Payment gateway failed to load. Please try again or disable your adblocker.');
                }}
            />
            
            {/* Dynamic Background Image */}
            <div className="fixed inset-0 z-0 transition-opacity duration-1000">
                <img 
                    src={backgroundImages[selectedSport]} 
                    alt={selectedSport} 
                    className="w-full h-full object-cover opacity-20 mix-blend-overlay blur-[2px] transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background transition-colors duration-700" />
            </div>

            <div className="relative z-10 w-full">
                <Navbar />
            </div>

            <div className="relative z-10 flex-grow py-12 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-extrabold mb-10 text-foreground text-center drop-shadow-md">Book Your Slot</h1>

                    <div className="mb-12 flex justify-center flex-wrap gap-4">
                        {SPORTS.map(sport => (
                            <button
                                key={sport}
                                onClick={() => setSelectedSport(sport)}
                                className={`px-6 py-3 rounded-full text-sm font-bold transition-all shadow-md ${selectedSport === sport
                                    ? 'bg-primary text-primary-foreground scale-105 shadow-primary/30 border border-transparent'
                                    : 'bg-card/80 backdrop-blur-sm text-muted-foreground border border-border hover:border-primary/50 hover:text-foreground'
                                    }`}
                            >
                                {sport}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Calendar Column */}
                        <div className="lg:col-span-1">
                            <BookingCalendar onDateSelect={setSelectedDate} selectedDate={selectedDate} />
                        </div>

                        {/* Slots Column */}
                        <div className="lg:col-span-1">
                            <div className="bg-card p-6 rounded-2xl shadow-xl border border-border">
                                <h3 className="text-xl font-semibold mb-4 text-foreground">Available Slots</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {TIME_SLOTS.map(slot => {
                                        const isBooked = bookedSlots.includes(slot);
                                        return (
                                            <button
                                                key={slot}
                                                disabled={isBooked}
                                                onClick={() => setSelectedSlot(slot)}
                                                className={`py-2 px-3 rounded-md text-sm font-medium transition-all ${isBooked
                                                    ? 'bg-red-500/10 text-red-500 cursor-not-allowed border border-red-500/20'
                                                    : selectedSlot === slot
                                                        ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                                                        : 'bg-muted/50 text-foreground hover:bg-muted hover:text-primary'
                                                    }`}
                                            >
                                                {slot} {isBooked && "(Booked)"}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="lg:col-span-1">
                            {success ? (
                                <div className="bg-green-500/10 border border-green-500 p-8 rounded-2xl text-center">
                                    <h3 className="text-2xl font-bold text-green-500 mb-2">Success!</h3>
                                    <p className="text-foreground">Your booking has been confirmed.</p>
                                    <button
                                        onClick={() => setSuccess(false)}
                                        className="mt-6 text-sm font-semibold text-primary hover:underline"
                                    >
                                        Make another booking
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {error && <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-4 text-sm font-medium">{error}</div>}
                                    <BookingForm
                                        onSubmit={handleBookingSubmit}
                                        selectedSlot={selectedSlot}
                                        selectedDate={selectedDate}
                                        selectedSport={selectedSport}
                                        isLoading={isBooking}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="relative z-10 w-full">
                <Footer />
            </div>
        </main>
    );
}
