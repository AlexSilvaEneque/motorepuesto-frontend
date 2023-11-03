<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue';
    import type { ISale } from '../../interfaces/index';
    import { convertoDDMMYYYY } from '../../utils/date';
    import { formatCurrency } from '../../utils/index';

    const props = defineProps<{
        summary: ISale,
        loading: boolean
    }>()

    const client = computed(() => typeof props.summary.client !== 'string' ? props.summary?.client.name : '')
    const seller = computed(() => typeof props.summary.user !== 'string' ? props.summary?.user.first_name +' '+ props.summary?.user.last_name  : '')
    const stausPayment = computed(() => props.summary.statusPayment ? 'Pagada' : 'Pendiente de pago')

</script>

<template>
    <h1 class="text-xl md:text-3xl">Resumen de venta</h1>
    <div class="grid mt-3" v-if="props.summary && !props.loading">
      <div class="col-12 md:col-6 grid">
          <p class="font-medium text-sm lg:text-base mr-2 col-4">Cliente:</p>
          <span class="col text-sm lg:text-base">{{ client }}</span>
      </div>
      <div class="col-12 md:col-6 grid">
          <p class="font-medium text-sm lg:text-base mr-2 col-4">Fecha de venta:</p>
          <span class="col text-sm lg:text-base">{{ convertoDDMMYYYY(props.summary.date) }}</span>
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
        <DataTable :value="summary.detailProducts" class="p-datatable-sm width-detail-table1" id="table-sale" >
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
          <h4 class="text-base">Total {{ props.summary.statusPayment ? 'pagado:' : 'a pagar:' }} </h4>
          <span class="lg:text-lg font-medium">{{ formatCurrency(Number(props.summary.total.$numberDecimal)) }}</span>
      </div>
      </div>
    </div>

    <div v-else>
      Loading ...
    </div>
</template>