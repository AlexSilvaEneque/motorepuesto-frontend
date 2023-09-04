import { inject } from 'vue'
import type { IRRol } from '@/interfaces'
import rolAPI from '@/api/rolAPI'
import { useRouter } from 'vue-router'

export function useRole() {

    const router = useRouter()
    const toast : any = inject('toast')

    const register = async (formData : IRRol) => {
        try {
            const { data } = await rolAPI.create(formData)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            router.push({ name: 'index-roles' })
        } catch (error : any) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

    const allRoles = async () => {
        const { data } = await rolAPI.getAll()
        return data.roles
    }

    return {
        register,
        allRoles
    }
}