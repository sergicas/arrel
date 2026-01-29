import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { startCheckout } from '../lib/stripe';
import { useAuth } from '../context/AuthContext';

const PaywallModal = ({ onGoBack }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async () => {
        setLoading(true);
        try {
            await startCheckout(user?.email);
        } catch (error) {
            console.error("Checkout Error:", error);
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl relative"
            >
                {/* Header Image / Gradient */}
                <div className="h-32 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-lg border border-white/30">
                        <Lock size={32} />
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Desbloqueja els Mesos 2 i 3</h2>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                        Has completat la base. Ara toca l'optimització real. Accedeix a 60 dies més de contingut avançat.
                    </p>

                    <div className="space-y-3 text-left mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                            <CheckCircle size={16} className="text-green-500 shrink-0" />
                            <span>Pla d'Optimització Metabòlica</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                            <CheckCircle size={16} className="text-green-500 shrink-0" />
                            <span>Protocol de Minimalisme Digital</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                            <CheckCircle size={16} className="text-green-500 shrink-0" />
                            <span>Accés a la Comunitat "Club Arrel"</span>
                        </div>
                    </div>

                    <button
                        onClick={handleUpgrade}
                        disabled={loading}
                        className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold uppercase tracking-wider text-sm shadow-xl shadow-purple-900/10 hover:bg-gray-800 transition-all flex items-center justify-center gap-2 mb-3 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>Processant...</>
                        ) : (
                            <>
                                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                Fer-me Premium (9€)
                            </>
                        )}
                    </button>

                    <button
                        onClick={onGoBack}
                        className="text-xs text-gray-400 hover:text-gray-600 font-medium uppercase tracking-wider"
                    >
                        Tornar al Dashboard
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default PaywallModal;
