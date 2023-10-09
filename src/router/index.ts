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
          path: 'clientes/edit/:id',
          name: 'edit-client',
          component: () => import('../views/clients/edit.vue')
        },

        {
          path: 'proveedores',
          name: 'index-suppliers',
          meta: {
            isAdmin: true
          },
          component: () => import('../views/suppliers/index.vue')
        },
        {
          path: 'proveedores/nuevo',
          name: 'new-supplier',
          meta: {
            isAdmin: true
          },
          component: () => import('../views/suppliers/nuevo.vue')
        },
        {
          path: 'proveedores/edit/:id',
          name: 'edit-supplier',
          meta: {
            isAdmin: true
          },
          component: () => import('../views/suppliers/edit.vue')
        },

        {
          path: 'productos',
          name: 'index-product',
          component: () => import('../views/product/index.vue')
        },
        {
          path: 'productos/nuevo',
          name: 'new-product',
          component: () => import('../views/product/nuevo.vue')
        },
        {
          path: 'productos/edit/:id',
          name: 'edit-product',
          component: () => import('../views/product/edit.vue')
        },

        {
          path: 'servicios',
          name: 'index-service',
          component: () => import('../views/services/index.vue')
        },
        {
          path: 'servicios/nuevo',
          name: 'new-service',
          component: () => import('../views/services/nuevo.vue')
        },
        {
          path: 'servicios/edit/:id',
          name: 'edit-service',
          component: () => import('../views/services/edit.vue')
        },

        {
          path: 'ventas',
          name: 'index-sale',
          component: () => import('../views/sales/index.vue')
        },
        {
          path: 'ventas/nuevo',
          name: 'new-sale',
          component: () => import('../views/sales/nuevo.vue')
        },
        // {
        //   path: 'ventas/edit/:id',
        //   name: 'edit-sale',
        //   component: () => import('../views/sales/edit.vue')
        // },

        {
          path: 'roles',
          name: 'index-roles',
          meta: {
            isAdmin: true
          },
          component: () => import('../views/role/index.vue')
        },
        {
          path: 'roles/nuevo',
          name: 'new-role',
          meta: {
            isAdmin: true
          },
          component: () => import('../views/role/nuevo.vue')
        },
        {
          path: 'roles/edit/:id',
          name: 'edit-role',
          meta: {
            isAdmin: true
          },
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
          meta: {
            isAdmin: true
          },
          component: () => import('../views/users/nuevo.vue')
        },
        {
          path: 'usuarios/edit/:id',
          name: 'edit-user',
          meta: {
            isAdmin: true
          },
          component: () => import('../views/users/edit.vue')
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

// routes only for admins

router.beforeEach(async(to, from) => {
  const isAdmin = to.matched.some(url => url.meta.isAdmin)
  if (isAdmin) {
    try {
      const { data } = await AuthAPI.admin()
      if (data) {
        return
      } else {
        return { name: 'dashboard' }  
      }
    } catch (error) {
      return { name: 'dashboard' }
    }
  }
})

export default router
