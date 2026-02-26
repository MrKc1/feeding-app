self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

// כרגע לא עושים cache מתקדם, רק מאפשרים מצב PWA בסיסי
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});