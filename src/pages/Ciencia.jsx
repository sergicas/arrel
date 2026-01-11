
import React from 'react';
import { Microscope, Clock, Zap, Brain, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const Ciencia = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <SEO
                title="La Ciència"
                description="Descobreix l'evidència científica que recolza el nostre protocol de longevitat i salut metabòlica."
            />
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

                    {/* FONAMENTS CIENTÍFICS - 3 PILARS */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            Fonaments Científics 🧬
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Pilar 1: Cronobiologia */}
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300">
                                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 text-purple-600">
                                    <Clock size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Cronobiologia</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    El ritme circadià regula més del 80% dels processos cel·lulars. La sincronització amb la llum i foscor és clau per l'expressió genètica saludable.
                                </p>
                            </div>

                            {/* Pilar 2: Biologia Mitocondrial */}
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300">
                                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6 text-orange-600">
                                    <Zap size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Biologia Mitocondrial</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Les mitocòndries són les centrals energètiques de la longevitat. La seva disfunció és un dels distintius primaris de l'envelliment (Hallmarks of Aging).
                                </p>
                            </div>

                            {/* Pilar 3: Neuroplasticitat */}
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
                                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                                    <Brain size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Neuroplasticitat</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    El cervell pot crear noves connexions al llarg de tota la vida. L'entrenament cognitiu i l'atenció conscient poden revertir el deteriorament.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* LES 5 ÀREES CIENTÍFIQUES */}
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
                                    <div className="flex-1">
                                        <p className="text-gray-600">
                                            <span className="font-semibold text-gray-900">Objectiu:</span> Optimitzar la teva "bateria interna" perquè les cèl·lules produeixin energia sense "rovellar-se" (reduir l'estrès oxidatiu) i ensenyar al cos a fer servir tant sucre com greix com a combustible.
                                        </p>
                                    </div>
                                </div>

                                {/* Son */}
                                <div className="p-8 hover:bg-gray-50 transition flex flex-col md:flex-row gap-6 md:items-center">
                                    <div className="flex items-center gap-3 w-48 shrink-0">
                                        <span className="text-2xl">🌙</span>
                                        <h3 className="text-xl font-bold text-gray-900">Son</h3>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-600">
                                            <span className="font-semibold text-gray-900">Objectiu:</span> Activar el "servei de neteja" nocturn del cervell per eliminar residus tòxics acumulats durant el dia i reparar els teixits del cos mentre dorms profundament.
                                        </p>
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



                    {/* GLOSSARI CIENTÍFIC (NOU) */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            Glossari de Termes Clau 📖
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { term: "Autofàgia", def: "Procés de regeneració cel·lular on el cos neteja les cèl·lules danyades. S'activa principalment durant el dejuni i l'exercici intens." },
                                { term: "Ritme Circadià", def: "El rellotge intern de 24 hores que regula el cicle son-vigília, la digestió i l'alliberament hormonal en resposta a la llum." },
                                { term: "Adenosina", def: "Neurotransmissor que s'acumula al cervell durant el dia i crea la 'pressió de son'. La cafeïna bloqueja temporalment els seus receptors." },
                                { term: "ATP (Adenosina Trifosfat)", def: "La moneda energètica de la cèl·lula. Produïda pels mitocondris, és essencial per a qualsevol moviment o pensament." },
                                { term: "Hormesis", def: "L'efecte beneficiós d'una dosi baixa d'estrès (com sauna, fred o exercici) que enforteix l'organisme davant d'estressors futurs." },
                                { term: "Neuroplasticitat", def: "Capacitat del sistema nerviós per canviar la seva estructura i funció al llarg de la vida, creant noves connexions neuronals." }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 hover:border-purple-200 transition">
                                    <h4 className="font-bold text-purple-700 text-lg mb-2">{item.term}</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.def}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* REFERÈNCIES */}
                    <div className="mb-20">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                            Referències i Evidència <ExternalLink size={20} className="text-gray-400" />
                        </h2>
                        <div className="bg-purple-50 rounded-xl p-8 border border-purple-100">
                            <ul className="space-y-4 text-sm">
                                <li className="flex items-start gap-3 text-gray-700">
                                    <span className="text-purple-600 font-bold">•</span>
                                    <div>
                                        <strong>"The Hallmarks of Aging: An Expanding Universe."</strong> López-Otín et al., Cell (2023).
                                        <br />
                                        <a href="https://pubmed.ncbi.nlm.nih.gov/36599349/" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline text-xs">Veure a PubMed</a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 text-gray-700">
                                    <span className="text-purple-600 font-bold">•</span>
                                    <div>
                                        <strong>"Circadian rhythms and health: From mechanisms to policy."</strong> Allada et al., Science (2021).
                                        <br />
                                        <a href="https://pubmed.ncbi.nlm.nih.gov/34091684/" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline text-xs">Veure a PubMed</a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 text-gray-700">
                                    <span className="text-purple-600 font-bold">•</span>
                                    <div>
                                        <strong>"Mitochondrial dysfunction and longevity in animals: An update."</strong> Sun et al., Prog Lipid Res (2023).
                                        <br />
                                        <a href="https://pubmed.ncbi.nlm.nih.gov/37652253/" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline text-xs">Veure a PubMed</a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 text-gray-700">
                                    <span className="text-purple-600 font-bold">•</span>
                                    <div>
                                        <strong>"Neuroplasticity and cognitive aging: The scaffolding theory of aging and cognition."</strong> Park et al., Nat Rev Neurosci (2022 Revisió).
                                    </div>
                                </li>
                            </ul>
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
