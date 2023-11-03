<script setup lang="ts">
    import { ref, onMounted } from 'vue';

    const props = defineProps({
        data1: Object,
        data2: Object
    })

    const labels = ref()
    const data1 = ref()
    const data2 = ref()

    const chartData = ref()

    const chartOptions = ref({
        scales: {
            y: {
                beginAtZero: true
            }
        }
    })

    const setChartData = () => {
        labels.value = Object.keys(props?.data1 as any)
        data1.value = Object.values(props?.data1 as any)
        data2.value = Object.values(props?.data2 as any)

        data1.value = data1.value.map((item : any) => {
            return Number(item.$numberDecimal.toString())
        })

        data2.value = data2.value.map((item : any) => {
            return Number(item.$numberDecimal.toString())
        })

        return {
            labels: labels.value,
            datasets: [
                {
                    label: 'Ingreso por Ventas de los últimos 4 meses (S/.)',
                    data: data1.value,
                    borderColor: ['rgb(153, 102, 255)'],
                    borderWidth: 1,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Gasto por Compras de los últimos 4 meses (S/.)',
                    data: data2.value,
                    borderColor: ['rgb(255, 159, 64)'],
                    borderWidth: 1,
                    fill: false,
                    tension: 0.4
                },
            ]
        }
    }

    onMounted(() => {
        chartData.value = setChartData()
    })
</script>

<template>
    <div class="card bg-white p-3 border-round shadow-1">
        <Chart type="line" :data="chartData" :options="chartOptions" class="w-full" />
    </div>
</template>