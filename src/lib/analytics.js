

const isDev = import.meta.env.DEV;

export const analytics = {
  // Track Page Views
  trackPage: (path) => {
    if (isDev) {
      console.log(`[Analytics] Page View: ${path}`);
    }
    // In production, send to DB
    // supabase.from('analytics_pages').insert({ path, timestamp: new Date() });
  },

  // Track Custom Events (Clicks, Form submissions)
  trackEvent: (category, action, label = '', value = 0) => {
    // In a real app, send to GA/Mixpanel here
    if (import.meta.env.DEV) {
      console.log(`[Analytics] Event: ${category} | ${action} | ${label} | ${value}`);
    }
    // supabase.from('analytics_events').insert({ category, action, label, value, timestamp: new Date() });
  },

  // Track Specific Diagnosis Dropouts
  trackDiagnosisStep: (stepId, totalSteps) => {
    analytics.trackEvent('Diagnosis', 'Step View', `Step ${stepId} of ${totalSteps}`);
  },

  // Track Time on Section (Call on component unmount)
  trackTimeSpent: (section, seconds) => {
    analytics.trackEvent('Engagement', 'Time Spent', section, seconds);
  },
};
