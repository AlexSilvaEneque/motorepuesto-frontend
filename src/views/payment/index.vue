<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue';
    import { useRoute, useRouter } from "vue-router"
    import useSale from '../../composables/sale';
    import usePayment from '../../composables/usePayment';
    import type { ISale } from '../../interfaces/index';
    import { convertoDDMMYYYY } from '../../utils/date';
    import SummarySale from '@/components/UI/SummarySale.vue';

    
    import { jsPDF } from 'jspdf'
    import autoTable from 'jspdf-autotable'

    const route = useRoute()
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

    const creartePDF = () => {
      const pdf = new jsPDF('p', 'mm', [90, 165])
      pdf.setFontSize(14)
      pdf.addFont('CourierNew', 'Courier New', 'normal')
      pdf.setFont('Courier New', 'bold')
      pdf.text(`Boleta venta`, 8, 20)
      pdf.setFontSize(12)
      pdf.setFont('Courier New', 'normal')
      pdf.text(`Fecha: ${convertoDDMMYYYY(summary.value?.date)}`, 8, 28)
      pdf.text(`Cliente: ${client.value}`, 8, 34)
      pdf.text(`Vendedor: ${seller.value.split(' ')[0] + ' ' + seller.value.split(' ')[1]}`, 8, 40)
      pdf.text(`Estado: ${stausPayment.value}`, 8, 46)
      pdf.setFont('Courier New', 'bold')
      pdf.text(`Detalle de venta`, 8, 56)

      const columns = [["Producto", "Cantidad", "Precio"]]
      const rows = summary.value?.detailProducts.map((product:any) => {
        return [
          product.products.name,
          product.quantity,
          product.products.price.$numberDecimal
        ]
      })
      let rowss = summary.value?.detailProducts
      console.log(rowss)

      autoTable(pdf, {
        head: columns,
        body: rows,
        startY: 60,
        margin: {
          left: 8
        },
        styles: {
          fontSize: 11,
          font: 'courrier'
        },
        headStyles: {
          fillColor: '#E4E6E8',
          textColor: 'black'
        },
        columnStyles: {
          0: { cellWidth: 35 },
          1: { cellWidth: 20 },
          2: { cellWidth: 20 },
        },
        tableWidth: 'auto'
      })

      pdf.setFont('Courier New', 'bold')
      pdf.text(`Total pagado: S/ ${summary.value?.total.$numberDecimal}`, 8, 150)

      const datapdf = pdf.output()

      const blob = new Blob([datapdf], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      window.open(url)
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
    }

    const isValid = computed(() => Number(recive.value!) >= summary.value?.total.$numberDecimal! &&  recive.value)

    onMounted(async () => {
      await getSummary()
    })
</script>

<template>
  <div class="w-full custom-2 bg-white border-round shadow-1 px-5 mt-3 pb-3 md:pb-0 md:pt-2">
    <SummarySale v-if="summary" :summary="summary" :loading="loading" />

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
          <Button
            type="button"
            class="mt-2"
            label="Regresar a ventas"
            severity="secondary"
            @click="$router.push({ name: 'index-sale' })"
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