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

    const login = async (dataForm : Credenciales) => {
        try {
            const { data : {token} } = await AuthAPI.login(dataForm)
            localStorage.setItem('AUTH_TOKEN', token)
            const { data } = await AuthAPI.auth()
            localStorage.setItem('id', data._id)
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

    const update = async (id : string, dataForm : IRUser, profile?: boolean) => {
        try {
            const { data } = await userAPI.update(id, dataForm)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            setTimeout(() => {
                router.push({ name: 'index-users' })
            }, 2000)

            if (profile) {
                const { data: current } = await AuthAPI.auth()
                userStore.user = current
            }

        } catch (error:any) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

    const deleteUser = async (id : string) => {
        return await userAPI.delete(id)
    }

    const allUser = async () => {
        const { data } = await userAPI.allUsers()
        return data
    }

    const getById = async (id:string) => {
        const { data } = await userAPI.getById(id)
        return data
    }

    return {
        login,
        register,
        allUser,
        getById,
        update,
        deleteUser
    }
}