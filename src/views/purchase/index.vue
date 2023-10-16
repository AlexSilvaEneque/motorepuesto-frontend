<script setup lang="ts">
    import { ref, computed, onMounted, watch, inject, type Ref } from "vue"
    import { useRouter } from "vue-router"
    import usePurchase from '../../composables/purchase';
    import { useConfirm } from "primevue/useconfirm"
    import { getSeverityStatus } from "@/utils"
    import IBreadcrumb from '@/components/UI/IBreadcrumb.vue'
    import QrcodeVue from 'qrcode.vue'
    import { convertoDDMMYYYY } from '../../utils/date';
    import { formatCurrency } from '../../utils/index';
    import type { IPurchase } from '../../interfaces/index';

    const router = useRouter()
    const composable = usePurchase()

    const confirm = useConfirm()
    const toast : any = inject('toast')

    const searchInput = ref('')
    const visible = ref(false)
    const purchase = ref<IPurchase | null>()
    const loading = ref(false)
    const linkQr = ref<string>()

    const current = ref({
        label: 'Compras',
        icon: 'pi pi-fw pi-cart-plus'
    })

    const purchases : Ref<IPurchase[]> = ref([])

    const filteredPurchase = computed(() => {
      if (searchInput.value) {
        return purchases.value.filter(sale => {
            return Object.values(sale).some(value => {
                return String(value).toLowerCase().includes(searchInput.value.toLowerCase())
            })
        })
      } else {
        return purchases.value
      }
    })

    // const linkQr = computed<string>(() => sale.value?.statusPayment ? : )

    const goToView = () => {
        router.push({ name: 'new-purchase' })
    }

    const view = async (id : string) => {
        visible.value = true
        loading.value = true
        purchase.value = await composable.getPurchaseById(id)
        loading.value = false
    }

    const deleteItem = async (id : string) => {
        confirm.require({
            group: 'positionDialog',
            message: '¿Seguro de eliminar?',
            header: 'Confirmar eliminación',
            icon: 'pi pi-info-circle',
            position: 'left',
            accept: async () => {
                await composable.deletePurchase(id)
                purchases.value = purchases.value.filter(purchase => purchase._id !== id)
            },
            reject: () => {
                
            }
        })
    }

    watch(visible, () => {
        if (!visible) {
            purchase.value = null
        }
    }, { deep: true })

    onMounted(async () => {
        purchases.value = await composable.getAllPurchase()
    })

</script>

<template>
    <div class="w-full custom-2 bg-white border-round shadow-1 px-1 md:px-5 mt-3">
        <div class="md:flex md:mb-3 justify-content-between pt-2">
            <h1 class="text-2xl md:text-3xl text-800">Lista de compras</h1>
            <IBreadcrumb
                :home="current"
            />
        </div>
        <!-- <div class="w-full" v-if="purchases.length > 0"> -->

            <div class="md:flex justify-content-end mb-3">
                <Button
                    label="Registrar compra"
                    class="bg-primary no-underline text-sm md:text-md lg:text-base md:font-medium"
                    icon="pi pi-plus-circle"
                    @click="goToView"
                />
            </div>

            <DataTable
                paginator
                :rows="5"
                :rowsPerPageOptions="[5,10,20]"
                :value="filteredPurchase"
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

                <Column header="Proveedor" sortable >
                    <template #body="prop">
                        {{ prop.data.supplier.social_reason }}
                    </template>
                </Column>

                <Column header="Fecha" sortable >
                    <template #body="prop">
                        {{ convertoDDMMYYYY(prop.data.date) }}
                    </template>
                </Column>

                <Column header="Monto" sortable >
                    <template #body="prop">
                        {{ formatCurrency(Number(prop.data.total.$numberDecimal)) }}
                    </template>
                </Column>

                <Column header="Estado" sortable >
                    <template #body="prop">
                        <Tag :value="prop.data.status ? 'Pagada' : 'Pendiente de pago'" :severity="getSeverityStatus(prop.data)" />
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
                            <!-- <Button
                                icon="pi pi-pencil"
                                severity="success"
                                size="small"
                                outlined
                                @click="redirectEdit(slotProps.data._id)"
                            /> -->
                            <Button
                                :disabled="!slotProps.data.status"
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
        <!-- </div> -->
    </div>

    <Dialog v-model:visible="visible" modal header="Compra">
        <div class="" v-if="purchase && !loading">
            <div class="lg:flex lg:justify-content-between lg:flex-wrap">
                <div class="lg:flex-1">
                    <div class="col-12 grid">
                        <p class="font-medium mr-2 col-6">Fecha:</p>
                        <span class="col">{{ convertoDDMMYYYY(purchase.date) }}</span>
                    </div>
                    <div class="col-12 grid">
                        <p class="font-medium mr-2 col-6">Proveedor:</p>
                        <span class="col">
                            {{ typeof purchase.supplier !== 'string' ? purchase.supplier.social_reason : '' }}
                        </span>
                    </div>
                    <div class="col-12 grid">
                        <p class="font-medium mr-2 col-6">Comprador:</p>
                        <span class="col">
                            {{ typeof purchase.user !== 'string' ? purchase.user.first_name : '' }}
                        </span>
                    </div>
                    <div class="col-12 grid">
                        <p class="font-medium mr-2 col-6">Estado:</p>
                        <Tag :value="purchase.status ? 'Habilitada' : 'Eliminada'" :severity="getSeverityStatus(purchase)" />
                    </div>
                </div>
            </div>

            <div class="w-full">
                <h4 class="mb-1 mt-1">Detalle de la compra</h4>
                <template v-if="purchase.detailProducts">
                    <DataTable :value="purchase.detailProducts" class="p-datatable-sm width-detail-table" scrollable scroll-height="200px">
                        <Column header="Producto/Servicio" style="width: auto">
                            <template #body="prop">
                                {{ prop.data.products.name }}
                            </template>
                        </Column>
                        <Column header="Cantidad" style="width: 15%">
                            <template #body="prop">
                                {{ prop.data.quantity }}
                            </template>
                        </Column>
                        <Column header="Precio" style="width: 15%">
                            <template #body="prop">
                                {{ formatCurrency(Number(prop.data.products.price.$numberDecimal)) }}
                            </template>
                        </Column>
                        <Column header="Subtotal" style="width: 15%">
                            <template #body="prop">
                                <span style="float: right;">
                                    {{ formatCurrency(Number(prop.data.products.price.$numberDecimal * prop.data.quantity)) }}
                                </span>
                            </template>
                        </Column>
                    </DataTable>
                </template>
                <div class="w-full flex justify-content-between align-items-center px-1 mt-2">
                    <h4>Total pagado</h4>
                    <span class="text-lg font-medium">{{ formatCurrency(Number(purchase.total.$numberDecimal)) }}</span>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="lg:flex lg:justify-content-between lg:flex-wrap">
                <div class="lg:flex-1">
                    <div class="col-12 grid">
                        <p class="font-medium mr-2 col-4">Fecha:</p>
                        <span class="col"><Skeleton></Skeleton></span>
                    </div>
                    <div class="col-12 grid">
                        <p class="font-medium mr-2 col-4">Cliente:</p>
                        <span class="col"><Skeleton></Skeleton></span>
                    </div>
                    <div class="col-12 grid">
                        <p class="font-medium mr-2 col-4">Método de pago:</p>
                        <span class="col"><Skeleton></Skeleton></span>
                    </div>
                    <div class="col-12 grid">
                        <p class="font-medium mr-2 col-4">Vendedor:</p>
                        <span class="col"><Skeleton></Skeleton></span>
                    </div>
                    <div class="col-12 grid">
                        <p class="font-medium mr-2 col-4">Estado:</p>
                        <span class="col"><Skeleton></Skeleton></span>
                    </div>
                </div>
            </div>
            
            <div class="w-full">
                <h4 class="mb-1">Detalle de la compra</h4>
                <DataTable class="p-datatable-sm width-detail-table" scrollable scroll-height="200px">
                    <Column header="Producto">
                        <Skeleton></Skeleton>
                    </Column>
                    <Column header="Cantidad">
                        <Skeleton></Skeleton>
                    </Column>
                    <Column header="Precio">
                        <Skeleton></Skeleton>
                    </Column>
                    <Column header="Subtotal">
                        <Skeleton></Skeleton>
                    </Column>
                </DataTable>
                <div class="w-full flex justify-content-between align-items-center px-1 mt-2">
                    <h4>Total pagado:</h4>
                    <span class="text-lg font-medium col"><Skeleton></Skeleton></span>
                </div>
            </div>
        </div>
    </Dialog>

    <ConfirmDialog group="positionDialog" />
</template>