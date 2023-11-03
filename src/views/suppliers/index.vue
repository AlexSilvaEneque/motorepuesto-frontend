<script setup lang="ts">
    import { ref, computed, onMounted, type Ref, watch } from "vue";
    import { useRouter } from "vue-router";
    import type { ISupplier } from "../../interfaces/index";
    import useSupplier from "@/composables/supplier";
    import { useConfirm } from "primevue/useconfirm";
    import { getSeverityStatus } from "@/utils";
    import IBreadcrumb from "@/components/UI/IBreadcrumb.vue";

    const router = useRouter()
    const composable = useSupplier()
    const confirm = useConfirm()
    
    const suppliers : Ref<ISupplier[]> = ref([])
    const supplier = ref<ISupplier | null>()
    const searchInput = ref<string>('')
    const visible = ref<boolean>(false)
    const loading = ref<boolean>(false)

    const current = ref({
        label: 'Proveedores',
        icon: 'pi pi-fw pi-truck'
    })

    const filteredSuppliers = computed(() => {
        if (!searchInput.value) {
            return suppliers.value
        }
        return suppliers.value.filter((supplier) => {
            return Object.values(supplier).some((prop) => {
                return String(prop).toLowerCase().includes(searchInput.value.toLowerCase())
            })
        })
    })

    const goToView = () => {
        router.push({ name: 'new-supplier' })
    }

    const view = async (id : string) => {
        visible.value = true
        loading.value = true
        supplier.value = await composable.getById(id)
        loading.value = false
    }

    const redirectEdit = (id : string) => {
        router.push({ name: 'edit-supplier', params: { id } })
    }

    const deleteItem = async (id : string) => {
        confirm.require({
            group: 'positionDialog',
            message: '¿Seuro de eliminar?',
            header: 'Confirmar eliminación',
            icon: 'pi pi-info-circle',
            position: 'left',
            accept: async () => {
                await composable.deleteSupplier(id)
                suppliers.value = suppliers.value.filter(supplier => supplier._id !== id)
            },
            reject: () => {

            }
        })
    }

    watch(visible, () => {
        if (!visible) {
            supplier.value = null
        }
    }, { deep: true })

    onMounted(async () => {
        suppliers.value = await composable.allSupplier()
    })
</script>

<template>
    <div class="w-full card custom-2 bg-white border-round shadow-1 px-1 md:px-5 mt-3">
        <div class="md:flex mb-3 md:justify-content-between pt-2">
            <h1 class="text-2xl md:text-3xl text-800">Lista de proveedores</h1>
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
                :value="filteredSuppliers"
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

                <template #empty>
                    <div class="w-full flex justify-content-center">
                        No hay registros
                    </div>
                </template>

                <Column field="social_reason" header="Nombre" sortable />
                <Column field="representative" header="Representante" sortable />
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
        <div class="grid" v-if="supplier && !loading">
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Nombre:</p>
                <span class="col">{{ supplier.social_reason }}</span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Representante:</p>
                <span class="col">{{ supplier.representative }}</span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Dirección:</p>
                <span class="col">{{ supplier.address }}</span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Teléfono:</p>
                <span class="col">{{ supplier.phono }}</span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Email:</p>
                <span class="col">{{ supplier.email }}</span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Estado:</p>
                <Tag :value="supplier.status ? 'Habilitado' : 'Inhabilitado'" :severity="getSeverityStatus(supplier)" />
            </div>
        </div>
        <div class="grid" v-else>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Nombre:</p>
                <span class="col"><Skeleton></Skeleton></span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Representante:</p>
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
                <p class="font-medium mr-2 col-4">Email:</p>
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