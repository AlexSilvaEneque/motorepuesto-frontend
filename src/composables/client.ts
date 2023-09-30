import { inject } from "vue"
import { useRouter } from "vue-router"
import clienteAPI from "@/api/clienteAPI"
import type { IClient } from "@/interfaces"

export default function useClient () {

    const router = useRouter()
    const toast : any = inject('toast')

    const allClient = async () => {
        try {
            const { data } = await clienteAPI.allClients()
            return data.clients
        } catch (error : any) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

    const getById = async (id:string) => {
        try {
            const { data } = await clienteAPI.getById(id)
            return data
        } catch (error:any) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

    const register = async (formData : IClient) => {
        try {
            const {data} = await clienteAPI.create(formData)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            router.push({ name: 'index-clients' })
        } catch (error:any) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

    const updateClient = async (id:string, formData : IClient) => {
        try {
            const { data } = await clienteAPI.update(id, formData)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            router.push({ name: 'index-clients' })
        } catch (error:any) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

    const deleteClient = async (id : string) => {
        try {
            const { data } = await clienteAPI.delete(id)
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
        register,
        allClient,
        getById,
        updateClient,
        deleteClient
    }
}