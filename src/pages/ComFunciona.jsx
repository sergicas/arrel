import React from 'react';
import { ClipboardList, Target, Sparkles, BarChart3, ArrowLeft, ArrowRight, HelpCircle, CheckCircle } from 'lucide-react';
import RadarChart from '../components/RadarChart';
import SEO from '../components/SEO';

const ComFunciona = () => {
    // Dades de mostra per al Radar Chart
    const sampleData = { global: 78, energia: 85, son: 60, nutricio: 90, atencio: 70, temps: 85 };

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

                {/* SECCIÓ RESULTATS EN DETALL */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            2. El Teu Mapa Biològic
                        </h2>
                        <p className="text-lg text-gray-600 mb-6">
                            No et donem només un número. Et donem una imatge clara del teu equilibri actual.
                        </p>
                        <ul className="space-y-4 mb-6">
                            {[
                                "Visualització gràfica d'impacte immediat",
                                "Identificació de l'àrea més feble (el teu ' coll d'ampolla')",
                                "Comparativa entre les 5 àrees clau"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm text-gray-400 bg-gray-50 p-4 rounded-lg italic border-l-4 border-blue-400">
                            "El que no es mesura, no es pot millorar." - Lord Kelvin
                        </p>
                    </div>
                    <div className="bg-white/50 backdrop-blur-sm p-6 rounded-full shadow-2xl border border-white flex items-center justify-center w-full max-w-[350px] aspect-square mx-auto">
                        <RadarChart data={sampleData} size={350} />
                    </div>
                </div>

                {/* 5 ÀREES */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Les 5 Àrees de la Longevitat 💠
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="px-6 py-3 bg-white rounded-full shadow-md border-2 border-orange-100 text-orange-600 font-bold flex items-center gap-2 hover:scale-105 transition">
                            ⚡ Energia
                        </div>
                        <div className="px-6 py-3 bg-white rounded-full shadow-md border-2 border-indigo-100 text-indigo-600 font-bold flex items-center gap-2 hover:scale-105 transition">
                            🌙 Son
                        </div>
                        <div className="px-6 py-3 bg-white rounded-full shadow-md border-2 border-green-100 text-green-600 font-bold flex items-center gap-2 hover:scale-105 transition">
                            🥗 Nutrició
                        </div>
                        <div className="px-6 py-3 bg-white rounded-full shadow-md border-2 border-blue-100 text-blue-600 font-bold flex items-center gap-2 hover:scale-105 transition">
                            🧠 Atenció
                        </div>
                        <div className="px-6 py-3 bg-white rounded-full shadow-md border-2 border-purple-100 text-purple-600 font-bold flex items-center gap-2 hover:scale-105 transition">
                            ⏰ Temps Viscut
                        </div>
                    </div>
                </div>

                {/* SISTEMA DE PUNTUACIÓ */}
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 mb-20">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                        <HelpCircle className="w-8 h-8 text-purple-500" />
                        Com funciona el Sistema de Puntuació?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <div className="text-4xl font-bold text-green-500 mb-2">80-100</div>
                            <h4 className="font-bold text-gray-800 mb-2">Zona Òptima</h4>
                            <p className="text-sm text-gray-600">El teu sistema biològic funciona amb eficiència. L'objectiu és manteniment i micro-millores.</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-orange-500 mb-2">50-79</div>
                            <h4 className="font-bold text-gray-800 mb-2">Zona de Millora</h4>
                            <p className="text-sm text-gray-600">Tens bases sòlides però hi ha fricció. Amb el protocol adequat pots pujar ràpidament.</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-red-500 mb-2">&lt; 50</div>
                            <h4 className="font-bold text-gray-800 mb-2">Zona d'Alerta</h4>
                            <p className="text-sm text-gray-600">Desgast accelerat detectat. Cal intervenció prioritària en son i nutrició per recuperar base.</p>
                        </div>
                    </div>
                </div>

                {/* FAQ SECTION (NOVA) */}
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
