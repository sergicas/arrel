import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { diagnosisQuestions } from '../data/diagnosisData';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import {
  ArrowLeft,
  Loader2,
  HelpCircle,
  Save,
  Clock,
  SkipForward,
  Activity,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import SEO from '../components/SEO';
import { analytics } from '../lib/analytics';
import { useToast } from '../context/ToastContext';

const Diagnosis = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  // Helper for lazy loading
  const getSavedState = () => {
    try {
      const savedProgress = localStorage.getItem('arrel_quiz_progress');
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        const OneDay = 24 * 60 * 60 * 1000;
        if (Date.now() - parsed.timestamp < OneDay && parsed.currentIndex < diagnosisQuestions.length) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return null;
  };



  const [step, setStep] = useState(() => {
    return getSavedState() ? 'quiz' : 'intro';
  });

  const [currentIndex, setCurrentIndex] = useState(() => {
    const s = getSavedState();
    return s ? s.currentIndex : 0;
  });

  const [scores, setScores] = useState(() => {
    const s = getSavedState();
    return s ? s.scores : { energy: 0, attention: 0, lived_time: 0 };
  });

  const [showTooltip, setShowTooltip] = useState(false);

  // Safety check for data
  const isValidData = diagnosisQuestions && diagnosisQuestions.length > 0;
  const currentQuestion =
    isValidData && diagnosisQuestions[currentIndex] ? diagnosisQuestions[currentIndex] : null;

  const progress = isValidData ? (currentIndex / diagnosisQuestions.length) * 100 : 0;
  const questionsLeft = isValidData ? diagnosisQuestions.length - currentIndex : 0;
  const timeRemaining = Math.max(1, Math.ceil(questionsLeft * 0.5));

  const { user, enterAsGuest } = useAuth();

  const [answers, setAnswers] = useState(() => {
    const s = getSavedState();
    return s ? s.answers : [];
  });

  const [selectedOption, setSelectedOption] = useState(null);

  // Redirect if no data
  useEffect(() => {
    if (!isValidData) {
      console.error('Critical: Diagnosis questions missing');
      navigate('/');
    }
  }, [isValidData, navigate]);

  // Analytics and Cleanup
  // Use a ref to access the initial index without triggering re-runs
  const initialIndexRef = useRef(currentIndex);

  useEffect(() => {
    analytics.trackPage('/diagnosis');
    const start = Date.now();

    // Resume tracking if started
    if (getSavedState()) {
      analytics.trackEvent('Diagnosis', 'Resume', `Step ${initialIndexRef.current + 1}`);
    } else {
      analytics.trackEvent('Diagnosis', 'Start');
    }

    return () => {
      const seconds = Math.round((Date.now() - start) / 1000);
      analytics.trackTimeSpent('Diagnosis', seconds);
    };
  }, []);

  // TRACK STEPS FOR DROPOUT ANALYSIS
  useEffect(() => {
    if (step === 'quiz') {
      analytics.trackDiagnosisStep(currentIndex + 1, diagnosisQuestions.length);
    }
  }, [currentIndex, step]);

  const saveAndExit = () => {
    // Explicit save action (though it autosaves on answer)
    // Just notify and leave
    showToast('Progrés guardat. Pots continuar quan vulguis.', 'success');
    navigate('/');
  };

  const saveResults = async (finalScores) => {
    analytics.trackEvent('Diagnosis', 'Complete');
    // Clear progress storage on completion
    localStorage.removeItem('arrel_quiz_progress');
    localStorage.removeItem('arrel_goal');

    if (!user) {
      localStorage.setItem('arrel_diagnosis_raw', JSON.stringify(finalScores));
      return;
    }

    try {
      const { error: diagError } = await supabase.from('diagnostics').insert([
        {
          user_id: user.id,
          scores: finalScores,
          completed_at: new Date().toISOString(),
        },
      ]);

      if (diagError) console.error('Error saving diagnosis:', diagError);

      const { error: stateError } = await supabase.from('user_state').upsert({
        user_id: user.id,
        current_day: 2,
        current_cycle: 1,
        last_active_at: new Date().toISOString(),
      });

      if (stateError) console.error('Error updating state:', stateError);
    } catch (e) {
      console.error('Critical Save Error', e);
    }
  };

  const handleAnswer = useCallback((score, variable, answerIndex) => {
    setSelectedOption(answerIndex);
    setShowTooltip(false); // Hide tooltip if open

    // DELAY FOR VISUAL FEEDBACK (Reduced for Bug 3)
    setTimeout(() => {
      // 1. UPDATE STATE
      setAnswers((prev) => {
        const newAnswers = [...prev];
        // Ensure we are updating the correct index
        newAnswers[currentIndex] = answerIndex;
        return newAnswers;
      });

      setScores((prev) => ({
        ...prev,
        [variable]: (prev[variable] || 0) + score,
      }));

      // 2. CHECK NEXT STEP
      if (currentIndex < diagnosisQuestions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null); // Reset for next question
      } else {
        setStep('calculating');
      }
    }, 400); // 400ms delay for user to see selection
  }, [currentIndex]);


  // 4. COMPLETION LOGIC
  useEffect(() => {
    if (step === 'calculating') {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#ec4899', '#3b82f6'],
      });
      localStorage.removeItem('arrel_quiz_progress');

      const timer = setTimeout(() => {
        saveResults(scores);
        localStorage.setItem('arrel_diagnosis_answers', JSON.stringify(answers));

        const nouDiagnostic = {
          id: Date.now(),
          data: new Date().toISOString(),
          respostes: answers,
          scores: scores,
        };
        const historicGuardat = localStorage.getItem('arrel_historic');
        const historic = historicGuardat ? JSON.parse(historicGuardat) : [];
        historic.push(nouDiagnostic);
        localStorage.setItem('arrel_historic', JSON.stringify(historic));
        localStorage.setItem('arrel_respostes', JSON.stringify(answers));

        navigate('/resultats');
      }, 3000);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const handleBack = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      const prevQuestion = diagnosisQuestions[prevIndex];
      const prevAnswerIdx = answers[prevIndex];
      const scoreToDeduct = prevQuestion.options[prevAnswerIdx].score;
      const variable = prevQuestion.variable;

      setScores((prev) => ({ ...prev, [variable]: prev[variable] - scoreToDeduct }));
      setAnswers((prev) => prev.slice(0, -1));
      setCurrentIndex(prevIndex);
    }
  };

  // KEYBOARD NAVIGATION
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (step !== 'quiz' || !currentQuestion.options) return;

      const key = parseInt(e.key);
      if (!isNaN(key) && key > 0 && key <= currentQuestion.options.length) {
        const index = key - 1;
        const option = currentQuestion.options[index];
        if (option) {
          handleAnswer(option.score, currentQuestion.variable, index);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, currentQuestion, answers, scores, handleAnswer]);



  // 3. CALCULATING SCREEN
  if (step === 'calculating') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-sm w-full">
          <div className="flex justify-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            >
              <Loader2 className="w-12 h-12 text-purple-600" />
            </motion.div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculant el teu perfil...</h2>
          <p className="text-gray-500 mb-8">
            Analitzant marcadors de cronobiologia i neuroplasticitat.
          </p>

          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  // 1.5 INTRO SCREEN (New Pre-Diagnosis Block)
  if (step === 'intro') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-gray-900">
        <div className="max-w-md w-full space-y-8 animate-fade-in-up">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-600">
              <Activity size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Abans de començar</h1>
            <p className="text-gray-600 text-lg">
              El diagnòstic està dissenyat per identificar els teus patrons d'envelliment.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-4 border border-gray-100">
            <div className="flex items-start gap-4">
              <Clock className="mt-1 text-blue-500 flex-shrink-0" size={20} />
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Durada estimada</h3>
                <p className="text-sm text-gray-600">~2 minuts de resposta ràpida.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <HelpCircle className="mt-1 text-purple-500 flex-shrink-0" size={20} />
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Què et preguntarem?</h3>
                <p className="text-sm text-gray-600">
                  Hàbits sobre energia, son, nutrició i estrès.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Shield className="mt-1 text-green-500 flex-shrink-0" size={20} />
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Privacitat total</h3>
                <p className="text-sm text-gray-600">No cal registre. Les dades són teves.</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded-xl flex gap-3 border border-yellow-100">
            <div className="text-yellow-600 flex-shrink-0 mt-0.5">
              <HelpCircle size={16} />
            </div>
            <p className="text-xs text-yellow-800 leading-relaxed">
              <strong>Nota:</strong> Això és una eina educativa basada en ciència de l'estil de
              vida, no un diagnòstic mèdic clínic.
            </p>
          </div>

          <button
            onClick={() => setStep('quiz')}
            className="w-full py-4 bg-gray-900 text-white rounded-xl text-lg font-bold hover:bg-black transition-all hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
          >
            Començar <ArrowRight size={20} />
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full py-2 text-gray-500 text-sm font-medium hover:text-gray-900 transition-colors"
          >
            Tornar enrere
          </button>
        </div>
      </div>
    );
  }

  // 2. QUIZ SCREEN
  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900 overflow-hidden relative">
      <SEO
        title="Diagnòstic Arrel"
        description="Descobreix la teva edat biològica i optimitza la teva salut."
      />

      {/* SCREEN READER ANNOUNCER */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {currentQuestion &&
          `Pregunta ${currentIndex + 1} de ${diagnosisQuestions.length}: ${currentQuestion.block}. ${currentQuestion.question}`}
      </div>

      {/* TOP BAR ACTIONS */}
      <div className="absolute top-6 right-6 flex gap-4 z-20">
        <button
          onClick={saveAndExit}
          aria-label="Guardar progrés i sortir"
          className="text-gray-500 hover:text-purple-600 text-xs font-bold flex items-center gap-2 transition-colors bg-white/50 px-3 py-2 rounded-lg hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
        >
          <Save size={16} aria-hidden="true" />{' '}
          <span className="hidden md:inline">Guardar i sortir</span>
        </button>
      </div>

      <div className="w-full max-w-xl relative">
        {/* Header: BLOC INDICATOR */}
        {currentQuestion && (
          <div className="mb-8">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-mono text-purple-600 uppercase tracking-widest font-bold">
                {currentQuestion.block}
              </span>
              {/* ... */}
              <div
                className="flex items-center gap-4 text-xs font-mono text-gray-500"
                aria-hidden="true"
              >
                <span className="flex items-center gap-1">
                  <Clock size={12} /> ~{timeRemaining} min
                </span>
                <span>
                  {currentIndex + 1} / {diagnosisQuestions.length} ({Math.round(progress)}%)
                </span>
              </div>
            </div>

            <div className="h-4 w-full bg-gray-200 relative overflow-hidden rounded-full shadow-inner">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
              {/* Striped pattern overlay */}
              <div className="absolute inset-0 opacity-10 bg-[length:10px_10px] bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)]" />
            </div>
          </div>
        )}

        {/* BACK BUTTON (Top Left relative to card) */}
        {currentIndex > 0 && (
          <button
            onClick={handleBack}
            aria-label="Tornar a la pregunta anterior"
            className="absolute -top-10 left-0 text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg px-2 py-1"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Enrere
          </button>
        )}

        {/* Question & Options with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: 20, opacity: 0 }} // Reduced motion distance for speed
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.15 }} // Reduced from 0.3s (fix for Bug 3)
          >
            {/* Question */}
            <div className="mb-10 relative">
              <h2 className="text-2xl md:text-3xl font-medium leading-snug text-gray-900 tracking-tight pr-8">
                {currentQuestion.question}
              </h2>

              {/* Context Tooltip Trigger */}
              {currentQuestion.context && (
                <div className="absolute top-1 right-0">
                  <button
                    onClick={() => setShowTooltip(!showTooltip)}
                    className="text-purple-400 hover:text-purple-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-full"
                    title="Per què preguntem això?"
                    aria-label="Veure més informació sobre aquesta pregunta"
                  >
                    <HelpCircle size={24} />
                  </button>
                </div>
              )}

              {/* Tooltip Content */}
              <AnimatePresence>
                {showTooltip && currentQuestion.context && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute z-30 top-full mt-4 right-0 w-full sm:w-64 bg-gray-900 text-white text-sm p-4 rounded-xl shadow-xl border border-gray-700 leading-relaxed"
                  >
                    <div className="absolute -top-2 right-2 w-4 h-4 bg-gray-900 rotate-45 border-l border-t border-gray-700"></div>
                    <span className="font-bold text-purple-300 block mb-1">
                      Per què és important?
                    </span>
                    {currentQuestion.context}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Options */}
            <div className="grid gap-3">
              {currentQuestion.options &&
                currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option.score, currentQuestion.variable, idx)}
                    disabled={selectedOption !== null}
                    className={`group flex items-center p-5 rounded-xl border-2 text-left transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-200
                                        ${selectedOption === idx
                        ? 'border-purple-600 bg-purple-50 ring-4 ring-purple-100 shadow-lg z-10'
                        : 'border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-purple-200 opacity-100'
                      }
                                        ${selectedOption !== null && selectedOption !== idx ? 'opacity-50 blur-[0.5px]' : ''}
                                    `}
                    aria-pressed={selectedOption === idx}
                  >
                    <span
                      className={`flex items-center justify-center w-8 h-8 mr-4 text-sm font-bold border rounded-lg transition-colors
                                        ${selectedOption === idx
                          ? 'bg-purple-600 border-purple-600 text-white'
                          : 'text-gray-400 border-gray-200 bg-gray-50 group-hover:bg-purple-50 group-hover:border-purple-300 group-hover:text-purple-600'
                        }
                                    `}
                    >
                      {['A', 'B', 'C', 'D'][idx]}
                    </span>
                    <span
                      className={`flex-1 font-medium text-lg transition-colors
                                        ${selectedOption === idx ? 'text-purple-900' : 'text-gray-700 group-hover:text-gray-900'}
                                    `}
                    >
                      {option.label}
                    </span>
                  </button>
                ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex justify-center gap-8 border-t border-gray-100 pt-6">
          <button
            onClick={() => {
              // Clearer action: Skip test means entering as guest
              if (
                window.confirm(
                  "Saltar el test et permetrà explorar l'app, però no tindràs un pla personalitzat. Vols continuar?"
                )
              ) {
                enterAsGuest();
                localStorage.removeItem('arrel_quiz_progress');
                navigate('/dashboard');
              }
            }}
            className="text-gray-400 hover:text-purple-600 font-mono text-[10px] tracking-widest uppercase transition-colors flex items-center gap-2"
          >
            Saltar Test i Explorar <SkipForward size={12} />
          </button>

          <button
            onClick={() => {
              if (window.confirm('Vols reiniciar el diagnòstic des de zero?')) {
                localStorage.removeItem('arrel_quiz_progress');
                window.location.reload(); // Hard reload is cleaner for full reset
              }
            }}
            className="text-gray-400 hover:text-red-500 font-mono text-[10px] tracking-widest uppercase transition-colors"
          >
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;
