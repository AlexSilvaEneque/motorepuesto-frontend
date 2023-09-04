import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../views/layouts/MainLayout.vue'
import AuthLayout from '../views/layouts/AuthLayout.vue'
import AuthAPI from '@/api/AuthAPI'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainLayout,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/Dashboard.vue')
        },

        {
          path: 'clientes',
          name: 'index-clients',
          component: () => import('../views/clients/index.vue')
        },
        {
          path: 'clientes/nuevo',
          name: 'new-client',
          component: () => import('../views/clients/nuevo.vue')
        },

        {
          path: 'proveedores',
          name: 'index-providers',
          component: () => import('../views/providers/index.vue')
        },
        {
          path: 'proveedores/nuevo',
          name: 'new-providers',
          component: () => import('../views/providers/nuevo.vue')
        },

        {
          path: 'roles',
          name: 'index-roles',
          component: () => import('../views/role/index.vue')
        },
        {
          path: 'roles/nuevo',
          name: 'new-role',
          component: () => import('../views/role/nuevo.vue')
        },
        {
          path: 'roles/edit/:id',
          name: 'edit-role',
          component: () => import('../views/role/edit.vue')
        },

        {
          path: 'usuarios',
          name: 'index-users',
          component: () => import('../views/users/index.vue')
        },
        {
          path: 'usuarios/nuevo',
          name: 'new-user',
          component: () => import('../views/users/nuevo.vue')
        },
        {
          path: 'mi-perfil',
          name: 'profile',
          component: () => import('../views/users/profile.vue')
        },
      ]
    },
    {
      path: '/login',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue')
        }
      ]
    }
  ]
})

// 
router.beforeEach(async(to, from) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if (requiresAuth) {
    try {
      const { data } = await AuthAPI.auth()
      if (data) {
        return
      } else {
        return { name: 'login' }
      } 
    } catch (error) {
      return { name: 'login' }
    }
  } else {
    return
  }
})

export default router
