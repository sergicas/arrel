import React, { useState, useEffect } from 'react';
import { Zap, Compass, Lightbulb, ArrowRight, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';

import { useArrelData } from '../hooks/useArrelData';

const Intellectual = () => {
  const { loadData, saveData } = useArrelData();

  // ---- STATE: Core Values ----
  const [values, setValues] = useState(() => {
    const parsed = loadData('intellectual');
    return parsed?.values || ['', '', ''];
  });

  // ---- STATE: Learning Goal ----
  const [learningGoal, setLearningGoal] = useState(() => {
    const parsed = loadData('intellectual');
    return parsed?.learningGoal || '';
  });

  // ---- PERSISTENCE ----
  useEffect(() => {
    saveData('intellectual', {
      values,
      learningGoal,
      lastUpdated: new Date().toISOString(),
    });
  }, [values, learningGoal, saveData]);

  const handleValueChange = (index, val) => {
    const newValues = [...values];
    newValues[index] = val;
    setValues(newValues);
  };

  const quotes = [
    "L'home que mou muntanyes comença carregant petites pedres.",
    'Sigues el canvi que vols veure al món.',
    "El coneixement és l'únic bé que creix quan es comparteix.",
  ];
  const [randomQuote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 p-6">
      <SEO
        title="Identitat i Creixement"
        description="Defineix els teus valors i objectius d'aprenentatge."
      />
      <div className="max-w-md mx-auto space-y-8">
        {/* HEADLINE */}
        <div className="text-center pt-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Identitat</h1>
          <p className="text-gray-500 italic">"{randomQuote}"</p>
        </div>

        {/* --- SECCIÓ 1: VALORS NUCLEARS --- */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
              <Compass size={20} />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Valors Nuclears</h2>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Quins són els 3 principis innegociables que guien les teves decisions?
          </p>

          <div className="space-y-3">
            {values.map((val, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-yellow-500 font-bold opacity-50">
                  {idx + 1}.
                </div>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => handleValueChange(idx, e.target.value)}
                  placeholder={`Valor ${idx + 1}`}
                  className="w-full pl-8 pr-4 py-3 bg-yellow-50/50 border border-yellow-100 rounded-xl focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 outline-none transition-all placeholder-gray-400 text-gray-800 font-medium"
                />
              </div>
            ))}
          </div>
        </div>

        {/* --- SECCIÓ 2: OBJECTIU D'APRENENTATGE --- */}
        <div className="bg-gray-900 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2 mb-2 text-yellow-400 font-bold text-xs uppercase tracking-wider">
              <Zap size={14} /> Focus Actual
            </div>

            <h3 className="text-xl font-bold">Què estàs aprenent ara mateix?</h3>

            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="flex items-start gap-3">
                <BookOpen className="text-yellow-400 shrink-0 mt-1" size={20} />
                <textarea
                  value={learningGoal}
                  onChange={(e) => setLearningGoal(e.target.value)}
                  placeholder="Ex: Tocar el piano, Intel·ligència Artificial, Cuina thai..."
                  className="w-full bg-transparent border-none p-0 text-white placeholder-white/40 focus:ring-0 resize-none h-20 leading-relaxed"
                />
              </div>
            </div>

            <p className="text-xs text-gray-400">
              La neuroplasticitat es manté activa quan ens exposem a la novetat i la dificultat.
            </p>
          </div>

          {/* Decorative */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Intellectual;
