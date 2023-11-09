import type { Ref } from 'vue'

export interface ProToggle {
    toggle: Ref<Boolean>,
    changeToggle: () => void
}

export interface HelpToggle {
    helpstate: Ref<Boolean>,
    // changeHelp: () => void
}

export interface Credenciales {
    email: string
    password: string
}

export interface IRUser {
    _id?: string
    first_name: string
    last_name: string
    email: string
    username?: string
    phone?: string
    password: string
    role?: IRRol
    status?: boolean
}


export interface IRRol {
    _id?: string
    description?: string
    label?: string
    value?: string
    status?: boolean
}

export interface IClient {
    _id?: string
    name?: string
    type?: number
    doc?: string
    address?: string
    phone?: string
    status?: boolean
    label?: string
    value?: string
}

export interface IProduct {
    _id?: string
    name?: string
    price?: {
        $numberDecimal: number
    }
    type?: number
    quantity?: number
    status?: boolean
    label?: string
    value?: string
    attrs?: {
        disabled: boolean
    }
}

export interface ISupplier {
    _id?: string
    social_reason?: string
    representative?: string
    address?: string
    email?: string
    phono?: string
    status?: boolean
    label?: string
    value?: string
}

export interface IService {
    _id?: string
    description: string
    price: {
        $numberDecimal: number
    }
    status?: boolean
}

export interface DetailProduct {
    quantity: number,
    products: IProduct | string
}

interface DetailService {
    quantity: number,
    products: IService | string
}

export interface ISale {
    _id?: string
    payment_type: string
    tax?: {
        $numberDecimal: number
    },
    total: {
        $numberDecimal: number
    },
    discount?: {
        $numberDecimal: number
    }
    status?: boolean
    date: Date
    detailProducts?: DetailProduct[] | any
    detailServices?: DetailService[]
    user: IRUser | string
    client: IClient | string
    statusPayment?: boolean
}

export interface IPurchase {
    _id?: string
    total: {
        $numberDecimal: number
    },
    date: Date
    detailProducts?: DetailProduct[] | any
    user: IRUser | string
    supplier: ISupplier | string
    status?: boolean
}

export interface ICartSale {
    quantity: number
    price: number
    name?: string
    products?: string
    // id: string
}

export interface ICartPurchase {
    quantity: number
    price: number
    name?: string
    products?: string
}

export interface ICreateOrder {
    title: string
    unit_price: number
    currency_id: string
    quantity: number
}

interface DetailIncomes {
    sale: string
}

interface DetailExpense {
    purchase: string
}

export interface IIncomesExpenses {
    _id?: string
    initial_date?: Date | any
    finish_date?: Date | any
    detail_incomes?: ISale[] | string | DetailIncomes[]
    detail_expenses?: IPurchase[] | string | DetailExpense[]
    total_incomes: {
        $numberDecimal: number
    }
    total_expenses: {
        $numberDecimal: number
    }
}

export interface ResponseIncomeExpense {
    countpurchases: number
    countsale: number
    purchases: IPurchase[]
    sales: ISale[]
}

interface ReportOpQty {
    total: number,
    _id: string
}

interface ReportOpMoney {
    total: {
        $numberDecimal: number
    },
    _id: string
}

export interface ResponseReportSale {
    sale: ReportOpQty[],
    money: ReportOpMoney[]
}

export interface ResponseReportSale {
    purchase: ReportOpQty[],
    money: ReportOpMoney[]
}

interface DataClient {
    clientId: string,
    name: string
}

interface DataEmployee {
    userId: string,
    name: string,
    last_name: string,
    email: string,
    role: string
}

export interface ResponseReportClient {
    _id: DataClient,
    totalSales: number
}

export interface ResponseReportEmployee {
    _id: DataEmployee,
    totalSales: number
}