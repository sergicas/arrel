import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import {
  Activity,
  Brain,
  Heart,
  Users,
  Zap,
  Play,
  ArrowRight,
  LogOut,
  TrendingUp,
  Award,
  Calendar,
  User,
} from 'lucide-react';
import SEO from '../components/SEO';
import { useToast } from '../context/ToastContext';
import SmartTip from '../components/SmartTip';
import RadarChart from '../components/RadarChart';
import EvolutionChart from '../components/EvolutionChart';
import { analytics } from '../lib/analytics';
import { secureStorage } from '../lib/secureStorage';
import { calculateGlobalScore } from '../utils/scoreUtils';

const Dashboard = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { user } = useAuth();
  const [currentDay, setCurrentDay] = useState(1);

  // Helper for difference in days
  const diffDays = (date1, date2) => Math.ceil(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

  const [daysSinceDiagnosis] = useState(() => {
    const historic = secureStorage.getItem('arrel_historic');
    if (historic && Array.isArray(historic) && historic.length > 0) {
      const latest = historic[historic.length - 1];
      return diffDays(new Date(latest.data), new Date());
    }
    return 0;
  });

  // --- NEW METRICS STATES ---
  const [radarData] = useState(() => {
    const historic = secureStorage.getItem('arrel_historic');
    let scores = {};

    if (historic && Array.isArray(historic) && historic.length > 0) {
      const latest = historic[historic.length - 1];
      scores = latest.scores || {};
    } else {
      // Fallback
      scores = secureStorage.getItem('arrel_diagnosis_raw');
    }

    if (!scores) {
      return { global: 0, energia: 0, son: 0, nutricio: 0, atencio: 0, temps: 0 };
    }

    const normalize = (val, max) =>
      Math.round(Math.max(0, Math.min(100, (((val || 0) + max) / (max * 2)) * 100)));

    const rData = {
      energia: normalize(scores.energy, 4),
      son: normalize(scores.sleep, 6),
      nutricio: normalize(scores.nutrition, 6),
      atencio: normalize(scores.attention, 4),
      temps: normalize(scores.lived_time, 4),
    };

    rData.global = Math.round(
      (rData.energia + rData.son + rData.nutricio + rData.atencio + rData.temps) / 5
    );
    return rData;
  });

  const [historyData] = useState(() => {
    const historic = secureStorage.getItem('arrel_historic');
    if (historic && Array.isArray(historic)) {
      return historic.map((h) => ({
        label: new Date(h.data).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }),
        value: calculateGlobalScore(h.scores),
      }));
    }
    // Fallback logic for single point from raw diagnosis if needed
    const scores = secureStorage.getItem('arrel_diagnosis_raw');
    if (scores) {
      // Reuse global score calc
      // Since we already calculated it in radarData, we could duplicate logic or just basic calc
      // For simplicity reusing calculateGlobalScore
      return [{ label: 'Avui', value: calculateGlobalScore(scores) }];
    }
    return [];
  });

  const [streak] = useState(() => {
    const currentStreak = parseInt(secureStorage.getItem('arrel_streak') || 0);
    // Streak calculation update logic was in use effect? 
    // Wait, the logic in useEffect was CHECKING consecutive days and updating... 
    // BUT secureStorage shouldn't be updated during render.
    // The previous code essentially READ streak. The logic to UPDATE it was incomplete/commented "Ideally logic should be...".
    // So we just read it.
    return currentStreak || 1;
  });


  // --- EXISTING STATS LOGIC FOR INDIVIDUAL CARDS (Keep or Sync?) ---
  // Actually, we should sync "physical" card with "energy/sleep/nutrition" avg?
  // For now, let's keep the existing logic for card *status* based on tasks interactively done,
  // BUT overwrite the % with the Radar data if available to avoid "0%".

  useEffect(() => {
    analytics.trackPage('/dashboard');
    const start = Date.now();

    // Load User Day
    const fetchState = async () => {
      try {
        if (user) {
          const { data, error } = await supabase
            .from('user_state')
            .select('current_day')
            .eq('user_id', user.id)
            .maybeSingle();
          if (error) console.error('Error fetching user state:', error);
          if (data) setCurrentDay(data.current_day);
        } else {
          const guestDay = secureStorage.getItem('arrel_guest_day');
          if (guestDay) setCurrentDay(guestDay); // secureStorage returns parsed number
        }
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        showToast("No s'ha pogut actualitzar el tauler.", 'error');
      }
    };
    fetchState();

    return () => {
      const seconds = Math.round((Date.now() - start) / 1000);
      analytics.trackTimeSpent('Dashboard', seconds);
    };
  }, [user, showToast]);

  // --- EXISTING STATS LOGIC FOR INDIVIDUAL CARDS (Keep or Sync?) ---
  // Actually, we should sync "physical" card with "energy/sleep/nutrition" avg?
  // For now, let's keep the existing logic for card *status* based on tasks interactively done,
  // BUT overwrite the % with the Radar data if available to avoid "0%".

  // ... skipping existing useEffect for loadData/getAreaScore ...
  // I will inline simplified area logic or rely on fallback

  const areas = [
    {
      id: 'energy',
      label: 'Energia',
      icon: Zap,
      metric: `${radarData.energia}%`,
      color: 'text-orange-500',
    },
    {
      id: 'sleep',
      label: 'Son',
      icon: Activity,
      metric: `${radarData.son}%`,
      color: 'text-indigo-500',
    },
    {
      id: 'nutrition',
      label: 'Nutrició',
      icon: Heart,
      metric: `${radarData.nutricio}%`,
      color: 'text-green-500',
    },
    {
      id: 'attention',
      label: 'Atenció',
      icon: Brain,
      metric: `${radarData.atencio}%`,
      color: 'text-blue-500',
    },
    {
      id: 'lived_time',
      label: 'Temps',
      icon: Calendar,
      metric: `${radarData.temps}%`,
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="w-full pb-32">
      <SEO title="El Meu Espai" description="Panell de control personal." />

      {/* Header */}
      <header className="mb-6 pt-4 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
              <Award size={10} /> Nivell Iniciat
            </span>
            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
              <TrendingUp size={10} /> Ràtxa: {streak} Dies
            </span>
          </div>
          <button
            onClick={() => navigate('/profile')}
            className="text-3xl font-medium text-primary tracking-tight hover:text-purple-600 transition-colors flex items-center gap-2 group"
          >
            Hola, {user ? user.email.split('@')[0] : 'Viatger'} 👋
            <User size={20} className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-500" />
          </button>
        </div>
        <button
          onClick={() => navigate('/profile')}
          className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
          title="El meu perfil"
        >
          <User size={20} />
        </button>
      </header>

      {/* Smart Tip */}
      <SmartTip />

      {/* Primary Action: NEXT TASK */}
      <div
        onClick={() => navigate('/protocol')}
        className="mb-10 relative overflow-hidden group cursor-pointer bg-gray-900 text-white rounded-2xl p-6 shadow-xl shadow-purple-900/10 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300"
      >
        <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
          <Play className="fill-white" size={60} />
        </div>
        <div className="relative z-10">
          <div className="text-xs font-mono text-purple-300 mb-2 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
            Protocol Actiu
          </div>
          <div className="text-4xl font-bold tracking-tighter mb-1">
            Dia {String(currentDay).padStart(3, '0')}
          </div>
          <div className="text-gray-400 text-sm mb-6">
            {currentDay === 1 ? 'Calibració Inicial & Entorn' : 'Optimització de Rutines'}
          </div>
          <div className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-purple-50 transition-colors">
            Iniciar Tasques <ArrowRight size={14} />
          </div>
        </div>
      </div>

      {/* GRID LAYOUT: RADAR & EVOLUTION */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {radarData.global > 0 ? (
          <>
            {/* Radar Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center">
              <h3 className="w-full text-left text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Activity size={14} /> Mapa Biològic Actual
              </h3>
              <div className="w-full max-w-[280px]">
                <RadarChart data={radarData} size={280} />
              </div>
              <div className="mt-4 text-center">
                <div className="text-xs text-gray-600 mb-1">Puntuació Global</div>
                <div className="text-2xl font-bold text-gray-900">{radarData.global}/100</div>
              </div>
            </div>

            {/* Evolution Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="w-full text-left text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <TrendingUp size={14} /> Històric d'Evolució
              </h3>
              <EvolutionChart data={historyData} />
              <div className="mt-4 text-xs text-gray-600 text-center">
                Actualitzat fa {daysSinceDiagnosis} dies.
                {daysSinceDiagnosis > 7 && (
                  <span
                    className="text-purple-600 font-bold cursor-pointer ml-1"
                    onClick={() => navigate('/diagnosis')}
                  >
                    Refesa el test
                  </span>
                )}
              </div>
            </div>
          </>
        ) : (
          /* EMPTY STATE CARD */
          <div className="md:col-span-2 bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 border border-purple-100 text-center shadow-sm">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-purple-600">
              <Activity size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Benvingut al teu Espai</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Encara no tenim dades suficients per mostrar-te gràfiques.
              Completa el teu primer dia de protocol o el test de diagnòstic per començar a veure la teva evolució.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/diagnosis')}
                className="px-6 py-2 bg-white border border-gray-200 text-gray-900 rounded-lg font-bold hover:bg-gray-50 transition-colors"
              >
                Fer Diagnòstic
              </button>
            </div>
          </div>
        )}
      </div>

      {/* METRICS ROW (Small Cards) */}
      <div className="mb-4 pl-1">
        <h3 className="text-xs font-mono text-tertiary uppercase tracking-widest mb-2">
          Desglossament per Àrees
        </h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {areas.map((area) => (
          <div
            key={area.id}
            className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-28 relative overflow-hidden group hover:border-purple-200 transition-colors"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent to-gray-50 rounded-bl-full -mr-8 -mt-8"></div>
            <area.icon size={20} className={`${area.color} mb-2 relative z-10`} />
            <div>
              <div className="text-2xl font-bold text-gray-900">{area.metric}</div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                {area.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
