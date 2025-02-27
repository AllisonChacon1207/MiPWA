import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'

/* AGREGADO: Registro del Service Worker utilizando la librería `register-service-worker` */
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
// Configuración del Router
export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Configuración de historial según el modo
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  return Router
})
