import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowRight,
    Clock,
    Shield,
    Activity,
    Zap,
    Moon,
    Brain,
    CheckCircle
} from 'lucide-react';

import SEO from '../components/SEO';

// -----------------------------------------------------------------------------
// HELPER COMPONENTS
// -----------------------------------------------------------------------------

const RevealOnScroll = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } `}
        >
            {children}
        </div>
    );
};

// Footer component removed (delegated to Layout)

// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------

export default function Landing() {
    const navigate = useNavigate();

    return (
        <>
            <SEO
                title="Arrel | Frena el teu envelliment"
                description="Descobreix la teva edat biològica i com alentir el procés d'envelliment amb protocols basats en ciència."
            />

            {/* HERO SECTION - SIMPLIFIED & DIRECT */}
            <section className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden bg-[#fafafa]">
                {/* Background subtleties */}
                <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100/40 via-transparent to-transparent"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <div className="text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900 text-white text-xs font-bold mb-8 tracking-wide uppercase animate-fade-in">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                Longevitat Científica
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-gray-900 mb-6 leading-[1.1]">
                                Frena el teu <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                                    envelliment.
                                </span>
                            </h1>

                            <p className="text-xl text-gray-600 mb-10 leading-relaxed font-light max-w-lg">
                                Com envelleixes està a les teves mans. <br className="hidden md:block" />
                                Descobreix la teva edat biològica i rep el protocol exacte per alentir-la.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-start items-center">
                                <button
                                    onClick={() => navigate('/diagnosis')}
                                    onMouseEnter={() => import('../pages/Diagnosis')}
                                    className="px-10 py-5 bg-gray-900 text-white text-xl font-bold rounded-full hover:bg-black transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2 min-w-[280px]"
                                >
                                    Començar Diagnòstic <ArrowRight size={24} />
                                </button>
                            </div>

                            <p className="mt-8 text-sm text-gray-500 flex items-center gap-2">
                                <CheckCircle size={16} className="text-green-500" />
                                Gratuït · Resultats immediats · Sense registre
                            </p>
                        </div>

                        {/* Image Content */}
                        <div className="relative animate-fade-in-up delay-200">
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-200 to-blue-200 opacity-20 blur-3xl rounded-full transform scale-110"></div>
                            <picture className="relative z-10 block w-full h-auto drop-shadow-2xl hover:scale-[1.02] transition-transform duration-700">
                                <source srcSet="/hero-image.webp" type="image/webp" />
                                <img
                                    src="/hero-image.png"
                                    alt="Representació abstracta de regeneració cel·lular"
                                    className="w-full h-auto object-contain"
                                    width="800"
                                    height="800"
                                    loading="eager"
                                />
                            </picture>
                        </div>
                    </div>
                </div>
            </section>

            {/* VALUE PROPOSITION - 3 SIMPLE STEPS */}
            <RevealOnScroll>
                <section className="py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid md:grid-cols-3 gap-12 text-center">
                            <div className="space-y-4">
                                <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-600">
                                    <Activity size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">1. Analitza</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    Entén com els teus hàbits actuals estan accelerant o frenant el teu rellotge biològic.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                                    <Clock size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">2. Diagnostica</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    Descobreix la teva "Edat Arrel". Si tens 30 anys però el teu metabolisme en té 45, hem d'actuar.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-600">
                                    <Zap size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">3. Reverteix</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    Protocols simples de nutrició, llum i moviment per rejovenir el teu sistema des de dins.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </RevealOnScroll>

            {/* CLEAR CTA STRIP */}
            <section className="py-24 bg-gray-900 text-white text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
                        No deixis que el teu cos envelleixi més ràpid que tu.
                    </h2>
                    <button
                        onClick={() => navigate('/diagnosis')}
                        onMouseEnter={() => import('../pages/Diagnosis')}
                        className="px-10 py-5 bg-white text-gray-900 text-xl font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        Fes el test d'envelliment
                    </button>
                    <p className="mt-6 text-gray-400">
                        Els resultats són privats i 100% teus.
                    </p>
                </div>
            </section>

            {/* Footer delegated to PublicLayout */}
        </>
    );
}
