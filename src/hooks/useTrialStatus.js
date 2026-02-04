import { useAuth } from '../context/AuthContext';

/**
 * Hook to check if user's trial is active or if they have paid.
 * Refactored to use centralized AuthContext logic.
 */
export const useTrialStatus = () => {
    const { hasPaid, isLocked, loading, user } = useAuth();

    // User can access if not locked
    // isLocked is true if (trial expired AND not paid)
    // So canAccess is !isLocked
    const canAccess = !isLocked;

    // Calculate generic days remaining for UI display purposes if needed
    // This is an approximation based on created_at
    const calculateDaysRemaining = () => {
        if (!user || hasPaid) return 30; // Return max if paid or not loaded

        const createdDate = new Date(user.created_at);
        const now = new Date();
        const diffTime = Math.abs(now - createdDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const remaining = 30 - diffDays;

        return Math.max(0, remaining);
    };

    return {
        isLoading: loading,
        hasPaid,
        // Helper for UI to show "X days left"
        daysRemaining: calculateDaysRemaining(),
        isTrialActive: !isLocked && !hasPaid,
        canAccess: canAccess,
    };
};

export default useTrialStatus;
