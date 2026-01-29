import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title,
  description,
  canonical,
  image = '/hero-image.png',
  type = 'website',
  schema,
}) => {
  const siteTitle = 'Arrel - Ciència de la Longevitat';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDesc =
    description ||
    'Arrel és la guia científica per viure més anys amb millor salut. Protocols personalitzats basats en cronobiologia.';

  return (
    <Helmet>
      {/* Standard Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={canonical || window.location.href} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:site_name" content="Arrel" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={image} />

      {/* Schema.org (JSON-LD) */}
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}

      {/* Global Organization Schema */}
      {!schema && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Arrel',
            url: 'https://arrel.app',
            logo: 'https://arrel.app/vite.svg',
            sameAs: [],
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
