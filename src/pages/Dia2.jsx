import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, Coffee, ArrowRight, Home, BarChart2, CheckCircle2 } from 'lucide-react';

export default function Dia2() {
    const navigate = useNavigate();

    // Data actual formatada
    const today = new Date().toLocaleDateString('ca-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });

    // Estat dels protocols
    // status: 'pending' | 'completed' | 'partial' | 'not_done'
    const [protocols, setProtocols] = useState([
        {
            id: 'son',
            title: 'Finestra de son fixa 8h',
            icon: Moon,
            status: 'pending',
            color: 'indigo'
        },
        {
            id: 'cafe',
            title: 'Eliminar cafè després de 14h',
            icon: Coffee,
            status: 'pending',
            color: 'orange'
        },
        {
            id: 'sol',
            title: 'Caminar 20min al sol',
            icon: Sun,
            status: 'pending',
            color: 'yellow'
        }
    ]);

    // Sliders
    const [energia, setEnergia] = useState(5);
    const [anim, setAnim] = useState(5);

    // Càlcul de compliment
    const [compliance, setCompliance] = useState(0);

    useEffect(() => {
        // Calcular percentatge
        const completedCount = protocols.filter(p => p.status === 'completed').length;
        const paramCount = protocols.length;
        // Podríem donar mig punt per 'partial'? El user prompt diu: (protocols fets / 3) * 100
        // Assumim que només 'completed' compta com 1, o 'partial' com 0.5?
        // El user prompt diu: "Percentatge de compliment: (protocols fets / 3) × 100" -> Fets sol ser 100%. 
        // Simplifiquem: 'completed' = 1, 'partial' = 0.5, 'not_done' = 0.

        let score = 0;
        protocols.forEach(p => {
            if (p.status === 'completed') score += 1;
            else if (p.status === 'partial') score += 0.5;
        });

        setCompliance(Math.round((score / paramCount) * 100));
    }, [protocols]);

    const handleStatusChange = (id, newStatus) => {
        setProtocols(prev => prev.map(p =>
            p.id === id ? { ...p, status: newStatus } : p
        ));
    };

    const getMessage = () => {
        if (compliance === 100) return "Increïble! 🎉";
        if (compliance >= 67) return "Molt bé! 💪";
        if (compliance >= 34) return "Bon començ! ⭐";
        return "Demà serà millor! 🌱";
    };

    const saveDay = () => {
        const dataToSave = {
            date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
            day: 2,
            protocols: protocols.map(p => ({
                name: p.id,
                status: p.status === 'pending' ? 'not_done' : p.status
            })),
            energia,
            anim,
            compliance
        };

        // Guardar a l'històric (arrel_progres)
        const historic = JSON.parse(localStorage.getItem('arrel_progres') || '[]');

        // Eliminar si ja existeix entrada d'avui/dia 2 per sobreescriure o afegir
        const filteredHistoric = historic.filter(entry => entry.day !== 2);

        // Adaptar al format que Historic.jsx espera (per visualització)
        // Historic.jsx espera: { data: ISOString, dia: 1|2, compliment: %, accions_completades: ... }
        // Però el user demana un format específic. Guardem els dos si cal, o adaptem.
        // El user prompt dóna un format específic. Guardarem aquest format en una clau específica 'arrel_daily_tracker' 
        // I TAMBÉ actualitzarem 'arrel_progres' perquè Historic.jsx funcioni sense canvis massius.

        // 1. Guardar format especific user
        // Podríem guardar-ho en un array específic 'arrel_diari'
        const diari = JSON.parse(localStorage.getItem('arrel_diari') || '[]');
        // remove entry for day 2 if exists
        const newDiari = diari.filter(d => d.day !== 2);
        newDiari.push(dataToSave);
        localStorage.setItem('arrel_diari', JSON.stringify(newDiari));

        // 2. Guardar format compatible amb Historic.jsx (perquè surti a la llista)
        // Historic.jsx busca: dia: 2, data: ..., compliment: ...
        filteredHistoric.push({
            dia: 2,
            data: new Date().toISOString(),
            compliment: compliance,
            protocols: dataToSave.protocols // extra info
        });
        localStorage.setItem('arrel_progres', JSON.stringify(filteredHistoric));

        alert("Dia guardat ✅");
        navigate('/historic');
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white px-6 pt-12 pb-8 rounded-b-3xl shadow-sm mb-6">
                <div className="max-w-md mx-auto">
                    <div className="text-sm text-gray-500 font-medium mb-1 uppercase tracking-wide">{today}</div>
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-1">El teu Dia 2 ☀️</h1>
                            <p className="text-gray-600">Com han anat els protocols d'ahir?</p>
                        </div>
                        {/* Circle Progress */}
                        <div className="relative w-16 h-16 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="32"
                                    cy="32"
                                    r="28"
                                    stroke="#f3f4f6"
                                    strokeWidth="6"
                                    fill="none"
                                />
                                <circle
                                    cx="32"
                                    cy="32"
                                    r="28"
                                    stroke="#8b5cf6"
                                    strokeWidth="6"
                                    fill="none"
                                    strokeDasharray="175"
                                    strokeDashoffset={175 - (175 * compliance) / 100}
                                    className="transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <span className="absolute text-sm font-bold text-violet-600">{compliance}%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-md mx-auto px-6 space-y-8">

                {/* Message */}
                <div className="text-center animate-fade-in">
                    <span className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 rounded-full text-sm font-bold shadow-sm">
                        {getMessage()}
                    </span>
                </div>

                {/* Protocols Section */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-gray-800">Protocols Clau</h2>
                    {protocols.map(p => (
                        <div key={p.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 transition hover:shadow-md">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2 rounded-lg bg-${p.color}-100 text-${p.color}-600`}>
                                    <p.icon size={20} />
                                </div>
                                <h3 className="font-semibold text-gray-900">{p.title}</h3>
                            </div>

                            {/* Buttons */}
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    onClick={() => handleStatusChange(p.id, 'completed')}
                                    className={`py-2 px-1 rounded-lg text-sm font-medium transition ${p.status === 'completed'
                                            ? 'bg-green-500 text-white shadow-md transform scale-105'
                                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    ✅ Fet
                                </button>
                                <button
                                    onClick={() => handleStatusChange(p.id, 'partial')}
                                    className={`py-2 px-1 rounded-lg text-sm font-medium transition ${p.status === 'partial'
                                            ? 'bg-orange-400 text-white shadow-md transform scale-105'
                                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    🟧 Parcial
                                </button>
                                <button
                                    onClick={() => handleStatusChange(p.id, 'not_done')}
                                    className={`py-2 px-1 rounded-lg text-sm font-medium transition ${p.status === 'not_done'
                                            ? 'bg-gray-400 text-white shadow-md transform scale-105'
                                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    ⬜ No fet
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Indicators Section */}
                <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">Indicadors Diaris</h2>

                    {/* Energia */}
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-sm font-medium text-gray-600">⚡ Nivell d'energia</label>
                            <span className="font-bold text-violet-600">{energia}/10</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={energia}
                            onChange={(e) => setEnergia(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-500"
                        />
                        <div className="flex justify-between text-xs text-gray-400">
                            <span>Baixa</span>
                            <span>Molt Alta</span>
                        </div>
                    </div>

                    {/* Ànim */}
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-sm font-medium text-gray-600">😌 Ànim general</label>
                            <span className="font-bold text-pink-500">{anim}/10</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={anim}
                            onChange={(e) => setAnim(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                        />
                        <div className="flex justify-between text-xs text-gray-400">
                            <span>Trist</span>
                            <span>Feliç</span>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="space-y-4 pt-4">
                    <button
                        onClick={saveDay}
                        className="w-full py-4 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-violet-200 hover:scale-[1.02] transition transform active:scale-95"
                    >
                        GUARDAR EL MEU DIA 2
                    </button>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => navigate('/historic')}
                            className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition"
                        >
                            <BarChart2 size={18} /> Evolució
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition"
                        >
                            <Home size={18} /> Inici
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
