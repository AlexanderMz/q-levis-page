import { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from 'src/stores';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/IndexPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'billing',
        name: 'billing',
        component: () => import('pages/BillingPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'invoice',
        name: 'invoice',
        component: () => import('pages/InvoicePage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'invoices',
        name: 'invoices',
        component: () => import('pages/InvoicesPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('pages/ProfilePage.vue'),
        meta: { requiresAuth: true }
      },
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/LoginPage.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/RegisterPage.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;

// Guardia de navegación para proteger rutas que requieren autenticación
export function setupNavigationGuards (router: any) {
  router.beforeEach((to: any, from: any, next: any) => {
    const authStore = useAuthStore();
    const requiresAuth = to.matched.some((record: any) => record.meta.requiresAuth);

    if (requiresAuth && !authStore.estaAutenticado) {
      next({ name: 'login' });
    } else if (to.path === '/auth/login' && authStore.estaAutenticado) {
      next({ name: 'home' });
    } else {
      next();
    }
  });
}
