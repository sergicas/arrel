import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';
import Toast from '../components/Toast';

const Login = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { signInWithOtpLogin, signInWithOtpRegister, enterAsGuest } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Use different function based on mode
    const authFunction = mode === 'login' ? signInWithOtpLogin : signInWithOtpRegister;
    const { error } = await authFunction(email);

    if (error) {
      console.error('Error d\'autenticació:', error);
      let errorText = 'Error de connexió.';

      // Check for custom error flags
      if (error.isUserExists) {
        errorText = error.message; // "Aquest compte ja existeix..."
      } else if (error.isUserNotFound) {
        errorText = error.message; // "Aquest compte no existeix..."
      } else if (error.status === 500) {
        errorText = 'Error intern del servidor. Si us plau, intenta-ho més tard.';
      } else if (error.message) {
        errorText = error.message;
      }

      setMessage({ type: 'error', text: errorText });
    } else {
      const text = mode === 'login'
        ? 'Enllaç d\'accés enviat. Revisa el teu correu.'
        : 'Compte creat! Revisa el teu correu per confirmar.';
      setMessage({ type: 'success', text });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900 flex flex-col items-center justify-center p-6 animate-enter">
      <SEO
        title={mode === 'login' ? "Accés Usuaris" : "Crear Compte"}
        description="Entra al teu espai personal per seguir el teu progrés i accedir al teu pla."
      />
      <div className="w-full max-w-sm bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/50">

        {/* Toggle Header */}
        <div className="flex gap-4 mb-8 border-b border-gray-100 pb-2">
          <button
            onClick={() => setMode('login')}
            className={`pb-2 text-sm font-bold transition-all ${mode === 'login' ? 'text-gray-900 border-b-2 border-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Ja tinc compte
          </button>
          <button
            onClick={() => setMode('register')}
            className={`pb-2 text-sm font-bold transition-all ${mode === 'register' ? 'text-gray-900 border-b-2 border-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Crear nou compte
          </button>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
            {mode === 'login' ? 'Benvingut de nou' : 'Comença el teu viatge'}
          </h1>
          <p className="text-gray-500 text-sm">
            {mode === 'login' ? 'Introdueix el teu correu per accedir.' : 'Crea el teu perfil gratuït avui mateix.'}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1 ml-1">Correu Electrònic</label>
            <input
              type="email"
              placeholder="el-teu@correu.com"
              className="w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-900 placeholder-gray-400"
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
            {loading ? 'Processant...' : (mode === 'login' ? 'Entrar al meu compte' : 'Crear Compte Gratuït')}
            {!loading && <ArrowRight size={16} />}
          </button>

          <div className="text-center space-y-2 pt-2">
            <p className="text-xs text-gray-400">
              *T'enviarem un enllaç màgic. Sense contrasenyes.
            </p>
            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-300 uppercase tracking-widest pt-2">
              <ShieldCheck size={12} /> Dades 100% Privades
            </div>
          </div>

          <div className="relative flex py-4 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-300 text-xs font-medium uppercase tracking-widest">
              O BÉ
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <button
            type="button"
            onClick={() => {
              enterAsGuest();
              navigate('/dashboard');
            }}
            className="w-full h-12 bg-white text-gray-900 border-2 border-gray-100 font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:border-gray-900 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
          >
            Explorar sense registre
          </button>
        </form>

        <div className="mt-8 flex justify-center text-gray-300">
          <Lock size={16} />
        </div>
      </div>

      <Toast message={message?.text} type={message?.type} onClose={() => setMessage(null)} />
    </div>
  );
};

export default Login;
