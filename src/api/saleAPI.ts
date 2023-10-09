import api from "@/lib/axios";
import type { ISale } from '../interfaces/index';

export default {
    allSales() {
        return api.get('/sale/')
    },
    getSaleById(id : string) {
        return api.get(`/sale/${id}`)
    },
    registerSale(data : ISale) {
        return api.post('/sale/', data)
    },
    updateSale(id : string, data : ISale) {
        return api.put(`/sale/${id}`, data)
    },
    deleteSale(id : string) {
        return api.patch(`/sale/${id}`)
    }
}