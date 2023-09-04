import api from "@/lib/axios"
import type { IRUser } from "@/interfaces"

export default {
    register(data:IRUser) {
        return api.post('/user/', data)
    },
    allUsers() {
        return api.get('/user/')
    },
    getById(id : string) {
        return api.get(`/user/${id}`)
    },
    update(id : string, data : IRUser) {
        return api.put(`/user/${id}`, data)
    },
    delete(id:string) {
        return api.delete(`/user/${id}`)
    }
}