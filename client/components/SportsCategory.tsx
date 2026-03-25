import Link from 'next/link';

const sports = [
    {
        name: 'Turf Football',
        description: '5v5 and 7v7 FIFA standard turf grounds.',
        icon: '⚽',
        image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop'
    },
    {
        name: 'Badminton',
        description: 'Indoor wooden courts with BWF approved mats.',
        icon: '🏸',
        image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1000&auto=format&fit=crop'
    },
    {
        name: 'Other Activities',
        description: 'Box Cricket, Swimming, and more.',
        icon: '🏊',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop'
    },
];

export default function SportsCategory() {
    return (
        <div id="sports" className="py-24 sm:py-32 bg-background">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">Choose Your Game</h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        Select your preferred sport to check availability and book slots instantly.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {sports.map((sport) => (
                        <Link href="/book" key={sport.name} className={`group relative rounded-2xl border border-border overflow-hidden hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 flex flex-col h-96 cursor-pointer`}>
                            {/* Background Image */}
                            <img src={sport.image} alt={sport.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/10 group-hover:from-background group-hover:via-background/60 transition-colors duration-500" />

                            {/* Content */}
                            <div className="relative z-10 mt-auto p-8">
                                <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg`}>
                                    <span className="text-2xl">{sport.icon}</span>
                                </div>
                                <h3 className="text-3xl font-bold text-white group-hover:text-primary transition-colors">
                                    {sport.name}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-gray-300">
                                    {sport.description}
                                </p>
                                <div className="mt-6 flex items-center text-sm font-bold text-primary group-hover:text-orange-400 transition-colors">
                                    Book Slot <span aria-hidden="true" className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
