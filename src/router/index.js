// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'person',
        name: 'Person',
        component: () => import('@/views/person/Index.vue'),
      },
      {
        path: 'telephone',
        name: 'Telephone',
        component: () => import('@/views/telephone/Index.vue'),
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/login/Index.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/home'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('userToken');
  if (!isAuthenticated && to.name !== 'login') {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router
