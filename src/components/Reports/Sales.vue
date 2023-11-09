<script setup lang="ts">
    import { ref, computed, watchEffect, inject } from 'vue';
    import useReports from '../../composables/reports';

    const composable = useReports()
    const toast : any = inject('toast')

    const date1 = ref()
    const date2 = ref()
    const loading = ref<boolean>(false)

    const labels1 = ref(['Sin registro'])
    const labels2 = ref(['Sin registro'])
    const data1 = ref()
    const data2 = ref()

    const chartData = ref()
    const chartData2 = ref()
    const chartOptions = ref({
        scales: {
            y: {
                beginAtZero: true
            }
        }
    })

    const setChartData = () => {
        return {
            labels: labels1.value,
            datasets: [
                {
                    label: 'Cantidad de ventas',
                    data: data1.value,
                    backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1
                }
            ]
        }
    }

    const setChartData2 = () => {
        return {
            labels: labels2.value,
            datasets: [
                {
                    label: 'Ingreso de ventas (S/.)',
                    data: data2.value,
                    backgroundColor: ['rgba(54, 162, 235, 0.2)'],
                    borderColor: ['rgb(75, 192, 192)'],
                    borderWidth: 1,
                    fill: false,
                    tension: 0.4
                }
            ]
        }
    }

    const disabled = computed(() => !date1.value || !date2.value)

    const filtered = async () => {
        await composable.getDataSaleRangeDate(date1.value, date2.value)
        const {sale, money} = composable.responseSale.value

        if (Object.keys(sale).length > 0) {
            labels1.value = sale.map((item:any) => item._id)
            data1.value = sale.map((item:any) => item.total)
            labels2.value = money.map((item:any) => item._id)
            data2.value = money.map((item:any) => item.total.$numberDecimal)
        } else {
            toast.open({
                message: 'No hay ventas realizadas en estas fechas',
                type: 'info'
            })
            setTimeout(() => {
                date1.value = ''
                date2.value = ''
                labels1.value = ['Sin registro']
                labels2.value = ['Sin registro']
                data1.value = ''
                data2.value = ''
            }, 400);
        }
    }

    watchEffect(() => {
        if (labels1.value) {
            chartData.value = setChartData()
        }
        if (labels2.value) {
            chartData2.value = setChartData2()
        }
    })

</script>

<template>
    <div class="w-full h-max">
        <div class="flex column-gap-2 align-items-end">
            <div class="flex flex-column">
                <span class="mr-1">Fecha de inicio</span>
                <Calendar v-model="date1" show-icon />
            </div>
            <div class="flex flex-column">
                <span class="mr-1">Fecha fin</span>
                <Calendar v-model="date2" show-icon />
            </div>
            <Button
                label="Filtrar"
                class="h-min"
                :loading="loading"
                :disabled="disabled"
                @click="filtered"
            />
        </div>
    </div>

    <div class="w-full grid mt-1">
        <!-- grafico de barras (cantidad de ventas, filtrado por las fechas) -->
        <div class="col-12 lg:col-6">
            <Chart type="bar" :data="chartData" :options="chartOptions" />
        </div>
        
        <!-- grafico de linea (monto de ventas, filtrado por las fechas) -->
        <div class="col-12 lg:col-6">
            <Chart type="line" :data="chartData2" :options="chartOptions" />
        </div>
    </div>
</template>