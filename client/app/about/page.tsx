import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <div className="flex-grow">
                {/* Hero Section */}
                <div className="relative py-24 sm:py-32 bg-muted/20 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=2000&auto=format&fit=crop" 
                            alt="About Us Background" 
                            className="w-full h-full object-cover opacity-10 mix-blend-overlay"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground">
                            About <span className="text-primary">Sky Smash Courts</span>
                        </h1>
                        <p className="mt-6 text-xl leading-8 text-muted-foreground max-w-2xl mx-auto">
                            Elevating the sports experience in Chennai with world-class turf football, premium badminton courts, and unmatched facilities.
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="py-16 px-6 lg:px-8 max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-foreground">Our Story</h2>
                            <div className="space-y-4 text-muted-foreground leading-relaxed">
                                <p>
                                    Sky Smash Courts was founded with a single mission: to create a premium, accessible, and highly-equipped sporting environment for athletic enthusiasts of all levels. We believed that playing your favorite sport should feel like stepping into a professional arena.
                                </p>
                                <p>
                                    Located in the heart of Anna Nagar, Chennai, our facility uses FIFA-standard artificial turf and highly certified BWF indoor wooden mats for Badminton. We maintain strict hygiene protocols and ensure our courts are illuminated by advanced floodlights so you can play late into the night.
                                </p>
                                <p>
                                    Whether you are organizing a friendly 5v5 match, a competitive badminton tournament, or just looking to stay fit, Sky Smash Courts is your ultimate destination.
                                </p>
                            </div>
                        </div>
                        <div className="rounded-2xl overflow-hidden border border-border shadow-2xl relative h-96">
                            <img 
                                src="https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=1000&auto=format&fit=crop" 
                                alt="Our Facility" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
