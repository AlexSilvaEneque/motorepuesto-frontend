import type { IClient, IProduct, IRUser, ISale, IService, ISupplier } from "@/interfaces"

export const formatCurrency = (param:number) => {
    return param.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })
}

export const getSeverityStatus = (entity : IClient | IProduct | IRUser | ISupplier | IService | ISale) : string => {
    return entity.status ? 'success' : 'danger'
}