import React, { useState, useEffect } from 'react';
import {
  Scroll,
  Heart,
  Clock,
  TrendingUp,
  Users,
  ShieldCheck,
  BookOpen,
  Lightbulb,
  ArrowLeft,
  ArrowRight,
  Globe,
  Target,
  Check,
  Share2,
  MessageCircle,
} from 'lucide-react';

import SEO from '../components/SEO';

import { secureStorage } from '../lib/secureStorage';

const TwitterIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-white">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Manifest() {
  const [isSigned, setIsSigned] = useState(false);
  const [count, setCount] = useState(1240); // Base count

  useEffect(() => {
    // Load signed state
    const signed = secureStorage.getItem('arrel_manifest_signed');
    if (signed) {
      setIsSigned(true);
      setCount(1241);
    } else {
      // Simulate "live" counter somewhat
      setCount(1240 + Math.floor(Math.random() * 5));
    }
  }, []);

  const handleSign = async () => {
    if (isSigned) return;

    // Confetti
    const { default: confetti } = await import('canvas-confetti');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#EC4899', '#8B5CF6', '#F59E0B'],
    });

    setIsSigned(true);
    setCount((prev) => prev + 1);
    secureStorage.setItem('arrel_manifest_signed', true);
  };

  const shareUrl = 'https://arrel.app'; // Replace with real URL in prod
  const shareText =
    "M'acabo d'unir al moviment Arrel per democratitzar la longevitat. La biologia no és el destí. 🌱 #Arrel #Longevity";

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
            "La longevitat no és un luxe. És la ciència de viure amb plenitud fins al final."
          </p>
        </div>

        {/* MANIFEST TEXT - SHORT & PUNCHY */}
        <div className="mb-20">
          <div className="bg-white p-10 md:p-16 rounded-3xl shadow-xl border border-gray-100 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500"></div>

            <p className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-12 font-serif">
              <span className="block mb-6">Creiem que la biologia no és el destí.</span>
              <span className="block mb-6 text-purple-600">
                Creiem en l'evidència sobre la màgia.
              </span>
              <span className="block">Creiem que envellir bé és una tria diària.</span>
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-sm font-bold text-gray-500 uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <Globe size={16} className="text-pink-500" /> Democratitzar
              </span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-2">
                <Lightbulb size={16} className="text-purple-500" /> Simplificar
              </span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-2">
                <TrendingUp size={16} className="text-orange-500" /> Actuar
              </span>
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
              <p className="text-gray-600 text-sm">
                Res de pseudociència. Només recomanem el que funciona i està contrastat.
              </p>
            </div>
            <div className="bg-white/60 p-6 rounded-2xl border border-white text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 shadow-sm">
                <ShieldCheck size={24} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Privacitat Absoluta</h4>
              <p className="text-gray-600 text-sm">
                Les teves dades de salut són teves. Emmagatzematge local i encriptació per defecte.
              </p>
            </div>
            <div className="bg-white/60 p-6 rounded-2xl border border-white text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 shadow-sm">
                <Target size={24} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Pragmatisme Radical</h4>
              <p className="text-gray-600 text-sm">
                Protocols reals per a vides reals. Sense complicacions innecessàries.
              </p>
            </div>
          </div>
        </div>

        {/* CTA FINAL & SIGNATURA */}
        <div className="relative text-center bg-gray-900 rounded-3xl p-12 text-white shadow-2xl mb-12 overflow-hidden">
          {/* Background blob */}
          <div className="absolute top-0 right-0 p-40 bg-purple-600 rounded-full blur-3xl opacity-20 -mr-20 -mt-20 pointer-events-none"></div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">
            Uneix-te al moviment
          </h2>

          {/* Live Counter */}
          <div className="flex justify-center items-center gap-2 mb-8 text-purple-200">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-mono text-lg">
              {count.toLocaleString()} persones ja s'han unit
            </span>
          </div>

          {!isSigned ? (
            <>
              <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto relative z-10">
                Signa per confirmar que prens el control de la teva salut. Sense lletra petita.
              </p>

              <button
                onClick={handleSign}
                className="px-10 py-5 rounded-xl font-bold text-purple-900 bg-white hover:bg-gray-100 shadow-lg hover:shadow-white/20 transition transform hover:scale-105 flex items-center justify-center gap-3 mx-auto relative z-10"
              >
                <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
                Signar el Manifest
              </button>
            </>
          ) : (
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-6 py-2 rounded-full font-bold mb-8 border border-green-500/50">
                <Check size={20} /> Manifest Signat
              </div>

              <h3 className="text-xl font-bold mb-6">Comparteix el teu compromís 🚀</h3>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl font-bold text-white bg-black hover:bg-gray-800 border border-gray-700 transition flex items-center justify-center gap-2"
                >
                  <TwitterIcon size={20} />
                  Post a X
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] transition flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
              </div>

              <button
                onClick={() => (window.location.href = '/diagnosis')}
                className="mt-8 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl border border-white/30 transition-all"
              >
                Materialitza el teu compromís (Començar Diagnòstic) →
              </button>
            </div>
          )}
        </div>

        {/* BOTÓ TORNAR */}
        <div className="text-center">
          <button
            onClick={() => (window.location.href = '/')}
            className="text-gray-500 hover:text-gray-900 font-medium flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Tornar a l'inici
          </button>
        </div>
      </div>
    </div>
  );
}
