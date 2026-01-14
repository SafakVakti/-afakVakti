const CACHE_NAME = 'safak-vakti-v1';
const assets = [
  './',
  './index.html',
  'https://www.islamicfinder.org/prayer-times/sounds/adhan/Makkah.mp3'
];

// Dosyaları telefona kaydet
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});

// Arka planda gelen mesajları ve vaktin geldiğini yönetir
self.addEventListener('push', e => {
  const data = e.data.json();
  const options = {
    body: data.body,
    icon: 'icon.png',
    badge: 'icon.png', // Android için küçük simge
    ongoing: true,      // Bildirimi sabit tutar
    vibrate: [100, 50, 100], // Titreşim desteği
    requireInteraction: true, // Kullanıcı tıklayana kadar bildirimi genişletmez
    data: {
      url: './index.html' // Bildirime tıklayınca uygulamayı açar
    }
  };

  e.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Bildirime tıklandığında uygulamayı açma özelliği
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.openWindow(e.notification.data.url)
  );
});
