<script setup lang="ts">
    import { ref, inject } from 'vue'
    import type { ProToggle } from '../../interfaces/index'

    const { toggle, changeToggle } = inject('toggle') as ProToggle

    const items = ref([
        {
            label: 'Dashboard',
            icon: 'pi pi-home',
            to: '/',
            command: () => changeToggle()
        },
        {
            label: 'Clientes',
            icon: 'pi pi-users',
            to: '/clientes',
            command: () => changeToggle()
        },
        {
            label: 'Proveedores',
            icon: 'pi pi-truck',
            to: '/proveedores',
            command: () => changeToggle()
        },
        {
            label: 'Usuarios',
            icon: 'pi pi-users',
            to: '/usuarios',
            command: () => changeToggle()
        },
        {
            label: 'Perfil',
            icon: 'pi pi-user',
            to: '/mi-perfil',
            command: () => changeToggle()
        },
    ])
    
</script>

<template>
    <Menu :model="items" style="border: none; width: auto;" class="text-sm lg:text-lg" />
</template>