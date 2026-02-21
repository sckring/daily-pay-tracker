self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("pay-tracker-v10").then(cache =>
      cache.addAll([
        "./",
        "./index.html",
        "./history.html",
        "./manifest.json",
        "./icon-192.png",
        "./icon-512.png"
      ])
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

self.addEventListener("push", event => {
  if (!event.data) return;

  const data = event.data.json();

  const options = {
    body: data.body,
    icon: "/icon-192.png",
    badge: "/icon-192.png"
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});