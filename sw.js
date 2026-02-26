self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil((async () => {
    const targetUrl = new URL("./feeding.html", self.registration.scope).href;

    const allClients = await clients.matchAll({
      type: "window",
      includeUncontrolled: true
    });

    // נסה להחזיר לפוקוס חלון קיים של האפליקציה
    for (const client of allClients) {
      const url = client.url || "";
      if (url.includes("/feeding.html") || url.startsWith(self.registration.scope)) {
        await client.focus();
        return;
      }
    }

    // אם אין חלון פתוח, פתח חדש
    await clients.openWindow(targetUrl);
  })());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
