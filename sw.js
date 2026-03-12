const CACHE_NAME = 'kidzone-v1';
const PRECACHE = [
  '',
  'index.html',
  'manifest.webmanifest',
  'icons/icon.svg',
  'games/colors.js',
  'games/shapes.js',
  'games/animals.js',
  'games/bigsmall.js',
  'games/count.js',
  'games/letters.js',
  'games/easymath.js',
  'games/oddone.js',
  'games/math20.js',
  'games/spellit.js',
  'games/flags.js',
  'games/pattern.js',
  'games/multiply.js',
  'games/divide.js',
  'games/capitals.js',
  'games/sequence.js',
  'games/storymath.js',
  'games/wordbuild.js'
];

self.addEventListener('install', function (e) {
  var base = self.registration.scope.replace(/\/$/, '');
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRECACHE.map(function (u) {
        return new Request(base + (u ? '/' + u : '/'), { cache: 'reload' });
      })).catch(function () {});
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(
        names.filter(function (n) { return n !== CACHE_NAME; }).map(function (n) { return caches.delete(n); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function (cached) {
      return cached || fetch(e.request).then(function (res) {
        if (res && res.status === 200 && res.type === 'basic') {
          var clone = res.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(e.request, clone); });
        }
        return res;
      });
    })
  );
});
