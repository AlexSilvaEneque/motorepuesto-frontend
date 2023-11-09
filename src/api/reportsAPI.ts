import api from "@/lib/axios";

export default {
    sales(initial: string, finish: string) {
        return api.post('/reports/sale', { initial, finish })
    },
    purchase(initial: string, finish: string) {
        return api.post('/reports/purchase', { initial, finish })
    },
    client() {
        return api.get('/reports/client')
    },
    employee() {
        return api.get('/reports/employee')
    },
}