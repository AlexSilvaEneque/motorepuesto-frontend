import { inject } from 'vue'
import type { IRRol } from '@/interfaces'
import rolAPI from '@/api/rolAPI'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

export default function useRole() {

    const router = useRouter()
    const userStore = useUserStore()
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
        userStore.isAdmin = data.isAdmin
        return data.roles
    }

    const roleSelectList = async () => {
        let roles : IRRol[] = []
        const { data } = await rolAPI.getAll()
        roles = data.roles
        return roles.map(rol => {
            return { label: rol.description, value: rol._id }
        })
    }

    return {
        register,
        allRoles,
        roleSelectList
    }
}