import api from "@/lib/axios";
import type { ISupplier } from '../interfaces/index';

export default {
    allSupplier() {
        return api.get('/supplier/')
    },
    getById(id : string) {
        return api.get(`/supplier/${id}`)
    },
    register(data : ISupplier) {
        return api.post('/supplier/', data)
    },
    update(id : string, data : ISupplier) {
        return api.put(`/supplier/${id}`, data)
    },
    delete(id : string) {
        return api.patch(`/supplier/${id}`)
    }
}