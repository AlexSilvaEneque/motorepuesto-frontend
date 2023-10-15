import { inject } from "vue";
import paymentAPI from "@/api/paymentAPI"
import type { ISale, DetailProduct, ICreateOrder } from "@/interfaces"

export default function usePayment () {

    const toast : any = inject('toast')

    const registerOrder = async (formData : ISale, backURL : string) => {
        try {
            const send : ICreateOrder[] = formData.detailProducts.map((item : DetailProduct) => {
                return {
                    title: typeof item.products !== 'string' ? item.products.name :  '',
                    unit_price: typeof item.products !== 'string' ? Number(item.products.price!.$numberDecimal) : 0,
                    currency_id: "PEN",
                    quantity: item.quantity
                }
            })
            let res = await paymentAPI.registerOrder(send, backURL)
            console.log(res.data)
            toast.open({
                message: res.data.msg,
                type: 'success'
            })
            return { stateRes: true, link: res.data.redirect }
        } catch (error) {
            toast.open({
                message: 'Error al acceder al pago',
                type: 'error'
            })
            return { stateRes: false, link: '' } 
        }
    }

    const changeStatusPayment = async (id : string) => {
        try {
            const res = await paymentAPI.changeStatusPayment(id)
            toast.open({
                message: res.data.msg,
                type: 'success'
            })
        } catch (error) {
            toast.open({
                message: 'Error al pagar',
                type: 'error'
            })
        }
    }

    return {
        registerOrder,
        changeStatusPayment
    }
}