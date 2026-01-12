import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';
import { Lock, ArrowRight, Activity, Zap, Moon, Utensils, Brain, Clock } from 'lucide-react';

export default function Resultats() {
    const navigate = useNavigate();
    const { session, enterAsGuest } = useAuth();

    function calcularPuntuacions(respostes) {
        // Assegurar que tenim prou respostes
        const r = respostes.length >= 12 ? respostes : [...respostes, ...Array(12 - respostes.length).fill(0)];

        // Càlcul bàsic amb 12 preguntes
        // ENERGIA: Q1, Q2 (Index 0, 1)
        const energia = Math.round(([100, 70, 40, 20][r[0]] + [100, 70, 40, 20][r[1]]) / 2);

        // SON: Q3, Q4, Q5 (Index 2, 3, 4)
        const son = Math.round(([100, 70, 40, 20][r[2]] + [100, 70, 40, 20][r[3]] + [100, 70, 40, 20][r[4]]) / 3);

        // NUTRICIÓ: Q6, Q7, Q8 (Index 5, 6, 7)
        const nutricio = Math.round(([100, 70, 40, 20][r[5]] + [100, 70, 40, 20][r[6]] + [100, 70, 40, 20][r[7]]) / 3);

        // ATENCIÓ: Q9, Q10 (Index 8, 9)
        const atencio = Math.round(([100, 70, 40, 20][r[8]] + [100, 70, 40, 20][r[9]]) / 2);

        // TEMPS: Q11, Q12 (Index 10, 11)
        const temps = Math.round(([100, 70, 40, 20][r[10]] + [100, 70, 40, 20][r[11]]) / 2);

        const global = Math.round((energia + son + nutricio + atencio + temps) / 5);

        return { global, energia, son, nutricio, atencio, temps };
    }

    function generarAccions(puntuacions) {
        const { energia, atencio, temps } = puntuacions;
        // Simplificar lògica: trobar l'àrea més feble realment
        const scores = { energia, atencio, temps }; // Podem afegir son/nutrició si tenim accions per elles
        const minAreaName = Object.keys(scores).reduce((a, b) => scores[a] < scores[b] ? a : b);

        if (minAreaName === 'energia') {
            return [
                { titol: "Estableix finestra de son fixa de 8h", desc: "Dorm i desperta't cada dia a la mateixa hora.", rationale: "La regularitat optimitza la teva producció d'ATP mitocondrial." },
                { titol: "Elimina cafè després de les 14h", desc: "La cafeïna té una vida mitjana de 6 hores.", rationale: "Protegeix el son profund, on es repara el dany oxidatiu." },
                { titol: "Caminar 20min al sol matinal", desc: "Llum natural abans de les 10am.", rationale: "Sincronitza el teu rellotge mestre per màxima energia." }
            ];
        }
        if (minAreaName === 'atencio') {
            return [
                { titol: "Blocs de Focus de 25min", desc: "Treball profund sense interrupcions.", rationale: "Redueix la fatiga cognitiva i l'estrès cortisol." },
                { titol: "Dejuni digital de 3h", desc: "Sense notificacions al matí.", rationale: "El cervell necessita descans per no envellir prematurament." },
                { titol: "Respiració conscient (5min)", desc: "Exhalacions llargues.", rationale: "Activa el nervi vague i redueix la inflamació." }
            ];
        }
        // Per defecte (o temps)
        return [
            { titol: "Crea una experiència nova setmanal", desc: "Trenca la rutina.", rationale: "La novetat estimula la neuroplasticitat i manté el cervell jove." },
            { titol: "Escriptura nocturna", desc: "3 coses positives del dia.", rationale: "Redueix l'estrès emocional abans de dormir." },
            { titol: "Moviment conscient", desc: "Canvia la teva ruta habitual.", rationale: "Manté el sistema nerviós àgil i adaptable." }
        ];
    }

    // Load Data
    const respostesGuardades = localStorage.getItem('arrel_respostes');
    const respostes = respostesGuardades ? JSON.parse(respostesGuardades) : [1, 0, 1, 0, 2, 1, 0, 2, 1, 0, 1, 2]; // Valors per defecte si no n'hi ha
    const puntuacions = calcularPuntuacions(respostes);
    const accions = generarAccions(puntuacions);

    // Identificar l'accelerador d'envelliment (puntuació més baixa)
    const areas = [
        { id: 'energia', label: 'Energia Cel·lular', score: puntuacions.energia, icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50' },
        { id: 'son', label: 'Qualitat del Son', score: puntuacions.son, icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-50' },
        { id: 'nutricio', label: 'Salut Metabòlica', score: puntuacions.nutricio, icon: Utensils, color: 'text-green-500', bg: 'bg-green-50' },
        { id: 'atencio', label: 'Focus Mental', score: puntuacions.atencio, icon: Brain, color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 'temps', label: 'Percepció del Temps', score: puntuacions.temps, icon: Clock, color: 'text-purple-500', bg: 'bg-purple-50' }
    ];

    // L'àrea amb la puntuació MÉS BAIXA és l'accelerador
    const accelerator = areas.reduce((prev, current) => (prev.score < current.score) ? prev : current);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
            <SEO title="El teu Informe d'Envelliment" description="Resultats del test de longevitat d'Arrel." />

            <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

                {/* HEADER: VITALITY SCORE */}
                <div className="bg-gray-900 text-white p-10 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="text-xl font-medium text-gray-400 uppercase tracking-widest mb-2">Puntuació de Vitalitat</h1>
                        <div className="text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
                            {puntuacions.global}/100
                        </div>
                        <p className="text-lg text-gray-300 max-w-lg mx-auto">
                            {puntuacions.global >= 80 ? "El teu ritme d'envelliment és òptim. Continua així." :
                                puntuacions.global >= 60 ? "Estàs envellint a un ritme normal, però podries frenar-lo." :
                                    "Estàs envellint més ràpid del que et toca biològicament."}
                        </p>
                    </div>
                    {/* Background decor */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500 via-gray-900 to-black"></div>
                </div>

                {/* KEY INSIGHT: ACCELERATOR */}
                <div className="p-10 border-b border-gray-100 bg-red-50/50">
                    <div className="flex items-start gap-6">
                        <div className={`p-4 rounded-2xl ${accelerator.bg} shrink-0`}>
                            <accelerator.icon size={32} className={accelerator.color} />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-red-600 uppercase tracking-wider mb-1">
                                ⚠️ Principal Accelerador d'Envelliment
                            </h2>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {accelerator.label} ({accelerator.score}/100)
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Les teves respostes indiquen que aquesta és l'àrea que més "desgasta" el teu sistema ara mateix. Millorar aquí tindrà l'impacte més gran en la teva longevitat.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ACTION PLAN */}
                <div className="p-10">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">El teu Pla de Reversió</h2>
                        <p className="text-gray-500">3 accions simples per corregir l'accelerador.</p>
                    </div>

                    <div className="space-y-4">
                        {accions.map((accio, idx) => (
                            <div key={idx} className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 transition-colors cursor-default">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">
                                        {idx + 1}
                                    </div>
                                    <div className="h-full w-px bg-gray-200 my-2"></div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">{accio.titol}</h4>
                                    <p className="text-gray-600 mb-2">{accio.desc}</p>
                                    <p className="text-xs text-purple-700 font-medium bg-purple-50 inline-block px-2 py-1 rounded">
                                        💡 {accio.rationale}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA / LOCK (Simplified) */}
                    {/* CTA / LOCK (Improved Flow) */}
                    {!session && (
                        <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200 text-center">
                            <h3 className="font-bold text-lg text-gray-900 mb-2">Resultats preparats</h3>
                            <p className="text-gray-500 mb-6 text-sm max-w-md mx-auto">
                                No et demanarem cap registre. Pots veure el teu pla ara mateix.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => {
                                        enterAsGuest();
                                        navigate('/dashboard');
                                    }}
                                    className="px-8 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-black transition-colors shadow-lg flex items-center justify-center gap-2"
                                >
                                    Veure el meu Pla <ArrowRight size={18} />
                                </button>

                                <button
                                    onClick={() => navigate('/login')}
                                    className="px-8 py-3 bg-white text-gray-700 font-bold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Lock size={16} /> Guardar Resultats
                                </button>
                            </div>
                        </div>
                    )}

                    {session && (
                        <div className="mt-8 text-center">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="px-8 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200"
                            >
                                Anar al Dashboard
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <p className="mt-8 text-gray-400 text-sm mb-24">Arrel Health · Longevitat basada en evidència</p>

            {/* STICKY CTA BAR (Mobile/Desktop) - Ensures conversion */}
            {!session && (
                <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 shadow-2xl z-50 animate-slide-up">
                    <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
                        <div className="hidden sm:block text-sm text-gray-500">
                            Resultats guardats temporalment.
                        </div>
                        <button
                            onClick={() => {
                                enterAsGuest();
                                navigate('/dashboard');
                            }}
                            className="flex-1 sm:flex-none px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2 transform active:scale-95"
                        >
                            Veure el meu Pla <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
