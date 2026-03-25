import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <div className="flex-grow py-12 px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-card p-8 md:p-12 rounded-2xl border border-border text-center">
                    <h1 className="text-3xl font-bold mb-6 text-foreground">Contact Us</h1>
                    <p className="text-muted-foreground mb-12">We would love to hear from you. Reach out to us for any queries, bulk bookings, or feedback.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-muted/30 rounded-xl border border-border">
                            <div className="text-4xl mb-4">📍</div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">Location</h3>
                            <p className="text-muted-foreground text-sm">
                                123 Sky Smash Road,<br />
                                Anna Nagar, Chennai,<br />
                                Tamil Nadu 600040
                            </p>
                        </div>

                        <div className="p-6 bg-muted/30 rounded-xl border border-border">
                            <div className="text-4xl mb-4">✉️</div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
                            <a href="mailto:mohamnedrayyan97@gmail.com" className="text-primary hover:underline text-sm break-all">
                                mohamnedrayyan97@gmail.com
                            </a>
                        </div>

                        <div className="p-6 bg-muted/30 rounded-xl border border-border">
                            <div className="text-4xl mb-4">📞</div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">Phone</h3>
                            <p className="text-muted-foreground text-sm">
                                +91 98765 43210
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
