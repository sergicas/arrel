import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ArrelProvider } from './state/ArrelContext.jsx';
import { useArrel } from './state/useArrel.js';
import { STATUS } from './lib/types.js';
import SEO from '../components/SEO.jsx';

import Landing from './pages/Landing.jsx';
import Diagnostic from './pages/Diagnostic.jsx';
import DiagnosticResult from './pages/DiagnosticResult.jsx';
import Today from './pages/Today.jsx';
import Rest from './pages/Rest.jsx';
import Transition from './pages/Transition.jsx';
import Menu from './pages/Menu.jsx';
import Paywall from './pages/Paywall.jsx';
import Identity from './pages/menu/Identity.jsx';
import PastCycles from './pages/menu/PastCycles.jsx';
import Areas from './pages/menu/Areas.jsx';
import About from './pages/menu/About.jsx';
import Reminder from './pages/menu/Reminder.jsx';
import Pace from './pages/menu/Pace.jsx';
import Legal from './pages/Legal.jsx';

function AppLoading() {
  return (
    <main className="v2-app-loading" aria-label="Carregant Arrel">
      <div className="v2-app-loading-mark" aria-hidden="true">A</div>
      <p>Carregant Arrel...</p>
    </main>
  );
}

function StateRoot() {
  const { state, isToday7, storageReady } = useArrel();

  if (!storageReady) return <AppLoading />;

  if (state.cycleJustEnded) return <Transition />;
  if (state.diagnosisJustCompleted) return <DiagnosticResult />;

  switch (state.status) {
    case STATUS.NEW:
      return <Navigate to="/inici" replace />;
    case STATUS.DIAGNOSTIC:
      return state.primaryArea ? (isToday7 ? <Rest /> : <Today />) : <Navigate to="/inici" replace />;
    case STATUS.INITIAL_PERIOD_COMPLETE:
      return <Paywall />;
    case STATUS.ACTIVE:
      return isToday7 ? <Rest /> : <Today />;
    default:
      return <Navigate to="/inici" replace />;
  }
}

function RootRoute() {
  const { state, storageReady } = useArrel();
  if (!storageReady) return <AppLoading />;
  return state.status === STATUS.NEW ? <Landing /> : <Navigate to="/app" replace />;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const { state } = useArrel();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'auto' });
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash, state.status, state.cycleNumber, state.dayInCycle, state.cycleJustEnded]);

  return null;
}

function RouteMeta() {
  const { pathname } = useLocation();
  const { state } = useArrel();

  if (pathname === '/' || pathname === '/inici') return null;

  if (pathname === '/menu/arees') {
    return (
      <SEO
        title="Les cinc capacitats"
        description="Les cinc capacitats d’Arrel: cos, memòria, calma, vincles i propòsit. Proves curtes per cuidar-les."
        canonical="https://arrel.eu/menu/arees"
      />
    );
  }

  if (pathname === '/menu/ritme') {
    return (
      <SEO
        title="Ritme de proves"
        description="Configura el ritme d’Arrel: lent o regular segons com vulguis avançar en les proves."
        canonical="https://arrel.eu/menu/ritme"
      />
    );
  }

  if (pathname === '/menu/sobre') {
    return (
      <SEO
        title="Sobre Arrel"
        description="Arrel és una app de proves curtes per cuidar autonomia, capacitat i il·lusió cada dia."
        canonical="https://arrel.eu/menu/sobre"
      />
    );
  }

  if (pathname.startsWith('/legal')) {
    return (
      <SEO
        title="Privacitat i termes"
        description="Informació legal d’Arrel: privacitat, dades locals, termes d’ús i avisos de seguretat."
        canonical={`https://arrel.eu${pathname}`}
      />
    );
  }

  return (
    <SEO
      title={state.status === STATUS.ACTIVE ? 'Prova d’avui' : 'App'}
      description="Pantalla personal d’Arrel amb la prova del dia i la lectura del cicle."
      canonical={`https://arrel.eu${pathname}`}
      robots="noindex, follow"
    />
  );
}

export default function AppV2() {
  return (
    <ArrelProvider>
      <BrowserRouter>
        <ScrollToTop />
        <RouteMeta />
        <Routes>
          <Route path="/" element={<RootRoute />} />
          <Route path="/inici" element={<Landing />} />
          <Route path="/app" element={<StateRoot />} />
          <Route path="/diagnostic" element={<Diagnostic />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/identitat" element={<Identity />} />
          <Route path="/menu/cicles" element={<PastCycles />} />
          <Route path="/menu/arees" element={<Areas />} />
          <Route path="/menu/ritme" element={<Pace />} />
          <Route path="/menu/recordatori" element={<Reminder />} />
          <Route path="/menu/sobre" element={<About />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/legal/:section" element={<Legal />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ArrelProvider>
  );
}
