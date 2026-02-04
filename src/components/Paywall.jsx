import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import BrandLoader from './BrandLoader';

export default function Paywall() {
    const { initiateCheckout, loading } = useAuth();
    const [checkoutLoading, setCheckoutLoading] = useState(false);

    const handleCheckout = async () => {
        setCheckoutLoading(true);
        try {
            await initiateCheckout();
        } catch (error) {
            console.error('Checkout failed', error);
            alert('Hi ha hagut un error iniciant el pagament. Si us plau, torna-ho a provar.');
            setCheckoutLoading(false);
        }
    };

    if (loading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <div className="w-full max-w-md p-8 text-center bg-white shadow-2xl rounded-2xl ring-1 ring-gray-200">
                <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 font-display">
                        El període de prova ha finalitzat
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Esperem que Arrel t'hagi estat d'ajuda aquests dies. Per continuar accedint al teu seguiment i continguts, cal realitzar un pagament únic.
                    </p>
                </div>

                <div className="p-6 mb-8 bg-gray-50 rounded-xl">
                    <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-extrabold tracking-tight text-gray-900">9,00€</span>
                        <span className="ml-1 text-xl font-semibold text-gray-500">/ per sempre</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Sense subscripcions mensuals. Un únic pagament.</p>
                </div>

                <button
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                    className="w-full px-8 py-4 text-lg font-semibold text-white transition-all shadow-lg rounded-xl bg-primary hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {checkoutLoading ? (
                        <>
                            <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processant...
                        </>
                    ) : (
                        'Desbloquejar Arrel'
                    )}
                </button>

                <p className="mt-6 text-xs text-gray-400">
                    Pagament segur processat per Stripe. Accés immediat.
                </p>
            </div>
        </div>
    );
}
