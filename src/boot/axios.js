import { boot } from 'quasar/wrappers';
import axios from 'axios'; // Esta línea no debería dar error

const api = axios.create({
  baseURL: 'https://openlibrary.org/' // Base URL opcional
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
