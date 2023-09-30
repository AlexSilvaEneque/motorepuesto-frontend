import api from "@/lib/axios"
import type { IClient } from '@/interfaces';

export default {
    create(data: IClient) {
        return api.post('/client/', data)
    },
    allClients() {
        return api.get('/client/')
    },
    getById(id:string) {
        return api.get(`/client/${id}`)
    },
    update(id:string, data: IClient) {
        return api.put(`/client/${id}`, data)
    },
    delete(id:string) {
        return api.patch(`/client/${id}`)
    }
}