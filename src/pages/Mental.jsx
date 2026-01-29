import React, { useState, useEffect } from 'react';
import { Wind, BookHeart, Brain, ArrowRight } from 'lucide-react';

import { useArrelData } from '../hooks/useArrelData';

const Mental = () => {
  const { loadData, saveData } = useArrelData();

  // ---- STATE: Box Breathing ----
  const [breathingActive, setBreathingActive] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle, inhale, hold_in, exhale, hold_out
  const [timeLeft, setTimeLeft] = useState(4);

  // ---- STATE: Gratitude ----
  const [gratitudeLines, setGratitudeLines] = useState(() => {
    const parsed = loadData('mental');
    return parsed?.gratitude || ['', '', ''];
  });

  // ---- PERSISTENCE ----
  useEffect(() => {
    saveData('mental', {
      gratitude: gratitudeLines,
      lastUpdated: new Date().toISOString(),
    });
  }, [gratitudeLines, saveData]);

  // ---- BREATHING LOGIC ----
  useEffect(() => {
    let interval = null;
    if (breathingActive) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 1) return prev - 1;
          // Transition phase
          switch (phase) {
            case 'idle':
              return 4; // Should not happen if active
            case 'inhale':
              setPhase('hold_in');
              return 4;
            case 'hold_in':
              setPhase('exhale');
              return 4;
            case 'exhale':
              setPhase('hold_out');
              return 4;
            case 'hold_out':
              setPhase('inhale');
              return 4;
            default:
              return 4;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathingActive, phase]);

  const startBreathing = () => {
    setBreathingActive(true);
    setPhase('inhale');
    setTimeLeft(4);
  };

  const stopBreathing = () => {
    setBreathingActive(false);
    setPhase('idle');
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'idle':
        return 'Prem per començar';
      case 'inhale':
        return 'Inspira...';
      case 'hold_in':
        return 'Mantingues...';
      case 'exhale':
        return 'Expira...';
      case 'hold_out':
        return 'Buit...';
      default:
        return '';
    }
  };

  // Animation logic removed (unused getCircleScale)

  // Manual refinement for circle animation smoothness would ideally use Keyframes or more complex spring physics,
  // but Tailwind classes work reasonably well for a simple MVP.
  // 'scale-100' logic: base size is small, full size is large.

  // Correction: Let's use specific classes for sizing.
  // Base size: w-32 h-32. Expanded: w-64 h-64.

  // ---- GRATITUDE HANDLERS ----
  const handleGratitudeChange = (index, value) => {
    const newLines = [...gratitudeLines];
    newLines[index] = value;
    setGratitudeLines(newLines);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 p-6">
      <div className="max-w-md mx-auto space-y-8">
        {/* HEADLINE */}
        <div className="text-center pt-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Claredat Mental</h1>
          <p className="text-gray-500 italic">
            "La calma no és l'absència de caos, sinó la pau dins d'ell."
          </p>
        </div>

        {/* --- SECCIÓ 1: BOX BREATHING --- */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col items-center justify-center min-h-[350px]">
          <div className="absolute top-4 left-4 flex gap-2 items-center text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <Wind size={14} /> Box Breathing
          </div>

          {/* Breathing Visualizer */}
          <div className="relative flex items-center justify-center mb-8 mt-4">
            {/* Outer Glow Ring */}
            <div
              className={`absolute rounded-full border-4 border-indigo-100 opacity-50 transition-all ease-linear
                            ${phase === 'inhale'
                  ? 'w-64 h-64 border-indigo-200'
                  : phase === 'exhale'
                    ? 'w-32 h-32'
                    : phase === 'hold_in'
                      ? 'w-64 h-64'
                      : phase === 'hold_out'
                        ? 'w-32 h-32'
                        : 'w-48 h-48'
                }
                        `}
            ></div>

            {/* Main Breathing Circle */}
            <div
              className={`rounded-full bg-indigo-500 shadow-2xl shadow-indigo-300 flex items-center justify-center text-white font-bold text-2xl transition-all ease-linear
                            ${phase === 'inhale'
                  ? 'w-64 h-64 duration-[4000ms]'
                  : phase === 'exhale'
                    ? 'w-32 h-32 duration-[4000ms]'
                    : phase === 'hold_in'
                      ? 'w-64 h-64 duration-100'
                      : phase === 'hold_out'
                        ? 'w-32 h-32 duration-100'
                        : 'w-40 h-40 duration-500'
                }
                            `}
            >
              {breathingActive ? timeLeft : <Brain size={40} />}
            </div>
          </div>

          <div className="text-xl font-medium text-indigo-900 mb-6 h-8 text-center">
            {getPhaseText()}
          </div>

          <button
            onClick={breathingActive ? stopBreathing : startBreathing}
            className={`px-8 py-3 rounded-full font-bold transition-all transform active:scale-95 shadow-lg
                            ${breathingActive
                ? 'bg-white text-indigo-600 border border-indigo-100 hover:bg-gray-50'
                : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:scale-105'
              }
                        `}
          >
            {breathingActive ? 'Aturar' : 'Començar'}
          </button>
        </div>

        {/* --- SECCIÓ 2: GRATITUD --- */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <BookHeart size={20} />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Diari de Gratitud</h2>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Escriu 3 coses simples per les quals et sentis agraït avui.
          </p>

          <div className="space-y-3">
            {gratitudeLines.map((line, idx) => (
              <div key={idx} className="relative">
                <span className="absolute left-3 top-3 text-gray-400 font-serif italic text-sm">
                  {idx + 1}.
                </span>
                <input
                  type="text"
                  value={line}
                  onChange={(e) => handleGratitudeChange(idx, e.target.value)}
                  placeholder="Estic agraït per..."
                  className="w-full pl-8 pr-4 py-3 bg-white/50 border border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-200 focus:border-purple-300 outline-none transition-all placeholder-gray-400 text-gray-700"
                />
              </div>
            ))}
          </div>

          {/* Visual Indicator of Completion */}
          <div className="pt-2 flex justify-end">
            <span className="text-xs font-medium text-purple-400">
              {gratitudeLines.filter((l) => l.trim().length > 0).length}/3 Completats
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mental;
