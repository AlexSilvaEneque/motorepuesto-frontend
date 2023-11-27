import reportsAPI from "@/api/reportsAPI";
import type { ResponseReportClient, ResponseReportProduct, ResponseReportSale } from "@/interfaces";
import { convertoDDMMYYYY } from "@/utils/date";
import { ref } from "vue";

export default function useReports() {

    const responseSale = ref<ResponseReportSale[] | any>()
    const responsePurchase = ref<ResponseReportSale[] | any>()
    const responseClient = ref<ResponseReportClient[]>([])
    const responsEmployee = ref<ResponseReportClient[]>([])
    const responseProduct = ref<ResponseReportProduct[]>([])
    const responseService = ref<ResponseReportProduct[]>([])

    const getDataSaleRangeDate = async (initial: string, finish: string) => {
        const initialFormat = convertoDDMMYYYY(initial)
        const finishFormat = convertoDDMMYYYY(finish)
        
        const { data } = await reportsAPI.sales(initialFormat, finishFormat)
        responseSale.value = data
    }

    const getDataPurchaseRangeDate = async (initial: string, finish: string) => {
        const initialFormat = convertoDDMMYYYY(initial)
        const finishFormat = convertoDDMMYYYY(finish)
        
        const { data } = await reportsAPI.purchase(initialFormat, finishFormat)
        console.log(data)
        responsePurchase.value = data
    }

    const getClient = async () => {
        const { data } = await reportsAPI.client()
        responseClient.value = data
    }

    const getEmployee = async () => {
        const { data } = await reportsAPI.employee()
        responsEmployee.value = data
    }

    const getProducts = async () => {
        const { data } = await reportsAPI.product()
        responseProduct.value = data
    }

    const getService = async () => {
        const { data } = await reportsAPI.service()
        responseService.value = data
    }

    return {
        responseSale,
        responsePurchase,
        responseClient,
        responsEmployee,
        responseProduct,
        responseService,
        getDataSaleRangeDate,
        getDataPurchaseRangeDate,
        getClient,
        getEmployee,
        getProducts,
        getService
    }
}