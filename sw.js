const CACHE_NAME = 'locus-maps-v1';
const urlsToCache = [
  '/locus-maps/',
  '/locus-maps/index.html',
  '/locus-maps/android-chrome-192x192.png',
  '/locus-maps/android-chrome-512x512.png',
  '/locus-maps/apple-touch-icon.png',
  '/locus-maps/favicon.ico',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  const requestURL = new URL(event.request.url);


  if (requestURL.origin === location.origin && urlsToCache.some(url => requestURL.pathname.includes(url))) {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  } else {
    event.respondWith(fetch(event.request));
  }
});