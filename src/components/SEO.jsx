import React from 'react';
import { Helmet } from 'react-helmet-async';

const CANONICAL_ORIGIN = 'https://arrel.eu';

const SEO = ({
  title,
  description,
  canonical,
  image = '/hero-image.png',
  type = 'website',
  robots = 'index, follow',
  schema,
}) => {
  const siteTitle = 'Arrel';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDesc =
    description ||
    "Arrel et proposa proves petites per frenar l’envelliment quotidià: cos, memòria, calma, vincles i identitat.";
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  const canonicalHref = canonical || `${CANONICAL_ORIGIN}${path}`;
  const absoluteImage = image.startsWith('http') ? image : `${CANONICAL_ORIGIN}${image}`;

  return (
    <Helmet>
      {/* Standard Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="robots" content={robots} />
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
            '@type': 'MobileApplication',
            name: 'Arrel',
            applicationCategory: 'LifestyleApplication',
            operatingSystem: 'iOS, Android, Web',
            description: metaDesc,
            url: CANONICAL_ORIGIN,
            logo: `${CANONICAL_ORIGIN}/pwa-512x512.png`,
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'EUR',
            },
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
