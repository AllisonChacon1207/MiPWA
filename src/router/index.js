import { defineRouter } from '#q-app/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

/*AGREGADO*/
import { register } from 'register-service-worker';

if (process.env.PROD) {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log('La app está siendo servida desde la caché por un service worker.');
    },
    registered() {
      console.log('Service worker ha sido registrado.');
    },
    cached() {
      console.log('El contenido ha sido cacheado para uso offline.');
    },
    updatefound() {
      console.log('Nuevo contenido está siendo descargado.');
    },
    updated() {
      console.log('Nuevo contenido está disponible; por favor, recarga.');
    },
    offline() {
      console.log('No se encontró conexión a Internet. La app se está ejecutando en modo offline.');
    },
    error(error) {
      console.error('Error durante el registro del service worker:', error);
    },
  });
}

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
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)

  })

  return Router
})
