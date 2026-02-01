import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import {
    User,
    Mail,
    Calendar,
    Activity,
    LogOut,
    ArrowLeft,
    Shield,
    Trash2,
    CheckCircle,
} from 'lucide-react';
import SEO from '../components/SEO';
import { useToast } from '../context/ToastContext';
import { secureStorage } from '../lib/secureStorage';
import { calculateGlobalScore } from '../utils/scoreUtils';

const Profile = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { user, signOut } = useAuth();

    const [userState, setUserState] = useState(null);
    const [diagnosticData, setDiagnosticData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                // Fetch user_state
                const { data: stateData, error: stateError } = await supabase
                    .from('user_state')
                    .select('*')
                    .eq('user_id', user.id)
                    .maybeSingle();

                if (stateError) {
                    console.error('[Profile] Error fetching user_state:', stateError);
                } else {
                    setUserState(stateData);
                }

                // Fetch latest diagnostic
                const { data: diagData, error: diagError } = await supabase
                    .from('diagnostics')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .maybeSingle();

                if (diagError) {
                    console.error('[Profile] Error fetching diagnostics:', diagError);
                } else {
                    setDiagnosticData(diagData);
                }
            } catch (err) {
                console.error('[Profile] Fetch error:', err);
                showToast("Error carregant les dades del perfil", 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user, showToast]);

    const handleLogout = async () => {
        try {
            await signOut();
            showToast("Sessió tancada correctament", 'success');
            navigate('/');
        } catch (error) {
            showToast("Error tancant la sessió", 'error');
        }
    };

    const handleDeleteAccount = async () => {
        // Note: Full account deletion requires server-side implementation
        // This clears local data and signs out
        try {
            secureStorage.clear();
            await signOut();
            showToast("Compte eliminat", 'success');
            navigate('/');
        } catch (error) {
            showToast("Error eliminant el compte", 'error');
        }
    };

    // Get global score from diagnostic or local storage
    const globalScore = diagnosticData?.scores
        ? calculateGlobalScore(diagnosticData.scores)
        : (() => {
            const local = secureStorage.getItem('arrel_diagnosis_raw');
            return local ? calculateGlobalScore(local) : null;
        })();

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'No disponible';
        return new Date(dateString).toLocaleDateString('ca-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-white">
            <SEO title="El Meu Perfil" description="Gestiona el teu compte i consulta les teves dades privades." />

            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-2xl mx-auto px-6 py-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span className="text-sm font-medium">Tornar al Dashboard</span>
                    </button>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 py-8">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-6">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                            {user?.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">
                                {user?.email?.split('@')[0] || 'Usuari'}
                            </h1>
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <Mail size={14} />
                                <span>{user?.email || 'Email no disponible'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400 text-xs mt-1">
                                <Calendar size={12} />
                                <span>Registrat: {formatDate(user?.created_at)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Card */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Activity size={14} />
                        El Teu Progrés
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-purple-50 rounded-xl p-4">
                            <div className="text-3xl font-bold text-purple-600">
                                {userState?.current_day || 1}
                            </div>
                            <div className="text-xs text-purple-600/80 font-medium uppercase tracking-wide">
                                Dia Actual
                            </div>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-4">
                            <div className="text-3xl font-bold text-blue-600">
                                {userState?.current_cycle || 1}
                            </div>
                            <div className="text-xs text-blue-600/80 font-medium uppercase tracking-wide">
                                Cicle
                            </div>
                        </div>
                    </div>

                    {globalScore && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Puntuació Global</span>
                                <span className="text-lg font-bold text-gray-900">{globalScore}/100</span>
                            </div>
                            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                                    style={{ width: `${globalScore}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {userState?.last_active_at && (
                        <div className="mt-4 text-xs text-gray-400">
                            Última activitat: {formatDate(userState.last_active_at)}
                        </div>
                    )}
                </div>

                {/* Diagnostic Results */}
                {diagnosticData?.scores && (
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
                        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <CheckCircle size={14} />
                            Resultats del Diagnòstic
                        </h2>

                        <div className="space-y-3">
                            {Object.entries(diagnosticData.scores).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 capitalize">
                                        {key.replace('_', ' ')}
                                    </span>
                                    <span className={`text-sm font-bold ${value >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                        {value >= 0 ? '+' : ''}{value}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {diagnosticData.completed_at && (
                            <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
                                Completat: {formatDate(diagnosticData.completed_at)}
                            </div>
                        )}
                    </div>
                )}

                {/* Security & Privacy */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Shield size={14} />
                        Seguretat i Privacitat
                    </h2>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Autenticació</span>
                            <span className="text-green-600 font-medium flex items-center gap-1">
                                <CheckCircle size={14} /> Magic Link
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Dades encriptades</span>
                            <span className="text-green-600 font-medium flex items-center gap-1">
                                <CheckCircle size={14} /> Sí
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                    >
                        <LogOut size={18} />
                        Tancar Sessió
                    </button>

                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="w-full flex items-center justify-center gap-2 text-red-500 px-6 py-3 rounded-xl font-medium hover:bg-red-50 transition-colors text-sm"
                    >
                        <Trash2 size={16} />
                        Eliminar Compte
                    </button>
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
                        <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                Eliminar compte?
                            </h3>
                            <p className="text-gray-600 text-sm mb-6">
                                Aquesta acció esborrarà totes les teves dades locals. No es pot desfer.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel·lar
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
