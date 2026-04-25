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
      routes: ['/', '/menu/sobre', '/menu/arees'],
      exclude: ['/dashboard', '/protocol', '/api/*', '/menu/cicles'],
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Arrel',
        short_name: 'Arrel',
        description: 'Una acció al dia per recuperar terreny on el desgast ja ha començat.',
        theme_color: '#faf6ee',
        background_color: '#faf6ee',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
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
            description: 'Obre l’acció del dia',
            url: '/',
            icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }],
          },
          {
            name: 'Les cinc àrees',
            short_name: 'Àrees',
            description: 'Consulta les àrees de treball',
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
