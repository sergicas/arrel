import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './layout/Layout';
import PublicLayout from './layout/PublicLayout';
import { AuthProvider, useAuth } from './context/AuthContext';
import BrandLoader from './components/BrandLoader';
import SkeletonDashboard from './components/SkeletonDashboard';
import PageTransition from './components/PageTransition';
import { AnimatePresence } from 'framer-motion';

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
        <Route element={<PageTransition><PublicLayout /></PageTransition>}>
          <Route path="/" element={
            <Suspense fallback={<BrandLoader text="Carregant Inici..." />}>
              <Landing />
            </Suspense>
          } />
          <Route path="/com-funciona" element={
            <Suspense fallback={<BrandLoader />}>
              <ComFunciona />
            </Suspense>
          } />
          <Route path="/ciencia" element={
            <Suspense fallback={<BrandLoader />}>
              <Ciencia />
            </Suspense>
          } />
          <Route path="/manifest" element={
            <Suspense fallback={<BrandLoader />}>
              <Manifest />
            </Suspense>
          } />
          <Route path="/recursos" element={
            <Suspense fallback={<BrandLoader />}>
              <Recursos />
            </Suspense>
          } />

          {/* Legal Routes */}
          <Route path="/privacitat" element={
            <Suspense fallback={<BrandLoader />}>
              <Legal section="privacitat" />
            </Suspense>
          } />
          <Route path="/termes" element={
            <Suspense fallback={<BrandLoader />}>
              <Legal section="termes" />
            </Suspense>
          } />
          <Route path="/cookies" element={
            <Suspense fallback={<BrandLoader />}>
              <Legal section="cookies" />
            </Suspense>
          } />
          <Route path="/contacte" element={
            <Suspense fallback={<BrandLoader />}>
              <Legal section="contacte" />
            </Suspense>
          } />
        </Route>

        {/* Standalone Public Routes */}
        <Route path="/diagnosis" element={
          <PageTransition>
            <Suspense fallback={<BrandLoader text="Preparant diagnòstic..." />}>
              <Diagnosis />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/resultats" element={
          <PageTransition>
            <Suspense fallback={<BrandLoader text="Calculant resultats..." />}>
              <Resultats />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/login" element={
          <PageTransition>
            <Suspense fallback={<BrandLoader />}>
              <Login />
            </Suspense>
          </PageTransition>
        } />

        {/* Protected Routes */}
        <Route path="/historic" element={
          <PrivateRoute>
            <Suspense fallback={<BrandLoader />}>
              <Historic />
            </Suspense>
          </PrivateRoute>
        } />
        {/* Dynamic Day Route - Replaces static ProtocolDia2 */}
        <Route path="/dia/:day" element={
          <PrivateRoute>
            <Suspense fallback={<BrandLoader />}>
              <DiaCheckIn />
            </Suspense>
          </PrivateRoute>
        } />

        {/* Protected Layout Routes */}
        <Route element={<PrivateRoute><PageTransition><Layout /></PageTransition></PrivateRoute>}>
          <Route path="/dashboard" element={
            <Suspense fallback={<SkeletonDashboard />}>
              <Dashboard />
            </Suspense>
          } />
          <Route path="/protocol" element={
            <Suspense fallback={<BrandLoader />}>
              <DailyProtocol />
            </Suspense>
          } />
          <Route path="/physical" element={
            <Suspense fallback={<BrandLoader />}>
              <Physical />
            </Suspense>
          } />
          <Route path="/mental" element={
            <Suspense fallback={<BrandLoader />}>
              <Mental />
            </Suspense>
          } />
          <Route path="/emotional" element={
            <Suspense fallback={<BrandLoader />}>
              <Emotional />
            </Suspense>
          } />
          <Route path="/social" element={
            <Suspense fallback={<BrandLoader />}>
              <Social />
            </Suspense>
          } />
          <Route path="/intellectual" element={
            <Suspense fallback={<BrandLoader />}>
              <Intellectual />
            </Suspense>
          } />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
