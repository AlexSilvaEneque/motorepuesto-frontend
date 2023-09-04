<script setup lang="ts">
    import { ref, provide, onMounted } from 'vue'
    import type {Ref} from 'vue'
    import type { ProToggle } from '../../interfaces/index'
    import SidebarOptions from '@/components/UI/SidebarOptions.vue'
    import SidebarMovil from '@/components/UI/SidebarMovil.vue'
    import IMenu from '@/components/UI/IMenu.vue'

    const toggle : Ref<boolean> = ref(false)
    const windowWidth : Ref<number> = ref(0)

    const change = () => {
        if (windowWidth.value >= 768) {
            return
        }
        toggle.value = !toggle.value
    }

    provide<ProToggle>('toggle', {
        toggle,
        changeToggle: change
    })

    const checkScreen = () => {
        windowWidth.value = window.innerWidth
        if (windowWidth.value >= 768) {
            toggle.value = false
        }
    }

    onMounted(() => {
        window.addEventListener('resize', checkScreen)
        checkScreen()
    })
</script>

<template>
    <div class="w-full grid grid-nogutter lg:gap-1 h-full">
            <div class="md:col-3 lg:col-2 hidden md:flex md:flex-column mt-1 bg-white shadow-2">
                
                <div class="h-5rem w-full mb-2 text-700 flex justify-content-center align-items-center">
                    <h1>Donny</h1>
                </div>

                <div class="flex flex-column gap-1 custom">
                    <SidebarOptions />
                </div>
            </div>

            <Sidebar
                v-model:visible="toggle"
                class="w-11"
            >
                <SidebarMovil />
            </Sidebar>

            <div class="col mx-2 ">
                <div class="w-full mx-auto bg-white shadow-2 h-5rem mt-1 mb-2 border-round flex align-items-center justify-content-between px-3">
                    <IMenu @change-visibility="change" />
                </div>

                <RouterView />
                
            </div>
        </div>
</template>

<style>
*, html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.custom {
    height: calc(100vh - 6.3rem);
}

.custom-2 {
    min-height: calc(100vh - 7rem);
}

.width-table {
    width: 290px;
}

@media (min-width: 320px) {
    .width-table {
        width: 290px;
        margin: auto;
    }
}

@media (min-width: 370px) {
    .width-table {
        width: 340px;
        margin: auto;
    }
}

@media (min-width: 424px) {
    .width-table {
        width: 390px;
        margin: auto;
    }

}

@media (min-width: 459px) {
    .width-table {
        width: 420px;
        margin: auto;
    }

}

@media (min-width: 535px) {
    .width-table {
        width: 490px;
        margin: auto;
    }

}
</style>