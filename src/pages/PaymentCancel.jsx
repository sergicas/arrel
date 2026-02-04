import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentCancel() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
            <div className="max-w-md p-8 text-center bg-white shadow-xl rounded-2xl">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-yellow-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>

                <h1 className="mb-2 text-3xl font-bold text-gray-900 font-display">Pagament cancel·lat</h1>
                <p className="mb-8 text-lg text-gray-600">
                    No s'ha realitzat cap càrrec. Pots tornar-ho a provar quan vulguis.
                </p>

                <div className="space-y-3">
                    <button
                        onClick={() => window.location.reload()} // Reload might trigger the paywall again which is what we want if they are locked
                        className="w-full px-6 py-3 text-lg font-semibold text-white transition-all shadow-md bg-primary rounded-xl hover:bg-primary-dark hover:shadow-lg"
                    >
                        Tornar-ho a provar
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="w-full px-6 py-3 text-lg font-medium text-gray-600 transition-colors hover:text-gray-900"
                    >
                        Tornar a l'inici
                    </button>
                </div>
            </div>
        </div>
    );
}
