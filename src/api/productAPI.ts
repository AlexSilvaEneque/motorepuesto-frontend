import api from "@/lib/axios"
import type { IProduct } from '../interfaces/index'

export default {
    allProducts() {
        return api.get('/product/')
    },
    getById(id:string) {
        return api.get(`/product/${id}`)
    },
    register(data:IProduct) {
        return api.post('/product/', data)
    },
    update(id:string, data:IProduct) {
        return api.put(`/product/${id}`, data)
    },
    deleteProduct(id:string) {
        return api.patch(`/product/${id}`)
    }
}