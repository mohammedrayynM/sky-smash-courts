import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-muted py-12 border-t border-border">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <Link href="/" className="text-2xl font-bold tracking-tighter">
                            <span className="text-primary">Sky</span>
                            <span className="text-foreground">Smash</span>
                        </Link>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Book your game. Smash your limits.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
                        <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
                        <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link>
                        <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/refund" className="text-sm text-muted-foreground hover:text-primary transition-colors">Refund Policy</Link>
                        <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link>
                    </div>
                </div>
                <div className="mt-8 border-t border-border/50 pt-8 text-center text-xs text-muted-foreground">
                    &copy; {new Date().getFullYear()} Sky Smash Courts. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
