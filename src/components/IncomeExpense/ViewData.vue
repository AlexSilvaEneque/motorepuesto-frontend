<script setup lang="ts">
    import { convertoDDMMYYYY } from '../../utils/date';
    import { formatCurrency } from '../../utils/index';
    import { useIncomeExpenseStore } from '@/stores/incomesExpenses'

    const store = useIncomeExpenseStore()

    const goToMoreDetail = () => {
        console.log('click aquí')
    }

    const colorBalance = (incomes: number, expenses: number) => {
        return incomes - expenses > 0 ? true : false
    }

</script>

<template>
    <template v-if="store.dataIncomeExpenses.length > 0">
        <DataView :value="store.dataIncomeExpenses" data-key="" paginator :rows="3">
            <template #list="slotProps">
                <div class="col-12">
                    <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">                    
                        <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div class="flex flex-column align-items-center sm:align-items-start gap-1">
                                <div class="text-lg font-bold">
                                    Del {{ convertoDDMMYYYY(slotProps.data.initial_date) }} hasta {{ convertoDDMMYYYY(slotProps.data.finish_date) }}
                                </div>
                                <div class="flex align-items-center">
                                    <span class="flex align-items-center mr-2">
                                        <span class="font-semibold">
                                            Ingresos por ventas:
                                            <span class="font-bold">
                                                {{ formatCurrency(Number(slotProps.data.total_income.$numberDecimal)) }}
                                            </span>
                                        </span>
                                    </span>
                                </div>
                                <div class="flex align-items-center">
                                    <span class="flex align-items-center mr-1">
                                        <span class="font-semibold">
                                            Gastos por compras:
                                            <span class="font-bold">
                                                {{ formatCurrency(Number(slotProps.data.total_expense.$numberDecimal)) }}
                                            </span>
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <span class="font-semibold flex align-items-center">
                                    <span
                                        :class="[
                                            colorBalance(slotProps.data.total_income.$numberDecimal, slotProps.data.total_expense.$numberDecimal) ?
                                                'text-blue-600' : 'text-red-600'
                                        ]"
                                        class="font-bold ml-2"
                                    >
                                        {{ formatCurrency(slotProps.data.total_income.$numberDecimal - slotProps.data.total_expense.$numberDecimal) }}
                                    </span>
                                    <i v-if="colorBalance(slotProps.data.total_income.$numberDecimal, slotProps.data.total_expense.$numberDecimal)"
                                        class="ml-2 pi pi-thumbs-up text-blue-600"></i>
                                    <i v-else class="ml-2 pi pi-thumbs-down text-red-600"></i>
                                </span>
                                <!-- <Button
                                    icon="pi pi-angle-right"
                                    rounded
                                    size="small"
                                    @click="goToMoreDetail"
                                /> -->
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>
    </template>
    <div v-else
        class="w-full text-center font-semibold text-2xl"
    >
        Sin registros
    </div>
</template>