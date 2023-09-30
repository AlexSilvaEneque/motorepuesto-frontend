import { inject } from 'vue';
import { useRouter } from 'vue-router';
import productAPI from '@/api/productAPI';
import type { IProduct } from '../interfaces/index';

export default function useProduct() {

    const router = useRouter()
    const toast : any = inject('toast')

    const allProducts = async () => {
        try {
            const { data } = await productAPI.allProducts()
            return data.products
        } catch (error:any) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

    const getById = async (id:string) => {
        try {
            const { data } = await productAPI.getById(id)
            return data
        } catch (error:any) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

    const register = async (formData : IProduct) => {
        try {
            const { data } = await productAPI.register(formData)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            router.push({ name: 'index-product' })
        } catch (error:any) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

    const updateProduct = async (id : string, formData : IProduct) => {
        try {
            const { data } = await productAPI.update(id, formData)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            router.push({ name: 'index-product' })
        } catch (error:any) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

    const deleteProduct = async (id:string) => {
        try {
            const { data } = await productAPI.deleteProduct(id)
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
        allProducts,
        getById,
        register,
        updateProduct,
        deleteProduct
    }
}