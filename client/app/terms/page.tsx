import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <div className="flex-grow py-12 px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-card p-8 md:p-12 rounded-2xl border border-border">
                    <h1 className="text-3xl font-bold mb-6 text-foreground">Terms and Conditions</h1>
                    <div className="space-y-6 text-muted-foreground">
                        <p><strong>Last Updated:</strong> March 2026</p>
                        <p>Welcome to Sky Smash Courts. By accessing our website and making a booking, you agree to abide by these Terms and Conditions.</p>
                        
                        <h2 className="text-xl font-semibold text-foreground">1. Booking Rules</h2>
                        <p>All bookings made through the Sky Smash Courts platform are subject to availability. You must provide valid contact information during the booking process.</p>
                        
                        <h2 className="text-xl font-semibold text-foreground">2. Payment Terms</h2>
                        <p>Payments are processed securely via our payment gateway (Razorpay). A booking is only confirmed once the total amount is successfully paid. Prices are subject to change without prior notice.</p>
                        
                        <h2 className="text-xl font-semibold text-foreground">3. Conduct at the Facility</h2>
                        <p>Players must arrive at least 10 minutes prior to their booked slot. Appropriate sports attire and non-marking shoes are strictly required. Sky Smash Courts is not liable for any injuries sustained during play.</p>
                        
                        <h2 className="text-xl font-semibold text-foreground">4. Changes to Terms</h2>
                        <p>We reserve the right to modify these terms at any time. Continued use of our booking service implies acceptance of the updated terms.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
