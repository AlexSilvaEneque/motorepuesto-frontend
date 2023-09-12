<script setup lang="ts">
    import { ref, computed, onMounted, inject, type Ref } from 'vue'
    import IBreadcrumb from '../../components/UI/IBreadcrumb.vue'
    import { useRouter } from "vue-router"
    import useRole from '../../composables/rol'
    import type { IRRol } from '../../interfaces/index'
    import rolAPI from "@/api/rolAPI"
    import { useConfirm } from "primevue/useconfirm"
    import { useUserStore } from '../../stores/user'

    const router = useRouter()
    const composable = useRole()
    const user = useUserStore()

    const confirm = useConfirm()
    const toast : any = inject('toast')

    const searchInput = ref('')
    const visible = ref(false)
    const rol = ref()

    const current = ref({
        label: 'Roles',
        icon: 'pi pi-fw pi-briefcase'
    })

    const roles : Ref<IRRol[]> = ref([])

    const filteredRoles = computed(() => {
      if (searchInput.value) {
        return roles.value.filter(role => role.description!.toLowerCase().includes(searchInput.value.toLowerCase()))

      } else {
        return roles.value
      }
    })

    const goToView = () => {
        router.push({ name: 'new-role' })
    }

    const view = async (id : string) => {
        visible.value = true
        const { data } = await rolAPI.getById(id)
        rol.value = data
    }

    const redirectEdit = (id : string) => {
        router.push({ name: 'edit-role', params: { id } })
    }

    const deleteItem = (id : string) => {
        confirm.require({
            group: 'positionDialog',
            message: '¿Seguro de eliminar?',
            header: 'Confirmar eliminación',
            icon: 'pi pi-info-circle',
            position: 'left',
            accept: async () => {
                const { data } = await rolAPI.delete(id)
                toast.open({
                    message: data.msg,
                    type: 'success'
                })
                roles.value = roles.value.filter(role => role._id !== id)
            },
            reject: () => {
                router.push({ name: 'index-roles' })
            }
        })
    }

    onMounted(async () => {
        roles.value = await composable.allRoles()
        roles.value = roles.value.map((role, index) => {
            return { ...role, id: index + 1 }
        })
    })

</script>

<template>
    <div class="w-full custom-2 bg-white border-round shadow-1 px-1 md:px-5 mt-3">
        <div class="md:flex md:mb-3 justify-content-between pt-2">
            <h1 class="text-2xl md:text-3xl text-800">Lista de Roles</h1>
            <IBreadcrumb
                :home="current"
            />
        </div>
        <div class="w-full" v-if="roles.length > 0">

            <div class="md:flex justify-content-end mb-3" v-if="user.isAdmin">
                <Button
                    label="Registrar rol"
                    class="bg-primary no-underline text-sm md:text-md lg:text-base md:font-medium"
                    icon="pi pi-plus-circle"
                    @click="goToView"
                />
            </div>

            <DataTable
                paginator
                :rows="5"
                :rowsPerPageOptions="[5,10,20]"
                :value="filteredRoles"
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
                    <p class="text-center">
                        No hay coincidencias
                    </p>
                </template>

                <Column field="id" header="ID" sortable />
                <Column field="description" header="Nombre" sortable />
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
                                @click="redirectEdit(slotProps.data._id)"
                            />
                            <Button
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

    <Dialog v-model:visible="visible" modal header="Detalle del rol" :style="{ width: '50vw' }">
        <div class="flex" v-if="rol">
            <p class="font-medium mr-2">Nombre:</p>
            <span>{{ rol.description }}</span>
        </div>
    </Dialog>

    <ConfirmDialog group="positionDialog"></ConfirmDialog>
</template>