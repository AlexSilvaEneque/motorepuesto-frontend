import { inject } from "vue"
import AuthAPI from "@/api/AuthAPI"
import userAPI from "@/api/userAPI"
import type { Credenciales, IRUser } from "@/interfaces"
import { useRouter } from "vue-router"
import { useUserStore } from "@/stores/user"


export default function useUser () {
    const router = useRouter()
    const toast : any = inject('toast')
    const userStore = useUserStore()

    const login = async (data : Credenciales) => {
        try {
            const { data : {token} } = await AuthAPI.login(data)
            localStorage.setItem('AUTH_TOKEN', token)
            toast.open({
                message: 'Inicio de sesión exitoso',
                type: 'success'
            })
            setTimeout(() => {
                router.push({ name: 'dashboard' })
            }, 2000)
        } catch (error : any) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

    const register = async (dataForm : IRUser) => {
        try {
            const { data } = await userAPI.register(dataForm)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            setTimeout(() => {
                router.push({ name: 'index-users' })
            }, 2000)
        } catch (error:any) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

    const allUser = async () => {
        const { data } = await userAPI.allUsers()
        console.log(data)
        userStore.users = data.user
    }

    const getById = async (id:string) => {
        const { data } = await userAPI.getById(id)
        return data
    }

    return {
        login,
        register,
        allUser,
        getById
    }
}