import api from "@/lib/axios";
import type { IIncomesExpenses } from '../interfaces/index';

export default {
    getAllIncomeExpenses() {
        return api.get('/income-expense')
    },
    getDataByRangeDate(initial_date: string, finish_date: string) {
        return api.get(`/income-expense/filter/range?initial_date=${initial_date}&finish_date=${finish_date}`)
    },
    registerIncomeExpense(formData: IIncomesExpenses) {
        return api.post('/income-expense', formData)
    }
}