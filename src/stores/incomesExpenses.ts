import { inject, ref, computed } from 'vue';
import { defineStore } from 'pinia'
import incomeExpenseAPI from '@/api/incomeExpenseAPI';
import { convertoDDMMYYYY } from '@/utils/date';
import type { IIncomesExpenses, ResponseIncomeExpense } from '@/interfaces';

export const useIncomeExpenseStore = defineStore('incomeExpense', () => {
    
    const toast : any = inject('toast')
    const incomeExpenses = ref<ResponseIncomeExpense>()
    const dataIncomeExpenses = ref<IIncomesExpenses[]>([])

    const filterByDates = async (dates : Object | any) : Promise<ResponseIncomeExpense | undefined> => {
        if (!dates || !dates[1]) {
            toast.open({
                message: 'Seleccione un rango de fechas',
                type: 'error'
            })
            return
        }
        
        try {
            const { data } = await incomeExpenseAPI.getDataByRangeDate(convertoDDMMYYYY(dates[0]), convertoDDMMYYYY(dates[1]))
            incomeExpenses.value = data

            if (incomeExpenses.value?.countpurchases === 0 && incomeExpenses.value.countsale === 0) {
                toast.open({
                    message: 'No hay operaciones registradas entre estas fechas',
                    type: 'info'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getAllIncomeExpenses = async () => {
        const { data } = await incomeExpenseAPI.getAllIncomeExpenses()
        dataIncomeExpenses.value = data
    }

    const createIncomeExpense = async (formData:IIncomesExpenses) => {
        try {
            const { data } = await incomeExpenseAPI.registerIncomeExpense(formData)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            $reset()
        } catch (error:any) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

    const $reset = () => {
        incomeExpenses.value = undefined
        dataIncomeExpenses.value = []
    }

    const totalSales = computed(() => {
        if (incomeExpenses.value) {
            return incomeExpenses.value?.sales.reduce((total, item) => {
                const sub = parseFloat(item.total.$numberDecimal.toString())
                return total + sub
            }, 0)   
        }
        return 0
    })

    const totalPurchase = computed(() => {
        if (incomeExpenses.value) {
            return incomeExpenses.value?.purchases.reduce((total, item) => {
                const sub = parseFloat(item.total.$numberDecimal.toString())
                return total + sub
            }, 0)
        }
        return 0
    })
    
    const utilidad = computed(() => {
        if (!totalSales.value && !totalPurchase.value) {
            return 0
        }
        return totalSales.value - totalPurchase.value
    })

    return {
        incomeExpenses,
        dataIncomeExpenses,
        filterByDates,
        getAllIncomeExpenses,
        createIncomeExpense,
        totalSales,
        totalPurchase,
        utilidad
    }
})