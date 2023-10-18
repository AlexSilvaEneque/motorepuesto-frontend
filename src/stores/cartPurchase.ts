import { ref } from "vue"
import { defineStore } from "pinia"
import type { ICartPurchase, IProduct } from "@/interfaces"

interface State {
    productSelected: IProduct | null
    cartPurchase: ICartPurchase[]
}

// export const useCartPurchaseStore = defineStore('cartPurchase', {
//     state: () : State => {
//         return {
//             productSelected: null,
//             cartPurchase: []
//             // productSelected: ref<IProduct | null>(),
//             // cartPurchase: ref<ICartPurchase[]>([])
//         }
//     },

//     actions: {
//         addCartPurchase(params: ICartPurchase) {
//             const exists = this.cartPurchase.findIndex((item) => item.products === params.products)
//             if (exists >= 0) {
//                 alert('Ya está agregado')
//                 return
//             }
//             this.$patch({ cartPurchase: [...this.cartPurchase, params] })
//             // this.cartPurchase.push(params)
//         },

//         deleteItem(param : ICartPurchase) {
//             this.cartPurchase = this.cartPurchase.filter(item => item.products !== param.products)
//         },

//         $resetProductSelected() {
//             this.productSelected = null
//         }
//     },

//     getters: {
//         totalPurchase: (state) => state.cartPurchase.reduce((total, item) => total + (item.price * item.quantity), 0)
//     },

//     persist: true
// })


export const useCartPurchaseStore = defineStore('cartPurchase', {
    state: () : State => {
        return {
            productSelected: null,
            cartPurchase: []
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
        totalPurchase: (state) => {
            return state.cartPurchase.reduce((total, item) => {
                const itemPrice = parseFloat(String(item.price))
                const itemQty = parseInt(String(item.quantity), 10)
                if (!isNaN(itemPrice) && !isNaN(itemQty)) {
                    return total + (itemPrice * itemQty)
                } else {
                    return total
                }
            }, 0)
        }
    },

    persist: true
})