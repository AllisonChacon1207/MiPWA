import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'

/*AGREGADO*/
import { register } from 'register-service-worker'

if (process.env.PROD) {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log('La app está siendo servida desde la caché por un service worker.')
    },
    registered() {
      console.log('Service worker ha sido registrado.')
    },
    cached() {
      console.log('El contenido ha sido cacheado para uso offline.')
    },
    updatefound() {
      console.log('Nuevo contenido está siendo descargado.')
    },
    updated() {
      console.log('Nuevo contenido está disponible; por favor, recarga.')
    },
    offline() {
      console.log('No se encontró conexión a Internet. La app se está ejecutando en modo offline.')
    },
    error(error) {
      console.error('Error durante el registro del service worker:', error)
    },
  })
}
/********************************************************************/
// En tu archivo principal (por ejemplo, `main.js`)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registrado con éxito:', registration)
      })
      .catch((error) => {
        console.log('Error al registrar el Service Worker:', error)
      })
  })
}
/********************************************************************/
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

/********************************************************************/

/********************************************************************/
/********************************************************************/
/********************************************************************/

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  return Router
})
