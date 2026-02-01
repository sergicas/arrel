import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './layout/Layout';
import PublicLayout from './layout/PublicLayout';
import { AuthProvider, useAuth } from './context/AuthContext';
import BrandLoader from './components/BrandLoader';
import SkeletonDashboard from './components/SkeletonDashboard';
import SkeletonPage from './components/SkeletonPage';
import PageTransition from './components/PageTransition';
import { AnimatePresence } from 'framer-motion';
import ProtocolErrorBoundary from './components/ProtocolErrorBoundary';

// Lazy Load Pages
const Landing = lazy(() => import('./pages/Landing'));
const Diagnosis = lazy(() => import('./pages/Diagnosis'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Resultats = lazy(() => import('./pages/Resultats'));
const Historic = lazy(() => import('./pages/Historic'));
const ComFunciona = lazy(() => import('./pages/ComFunciona'));
const Ciencia = lazy(() => import('./pages/Ciencia'));
const Manifest = lazy(() => import('./pages/Manifest'));
const Recursos = lazy(() => import('./pages/Recursos'));
const DiaCheckIn = lazy(() => import('./pages/DiaCheckIn'));
const DailyProtocol = lazy(() => import('./pages/protocol/DailyProtocol'));
const Physical = lazy(() => import('./pages/Physical'));
const Mental = lazy(() => import('./pages/Mental'));
const Emotional = lazy(() => import('./pages/Emotional'));
const Social = lazy(() => import('./pages/Social'));
const Intellectual = lazy(() => import('./pages/Intellectual'));
const Login = lazy(() => import('./pages/Login'));
const Legal = lazy(() => import('./pages/Legal'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Profile = lazy(() => import('./pages/Profile'));

// Protected Route Wrapper
const PrivateRoute = ({ children }) => {
  const { session, isGuest, loading } = useAuth();
  if (loading) return <BrandLoader text="Verificant sessió..." />;
  if (!session && !isGuest) return <Navigate to="/login" replace />;
  return children;
};

// Placeholder components for immediate rendering of sub-areas
const AreaPlaceholder = ({ title }) => (
  <div className="glass-card h-[60vh] flex items-center justify-center animate-fade-in">
    <div className="text-center">
      <h2 className="text-4xl font-bold text-[var(--color-text-muted)] mb-4">{title} Module</h2>
      <div className="inline-block px-4 py-2 border border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] rounded-full text-sm">
        CALIBRATING...
      </div>
    </div>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes with Layout */}
        <Route
          element={
            <PageTransition>
              <PublicLayout />
            </PageTransition>
          }
        >
          <Route
            path="/"
            element={
              <Suspense fallback={<BrandLoader text="Carregant Inici..." />}>
                <Landing />
              </Suspense>
            }
          />
          <Route
            path="/com-funciona"
            element={
              <Suspense fallback={<BrandLoader />}>
                <ComFunciona />
              </Suspense>
            }
          />
          <Route
            path="/ciencia"
            element={
              <Suspense fallback={<BrandLoader />}>
                <Ciencia />
              </Suspense>
            }
          />
          <Route
            path="/manifest"
            element={
              <Suspense fallback={<BrandLoader />}>
                <Manifest />
              </Suspense>
            }
          />
          <Route
            path="/recursos"
            element={
              <Suspense fallback={<BrandLoader />}>
                <Recursos />
              </Suspense>
            }
          />

          {/* Legal Routes */}
          <Route
            path="/privacitat"
            element={
              <Suspense fallback={<BrandLoader />}>
                <Legal section="privacitat" />
              </Suspense>
            }
          />
          <Route
            path="/termes"
            element={
              <Suspense fallback={<BrandLoader />}>
                <Legal section="termes" />
              </Suspense>
            }
          />
          <Route
            path="/cookies"
            element={
              <Suspense fallback={<BrandLoader />}>
                <Legal section="cookies" />
              </Suspense>
            }
          />
          <Route
            path="/contacte"
            element={
              <Suspense fallback={<BrandLoader />}>
                <Legal section="contacte" />
              </Suspense>
            }
          />
        </Route>

        {/* Standalone Public Routes */}
        <Route
          path="/diagnosis"
          element={
            <PageTransition>
              <Suspense fallback={<BrandLoader text="Preparant diagnòstic..." />}>
                <Diagnosis />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/resultats"
          element={
            <PageTransition>
              <Suspense fallback={<BrandLoader text="Calculant resultats..." />}>
                <Resultats />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <Suspense fallback={<BrandLoader />}>
                <Login />
              </Suspense>
            </PageTransition>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/historic"
          element={
            <PrivateRoute>
              <PageTransition>
                <Suspense fallback={<BrandLoader />}>
                  <Historic />
                </Suspense>
              </PageTransition>
            </PrivateRoute>
          }
        />
        {/* Dynamic Day Route - Replaces static ProtocolDia2 */}
        <Route
          path="/dia/:day"
          element={
            <PrivateRoute>
              <PageTransition>
                <Suspense fallback={<BrandLoader />}>
                  <DiaCheckIn />
                </Suspense>
              </PageTransition>
            </PrivateRoute>
          }
        />

        {/* Protected Layout Routes */}
        <Route
          element={
            <PrivateRoute>
              <PageTransition>
                <Layout />
              </PageTransition>
            </PrivateRoute>
          }
        >
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<SkeletonDashboard />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<BrandLoader text="Carregant perfil..." />}>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="/protocol"
            element={
              <ProtocolErrorBoundary>
                <Suspense fallback={<SkeletonPage />}>
                  <DailyProtocol />
                </Suspense>
              </ProtocolErrorBoundary>
            }
          />

          <Route
            path="/physical"
            element={
              <Suspense fallback={<SkeletonPage />}>
                <Physical />
              </Suspense>
            }
          />
          <Route
            path="/mental"
            element={
              <Suspense fallback={<SkeletonPage />}>
                <Mental />
              </Suspense>
            }
          />
          <Route
            path="/emotional"
            element={
              <Suspense fallback={<SkeletonPage />}>
                <Emotional />
              </Suspense>
            }
          />
          <Route
            path="/social"
            element={
              <Suspense fallback={<SkeletonPage />}>
                <Social />
              </Suspense>
            }
          />
          <Route
            path="/intellectual"
            element={
              <Suspense fallback={<SkeletonPage />}>
                <Intellectual />
              </Suspense>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

import { ArrelProvider } from './context/ArrelContext';
import InstallPrompt from './components/InstallPrompt';
import ErrorBoundary from './components/ErrorBoundary';

import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ArrelProvider>
          <Router>
            <ErrorBoundary>
              <AnimatedRoutes />
            </ErrorBoundary>
            <InstallPrompt />
          </Router>
        </ArrelProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
