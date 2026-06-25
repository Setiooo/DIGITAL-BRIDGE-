const CACHE_NAME = 'umkm-jatim-v1';
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
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
