import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { LayoutGrid, Fingerprint, Activity } from 'lucide-react';

const Layout = () => {
    return (
        <div className="min-h-screen w-full flex justify-center bg-[#f8f9fa] text-gray-900">
            {/* Mobile Simulation Frame */}
            <div className="w-full max-w-[480px] min-h-screen bg-white relative border-x border-gray-200 flex flex-col shadow-2xl shadow-gray-200/50">

                {/* Main Content Area */}
                <main className="flex-1 pb-24 pt-6 px-6 animate-enter">
                    <Outlet />
                </main>

                {/* Minimal Floating Dock */}
                <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 pointer-events-none">
                    <nav className="pointer-events-auto bg-white/90 backdrop-blur-xl border border-gray-200 rounded-full px-6 py-3 flex items-center space-x-8 shadow-xl shadow-gray-200/50">

                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => `
                                transition-colors duration-200
                                ${isActive ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600'}
                            `}
                        >
                            <LayoutGrid size={24} strokeWidth={2} />
                        </NavLink>

                        {/* Center Action: Daily Protocol */}
                        <NavLink
                            to="/protocol"
                            className={({ isActive }) => `
                                flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300
                                ${isActive
                                    ? 'bg-gray-900 text-white scale-110 shadow-lg'
                                    : 'bg-gray-100 text-gray-400 border border-gray-200 hover:bg-gray-200'}
                            `}
                        >
                            <Activity size={24} strokeWidth={2} />
                        </NavLink>

                        <NavLink
                            to="/diagnosis"
                            className={({ isActive }) => `
                                transition-colors duration-200
                                ${isActive ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600'}
                            `}
                        >
                            <Fingerprint size={24} strokeWidth={2} />
                        </NavLink>

                    </nav>
                </div>

            </div>
        </div>
    );
};

export default Layout;
