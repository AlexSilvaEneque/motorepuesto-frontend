<script setup lang="ts">
    import { ref, inject } from 'vue'
    import type { ProToggle } from '../../interfaces/index'

    const { toggle, changeToggle } = inject('toggle') as ProToggle

    const items = ref([
        {
            label: 'Dashboard',
            icon: 'pi pi-home',
            to: '/admin/dashboard',
            command: () => changeToggle()
        },
        {
            label: 'Clientes',
            icon: 'pi pi-users',
            to: '/admin/clientes',
            command: () => changeToggle()
        },
        {
            label: 'Productos',
            icon: 'pi pi-qrcode',
            to: '/admin/productos',
            command: () => changeToggle()
        },
        // {
        //     label: 'Servicios',
        //     icon: 'pi pi-wrench',
        //     to: '/servicios',
        //     command: () => changeToggle()
        // },
        {
            label: 'Ventas',
            icon: 'pi pi-money-bill',
            to: '/admin/ventas',
            command: () => changeToggle()
        },
        {
            label: 'Gastos e Ingresos',
            icon: 'pi pi-calculator',
            to: '/admin/gastos-ingresos',
            command: () => changeToggle()
        },
        {
            label: 'Perfil',
            icon: 'pi pi-user',
            to: '/admin/mi-perfil',
            command: () => changeToggle()
        },
    ])
    
</script>

<template>
    <Menu :model="items" style="border: none; width: auto;" class="text-lg" />
</template>