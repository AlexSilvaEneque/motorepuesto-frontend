<script setup lang="ts">
    import { ref, computed, onMounted, watch, inject, type Ref } from "vue"
    import { useRouter } from "vue-router"
    import useUser from "@/composables/user"
    import type { IRUser } from '../../interfaces/index'
    import { useConfirm } from "primevue/useconfirm"
    import { useUserStore } from '../../stores/user'
    import { getSeverityStatus } from "@/utils"
    import IBreadcrumb from '@/components/UI/IBreadcrumb.vue'

    const userStore = useUserStore()

    const router = useRouter()
    const composable = useUser()

    const confirm = useConfirm()
    const toast : any = inject('toast')

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

    const redirectEdit = (id : string) => {
        router.push({ name: 'edit-user', params: { id } })
    }

    const deleteItem = async (id : string) => {
        confirm.require({
            group: 'positionDialog',
            message: '¿Seguro de eliminar?',
            header: 'Confirmar eliminación',
            icon: 'pi pi-info-circle',
            position: 'left',
            accept: async () => {
                const { data } = await composable.deleteUser(id)
                toast.open({
                    message: data.msg,
                    type: 'success'
                })
                users.value = users.value.filter(user => user._id !== id)
            },
            reject: () => {
                // router.push({ name: 'index-users' })
            }
        })
    }

    watch(visible, () => {
        if (!visible) {
            user.value = null
        }
    }, { deep: true })

    onMounted(async () => {
        users.value = await composable.allUser()
        // users.value = users.value.map((user, index) => {
        //     return { ...user, id: index + 1 }
        // })
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
        <div class="w-full" v-if="users.length > 0">

            <div v-if="userStore.isAdmin" class="md:flex justify-content-end mb-3">
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

                <template #empty>
                    <div class="w-full flex justify-content-center">
                        No hay registros
                    </div>
                </template>

                <Column field="first_name" header="Nombre" sortable />
                <Column header="Rol" sortable >
                    <template #body="prop">
                        {{ prop.data.role.description }}
                    </template>
                </Column>
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
                            <Button v-if="userStore.isAdmin"
                                icon="pi pi-pencil"
                                severity="success"
                                size="small"
                                outlined
                                @click="redirectEdit(slotProps.data._id)"
                            />
                            <Button v-if="userStore.isAdmin"
                                icon="pi pi-trash"
                                severity="danger"
                                size="small"
                                outlined
                                @click="deleteItem(slotProps.data._id)"
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
                <span class="col">{{ user.username }}</span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Celular:</p>
                <span class="col">{{ user.celular }}</span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Rol:</p>
                <span class="col">{{ user.role.description }}</span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Estado:</p>
                <Tag :value="user.status ? 'Habilitado' : 'Inhabilitado'" :severity="getSeverityStatus(user)" />
            </div>
        </div>
        <div v-else>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Nombre:</p>
                <span class="col"><Skeleton></Skeleton></span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Apellidos:</p>
                <span class="col"><Skeleton></Skeleton></span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Email:</p>
                <span class="col"><Skeleton></Skeleton></span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Username:</p>
                <span class="col"><Skeleton></Skeleton></span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Celular:</p>
                <span class="col"><Skeleton></Skeleton></span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Rol:</p>
                <span class="col"><Skeleton></Skeleton></span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Estado:</p>
                <span class="col"><Skeleton></Skeleton></span>
            </div>
        </div>
    </Dialog>

    <ConfirmDialog group="positionDialog" />
</template>