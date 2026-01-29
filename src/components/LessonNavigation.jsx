import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    BookOpen,
    X,
    Activity,
    Droplets,    // For Physical (closest match to hydration/exercise in context) - actually Physical uses Trophy/Activity in its cached data but let's see. 
    // Physical.jsx uses: Trophy, Droplets, Moon, Sun, Monitor, Activity. 
    // Let's use Dumbbell or similar if available, or just keeping it generic.
    // Looking at Layout.jsx, Activity is used for Protocol.
    Brain,       // Mental
    Heart,       // Emotional
    Users,       // Social
    Lightbulb,   // Intellectual
    List
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const LESSONS = [
    { path: '/protocol', label: 'Protocol', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50' },
    { path: '/physical', label: 'Físic', icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-50' }, // Using Droplets as generic "Health" or we can find a better one like Move/Activity
    { path: '/mental', label: 'Mental', icon: Brain, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { path: '/emotional', label: 'Emocional', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
    { path: '/social', label: 'Social', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { path: '/intellectual', label: 'Intel·lectual', icon: Lightbulb, color: 'text-amber-600', bg: 'bg-amber-50' },
];

export default function LessonNavigation() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex flex-col items-center gap-1 transition-all duration-300 min-w-[60px] text-gray-400 hover:text-gray-600"
            >
                <BookOpen size={22} strokeWidth={2.5} />
                <span className="text-[10px] font-bold tracking-wide">Mòduls</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
                        />

                        {/* Menu Sheet */}
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-xl border-t border-gray-100 max-h-[80vh] overflow-y-auto"
                        >
                            <div className="p-6 pb-8 max-w-lg mx-auto">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold text-gray-900">Mòduls del Curs</h3>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="grid gap-3">
                                    {LESSONS.map((lesson) => (
                                        <NavLink
                                            key={lesson.path}
                                            to={lesson.path}
                                            onClick={() => setIsOpen(false)}
                                            className={({ isActive }) => `
                        flex items-center gap-4 p-4 rounded-xl border transition-all duration-200
                        ${isActive
                                                    ? 'bg-gray-50 border-purple-200 shadow-sm'
                                                    : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'
                                                }
                      `}
                                        >
                                            <div className={`p-3 rounded-lg ${lesson.bg} ${lesson.color}`}>
                                                <lesson.icon size={24} />
                                            </div>
                                            <div className="flex-1">
                                                <span className={`block font-bold ${lesson.color === 'text-purple-600' ? 'text-gray-900' : 'text-gray-800'}`}>
                                                    {lesson.label}
                                                </span>
                                            </div>
                                            <div className="text-gray-300">
                                                <List size={20} className="transform rotate-180" />
                                                {/* Just a decorative arrow or similar if needed, List is just a placeholder, maybe ChevronRight? 
                            Let's use a ChevronRight if imported, or just simplify.
                            Let's not import new icon to keep it simple, or revert to simple styling.
                         */}
                                            </div>
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
