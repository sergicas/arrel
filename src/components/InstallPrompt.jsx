import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Check if already installed or dismissed previously
      if (!localStorage.getItem('arrel_pwa_dismissed')) {
        setIsVisible(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('arrel_pwa_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 p-4">
      <div className="max-w-md mx-auto bg-gray-900 text-white rounded-2xl shadow-2xl p-5 flex items-start gap-4 animate-slide-up border border-gray-800">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
          <span className="font-bold text-lg">A</span>
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-base mb-1">Instal·la Arrel App</h4>
          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
            Guarda el teu progrés i accedeix als teus protocols sense necessitat d'internet.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleInstall}
              className="flex-1 bg-white text-gray-900 text-sm font-bold px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <Download size={16} />
              Instal·lar Ara
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-2.5 text-gray-400 font-medium hover:text-white transition-colors"
            >
              Ara no
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;
