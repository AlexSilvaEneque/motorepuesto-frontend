<script setup lang="ts">
    import { ref, provide, onMounted } from 'vue'
    import type {Ref} from 'vue'
    import type { ProToggle } from '../../interfaces/index'
    import SidebarOptions from '@/components/UI/SidebarOptions.vue'
    import SidebarOptionsVendedor from '@/components/UI/SidebarOptionsVendedor.vue'
    import SidebarMovil from '@/components/UI/SidebarMovil.vue'
    import IMenu from '@/components/UI/IMenu.vue'
    import { useUserStore } from '../../stores/user'
    import AuthAPI from '@/api/AuthAPI'
    import SidebarMovilVendedor from '@/components/UI/SidebarMovilVendedor.vue'

    const user = useUserStore()

    const toggle : Ref<boolean> = ref(false)
    const windowWidth : Ref<number> = ref(0)
    const flagAdmin : Ref<boolean> = ref(false)

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

    onMounted(async () => {
        window.addEventListener('resize', checkScreen)
        checkScreen()

        try {
            const { data } = await AuthAPI.admin()
            if (data) {
                flagAdmin.value = true
            } else {
                flagAdmin.value = false
            } 
        } catch (error) {
            flagAdmin.value = false
        }
    })
</script>

<template>
    <div class="w-full grid grid-nogutter lg:gap-1 h-full">
            <div class="md:col-3 lg:col-2 hidden md:flex md:flex-column mt-1 bg-white shadow-2">
                
                <div class="h-5rem w-full mb-2 text-700 flex justify-content-center align-items-center">
                    <h1>Donny</h1>
                </div>

                <div class="flex flex-column gap-1 custom">
                    <template v-if="flagAdmin">
                        <SidebarOptions />
                    </template>
                    <template v-else>
                        <SidebarOptionsVendedor />
                    </template>
                </div>
            </div>

            <Sidebar
                v-model:visible="toggle"
                class="w-11"
            >
                <template v-if="flagAdmin">
                    <SidebarMovil />
                </template>
                <template v-else>
                    <SidebarMovilVendedor />
                </template>
            </Sidebar>

            <div class="col mx-2">
                <div class="w-full mx-auto bg-white shadow-2 h-5rem mt-1 mb-2 border-round flex align-items-center justify-content-between px-3">
                    <IMenu @change-visibility="change" />
                </div>

                <div class="w-full">
                    <RouterView />
                </div>
                
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

.width-detail-table {
    width: 270px;
}

.width-detail-table1 {
    width: 250px;
}

.width-detail-table-sale {
    width: 320px;
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
    .width-detail-table1 {
        width: 310px;
    }
}

@media (min-width: 424px) {
    .width-table {
        width: 390px;
        margin: auto;
    }
    .width-detail-table {
        width: 360px;
    }
    .width-detail-table1 {
        width: 360px;
    }
    .width-detail-table-sale {
        width: 360px;
    }
}

@media (min-width: 459px) {
    .width-table {
        width: 420px;
        margin: auto;
    }
    .width-detail-table {
        width: 390px;
    }
    .width-detail-table1 {
        width: 380px;
    }
    .width-detail-table-sale {
        width: auto;
    }
}

@media (min-width: 535px) {
    .width-table {
        width: 490px;
        margin: auto;
    }
    .width-detail-table {
        width: 420px;
    }
    .width-detail-table1 {
        width: 100%;
    }
}

</style>