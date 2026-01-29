const CACHE_NAME = 'arrel-cache-v1';
const URLS_TO_CACHE = ['/', '/index.html', '/manifest.json', '/vite.svg'];

// Install: Cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch: Stale-While-Revalidate
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests or auth requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        caches.open(CACHE_NAME).then((cache) => {
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            networkResponse.type === 'basic'
          ) {
            cache.put(event.request, networkResponse.clone());
          }
        });
        return networkResponse;
      });
      return cachedResponse || fetchPromise;
    })
  );
});

// Helper for Notifications (future)
self.addEventListener('push', function (event) {
  if (event.data) {
    self.registration.showNotification('Arrel Protocol', {
      body: event.data.text(),
      icon: '/vite.svg',
    });
  }
});
