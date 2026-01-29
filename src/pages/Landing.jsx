import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  Shield,
  ShieldCheck,
  Activity,
  Zap,
  Moon,
  Brain,
  Battery,
  CheckCircle,
  Star,
  ChevronDown,
  ChevronUp,
  PlayCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { analytics } from '../lib/analytics';
import { useAuth } from '../context/AuthContext';
import { secureStorage } from '../lib/secureStorage';

// -----------------------------------------------------------------------------
// HELPER COMPONENTS
// -----------------------------------------------------------------------------

const RevealOnScroll = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition - all duration - 1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } `}
    >
      {children}
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span
          className={`text-lg font-medium transition-colors ${isOpen ? 'text-purple-600' : 'text-gray-900 group-hover:text-purple-600'
            } `}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className={`text-gray-400 group-hover:text-purple-600 ${isOpen ? 'text-purple-600' : ''}`} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-gray-600 leading-relaxed pb-6">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------

import Button from '../components/Button';
import TestimonialCarousel from '../components/TestimonialCarousel';

// ... (existing imports)

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // ... (existing analytics code)
  }, []);

  const handleStartDiagnosis = () => {
    analytics.trackEvent('Landing', 'Click CTA', 'Start Diagnosis');
    setIsLoading(true);
    // Simulate slight delay for effect before navigation
    setTimeout(() => {
      navigate('/diagnosis');
    }, 500);
  };

  return (
    <>
      <SEO
        title="Arrel | Longevity Science"
        description="Descobreix la teva edat biològica (indicador d'estil de vida) i com alentir el procés d'envelliment amb protocols basats en ciència."
      />

      {/* HERO SECTION */}
      <header className="relative pt-32 pb-20 px-6 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 shadow-sm text-sm font-semibold text-purple-700 mb-6 animate-fade-in-up">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
              </span>
              <span>Ara Disponible · Accés Gratuït Inicial</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight">
              La teva salut, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                descodificada.
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
              No endevinis com estàs envellint. Mesura-ho. Descobreix la teva{' '}
              <span className="font-semibold text-gray-900">Edat Biològica</span> (indicador d'estil
              de vida) i rep un pla d'acció personalitzat avui mateix.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-start items-center">
              <Button
                onClick={handleStartDiagnosis}
                isLoading={isLoading}
                size="lg"
                className="shadow-xl"
              >
                Començar Diagnòstic <ArrowRight size={24} />
              </Button>

              {(user || secureStorage.getItem('arrel_guest_day')) && (
                <Button
                  onClick={() => navigate('/dashboard')}
                  variant="ghost"
                  className="text-gray-600 hover:text-purple-600 hover:bg-purple-50 border border-transparent hover:border-purple-200"
                >
                  Torna al Dashboard
                </Button>
              )}
            </div>

            <p className="mt-8 text-sm text-gray-600 flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              Anàlisi gratuït · Resultats immediats · Privacitat garantida
            </p>
          </div>

          {/* HERO VISUAL */}
          <div className="relative animate-fade-in hidden lg:block">
            {/* Abstract blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>

            {/* Floating Card Representation */}
            <div className="relative bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 max-w-md mx-auto transform transition-all duration-500 group">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">
                    El teu resultat
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900">Informe de Longevitat</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl">
                  A+
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-600">Vitalitat Metabòlica</span>
                  <span className="font-bold text-gray-900">85/100</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-2xl">
                  <p className="text-xs text-gray-400 font-bold uppercase">
                    Edat Biològica (Estimada)
                  </p>
                  <p className="text-2xl font-bold text-blue-600">-2.5 anys</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-2xl">
                  <p className="text-xs text-gray-400 font-bold uppercase">Punt Fort</p>
                  <p className="text-lg font-bold text-purple-600">Neuroplasticitat</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* VALUE PROPOSITION: EVIDÈNCIA, NO MÀGIA */}
      < section className="py-24 bg-white relative" >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              La ciència de viure millor, <br /> no només més temps.
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Arrel no et ven suplements ni fórmules màgiques. T'oferim un sistema operatiu personal
              per prendre el control de la teva biologia a través d'hàbits mesurables.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'Neuroplasticitat',
                desc: "Entrena el teu cervell per mantenir-se jove i adaptable mitjançant reptes cognitius i gestió de l'estrès.",
              },
              {
                icon: Battery,
                title: 'Energia Mitocondrial',
                desc: "Optimitza la producció d'energia a nivell cel·lular per eliminar la fatiga crònica i millorar el rendiment.",
              },
              {
                icon: ShieldCheck,
                title: 'Resiliència Metabòlica',
                desc: "Ensenya al teu cos a canviar de combustible eficientment, prevenint la inflamació i l'envelliment prematur.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-8 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-gray-100"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-gray-900">
                  <item.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* HOW IT WORKS */}
      < section className="py-24 bg-gray-900 text-white relative overflow-hidden" >
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-900/20 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Com funciona?</h2>
              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xl shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Fes el Test de 3 minuts</h3>
                    <p className="text-gray-400">
                      Respon preguntes clau sobre els teus hàbits de son, nutrició, estrès i
                      moviment.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center font-bold text-xl shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Rep el teu Informe</h3>
                    <p className="text-gray-400">
                      Calculem la teva Edat Biològica aproximada (basada en els teus hàbits) i et
                      mostrem en quina àrea estàs envellint més ràpid.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center font-bold text-xl shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Actua amb un Pla Personalitzat</h3>
                    <p className="text-gray-400">
                      Accedeix a un protocol d'intervenció basat en evidència, dissenyat per
                      revertir els teus punts febles i optimitzar la teva salut.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-purple-700 rounded-3xl transform rotate-3 scale-105 opacity-50"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-2xl text-gray-900">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-bold">El teu Pla d'Acció</h4>
                  <Zap size={24} className="text-purple-600" />
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-500 shrink-0" />
                    <span className="font-medium">Ritme Circadià: Llum Matinal (10 min)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-500 shrink-0" />
                    <span className="font-medium">Nutrició: Ordre dels Aliments (Dinar)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-500 shrink-0" />
                    <span className="font-medium">Son: Finestra de Desconnexió (90 min)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-500 shrink-0" />
                    <span className="font-medium">Estrès: Respiració 4-7-8 (5 min)</span>
                  </li>
                </ul>
                <button className="mt-8 w-full py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors">
                  Veure Pla Complet
                </button>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* 3 PHASES - ENHANCED */}
      < RevealOnScroll >
        <section id="how-it-works" className="py-32 bg-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">El Mètode Arrel</h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                Ciència complexa, aplicada de forma simple.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 text-center">
              {/* Phase 1 */}
              <div className="group p-8 rounded-3xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 text-purple-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Activity size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Analitza</h3>
                <p className="text-gray-600 leading-relaxed">
                  80% de l'envelliment no és genètic. Identifiquem els "lladres d'energia" del teu
                  dia a dia.
                </p>
              </div>

              {/* Phase 2 */}
              <div className="group p-8 rounded-3xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 text-blue-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Clock size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Diagnostica</h3>
                <p className="text-gray-600 leading-relaxed">
                  Calculem la teva Edat Biològica aproximada i et mostrem en quina àrea estàs
                  envellint més ràpid.
                </p>
              </div>

              {/* Phase 3 */}
              <div className="group p-8 rounded-3xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 text-green-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Zap size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Reverteix (Mes 1: Gratuït)</h3>
                <p className="text-gray-600 leading-relaxed">
                  Accés complet al programa de 28 dies. Sense cost, sense targeta de crèdit. Només tu i el teu compromís.
                </p>
              </div>
            </div>

            {/* FUTURE STEPS / WHAT'S NEXT */}
            <div className="mt-20 p-8 md:p-12 bg-blue-50 rounded-3xl border border-blue-100 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">I després dels 28 dies?</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                El Mes 1 és 100% gratuït perquè proves el mètode. Si vols continuar optimitzant la teva biologia més enllà, podràs accedir al <strong>Pla Premium</strong>:
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 uppercase rounded-bl-lg">Premium</div>
                  <div className="font-bold text-blue-600 mb-2">CLUB ARREL</div>
                  <p className="text-sm text-gray-500">Comunitat privada de longevitats actives.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 uppercase rounded-bl-lg">Premium</div>
                  <div className="font-bold text-purple-600 mb-2">REPTES MENSUALS</div>
                  <p className="text-sm text-gray-500">Nous protocols avançats cada mes (Dejuni, Sauna, HIIT).</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 uppercase rounded-bl-lg">Premium</div>
                  <div className="font-bold text-gray-900 mb-2">TRACKING AVANÇAT</div>
                  <p className="text-sm text-gray-500">Integració amb wearables i biomarcadors reals.</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </RevealOnScroll>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Històries de Rejoveniment
          </h2>
          <div className="mt-12">
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Preguntes Freqüents
          </h2>
          <div className="space-y-2">
            <FAQItem
              question="És realment gratuït?"
              answer="El Mes 1 (28 dies) és 100% gratuït. Volem que experimentis els beneficis abans de pagar res. Si decideixes continuar amb l'optimització avançada (Mesos 2 i 3), podràs subscriure't al pla Premium."
            />
            <FAQItem
              question="Necessito registrar-me per veure resultats?"
              answer="No. Creiem en la privacitat primer. Pots fer el test i veure resultats com a convidat. Només si vols accés al Protocol diari necessitaràs un compte (gratuït)."
            />
            <FAQItem
              question="En què es basa la ciència?"
              answer="Ens basem en els pilars de la medicina de l'estil de vida i la gerontociència: ritmes circadians, nutrició metabòlica, hormesis i psicologia conductual."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-gray-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
            El teu jo del futur t'ho agrairà.
          </h2>
          <Button
            onClick={handleStartDiagnosis}
            isLoading={isLoading}
            variant="secondary"
            size="lg"
            className="text-gray-900 bg-white hover:bg-gray-100 hover:scale-105"
          >
            Començar Diagnòstic
          </Button>
          <p className="mt-6 text-gray-400">Els resultats són privats i 100% teus.</p>
        </div>
      </section>
    </>
  );
}
