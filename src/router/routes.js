const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }, // Ruta principal
      { path: '/MiPWA/src/pages/MiPrimero.vue', component: () => import('pages/MiPrimero.vue') }, // Ruta para MiPrimero.vue
      { path: '/MiPWA/src/pages/MiSegundo.vue', component: () => import('pages/MiSegundo.vue') }, // Ruta para MiSegundo.vue
      
    ],
  },

  // Siempre deja esta última ruta para manejar rutas no encontradas (404)
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },

];

export default routes;