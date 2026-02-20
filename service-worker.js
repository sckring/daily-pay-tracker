self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("pay-tracker-v8").then(cache =>
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
  let data = { title: "Notification", body: "" };

  if (event.data) {
    data = event.data.json();
  }

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "/icon-192.png",
    badge: "/icon-192.png"
  });
});