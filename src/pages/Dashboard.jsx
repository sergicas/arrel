import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { Activity, Brain, Heart, Users, Zap, Play, ArrowRight, LogOut } from 'lucide-react';
import SEO from '../components/SEO';
import SmartTip from '../components/SmartTip';
import { useArrelData } from '../hooks/useArrelData';

const Dashboard = () => {
    const navigate = useNavigate();
    const [protocolReady, setProtocolReady] = useState(false);

    const { loadData, getAreaScore } = useArrelData();

    // ---- ESTATS LOCALS (Physical & Mental & Social & Emotional & Identity) ----
    const [stats, setStats] = useState({
        physical: 0,
        mental: 0,
        social: 0,
        emotional: 0,
        intellectual: 0,
        mentalPreview: '',
        emotionalLabel: ''
    });

    useEffect(() => {
        // Carregar protocol
        if (localStorage.getItem('arrel_day1_plan')) {
            setProtocolReady(true);
        }

        // Helper per obtenir etiquetes
        const getEmotionalLabel = (data) => {
            if (!data || !data.mood) return '';
            const moodMap = {
                'great': 'RADIANT',
                'good': 'BÉ',
                'neutral': 'NEUTRE',
                'bad': 'MALAMENT',
                'awful': 'PÈSSIM'
            };
            return moodMap[data.mood] || 'ACTIU';
        };

        // Helper per preview mental
        const getMentalPreview = (data) => {
            if (!data || !data.gratitude) return '';
            const filled = data.gratitude.filter(l => l.trim().length > 0);
            return filled.length > 0 ? filled[filled.length - 1] : '';
        };

        // Càrrega unificada
        const updateStats = () => {
            const mentalData = loadData('mental');
            const emotionalData = loadData('emotional');

            setStats({
                physical: getAreaScore('physical'),
                mental: getAreaScore('mental'),
                social: getAreaScore('social'),
                emotional: getAreaScore('emotional'),
                intellectual: getAreaScore('intellectual'),
                mentalPreview: getMentalPreview(mentalData),
                emotionalLabel: getEmotionalLabel(emotionalData)
            });
        };

        updateStats();

        // Listen for storage events
        const handleStorage = () => updateStats();
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);

    }, [loadData, getAreaScore]);

    const [currentDay, setCurrentDay] = useState(1);
    const { user } = useAuth();

    useEffect(() => {
        const fetchState = async () => {
            if (user) {
                const { data } = await supabase
                    .from('user_state')
                    .select('current_day')
                    .eq('user_id', user.id)
                    .maybeSingle();
                if (data) setCurrentDay(data.current_day);
            } else {
                // Guest Mode: Read from LocalStorage
                const guestDay = localStorage.getItem('arrel_guest_day');
                if (guestDay) setCurrentDay(parseInt(guestDay));
            }
        };
        fetchState();
    }, [user]);

    const areas = [
        {
            id: 'physical',
            label: 'Físic',
            icon: Activity,
            metric: `${stats.physical}%`,
            status: stats.physical === 100 ? 'optimal' : 'active',
            progress: stats.physical
        },
        {
            id: 'mental',
            label: 'Mental',
            icon: Brain,
            metric: `${stats.mental}%`,
            status: stats.mental > 0 ? 'active' : 'neutral',
            progress: stats.mental,
            preview: stats.mentalPreview
        },
        {
            id: 'emotional',
            label: 'Emocional',
            icon: Heart,
            metric: stats.emotionalLabel || 'PENDENT',
            status: stats.emotional > 0 ? 'active' : 'neutral',
            progress: stats.emotional
        },
        {
            id: 'social',
            label: 'Social',
            icon: Users,
            metric: `${stats.social}%`,
            status: stats.social > 0 ? 'active' : 'warning',
            progress: stats.social
        },
        {
            id: 'intellectual',
            label: 'Identitat',
            icon: Zap,
            metric: stats.intellectual > 0 ? 'ACTIU' : 'PENDENT',
            status: stats.intellectual > 0 ? 'active' : 'neutral',
            progress: stats.intellectual
        },
    ];

    // Reminder Logic
    const [daysSinceDiagnosis, setDaysSinceDiagnosis] = useState(0);

    useEffect(() => {
        const historicGuardat = localStorage.getItem('arrel_historic');
        if (historicGuardat) {
            const historic = JSON.parse(historicGuardat);
            if (historic.length > 0) {
                const lastDiag = new Date(historic[historic.length - 1].data);
                const now = new Date();
                const diffTime = Math.abs(now - lastDiag);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                setDaysSinceDiagnosis(diffDays);
            }
        }
    }, []);

    return (
        <div className="w-full pb-20">
            <SEO
                title="El Meu Espai"
                description="Panell de control del teu estat de salut, progrés diari i mètriques clau."
            />

            {/* Header / Date */}
            <header className="mb-6 pt-4 flex items-end justify-between">
                <div>
                    <div className="group relative inline-flex items-center gap-2 px-2 py-1 rounded bg-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 cursor-help hover:bg-gray-200 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Pas 2 de 3: Pla d'Acció

                        {/* Tooltip Explicatiu */}
                        <div className="absolute left-0 top-full mt-2 w-56 p-4 bg-gray-900 text-white text-xs rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 normal-case tracking-normal border border-gray-700">
                            <p className="mb-2 text-gray-400 font-mono text-[10px] uppercase">El Cicle Arrel</p>
                            <ul className="space-y-1.5">
                                <li className="flex items-center gap-2 text-gray-500 line-through decoration-gray-700">
                                    <span className="w-4 text-center">1</span>
                                    <span>Diagnòstic</span>
                                </li>
                                <li className="flex items-center gap-2 text-white font-bold">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full absolute -ml-2.5"></div>
                                    <span className="w-4 text-center">2</span>
                                    <span>Protocol (Ara)</span>
                                </li>
                                <li className="flex items-center gap-2 text-gray-400">
                                    <span className="w-4 text-center">3</span>
                                    <span>Re-avaluació (Dia 7)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <h1 className="text-sm font-mono text-secondary tracking-widest uppercase mb-1">
                        Espai Personal
                    </h1>
                    <div className="text-3xl font-medium text-primary tracking-tight">
                        El Teu Pla d'Acció
                    </div>
                </div>

                {/* Exit Button */}
                <button
                    onClick={() => navigate('/')}
                    className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all flex flex-col items-center gap-1 border border-transparent hover:border-red-100"
                    title="Sortir a l'inici"
                >
                    <LogOut size={20} />
                </button>
            </header>

            {/* Smart Tip Dynamic */}
            <SmartTip />

            {/* WELCOME BANNER */}
            <div className="mb-8 bg-gradient-to-r from-purple-50 to-white p-6 rounded-xl border border-purple-100 shadow-sm relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="font-bold text-lg text-purple-900 mb-2 flex items-center gap-2">
                        <span className="text-xl">👋</span> Benvingut al teu centre de control
                    </h2>
                    <p className="text-sm text-purple-700 leading-relaxed max-w-xl">
                        Aquesta pàgina és el teu tauler de comandament. Aquí tens el teu <strong>Protocol Prioritari</strong> (la tasca més important d'avui) i una visió global de com estàs frenant el teu envelliment en cada àrea.
                    </p>
                </div>
                {/* Decoration */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-purple-100 rounded-full blur-2xl opacity-50"></div>
            </div>

            {/* WEEKLY REMINDER (Visible only if > 7 days) */}
            {daysSinceDiagnosis > 7 && (
                <div
                    onClick={() => navigate('/diagnosis')}
                    className="mb-8 bg-purple-50 border border-purple-200 p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-purple-100 transition shadow-sm animate-pulse"
                >
                    <div className="flex items-center gap-4">
                        <div className="bg-purple-200 p-2 rounded-full text-purple-700">
                            <Activity size={20} />
                        </div>
                        <div>
                            <h4 className="font-bold text-purple-900">Actualitza el teu mapa</h4>
                            <p className="text-xs text-purple-700">Fa {daysSinceDiagnosis} dies del teu últim check.</p>
                        </div>
                    </div>
                    <ArrowRight size={20} className="text-purple-400" />
                </div>
            )}

            {/* Primary Action Card */}
            <div
                onClick={() => navigate('/protocol')}
                className="mb-12 relative overflow-hidden group cursor-pointer bg-surface border border-border rounded-lg p-6 hover:border-accent transition-colors duration-300 shadow-sm"
            >
                <div className="absolute top-0 right-0 p-6 opacity-50 group-hover:opacity-100 transition-opacity">
                    <Play className="text-white fill-white" size={20} />
                </div>

                <div className="text-xs font-mono text-accent mb-2 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    Tasca d'Avui
                </div>
                <div className="text-4xl font-medium text-primary tracking-tighter mb-2">
                    Dia {String(currentDay).padStart(3, '0')}
                </div>
                <div className="flex items-end justify-between mt-4">
                    <div className="text-sm text-secondary flex flex-col gap-1 max-w-[70%]">
                        <span className="font-semibold text-gray-900 leading-tight">
                            {currentDay === 1 ? 'Preparació de l\'Entorn' : 'Sincronització de Protocol'}
                        </span>
                        <span className="text-gray-500 text-xs text-balance">
                            3 micro-tasques d'alt impacte per començar.
                        </span>
                    </div>

                    <div className="px-4 py-2 bg-gray-900 text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-2 group-hover:bg-black transition-colors shadow-lg">
                        Obrir <ArrowRight size={14} />
                    </div>
                </div>
            </div>

            {/* Metrics List */}
            <div className="space-y-4">
                <div className="mb-4 pl-1">
                    <h3 className="text-xs font-mono text-tertiary uppercase tracking-widest mb-1">
                        Biometria & Estat
                    </h3>
                    <p className="text-xs text-secondary">
                        El teu progrés acumulat en les 5 àrees de la longevitat.
                    </p>
                </div>

                {areas.map((area) => (
                    <div
                        key={area.id}
                        onClick={() => {
                            if (area.id === 'physical') navigate('/physical');
                            else if (area.id === 'mental') navigate('/mental');
                            else if (area.id === 'emotional') navigate('/emotional');
                            else if (area.id === 'social') navigate('/social');
                            else if (area.id === 'intellectual') navigate('/intellectual');
                            else alert('Aquesta àrea estarà disponible properament a Arrel v1.0');
                        }}
                        className={`
                            relative flex flex-col p-4 bg-surface border border-border rounded-lg transition-colors
                            hover:bg-elevated cursor-pointer pb-2
                        `}
                    >
                        <div className="flex items-center justify-between w-full mb-2">
                            <div className="flex items-center space-x-4">
                                <area.icon size={20} strokeWidth={1.5} className={area.status === 'warning' ? 'text-alert' : 'text-secondary'} />
                                <span className="text-base font-medium text-primary tracking-tight">{area.label}</span>
                            </div>

                            <div className="flex items-center space-x-4">
                                <span className={`text-[10px] font-mono tracking-wider uppercase ${area.status === 'optimal' ? 'text-green-400' : 'text-tertiary'}`}>
                                    {area.metric}
                                </span>
                                {area.status === 'warning' && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-alert"></div>
                                )}
                            </div>
                        </div>

                        {/* Progress Bars for Active Modules */}
                        {(area.id === 'physical' || area.id === 'mental') && (
                            <div className="w-full h-1 bg-gray-800 rounded-full mt-2 overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-1000 ease-out ${area.id === 'physical' ? 'bg-gradient-to-r from-blue-500 to-green-400' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}
                                    style={{ width: `${area.progress}%` }}
                                ></div>
                            </div>
                        )}

                        {/* Gratitude Preview */}
                        {area.preview && (
                            <div className="mt-3 text-xs text-gray-500 italic pl-9 border-l-2 border-purple-500/30 line-clamp-1">
                                "...{area.preview}"
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Dashboard;
