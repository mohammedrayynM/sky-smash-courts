import Link from 'next/link';

export default function Hero() {
    return (
        <div className="relative overflow-hidden bg-background py-24 sm:py-32 min-h-[90vh] flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=2000&auto=format&fit=crop" 
                    alt="Turf Football Stadium" 
                    className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />
            </div>

            {/* Glowing Effect Objects */}
            <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
                <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-primary opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center mt-12">
                <div className="mx-auto max-w-3xl">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-7xl animate-fade-in-up drop-shadow-xl">
                        Book Your Game. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Smash Your Limits.</span>
                    </h1>
                    <p className="mt-8 text-lg leading-8 text-gray-300 drop-shadow-md">
                        The premium destination for Turf Football, Badminton, and indoor sports.
                        Experience world-class facilities and dynamic lighting at Sky Smash Courts.
                    </p>
                    <div className="mt-12 flex items-center justify-center gap-x-6">
                        <Link href="/book" className="rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-xl shadow-primary/30 hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all hover:scale-105">
                            Book Now <span aria-hidden="true">→</span>
                        </Link>
                        <a href="#sports" className="text-base font-semibold leading-6 text-foreground hover:text-primary transition-colors">
                            Explore Sports <span aria-hidden="true">↓</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
