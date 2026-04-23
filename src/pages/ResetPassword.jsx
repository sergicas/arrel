import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import Toast from '../components/Toast';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState(null);
  const { updatePassword, session } = useAuth();
  const navigate = useNavigate();

  // If no session after a short wait, redirect to login
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!session) navigate('/login', { replace: true });
    }, 3000);
    return () => clearTimeout(timeout);
  }, [session, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (password.length < 6) {
      setMessage({ type: 'error', text: 'La contrasenya ha de tenir mínim 6 caràcters.' });
      return;
    }
    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Les contrasenyes no coincideixen.' });
      return;
    }

    setLoading(true);
    const { error } = await updatePassword(password);
    if (error) {
      setMessage({ type: 'error', text: 'Error en canviar la contrasenya. Torna-ho a intentar.' });
    } else {
      setDone(true);
      setTimeout(() => navigate('/dashboard', { replace: true }), 2000);
    }
    setLoading(false);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/50 text-center">
          <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Contrasenya actualitzada!</h2>
          <p className="text-gray-500 text-sm">Redirigint al teu compte...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900 flex flex-col items-center justify-center p-6">
      <SEO title="Nova Contrasenya" description="Crea una nova contrasenya per al teu compte." />
      <div className="w-full max-w-sm bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/50">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Lock size={32} className="text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">Nova contrasenya</h1>
          <p className="text-gray-500 text-sm">Introdueix la teva nova contrasenya.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1 ml-1">
              Nova Contrasenya
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Mínim 6 caràcters"
                className="w-full h-12 px-4 pr-12 rounded-lg bg-gray-50 border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-900 placeholder-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1 ml-1">
              Confirma la Contrasenya
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Repeteix la contrasenya"
              className="w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-900 placeholder-gray-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gray-900 text-white font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-50 shadow-lg hover:shadow-xl transform active:scale-[0.98]"
          >
            {loading ? 'Guardant...' : 'Canviar contrasenya'}
          </button>
        </form>
      </div>

      <Toast message={message?.text} type={message?.type} onClose={() => setMessage(null)} />
    </div>
  );
};

export default ResetPassword;
