<script setup lang="ts">
  import { ref } from "vue"
    import { useUserStore } from '../../stores/user';
    
    defineEmits(['changeVisibility'])

    const useStore = useUserStore()

    const menu = ref()
    const items = ref([
        {
            label: 'Mi perfil',
            icon: 'pi pi-user',
            to: '/admin/mi-perfil'
        },
        {
            label: 'Cerrar sesión',
            icon: 'pi pi-sign-out',
            command: () => {
                useStore.logout()
            }       
        }
    ])

    const toggle = (event : any) => {
        menu.value.toggle(event)
    }
</script>

<template>
    <div>
        <Button
            icon="pi pi-align-justify"
            class="md:hidden text-800"
            rounded
            text
            @click="$emit('changeVisibility')"
        />
    </div>
    <div>
        <!-- <Button 
            class="border-circle w-3rem h-3rem text-800" text rounded
            icon="pi pi-bell md:text-xl"
        /> -->
        <Button 
            class="border-circle w-3rem h-3rem text-800" text rounded
            icon="pi pi-user md:text-xl"
            aria-haspopup="true"
            aria-controls="overlay_menu"
            @click="toggle"
        />
        <Menu
            ref="menu"
            id="overlay_menu"
            :model="items"
            :popup="true"
            class="text-sm md:text-base"
        />
    </div>
</template>