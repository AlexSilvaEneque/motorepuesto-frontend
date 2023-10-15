<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue';
    import { useRoute, useRouter } from "vue-router"
    import useSale from '../../composables/sale';
    import usePayment from '../../composables/usePayment';
    import type { ISale } from '../../interfaces/index';
  import { convertoDDMMYYYY } from '../../utils/date';
  import { formatCurrency } from '../../utils/index';

    const route = useRoute()
    const router = useRouter()
    const composable = useSale()
    const composablePayment = usePayment()
    const summary = ref<ISale | null>(null)
    const loading = ref<boolean>(false)
    const change = ref<string>()
    const recive = ref<string>()

    const client = computed(() => typeof summary.value?.client !== 'string' ? summary.value?.client.name : '')
    const seller = computed(() => typeof summary.value?.user !== 'string' ? summary.value?.user.first_name +' '+ summary.value?.user.last_name  : '')
    const stausPayment = computed(() => summary.value?.statusPayment ? 'Pagada' : 'Pendiente de pago')

    const submitOrder = async () => {
      console.log('idsss' + <string>route.params.id)
      const { id } = route.params
      localStorage.setItem('history', route.fullPath)
      let aux = await composablePayment.registerOrder(summary.value!, <string>id)
      if (aux.stateRes) {
        window.location.href = aux.link
      }
    }

    const verifyOnlyNumber = (event : KeyboardEvent) => {
      const key = event.key
      const regex = /^[0-9.]*$/
      if (!regex.test(key)) {
        event.preventDefault()
      }
    }

    const calculateChange = () => {
      let result = (recive.value! as any) - summary.value?.total.$numberDecimal!
      change.value = result.toString()
    }

    const getSummary = async () => {
      const { id } = route.params
      loading.value = true
      summary.value = await composable.getSaleById(<string>id)
      loading.value = false
    }

    const registerPay = async () => {
      await composablePayment.changeStatusPayment(summary.value?._id!)
      await getSummary()
      // router.push({ name: 'payment', params: { id: id } })
    }

    const isValid = computed(() => Number(recive.value!) >= summary.value?.total.$numberDecimal! &&  recive.value)

    onMounted(async () => {
      await getSummary()
    })
</script>

<template>
  <div class="w-full custom-2 bg-white border-round shadow-1 px-5 mt-3 pb-3 md:pb-0 md:pt-2">
    <h1 class="text-xl md:text-3xl">Resumen de compra</h1>
    <div class="grid mt-3" v-if="summary && !loading">
      <div class="col-12 md:col-6 grid">
          <p class="font-medium text-sm lg:text-base mr-2 col-4">Cliente:</p>
          <span class="col text-sm lg:text-base">{{ client }}</span>
      </div>
      <div class="col-12 md:col-6 grid">
          <p class="font-medium text-sm lg:text-base mr-2 col-4">Fecha de venta:</p>
          <span class="col text-sm lg:text-base">{{ convertoDDMMYYYY(summary.date) }}</span>
      </div>
      <div class="col-12 md:col-6 grid">
          <p class="font-medium text-sm lg:text-base mr-2 col-4">Vendedor:</p>
          <span class="col text-sm lg:text-base">{{ seller }}</span>
      </div>
      <div class="col-12 md:col-6 grid">
          <p class="font-medium text-sm lg:text-base mr-2 col-4">Estado venta:</p>
          <span class="col text-sm lg:text-base">{{ stausPayment }}</span>
      </div>
      <div class="col-12">
        <h4 class="mb-3 text-base">Detalle de la venta</h4>
        <DataTable :value="summary.detailProducts" class="p-datatable-sm width-detail-table1" >
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
      <div class="w-full flex justify-content-between align-items-center px-1 mt-3">
          <h4 class="text-base">Total {{ summary.statusPayment ? 'pagado:' : 'a pagar:' }} </h4>
          <span class="lg:text-lg font-medium">{{ formatCurrency(Number(summary.total.$numberDecimal)) }}</span>
      </div>
      </div>
    </div>

    <div v-else>
      Loading ...
    </div>

    <template v-if="!summary?.statusPayment && !loading">
      <template v-if="summary?.payment_type === '1'">
        <div class="w-full flex flex-column gap-1">
          <div class="flex justify-content-between align-items-center">
            <h5 class="">Monto recibido</h5>
            <InputText style="width: 90px;" v-model="recive" @keypress="verifyOnlyNumber" placeholder="00.00" @input="calculateChange" />
          </div>
          <div class="flex justify-content-between align-items-center">
            <h5>Vuelto</h5>
            <InputText style="width: 90px;" v-model="change" disabled />
          </div>
          <Button
            type="button"
            class="mt-2"
            label="Confirmar pago"
            :disabled="!(isValid as boolean)"
            @click="registerPay"
          />
        </div>
      </template>

      <template v-else>
        <div v-if="!summary?.statusPayment"
          class="flex align-items-center border-round-md bg-primary w-max px-2 cursor-pointer"
          @click="submitOrder"
        >
          <img src="/img/icons8-mercado-pago.svg" alt="" width="50">
          <span>Pagar con mercado pago</span>
        </div>
        <Button v-else
          label="Regresar a ventas"
          @click="$router.push({ name: 'index-sale' })"
        />
      </template>
    </template>
  </div>
</template>

<style scoped>

</style>