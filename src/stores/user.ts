import AuthAPI from '@/api/AuthAPI'
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {

    const router = useRouter()

    const users = ref([])
    // const userCurrent = ref({})
    const user = ref({})

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
        user.value = {}
        router.push({ name: 'login' })
    }

    return {
        users,
        user,
        // userCurrent,
        logout
    }
})