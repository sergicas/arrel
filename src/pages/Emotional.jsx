import React, { useState, useEffect } from 'react';
import { Heart, Smile, Frown, Meh, CloudRain, Sun, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

import { useArrelData } from '../hooks/useArrelData';

const Emotional = () => {
  const { loadData, saveData } = useArrelData();

  // ---- STATE: Mood Check-in ----
  const [mood, setMood] = useState(() => {
    const parsed = loadData('emotional');
    return parsed?.mood || null;
  }); // 'great', 'good', 'neutral', 'bad', 'awful'

  // ---- STATE: Reframing Exercise ----
  const [stressor, setStressor] = useState(() => {
    const parsed = loadData('emotional');
    return parsed?.stressor || '';
  });
  const [reframe, setReframe] = useState(() => {
    const parsed = loadData('emotional');
    return parsed?.reframe || '';
  });

  // ---- PERSISTENCE ----
  useEffect(() => {
    saveData('emotional', {
      mood,
      stressor,
      reframe,
      lastUpdated: new Date().toISOString(),
    });
  }, [mood, stressor, reframe, saveData]);

  const moods = [
    { id: 'great', icon: Sun, label: 'Radiant', color: 'text-yellow-500', bg: 'bg-yellow-100' },
    { id: 'good', icon: Smile, label: 'Bé', color: 'text-green-500', bg: 'bg-green-100' },
    { id: 'neutral', icon: Meh, label: 'Neutre', color: 'text-gray-500', bg: 'bg-gray-100' },
    { id: 'bad', icon: Frown, label: 'Malament', color: 'text-orange-500', bg: 'bg-orange-100' },
    { id: 'awful', icon: CloudRain, label: 'Pèssim', color: 'text-blue-500', bg: 'bg-blue-100' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 p-6">
      <SEO
        title="Salut Emocional"
        description="Eines per gestionar l'estrès i cultivar la resiliència emocional."
      />
      <div className="max-w-md mx-auto space-y-8">
        {/* HEADLINE */}
        <div className="text-center pt-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Salut Emocional</h1>
          <p className="text-gray-500 italic">
            "No és el que et passa, sinó com reacciones al que et passa."
          </p>
        </div>

        {/* --- SECCIÓ 1: MOOD CHECK-IN --- */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center gap-2 mb-6 text-pink-600 font-bold text-xs uppercase tracking-wider">
            <Heart size={14} /> Check-in Diari
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-6 text-center">
            Com et sents ara mateix?
          </h3>

          <div className="flex justify-between gap-2">
            {moods.map((m) => (
              <button
                key={m.id}
                onClick={() => setMood(m.id)}
                className={`flex flex-col items-center gap-2 transition-all p-2 rounded-xl
                                    ${mood === m.id ? 'transform scale-110 ' + m.bg : 'opacity-60 hover:opacity-100 hover:scale-105'}
                                `}
              >
                <m.icon size={32} className={m.color} />
                <span className="text-[10px] font-bold text-gray-500 uppercase">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* --- SECCIÓ 2: REFRAMING (Resiliència) --- */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-pink-100 text-pink-600 rounded-lg">
              <CloudRain size={20} />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Reenquadrament</h2>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Transforma l'estrès en creixement. Identifica un repte i canvia la perspectiva.
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">
                El Repte (Estressor)
              </label>
              <textarea
                value={stressor}
                onChange={(e) => setStressor(e.target.value)}
                placeholder="Què t'està preocupant?"
                className="w-full p-4 bg-white/50 border border-pink-100 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-300 outline-none transition-all placeholder-gray-400 text-gray-700 h-24 resize-none"
              />
            </div>

            {stressor && (
              <div className="animate-fade-in-up">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block flex items-center gap-2">
                  <ArrowRight size={12} className="text-pink-500" /> La Oportunitat (Reenquadrament)
                </label>
                <textarea
                  value={reframe}
                  onChange={(e) => setReframe(e.target.value)}
                  placeholder="Què puc aprendre d'això? Com em pot fer més fort?"
                  className="w-full p-4 bg-green-50/50 border border-green-100 rounded-xl focus:ring-2 focus:ring-green-200 focus:border-green-300 outline-none transition-all placeholder-gray-400 text-gray-700 h-24 resize-none"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emotional;
