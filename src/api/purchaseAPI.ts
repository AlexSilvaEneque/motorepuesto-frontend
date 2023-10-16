import api from "@/lib/axios"
import type { IPurchase } from '../interfaces/index';

export default {
    getAllPurchase() {
        return api.get('/purchase/')
    },
    getPurchaseById(id: string) {
        return api.get(`/purchase/${id}`)
    },
    registerPurchase(formData: IPurchase) {
        return api.post('/purchase/', formData)
    },
    deletePurchase(id: string) {
        return api.patch(`/purchase/${id}`)
    }
}