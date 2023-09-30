import api from "@/lib/axios";
import type { IService } from "@/interfaces/index";

export default {
    allServices() {
        return api.get('/service/')
    },
    getById(id : string) {
        return api.get(`/service/${id}`)
    },
    register(data : IService) {
        return api.post('/service/', data)
    },
    update(id : string, data : IService) {
        return api.put(`/service/${id}`, data)
    },
    delete(id : string) {
        return api.patch(`/service/${id}`)
    }
}