import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BrandLoader from '../components/BrandLoader';

/**
 * AuthCallback - Handles the redirect after magic link authentication.
 * Routes new users to /diagnosis and existing users to /dashboard.
 */
const AuthCallback = () => {
    const navigate = useNavigate();
    const { user, session, isNewUser, needsOnboarding, loading } = useAuth();
    const [status, setStatus] = useState('Verificant sessió...');

    useEffect(() => {
        // Wait for auth to finish loading
        if (loading) {
            setStatus('Carregant dades...');
            return;
        }

        // If no session, something went wrong
        if (!session) {
            setStatus('Error d\'autenticació. Redirigint...');
            setTimeout(() => navigate('/login', { replace: true }), 2000);
            return;
        }

        // Give a moment for the needsOnboarding check to complete
        const timer = setTimeout(() => {
            if (needsOnboarding) {
                setStatus('Benvingut! Preparant el teu diagnòstic inicial...');
                setTimeout(() => navigate('/diagnosis', { replace: true }), 1000);
            } else {
                setStatus('Benvingut de nou! Carregant dashboard...');
                setTimeout(() => navigate('/dashboard', { replace: true }), 1000);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [loading, session, needsOnboarding, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
            <div className="text-center">
                <BrandLoader text={status} />
                {user && (
                    <p className="mt-4 text-gray-500 text-sm">
                        Hola, {user.email?.split('@')[0]} 👋
                    </p>
                )}
            </div>
        </div>
    );
};

export default AuthCallback;
