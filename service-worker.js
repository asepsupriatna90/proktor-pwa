// Simple service worker with cache-first strategy for local assets
const CACHE_NAME = 'proktor-pwa-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  // Pre-cache application shell
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  // Cleanup old caches
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => {
        if(k !== CACHE_NAME) return caches.delete(k);
      })
    ))
  );
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if(event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if(cached) return cached; // return from cache if available
      return fetch(event.request).then(response => {
        // If response is OK and is same-origin, store in cache
        if(response && response.status === 200 && response.type !== 'opaque'){
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Fallback for navigation requests (HTML)
        if(event.request.mode === 'navigate' || (event.request.headers.get('accept')||'').includes('text/html')){
          return new Response('<!doctype html><meta charset="utf-8"><title>Offline</title><style>body{font-family:Arial,Helvetica,sans-serif;padding:20px;background:#f5f7fb;color:#111}</style><h1>Anda sedang offline</h1><p>Silakan periksa koneksi internet Anda dan coba lagi.</p>', {headers: {'Content-Type':'text/html'}});
        }
        // For other requests, just fail
        return new Response(null, {status:503, statusText:'Service Unavailable'});
      });
    })
  );
});
