import { inject } from "vue";
import { useRouter } from "vue-router";
import type { IService } from "@/interfaces";
import serviceAPI from "@/api/serviceAPI";

export default function useService() {

    const router = useRouter()
    const toast : any = inject('toast')

    const allServices = async () => {
        const { data } = await serviceAPI.allServices()
        return data.services
    }

    const getById = async (id : string) => {
        try {
            const { data } = await serviceAPI.getById(id)
            return data
        } catch (error:any) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

    const register = async (formData : IService) => {
        try {
            const { data } = await serviceAPI.register(formData)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            router.push({ name: 'index-service' })
        } catch (error:any) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

    const update = async (id : string, formData : IService) => {
        try {
            const { data } = await serviceAPI.update(id, formData)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            router.push({ name: 'index-service' })
        } catch (error:any) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

    const deleteService = async (id : string) => {
        try {
            const { data } = await serviceAPI.delete(id)
            toast.open({
                message: data.msg,
                type: 'success'
            })
        } catch (error:any) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

    return {
        allServices,
        getById,
        register,
        update,
        deleteService
    }
}