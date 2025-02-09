import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import HomePage from '@/views/HomePage.vue'
import store from '@/store';
import NuevaCompraPage from '@/views/NuevaCompraPage.vue';
import HistorialdeMovimientosPage from '@/views/HistorialdeMovimientosPage.vue';
import AnalisisdeEstadoPage from '@/views/AnalisisdeEstadoPage.vue';
import AnalisisdeInversionesPage from '@/views/AnalisisdeInversionesPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginPage },
    { path: '/home', component: HomePage },
    { path: '/nuevacompra', component: NuevaCompraPage },
    { path: '/historialdemovimientos', component: HistorialdeMovimientosPage },
    { path: '/analisisdeestadoactual', component: AnalisisdeEstadoPage },
    { path: '/analisisdeinversiones', component: AnalisisdeInversionesPage },
  ],
})

router.beforeEach((to, from, next) => {
  const userId = store.state.userId; // Obtén el estado del usuario desde Vuex
  if (to.path !== '/login' && !userId) {
    next('/login'); // Redirige al login si no hay un usuario
  } else {
    next();
  }
});


export default router
