const CACHE_NAME = 'siska-realtime-v5';

// Install: Langsung aktif tanpa menunggu tab ditutup
self.addEventListener('install', event => {
  self.skipWaiting();
});

// Activate: Hapus semua cache lama demo agar bersih
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(k => caches.delete(k)));
    }).then(() => self.clients.claim())
  );
});

// Fetch: Selalu utamakan data realtime VPS
self.addEventListener('fetch', event => {
  if (event.request.url.includes('/api/')) {
    return;
  }
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
