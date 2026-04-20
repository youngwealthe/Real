self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("bovisync-cache").then(cache => {
      return cache.addAll(["/"]);
    })
  );
});
