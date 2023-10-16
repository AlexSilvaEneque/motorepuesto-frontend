import { ref } from "vue"
import { defineStore } from "pinia"
import type { ICartPurchase, IProduct } from "@/interfaces"

export const useCartPurchaseStore = defineStore('cartPurchase', {
    state: () => {
        return {
            productSelected: ref<IProduct | null>(),
            cartPurchase: ref<ICartPurchase[]>([])
        }
    },

    actions: {
        addCartPurchase(params: ICartPurchase) {
            const exists = this.cartPurchase.findIndex((item) => item.products === params.products)
            if (exists >= 0) {
                alert('Ya está agregado')
                return
            }
            this.cartPurchase.push(params)
        },

        deleteItem(param : ICartPurchase) {
            this.cartPurchase = this.cartPurchase.filter(item => item.products !== param.products)
        },

        $resetProductSelected() {
            this.productSelected = null
        }
    },

    getters: {
        totalPurchase: (state) => state.cartPurchase.reduce((total, item) => total + (item.price * item.quantity), 0)
    },

    persist: true
})