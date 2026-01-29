import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Sun, Moon, Coffee, ArrowRight, Home, BarChart2 } from 'lucide-react';
import { secureStorage } from '../lib/secureStorage';

export default function DiaCheckIn() {
  const navigate = useNavigate();
  const { day } = useParams();
  const dayNumber = parseInt(day) || 2;

  // Data actual formatada
  const today = new Date().toLocaleDateString('ca-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  // Validació de seguretat: Comprovar si es pot accedir a aquest dia
  useEffect(() => {
    // PERMITIR SEMPRE EL DIA 2 SI NO TÉ PROGRÉS ENCARA (per facilitar proves)
    if (dayNumber === 2) return;

    const progresData = secureStorage.getItem('arrel_progres') || [];

    // Trobar l'últim dia completat
    const maxDayCompleted = progresData.reduce((max, entry) => Math.max(max, entry.dia || 0), 1);

    // Si intentem anar més de 1 dia endavant (ex: estem a dia 1 i volem anar a dia 3)
    // Permetem anar al dia següent del completat (maxDayCompleted + 1)
    // També permetem revisar dies anteriors (dayNumber <= maxDayCompleted)
    if (dayNumber > maxDayCompleted + 1) {
      alert(`Encara no has arribat al Dia ${dayNumber}! Et redirigim al teu proper dia.`);
      navigate(`/dia/${maxDayCompleted + 1}`);
    }
  }, [dayNumber, navigate]);

  // Contingut dinàmic per a cada dia (evitar repetició)
  const dailyContent = {
    2: {
      theme: 'Consistència',
      tip: 'Avui és el primer dia real. No busquis perfecció, busca completar.',
    },
    3: {
      theme: 'Ajustament',
      tip: "Si ahir va costar, ajusta la intensitat. L'important és no parar.",
    },
    4: {
      theme: 'Resistència',
      tip: 'És normal sentir resistència. El teu cervell prefereix la comoditat anterior.',
    },
    5: {
      theme: 'Observació',
      tip: "Fixa't en com et sents després de complir. Aquesta és la teva gasolina.",
    },
    6: { theme: 'Optimització', tip: "Pots fer els protocols més fàcils? Prepara't la nit abans." },
    7: {
      theme: 'Celebració',
      tip: 'Has completat una setmana. Això és més que la majoria. Continua.',
    },
  };

  const currentContent = dailyContent[dayNumber] || {
    theme: 'Avui',
    tip: 'Cada dia és una nova oportunitat per millorar la teva biologia.',
  };

  // Estat dels protocols (Càrrega dinàmica)
  // Estat dels protocols (Càrrega dinàmica)
  const [protocols, setProtocols] = useState(() => {
    // 1. Load default
    const defaults = [
      { id: 'son', title: 'Finestra de son fixa 8h', icon: Moon, status: 'pending', color: 'indigo' },
      { id: 'cafe', title: 'Eliminar cafè després de 14h', icon: Coffee, status: 'pending', color: 'orange' },
      { id: 'sol', title: 'Caminar 20min al sol', icon: Sun, status: 'pending', color: 'yellow' },
    ];
    let initial = defaults;

    // 2. Load personalized if exists
    const resultatsDia1 = secureStorage.getItem('arrel_resultats_dia1');
    if (resultatsDia1?.protocol) {
      try {
        initial = resultatsDia1.protocol.map((acc, idx) => ({
          id: `p_${idx}`,
          title: acc.titol,
          icon: idx === 0 ? Moon : idx === 1 ? Coffee : Sun,
          status: 'pending',
          color: idx === 0 ? 'indigo' : idx === 1 ? 'orange' : 'teal',
        }));
      } catch {
        // ignore
      }
    }

    // 3. Load progress/status override
    const data = secureStorage.getItem('arrel_progres');
    if (data) {
      const entry = data.find((d) => d.dia === dayNumber);
      if (entry?.protocols) {
        initial = initial.map((p) => {
          const savedP = entry.protocols.find((sp) => sp.name === p.id);
          return savedP ? { ...p, status: savedP.status } : p;
        });
      }
    }
    return initial;
  });

  // Removed basic loader effect
  // Removed progress loader effect

  // Effect to load protocols removed (handled by lazy init)

  // loadDefaultProtocols moved up

  // Sliders
  const [energia, setEnergia] = useState(() => {
    const data = secureStorage.getItem('arrel_progres');
    const entry = data?.find((d) => d.dia === dayNumber);
    return entry?.energia || 5;
  });
  const [anim, setAnim] = useState(() => {
    const data = secureStorage.getItem('arrel_progres');
    const entry = data?.find((d) => d.dia === dayNumber);
    return entry?.anim || 5;
  });

  // Càlcul de compliment derived
  const score = protocols.reduce((acc, p) => {
    if (p.status === 'completed') return acc + 1;
    if (p.status === 'partial') return acc + 0.5;
    return acc;
  }, 0);
  const compliance = Math.round((score / protocols.length) * 100) || 0;

  // Removed compliance effect

  const handleStatusChange = (id, newStatus) => {
    setProtocols((prev) => prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p)));
  };

  const getMessage = () => {
    if (compliance === 100) return 'Increïble! 🎉';
    if (compliance >= 67) return 'Molt bé! 💪';
    if (compliance >= 34) return 'Bon començ! ⭐';
    return 'Demà serà millor! 🌱';
  };

  const saveDay = (redirectNext = false) => {
    const dataToSave = {
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      data: new Date().toISOString(), // Compatible with Historic.jsx
      dia: dayNumber, // Compatible with Historic.jsx
      day: dayNumber, // Redundant but consistent
      protocols: protocols.map((p) => ({
        name: p.id,
        status: p.status === 'pending' ? 'not_done' : p.status,
      })),
      energia,
      anim,
      compliment: compliance, // Compatible with Historic.jsx
      compliance, // Redundant
    };

    // Guardar a l'històric (arrel_progres)
    const historic = secureStorage.getItem('arrel_progres') || [];

    // Eliminar si ja existeix entrada d'aquest dia
    const filteredHistoric = historic.filter((entry) => entry.dia !== dayNumber);

    filteredHistoric.push(dataToSave);
    secureStorage.setItem('arrel_progres', filteredHistoric);

    // També actualitzar arrel_diari per consistència
    const diari = secureStorage.getItem('arrel_diari') || [];
    const newDiari = diari.filter((d) => d.day !== dayNumber);
    newDiari.push(dataToSave);
    secureStorage.setItem('arrel_diari', newDiari);

    if (redirectNext) {
      navigate(`/dia/${dayNumber + 1}`);
      window.scrollTo(0, 0);
      // Reset state for visual feedback if component doesn't unmount (though URL change should trigger remount/update)
      // But usually React Router will keep same component instance if only param changes depending on setup.
      // We can force reload protocols is handled by useEffect deps or explicit reset.
      window.location.reload(); // Quick fix ensuring clean state for next day
    } else {
      alert('Dia guardat ✅');
      navigate('/historic');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-8 rounded-b-3xl shadow-sm mb-6">
        <div className="max-w-md mx-auto">
          <div className="text-sm text-gray-500 font-medium mb-1 uppercase tracking-wide">
            {today}
          </div>
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">El teu Dia {dayNumber} ☀️</h1>
              <p className="text-purple-600 font-medium">
                {currentContent.theme}:{' '}
                <span className="text-gray-600 font-normal">{currentContent.tip}</span>
              </p>
            </div>
            {/* Circle Progress */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="#f3f4f6" strokeWidth="6" fill="none" />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="#8b5cf6"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray="175"
                  strokeDashoffset={175 - (175 * compliance) / 100}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <span className="absolute text-sm font-bold text-violet-600">{compliance}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 space-y-8">
        {/* Message */}
        <div className="text-center animate-fade-in">
          <span className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 rounded-full text-sm font-bold shadow-sm">
            {getMessage()}
          </span>
        </div>

        {/* Protocols Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800">Protocols Clau</h2>
          {protocols.map((p) => (
            <div
              key={p.id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 transition hover:shadow-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-${p.color}-100 text-${p.color}-600`}>
                  <p.icon size={20} />
                </div>
                <h3 className="font-semibold text-gray-900">{p.title}</h3>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleStatusChange(p.id, 'completed')}
                  className={`py-2 px-1 rounded-lg text-sm font-medium transition ${p.status === 'completed'
                    ? 'bg-green-500 text-white shadow-md transform scale-105'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  ✅ Fet
                </button>
                <button
                  onClick={() => handleStatusChange(p.id, 'partial')}
                  className={`py-2 px-1 rounded-lg text-sm font-medium transition ${p.status === 'partial'
                    ? 'bg-orange-400 text-white shadow-md transform scale-105'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  🟧 Parcial
                </button>
                <button
                  onClick={() => handleStatusChange(p.id, 'not_done')}
                  className={`py-2 px-1 rounded-lg text-sm font-medium transition ${p.status === 'not_done'
                    ? 'bg-gray-400 text-white shadow-md transform scale-105'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  ⬜ No fet
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Indicators Section */}
        <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Indicadors Diaris</h2>

          {/* Energia */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-gray-600">⚡ Nivell d'energia</label>
              <span className="font-bold text-violet-600">{energia}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={energia}
              onChange={(e) => setEnergia(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-500"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Baixa</span>
              <span>Molt Alta</span>
            </div>
          </div>

          {/* Ànim */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-gray-600">😌 Ànim general</label>
              <span className="font-bold text-pink-500">{anim}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={anim}
              onChange={(e) => setAnim(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Trist</span>
              <span>Feliç</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-4 pt-4">
          <button
            onClick={() => saveDay(false)}
            className="w-full py-4 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-violet-200 hover:scale-[1.02] transition transform active:scale-95"
          >
            GUARDAR DIA {dayNumber}
          </button>

          <button
            onClick={() => saveDay(true)}
            className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-purple-200 text-purple-700 rounded-xl font-semibold hover:bg-purple-50 transition"
          >
            Guardar i Continuar al Dia {dayNumber + 1} <ArrowRight size={18} />
          </button>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/historic')}
              className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              <BarChart2 size={18} /> Evolució
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              <Home size={18} /> Inici
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
