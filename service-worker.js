self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("pay-tracker").then(cache =>
      cache.addAll(["./"])
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/")
  );
});
