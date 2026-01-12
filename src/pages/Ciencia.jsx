import React, { useState, useMemo } from 'react';
import { Microscope, Clock, Zap, Brain, ArrowLeft, ArrowRight, ExternalLink, Search, Filter, FileText, PlayCircle, X } from 'lucide-react';
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

const PaperModal = ({ paper, onClose }) => {
    if (!paper) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-up">
                <div className="p-6 md:p-8">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900">
                        <X size={24} />
                    </button>

                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
                        Paper Científic
                    </span>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{paper.title}</h3>
                    <p className="text-gray-500 text-sm mb-6 italic">{paper.authors} — {paper.journal}</p>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <FileText size={18} className="text-purple-600" /> Abstract / Resum
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {paper.abstract}
                        </p>
                    </div>

                    <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-all hover:scale-[1.01]"
                    >
                        Llegir estudi complet <ExternalLink size={18} />
                    </a>
                </div>
            </div>
        </div>
    );
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
    const [complexity, setComplexity] = useState('beginner'); // 'beginner' | 'advanced'
    const [selectedPaper, setSelectedPaper] = useState(null);

    const papersData = [
        {
            title: "The Hallmarks of Aging: An Expanding Universe",
            authors: "López-Otín, C., et al.",
            journal: "Cell (2023)",
            url: "https://pubmed.ncbi.nlm.nih.gov/36599349/",
            abstract: "This seminal paper defines the biological hallmarks of aging. It identifies genomic instability, telomere attrition, epigenetic alterations, loss of proteostasis, deregulated nutrient-sensing, mitochondrial dysfunction, cellular senescence, stem cell exhaustion, and altered intercellular communication as the primary causes of cellular damage."
        },
        {
            title: "Circadian rhythms and health: From mechanisms to policy",
            authors: "Allada, R., et al.",
            journal: "Science (2021)",
            url: "https://pubmed.ncbi.nlm.nih.gov/34091684/",
            abstract: "Circadian rhythms orchestrate diverse biological processes, including sleep-wake cycles, metabolism, and immune function. Disruption of these rhythms is linked to metabolic disorders, cancer, and neurodegenerative diseases. This review highlights the importance of light exposure and timing in maintaining health."
        },
        {
            title: "Mitochondrial dysfunction and longevity in animals: An update",
            authors: "Sun, N., et al.",
            journal: "Prog Lipid Res (2023)",
            url: "https://pubmed.ncbi.nlm.nih.gov/37652253/",
            abstract: "Mitochondria are central to energy production and metabolism. This paper reviews how mitochondrial function declines with age and how specific interventions (dietary restriction, exercise) can enhance mitochondrial biogenesis and efficiency to promote longevity."
        }
    ];

    const content = {
        beginner: {
            crono: "El teu cos té un rellotge intern. Quan menges o dorms a deshora, aquest rellotge es confon, afectant la teva energia i estat d'ànim. La llum del sol és la 'senyal Wi-Fi' que el posa en hora.",
            mito: "Les mitocòndries són les bateries de les teves cèl·lules. Amb l'edat, perden capacitat de càrrega. Els nostres protocols ajuden a 'recarregar' aquestes bateries perquè funcionin com quan eres jove.",
            neuro: "El cervell no és rígid, és com plastilina. Pots crear nous camins neuronals a qualsevol edat. Aprendre a calmar la ment i enfocar-se enforteix físicament el cervell.",
        },
        advanced: {
            crono: "El nucli supraquiasmàtic (SCN) regula l'expressió genètica circadiana (gens CLOCK/BMAL1). La desincronització cronobiològica condueix a resistència a la insulina i inflamació sistèmica de baix grau.",
            mito: "La disfunció mitocondrial redueix la producció d'ATP i augmenta les espècies reactives d'oxigen (ROS). Activem l'AMPK i les sirtuïnes per promoure la biogènesi mitocondrial i la mitofàgia.",
            neuro: "La neuroplasticitat depèn del BDNF (Brain-Derived Neurotrophic Factor). L'entrenament cognitiu i l'atenció plena augmenten la densitat de matèria grisa i la connectivitat funcional al còrtex prefrontal.",
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <SEO
                title="La Ciència"
                description="Descobreix l'evidència científica que recolza el nostre protocol de longevitat i salut metabòlica."
            />

            {selectedPaper && <PaperModal paper={selectedPaper} onClose={() => setSelectedPaper(null)} />}

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

                    {/* COMPLEXITY TOGGLE */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-white p-1 rounded-full shadow-sm border border-gray-200 inline-flex">
                            <button
                                onClick={() => setComplexity('beginner')}
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${complexity === 'beginner' ? 'bg-purple-100 text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Principiant
                            </button>
                            <button
                                onClick={() => setComplexity('advanced')}
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${complexity === 'advanced' ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Avançat
                            </button>
                        </div>
                    </div>

                    {/* FONAMENTS CIENTÍFICS - 3 PILARS */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            Fonaments Científics 🧬
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Pilar 1 */}
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 flex flex-col">
                                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 text-purple-600">
                                    <Clock size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Cronobiologia</h3>
                                <p className="text-gray-600 leading-relaxed flex-grow">
                                    {content[complexity].crono}
                                </p>
                            </div>

                            {/* Pilar 2 */}
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 flex flex-col">
                                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6 text-orange-600">
                                    <Zap size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Biologia Mitocondrial</h3>
                                <p className="text-gray-600 leading-relaxed flex-grow">
                                    {content[complexity].mito}
                                </p>
                            </div>

                            {/* Pilar 3 */}
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 flex flex-col">
                                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                                    <Brain size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Neuroplasticitat</h3>
                                <p className="text-gray-600 leading-relaxed flex-grow">
                                    {content[complexity].neuro}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* LES 5 ÀREES CIENTÍFIQUES + VIDEOS */}
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
                                    <div className="flex-1 space-y-4">
                                        <p className="text-gray-600">
                                            <span className="font-semibold text-gray-900">Objectiu:</span> Optimitzar la teva "bateria interna" perquè les cèl·lules produeixin energia sense "rovellar-se" (reduir l'estrès oxidatiu) i ensenyar al cos a fer servir tant sucre com greix com a combustible.
                                        </p>
                                        <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-200 transition group">
                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-purple-600 group-hover:scale-110 transition">
                                                <PlayCircle size={20} fill="currentColor" className="text-white" />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Vídeo Explicatiu (1 min)</h4>
                                                <p className="text-sm font-bold text-gray-900">Com funciona la flexibilitat metabòlica?</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Son */}
                                <div className="p-8 hover:bg-gray-50 transition flex flex-col md:flex-row gap-6 md:items-center">
                                    <div className="flex items-center gap-3 w-48 shrink-0">
                                        <span className="text-2xl">🌙</span>
                                        <h3 className="text-xl font-bold text-gray-900">Son</h3>
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <p className="text-gray-600">
                                            <span className="font-semibold text-gray-900">Objectiu:</span> Activar el "servei de neteja" nocturn del cervell (sistema glimfàtic) per eliminar residus tòxics acumulats durant el dia.
                                        </p>
                                        <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-200 transition group">
                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-purple-600 group-hover:scale-110 transition">
                                                <PlayCircle size={20} fill="currentColor" className="text-white" />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Vídeo Explicatiu (1 min)</h4>
                                                <p className="text-sm font-bold text-gray-900">El sistema glimfàtic i la neteja cerebral</p>
                                            </div>
                                        </div>
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

                    {/* GLOSSARI CIENTÍFIC */}
                    <GlossarySection />

                    {/* REFERÈNCIES & PAPERS */}
                    <div className="mb-20">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                            Referències i Evidència <ExternalLink size={20} className="text-gray-400" />
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {papersData.map((paper, i) => (
                                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
                                    <div className="mb-4">
                                        <span className="text-[10px] font-bold uppercase tracking-wide bg-purple-50 text-purple-700 px-2 py-1 rounded">
                                            Paper Clau
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-2 leading-snug">
                                        {paper.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 mb-4">
                                        {paper.journal}
                                    </p>
                                    <button
                                        onClick={() => setSelectedPaper(paper)}
                                        className="mt-auto w-full py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        Preview <FileText size={14} />
                                    </button>
                                </div>
                            ))}
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
