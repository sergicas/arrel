import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * AuthRedirect component handles automatic redirection after authentication.
 * - New users without diagnosis → /diagnosis
 * - Existing users → /dashboard
 * - Preserves intended destination if user was trying to access a protected route
 */
const AuthRedirect = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, session, isGuest, isNewUser, needsOnboarding, loading } = useAuth();

    useEffect(() => {
        // Wait for auth to be ready
        if (loading) return;

        // Only redirect authenticated users
        if (!session && !isGuest) return;

        // Don't redirect if already on a valid page
        const currentPath = location.pathname;
        const protectedPaths = ['/dashboard', '/profile', '/protocol', '/diagnosis', '/resultats'];
        const isOnProtectedRoute = protectedPaths.some(path => currentPath.startsWith(path));

        // If user just logged in from the landing page or login page
        if (currentPath === '/' || currentPath === '/login') {
            if (needsOnboarding && !isGuest) {
                console.log('[AuthRedirect] New user detected, redirecting to diagnosis');
                navigate('/diagnosis', { replace: true });
            } else {
                console.log('[AuthRedirect] Existing user, redirecting to dashboard');
                navigate('/dashboard', { replace: true });
            }
        }
    }, [session, isGuest, isNewUser, needsOnboarding, loading, navigate, location.pathname]);

    return null; // This component doesn't render anything
};

export default AuthRedirect;
