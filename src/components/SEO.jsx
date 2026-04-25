import React from 'react';
import { Helmet } from 'react-helmet-async';

const CANONICAL_ORIGIN = 'https://arrel.eu';

const SEO = ({
  title,
  description,
  canonical,
  image = '/hero-image.png',
  type = 'website',
  schema,
}) => {
  const siteTitle = 'Arrel';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDesc =
    description ||
    "Arrel detecta on el desgast ja ha començat i et dona una acció al dia per recuperar terreny. Criteri clar, sense sorolls.";
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  const canonicalHref = canonical || `${CANONICAL_ORIGIN}${path}`;
  const absoluteImage = image.startsWith('http') ? image : `${CANONICAL_ORIGIN}${image}`;

  return (
    <Helmet>
      {/* Standard Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={canonicalHref} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:url" content={canonicalHref} />
      <meta property="og:site_name" content="Arrel" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={absoluteImage} />

      {/* Schema.org (JSON-LD) */}
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}

      {/* Global Organization Schema */}
      {!schema && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Arrel',
            url: CANONICAL_ORIGIN,
            logo: `${CANONICAL_ORIGIN}/vite.svg`,
            sameAs: [],
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
