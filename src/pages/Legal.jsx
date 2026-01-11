import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, FileText, Cookie, Mail, Send, CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function Legal() {
    const location = useLocation();

    const navigate = useNavigate();

    // Determine section from path parameter
    const section = location.pathname.split('/').pop() || 'privacitat'; // default to privacitat

    // Map section keys to readable titles
    const titles = {
        'privacitat': 'Política de Privacitat',
        'termes': "Termes d'Ús",
        'cookies': 'Política de Cookies',
        'contacte': 'Contacte'
    };

    const currentTitle = titles[section] || 'Legal';

    const [formState, setFormState] = React.useState({ name: '', email: '', message: '', status: 'idle' });
    const [activeSection, setActiveSection] = useState(section);

    // Update activeSection when path changes (manual navigation)
    useEffect(() => {
        setActiveSection(section);
    }, [section]);

    const handleFuncionalContact = (e) => {
        e.preventDefault();
        setFormState({ ...formState, status: 'sending' });

        // Simular enviament
        setTimeout(() => {
            setFormState({ name: '', email: '', message: '', status: 'success' });
            // Guardar intent localment per debug
            const mensajes = JSON.parse(localStorage.getItem('arrel_contact_messages') || '[]');
            mensajes.push({ date: new Date().toISOString(), ...formState });
            localStorage.setItem('arrel_contact_messages', JSON.stringify(mensajes));
        }, 1500);
    };

    const getContent = () => {
        if (section === 'contacte') {
            return (
                <div className="max-w-xl mx-auto">
                    <p className="text-gray-600 mb-8">Si tens qualsevol dubte o suggeriment sobre el sistema Arrel, omple aquest formulari.</p>

                    {formState.status === 'success' ? (
                        <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl text-center animate-fade-in">
                            <h3 className="text-xl font-bold mb-2">Missatge enviat! 📤</h3>
                            <p>Gràcies per contactar amb nosaltres. Et respondrem el més aviat possible.</p>
                            <button
                                onClick={() => setFormState({ ...formState, status: 'idle' })}
                                className="mt-4 text-green-700 font-semibold hover:underline"
                            >
                                Enviar un altre missatge
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleFuncionalContact} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                                    placeholder="El teu nom"
                                    value={formState.name}
                                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Correu Electrònic</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                                    placeholder="hola@exemple.com"
                                    value={formState.email}
                                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Missatge</label>
                                <textarea
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                                    placeholder="En què et podem ajudar?"
                                    value={formState.message}
                                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={formState.status === 'sending'}
                                className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {formState.status === 'sending' ? 'Enviant...' : 'Enviar Missatge'}
                            </button>
                        </form>
                    )}
                </div>
            );
        }

        if (section === 'privacitat') {
            return (
                <div className="space-y-6 text-gray-600 leading-relaxed">
                    <h3 className="text-xl font-bold text-gray-900">1. Privacitat Local per Disseny</h3>
                    <p>Arrel està dissenyat amb un principi fonamental: <strong>les teves dades biològiques són teves</strong>.</p>
                    <p>A diferència de la majoria d'aplicacions de salut, Arrel <strong>NO</strong> té servidors centrals on s'emmagatzemin les teves respostes, puntuacions o diaris. Tota la informació es guarda exclusivament a la memòria <code>LocalStorage</code> del teu navegador.</p>

                    <h3 className="text-xl font-bold text-gray-900">2. Quines dades recollim?</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Respostes al qüestionari de diagnòstic.</li>
                        <li>Puntuacions de les àrees (Energia, Son, Nutrició, etc.).</li>
                        <li>Registres d'hàbits diaris i protocols completats.</li>
                    </ul>
                    <p>Aquestes dades mai surten del teu dispositiu sense el teu consentiment explícit (per exemple, si tu decideixes compartir una captura de pantalla).</p>

                    <h3 className="text-xl font-bold text-gray-900">3. Eliminació de Dades</h3>
                    <p>Pots eliminar totes les teves dades en qualsevol moment simplement esborrant la memòria cau i les dades del lloc web des de la configuració del teu navegador.</p>
                </div>
            );
        }

        if (section === 'termes') {
            return (
                <div className="space-y-6 text-gray-600 leading-relaxed">
                    <h3 className="text-xl font-bold text-gray-900">Avís Mèdic Important</h3>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-yellow-800">
                        <p className="font-bold">Arrel NO és un dispositiu mèdic ni substitueix el consell, diagnòstic o tractament mèdic professional.</p>
                    </div>
                    <p>El contingut d'aquesta aplicació està basat en evidència científica sobre hàbits de vida saludable i longevitat, però s'ofereix únicament amb finalitats informatives i educatives.</p>
                    <p>Sempre consulta amb el teu metge o professional de la salut abans de començar qualsevol nou protocol d'exercici, nutrició o suplementació, especialment si tens condicions mèdiques preexistents.</p>

                    <h3 className="text-xl font-bold text-gray-900">Ús de la Versió Beta</h3>
                    <p>Actualment Arrel es troba en fase "Beta Privada". Això significa que el programari pot contenir errors i estem en procés constant de millora. En utilitzar l'aplicació, acceptes que el servei es proporciona "tal qual" sense garanties de cap mena.</p>
                </div>
            );
        }

        if (section === 'cookies') {
            return (
                <div className="space-y-6 text-gray-600 leading-relaxed">
                    <p>Arrel utilitza una tecnologia anomenada <strong>Local Storage</strong> en lloc de cookies de seguiment tradicionals.</p>
                    <h3 className="text-xl font-bold text-gray-900">Diferència clau</h3>
                    <p>Les cookies sovint s'utilitzen per rastrejar-te a través d'internet. El Local Storage és com una petita base de dades privada dins del teu navegador on guardem el teu progrés perquè no el perdis en tancar la pestanya.</p>
                    <p>No utilitzem cookies de tercers per a publicitat ni analítica invasiva. L'experiència és totalment privada.</p>
                </div>
            );
        }

        return (
            <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Pàgina no trobada.</p>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white">
            <SEO
                title={currentTitle}
                description={`Informació legal sobre ${currentTitle.toLowerCase()} d'Arrel.`}
            />
            <header className="py-6 px-6 border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-10">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={24} className="text-gray-600" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">{currentTitle}</h1>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="prose prose-purple max-w-none">
                    {getContent()}
                </div>
            </main>
        </div>
    );
}
