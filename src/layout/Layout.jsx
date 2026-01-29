import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { LayoutGrid, Fingerprint, Activity } from 'lucide-react';
import LessonNavigation from '../components/LessonNavigation';

const Layout = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen w-full flex justify-center bg-[#f8f9fa] text-gray-900">
      {/* Mobile Simulation Frame */}
      <div className="w-full max-w-[480px] min-h-screen bg-white relative border-x border-gray-200 flex flex-col shadow-2xl shadow-gray-200/50">
        {/* Main Content Area */}
        <main className="flex-1 pb-24 pt-6 px-6 animate-enter">
          <Outlet />
        </main>

        {/* Minimal Floating Dock -> Bottom Navigation */}
        {/* Hide on Protocol Page to avoid overlap with Protocol Footer */}
        {location.pathname !== '/protocol' && (
          <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4 pointer-events-none">
            <nav className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-gray-200 rounded-3xl px-8 py-3 flex items-center justify-between gap-8 shadow-2xl shadow-purple-900/10 w-auto max-w-sm mx-4">
              <NavLink
                to="/dashboard"
                className={({ isActive }) => `
                                  flex flex-col items-center gap-1 transition-all duration-300 min-w-[60px]
                                  ${isActive ? 'text-purple-600 scale-105' : 'text-gray-400 hover:text-gray-600'}
                              `}
              >
                <LayoutGrid size={22} strokeWidth={2.5} />
                <span className="text-[10px] font-bold tracking-wide">Inici</span>
              </NavLink>

              {/* Center Action: Daily Protocol */}
              <NavLink
                to="/protocol"
                className="flex flex-col items-center justify-center -mt-8 transition-all duration-300"
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`
                                          w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-[#f8f9fa]
                                          ${isActive
                          ? 'bg-gradient-to-tr from-gray-900 to-gray-800 text-white scale-110 shadow-purple-500/20'
                          : 'bg-white text-purple-600 hover:bg-gray-50'
                        }
                                      `}
                    >
                      <Activity size={26} strokeWidth={2.5} />
                    </div>
                    <span
                      className={`text-[10px] font-bold tracking-wide mt-1 ${isActive ? 'text-gray-900' : 'text-gray-400'}`}
                    >
                      Protocol
                    </span>
                  </>
                )}
              </NavLink>

              <LessonNavigation />
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
