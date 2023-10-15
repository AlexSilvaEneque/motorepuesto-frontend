import { computed, ref, watch, watchEffect } from "vue"
import { defineStore } from "pinia"
import type { ICartSale, IProduct } from "@/interfaces"

export const useCartStore = defineStore('cart', () => {

    const productSelected = ref<IProduct | null>()
    const cart = ref<ICartSale[]>([])
    const subtotal = ref<number>(0)
    const total = ref<number>(0)

    function addCartSale(params : ICartSale) {
        const exists = cart.value.findIndex((item) => item.products === params.products)
        if (exists >= 0) {
            alert('Ya está agregado')
            return
        }
        cart.value.push(params)
    }

    function deleteItem(param : ICartSale) {
        cart.value = cart.value.filter(item => item.products !== param.products)
    }

    function $reset() {
        productSelected.value = null
    }

    function $resetAll() {
        productSelected.value = null
        cart.value = []
        subtotal.value = 0
        total.value = 0
    }

    watchEffect(() => {
        subtotal.value = cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
        total.value = subtotal.value
    })

    return {
        productSelected,
        total,
        cart,
        addCartSale,
        deleteItem,
        $reset,
        $resetAll
    }
})