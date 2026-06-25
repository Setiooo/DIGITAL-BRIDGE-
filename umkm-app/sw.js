const CACHE_NAME = 'umkm-jatim-v2';

// Daftar file yang harus selalu di-cache
const urlsToCache = [
  '/DIGITAL-BRIDGE-/umkm-app/',
  '/DIGITAL-BRIDGE-/umkm-app/index.html',
  '/DIGITAL-BRIDGE-/umkm-app/manifest.json',
  '/DIGITAL-BRIDGE-/umkm-app/sw.js',
  '/DIGITAL-BRIDGE-/umkm-app/app.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Kembalikan dari cache kalau ada, kalau tidak fetch dari network
        return response || fetch(event.request);
      })
      .catch(() => {
        // Offline fallback (opsional)
        if (event.request.destination === 'document') {
          return caches.match('/DIGITAL-BRIDGE-/umkm-app/index.html');
        }
      })
  );
});
