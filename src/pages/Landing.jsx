import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  Shield,
  Activity,
  Zap,
  CheckCircle,
  ChevronDown,
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
        title="Arrel"
        description="Recupera el terreny que el temps t'està prenent. Una acció al dia, criteri clar, sense sorolls."
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
              Recupera el terreny <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                que el temps t'està prenent.
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
              Arrel detecta on el desgast ja ha començat i et dona una{' '}
              <span className="font-semibold text-gray-900">acció al dia</span> per recuperar-lo.
              Criteri clar, sense sorolls.
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
                    El teu diagnòstic
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900">Un pas al dia</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
                  <Activity size={22} strokeWidth={1.8} />
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                  Àrea més exposada
                </p>
                <p className="text-lg font-semibold text-gray-900">Estrès crònic</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-2xl">
                  <p className="text-xs text-gray-400 font-bold uppercase">Primer pas</p>
                  <p className="text-base font-semibold text-blue-700">Respiració llarga · 5 min</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-2xl">
                  <p className="text-xs text-gray-400 font-bold uppercase">Següent check-in</p>
                  <p className="text-base font-semibold text-purple-700">Avui · 10 seg</p>
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
              Un sistema clar <br /> per recuperar terreny.
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Arrel no ven suplements ni fórmules. Et dona criteri i un pas concret al dia, sense
              sorolls.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Activity,
                title: 'Veus on estàs perdent terreny',
                desc: "Un diagnòstic curt mostra en quina àrea el temps t'està passant més factura. Sense puntuacions inventades.",
              },
              {
                icon: CheckCircle,
                title: 'Saps què has de fer avui',
                desc: "Una sola acció al dia, triada segons el teu diagnòstic i l'estat del cicle. No una llista de deu hàbits: el pas que toca avui.",
              },
              {
                icon: Shield,
                title: 'Recuperes terreny sense sorolls',
                desc: "Cicles curts d'acció i repòs. L'app parla quan aporta criteri i calla quan no. No ocupa el teu temps; el respecta.",
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
                    <h3 className="text-xl font-bold mb-2">Fes el diagnòstic de 3 minuts</h3>
                    <p className="text-gray-400">
                      Respons preguntes curtes sobre com estàs ara: ritme, desgast, tensió, xarxa,
                      sensació general.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center font-bold text-xl shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Veus el teu diagnòstic</h3>
                    <p className="text-gray-400">
                      Identifiquem on el temps t'està passant més factura i per quina àrea et
                      convé començar.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center font-bold text-xl shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Actua amb una acció al dia</h3>
                    <p className="text-gray-400">
                      Cada dia una sola cosa concreta. Fas check-in ràpid i el cicle avança. Sense
                      llistes infinites ni soroll.
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
                    <span className="font-medium">Matí: pas al sol (10 min)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-500 shrink-0" />
                    <span className="font-medium">Dinar: ordenar els aliments</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-500 shrink-0" />
                    <span className="font-medium">Nit: 90 min sense pantalla</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-500 shrink-0" />
                    <span className="font-medium">Tensió: respiració llarga (5 min)</span>
                  </li>
                </ul>
                <button className="mt-8 w-full py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors">
                  Veure el pla complet
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
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">El mètode Arrel</h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                Un sistema clar per recuperar terreny, pas a pas.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 text-center">
              {/* Phase 1 */}
              <div className="group p-8 rounded-3xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 text-purple-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Activity size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Mira</h3>
                <p className="text-gray-600 leading-relaxed">
                  Identifiquem on el desgast ja ha començat i on estàs perdent terreny sense
                  notar-ho.
                </p>
              </div>

              {/* Phase 2 */}
              <div className="group p-8 rounded-3xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 text-blue-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Clock size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Entén</h3>
                <p className="text-gray-600 leading-relaxed">
                  Veus la teva àrea més exposada i el primer pas concret per començar a recuperar
                  terreny.
                </p>
              </div>

              {/* Phase 3 */}
              <div className="group p-8 rounded-3xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 text-green-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Zap size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Actua (primer cicle gratis)</h3>
                <p className="text-gray-600 leading-relaxed">
                  Accés complet al primer cicle. Sense cost, sense targeta. Només tu i el pas
                  del dia.
                </p>
              </div>
            </div>

            {/* FUTURE STEPS / WHAT'S NEXT */}
            <div className="mt-20 p-8 md:p-12 bg-blue-50 rounded-3xl border border-blue-100 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">I després del primer cicle?</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                El primer cicle és 100% gratuït per provar el mètode. Si vols continuar després, tens accés al <strong>Pla Premium</strong>:
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 uppercase rounded-bl-lg">Premium</div>
                  <div className="font-bold text-blue-600 mb-2">CLUB ARREL</div>
                  <p className="text-sm text-gray-500">Comunitat privada d'usuaris Arrel.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 uppercase rounded-bl-lg">Premium</div>
                  <div className="font-bold text-purple-600 mb-2">CICLES NOUS</div>
                  <p className="text-sm text-gray-500">Nous cicles cada mes amb accions i àrees noves.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 uppercase rounded-bl-lg">Premium</div>
                  <div className="font-bold text-gray-900 mb-2">SEGUIMENT AMPLIAT</div>
                  <p className="text-sm text-gray-500">Seguiment més detallat dels teus cicles i notes.</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </RevealOnScroll>

      {/* TESTIMONIALS retirats a AR-002: els ficticis actuals tenien claims problemàtics
          (Oura Ring, "pura biologia", "pic de glucosa"). El component es conserva
          (src/components/TestimonialCarousel.jsx) per quan hi hagi testimonials reals. */}

      {/* FAQ SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Preguntes Freqüents
          </h2>
          <div className="space-y-2">
            <FAQItem
              question="És realment gratuït?"
              answer="El primer cicle és 100% gratuït. Volem que provis el mètode abans de pagar res. Si decideixes continuar després, tens accés al pla Premium."
            />
            <FAQItem
              question="Necessito registrar-me per veure resultats?"
              answer="No. Pots fer el diagnòstic i veure resultats com a convidat. Només si vols accés al pla diari necessitaràs un compte (gratuït)."
            />
            <FAQItem
              question="Què hi ha darrere del mètode?"
              answer="Arrel combina observació del desgast funcional amb accions concretes amb suport en la literatura d'hàbits i salut conductual. No fem diagnòstic mèdic ni substituïm cap tractament."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-gray-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
            Comença pel diagnòstic. 3 minuts.
          </h2>
          <Button
            onClick={handleStartDiagnosis}
            isLoading={isLoading}
            variant="secondary"
            size="lg"
            className="text-gray-900 bg-white hover:bg-gray-100 hover:scale-105"
          >
            Començar diagnòstic
          </Button>
          <p className="mt-6 text-gray-400">Els resultats són privats i 100% teus.</p>
        </div>
      </section>
    </>
  );
}
