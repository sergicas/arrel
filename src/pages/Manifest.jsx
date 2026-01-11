import React from 'react';
import { Scroll, Heart, Clock, TrendingUp, Users, ShieldCheck, BookOpen, Lightbulb, ArrowLeft, ArrowRight, Globe, Target } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function Manifest() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 md:p-12">
            <SEO
                title="Manifest"
                description="La nostra visió d'un futur on la salut és un dret i la longevitat una realitat accessible."
            />
            <div className="max-w-4xl mx-auto">

                {/* HERO */}
                <div className="text-center mb-20 mt-8 animate-enter">
                    <div className="inline-block p-4 bg-white rounded-full shadow-md mb-6 rotate-3 hover:rotate-6 transition-transform">
                        <div className="text-pink-600">
                            <Scroll size={48} />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
                        El Manifest d'Arrel
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed italic">
                        "La longevitat no hauria de ser un luxe de pocs, sinó un dret accessible a tothom qui vulgui agafar les regnes de la seva biologia."
                    </p>
                </div>

                {/* CREENCES FONAMENTALS */}
                <div className="mb-24 space-y-12">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        En què creiem? 🌍
                    </h2>

                    {/* CREENÇA 1 */}
                    <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-3xl shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300">
                        <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center shrink-0 text-pink-600">
                            <Globe size={40} />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">La longevitat és democràtica</h3>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                No és qüestió de diners, sinó d'hàbits intel·ligents. L'accés al coneixement sobre com funciona el teu cos ha de ser universal.
                            </p>
                        </div>
                    </div>

                    {/* CREENÇA 2 */}
                    <div className="flex flex-col md:flex-row-reverse gap-8 items-center bg-white p-8 rounded-3xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300">
                        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center shrink-0 text-purple-600">
                            <Lightbulb size={40} />
                        </div>
                        <div className="flex-1 text-center md:text-right">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">La ciència sense acció no serveix</h3>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                El coneixement només té valor quan es tradueix en protocols pràctics. Convertim "papers" científics en accions de dilluns al matí.
                            </p>
                        </div>
                    </div>

                    {/* CREENÇA 3 */}
                    <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-3xl shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300">
                        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center shrink-0 text-orange-600">
                            <Clock size={40} />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">El temps és el recurs més valuós</h3>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                No es tracta només de viure més anys (lifespan), sinó de viure millor cada dia (healthspan). Qualitat sobre quantitat, sempre.
                            </p>
                        </div>
                    </div>

                    {/* CREENÇA 4 */}
                    <div className="flex flex-col md:flex-row-reverse gap-8 items-center bg-white p-8 rounded-3xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center shrink-0 text-green-600">
                            <TrendingUp size={40} />
                        </div>
                        <div className="flex-1 text-center md:text-right">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">La prevenció és exponencial</h3>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Petits canvis diaris (interès compost biològic) generen resultats massius a llarg termini. Millor prevenir avui que curar demà.
                            </p>
                        </div>
                    </div>

                    {/* CREENÇA 5 */}
                    <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-3xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-blue-600">
                            <Users size={40} />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">La comunitat accelera el progrés</h3>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Aprenem junts, evolucionem junts. Compartir dades i experiències ens fa avançar més ràpid com a espècie.
                            </p>
                        </div>
                    </div>
                </div>

                {/* EL NOSTRE COMPROMÍS */}
                <div className="mb-24">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        El Nostre Compromís 🤝
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/60 p-6 rounded-2xl border border-white text-center">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 shadow-sm">
                                <BookOpen size={24} />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Evidència Científica</h4>
                            <p className="text-gray-600 text-sm">Res de pseudociència. Tot el que recomanem té base en estudis peer-reviewed.</p>
                        </div>
                        <div className="bg-white/60 p-6 rounded-2xl border border-white text-center">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 shadow-sm">
                                <ShieldCheck size={24} />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Privacitat Absoluta</h4>
                            <p className="text-gray-600 text-sm">Les teves dades de salut són teves. Emmagatzematge local i encriptació per defecte.</p>
                        </div>
                        <div className="bg-white/60 p-6 rounded-2xl border border-white text-center">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 shadow-sm">
                                <Target size={24} />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Pragmatisme Radical</h4>
                            <p className="text-gray-600 text-sm">Protocols dissenyats per encaixar en vides reals ocupades, no en un laboratori.</p>
                        </div>
                    </div>
                </div>

                {/* CTA FINAL */}
                <div className="text-center bg-gradient-to-r from-purple-900 to-indigo-900 rounded-3xl p-12 text-white shadow-2xl mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Uneix-te al moviment
                    </h2>
                    <p className="text-purple-200 text-lg mb-10 max-w-2xl mx-auto">
                        No esperis a sentir-te "vell" per començar a cuidar la teva màquina biològica. El millor moment és ara.
                    </p>

                    <button
                        onClick={() => window.location.href = '/diagnosis'}
                        className="px-10 py-5 rounded-xl font-bold text-purple-900 bg-white hover:bg-gray-100 shadow-lg hover:shadow-white/20 transition transform hover:scale-105 flex items-center gap-3 mx-auto"
                    >
                        Començar Diagnòstic
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </div>

                {/* BOTÓ TORNAR */}
                <div className="text-center">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="text-gray-500 hover:text-gray-900 font-medium flex items-center justify-center gap-2 mx-auto transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Tornar a l'inici
                    </button>
                </div>

            </div>
            <Footer />
        </div>
    );
}
