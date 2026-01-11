import React, { useState, useEffect } from 'react';
import { Trophy, Droplets, Moon, Sun, Monitor, Activity, ArrowRight, Check } from 'lucide-react';

import { useArrelData } from '../hooks/useArrelData';

const TASK_CONFIG = [
    { id: 'hydration', label: 'Hidratació (2L)', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 'sleep', label: '8h de Son', icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-100' },
    { id: 'sunlight', label: '15 min Sol matinal', icon: Sun, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    { id: 'movement', label: 'Moviment (Caminar/Gym)', icon: Activity, color: 'text-red-500', bg: 'bg-red-100' },
    { id: 'nutrition', label: 'Menjar Real (NO processats)', icon: Monitor, color: 'text-green-500', bg: 'bg-green-100' },
];

const Physical = () => {
    const { loadData, saveData } = useArrelData();

    // Check-ins diaris amb persistència
    const [tasks, setTasks] = useState(() =>
        TASK_CONFIG.map(task => ({ ...task, completed: false }))
    );

    const [progress, setProgress] = useState(0);

    // Initial Load
    useEffect(() => {
        const parsed = loadData('physical');
        if (parsed) {
            setTasks(prev => prev.map(task => {
                const savedTask = parsed.find(p => p.id === task.id);
                return { ...task, completed: savedTask ? savedTask.completed : false };
            }));
        }
    }, [loadData]);

    // Guardar quan hi hagi canvis
    useEffect(() => {
        const stateToSave = tasks.map(({ id, completed }) => ({ id, completed }));
        saveData('physical', stateToSave);
    }, [tasks, saveData]);

    const toggleTask = (id) => {
        setTasks(prev => prev.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        ));
    };

    // Calcular progrés
    useEffect(() => {
        const completedCount = tasks.filter(t => t.completed).length;
        const total = tasks.length;
        setProgress(Math.round((completedCount / total) * 100));
    }, [tasks]);

    return (
        <div className="min-h-screen bg-gray-50 pb-20 p-6">
            <div className="max-w-md mx-auto space-y-8">

                {/* HEADLINE */}
                <div className="text-center pt-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Optimització Física</h1>
                    <p className="text-gray-500 italic">
                        "Your body is the hardware that runs the software of your mind."
                    </p>
                </div>

                {/* PROGRESS CARD (Glassmorphism) */}
                <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-800">Estat Diari</h2>
                        <span className="text-2xl font-bold text-violet-600">{progress}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-700 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                    {progress === 100 && (
                        <div className="mt-4 text-center animate-fade-in text-sm font-semibold text-violet-700 bg-violet-50 py-2 rounded-lg">
                            🎉 Objectiu Diari Completat!
                        </div>
                    )}
                </div>

                {/* CHECK-IN LIST */}
                <div className="space-y-4">
                    {tasks.map(task => (
                        <div
                            key={task.id}
                            onClick={() => toggleTask(task.id)}
                            className={`
                                group relative overflow-hidden
                                flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all duration-300
                                ${task.completed
                                    ? 'bg-white shadow-md border-transparent transform scale-[1.02]'
                                    : 'bg-white/40 border border-gray-200 hover:bg-white hover:shadow-sm'
                                }
                            `}
                        >
                            <div className="flex items-center gap-4 z-10">
                                <div className={`p-3 rounded-xl ${task.completed ? task.bg : 'bg-gray-100'} transition-colors duration-300`}>
                                    <task.icon size={20} className={task.completed ? task.color : 'text-gray-400'} />
                                </div>
                                <span className={`font-medium transition-colors ${task.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                                    {task.label}
                                </span>
                            </div>

                            <div className={`
                                w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                                ${task.completed
                                    ? 'bg-violet-500 border-violet-500 rotate-0'
                                    : 'border-gray-300 rotate-90'
                                }
                            `}>
                                {task.completed && <Check size={14} className="text-white" />}
                            </div>

                            {/* Background Fill Animation */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-r from-white to-gray-50 opacity-0 transition-opacity duration-300 ${task.completed ? 'opacity-100' : ''}`}
                                style={{ zIndex: 0 }}
                            />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Physical;
