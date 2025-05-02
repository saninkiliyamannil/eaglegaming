self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/vite.svg',
    badge: '/vite.svg',
    vibrate: [200, 100, 200],
    tag: 'video-update',
    renotify: true
  };

  event.waitUntil(
    self.registration.showNotification('New Video Available!', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
