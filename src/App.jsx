import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './layout/Layout';
import PublicLayout from './layout/PublicLayout';
import { AuthProvider, useAuth } from './context/AuthContext';
import Spinner from './components/Spinner';
import Loading from './components/Loading';
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
  if (loading) return <Spinner />;
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
            <Suspense fallback={<Loading />}>
              <Landing />
            </Suspense>
          } />
          <Route path="/com-funciona" element={
            <Suspense fallback={<Loading />}>
              <ComFunciona />
            </Suspense>
          } />
          <Route path="/ciencia" element={
            <Suspense fallback={<Loading />}>
              <Ciencia />
            </Suspense>
          } />
          <Route path="/manifest" element={
            <Suspense fallback={<Loading />}>
              <Manifest />
            </Suspense>
          } />
          <Route path="/recursos" element={
            <Suspense fallback={<Loading />}>
              <Recursos />
            </Suspense>
          } />

          {/* Legal Routes */}
          <Route path="/privacitat" element={
            <Suspense fallback={<Loading />}>
              <Legal section="privacitat" />
            </Suspense>
          } />
          <Route path="/termes" element={
            <Suspense fallback={<Loading />}>
              <Legal section="termes" />
            </Suspense>
          } />
          <Route path="/cookies" element={
            <Suspense fallback={<Loading />}>
              <Legal section="cookies" />
            </Suspense>
          } />
          <Route path="/contacte" element={
            <Suspense fallback={<Loading />}>
              <Legal section="contacte" />
            </Suspense>
          } />
        </Route>

        {/* Standalone Public Routes */}
        <Route path="/diagnosis" element={
          <PageTransition>
            <Suspense fallback={<Loading />}>
              <Diagnosis />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/resultats" element={
          <PageTransition>
            <Suspense fallback={<Loading />}>
              <Resultats />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/login" element={
          <PageTransition>
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          </PageTransition>
        } />

        {/* Protected Routes */}
        <Route path="/historic" element={
          <PrivateRoute>
            <Suspense fallback={<Loading />}>
              <Historic />
            </Suspense>
          </PrivateRoute>
        } />
        {/* Dynamic Day Route - Replaces static ProtocolDia2 */}
        <Route path="/dia/:day" element={
          <PrivateRoute>
            <Suspense fallback={<Loading />}>
              <DiaCheckIn />
            </Suspense>
          </PrivateRoute>
        } />

        {/* Protected Layout Routes */}
        <Route element={<PrivateRoute><PageTransition><Layout /></PageTransition></PrivateRoute>}>
          <Route path="/dashboard" element={
            <Suspense fallback={<Loading />}>
              <Dashboard />
            </Suspense>
          } />
          <Route path="/protocol" element={
            <Suspense fallback={<Loading />}>
              <DailyProtocol />
            </Suspense>
          } />
          <Route path="/physical" element={
            <Suspense fallback={<Loading />}>
              <Physical />
            </Suspense>
          } />
          <Route path="/mental" element={
            <Suspense fallback={<Loading />}>
              <Mental />
            </Suspense>
          } />
          <Route path="/emotional" element={
            <Suspense fallback={<Loading />}>
              <Emotional />
            </Suspense>
          } />
          <Route path="/social" element={
            <Suspense fallback={<Loading />}>
              <Social />
            </Suspense>
          } />
          <Route path="/intellectual" element={
            <Suspense fallback={<Loading />}>
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
