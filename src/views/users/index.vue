<script setup lang="ts">
    import { ref, computed, onMounted, watch } from "vue"
    import IBreadcrumb from '../../components/UI/IBreadcrumb.vue'
    import { useRouter } from "vue-router"
    import useUser from "@/composables/user"
    import { useUserStore } from "@/stores/user"
    import type { IRUser } from '../../interfaces/index'
    import type { Ref } from "vue"

    const router = useRouter()
    const composable = useUser()
    const userStore = useUserStore()

    const searchInput = ref('')
    const visible = ref(false)
    const user = ref()
    const loading = ref(false)

    const current = ref({
        label: 'Usuarios',
        icon: 'pi pi-fw pi-users'
    })

    const users : Ref<IRUser[]> = ref([])

    const filteredUsers = computed(() => {
      if (searchInput.value) {
        return users.value.filter(user => user.first_name.toLowerCase().includes(searchInput.value.toLowerCase()))

      } else {
        return users.value
      }
    })

    const goToView = () => {
        router.push({ name: 'new-user' })
    }

    const view = async (id : string) => {
        visible.value = true
        loading.value = true
        user.value = await composable.getById(id)
        loading.value = false
    }

    watch(visible, () => {
        console.log('cambio')
        if (!visible) {
            user.value = null
        }
    }, { deep: true })

    onMounted(async () => {
        await composable.allUser()
        users.value = userStore.users
        users.value = users.value.map((user, index) => {
            return { ...user, id: index + 1 }
        })
    })

</script>

<template>
    <div class="w-full custom-2 bg-white border-round shadow-1 px-1 md:px-5 mt-3">
        <div class="md:flex md:mb-3 justify-content-between pt-2">
            <h1 class="text-2xl md:text-3xl text-800">Lista de usuarios</h1>
            <IBreadcrumb
                :home="current"
            />
        </div>
        <div class="w-full">

            <div class="md:flex justify-content-end mb-3">
                <Button
                    label="Registrar usuario"
                    class="bg-primary no-underline text-sm md:text-md lg:text-base md:font-medium"
                    icon="pi pi-user-plus"
                    @click="goToView"
                />
            </div>

            <DataTable
                paginator
                :rows="5"
                :rowsPerPageOptions="[5,10,20]"
                :value="filteredUsers"
                :global-filter-fields="['name']"
                class="p-datatable-sm width-table sm:w-auto"
            >
                <template #header>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="searchInput" placeholder="Buscar" />
                    </span>    
                </template>

                <template #empty>No hay data</template>

                <Column field="id" header="ID" sortable />
                <Column field="first_name" header="Nombre" sortable />
                <!-- <Column field="last_name" header="Apellidos" sortable /> -->
                <Column field="email" header="Email" sortable />
                <Column header="Opciones">
                    <template #body="slotProps">
                        <div class="flex gap-1">
                            <Button
                                icon="pi pi-eye"
                                severity="info"
                                size="small"
                                outlined
                                @click="view(slotProps.data._id)"
                            />
                            <Button
                                icon="pi pi-pencil"
                                severity="success"
                                size="small"
                                outlined
                            />
                            <Button
                                icon="pi pi-trash"
                                severity="danger"
                                size="small"
                                outlined
                            />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>

    <Dialog v-model:visible="visible" modal header="Detalle del usuario" :style="{ width: '50vw' }">
        <div class="grid" v-if="user && !loading">
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Nombre:</p>
                <span class="col">{{ user.first_name }}</span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Apellidos:</p>
                <span class="col">{{ user.last_name }}</span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Email:</p>
                <span class="col">{{ user.email }}</span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Username:</p>
                <span class="col">{{ user.username ? user.username : 'Sin definir' }}</span>
            </div>
        </div>
    </Dialog>
</template>