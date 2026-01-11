import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 4000 }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-xl border"
                    style={{
                        backgroundColor: type === 'error' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(25, 25, 25, 0.95)',
                        borderColor: type === 'error' ? '#FECACA' : '#333333',
                        color: type === 'error' ? '#DC2626' : '#FFFFFF'
                    }}
                >
                    <div className={`p-1 rounded-full ${type === 'error' ? 'bg-red-100 text-red-600' : 'bg-green-500/20 text-green-400'}`}>
                        {type === 'error' ? <AlertCircle size={16} /> : <Check size={16} />}
                    </div>

                    <span className="text-sm font-medium tracking-wide">
                        {message}
                    </span>

                    <button
                        onClick={onClose}
                        className={`ml-2 p-1 rounded-full hover:bg-black/5 transition-colors ${type === 'error' ? 'text-red-400' : 'text-gray-500'}`}
                    >
                        <X size={14} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
