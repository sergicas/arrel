import React, { useState } from 'react';
import { ClipboardList, Target, Sparkles, BarChart3, ArrowLeft, ArrowRight, HelpCircle, CheckCircle, RefreshCw } from 'lucide-react';
import RadarChart from '../components/RadarChart';
import SEO from '../components/SEO';

const ComFunciona = () => {
    const [chartMode, setChartMode] = useState('after'); // 'before' or 'after'

    // Dades Comparatives
    const dataBefore = { global: 45, energia: 40, son: 35, nutricio: 50, atencio: 40, temps: 30 };
    const dataAfter = { global: 88, energia: 90, son: 85, nutricio: 95, atencio: 85, temps: 80 };

    const currentData = chartMode === 'after' ? dataAfter : dataBefore;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 md:p-12">
            <SEO
                title="Com Funciona"
                description="Entén la metodologia Arrel: un enfocament integral per optimitzar la tev salut a través de diagnòstic i hàbits personalitzats."
            />
            <div className="max-w-5xl mx-auto">

                {/* HERO */}
                <div className="text-center mb-16 mt-8 animate-enter">
                    <div className="inline-block p-4 bg-white rounded-full shadow-md mb-6 rotate-3 hover:rotate-6 transition-transform">
                        <span className="text-4xl">🌱</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        Com funciona Arrel
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Descobreix el mètode científic per optimitzar la teva biologia i alentir l'envelliment en 4 passos simples.
                    </p>

                </div>

                {/* EL TEU VIATGE (4 PASSOS) */}
                <div className="mb-24">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        El teu viatge cap a la longevitat 🚀
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Pas 1 */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 text-purple-600">
                                <ClipboardList className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">1. Diagnòstic</h3>
                            <p className="text-gray-600 text-sm">Respon 17 preguntes clau sobre els teus hàbits diaris i estat actual.</p>
                        </div>

                        {/* Pas 2 */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 text-blue-600">
                                <Target className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">2. Anàlisi</h3>
                            <p className="text-gray-600 text-sm">Obtén la teva puntuació detallada en les 5 àrees fonamentals de la longevitat.</p>
                        </div>

                        {/* Pas 3 */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 text-orange-600">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">3. Protocol</h3>
                            <p className="text-gray-600 text-sm">Rep 3 accions prioritàries i personalitzades basades en evidència científica.</p>
                        </div>

                        {/* Pas 4 */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 text-green-600">
                                <BarChart3 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">4. Evolució</h3>
                            <p className="text-gray-600 text-sm">Torna cada setmana per repetir el test i visualitzar el teu progrés.</p>
                        </div>
                    </div>
                </div>

                {/* SECCIÓ DIAGNÒSTIC EN DETALL */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="order-2 md:order-1 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Exemple de Pregunta</h3>
                        <p className="text-2xl font-bold text-gray-800 mb-8">
                            "Com descriuries la teva capacitat de concentració actual?"
                        </p>
                        <div className="space-y-3">
                            <div className="p-3 border rounded-lg border-purple-200 bg-purple-50 text-purple-900 font-medium flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full border-2 border-purple-600 bg-purple-600"></div>
                                Focus làser durant hores
                            </div>
                            <div className="p-3 border rounded-lg border-gray-200 text-gray-600 flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                                Em distrec ocasionalment
                            </div>
                            <div className="p-3 border rounded-lg border-gray-200 text-gray-600 flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                                M'és difícil mantenir l'atenció
                            </div>
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            1. Un Diagnòstic Profund
                        </h2>
                        <p className="text-lg text-gray-600 mb-6">
                            El nostre qüestionari no és un simple test de salut. Busquem marcadors subtils d'envelliment com:
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Qualitat profunda del son (no només hores)",
                                "Flexibilitat metabòlica i energia post-àpats",
                                "Capacitat de mantenir atenció sostinguda",
                                "Percepció subjectiva del pas del temps"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* SECCIÓ RESULTATS EN DETALL - INTERACTIVE */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            2. El Teu Mapa Biològic
                        </h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Veuràs exactament com impacten els teus hàbits. Interactua amb el gràfic per veure la diferència.
                        </p>

                        {/* Interactive Toggle */}
                        <div className="flex bg-gray-100 p-1 rounded-xl w-fit mb-8">
                            <button
                                onClick={() => setChartMode('before')}
                                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${chartMode === 'before' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Estil de Vida Modern
                            </button>
                            <button
                                onClick={() => setChartMode('after')}
                                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${chartMode === 'after' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Estil de Vida Arrel
                            </button>
                        </div>

                        <ul className="space-y-4 mb-6">
                            {[
                                "Visualització gràfica d'impacte immediat",
                                "Identificació de l'àrea més feble (el teu ' coll d'ampolla')",
                                "Algoritme Ponderat: Donem més pes als hàbits que tenen més impacte científic (ex: son profund vs durada)."
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm text-gray-500 bg-purple-50 p-4 rounded-lg italic border-l-4 border-purple-400">
                            "L'envelliment és un error en el codi de la informació, i tenim les eines per corregir-lo." - Dr. David Sinclair
                        </p>
                    </div>

                    <div className="relative">
                        <div className="bg-white/50 backdrop-blur-sm p-6 rounded-full shadow-2xl border border-white flex items-center justify-center w-full max-w-[350px] aspect-square mx-auto transition-all duration-500">
                            <RadarChart data={currentData} size={350} />
                        </div>
                        {/* Floating Badge based on mode */}
                        <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg transition-all duration-500 ${chartMode === 'after' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                            {chartMode === 'after' ? 'Edat Biològica: -5 Anys' : 'Edat Biològica: +8 Anys'}
                        </div>
                    </div>
                </div>

                {/* 5 ÀREES */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Les 5 Àrees de la Longevitat 💠
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="px-6 py-3 bg-white rounded-full shadow-md border-2 border-orange-100 text-orange-600 font-bold flex items-center gap-2 hover:scale-105 transition cursor-default">
                            ⚡ Energia
                        </div>
                        <div className="px-6 py-3 bg-white rounded-full shadow-md border-2 border-indigo-100 text-indigo-600 font-bold flex items-center gap-2 hover:scale-105 transition cursor-default">
                            🌙 Son
                        </div>
                        <div className="px-6 py-3 bg-white rounded-full shadow-md border-2 border-green-100 text-green-600 font-bold flex items-center gap-2 hover:scale-105 transition cursor-default">
                            🥗 Nutrició
                        </div>
                        <div className="px-6 py-3 bg-white rounded-full shadow-md border-2 border-blue-100 text-blue-600 font-bold flex items-center gap-2 hover:scale-105 transition cursor-default">
                            🧠 Atenció
                        </div>
                        <div className="px-6 py-3 bg-white rounded-full shadow-md border-2 border-purple-100 text-purple-600 font-bold flex items-center gap-2 hover:scale-105 transition cursor-default">
                            ⏰ Temps Viscut
                        </div>
                    </div>
                </div>

                {/* SISTEMA DE PUNTUACIÓ - MILLORAT */}
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 mb-20">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                        <HelpCircle className="w-8 h-8 text-purple-500" />
                        Com interpretem la teva puntuació?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Òptima */}
                        <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100">
                            <div className="text-4xl font-bold text-green-600 mb-2">80-100</div>
                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span> Zona Òptima
                            </h4>
                            <p className="text-sm text-gray-600 mb-4">El teu sistema biològic funciona amb eficiència. L'objectiu és manteniment.</p>
                            <ul className="text-xs text-gray-500 space-y-2">
                                <li className="flex gap-2">✅ Energia constant sense pics</li>
                                <li className="flex gap-2">✅ Son profund reparador</li>
                                <li className="flex gap-2">✅ Claredat mental sostinguda</li>
                            </ul>
                        </div>

                        {/* Millora */}
                        <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
                            <div className="text-4xl font-bold text-orange-500 mb-2">50-79</div>
                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-orange-500"></span> Zona de Millora
                            </h4>
                            <p className="text-sm text-gray-600 mb-4">Tens bases sòlides però hi ha fricció. Pots pujar ràpidament.</p>
                            <ul className="text-xs text-gray-500 space-y-2">
                                <li className="flex gap-2">⚠️ Baixada d'energia (tarda)</li>
                                <li className="flex gap-2">⚠️ Despertars nocturns</li>
                                <li className="flex gap-2">⚠️ Ansietat lleu o 'brain fog'</li>
                            </ul>
                        </div>

                        {/* Alerta */}
                        <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
                            <div className="text-4xl font-bold text-red-500 mb-2">&lt; 50</div>
                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span> Zona d'Alerta
                            </h4>
                            <p className="text-sm text-gray-600 mb-4">Desgast accelerat detectat. Cal intervenció prioritària.</p>
                            <ul className="text-xs text-gray-500 space-y-2">
                                <li className="flex gap-2">🚨 Dependència de cafè/sucre</li>
                                <li className="flex gap-2">🚨 Insomni o son fragmentat</li>
                                <li className="flex gap-2">🚨 Esgotament crònic</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* FAQ SECTION */}
                <div className="max-w-3xl mx-auto mb-24">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Preguntes Freqüents 💬</h2>

                    <div className="space-y-6">
                        {[
                            {
                                q: "Quant temps trigaré a notar canvis?",
                                a: "La majoria d'usuaris noten millores en energia i son en els primers 7-10 dies seguint el protocol. Els canvis a nivell cel·lular (mitocondrial) es consoliden als 3-6 mesos."
                            },
                            {
                                q: "Necessito equipament o suplements per fer el protocol?",
                                a: "No. El 90% de les intervencions d'Arrel són conductuals (hàbits de llum, horaris de menjar, moviment). Els suplements només es suggereixen com a suport opcional en casos específics."
                            },
                            {
                                q: "Què passa si em salto un dia?",
                                a: "Res greu. La biologia no entén de 'fracassos', entén de mitjanes. Si falles un dia, simplement torna al protocol l'endemà sense culpa. La consistència a llarg termini és el que compta."
                            },
                            {
                                q: "És compatible amb altres dietes o entrenaments?",
                                a: "Sí. Arrel no prescriu una dieta específica (com Keto o Vegana) sinó horaris i principis metabòlics. Pots adaptar-ho a qualsevol estil d'alimentació."
                            }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h3>
                                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA FINAL */}
                <div className="text-center bg-white/60 backdrop-blur-md rounded-3xl p-10 border border-white shadow-xl max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Estàs a punt per començar?
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        El primer pas és entendre on et trobes ara mateix. És gratuït, ràpid i privat.
                    </p>

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

            </div>


        </div>
    );
}

export default ComFunciona;
