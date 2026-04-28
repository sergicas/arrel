import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, expect, it } from 'vitest';
import SEO from './SEO.jsx';

function renderSeo(props = {}) {
  render(
    <HelmetProvider>
      <SEO {...props} />
    </HelmetProvider>
  );
}

describe('SEO', () => {
  it('renders app metadata and robots rules', async () => {
    renderSeo({
      title: 'Prova d’avui',
      description: 'Pantalla personal d’Arrel amb la prova del dia.',
      canonical: 'https://arrel.eu/app',
      robots: 'noindex, follow',
    });

    await waitFor(() => {
      expect(document.title).toBe('Prova d’avui | Arrel');
    });

    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://arrel.eu/app');
    expect(document.querySelector('meta[property="og:description"]')).toHaveAttribute(
      'content',
      'Pantalla personal d’Arrel amb la prova del dia.'
    );
    expect(document.querySelector('script[type="application/ld+json"]')?.textContent).toContain(
      'MobileApplication'
    );
  });
});
