import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';
import SEO from '../components/SEO';
import Toast from '../components/Toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const { signInWithOtp, enterAsGuest } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const { error } = await signInWithOtp(email);

        if (error) {
            setMessage({ type: 'error', text: 'Error de connexió.' });
        } else {
            setMessage({ type: 'success', text: 'Enllaç enviat. Revisa el teu correu.' });
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center p-6 animate-enter">
            <SEO
                title="Accés Usuaris"
                description="Entra al teu espai personal per seguir el teu progrés i accedir al teu pla."
            />
            <div className="w-full max-w-sm bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/50">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
                        Benvingut a Arrel
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Introdueix el teu correu per accedir al teu espai.
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="correu@exemple.com"
                            className="w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-center text-gray-900 placeholder-gray-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-gray-900 text-white font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-50 shadow-lg hover:shadow-xl transform active:scale-[0.98]"
                    >
                        {loading ? 'Processant...' : 'Entrar'}
                        {!loading && <ArrowRight size={16} />}
                    </button>

                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase tracking-widest">o</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            enterAsGuest();
                            navigate('/dashboard');
                        }}
                        className="w-full h-10 bg-transparent text-gray-500 font-medium uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 hover:text-gray-900 transition-all text-[10px]"
                    >
                        Continuar com a convidat
                    </button>
                </form>

                <div className="mt-8 flex justify-center text-gray-300">
                    <Lock size={16} />
                </div>
            </div>

            <Toast
                message={message?.text}
                type={message?.type}
                onClose={() => setMessage(null)}
            />
        </div>
    );
};

export default Login;
