import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';

export default function PaymentSuccess() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const { refreshUserState } = useAuth(); // Assume we will add this to context

    useEffect(() => {
        // Fire confetti on mount
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);

        // Refresh user state to ensure 'has_paid' is up to date locally
        if (refreshUserState) {
            refreshUserState();
        }

        return () => clearInterval(interval);
    }, [refreshUserState]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
            <div className="max-w-md p-8 text-center bg-white shadow-xl rounded-2xl">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="mb-2 text-3xl font-bold text-gray-900 font-display">Gràcies!</h1>
                <p className="mb-8 text-lg text-gray-600">
                    El pagament s'ha completat correctament. Ja tens accés complet a Arrel per sempre.
                </p>

                <button
                    onClick={() => navigate('/')}
                    className="w-full px-6 py-3 text-lg font-semibold text-white transition-all shadow-md bg-primary rounded-xl hover:bg-primary-dark hover:shadow-lg"
                >
                    Anar a l'inici
                </button>
            </div>
        </div>
    );
}
