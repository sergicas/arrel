import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { diagnosisQuestions } from '../data/diagnosisData';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Loader2, HelpCircle, Save, Clock, SkipForward } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import SEO from '../components/SEO';

const Diagnosis = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState('quiz'); // Skip intro, go straight to quiz
    const [currentIndex, setCurrentIndex] = useState(0);
    const [scores, setScores] = useState({ energy: 0, attention: 0, lived_time: 0 });
    const [isCalculating, setIsCalculating] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const currentQuestion = diagnosisQuestions[currentIndex] || {};
    const progress = ((currentIndex) / diagnosisQuestions.length) * 100;
    const questionsLeft = diagnosisQuestions.length - currentIndex;
    const timeRemaining = Math.max(1, Math.ceil(questionsLeft * 0.5)); // Approx 30s per question

    const { user, enterAsGuest } = useAuth();
    const [answers, setAnswers] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    // AUTO-RESTORE ON MOUNT
    useEffect(() => {
        const savedProgress = localStorage.getItem('arrel_quiz_progress');
        if (savedProgress) {
            try {
                const { currentIndex: savedIndex, scores: savedScores, answers: savedAnswers, timestamp } = JSON.parse(savedProgress);
                const OneDay = 24 * 60 * 60 * 1000;
                if (Date.now() - timestamp < OneDay) {
                    if (savedIndex < diagnosisQuestions.length) {
                        setCurrentIndex(savedIndex);
                        setScores(savedScores);
                        setAnswers(savedAnswers);
                        setStep('quiz');
                    }
                } else {
                    localStorage.removeItem('arrel_quiz_progress');
                }
            } catch (e) {
                console.error("Error parsing saved progress", e);
                localStorage.removeItem('arrel_quiz_progress');
            }
        }
    }, []);

    const saveAndExit = () => {
        // Explicit save action (though it autosaves on answer)
        // Just notify and leave
        alert("Progrés guardat. Pots continuar quan vulguis.");
        navigate('/');
    };

    const saveResults = async (finalScores) => {
        // Clear progress storage on completion
        localStorage.removeItem('arrel_quiz_progress');
        localStorage.removeItem('arrel_goal');

        if (!user) {
            localStorage.setItem('arrel_diagnosis_raw', JSON.stringify(finalScores));
            return;
        }

        try {
            const { error: diagError } = await supabase
                .from('diagnostics')
                .insert([{
                    user_id: user.id,
                    scores: finalScores,
                    completed_at: new Date().toISOString()
                }]);

            if (diagError) console.error('Error saving diagnosis:', diagError);

            const { error: stateError } = await supabase
                .from('user_state')
                .upsert({
                    user_id: user.id,
                    current_day: 2,
                    current_cycle: 1,
                    last_active_at: new Date().toISOString()
                });

            if (stateError) console.error('Error updating state:', stateError);

        } catch (e) {
            console.error("Critical Save Error", e);
        }
    };

    const handleAnswer = (score, variable, answerIndex) => {
        setSelectedOption(answerIndex);
        setShowTooltip(false); // Hide tooltip if open

        // DELAY FOR VISUAL FEEDBACK
        setTimeout(() => {
            const newScores = { ...scores, [variable]: (scores[variable] || 0) + score };
            setScores(newScores);

            const newAnswers = [...answers, answerIndex];
            setAnswers(newAnswers);

            // AUTO-SAVE PROGRESS
            if (currentIndex < diagnosisQuestions.length - 1) {
                const nextIndex = currentIndex + 1;
                setCurrentIndex(nextIndex);

                localStorage.setItem('arrel_quiz_progress', JSON.stringify({
                    currentIndex: nextIndex,
                    scores: newScores,
                    answers: newAnswers,
                    timestamp: Date.now()
                }));

            } else {
                // FINISHED QUIZ
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#a855f7', '#ec4899', '#3b82f6']
                });
                localStorage.removeItem('arrel_quiz_progress');
                setStep('calculating');

                setTimeout(() => {
                    saveResults(newScores);
                    localStorage.setItem('arrel_diagnosis_answers', JSON.stringify(newAnswers));

                    const nouDiagnostic = {
                        id: Date.now(),
                        data: new Date().toISOString(),
                        respostes: newAnswers
                    };
                    const historicGuardat = localStorage.getItem('arrel_historic');
                    const historic = historicGuardat ? JSON.parse(historicGuardat) : [];
                    historic.push(nouDiagnostic);
                    localStorage.setItem('arrel_historic', JSON.stringify(historic));
                    localStorage.setItem('arrel_respostes', JSON.stringify(newAnswers));

                    navigate('/resultats');
                }, 3000);
            }
            setSelectedOption(null);
        }, 350);
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            const prevQuestion = diagnosisQuestions[prevIndex];
            const prevAnswerIdx = answers[prevIndex];
            const scoreToDeduct = prevQuestion.options[prevAnswerIdx].score;
            const variable = prevQuestion.variable;

            setScores(prev => ({ ...prev, [variable]: prev[variable] - scoreToDeduct }));
            setAnswers(prev => prev.slice(0, -1));
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
    }, [step, currentQuestion, currentIndex, scores, answers]);


    // 3. CALCULATING SCREEN
    if (step === 'calculating') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-sm w-full"
                >
                    <div className="flex justify-center mb-8">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                            <Loader2 className="w-12 h-12 text-purple-600" />
                        </motion.div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculant el teu perfil...</h2>
                    <p className="text-gray-500 mb-8">Analitzant marcadors de cronobiologia i neuroplasticitat.</p>

                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 3, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>
            </div>
        );
    }


    // 2. QUIZ SCREEN
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900 overflow-hidden relative">
            <SEO
                title="Diagnòstic Arrel"
                description="Descobreix la teva edat biològica i optimitza la teva salut."
            />

            {/* TOP BAR ACTIONS */}
            <div className="absolute top-6 right-6 flex gap-4 z-20">
                <button
                    onClick={saveAndExit}
                    className="text-gray-400 hover:text-purple-600 text-xs font-bold flex items-center gap-2 transition-colors bg-white/50 px-3 py-2 rounded-lg hover:bg-white"
                >
                    <Save size={16} /> <span className="hidden md:inline">Guardar i sortir</span>
                </button>
            </div>

            <div className="w-full max-w-xl relative">

                {/* Header: BLOC INDICATOR */}
                <div className="mb-8">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-xs font-mono text-purple-600 uppercase tracking-widest font-bold">
                            {currentQuestion.block}
                        </span>
                        <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
                            <span className="flex items-center gap-1">
                                <Clock size={12} /> ~{timeRemaining} min
                            </span>
                            <span>
                                {currentIndex + 1} / {diagnosisQuestions.length}
                            </span>
                        </div>
                    </div>

                    <div className="h-4 w-full bg-gray-200 relative overflow-hidden rounded-full shadow-inner">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                        {/* Striped pattern overlay */}
                        <div className="absolute inset-0 opacity-10 bg-[length:10px_10px] bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)]" />
                    </div>
                </div>

                {/* BACK BUTTON (Top Left relative to card) */}
                {currentIndex > 0 && (
                    <button
                        onClick={handleBack}
                        className="absolute -top-10 left-0 text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm font-medium transition-colors"
                    >
                        <ArrowLeft size={16} /> Enrere
                    </button>
                )}

                {/* Question & Options with AnimatePresence */}
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentIndex}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -50, opacity: 0 }}
                        transition={{ duration: 0.3 }}
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
                                        className="text-purple-300 hover:text-purple-600 transition-colors"
                                        title="Per què preguntem això?"
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
                                        <span className="font-bold text-purple-300 block mb-1">Per què és important?</span>
                                        {currentQuestion.context}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Options */}
                        <div className="grid gap-3">
                            {currentQuestion.options && currentQuestion.options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(option.score, currentQuestion.variable, idx)}
                                    disabled={selectedOption !== null}
                                    className={`group flex items-center p-5 rounded-xl border-2 text-left transition-all duration-200 active:scale-[0.98]
                                        ${selectedOption === idx
                                            ? 'border-purple-600 bg-purple-50 ring-4 ring-purple-100 shadow-lg z-10'
                                            : 'border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-purple-200 opacity-100'
                                        }
                                        ${selectedOption !== null && selectedOption !== idx ? 'opacity-50 blur-[0.5px]' : ''}
                                    `}
                                >
                                    <span className={`flex items-center justify-center w-8 h-8 mr-4 text-sm font-bold border rounded-lg transition-colors
                                        ${selectedOption === idx
                                            ? 'bg-purple-600 border-purple-600 text-white'
                                            : 'text-gray-400 border-gray-200 bg-gray-50 group-hover:bg-purple-50 group-hover:border-purple-300 group-hover:text-purple-600'
                                        }
                                    `}>
                                        {['A', 'B', 'C', 'D'][idx]}
                                    </span>
                                    <span className={`flex-1 font-medium text-lg transition-colors
                                        ${selectedOption === idx ? 'text-purple-900' : 'text-gray-700 group-hover:text-gray-900'}
                                    `}>
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
                            if (window.confirm("Saltar el test et permetrà explorar l'app, però no tindràs un pla personalitzat. Vols continuar?")) {
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
                            if (window.confirm("Vols reiniciar el diagnòstic des de zero?")) {
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
