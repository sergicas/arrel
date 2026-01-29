
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Diagnosis from '../pages/Diagnosis';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';

// Mock dependencies
vi.mock('../lib/supabaseClient', () => ({
    supabase: {
        auth: {
            getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
            onAuthStateChange: vi.fn().mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } }),
        },
    },
}));

// Mock Analytics
vi.mock('../lib/analytics', () => ({
    analytics: {
        trackPage: vi.fn(),
        trackEvent: vi.fn(),
        trackTimeSpent: vi.fn(),
        trackDiagnosisStep: vi.fn(),
    },
}));

// Mock secureStorage to avoid persistent state interference
vi.mock('../lib/secureStorage', () => ({
    secureStorage: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
    },
}));

// Mock Confetti
vi.mock('canvas-confetti', () => ({
    default: vi.fn(),
}));

describe('Diagnosis Component', () => {
    it('renders without crashing', async () => {
        render(
            <AuthProvider>
                <ToastProvider>
                    <MemoryRouter>
                        <Diagnosis />
                    </MemoryRouter>
                </ToastProvider>
            </AuthProvider>
        );

        // Wait for the loading state to resolve and intro content to appear
        await waitFor(() => {
            expect(screen.getByText(/Abans de començar/i)).toBeInTheDocument();
        });
        expect(screen.getByText(/El diagnòstic està dissenyat/i)).toBeInTheDocument();
    });

    it('has a start button', async () => {
        render(
            <AuthProvider>
                <ToastProvider>
                    <MemoryRouter>
                        <Diagnosis />
                    </MemoryRouter>
                </ToastProvider>
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /Començar/i })).toBeInTheDocument();
        });
    });
});
