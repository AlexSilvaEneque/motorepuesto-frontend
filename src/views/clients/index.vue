<script setup lang="ts">
    import { ref, computed, onMounted, type Ref, watch } from 'vue';
    import { useRouter } from "vue-router";
    import type { IClient } from '../../interfaces/index';
    import useClient from "@/composables/client";
    import { useConfirm } from "primevue/useconfirm";
    import { getSeverityStatus } from '../../utils/index';
    import IBreadcrumb from "@/components/UI/IBreadcrumb.vue";

    const router = useRouter()
    const composable = useClient()
    const confirm = useConfirm()

    const clients : Ref<IClient[]> = ref([])
    const client = ref<IClient | null>()
    const searchInput = ref<string>('')
    const visible = ref(false)
    const loading = ref(false)


    const current = ref({
        label: 'Clientes',
        icon: 'pi pi-fw pi-users'
    })

    const goToView = () => {
        router.push({ name: 'new-client' })
    }

    const view = async (id: string) => {
        visible.value = true
        loading.value = true
        client.value = await composable.getById(id)
        loading.value = false
    }

    const redirectEdit = (id: string) => {
        router.push({ name: 'edit-client', params: { id } })
    }

    const deleteItem = async (id: string) => {
        confirm.require({
            group: 'positionDialog',
            message: '¿Seguro de eliminar?',
            header: 'Confirmar eliminación',
            icon: 'pi pi-info-circle',
            position: 'left',
            accept: async () => {
                await composable.deleteClient(id)
                clients.value = clients.value.filter(client => client._id !== id)
            },
            reject: () => {
                // router.push({ name: 'index-roles' })
            }
        })
    }

    const filteredClients = computed(() => {
      if (searchInput.value) {
        return clients.value.filter((client) => {
            return Object.values(client).some((prop) => {
                return String(prop).toLowerCase().includes(searchInput.value.toLowerCase())
            })
        })
      } else {
        return clients.value
      }
    })

    watch(visible, () => {
        if (!visible) {
            client.value = null
        }
    }, { deep: true })

    onMounted(async () => {
        clients.value = await composable.allClient()
    })

</script>

<template>
    <div class="w-full custom-2 bg-white border-round shadow-1 px-1 md:px-5 mt-3">
        <div class="md:flex md:mb-3 justify-content-between pt-2">
            <h1 class="text-2xl md:text-3xl text-800">Lista de clientes</h1>
            <IBreadcrumb
                :home="current"
            />
        </div>
        <div class="w-full">
            <div class="md:flex justify-content-end mb-3">
                <Button
                    label="Registrar cliente"
                    class="bg-primary no-underline text-sm md:text-md lg:text-base md:font-medium"
                    icon="pi pi-user-plus"
                    @click="goToView"
                />
            </div>

            <DataTable
                paginator
                :rows="5"
                :rowsPerPageOptions="[5,10,20]"
                :value="filteredClients"
                :global-filter-fields="['name']"
                class="p-datatable-sm width-table sm:w-auto"
                scrollable
            >
                <template #header>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="searchInput" placeholder="Buscar" />
                    </span>    
                </template>

                <template #empty>No hay data</template>
                
                <Column field="name" header="Nombre" sortable />
                <Column header="Tipo" sortable>
                    <template #body="prop">
                        {{ prop.data.type === 1 ? 'Natural' : 'Jurídico' }}
                    </template>
                </Column>
                <Column header="Estado">
                    <template #body="props">
                        <Tag :value="props.data.status ? 'Habilitado' : 'Inhabilitado' " :severity="getSeverityStatus(props.data)" />
                    </template>
                </Column>
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
    <Dialog v-model:visible="visible" modal header="Detalle Cliente">
        <div class="grid" v-if="client && !loading">
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Nombre/Razón social:</p>
                <span class="col">{{ client.name }}</span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Tipo cliente:</p>
                <span class="col">{{ client.type === 1 ? 'Natural' : 'Jurídico' }}</span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Documento:</p>
                <span class="col">{{ client.doc }}</span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Dirección:</p>
                <span class="col">{{ client.address }}</span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Teléfono:</p>
                <span class="col">{{ client.phone }}</span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Estado:</p>
                <Tag :value="client.status ? 'Habilitado' : 'Inhabilitado'" :severity="getSeverityStatus(client)" />
            </div>
        </div>

        <div v-else class="grid">
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Nombre/Razón social:</p>
                <span class="col"><Skeleton></Skeleton></span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Tipo cliente:</p>
                <span class="col"><Skeleton></Skeleton></span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Documento:</p>
                <span class="col"><Skeleton></Skeleton></span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Dirección:</p>
                <span class="col"><Skeleton></Skeleton></span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Teléfono:</p>
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