import React, { useState, useMemo } from 'react';
import { Microscope, Clock, Zap, Brain, ArrowLeft, ArrowRight, ExternalLink, Search, Filter } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { glossaryTerms } from '../data/glossaryData';

// Helper to highlight cross-references
const highlightCrossLinks = (text, terms) => {
    let parts = [text];
    terms.forEach(termObj => {
        const term = termObj.term.split(' (')[0]; // Match "ATP" not "ATP (Adenosina...)"
        if (term.length < 4) return; // Skip short words to avoid noise

        const newParts = [];
        parts.forEach(part => {
            if (typeof part !== 'string') {
                newParts.push(part);
                return;
            }
            // Simple split, capable of being improved with Regex for case insensitivity
            const split = part.split(new RegExp(`(${term})`, 'gi'));
            split.forEach((s, i) => {
                if (s.toLowerCase() === term.toLowerCase()) {
                    newParts.push(<span key={term + i} className="font-bold text-purple-600 cursor-help" title="Terme relacionat">{s}</span>);
                } else {
                    newParts.push(s);
                }
            });
        });
        parts = newParts;
    });
    return parts;
};

const GlossarySection = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('Tots');

    const categories = ['Tots', ...new Set(glossaryTerms.map(t => t.category))].sort();

    const filtered = useMemo(() => {
        return glossaryTerms.filter(item => {
            const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.def.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === 'Tots' || item.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, activeCategory]);

    return (
        <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Glossari de Termes Clau 📖
            </h2>

            {/* CONTROLS */}
            <div className="max-w-3xl mx-auto mb-10 space-y-4">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Cerca per concepte (ex: Autofàgia, Cortisol...)"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all
                                ${activeCategory === cat
                                    ? 'bg-gray-900 text-white shadow-md'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }
                            `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* RESULTS */}
            <div className="grid md:grid-cols-2 gap-6 min-h-[300px] content-start">
                {filtered.length > 0 ? (
                    filtered.map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 hover:border-purple-200 transition group hover:shadow-md h-full">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-purple-700 text-lg">{item.term}</h4>
                                <span className="text-[10px] uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-1 rounded">
                                    {item.category}
                                </span>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {highlightCrossLinks(item.def, glossaryTerms)}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="col-span-2 text-center py-12 text-gray-400">
                        <Filter size={48} className="mx-auto mb-4 opacity-20" />
                        <p>No hem trobat resultats per "{searchTerm}".</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const Ciencia = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <SEO
                title="La Ciència"
                description="Descobreix l'evidència científica que recolza el nostre protocol de longevitat i salut metabòlica."
            />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 md:p-12">
                <div className="max-w-5xl mx-auto">

                    {/* HERO */}
                    <div className="text-center mb-16 mt-8 animate-enter">
                        <div className="inline-block p-4 bg-white rounded-full shadow-md mb-6 rotate-3 hover:rotate-6 transition-transform">
                            <div className="text-purple-600">
                                <Microscope size={48} />
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            La Ciència darrere d'Arrel
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            No creiem en solucions màgiques. Arrel es basa en els últims avenços en biologia de la longevitat i neurociència.
                        </p>
                    </div>

                    {/* FONAMENTS CIENTÍFICS - 3 PILARS */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            Fonaments Científics 🧬
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Pilar 1: Cronobiologia */}
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300">
                                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 text-purple-600">
                                    <Clock size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Cronobiologia</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    El ritme circadià regula més del 80% dels processos cel·lulars. La sincronització amb la llum i foscor és clau per l'expressió genètica saludable.
                                </p>
                            </div>

                            {/* Pilar 2: Biologia Mitocondrial */}
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300">
                                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6 text-orange-600">
                                    <Zap size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Biologia Mitocondrial</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Les mitocòndries són les centrals energètiques de la longevitat. La seva disfunció és un dels distintius primaris de l'envelliment (Hallmarks of Aging).
                                </p>
                            </div>

                            {/* Pilar 3: Neuroplasticitat */}
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
                                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                                    <Brain size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Neuroplasticitat</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    El cervell pot crear noves connexions al llarg de tota la vida. L'entrenament cognitiu i l'atenció conscient poden revertir el deteriorament.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* LES 5 ÀREES CIENTÍFIQUES */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            Mecanismes d'Acció per Àrees 🔬
                        </h2>

                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                            <div className="divide-y divide-gray-100">

                                {/* Energia */}
                                <div className="p-8 hover:bg-gray-50 transition flex flex-col md:flex-row gap-6 md:items-center">
                                    <div className="flex items-center gap-3 w-48 shrink-0">
                                        <span className="text-2xl">⚡</span>
                                        <h3 className="text-xl font-bold text-gray-900">Energia</h3>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-600">
                                            <span className="font-semibold text-gray-900">Objectiu:</span> Optimitzar la teva "bateria interna" perquè les cèl·lules produeixin energia sense "rovellar-se" (reduir l'estrès oxidatiu) i ensenyar al cos a fer servir tant sucre com greix com a combustible.
                                        </p>
                                    </div>
                                </div>

                                {/* Son */}
                                <div className="p-8 hover:bg-gray-50 transition flex flex-col md:flex-row gap-6 md:items-center">
                                    <div className="flex items-center gap-3 w-48 shrink-0">
                                        <span className="text-2xl">🌙</span>
                                        <h3 className="text-xl font-bold text-gray-900">Son</h3>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-600">
                                            <span className="font-semibold text-gray-900">Objectiu:</span> Activar el "servei de neteja" nocturn del cervell per eliminar residus tòxics acumulats durant el dia i reparar els teixits del cos mentre dorms profundament.
                                        </p>
                                    </div>
                                </div>

                                {/* Nutrició */}
                                <div className="p-8 hover:bg-gray-50 transition flex flex-col md:flex-row gap-6 md:items-center">
                                    <div className="flex items-center gap-3 w-48 shrink-0">
                                        <span className="text-2xl">🥗</span>
                                        <h3 className="text-xl font-bold text-gray-900">Nutrició</h3>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-600">
                                            <span className="font-semibold text-gray-900">Objectiu:</span> Donar descans digestiu per activar el "reciclatge cel·lular" (autofàgia), on el cos es repara a si mateix eliminant parts velles o danyades, i mantenir els nivells de sucre estables.
                                        </p>
                                    </div>
                                </div>

                                {/* Atenció */}
                                <div className="p-8 hover:bg-gray-50 transition flex flex-col md:flex-row gap-6 md:items-center">
                                    <div className="flex items-center gap-3 w-48 shrink-0">
                                        <span className="text-2xl">🧠</span>
                                        <h3 className="text-xl font-bold text-gray-900">Atenció</h3>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-600">
                                            <span className="font-semibold text-gray-900">Objectiu:</span> Calmar el "soroll mental" constant i recuperar la capacitat d'enfocament profund, protegint el cervell de la sobrecàrrega digital i l'ansietat.
                                        </p>
                                    </div>
                                </div>

                                {/* Temps Viscut */}
                                <div className="p-8 hover:bg-gray-50 transition flex flex-col md:flex-row gap-6 md:items-center">
                                    <div className="flex items-center gap-3 w-48 shrink-0">
                                        <span className="text-2xl">⏰</span>
                                        <h3 className="text-xl font-bold text-gray-900">Temps Viscut</h3>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-600">
                                            <span className="font-semibold text-gray-900">Objectiu:</span> "Alentir" la percepció del temps vivint noves experiències amb intensitat. Quan creem records nous i rics, la vida es percep subjectivament més llarga i plena.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* GLOSSARI CIENTÍFIC (NOU) */}
                    <GlossarySection />

                    {/* REFERÈNCIES */}
                    <div className="mb-20">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                            Referències i Evidència <ExternalLink size={20} className="text-gray-400" />
                        </h2>
                        <div className="bg-purple-50 rounded-xl p-8 border border-purple-100">
                            <ul className="space-y-4 text-sm">
                                <li className="flex items-start gap-3 text-gray-700">
                                    <span className="text-purple-600 font-bold">•</span>
                                    <div>
                                        <strong>"The Hallmarks of Aging: An Expanding Universe."</strong> López-Otín et al., Cell (2023).
                                        <br />
                                        <a href="https://pubmed.ncbi.nlm.nih.gov/36599349/" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline text-xs">Veure a PubMed</a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 text-gray-700">
                                    <span className="text-purple-600 font-bold">•</span>
                                    <div>
                                        <strong>"Circadian rhythms and health: From mechanisms to policy."</strong> Allada et al., Science (2021).
                                        <br />
                                        <a href="https://pubmed.ncbi.nlm.nih.gov/34091684/" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline text-xs">Veure a PubMed</a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 text-gray-700">
                                    <span className="text-purple-600 font-bold">•</span>
                                    <div>
                                        <strong>"Mitochondrial dysfunction and longevity in animals: An update."</strong> Sun et al., Prog Lipid Res (2023).
                                        <br />
                                        <a href="https://pubmed.ncbi.nlm.nih.gov/37652253/" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline text-xs">Veure a PubMed</a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 text-gray-700">
                                    <span className="text-purple-600 font-bold">•</span>
                                    <div>
                                        <strong>"Neuroplasticity and cognitive aging: The scaffolding theory of aging and cognition."</strong> Park et al., Nat Rev Neurosci (2022 Revisió).
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* BOTONS FINALS */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="px-8 py-4 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition flex items-center justify-center gap-2"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Tornar a l'inici
                        </button>

                        <button
                            onClick={() => window.location.href = '/diagnosis'}
                            className="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/30 transition flex items-center justify-center gap-2"
                        >
                            Començar Diagnòstic
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Ciencia;
