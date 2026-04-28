import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, expect, it, beforeEach } from 'vitest';
import AppV2 from './AppV2.jsx';

describe('AppV2 routing', () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.pushState({}, '', '/');
  });

  it('redirects /app to /inici when the user has not started', async () => {
    window.history.pushState({}, '', '/app');

    render(
      <HelmetProvider>
        <AppV2 />
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(window.location.pathname).toBe('/inici');
    });
    expect(screen.getByRole('heading', { name: 'Frena el teu envelliment.' })).toBeInTheDocument();
  });
});
