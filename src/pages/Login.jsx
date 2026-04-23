import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import SEO from '../components/SEO';
import Toast from '../components/Toast';

const Login = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { signIn, signUp, enterAsGuest } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Validations
    if (password.length < 6) {
      setMessage({ type: 'error', text: 'La contrasenya ha de tenir mínim 6 caràcters.' });
      setLoading(false);
      return;
    }

    if (mode === 'register' && password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Les contrasenyes no coincideixen.' });
      setLoading(false);
      return;
    }

    if (mode === 'login') {
      const { error } = await signIn({ email, password });
      if (error) {
        let errorText = 'Error de connexió. Torna-ho a intentar.';
        if (
          error.message?.toLowerCase().includes('invalid login credentials') ||
          error.message?.toLowerCase().includes('invalid credentials') ||
          error.message?.toLowerCase().includes('email not confirmed')
        ) {
          errorText = 'Correu o contrasenya incorrectes.';
        } else if (error.message) {
          errorText = error.message;
        }
        setMessage({ type: 'error', text: errorText });
      } else {
        navigate('/dashboard');
      }
    } else {
      // Register
      const { data, error } = await signUp({ email, password });
      if (error) {
        let errorText = 'Error al crear el compte.';
        if (
          error.message?.toLowerCase().includes('user already registered') ||
          error.message?.toLowerCase().includes('already been registered') ||
          error.message?.toLowerCase().includes('already registered')
        ) {
          errorText = 'Aquest correu ja té un compte. Utilitza "Ja tinc compte" per entrar.';
        } else if (error.message) {
          errorText = error.message;
        }
        setMessage({ type: 'error', text: errorText });
      } else if (data?.session) {
        // Auto-confirmed (email confirmation disabled in Supabase)
        navigate('/dashboard');
      } else {
        // Email confirmation required
        setMessage({
          type: 'success',
          text: 'Compte creat! Revisa el teu correu per confirmar el compte i després entra.',
        });
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900 flex flex-col items-center justify-center p-6 animate-enter">
      <SEO
        title={mode === 'login' ? 'Accés Usuaris' : 'Crear Compte'}
        description="Entra al teu espai personal per seguir el teu progrés i accedir al teu pla."
      />
      <div className="w-full max-w-sm bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/50">

        {/* Toggle Header */}
        <div className="flex gap-4 mb-8 border-b border-gray-100 pb-2">
          <button
            onClick={() => { setMode('login'); setMessage(null); setPassword(''); setConfirmPassword(''); }}
            className={`pb-2 text-sm font-bold transition-all ${mode === 'login' ? 'text-gray-900 border-b-2 border-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Ja tinc compte
          </button>
          <button
            onClick={() => { setMode('register'); setMessage(null); setPassword(''); setConfirmPassword(''); }}
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
            {mode === 'login'
              ? 'Introdueix el teu correu i contrasenya.'
              : 'Crea el teu perfil gratuït avui mateix.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1 ml-1">
              Correu Electrònic
            </label>
            <input
              type="email"
              placeholder="el-teu@correu.com"
              className="w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-900 placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1 ml-1">
              Contrasenya
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={mode === 'register' ? 'Mínim 6 caràcters' : '••••••••'}
                className="w-full h-12 px-4 pr-12 rounded-lg bg-gray-50 border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-900 placeholder-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPassword ? 'Amaga contrasenya' : 'Mostra contrasenya'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password (register only) */}
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1 ml-1">
                Confirma la Contrasenya
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Repeteix la contrasenya"
                  className="w-full h-12 px-4 pr-12 rounded-lg bg-gray-50 border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-900 placeholder-gray-400"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gray-900 text-white font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-50 shadow-lg hover:shadow-xl transform active:scale-[0.98]"
          >
            {loading
              ? 'Processant...'
              : mode === 'login'
              ? 'Entrar al meu compte'
              : 'Crear Compte Gratuït'}
            {!loading && <ArrowRight size={16} />}
          </button>

          <div className="flex items-center justify-center gap-2 text-[10px] text-gray-300 uppercase tracking-widest pt-1">
            <ShieldCheck size={12} /> Dades 100% Privades
          </div>

          <div className="relative flex py-2 items-center">
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
