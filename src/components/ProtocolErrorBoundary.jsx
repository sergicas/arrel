import React from 'react';
import { AlertCircle } from 'lucide-react';

class ProtocolErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Protocol error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 text-red-500">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No podem carregar el protocol</h2>
          <p className="text-gray-500 mb-8 max-w-sm">
            Hi ha hagut un problema tècnic. Prova de tornar al dashboard.
          </p>
          <button
            onClick={() => (window.location.href = '/dashboard')}
            className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-gray-800 transition-colors"
          >
            Tornar al Dashboard
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ProtocolErrorBoundary;
