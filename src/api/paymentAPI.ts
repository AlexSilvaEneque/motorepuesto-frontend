import api from "@/lib/axios";
import type { ICreateOrder } from '../interfaces/index';

export default {
    registerOrder(formData : ICreateOrder[], backURL : string) {
        return api.post('/payment/create-order', { formData, backURL })
    },
    changeStatusPayment(id : string) {
        return api.patch(`/sale/payment/${id}`)
    }
}