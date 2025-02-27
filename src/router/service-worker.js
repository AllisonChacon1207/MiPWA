// service-worker.js
const CACHE_NAME = 'vehicular-cache-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/src-pwa/carro.png',
  // Agrega aquí otros archivos necesarios para tu app
]

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Archivos cacheados')
      return cache.addAll(urlsToCache)
    }),
  )
})

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})

// Fetch: Manejar las solicitudes de red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Si hay una respuesta en caché, la devuelve
      if (cachedResponse) {
        return cachedResponse
      }

      // Si no está en caché, hace la solicitud de red
      return fetch(event.request)
    }),
  )
})
