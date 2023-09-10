import AuthAPI from '@/api/AuthAPI'
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { IRUser } from '../interfaces/index'

export const useUserStore = defineStore('user', () => {

    const router = useRouter()
    const user = ref<IRUser>({} as IRUser)

    onMounted(async () => {
        try {
            const { data } = await AuthAPI.auth()
            user.value = data
        } catch (error) {
            console.log(error)
        }
    })

    function logout() {
        localStorage.removeItem('AUTH_TOKEN')
        localStorage.removeItem('id')
        user.value = {} as IRUser
        router.push({ name: 'login' })
    }

    return {
        user,
        logout
    }
})