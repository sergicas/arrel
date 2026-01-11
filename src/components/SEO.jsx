export default function SEO({ title, description, type = 'website', schema }) {
    const siteTitle = 'Arrel | Longevitat i Salut Metabòlica';
    const finalTitle = title ? `${title} | Arrel` : siteTitle;

    return (
        <>
            {/* Standard Metadata */}
            <title>{finalTitle}</title>
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={description} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={description} />

            {/* Linked Data (JSON-LD) */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </>
    );
}
