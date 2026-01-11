import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { diagnosisQuestions } from '../data/diagnosisData';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import SEO from '../components/SEO';

const Diagnosis = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState('quiz'); // Skip intro, go straight to quiz
    const [currentIndex, setCurrentIndex] = useState(0);
    const [scores, setScores] = useState({ energy: 0, attention: 0, lived_time: 0 });
    const [isCalculating, setIsCalculating] = useState(false);

    const currentQuestion = diagnosisQuestions[currentIndex];
    const progress = ((currentIndex + 1) / diagnosisQuestions.length) * 100;

    const { user, enterAsGuest } = useAuth();

    // AUTO-RESTORE ON MOUNT
    useEffect(() => {
        const savedProgress = localStorage.getItem('arrel_quiz_progress');
        if (savedProgress) {
            try {
                const { currentIndex: savedIndex, scores: savedScores, answers: savedAnswers, timestamp } = JSON.parse(savedProgress);
                // Check if valid (e.g. less than 24h old)
                const OneDay = 24 * 60 * 60 * 1000;
                if (Date.now() - timestamp < OneDay) {
                    if (savedIndex < diagnosisQuestions.length) {
                        setCurrentIndex(savedIndex);
                        setScores(savedScores);
                        setAnswers(savedAnswers);
                        setStep('quiz'); // Skip intro if restoring
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

    // Helper to get dynamic title based on hero selection
    const getIntroTitle = () => {
        const goal = localStorage.getItem('arrel_goal');
        switch (goal) {
            case 'energy': return "Analitzem els teus nivells d'energia...";
            case 'sleep': return "Vegem què afecta el teu descans...";
            case 'focus': return "Descobrim què bloqueja la teva concentració...";
            default: return "Arrel et dona el coneixement per cuidar-te.";
        }
    };

    const saveResults = async (finalScores) => {
        // Clear progress storage on completion
        localStorage.removeItem('arrel_quiz_progress');
        localStorage.removeItem('arrel_goal'); // Clear goal after use

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

    const [answers, setAnswers] = useState([]);

    const handleAnswer = (score, variable, answerIndex) => {
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
            localStorage.removeItem('arrel_quiz_progress'); // Clear partial progress
            setStep('calculating');

            // Artificial delay for "calculation" effect
            setTimeout(() => {
                saveResults(newScores);
                localStorage.setItem('arrel_diagnosis_answers', JSON.stringify(newAnswers));
                // New Logic: Store basic history for local usage if needed
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
            }, 3000); // 3 seconds delay
        }
    };

    // KEYBOARD NAVIGATION
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (step !== 'quiz') return;

            const key = parseInt(e.key);
            if (!isNaN(key) && key > 0 && key <= currentQuestion.options.length) {
                const index = key - 1;
                // Add a small active feedback visually if needed, for now just trigger logic
                const option = currentQuestion.options[index];
                if (option) {
                    handleAnswer(option.score, currentQuestion.variable, index);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [step, currentQuestion, currentIndex, scores, answers]); // Re-bind on state change to ensure fresh closure if needed

    // 1. INTRO SCREEN REMOVED (Direct to Quiz)

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
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900 overflow-hidden">
            <div className="w-full max-w-xl relative">

                {/* Header: BLOC INDICATOR */}
                <div className="mb-12">
                    <div className="flex justify-between items-baseline mb-4">
                        <span className="text-xs font-mono text-purple-600 uppercase tracking-widest">
                            {currentQuestion.block}
                        </span>
                        <span className="text-xs font-mono text-gray-500">
                            {currentIndex + 1} / {diagnosisQuestions.length}
                        </span>
                    </div>

                    <div className="h-0.5 w-full bg-gray-200 relative overflow-hidden rounded-full">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-purple-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

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
                        <div className="mb-10">
                            <h2 className="text-2xl md:text-3xl font-medium leading-snug text-gray-900 tracking-tight">
                                {currentQuestion.question}
                            </h2>
                        </div>

                        {/* Options */}
                        <div className="grid gap-3">
                            {currentQuestion.options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(option.score, currentQuestion.variable, idx)}
                                    className="group flex items-center p-5 rounded-lg border-2 border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-purple-200 text-left transition-all duration-200 active:scale-[0.99]"
                                >
                                    <span className="flex items-center justify-center w-6 h-6 mr-4 text-xs font-bold text-gray-400 border border-gray-200 rounded group-hover:border-purple-300 group-hover:text-purple-600 bg-gray-50 group-hover:bg-purple-50 transition-colors">
                                        {idx + 1}
                                    </span>
                                    <span className="flex-1 font-medium text-[15px] text-gray-700 group-hover:text-gray-900 transition-colors">
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
                            if (window.confirm("Vols creuar el pont i anar al Dashboard sense resultats?")) {
                                enterAsGuest();
                                localStorage.removeItem('arrel_quiz_progress');
                                navigate('/dashboard');
                            }
                        }}
                        className="text-gray-400 hover:text-purple-600 font-mono text-[10px] tracking-widest uppercase transition-colors"
                    >
                        Saltar Test
                    </button>

                    <button
                        onClick={() => {
                            if (window.confirm("Vols reiniciar el diagnòstic?")) {
                                localStorage.removeItem('arrel_quiz_progress');
                                setCurrentIndex(0);
                                setScores({ energy: 0, attention: 0, lived_time: 0 });
                                setAnswers([]);
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
