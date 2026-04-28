import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/postcss';
import sitemap from 'vite-plugin-sitemap';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://arrel.eu',
      dynamicRoutes: ['/inici', '/menu/sobre', '/menu/arees', '/legal', '/legal/privacitat', '/legal/termes'],
      // `/app` and `/menu/cicles` contain local user progress, so they must stay out of public SEO.
      exclude: ['/app', '/dashboard', '/protocol', '/api/*', '/menu/cicles', '/menu/recordatori'],
      changefreq: {
        '*': 'monthly',
        '/': 'weekly',
        '/inici': 'weekly',
      },
      priority: {
        '*': 0.4,
        '/': 1,
        '/inici': 0.9,
        '/menu/sobre': 0.6,
        '/menu/arees': 0.6,
      },
      readable: true,
      robots: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/app', '/diagnostic', '/dashboard', '/protocol', '/api/', '/menu/cicles', '/menu/recordatori'],
        },
      ],
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['arrel-logo.svg', 'pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        name: 'Arrel',
        short_name: 'Arrel',
        description: 'Proves petites per frenar l’envelliment quotidià: cos, memòria, calma, vincles i identitat.',
        theme_color: '#fff3df',
        background_color: '#fff3df',
        lang: 'ca',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/app',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
        categories: ['health', 'lifestyle'],
        shortcuts: [
          {
            name: 'Avui',
            short_name: 'Avui',
            description: 'Obre la prova del dia',
            url: '/app',
            icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }],
          },
          {
            name: 'Les cinc capacitats',
            short_name: 'Capacitats',
            description: 'Consulta les capacitats que Arrel observa',
            url: '/menu/arees',
            icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }],
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,json}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 1 dia
              },
            },
          },
        ],
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['framer-motion', 'lucide-react'],
          'vendor-db': ['@supabase/supabase-js'],
        },
      },
    },
  },
});
