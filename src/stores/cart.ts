import { ref } from "vue"
import { defineStore } from "pinia"
import type { ICartSale, IProduct } from "@/interfaces"


export const useCartStore = defineStore('cartSale', {
    state: () => {
        return {
            productSelected: ref<IProduct | null>(),
            cartSale: ref<ICartSale[]>([])
        }
    },

    actions: {
        addCartSale(params: ICartSale) {
            const exists = this.cartSale.findIndex((item) => item.products === params.products)
            if (exists >= 0) {
                alert('Ya está agregado')
                return
            }
            this.cartSale.push(params)
        },

        deleteItem(param: ICartSale) {
            this.cartSale = this.cartSale.filter(item => item.products !== param.products)
        },

        $resetProductSelected() {
            this.productSelected = null
        }
    },
    getters: {
        totalSale: (state) => state.cartSale.reduce((total, item) => total + (item.price * item.quantity), 0),
    },
    persist: true
})