import { inject } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/stores/user"
import { useCartPurchaseStore } from "@/stores/cartPurchase"
import purchaseAPI from "@/api/purchaseAPI"
import type { IPurchase } from "@/interfaces"

export default function usePurchase ()  {

    const router = useRouter()
    const userStore = useUserStore()
    const purchaseStore = useCartPurchaseStore()
    const toast : any = inject('toast')

    const getAllPurchase = async () => {
        const { data } = await purchaseAPI.getAllPurchase()
        userStore.isAdmin = data.isAdmin
        return data.purchases
    }

    const getPurchaseById = async (id: string) => {
        try {
            const { data } = await purchaseAPI.getPurchaseById(id)
            return data
        } catch (error) {
            console.log(error)
        }
    }

    const registerPurchase = async (formData : IPurchase) => {
        if (purchaseStore.cartPurchase.length === 0) {
            toast.open({
                message: 'Agregue productos al carrito',
                type: 'error'
            })
            return
        }

        const send : IPurchase = {
            ...formData,
            total: {
                $numberDecimal: purchaseStore.totalPurchase
            },
            detailProducts: purchaseStore.cartPurchase
        }

        try {
            const { data } = await purchaseAPI.registerPurchase(send)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            router.push({ name: 'index-purchase' })
        } catch (error:any) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        } finally {
            purchaseStore.$reset()
        }
    }

    const deletePurchase = async (id : string) => {
        try {
            const { data } = await purchaseAPI.deletePurchase(id)
            toast.open({
                message: data.msg,
                type: 'success'
            })
        } catch (error:any) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

    return {
        getAllPurchase,
        getPurchaseById,
        registerPurchase,
        deletePurchase
    }
}