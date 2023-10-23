<script setup lang="ts">
    import { ref, inject, watchEffect, onMounted } from 'vue';
    import ViewData from '../../components/IncomeExpense/ViewData.vue'
    import { formatCurrency } from '../../utils/index';
    import type { IIncomesExpenses } from '../../interfaces/index';
    import { convertoDDMMYYYY } from "@/utils/date";
    import { useIncomeExpenseStore } from '@/stores/incomesExpenses'

    const store = useIncomeExpenseStore()

    const dates = ref()
    const disabled = ref<boolean>(true)
    const loading = ref<boolean>(false)

    const filterByDates = async () => {
        await store.filterByDates(dates.value)
    }

    const handlerSubmit = async () => {
        const sendData : IIncomesExpenses = {
            initial_date: convertoDDMMYYYY(dates.value[0]),
            finish_date: convertoDDMMYYYY(dates.value[1]),
            total_incomes: {
                $numberDecimal: store.totalSales
            },
            total_expenses: {
                $numberDecimal: store.totalPurchase
            },
            detail_incomes: store.incomeExpenses?.sales.map(item => {
                return {sale: item._id!}
            }),
            detail_expenses: store.incomeExpenses?.purchases.map(item => {
                return {purchase: item._id!}
            }),
        }
        loading.value = true
        await store.createIncomeExpense(sendData)
        await store.getAllIncomeExpenses()
        dates.value = null
        loading.value = false
    }

    watchEffect(() => {
        if (dates.value && store.incomeExpenses && (store.incomeExpenses.countsale > 0 || store.incomeExpenses.countpurchases > 0)) {
            disabled.value = false
        } else {
            disabled.value = true
        }
    })

    onMounted(async () => {
        store.getAllIncomeExpenses()
    })
</script>

<template>
    <div class="w-full custom-2 bg-white border-round shadow-1 px-1 md:px-5 mt-3">
        <h1 class="text-xl md:text-2xl text-800 pt-2">Gastos e Ingresos</h1>
        <div class="card">
            <TabView>
                <TabPanel header="Registrados">
                    <ViewData />
                </TabPanel>
                <TabPanel header="Registrar">
                    <div class="sm:flex w-full">
                        <h3 class="text-800 mb-1 mt-2 mr-2">Fechas</h3>
                        <div class="p-inputgroup w-full sm:w-6 md:w-7 lg:w-5 xl:w-4">
                            <Calendar v-model="dates" selection-mode="range" :manual-input="false" date-format="dd/mm/yy" />
                            <Button
                                icon="pi pi-filter"
                                severity="secondary"
                                @click="filterByDates"
                            />
                        </div>
                    </div>
                    <div class="grid mt-3 gap-2 lg:gap-0">
                        <div class="col-12 lg:col-6 p-3 lg:px-6">
                            <div class="flex justify-content-between">
                                <span class="font-semibold text-lg">Cantidad de ventas:</span>
                                <span class="font-bold text-xl">{{ store.incomeExpenses?.countsale ? store.incomeExpenses?.countsale : 0 }}</span>
                            </div>
                            <div class="flex justify-content-between">
                                <span class="font-semibold text-lg">Ingreso por ventas:</span>
                                <span class="font-bold text-xl">{{ formatCurrency(Number(store.totalSales)) }}</span>
                            </div>
                        </div>
                        <div class="col-12 lg:col-6 p-3 lg:px-6">
                            <div class="flex justify-content-between">
                                <span class="font-semibold text-lg">Cantidad de compras:</span>
                                <span class="font-bold text-xl">{{ store.incomeExpenses?.countpurchases ? store.incomeExpenses?.countpurchases : 0 }}</span>
                            </div>
                            <div class="flex justify-content-between">
                                <span class="font-semibold text-lg">Gasto por compras:</span>
                                <span class="font-bold text-xl">{{ formatCurrency(Number(store.totalPurchase)) }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="lg:flex lg:justify-content-between lg:px-5 text-center mt-2">
                        <div>
                            <span class="font-semibold text-xl mr-3">Utilidad:</span>
                            <span class="font-bold text-lg">{{ formatCurrency(store.utilidad) }}</span>
                        </div>
                        <Button
                            type="button"
                            label="Guardar"
                            :disabled="disabled"
                            :loading="loading"
                            @click="handlerSubmit"
                        />
                    </div>
                </TabPanel>
            </TabView>
        </div>
    </div>
</template>