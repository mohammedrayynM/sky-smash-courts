import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <div className="flex-grow py-12 px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-card p-8 md:p-12 rounded-2xl border border-border">
                    <h1 className="text-3xl font-bold mb-6 text-foreground">Privacy Policy</h1>
                    <div className="space-y-6 text-muted-foreground">
                        <p><strong>Last Updated:</strong> March 2026</p>
                        <p>Sky Smash Courts ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and safeguarded.</p>
                        
                        <h2 className="text-xl font-semibold text-foreground">Information We Collect</h2>
                        <p>We collect information you provide directly to us when making a booking, such as your Name, Phone Number, and Email Address. We do not store your credit card or payment data directly; all transactions are securely processed by Razorpay.</p>
                        
                        <h2 className="text-xl font-semibold text-foreground">How We Use Your Information</h2>
                        <p>We use the information we collect to process your bookings, communicate with you regarding your slot times, and for internal analytical purposes to improve our services.</p>
                        
                        <h2 className="text-xl font-semibold text-foreground">Data Security</h2>
                        <p>We implement strict security measures to maintain the safety of your personal information. However, no data transmission over the Internet can be guaranteed as 100% secure.</p>
                        
                        <h2 className="text-xl font-semibold text-foreground">Contact Us</h2>
                        <p>If you have any questions regarding this Privacy Policy, you may contact us using the information on our Contact page.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
