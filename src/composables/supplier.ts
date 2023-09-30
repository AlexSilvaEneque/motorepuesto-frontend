import { inject } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import supplierAPI from "@/api/supplierAPI";
import type { ISupplier } from "@/interfaces";

export default function useSupplier() {

    const router = useRouter()
    const userStore = useUserStore()
    const toast : any = inject('toast')

    const allSupplier = async () => {
        const { data } = await supplierAPI.allSupplier()
        userStore.isAdmin = data.isAdmin
        return data.supplier
    }

    const getById = async (id : string) => {
        try {
            const { data } = await supplierAPI.getById(id)
            return data
        } catch (error:any) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

    const registerSupplier = async (formData : ISupplier) => {
        try {
            const { data } = await supplierAPI.register(formData)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            router.push({ name: 'index-suppliers' })
        } catch (error:any) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

    const updateSupplier = async (id : string, formData : ISupplier) => {
        try {
            const { data } = await supplierAPI.update(id, formData)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            router.push({ name: 'index-suppliers' })
        } catch (error:any) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

    const deleteSupplier = async (id : string) => {
        try {
            const { data } = await supplierAPI.delete(id)
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
        allSupplier,
        getById,
        registerSupplier,
        updateSupplier,
        deleteSupplier
    }
}