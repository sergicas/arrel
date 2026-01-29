import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
    {
        quote:
            "Em despertava cansat cada dia a les 7:30. El protocol de 'Llum Matinal' va semblar massa simple, però al tercer dia ja no necessitava el cafè de les 11. És pura biologia, no màgia.",
        author: 'Jordi S.',
        info: 'Barcelona · 42 anys',
        initials: 'JS',
        color: 'purple',
    },
    {
        quote:
            "Tenia 'boira mental' cada tarda a les 16:00. Arrel va identificar un pic de glucosa com a culpable. Vaig canviar l'ordre dels aliments al dinar i la boira va desaparèixer el primer dia.",
        author: 'Anna M.',
        info: 'Girona · 35 anys',
        initials: 'AM',
        color: 'blue',
    },
    {
        quote:
            "Les dades deien que el meu son profund era 0. Implementar la 'finestra de desconnexió' de 90 minuts abans de dormir ha duplicat la meva recuperació segons el meu Oura Ring.",
        author: 'Marc P.',
        info: 'Sant Cugat · 50 anys',
        initials: 'MP',
        color: 'green',
    },
];

const TestimonialCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, []);

    const prevTestimonial = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, []);

    // Auto-play
    useEffect(() => {
        const timer = setInterval(() => {
            nextTestimonial();
        }, 8000); // 8 seconds per slide
        return () => clearInterval(timer);
    }, [currentIndex, nextTestimonial]);



    const current = testimonials[currentIndex];

    const getColorClasses = (color) => {
        switch (color) {
            case 'purple':
                return 'bg-purple-100 text-purple-700';
            case 'blue':
                return 'bg-blue-100 text-blue-700';
            case 'green':
                return 'bg-green-100 text-green-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="relative max-w-4xl mx-auto px-4">
            {/* Navigation Buttons (Desktop) */}
            <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg text-gray-400 hover:text-gray-900 hover:scale-110 transition-all z-10"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg text-gray-400 hover:text-gray-900 hover:scale-110 transition-all z-10"
            >
                <ChevronRight size={24} />
            </button>

            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100 min-h-[300px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex gap-1 mb-6 text-yellow-400 justify-center">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={20} fill="currentColor" />
                            ))}
                        </div>

                        <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed italic text-center font-serif">
                            "{current.quote}"
                        </p>

                        <div className="flex items-center justify-center gap-4">
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${getColorClasses(
                                    current.color
                                )}`}
                            >
                                {current.initials}
                            </div>
                            <div className="text-left">
                                <p className="text-base font-bold text-gray-900">{current.author}</p>
                                <p className="text-sm text-gray-500">{current.info}</p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-gray-900' : 'w-2 bg-gray-300'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default TestimonialCarousel;
