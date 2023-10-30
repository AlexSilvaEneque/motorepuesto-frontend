<script setup lang="ts">
    import { ref, computed, onMounted, watch, inject, type Ref } from "vue"
    import { useRouter } from "vue-router"
    import type { ISale } from '../../interfaces/index'
    import useSale from '../../composables/sale';
    import { useConfirm } from "primevue/useconfirm"
    import { getSeverityStatus } from "@/utils"
    import IBreadcrumb from '@/components/UI/IBreadcrumb.vue'
    import QrcodeVue from 'qrcode.vue'
    import { convertoDDMMYYYY } from '../../utils/date';
    import { formatCurrency } from '../../utils/index';


    const router = useRouter()
    const composable = useSale()

    const confirm = useConfirm()
    const toast : any = inject('toast')

    const searchInput = ref('')
    const visible = ref(false)
    const sale = ref<ISale | null>()
    const loading = ref(false)
    const linkQr = ref<string>()

    const current = ref({
        label: 'Ventas',
        icon: 'pi pi-fw pi-money-bill'
    })

    const sales : Ref<ISale[]> = ref([])

    const filteredSale = computed(() => {
      if (searchInput.value) {
        return sales.value.filter(sale => {
            return Object.values(sale).some(value => {
                return String(value).toLowerCase().includes(searchInput.value.toLowerCase())
            })
        })
      } else {
        return sales.value
      }
    })

    // const linkQr = computed<string>(() => sale.value?.statusPayment ? : )

    const goToView = () => {
        router.push({ name: 'new-sale' })
    }

    const view = async (id : string) => {
        visible.value = true
        loading.value = true
        sale.value = await composable.getSaleById(id)
        linkQr.value = import.meta.env.VITE_URL_FRONT + 'payment/' + sale.value?._id
        loading.value = false
    }

    const redirectEdit = (id : string) => {
        
    }

    const redirectPDF = (id : string) => {
        window.open('http://localhost:3000/'+id, '_blank')
    }

    const deleteItem = async (id : string) => {
        confirm.require({
            group: 'positionDialog',
            message: '¿Seguro de eliminar?',
            header: 'Confirmar eliminación',
            icon: 'pi pi-info-circle',
            position: 'left',
            accept: async () => {
                await composable.deleteSale(id)
                sales.value = sales.value.filter(sale => sale._id !== id)
            },
            reject: () => {
                
            }
        })
    }

    watch(visible, () => {
        if (!visible) {
            sale.value = null
        }
    }, { deep: true })

    const pdf = () => {
        window.print()
    }

    onMounted(async () => {
        sales.value = await composable.allSales()
    })

</script>

<template>
    <div class="w-full custom-2 bg-white border-round shadow-1 px-1 md:px-5 mt-3">
        <div class="md:flex md:mb-3 justify-content-between pt-2">
            <h1 class="text-2xl md:text-3xl text-800">Lista de ventas</h1>
            <IBreadcrumb
                :home="current"
            />
        </div>
        <!-- <div class="w-full" v-if="sales.length > 0"> -->

            <div class="md:flex justify-content-end mb-3">
                <Button
                    label="Registrar venta"
                    class="bg-primary no-underline text-sm md:text-md lg:text-base md:font-medium"
                    icon="pi pi-plus-circle"
                    @click="goToView"
                />
            </div>

            <DataTable
                paginator
                :rows="5"
                :rowsPerPageOptions="[5,10,20]"
                :value="filteredSale"
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

                <Column header="Cliente" sortable >
                    <template #body="prop">
                        {{ prop.data.client.name }}
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
                        <Tag :value="prop.data.statusPayment ? 'Pagada' : 'Pendiente de pago'" :severity="getSeverityStatus(prop.data)" />
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

    <Dialog v-model:visible="visible" modal header="Detalle de la venta">
        <div class="" v-if="sale && !loading">
            <div class="lg:flex lg:justify-content-between lg:flex-wrap">
                <div class="lg:flex-1">
                    <div class="col-12 grid">
                        <p class="font-medium mr-2 col-6">Fecha:</p>
                        <span class="col">{{ convertoDDMMYYYY(sale.date) }}</span>
                    </div>
                    <div class="col-12 grid">
                        <p class="font-medium mr-2 col-6">Cliente:</p>
                        <span class="col">
                            {{ typeof sale.client !== 'string' ? sale.client.name : '' }}
                        </span>
                    </div>
                    <!-- <div class="col-12 grid">
                        <p class="font-medium mr-2 col-6">Medio de pago:</p>
                        <span class="col">{{ sale.payment_type }}</span>
                    </div> -->
                    <div class="col-12 grid">
                        <p class="font-medium mr-2 col-6">Vendedor:</p>
                        <span class="col">
                            {{ typeof sale.user !== 'string' ? sale.user.first_name : '' }}
                        </span>
                    </div>
                    <div class="col-12 grid">
                        <p class="font-medium mr-2 col-6">Estado:</p>
                        <Tag :value="sale.statusPayment ? 'Pagada' : 'Pendiente de pago'" :severity="getSeverityStatus(sale)" />
                    </div>
                </div>
                <div class="flex flex-column justify-content-center">
                    <template v-if="sale.statusPayment">
                        <!-- <h5 class="text-center mb-1">Scanee el QR</h5>
                        <div class="w-full text-center">
                            <QrcodeVue :value="linkQr" level="H" :size="100" render-as="svg" />
                        </div>
                        <h5>o click en el botón</h5> -->
                        <Button
                            type="button"
                            class="mt-1"
                            label="Boleta"
                            size="small"
                            @click="redirectPDF(sale._id!)"
                            />
                            <!-- @click="$router.push({ name: 'payment', params: { id: sale._id } })" -->
                            <!-- @click="pdf" -->
                    </template>
                    <Button v-else
                        type="button"
                        class="mt-1"
                        label="Pagar"
                        size="small"
                        @click="$router.push({ name: 'payment', params: { id: sale._id } })"
                    />
                </div>
            </div>

            <div class="w-full">
                <h4 class="mb-1 mt-1">Detalle de la venta</h4>
                <template v-if="sale.detailProducts">
                    <DataTable :value="sale.detailProducts" class="p-datatable-sm width-detail-table" scrollable scroll-height="200px">
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
                    <h4>Total {{ sale.statusPayment ? 'pagado:' : 'a pagar:' }} </h4>
                    <span class="text-lg font-medium">{{ formatCurrency(Number(sale.total.$numberDecimal)) }}</span>
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
                <div class="flex flex-column justify-content-center">
                    <!-- <h5 class="text-center mb-1"><Skeleton></Skeleton></h5>
                    <div class="w-full text-center">
                        <Skeleton width="100px" height="100px"></Skeleton>
                    </div>
                    <h5 class="mb-1"><Skeleton></Skeleton></h5> -->
                    <Skeleton width="100px" height="20px"></Skeleton>
                </div>
            </div>
            
            <div class="w-full">
                <h4 class="mb-1">Detalle de la venta</h4>
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