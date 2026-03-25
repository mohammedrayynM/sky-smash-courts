import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold tracking-tighter">
                            <span className="text-primary">Sky</span>
                            <span className="text-foreground">Smash</span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/" className="hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link href="/book" className="hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">Book Now</Link>
                            <Link href="/about" className="hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">About</Link>
                        </div>
                    </div>
                    <div>
                        <Link href="/book" className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-full font-semibold transition-all shadow-[0_0_15px_rgba(14,165,233,0.5)] hover:shadow-[0_0_25px_rgba(14,165,233,0.7)]">
                            Book a Slot
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
