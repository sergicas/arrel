import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Logo i tagline */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-purple-600">Arrel 🌱</h3>
          <p className="text-sm text-gray-600 mt-1">Frenar el temps amb ciència</p>
        </div>

        {/* Enllaços de navegació */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm md:text-base">
          <Link to="/" className="text-gray-700 hover:text-purple-600 transition font-medium">
            Inici
          </Link>
          <Link
            to="/com-funciona"
            className="text-gray-700 hover:text-purple-600 transition font-medium"
          >
            Com funciona
          </Link>
          <Link
            to="/ciencia"
            className="text-gray-700 hover:text-purple-600 transition font-medium"
          >
            Ciència
          </Link>
          <Link
            to="/recursos"
            className="text-gray-700 hover:text-purple-600 transition font-medium"
          >
            Recursos
          </Link>
          <Link
            to="/manifest"
            className="text-gray-700 hover:text-purple-600 transition font-medium"
          >
            Manifest
          </Link>
        </div>

        {/* Legal Links (New) */}
        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500 mb-6 border-t border-gray-200 pt-6 w-full max-w-lg mx-auto">
          <Link to="/privacitat" className="hover:text-purple-600 hover:underline transition">
            Política de Privacitat
          </Link>
          <span className="text-gray-300">•</span>
          <Link to="/termes" className="hover:text-purple-600 hover:underline transition">
            Termes d'Ús
          </Link>
          <span className="text-gray-300">•</span>
          <Link to="/cookies" className="hover:text-purple-600 hover:underline transition">
            Cookies
          </Link>
          <span className="text-gray-300">•</span>
          <Link to="/contacte" className="hover:text-purple-600 hover:underline transition">
            Contacte
          </Link>
        </div>

        {/* Version Info */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Arrel Health. All rights reserved. v1.0.0
          </p>
          <p>Sistema Arrel v0.4 · Dades locals encriptades 🔒 · 2025</p>
        </div>
      </div>
    </footer>
  );
}
