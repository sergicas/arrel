import React, { useState, useEffect } from 'react';
import { Play, BookOpen, ExternalLink, Battery, Moon, Coffee, Brain, Clock, Pill, GraduationCap, Filter, Bookmark, Check, Star, Sparkles, FileText, Video } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { resourcesData } from '../data/resourcesData';
import { useArrelData } from '../hooks/useArrelData';

// Resource Modal Component
const ResourceModal = ({ resource, onClose, isBookmarked, toggleBookmark, isRead, markAsRead }) => {
    if (!resource) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">

                {/* Header Image pattern or solid color */}
                <div className="h-32 bg-gray-900 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-blue-900 opacity-90" />
                    <div className="absolute top-6 left-6 text-white/20">
                        {React.createElement(resource.icon, { size: 120, strokeWidth: 1 })}
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors z-10"
                    >
                        <ExternalLink size={20} className="rotate-45" />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); toggleBookmark(resource.id); }}
                        className={`absolute top-4 right-16 rounded-full p-2 transition-colors z-10 ${isBookmarked ? 'bg-yellow-400 text-yellow-900' : 'bg-black/20 text-white hover:bg-black/40'
                            }`}
                        title="Guardar per després"
                    >
                        <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
                    </button>
                </div>

                <div className="p-8 -mt-12 relative">
                    {/* Icon Bubble */}
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg text-purple-600 mb-6 relative">
                        {React.createElement(resource.icon, { size: 40 })}
                        {isRead && (
                            <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 border-2 border-white" title="Llegit">
                                <Check size={12} strokeWidth={4} />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="bg-purple-50 text-purple-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-purple-100">
                            {resource.category}
                        </span>
                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${resource.difficulty === 'bàsic' ? 'bg-green-50 text-green-700 border-green-100' :
                                resource.difficulty === 'intermedi' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                    'bg-red-50 text-red-700 border-red-100'
                            }`}>
                            {resource.difficulty}
                        </span>
                        <span className="text-gray-400 text-xs font-semibold flex items-center gap-1">
                            <Clock size={12} /> {resource.readTime}
                        </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                        {resource.title}
                    </h2>

                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        {resource.summary}
                    </p>

                    {/* Key Takeaways */}
                    {resource.takeaways && (
                        <div className="mb-8 bg-gray-50 rounded-xl p-6 border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Brain size={18} className="text-purple-600" />
                                Punts Clau (Takeaways)
                            </h4>
                            <ul className="space-y-3">
                                {resource.takeaways.map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                                        <span className="text-green-500 font-bold mt-1">✓</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="flex gap-4">
                        <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-gray-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-all hover:scale-[1.01] shadow-xl shadow-purple-900/10"
                            onClick={() => { markAsRead(resource.id); onClose(); }}
                        >
                            {resource.type === 'video' ? 'Veure Vídeo' : 'Llegir Article'} <ExternalLink size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Recursos() {
    const { loadData } = useArrelData();
    const [activeTab, setActiveTab] = useState('all');
    const [difficultyButtons, setDifficultyButtons] = useState('all'); // 'all', 'bàsic', 'intermedi', 'avançat'
    const [typeFilter, setTypeFilter] = useState('all'); // 'all', 'article', 'video', 'guia', 'estudi'
    const [selectedResource, setSelectedResource] = useState(null);

    // User State functionality
    const [bookmarks, setBookmarks] = useState(new Set());
    const [readHistory, setReadHistory] = useState(new Set());
    const [recommendedArea, setRecommendedArea] = useState(null);

    // Initial Load
    useEffect(() => {
        // Load bookmarks/history
        const savedBookmarks = localStorage.getItem('arrel_bookmarks');
        if (savedBookmarks) setBookmarks(new Set(JSON.parse(savedBookmarks)));

        const savedHistory = localStorage.getItem('arrel_history');
        if (savedHistory) setReadHistory(new Set(JSON.parse(savedHistory)));

        // Determine recommendation based on diagnosis (lowest score)
        // This logic mimics looking at all scores and finding the min
        const areas = ['energia', 'son', 'nutricio', 'atencio', 'temps'];
        let minScore = 101;
        let targetArea = null;

        areas.forEach(area => {
            // We'll mock reading scores directly from local storage key used by diagnosis if simpler, 
            // or assume we don't have perfect access to 'getAreaScore' without context.
            // Let's try to infer from 'arrel_user_scores' if present (hypothetically saved by Diagnosis page)
            const scores = localStorage.getItem('arrel_user_scores'); // Assuming Diagnosis saves this object
            if (scores) {
                const parsed = JSON.parse(scores);
                if (parsed[area] < minScore) {
                    minScore = parsed[area];
                    targetArea = area;
                }
            }
        });

        // Fallback or override for demo if no data
        if (!targetArea) {
            // Randomly pick one or default to 'son' if we want to show the feature
            // For now, let's look for ANY partial data or default to null (hide section)
            // But user requested "Recomanacions basades en el teu perfil", so let's default to 'son' if no data is found to show the UI
            // Or perform a check: if no diagnosis, don't show.
            const hasDiagnosis = localStorage.getItem('arrel_user_scores');
            if (hasDiagnosis) targetArea = 'son'; // Fallback if parsing fails but key exists
        }

        setRecommendedArea(targetArea);

    }, []);

    // Actions
    const toggleBookmark = (id) => {
        const newSet = new Set(bookmarks);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setBookmarks(newSet);
        localStorage.setItem('arrel_bookmarks', JSON.stringify([...newSet]));
    };

    const markAsRead = (id) => {
        const newSet = new Set(readHistory);
        newSet.add(id);
        setReadHistory(newSet);
        localStorage.setItem('arrel_history', JSON.stringify([...newSet]));
    };


    const filtered = resourcesData.filter(r => {
        const matchCategory = activeTab === 'all' || r.category === activeTab || (activeTab === 'bookmarks' && bookmarks.has(r.id));
        const matchDifficulty = difficultyButtons === 'all' || r.difficulty === difficultyButtons;
        const matchType = typeFilter === 'all' || r.type === typeFilter;
        return matchCategory && matchDifficulty && matchType;
    });

    const recommendations = recommendedArea
        ? resourcesData.filter(r => r.category === recommendedArea).slice(0, 3)
        : [];

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <SEO
                title="Recursos i Eines"
                description="Accedeix a guies, lectures i eines recomanades per aprofundir en el teu benestar."
            />

            {/* MODAL */}
            {selectedResource && (
                <ResourceModal
                    resource={selectedResource}
                    onClose={() => setSelectedResource(null)}
                    isBookmarked={bookmarks.has(selectedResource.id)}
                    toggleBookmark={toggleBookmark}
                    isRead={readHistory.has(selectedResource.id)}
                    markAsRead={markAsRead}
                />
            )}

            <div className="max-w-6xl mx-auto">

                {/* HERO */}
                <div className="mb-12 text-center animate-enter">
                    <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                        Biblioteca Arrel
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Recursos & Acadèmia
                    </h1>
                </div>

                {/* RECOMANACIONS (If diagnosis exists) */}
                {recommendations.length > 0 && (
                    <div className="mb-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 border border-purple-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-purple-500 rounded-full blur-3xl opacity-10 -mr-16 -mt-16"></div>
                        <div className="flex items-center gap-3 mb-6 relative z-10">
                            <Sparkles className="text-purple-600 fill-purple-200" />
                            <h2 className="text-xl font-bold text-gray-900">Seleccionat per a tu: <span className="capitalize text-purple-600">{recommendedArea}</span></h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6 relative z-10">
                            {recommendations.map(resource => (
                                <div
                                    key={resource.id}
                                    onClick={() => setSelectedResource(resource)}
                                    className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer border border-white/50"
                                >
                                    <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2">{resource.title}</h3>
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span className="bg-gray-100 px-2 py-1 rounded capitalize">{resource.difficulty}</span>
                                        <span>{resource.readTime}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* FILTER BAR - COMPACT */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-12 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-4 z-30">
                    {/* Category Tabs (Scrollable) */}
                    <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto scrollbar-hide">
                        {[
                            { id: 'all', label: 'Tots' },
                            { id: 'bookmarks', label: 'Guardats', icon: Bookmark }, // NEW
                            { id: 'energia', label: 'Energia' },
                            { id: 'son', label: 'Son' },
                            { id: 'nutricio', label: 'Nutrició' },
                            { id: 'atencio', label: 'Atenció' },
                            { id: 'temps', label: 'Temps' },
                            { id: 'suplements', label: 'Suplements' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === tab.id
                                    ? 'bg-gray-900 text-white shadow-md'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {tab.icon && <tab.icon size={12} fill={activeTab === tab.id ? "currentColor" : "none"} />}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Advanced Filters */}
                    <div className="flex gap-3 w-full md:w-auto justify-end">
                        <select
                            className="bg-gray-50 text-xs font-bold px-4 py-2 rounded-lg border-none focus:ring-2 focus:ring-purple-200 cursor-pointer"
                            value={difficultyButtons}
                            onChange={(e) => setDifficultyButtons(e.target.value)}
                        >
                            <option value="all">Qualsevol Nivell</option>
                            <option value="bàsic">Bàsic</option>
                            <option value="intermedi">Intermedi</option>
                            <option value="avançat">Avançat</option>
                        </select>

                        <select
                            className="bg-gray-50 text-xs font-bold px-4 py-2 rounded-lg border-none focus:ring-2 focus:ring-purple-200 cursor-pointer"
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                        >
                            <option value="all">Qualsevol Format</option>
                            <option value="article">Article</option>
                            <option value="guia">Guia</option>
                            <option value="estudi">Estudi</option>
                            <option value="video">Vídeo</option>
                        </select>
                    </div>
                </div>

                {/* GRID DE RECURSOS */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map(resource => (
                        <div
                            key={resource.id}
                            onClick={() => setSelectedResource(resource)}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer block h-full flex flex-col relative"
                        >
                            {/* Card Badges */}
                            <div className="absolute top-4 right-4 flex gap-2">
                                {readHistory.has(resource.id) && (
                                    <div className="bg-green-100 text-green-600 p-1.5 rounded-full" title="Llegit">
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                )}
                                {bookmarks.has(resource.id) && (
                                    <div className="bg-yellow-100 text-yellow-600 p-1.5 rounded-full" title="Guardat">
                                        <Bookmark size={14} fill="currentColor" />
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-start mb-4 pr-10">
                                <div className={`p-3 rounded-xl transition-colors ${resource.type === 'video' ? 'bg-red-50 text-red-600' :
                                    resource.category === 'suplements' ? 'bg-teal-50 text-teal-600' :
                                        'bg-blue-50 text-blue-600 group-hover:bg-purple-50 group-hover:text-purple-600'
                                    }`}>
                                    {/* Link Icon fallback */}
                                    {resource.icon ? React.createElement(resource.icon, { size: 24 }) : <BookOpen size={24} />}
                                </div>

                            </div>

                            <div className="flex gap-2 mb-2">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50 px-2 py-0.5 rounded">
                                    {resource.category}
                                </span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${resource.difficulty === 'bàsic' ? 'text-green-600 bg-green-50' :
                                        resource.difficulty === 'intermedi' ? 'text-orange-600 bg-orange-50' :
                                            'text-red-600 bg-red-50'
                                    }`}>
                                    {resource.difficulty}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                                {resource.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-1 line-clamp-3">
                                {resource.summary}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                                    {resource.type === 'video' ? <Video size={12} /> : <FileText size={12} />}
                                    {resource.readTime}
                                </span>
                                <div className="text-purple-600 opacity-60 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                                    {resource.type === 'video' ? 'Veure' : 'Llegir'} <ExternalLink size={12} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* VIDEO ACADEMY SECTION (Placeholder) */}
                <div className="mt-24 bg-gray-900 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-purple-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 p-32 bg-blue-600 rounded-full blur-3xl opacity-20 -ml-16 -mb-16"></div>

                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 text-white border border-white/20">
                            <GraduationCap size={40} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Arrel Academy</h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                            Estem preparant una sèrie de masterclasses en vídeo amb experts en longevitat. Apunta't a la llista d'espera.
                        </p>
                        <div className="inline-block bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-xl font-bold tracking-wide cursor-default">
                            Propera Obertura
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}
