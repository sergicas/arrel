import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: 'Inici', path: '/' },
    { name: 'Com funciona', path: '/com-funciona' },
    { name: 'Ciència', path: '/ciencia' },
    { name: 'Recursos', path: '/recursos' },
    { name: 'Manifest', path: '/manifest' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            aria-label="Arrel - Tornar a l'inici"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 group-hover:scale-110 transition-transform duration-300"></div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">ARREL</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-purple-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 rounded px-2 py-1 ${isActive ? 'text-purple-600' : 'text-gray-600'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors">
              Entrar
            </Link>
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            <button
              onClick={() => navigate('/diagnosis')}
              className="bg-gray-900 text-white px-5 py-3 rounded-full text-sm font-bold hover:bg-black transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
            >
              Començar Diagnòstic
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 rounded-lg"
            aria-label="Obrir menú de navegació"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute top-20 left-0 right-0 shadow-xl animate-fade-in-down">
          <div className="px-6 py-8 space-y-4 flex flex-col">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-medium py-4 transition-colors ${isActive ? 'text-purple-600' : 'text-gray-600'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/diagnosis');
                }}
                className="w-full bg-gray-900 text-white px-5 py-3 rounded-xl text-center font-bold"
              >
                Començar Diagnòstic
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
