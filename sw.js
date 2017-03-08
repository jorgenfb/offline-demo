const CACHE_NAME = 'troendeloven-v1';
const urlsToCache = [
  '/',
  'app.js',
  'styles.css',
  'data.json',
  'manifest.json'
];

// Set the callback for the install step
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// Handle fetches
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('sync', function(event) {
  event.waitUntil(
    fetch('https://pwa-demo-485c1.firebaseio.com/newItems.json', {
      method: 'POST',
      body: JSON.stringify(event.tag)
    })
  );
});
