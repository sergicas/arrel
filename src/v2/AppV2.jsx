import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ArrelProvider, useArrel } from './state/ArrelContext.jsx';
import { STATUS } from './lib/types.js';

import Welcome from './pages/Welcome.jsx';
import Diagnostic from './pages/Diagnostic.jsx';
import Today from './pages/Today.jsx';
import Rest from './pages/Rest.jsx';
import Transition from './pages/Transition.jsx';
import Menu from './pages/Menu.jsx';
import Paywall from './pages/Paywall.jsx';
import PastCycles from './pages/menu/PastCycles.jsx';
import Areas from './pages/menu/Areas.jsx';
import About from './pages/menu/About.jsx';

function StateRoot() {
  const { state, isToday7 } = useArrel();

  if (state.cycleJustEnded) return <Transition />;

  switch (state.status) {
    case STATUS.NEW:
      return <Welcome />;
    case STATUS.DIAGNOSTIC:
      return <Diagnostic />;
    case STATUS.AWAITING_SUBSCRIPTION:
      return <Paywall />;
    case STATUS.ACTIVE:
      return isToday7 ? <Rest /> : <Today />;
    default:
      return <Welcome />;
  }
}

export default function AppV2() {
  return (
    <ArrelProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StateRoot />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/cicles" element={<PastCycles />} />
          <Route path="/menu/arees" element={<Areas />} />
          <Route path="/menu/sobre" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ArrelProvider>
  );
}
