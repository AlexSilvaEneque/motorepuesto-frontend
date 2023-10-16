import { defineStore } from 'pinia'

export const useCount = defineStore('count', {
    state: () => {
        return {
            count: 0
        }
    },
    actions: {
        increment(val:number) {
            this.count += val
        }
    },

    persist: {
        storage: sessionStorage
    }
})