import React, { useState, useEffect } from 'react';
import { Users, Heart, Phone, MessageCircle, ArrowRight, UserPlus } from 'lucide-react';
import SEO from '../components/SEO';

import { useArrelData } from '../hooks/useArrelData';

const Social = () => {
    const { loadData, saveData } = useArrelData();

    // ---- STATE: Connections Check ----
    const [connections, setConnections] = useState([
        { id: 1, name: '', relation: 'Amic/ga', lastContact: '' },
        { id: 2, name: '', relation: 'Familiar', lastContact: '' },
        { id: 3, name: '', relation: 'Mentor/companya', lastContact: '' }
    ]);

    // ---- STATE: Weekly Goal ----
    const [socialGoal, setSocialGoal] = useState('');

    // ---- LOAD STATE ----
    useEffect(() => {
        const parsed = loadData('social');
        if (parsed) {
            if (parsed.connections) setConnections(parsed.connections);
            if (parsed.socialGoal) setSocialGoal(parsed.socialGoal);
        }
    }, [loadData]);

    // ---- PERSISTENCE ----
    useEffect(() => {
        saveData('social', {
            connections,
            socialGoal,
            lastUpdated: new Date().toISOString()
        });
    }, [connections, socialGoal, saveData]);

    const updateConnection = (id, field, value) => {
        setConnections(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20 p-6">
            <SEO
                title="Salut Social"
                description="Gestiona i nodreix les teves connexions significatives."
            />
            <div className="max-w-md mx-auto space-y-8">

                {/* HEADLINE */}
                <div className="text-center pt-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Connexions</h1>
                    <p className="text-gray-500 italic">
                        "Som la mitjana de les 5 persones amb qui passem més temps."
                    </p>
                </div>

                {/* --- SECCIÓ 1: CERCLE PROPER --- */}
                <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-xl space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            <Users size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-gray-800">Cercle Proper</h2>
                    </div>

                    <p className="text-sm text-gray-500 mb-4">Identifica 3 persones clau per al teu benestar i quan vas parlar amb elles per últim cop.</p>

                    <div className="space-y-4">
                        {connections.map((conn) => (
                            <div key={conn.id} className="bg-white/60 p-4 rounded-xl border border-blue-50 flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                        {conn.id}
                                    </div>
                                    <input
                                        type="text"
                                        value={conn.name}
                                        onChange={(e) => updateConnection(conn.id, 'name', e.target.value)}
                                        placeholder="Nom de la persona"
                                        className="flex-1 bg-transparent border-none focus:ring-0 font-medium text-gray-800 placeholder-gray-400"
                                    />
                                    <select
                                        value={conn.relation}
                                        onChange={(e) => updateConnection(conn.id, 'relation', e.target.value)}
                                        className="text-xs bg-blue-50 text-blue-700 rounded-lg border-none py-1 px-2 focus:ring-0"
                                    >
                                        <option>Amic/ga</option>
                                        <option>Familiar</option>
                                        <option>Parella</option>
                                        <option>Mentor/a</option>
                                        <option>Companys</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 pl-10">
                                    <span className="uppercase tracking-wider font-bold text-[10px] text-gray-400">Últim contacte:</span>
                                    <input
                                        type="text"
                                        value={conn.lastContact}
                                        onChange={(e) => updateConnection(conn.id, 'lastContact', e.target.value)}
                                        placeholder="Ahir, Fa 2 dies..."
                                        className="flex-1 bg-transparent border-b border-gray-200 focus:border-blue-300 outline-none"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- SECCIÓ 2: REPTE SOCIAL --- */}
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4 opacity-90 font-bold text-xs uppercase tracking-wider">
                            <Phone size={14} /> Acció Setmanal
                        </div>

                        <h3 className="text-xl font-bold mb-4">A qui trucaràs aquesta setmana?</h3>

                        <input
                            type="text"
                            value={socialGoal}
                            onChange={(e) => setSocialGoal(e.target.value)}
                            placeholder="Nom de la persona..."
                            className="w-full bg-white/20 border border-white/30 rounded-xl p-4 text-white placeholder-white/60 focus:outline-none focus:bg-white/30 transition-all font-medium mb-4"
                        />

                        <p className="text-xs opacity-80 leading-relaxed">
                            Una conversa real de 10 minuts redueix cortisol i augmenta oxitocina. Els missatges de text no tenen el mateix efecte biològic.
                        </p>
                    </div>

                    {/* Decorative */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
                </div>
            </div>
        </div>
    );
};

export default Social;
