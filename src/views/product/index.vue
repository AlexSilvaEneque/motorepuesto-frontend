<script setup lang="ts">
    import { ref, computed, onMounted, type Ref, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import type { IProduct } from '../../interfaces/index';
    import useProduct from '@/composables/product';
    import { useConfirm } from 'primevue/useconfirm';
    import { formatCurrency, getSeverityStatus } from '../../utils/index';
    import IBreadcrumb from '@/components/UI/IBreadcrumb.vue';
    
    const router = useRouter()
    const composable = useProduct()
    const confirm = useConfirm()

    const products : Ref<IProduct[]> = ref([])
    const product = ref<IProduct | null>()
    const searchInput = ref<string>('')
    const visible = ref<boolean>(false)
    const loading = ref<boolean>(false)

    const current = ref({
        label: 'Productos',
        icon: 'pi pi-fw pi-qrcode'
    })

    const goToView = () => {
        router.push({ name: 'new-product' })
    }

    const view = async (id : string) => {
        visible.value = true
        loading.value = true
        product.value = await composable.getById(id)
        loading.value = false
    }

    const redirectEdit = async (id : string) => {
        router.push({ name: 'edit-product', params: { id } })
    }

    const deleteItem = async (id : string) => {
        confirm.require({
            group: 'positionDialog',
            message: '¿Seguro de eliminar?',
            header: 'Confirmar eliminación',
            icon: 'pi pi-info-circle',
            position: 'left',
            accept: async () => {
                await composable.deleteProduct(id)
                products.value = products.value.filter(product => product._id !== id)
            },
            reject: () => {
                
            }
        })
    }

    const getSeverity = (product : IProduct) : string => {
        if (product.quantity === 0) return 'danger'

        if (product.quantity > 0 && product.quantity <= 10) return 'warning'

        return 'success'
    }

    const filteredProducts = computed<IProduct[]>(() => {
        if (!searchInput.value) {
            return products.value
        }
        return products.value.filter((product) => {
            return Object.values(product).some((prop) => {
                return String(prop).toLowerCase().includes(searchInput.value.toLowerCase())
            })
        })
    })

    watch(visible, () => {
        if (!visible) {
            product.value = null
        }
    }, { deep: true })

    onMounted(async() => {
        products.value = await composable.allProducts()
    })

</script>

<template>
    <div class="w-full custom-2 bg-white border-round shadow-1 px-1 md:px-5 mt-3">
        <div class="md:flex md:mb-3 justify-content-between pt-2">
            <h1 class="text-2xl md:text-3xl text-800">Lista de productos</h1>
            <IBreadcrumb
                :home="current"
            />
        </div>
        <div class="w-full">
            <div class="md:flex justify-content-end mb-3">
                <Button
                    label="Registrar producto"
                    class="bg-primary no-underline text-sm md:text-md lg:text-base md:font-medium"
                    icon="pi pi-plus-circle"
                    @click="goToView"
                />
            </div>

            <DataTable
                paginator
                :rows="5"
                :rowsPerPageOptions="[5,10,20]"
                :value="filteredProducts"
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
                <Column header="Precio" sortable>
                    <template #body="prop">
                        {{ formatCurrency(Number(prop.data.price.$numberDecimal)) }}
                    </template>
                </Column>
                <Column header="Cantidad">
                    <template #body="props">
                        <Tag :value="`${props.data.quantity} en stock`" :severity="getSeverity(props.data)" />
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
        <div class="grid" v-if="product && !loading">
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Nombre:</p>
                <span class="col">{{ product.name }}</span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Cantidad:</p>
                <span class="col">{{ product.quantity }}</span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Precio:</p>
                <span class="col">{{ formatCurrency(Number(product.price.$numberDecimal)) }}</span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Estado:</p>
                <Tag :value="product.status ? 'Habilitado' : 'Inhabilitado'" :severity="getSeverityStatus(product)" />
            </div>
        </div>
        <div v-else class="grid">
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Nombre:</p>
                <span class="col"><Skeleton></Skeleton></span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Cantidad:</p>
                <span class="col"><Skeleton></Skeleton></span>
            </div>
            <div class="col-12 grid">
                <p class="font-medium mr-2 col-4">Precio:</p>
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