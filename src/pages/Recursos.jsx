import React, { useState } from 'react';
import { Play, BookOpen, ExternalLink, Battery, Moon, Coffee, Brain, Clock, Pill, GraduationCap } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

// Resource Modal Component
const ResourceModal = ({ resource, onClose }) => {
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
                        className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors"
                    >
                        <ExternalLink size={20} className="rotate-45" /> {/* Use X icon ideally, but using existing imports */}
                    </button>
                </div>

                <div className="p-8 -mt-12 relative">
                    {/* Icon Bubble */}
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg text-purple-600 mb-6">
                        {React.createElement(resource.icon, { size: 40 })}
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                        <span className="bg-purple-50 text-purple-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-purple-100">
                            {resource.category}
                        </span>
                        <span className="text-gray-400 text-xs font-semibold">
                            {resource.readTime}
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

                    <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-all hover:scale-[1.01] shadow-xl shadow-purple-900/10"
                        onClick={onClose}
                    >
                        Llegir l'article complet <ExternalLink size={18} />
                    </a>
                </div>
            </div>
        </div>
    );
};

import { resourcesData } from '../data/resourcesData';

export default function Recursos() {
    const [activeTab, setActiveTab] = useState('all');
    const [selectedResource, setSelectedResource] = useState(null);

    const filtered = activeTab === 'all' ? resourcesData : resourcesData.filter(r => r.category === activeTab);

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
                />
            )}

            <div className="max-w-6xl mx-auto">

                {/* HERO */}
                <div className="mb-16 text-center animate-enter">
                    <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                        Biblioteca Arrel
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Recursos & Acadèmia
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Una col·lecció curada d'articles, guies i vídeos per aprofundir en cada àrea de la teva longevitat.
                    </p>
                </div>

                {/* TABS */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {[
                        { id: 'all', label: 'Tots' },
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
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeTab === tab.id
                                ? 'bg-gray-900 text-white shadow-lg'
                                : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* GRID DE RECURSOS */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map(resource => (
                        <div
                            key={resource.id}
                            onClick={() => setSelectedResource(resource)}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer block h-full flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl transition-colors ${resource.type === 'video' ? 'bg-red-50 text-red-600' :
                                    resource.category === 'suplements' ? 'bg-teal-50 text-teal-600' :
                                        'bg-blue-50 text-blue-600 group-hover:bg-purple-50 group-hover:text-purple-600'
                                    }`}>
                                    {/* Handle dynamic icons safely */}
                                    {resource.icon && React.createElement(resource.icon, { size: 24 })}
                                </div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                                    {resource.category}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                                {resource.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-1 line-clamp-3">
                                {resource.summary}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                <span className="text-xs font-semibold text-gray-500">
                                    {resource.type === 'video' ? 'Visualització' : `${resource.readTime || '5 min'}`}
                                </span>
                                <div className="text-purple-600 opacity-60 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                                    Llegir Resum <ExternalLink size={12} />
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
