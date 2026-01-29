import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center animate-fade-in">
            <SEO title="Pàgina no trobada (404)" description="Sembla que t'has perdut en el camí." />

            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 shadow-sm animate-pulse-slow">
                    <Compass size={40} />
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
                <h2 className="text-xl font-bold text-gray-700 mb-4">Sembla que t'has perdut</h2>

                <p className="text-gray-500 mb-8 leading-relaxed">
                    La pàgina que estàs buscant no existeix o ha estat moguda.
                    No et preocupis, el teu camí cap a la longevitat continua.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                    >
                        <ArrowLeft size={18} />
                        Enrere
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors shadow-lg shadow-purple-900/10"
                    >
                        <Home size={18} />
                        Torna a l'Inici
                    </button>
                </div>
            </div>

            <div className="mt-8 text-xs text-gray-400 font-mono">
                Arrel &copy; {new Date().getFullYear()}
            </div>
        </div>
    );
};

export default NotFound;
