import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RefundPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <div className="flex-grow py-12 px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-card p-8 md:p-12 rounded-2xl border border-border">
                    <h1 className="text-3xl font-bold mb-6 text-foreground">Cancellation & Refund Policy</h1>
                    <div className="space-y-6 text-muted-foreground">
                        <p>We understand that plans can change. Please read our cancellation and refund policy carefully.</p>
                        
                        <h2 className="text-xl font-semibold text-foreground">Cancellations</h2>
                        <p>You may request a cancellation of your booking up to 24 hours before your scheduled slot. Cancellations made within 24 hours of the booking time are strictly non-refundable.</p>
                        
                        <h2 className="text-xl font-semibold text-foreground">Refunds</h2>
                        <p>If a cancellation is requested successfully within the allowed timeframe, a refund will be initiated to your original payment method. Please allow 5-7 business days for the amount to reflect in your bank account, subject to Razorpay's processing times.</p>
                        
                        <h2 className="text-xl font-semibold text-foreground">Facility Unavailability</h2>
                        <p>In the rare event that Sky Smash Courts has to cancel your booking due to unforeseen circumstances (e.g., severe weather, maintenance issues), a full 100% refund will be issued immediately.</p>
                        
                        <h2 className="text-xl font-semibold text-foreground">No-Shows</h2>
                        <p>Failure to arrive for your booked slot without prior notice will result in the forfeiture of the entire booking amount. No refunds will be provided for no-shows.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
