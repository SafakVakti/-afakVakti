const CACHE_NAME = 'safak-vakti-v1';
const assets = [
  './',
  './index.html',
  'https://www.islamicfinder.org/prayer-times/sounds/adhan/Makkah.mp3' // Ezan sesini telefona indirir
];

// Dosyaları telefona kaydet (İnternetsiz çalışma için)
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});

// Arka planda gelen mesajları ve vaktin geldiğini yönetir
self.addEventListener('push', e => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: 'icon.png',
    ongoing: true // Bildirimi sabit tutar
  });
});

