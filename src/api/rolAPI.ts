import type { IRRol } from "@/interfaces"
import api from "@/lib/axios"

export default {
    getAll() {
        return api.get('/rol')
    },
    create(data : IRRol) {
        return api.post('/rol', data)
    },
    getById(id : string) {
        return api.get(`/rol/${id}`)
    },
    update(id : string, data : IRRol) {
        return api.put(`/rol/${id}`, data)
    },
    delete(id : string) {
        return api.delete(`/rol/${id}`)
    }
}