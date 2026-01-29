export function generateErrorId() {
  return Math.random().toString(36).substr(2, 9);
}

export function logError(error, errorInfo, errorId) {
  // 1. Log to console (development)
  console.error('[Arrel Error]', {
    id: errorId,
    error,
    errorInfo,
    timestamp: new Date().toISOString(),
  });

  // 2. Mock sending to error tracking service (production)
  if (import.meta.env.PROD) {
    // sendToErrorTracking(...)
  }

  // 3. Save locally for debugging
  try {
    const errorLog = {
      id: errorId,
      message: error.toString(),
      stack: error.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    const existingary = localStorage.getItem('arrel_errors');
    const errors = existingary ? JSON.parse(existingary) : [];

    // Keep last 10 errors
    errors.push(errorLog);
    if (errors.length > 10) errors.shift();

    localStorage.setItem('arrel_errors', JSON.stringify(errors));
  } catch (e) {
    console.warn('Failed to save error to localStorage', e);
  }
}
