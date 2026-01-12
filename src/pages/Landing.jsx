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
    CheckCircle,
    Star,
    ChevronDown,
    ChevronUp,
    PlayCircle
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

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-100 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
            >
                <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-purple-600' : 'text-gray-900 group-hover:text-purple-600'}`}>
                    {question}
                </span>
                {isOpen ? <ChevronUp className="text-purple-600" /> : <ChevronDown className="text-gray-400 group-hover:text-purple-600" />}
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100 pb-6' : 'max-h-0 opacity-0'
                    }`}
            >
                <p className="text-gray-600 leading-relaxed">
                    {answer}
                </p>
            </div>
        </div>
    );
};

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

            {/* HERO SECTION */}
            <section className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden bg-[#fafafa]">
                <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100/40 via-transparent to-transparent"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <div className="text-left animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900 text-white text-xs font-bold mb-8 tracking-wide uppercase shadow-lg shadow-purple-900/10">
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
                                    className="px-10 py-5 bg-gray-900 text-white text-xl font-bold rounded-full hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center gap-2 min-w-[280px]"
                                >
                                    Començar Diagnòstic <ArrowRight size={24} />
                                </button>
                            </div>

                            <p className="mt-8 text-sm text-gray-500 flex items-center gap-2">
                                <CheckCircle size={16} className="text-green-500" />
                                Gratuït · Resultats immediats · Sense registre
                            </p>
                        </div>

                        {/* Visual Demo / Hero Image */}
                        <div className="relative animate-fade-in-up delay-200 perspective-1000">
                            {/* Decorative blobs */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-purple-200/50 to-blue-200/50 opacity-40 blur-3xl rounded-full"></div>

                            {/* Mock Interface Card */}
                            <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6 transform rotate-y-6 hover:rotate-y-0 transition-transform duration-700 ease-out preserve-3d">
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-gray-200 rounded-full"></div>

                                {/* Header Mock */}
                                <div className="flex justify-between items-center mb-8 mt-4">
                                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                    <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                                        <Activity size={16} />
                                    </div>
                                </div>

                                {/* Content Mock */}
                                <div className="space-y-6">
                                    <div className="h-32 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-100 flex items-center justify-center relative overflow-hidden group cursor-default">
                                        <div className="text-center">
                                            <span className="block text-4xl font-bold text-gray-900 mb-1">82<span className="text-sm text-gray-400">%</span></span>
                                            <span className="text-xs text-gray-500 uppercase tracking-widest">Vitalitat</span>
                                        </div>
                                        <div className="absolute bottom-0 w-full h-1 bg-gray-100">
                                            <div className="h-full bg-purple-500 w-[82%]"></div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                                            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-green-500"><CheckCircle size={14} /></div>
                                            <div className="h-2 w-32 bg-gray-200 rounded"></div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                                            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-green-500"><CheckCircle size={14} /></div>
                                            <div className="h-2 w-24 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>

                                    <button className="w-full py-3 bg-gray-900 text-white rounded-xl text-sm font-bold opacity-90">
                                        Veure Informe Complet
                                    </button>
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce-subtle z-20">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded-lg text-green-600">
                                        <Shield size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase">Edat Biològica</p>
                                        <p className="text-lg font-bold text-gray-900">-2.5 Anys</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3 PHASES - ENHANCED */}
            <RevealOnScroll>
                <section className="py-32 bg-white relative">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">El Mètode Arrel</h2>
                            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Ciència complexa, aplicada de forma simple.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-12 text-center">
                            {/* Phase 1 */}
                            <div className="group p-8 rounded-3xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 text-purple-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <Activity size={40} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Analitza</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    80% de l'envelliment no és genètic. Identifiquem els "lladres d'energia" del teu dia a dia.
                                </p>
                            </div>

                            {/* Phase 2 */}
                            <div className="group p-8 rounded-3xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 text-blue-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <Clock size={40} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Diagnostica</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Calculem la teva Edat Biològica aproximada i et mostrem en quina àrea estàs envellint més ràpid.
                                </p>
                            </div>

                            {/* Phase 3 */}
                            <div className="group p-8 rounded-3xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 text-green-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <Zap size={40} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Reverteix</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Rebràs un protocol personalitzat. No es tracta de fer més, sinó de deixar de fer el que et malmet.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </RevealOnScroll>

            {/* TESTIMONIALS */}
            <section className="py-24 bg-[#fafafa]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
                        Històries de Rejoveniment
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <div className="flex gap-1 mb-4 text-yellow-400">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed italic">
                                "Pensava que el meu cansament era 'normal' per l'edat. El diagnòstic em va fer veure que era la meva falta de rituals de llum. En 2 setmanes sóc un altre."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-sm">JS</div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Jordi S.</p>
                                    <p className="text-xs text-gray-500">Barcelona · 42 anys</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <div className="flex gap-1 mb-4 text-yellow-400">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed italic">
                                "M'encanta que no em vulgui vendre suplements des del minut 1. Els protocols d'hàbits són brutals i gratuïts."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm">AM</div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Anna M.</p>
                                    <p className="text-xs text-gray-500">Girona · 35 anys</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <div className="flex gap-1 mb-4 text-yellow-400">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed italic">
                                "La claredat mental que he guanyat només canviant l'esmorzar és increïble. Eina molt recomanable."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-sm">MP</div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Marc P.</p>
                                    <p className="text-xs text-gray-500">Sant Cugat · 50 anys</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-24 bg-white">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Preguntes Freqüents</h2>
                    <div className="space-y-2">
                        <FAQItem
                            question="És realment gratuït?"
                            answer="Sí. La missió d'Arrel és democratitzar la longevitat. El diagnòstic i el protocol bàsic són 100% gratuïts."
                        />
                        <FAQItem
                            question="Necessito registrar-me per veure resultats?"
                            answer="No. Creiem en la privacitat primer. Pots fer el test sencer i veure els resultats com a convidat. Només si vols guardar el progrés necessitaràs un compte."
                        />
                        <FAQItem
                            question="En què es basa la ciència?"
                            answer="Ens basem en els pilars de la medicina de l'estil de vida i la gerontociència: ritmes circadians, nutrició metabòlica, hormesis i psicologia conductual."
                        />
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-24 bg-gray-900 text-white text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
                        El teu jo del futur t'ho agrairà.
                    </h2>
                    <button
                        onClick={() => navigate('/diagnosis')}
                        onMouseEnter={() => import('../pages/Diagnosis')}
                        className="px-10 py-5 bg-white text-gray-900 text-xl font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-pulse-slow"
                    >
                        Començar Ara
                    </button>
                    <p className="mt-6 text-gray-400">
                        Els resultats són privats i 100% teus.
                    </p>
                </div>
            </section>
        </>
    );
}
