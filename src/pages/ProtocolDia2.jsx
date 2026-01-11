import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Circle, Calendar, TrendingUp } from 'lucide-react'

export default function ProtocolDia2() {
    const navigate = useNavigate()
    const [accions, setAccions] = useState([])
    const [compliment, setCompliment] = useState(() => {
        const saved = localStorage.getItem('arrel_resultats_dia1');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.protocol) {
                    return parsed.protocol.reduce((acc, item, index) => {
                        if (item.completada) acc[index] = true;
                        return acc;
                    }, {});
                }
            } catch (e) {
                console.error(e);
            }
        }
        return {};
    });

    // New state for handling Day 2 actions
    const [accionsDia2, setAccionsDia2] = useState([
        {
            title: "Hidratació conscient",
            description: "Beu un got d'aigua nada més llevar-te i un altre abans de cada àpat. La hidratació millora l'energia cel·lular.",
            icon: "💧",
            color: "blue"
        },
        {
            title: "Pausa activa",
            description: "Fes una caminada de 5 minuts cada 2 hores. Trenca la sedestació i reactiva la circulació.",
            icon: "🚶",
            color: "green"
        },
        {
            title: "Respiració 4-7-8",
            description: "Inspira 4 segons, aguanta 7, expira 8. Repeteix 3 vegades abans de dormir per activar el sistema parasimpàtic.",
            icon: "🧘",
            color: "purple"
        }
    ])

    useEffect(() => {
        // Carregar protocol del Dia 1 des de localStorage
        const resultat = localStorage.getItem('arrel_resultats_dia1')
        let protocolArray = [];

        if (resultat) {
            try {
                const data = JSON.parse(resultat)
                protocolArray = data.protocol || []
            } catch (e) {
                console.error("Error parsing Day 1 results:", e)
            }
        }

        // Fallback si no hi ha dades
        if (protocolArray.length === 0) {
            protocolArray = [
                { id: 1, title: 'Camina 10 minuts', description: 'Activació matinal', completada: false },
                { id: 2, title: 'Beu 2L aigua', description: 'Hidratació constant', completada: false },
                { id: 3, title: 'Dorm 8 hores', description: 'Descans reparador', completada: false }
            ];
        }

        // Normalitzar l'estructura si ve de Resultats (on potser no tenen ID o completada)
        const normalizedProtocol = protocolArray.map((item, idx) => ({
            ...item,
            id: item.id || idx + 1,
            title: item.titol || item.title || item, // Handle string or object
            description: item.desc || item.description || '',
            completada: item.completada || false
        }));

        setAccions(normalizedProtocol);
    }, [])

    const toggleCompliment = (index) => {
        setCompliment(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    const calcularCompliment = () => {
        if (accions.length === 0) return 0
        const total = accions.length
        const fetes = Object.values(compliment).filter(Boolean).length
        return Math.round((fetes / total) * 100)
    }

    const guardarProgrés = () => {
        // Recuperar resultatsDia1 actuals per mantenir data original
        const resultatsDia1Originals = JSON.parse(localStorage.getItem('arrel_resultats_dia1') || '{}');

        // Crear array d'accions actualitzat amb l'estat 'completada' (combinan accions + compliment)
        const protocolDia1Actualitzat = accions.map((accio, index) => ({
            ...accio,
            completada: !!compliment[index] // Assegurar que el checkbox mana
        }));

        // Guardar protocol Dia 1 actualitzat
        const resultatsDia1Final = {
            ...resultatsDia1Originals,
            protocol: protocolDia1Actualitzat,
            dataCompletacio: new Date().toISOString()
        };
        localStorage.setItem('arrel_resultats_dia1', JSON.stringify(resultatsDia1Final));

        // Guardar protocol Dia 2
        // Normalitzar accions Dia 2 a format protocol
        const protocolDia2 = accionsDia2.map((item, idx) => ({
            id: idx + 1,
            title: item.title,
            description: item.description,
            completada: false // Inicialment no completades
        }));

        const resultatsDia2 = {
            data: new Date().toISOString(),
            protocol: protocolDia2,
            percentatgeCompletacio: 0
        };
        localStorage.setItem('arrel_resultats_dia2', JSON.stringify(resultatsDia2));

        // Registrar a l'històric general (opcional, per redundància)
        const historic = JSON.parse(localStorage.getItem('arrel_progres') || '[]');
        historic.push({
            dia: 1,
            data: new Date().toISOString(),
            compliment: calcularCompliment(),
            accions_completades: compliment
        });
        localStorage.setItem('arrel_progres', JSON.stringify(historic));

        // Redirigir a historic
        navigate('/historic');
    }

    const getMissatge = () => {
        const perc = calcularCompliment()
        if (perc === 100) return "Increïble! Has completat totes les accions. 🎉"
        if (perc >= 66) return "Molt bé! Estàs fent grans avenços. 💪"
        if (perc >= 33) return "Bon començament! Cada pas compta. 🌱"
        return "No et preocupis. Avui és un nou dia per provar-ho. ✨"
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Hero */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 mb-6 shadow-lg shadow-orange-200">
                        <Calendar className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
                        Com ha anat el teu primer dia?
                    </h1>
                    <p className="text-lg text-gray-600">
                        Revisem el protocol del Dia 1 i planifiquem el següent pas.
                    </p>
                </div>

                {/* Revisió Dia 1 */}
                <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
                        <TrendingUp className="w-6 h-6 text-purple-600" />
                        Protocol del Dia 1
                    </h2>

                    {accions.length === 0 ? (
                        <p className="text-gray-500 italic text-center py-4">No hi ha accions enregistrades del Dia 1.</p>
                    ) : (
                        <div className="space-y-4">
                            {accions.map((accio, index) => (
                                <div
                                    key={accio.id || index}
                                    className={`flex items-start gap-4 p-4 rounded-xl border transition cursor-pointer select-none ${compliment[index] ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100 hover:border-purple-200 hover:bg-gray-50'}`}
                                    onClick={() => toggleCompliment(index)}
                                >
                                    <div className="mt-1 flex-shrink-0">
                                        <input
                                            type="checkbox"
                                            checked={!!compliment[index]}
                                            readOnly
                                            className="w-5 h-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-semibold text-lg ${compliment[index] ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                            {accio.title}
                                        </h3>
                                        {accio.description && (
                                            <p className={`text-sm mt-1 ${compliment[index] ? 'text-gray-400' : 'text-gray-600'}`}>{accio.description}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Percentatge de compliment */}
                    {accions.length > 0 && (
                        <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 flex flex-col items-center animate-fade-in">
                            <div className="text-5xl font-bold text-purple-600 mb-2">
                                {calcularCompliment()}%
                            </div>
                            <p className="text-gray-800 font-medium text-lg">{getMissatge()}</p>
                        </div>
                    )}
                </div>

                {/* Protocol Dia 2 */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg mb-12 border border-blue-100">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                        Protocol del Dia 2 🚀
                    </h2>
                    <p className="text-gray-700 mb-8 max-w-2xl">
                        Basant-nos en el teu diagnòstic, aquí tens 3 accions complementàries per avui per continuar el teu progrés:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {accionsDia2.map((item, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-white hover:shadow-md transition-shadow h-full flex flex-col">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 text-2xl bg-${item.color}-100`}>
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-3 text-lg">{item.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed flex-grow">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botons d'acció */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => navigate('/resultats')}
                        className="px-6 py-3 text-gray-600 bg-white rounded-full font-semibold hover:bg-gray-50 hover:text-gray-900 transition shadow-sm border border-gray-200 w-full sm:w-auto"
                    >
                        ← Tornar als Resultats
                    </button>
                    <button
                        onClick={guardarProgrés}
                        className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold hover:from-purple-700 hover:to-pink-700 transition shadow-lg hover:shadow-purple-500/30 w-full sm:w-auto transform hover:scale-105"
                    >
                        Guardar Progrés →
                    </button>
                </div>
            </div>
        </div>
    )
}
