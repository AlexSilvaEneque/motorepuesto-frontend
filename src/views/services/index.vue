<script setup lang="ts">
    import { ref, computed, onMounted, type Ref, watch } from "vue";
    import { useRouter } from "vue-router";
    import type { IService } from '../../interfaces/index';
    import useService from "../../composables/service";
    import { useConfirm } from "primevue/useconfirm";
    import { getSeverityStatus, formatCurrency } from "@/utils";
    import IBreadcrumb from "@/components/UI/IBreadcrumb.vue";
    import Loading from '@/components/UI/Loading.vue';

    const router = useRouter()
    const composable = useService()
    const confirm = useConfirm()

    const services : Ref<IService[]> = ref([])
    const service = ref<IService | null>()
    const searchInput = ref<string>('')
    const visible = ref<boolean>(false)
    const loading = ref<boolean>(false)
    
    const current = ref({
        label: 'Servicios',
        icon: 'pi pi-fw pi-wrench'
    })

    const filteredServices = computed(() => {
        if (!searchInput.value) {
            return services.value
        }
        return services.value.filter((service) => {
            return Object.values(service).some((prop) => {
                return String(prop).toLowerCase().includes(searchInput.value.toLowerCase())
            })
        })
    })

    const goToView = () => {
        router.push({ name: 'new-service' })
    }

    const view = async (id : string) => {
        visible.value = true
        loading.value = true
        service.value = await composable.getById(id)
        loading.value = false
    }

    const redirectEdit = async (id : string) => {
        router.push({ name: 'edit-service', params: { id } })
    }

    const deleteItem = async ( id : string ) => {
        confirm.require({
            group: 'positionDialog',
            message: '¿Seguro de eliminar?',
            header: 'Confirmar eliminación',
            icon: 'pi pi-info-circle',
            position: 'left',
            accept: async () => {
                await composable.deleteService(id)
                services.value = services.value.filter(service => service._id !== id)
            },
            reject: () => {
                
            }
        })
    }

    onMounted(async () => {
        services.value = await composable.allServices()
    })
</script>

<template>
    <div class="w-full card custom-2 bg-white border-round shadow-1 px-1 md:px-5 mt-3">
        <div class="md:flex mb-3 md:justify-content-between pt-2">
            <h1 class="text-2xl md:text-3xl text-800">Lista de servicios</h1>
            <IBreadcrumb
                :home="current"
            />
        </div>
        <div class="w-full">
            <div class="md:flex justify-content-end mb-3">
                <Button
                    label="Registrar proveedor"
                    class="bg-primary no-underline text-sm md:text-md lg:text-base md:font-medium"
                    icon="pi pi-user-plus"
                    @click="goToView"
                />
            </div>

            <DataTable
                paginator
                :rows="5"
                :rowsPerPageOptions="[5,10,20]"
                :value="filteredServices"
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

                <Column field="description" header="Nombre" sortable />
                <Column header="Precio" sortable >
                    <template #body="prop">
                        {{ formatCurrency(Number(prop.data.price.$numberDecimal)) }}
                    </template>
                </Column>
                <Column header="Estado" >
                    <template #body="props">
                        <Tag :value="props.data.status ? 'Habilitado' : 'Inhabilitado'" :severity="getSeverityStatus(props.data)" />
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
    <Dialog v-model:visible="visible" modal header="Detalle Producto">
        <div class="grid" v-if="service && !loading">
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Nombre:</p>
                <span class="col">{{ service.description }}</span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Precio:</p>
                <span class="col">{{ formatCurrency(Number(service.price.$numberDecimal)) }}</span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Estado:</p>
                <Tag :value="service.status ? 'Habilitado' : 'Inhabilitado'" :severity="getSeverityStatus(service)" />
            </div>
        </div>
        <div v-else>
            <Loading />
        </div>
    </Dialog>

    <ConfirmDialog group="positionDialog" />
</template>