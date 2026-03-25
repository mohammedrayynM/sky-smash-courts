"use client";

import { useState, useEffect } from 'react';

const photos = [
    "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2000&auto=format&fit=crop"
];

export default function PhotoGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % photos.length);
        }, 3500); // 3.5 seconds
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="py-12 sm:py-24 bg-background">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-12">
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">Experience the Action</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        A glimpse into the premium sports facilities at Sky Smash Courts.
                    </p>
                </div>
                
                <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-border group">
                    {photos.map((photo, index) => (
                        <div 
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                            <img 
                                src={photo} 
                                alt={`Gallery Photo ${index + 1}`} 
                                className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-105"
                            />
                            {/* Overlay to keep the premium dark theme feel */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />
                        </div>
                    ))}
                    
                    {/* Navigation Dots */}
                    <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-3">
                        {photos.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-primary w-8 shadow-[0_0_10px_rgba(249,115,22,0.8)]' : 'bg-white/50 hover:bg-white'}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
