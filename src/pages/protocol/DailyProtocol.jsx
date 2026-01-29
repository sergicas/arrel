import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { week1Protocol } from '../../data/protocolData'; // Needed for Day 1 fallback
import { protocolData } from '../../data/protocolData';
import { ArrowLeft, ArrowRight, Check, Clock, Zap } from 'lucide-react';
import MicroTimer from '../../components/MicroTimer';
import { secureStorage } from '../../lib/secureStorage';
import { useToast } from '../../context/ToastContext';

import PaywallModal from '../../components/PaywallModal';

const DailyProtocol = () => {
  const navigate = useNavigate();
  const { user, isGuest } = useAuth();
  const [dayData, setDayData] = useState(null);
  const [mode, setMode] = useState('loading'); // loading, intro, questions, observation, closing
  const [currentDay, setCurrentDay] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false); // New State
  const [error] = useState(null);
  const { showToast } = useToast();

  // Mock Premium Status (For now, assume false for testing)
  const isPremium = false;

  // Question Mode State
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  // Load Protocol Data
  useEffect(() => {
    let mounted = true;

    // Timeout Safety
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const fetchState = async () => {
      try {
        let day = 1;

        if (user) {
          const { data, error } = await supabase
            .from('user_state')
            .select('current_day')
            .eq('user_id', user.id)
            .maybeSingle()
            .abortSignal(controller.signal);

          if (error) throw error;
          if (data) day = data.current_day || 1;
        } else {
          const guestDay = secureStorage.getItem('arrel_guest_day');
          day = guestDay || 1;
        }

        if (!mounted) return;
        setCurrentDay(day);

        // PAYWALL LOGIC: Check if user needs to upgrade
        if (day > 28 && !isPremium) {
          setShowPaywall(true);
          // Specific logic to show "preview" or just lock entirely?
          // For now, we load data but overlay Paywall
        }

        // Load Content
        if (day === 1) {
          const storedPlan = secureStorage.getItem('arrel_day1_plan');
          setDayData(storedPlan || week1Protocol[0]);
          setMode('tasks');
        } else {
          const protoDay = protocolData.find((d) => d.day === day);
          if (protoDay) {
            setDayData(protoDay);
            if (protoDay.tasks && protoDay.tasks.length > 0) {
              setMode('tasks');
            } else {
              setMode(protoDay.intro ? 'intro' : 'questions');
            }
          } else {
            setDayData({
              title: 'FI DEL CICLE',
              message: 'Propera versió disponible aviat.',
              tasks: [],
              closing: {
                text: 'Has completat la primera setmana! Aviat hi haurà més contingut disponible.',
              },
            });
            setMode('closing');
          }
        }
        clearTimeout(timeoutId);
      } catch (err) {
        console.error('Protocol Load Error (handled):', err);

        // FAIL-OPEN STRATEGY: Fallback to local data or default
        // This ensures the app remains usable even if Supabase/Network fails
        if (mounted) {
          const fallbackDay = Number(secureStorage.getItem('arrel_guest_day')) || 1;
          setCurrentDay(fallbackDay);
          showToast('Mode Offline: Dades locals carregades.', 'success'); // Using success/neutral to avoid alarm

          // Load Content for Fallback Day
          if (fallbackDay === 1) {
            const storedPlan = secureStorage.getItem('arrel_day1_plan');
            setDayData(storedPlan || week1Protocol[0]);
            setMode('tasks');
          } else {
            const protoDay = protocolData.find((d) => d.day === fallbackDay);
            if (protoDay) {
              setDayData(protoDay);
              if (protoDay.tasks && protoDay.tasks.length > 0) {
                setMode('tasks');
              } else {
                setMode(protoDay.intro ? 'intro' : 'questions');
              }
            } else {
              setDayData({
                title: 'FI DEL CICLE',
                message: 'Protocol completat.',
                tasks: [],
                closing: {
                  text: 'Has completat tot el protocol disponible en mode offline.',
                },
              });
              setMode('closing');
            }
          }
        }
      } finally {
        clearTimeout(timeoutId);
      }
    };
    fetchState();

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, [user, isGuest, isPremium, showToast]);

  // --- TIMELINE COMPONENT ---
  const Timeline = () => (
    <div className="w-full overflow-x-auto pb-4 mb-6 no-scrollbar">
      <div className="flex items-center gap-4 px-2 min-w-max">
        {Array.from({ length: 7 }, (_, i) => {
          const startDay = Math.floor((currentDay - 1) / 7) * 7 + 1;
          return startDay + i;
        }).map((d) => {
          const status = d < currentDay ? 'done' : d === currentDay ? 'active' : 'locked';
          return (
            <div
              key={d}
              className={`flex flex-col items-center gap-2 transition-all ${status === 'active' ? 'scale-110' : 'opacity-60'}`}
            >
              <div
                className={`
                                w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all
                                ${status === 'done' ? 'bg-green-500 border-green-500 text-white' : ''}
                                ${status === 'active' ? 'bg-white border-purple-600 text-purple-600 shadow-lg shadow-purple-200' : ''}
                                ${status === 'locked' ? 'bg-gray-100 border-gray-200 text-gray-400' : ''}
                            `}
              >
                {status === 'done' ? (
                  <Check size={16} />
                ) : status === 'locked' ? (
                  <span className="font-sans font-bold text-gray-400">
                    {d}
                  </span>
                ) : (
                  d
                )}
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                DIA {d}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  // --- NOTIFICATIONS LOGIC ---
  const [notifsEnabled, setNotifsEnabled] = useState(Notification.permission === 'granted');
  const enableNotifications = () => {
    Notification.requestPermission().then((perm) => {
      if (perm === 'granted') {
        setNotifsEnabled(true);
        new Notification('Arrel', {
          body: 'Notificacions activades! Et recordarem les teves tasques.',
        });
      }
    });
  };

  // --- LOGIC FOR QUESTIONS/OBSERVATION/CLOSING ---
  const handleAnswer = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
    if (currentBatchIndex < (dayData.questions?.length || 0) - 1) {
      setCurrentBatchIndex(currentBatchIndex + 1);
    } else {
      setMode('observation');
    }
  };

  // --- LOGIC FOR TASKS (DAY 1) ---
  const [completedTasks, setCompletedTasks] = useState([]);
  const [earnedPoints, setEarnedPoints] = useState(0);

  useEffect(() => {
    if (!dayData?.day) return;
    const storageKey = `arrel_day${dayData.day}_progress`;
    const saved = secureStorage.getItem(storageKey) || [];
    setCompletedTasks(saved);
    // Calculate initial points
    if (dayData?.tasks) {
      const pts = saved.reduce((acc, idx) => acc + (dayData.tasks[idx]?.points || 0), 0);
      setEarnedPoints(pts);
    }
  }, [dayData]);

  const toggleTask = (index) => {
    const newCompleted = [...completedTasks];
    let newPoints = earnedPoints;
    const taskPoints = dayData.tasks[index].points || 0;

    if (newCompleted.includes(index)) {
      newCompleted.splice(newCompleted.indexOf(index), 1);
      newPoints -= taskPoints;
    } else {
      newCompleted.push(index);
      newPoints += taskPoints;
    }
    setCompletedTasks(newCompleted);
    setEarnedPoints(newPoints);
    const storageKey = `arrel_day${dayData.day}_progress`;
    secureStorage.setItem(storageKey, newCompleted);
    if (newCompleted.length > completedTasks.length) {
      showToast(
        'Tasca completada! +' + (dayData.tasks[index].points || 0) + ' PTS',
        'success',
        2000
      );
    }
  };

  const handleCompleteDay = async () => {
    setShowConfetti(true);
    import('canvas-confetti').then((confetti) => {
      confetti.default({
        particleCount: 200,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#A855F7', '#FFD700', '#3B82F6'],
      });
    });

    const nextDay = currentDay + 1;
    if (user && !isGuest) {
      await supabase.from('user_state').update({ current_day: nextDay }).eq('user_id', user.id);
    }
    secureStorage.setItem('arrel_guest_day', nextDay);
    // Add Points to Global User Score could go here

    // Delay for UI feedback
    setTimeout(() => {
      setCompletedTasks([]);
      const storageKey = `arrel_day${currentDay}_progress`;
      secureStorage.removeItem(storageKey);
      window.location.reload();
    }, 2500);
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="text-red-500 mb-4 font-bold">⚠️ {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-bold uppercase tracking-wider"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!dayData)
    return (
      <div className="p-20 text-center uppercase tracking-widest text-xs animate-pulse">
        Carregant Protocol...
      </div>
    );

  // --- RENDER MODES ---

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: 'easeOut' },
  };

  const buttonHover = { scale: 1.02 };
  const buttonTap = { scale: 0.98 };

  // TASKS MODE (Day 1) - Light Theme
  if (mode === 'tasks') {
    const allTasksCompleted = dayData.tasks && completedTasks.length === dayData.tasks.length;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col pt-6 pb-24 px-6 relative"
      >
        {/* Notification Toast/Button */}
        {!notifsEnabled && (
          <motion.button
            whileHover={buttonHover}
            whileTap={buttonTap}
            onClick={enableNotifications}
            className="absolute top-6 right-6 p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-purple-600 transition"
            title="Activar Notificacions"
          >
            <Zap size={16} fill="currentColor" />
          </motion.button>
        )}

        {/* Timeline */}
        <Timeline />

        {/* Header */}
        <div className="text-center max-w-lg mx-auto mb-10 mt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-purple-100 shadow-sm mb-4">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold text-purple-900 uppercase tracking-widest">
              Protocol Actiu · {earnedPoints} Punts
            </span>
          </div>
          <h1 className="text-3xl font-medium text-gray-900 mb-4">{dayData.title}</h1>
          <p className="text-sm text-gray-600 leading-relaxed">{dayData.message}</p>
        </div>

        {/* Tasks List */}
        <div className="w-full max-w-xl mx-auto space-y-4 mb-20">
          {dayData.tasks?.map((task, index) => {
            const isCompleted = completedTasks.includes(index);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => toggleTask(index)}
                className={`
                                relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-5 items-start select-none
                                ${isCompleted ? 'bg-purple-50 border-purple-200 opacity-80' : 'bg-white border-white shadow-sm hover:shadow-md'}
                            `}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
              >
                <div
                  className={`mt-1 w-6 h-6 rounded flex items-center justify-center border transition-colors ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 bg-gray-50'}`}
                >
                  {isCompleted && <Check size={14} strokeWidth={3} />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3
                      className={`font-bold transition-colors ${isCompleted ? 'text-purple-900 line-through' : 'text-gray-900'}`}
                    >
                      {task.action}
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${isCompleted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                    >
                      +{task.points} PTS
                    </span>
                  </div>
                  <p
                    className={`text-sm mb-2 ${isCompleted ? 'text-purple-700/60' : 'text-gray-600'}`}
                  >
                    {task.description}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <Clock size={12} /> {task.time || '2 min'}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Floating Bottom Bar (Completion) */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200 p-4 pb-8 z-50">
          <div className="max-w-xl mx-auto flex items-center justify-between gap-4">
            <div className="text-xs font-medium text-gray-500">
              {completedTasks.length}/{dayData.tasks?.length} Tasques
            </div>
            {allTasksCompleted ? (
              <motion.button
                whileHover={buttonHover}
                whileTap={buttonTap}
                onClick={handleCompleteDay}
                className="flex-1 py-3 px-6 bg-gray-900 text-white rounded-xl font-bold uppercase tracking-wider shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2"
              >
                Completar Dia <ArrowRight size={16} />
              </motion.button>
            ) : (
              <motion.button
                whileHover={buttonHover}
                whileTap={buttonTap}
                onClick={() => navigate('/dashboard')}
                className="flex-1 py-3 px-6 bg-gray-100 text-gray-400 rounded-xl font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors"
              >
                Tornar
              </motion.button>
            )}
          </div>
        </div>

        {/* Completion Modal / Overlay */}
        {showConfetti && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-enter">
            <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm mx-4 transform scale-110 transition-transform">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl animate-bounce">
                🏆
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Dia {currentDay} Completat!</h2>
              <p className="text-gray-600 mb-6">
                Has guanyat <span className="font-bold text-purple-600">{earnedPoints} Punts</span>{' '}
                de longevitat.
              </p>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-[15%]"></div>
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                Nivell {Math.ceil(currentDay / 7)}: {currentDay <= 7 ? 'Novell' : currentDay <= 14 ? 'Aprenent' : currentDay <= 21 ? 'Expert' : 'Mestre'} ({Math.round((currentDay / 28) * 100)}%)
              </div>
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  // PROTOCOL MODE (Days 2-7) - Dark Theme
  // Shared Layout with AnimatePresence
  return (
    <div className="min-h-screen flex flex-col pt-6 bg-gray-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black text-white relative overflow-hidden">
      {/* Dynamic Background Effect */}
      <div className="absolute top-0 left-0 w-full h-96 bg-purple-500/10 blur-[100px] pointer-events-none rounded-full -translate-y-1/2"></div>

      {/* PAYWALL OVERLAY */}
      {showPaywall && <PaywallModal onGoBack={() => navigate('/dashboard')} />}

      {['intro', 'questions'].includes(mode) && (
        <div className="px-6 mb-8 z-10 relative">
          <Timeline />
        </div>
      )}

      <div className="flex-1 flex flex-col relative z-0">
        <AnimatePresence mode="wait">
          {mode === 'intro' && (
            <motion.div
              key="intro"
              {...pageVariants}
              className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto"
            >
              <h2 className="text-xs font-mono text-purple-400 uppercase tracking-[0.2em] mb-6 border border-purple-500/30 px-3 py-1 rounded-full bg-purple-500/10">
                Dia {currentDay}: {dayData.title}
              </h2>
              <p className="text-3xl font-light text-white/90 mb-12 leading-normal whitespace-pre-line text-balance">
                {dayData.intro}
              </p>
              <motion.button
                whileHover={buttonHover}
                whileTap={buttonTap}
                onClick={() => setMode('questions')}
                className="btn bg-white text-black w-full uppercase tracking-widest text-xs font-bold shadow-xl shadow-white/5 hover:bg-gray-100"
              >
                Començar Exploració
              </motion.button>
              <motion.button
                whileHover={buttonHover}
                whileTap={buttonTap}
                onClick={() => navigate('/dashboard')}
                className="mt-8 text-gray-500 text-[10px] uppercase tracking-widest hover:text-white transition-colors"
              >
                Tornar
              </motion.button>
            </motion.div>
          )}

          {mode === 'questions' && dayData.questions && (
            <motion.div
              key="questions"
              {...pageVariants}
              className="flex-1 flex flex-col items-center justify-center p-6 w-full max-w-xl mx-auto"
            >
              <div className="w-full mb-12">
                <div className="flex justify-between items-baseline mb-2">
                  <div className="text-xs font-bold text-purple-400">
                    PREGUNTA {currentBatchIndex + 1}
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono">
                    {dayData.questions.length} TOTAL
                  </div>
                </div>
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-purple-500"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((currentBatchIndex + 1) / dayData.questions.length) * 100}%`,
                    }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                </div>
              </div>
              <h2 className="text-2xl text-white font-medium mb-10 w-full leading-snug">
                {dayData.questions[currentBatchIndex].text}
              </h2>
              <div className="grid gap-3 w-full">
                {dayData.questions[currentBatchIndex].options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.01, backgroundColor: 'rgba(50,50,50,1)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(dayData.questions[currentBatchIndex].id, opt)}
                    className="p-5 w-full text-left rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-purple-500/50 hover:bg-gray-800 transition-all text-gray-200 font-medium text-sm backdrop-blur-sm"
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {mode === 'observation' && (
            <motion.div
              key="observation"
              {...pageVariants}
              className="flex-1 flex flex-col items-center justify-center p-6 text-center"
            >
              <p className="text-xl text-white font-medium whitespace-pre-line mb-12 leading-relaxed opacity-90">
                {dayData.micro_observation.text}
              </p>
              <MicroTimer
                duration={dayData.micro_observation.duration}
                onComplete={() => setMode('closing')}
              />
            </motion.div>
          )}

          {mode === 'closing' && (
            <motion.div
              key="closing"
              {...pageVariants}
              className="flex-1 flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="max-w-md">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-8 text-green-400">
                  <Check size={32} />
                </div>
                <h2 className="text-2xl font-medium text-white mb-12 leading-relaxed">
                  {dayData.closing.text}
                </h2>
                {dayData.title === 'FI DEL CICLE' ? (
                  <motion.button
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                    onClick={() => navigate('/dashboard')}
                    className="btn bg-white text-black w-full uppercase tracking-widest text-xs font-bold shadow-xl shadow-white/10 hover:bg-gray-100 py-4 rounded-xl flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={16} /> Tornar al Dashboard
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                    onClick={handleCompleteDay}
                    className="btn bg-white text-black w-full uppercase tracking-widest text-xs font-bold shadow-xl shadow-white/10 hover:bg-gray-100 py-4 rounded-xl"
                  >
                    Completar Protocol
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DailyProtocol;
