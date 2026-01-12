import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { week1Protocol } from '../../data/protocolData'; // Needed for Day 1 fallback
import { protocolData } from '../../data/protocolData';
import { ArrowLeft, Check } from 'lucide-react';
import MicroTimer from '../../components/MicroTimer';

const DailyProtocol = () => {
    const navigate = useNavigate();
    const { user, isGuest } = useAuth();
    const [dayData, setDayData] = useState(null);
    const [mode, setMode] = useState('loading'); // loading, intro, questions, observation, closing

    // Question Mode State
    const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
    const [answers, setAnswers] = useState({});

    // Load Protocol Data from DB
    useEffect(() => {
        if (!user && !isGuest) return;

        const fetchState = async () => {
            try {
                let currentDay = 1;

                if (user) {
                    // 1. Authenticated: Fetch from Supabase
                    const { data, error } = await supabase
                        .from('user_state')
                        .select('current_day')
                        .eq('user_id', user.id)
                        .maybeSingle();

                    if (error) {
                        console.error('Error fetching state:', error);
                    } else if (data) {
                        currentDay = data.current_day || 1;
                    }
                } else {
                    // 2. Guest: Default to Day 1 (or read local state if we want to support progression later)
                    // For now, Guest = Day 1
                    const guestDay = localStorage.getItem('arrel_guest_day');
                    currentDay = guestDay ? parseInt(guestDay) : 1;
                }

                // 2. Load Content based on Day
                if (currentDay === 1) {
                    // Day 1: Fallback (usually Diagnosis, but if logic allows, standard tasks)
                    const storedPlan = localStorage.getItem('arrel_day1_plan');
                    setDayData(storedPlan ? JSON.parse(storedPlan) : week1Protocol[0]);
                    setMode('tasks');
                } else {
                    // Protocol 0 Days 2-7
                    const protoDay = protocolData.find(d => d.day === currentDay);
                    if (protoDay) {
                        setDayData(protoDay);
                        setMode(protoDay.intro ? 'intro' : 'questions');
                    } else {
                        // Fallback/Placeholder
                        setDayData({ title: "FI DEL CICLE", message: "Propera versió disponible aviat." });
                        setMode('closing');
                    }
                }

            } catch (err) {
                console.error("Protocol Load Error:", err);
            }
        };

        fetchState();
    }, [user, isGuest]);

    const handleAnswer = (questionId, option) => {
        setAnswers({ ...answers, [questionId]: option });
        if (currentBatchIndex < dayData.questions.length - 1) {
            setCurrentBatchIndex(currentBatchIndex + 1);
        } else {
            setMode('observation'); // Go to micro-observation after questions
        }
    };

    if (!dayData) return <div className="p-20 text-center text-secondary font-mono text-sm tracking-widest uppercase">Inicialitzant Sistema...</div>;

    // --- MODE: INTRO ---
    if (mode === 'intro') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-void text-center animate-enter">
                <div className="max-w-md">
                    <p className="text-2xl font-medium text-primary mb-8 leading-snug whitespace-pre-line">
                        {dayData.intro}
                    </p>
                    <button
                        onClick={() => setMode('questions')}
                        className="btn btn-primary w-full uppercase tracking-widest text-xs font-bold"
                    >
                        Començar
                    </button>
                    <button onClick={() => navigate('/dashboard')} className="mt-8 text-tertiary text-[10px] uppercase tracking-widest">
                        Tornar
                    </button>
                </div>
            </div>
        );
    }

    // --- MODE: QUESTIONS ---
    if (mode === 'questions' && dayData.questions) {
        const question = dayData.questions[currentBatchIndex];
        const progress = ((currentBatchIndex + 1) / dayData.questions.length) * 100;

        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-void animate-enter">
                <div className="w-full max-w-xl">
                    <div className="mb-12">
                        <div className="flex justify-between items-baseline mb-4">
                            <span className="text-xs font-mono text-accent uppercase tracking-widest">
                                {dayData.title}
                            </span>
                            <span className="text-[10px] font-mono text-tertiary">
                                {currentBatchIndex + 1} / {dayData.questions.length}
                            </span>
                        </div>
                        <div className="h-0.5 w-full bg-border relative overflow-hidden">
                            <div className="absolute top-0 left-0 h-full bg-primary transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-medium leading-snug text-primary mb-10 tracking-tight">
                        {question.text}
                    </h2>

                    <div className="grid gap-3">
                        {question.options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(question.id, opt)}
                                className="p-5 rounded-lg border border-border bg-surface hover:border-primary hover:bg-elevated text-left transition-all duration-200"
                            >
                                <span className="font-medium text-[15px] text-secondary hover:text-primary">
                                    {opt}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // --- MODE: OBSERVATION ---
    if (mode === 'observation') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center bg-void animate-enter p-6">
                <p className="text-xl text-primary font-medium whitespace-pre-line mb-8 leading-relaxed">
                    {dayData.micro_observation.text}
                </p>
                <MicroTimer
                    duration={dayData.micro_observation.duration}
                    onComplete={() => setMode('closing')}
                />
            </div>
        );
    }

    // --- MODE: CLOSING ---
    if (mode === 'closing') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-void text-center animate-enter">
                <div className="max-w-md">
                    <h2 className="text-2xl font-medium text-primary mb-8 tracking-tight leading-snug">
                        {dayData.closing.text}
                    </h2>
                    <div className="h-px w-12 bg-accent mx-auto mb-8"></div>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="btn btn-primary w-full uppercase tracking-widest text-xs font-bold"
                    >
                        Demà, continuem
                    </button>
                </div>
            </div>
        );
    }

    // --- MODE: TASKS (Day 1 - Interactive) ---
    // State for local task completion
    const [completedTasks, setCompletedTasks] = useState([]);

    // Load completed tasks from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('arrel_day1_progress');
        if (saved) {
            setCompletedTasks(JSON.parse(saved));
        }
    }, []);

    const toggleTask = (index) => {
        const newCompleted = [...completedTasks];
        if (newCompleted.includes(index)) {
            // Remove if already completed
            const i = newCompleted.indexOf(index);
            newCompleted.splice(i, 1);
        } else {
            // Add if not completed
            newCompleted.push(index);
        }
        setCompletedTasks(newCompleted);
        localStorage.setItem('arrel_day1_progress', JSON.stringify(newCompleted));

        // Haptic feedback (if available) or small sound could go here
    };

    const handleCompleteDay = async () => {
        // 1. Celebration
        import('canvas-confetti').then((confetti) => {
            confetti.default({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#A855F7', '#3B82F6', '#EC4899']
            });
        });

        // 2. Save Progress (Advance Day)
        const nextDay = 2; // Hardcoded for Day 1 -> Day 2 transition logic

        if (user && !isGuest) {
            await supabase.from('user_state').update({ current_day: nextDay }).eq('user_id', user.id);
        }

        // Always update local for immediate feedback/guest
        localStorage.setItem('arrel_guest_day', nextDay.toString());

        // 3. UI Feedback & Transition
        setTimeout(() => {
            alert("Enhorabona! Has completat el primer dia del protocol."); // Replace with a nicer modal if time permits, but basic feedback essential
            // Force clear local state for testing or next day
            setCompletedTasks([]);
            localStorage.removeItem('arrel_day1_progress');

            // Reload or re-fetch to trigger "UseEffect" and switch to Day 2 content
            window.location.reload();
        }, 1500);
    };

    if (mode === 'tasks') {
        const allTasksCompleted = dayData.tasks && completedTasks.length === dayData.tasks.length;

        return (
            <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center pt-12 pb-20 px-6 animate-enter">

                {/* Header Section */}
                <div className="text-center max-w-lg mb-16 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-200/50 rounded-full blur-[50px] pointer-events-none"></div>

                    <div className="flex items-center justify-center gap-4 mb-6">
                        <span className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-purple-100 text-purple-900 text-[10px] font-bold tracking-widest uppercase shadow-sm backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                            Dia 001
                        </span>
                        {/* Streak Badge (Mock for now, easy to implement real logic later) */}
                        <span className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-[10px] font-bold tracking-widest uppercase shadow-sm">
                            🔥 Ratxa: 1
                        </span>
                    </div>

                    <h1 className="relative text-4xl md:text-5xl font-medium text-gray-900 mb-6 tracking-tight leading-tight">
                        {dayData.title}
                    </h1>

                    <p className="relative text-base text-gray-600 leading-relaxed text-balance">
                        {dayData.message}
                    </p>
                </div>

                {/* Tasks Cards */}
                <div className="w-full max-w-xl space-y-4 relative z-10 transition-all">
                    {dayData.tasks && dayData.tasks.map((task, index) => {
                        const isCompleted = completedTasks.includes(index);
                        return (
                            <div
                                key={index}
                                onClick={() => toggleTask(index)}
                                className={`
                                    relative border rounded-2xl p-6 shadow-sm transition-all duration-300 flex gap-6 items-start group cursor-pointer select-none
                                    ${isCompleted
                                        ? 'bg-purple-50/80 border-purple-200 shadow-inner opacity-75'
                                        : 'bg-white/60 backdrop-blur-xl border-white/60 hover:shadow-lg hover:bg-white/80 hover:-translate-y-0.5'
                                    }
                                `}
                            >
                                {/* Checkbox / Number */}
                                <div className={`
                                    flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-all duration-500
                                    ${isCompleted
                                        ? 'bg-green-500 text-white scale-110'
                                        : 'bg-gray-900 text-white'
                                    }
                                `}>
                                    {isCompleted ? <Check size={16} strokeWidth={4} /> : index + 1}
                                </div>

                                <div className="flex-1">
                                    <h3 className={`text-lg font-bold mb-2 leading-tight transition-all duration-300 ${isCompleted ? 'text-purple-900 line-through decoration-purple-300' : 'text-gray-900'}`}>
                                        {task.action}
                                    </h3>
                                    <p className={`text-sm leading-relaxed transition-all duration-300 ${isCompleted ? 'text-purple-700/60' : 'text-gray-600'}`}>
                                        {task.description}
                                    </p>
                                </div>

                                {/* Status Indicator (Desktop visual aid) */}
                                <div className={`absolute top-6 right-6 transition-all duration-300 ${isCompleted ? 'opacity-100' : 'opacity-0'}`}>
                                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full uppercase tracking-wider">Fet</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Navigation / Completion Action */}
                <div className="mt-16 text-center space-y-4">
                    {allTasksCompleted ? (
                        <button
                            onClick={handleCompleteDay}
                            className="px-10 py-4 rounded-full bg-gray-900 text-white hover:bg-black hover:scale-105 transition-all text-sm uppercase tracking-widest font-bold shadow-xl shadow-purple-500/20 animate-bounce-subtle"
                        >
                            Completar Dia 1
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="px-6 py-3 rounded-full bg-transparent border border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-all text-xs uppercase tracking-widest font-bold flex items-center gap-2 mx-auto"
                        >
                            <ArrowLeft size={14} /> Tornar al Centre de Control
                        </button>
                    )}

                    {!allTasksCompleted && (
                        <p className="text-xs text-gray-400 uppercase tracking-widest animate-pulse">
                            Completa totes les tasques per avançar
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return <div>Error: Mode desconegut</div>;
};

export default DailyProtocol;
