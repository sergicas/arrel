import React from 'react';
import { ERROR_MESSAGES } from '../utils/errorMessages';
import { logError, generateErrorId } from '../utils/errorLogger';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      errorType: 'GENERIC',
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const errorId = generateErrorId();
    const errorType = this.detectErrorType(error);

    logError(error, errorInfo, errorId);

    this.setState({
      error,
      errorInfo,
      errorId,
      errorType,
    });
  }

  detectErrorType(error) {
    if (error.message && error.message.includes('Failed to fetch')) return 'NETWORK_ERROR';
    if (error.message && error.message.includes('404')) return '404';
    if (error.message && error.message.includes('500')) return '500';
    if (error.name === 'ChunkLoadError') return 'NETWORK_ERROR'; // Vite chunk load error
    return 'GENERIC';
  }

  handleRetry = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReportError = () => {
    const { errorId, error } = this.state;
    const emailSubject = `[Arrel] Error Report - ${errorId}`;
    const emailBody = `Error ID: ${errorId}\nURL: ${window.location.href}\nNavegador: ${navigator.userAgent}\nTimestamp: ${new Date().toISOString()}\n\nDescriu què estaves fent quan ha aparegut l'error:\n\n\n──────────────────────────────────\nDetalls tècnics:\n${error ? error.toString() : 'N/A'}`;

    window.location.href = `mailto:suport@arrel.app?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  };

  render() {
    if (this.state.hasError) {
      const errorConfig = ERROR_MESSAGES[this.state.errorType] || ERROR_MESSAGES.GENERIC;

      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center animate-fade-in">
          <div className="error-content max-w-lg w-full bg-white p-8 rounded-2xl shadow-xl">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-sm">
              {errorConfig.icon}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">{errorConfig.title}</h1>
            <p className="text-gray-500 mb-8 leading-relaxed">{errorConfig.description}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              {errorConfig.actions.includes('go_home') && (
                <button
                  onClick={this.handleGoHome}
                  className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 py-3 px-6 rounded-xl font-bold transition-all"
                >
                  Torna a Inici
                </button>
              )}
              {errorConfig.actions.includes('retry') && (
                <button
                  onClick={this.handleRetry}
                  className="btn bg-gray-900 text-white hover:bg-gray-800 py-3 px-6 rounded-xl font-bold transition-all shadow-lg shadow-gray-200"
                >
                  Reintentar
                </button>
              )}
              {errorConfig.actions.includes('report') && (
                <button
                  onClick={this.handleReportError}
                  className="btn bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 py-3 px-6 rounded-xl font-bold transition-all"
                >
                  Reporta l'Error
                </button>
              )}
            </div>

            <div className="bg-blue-50 p-4 rounded-xl text-left mb-6">
              <h4 className="text-sm font-bold text-blue-800 mb-2 flex items-center gap-2">
                ℹ️ Què pots fer mentrestant:
              </h4>
              <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                <li>Refresca la pàgina (Cmd+R o Ctrl+R)</li>
                <li>Torna a la pàgina anterior</li>
                <li>
                  Contacta amb nosaltres:{' '}
                  <a href="mailto:suport@arrel.app" className="underline">
                    suport@arrel.app
                  </a>
                </li>
              </ul>
            </div>

            <div className="error-reassurance text-xs text-gray-400 border-t pt-4">
              <p className="flex items-center justify-center gap-2">
                🔒 Les teves dades estan segures i guardades localment
              </p>
              <p className="mt-2 font-mono opacity-60">Error ID: {this.state.errorId}</p>
            </div>

            {import.meta.env.DEV && (
              <details className="mt-6 text-left border rounded-lg p-4 bg-gray-50">
                <summary className="cursor-pointer text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Detalls tècnics per a Desenvolupadors
                </summary>
                <div className="mt-2 overflow-auto max-h-40 text-xs font-mono text-red-600 whitespace-pre-wrap">
                  {this.state.error?.toString()}
                  <br />
                  {this.state.errorInfo?.componentStack}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
