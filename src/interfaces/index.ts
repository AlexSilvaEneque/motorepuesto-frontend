import type { Ref } from 'vue'

export interface ProToggle {
    toggle: Ref<Boolean>,
    changeToggle: () => void
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
    name: string
    type: number
    doc: string
    address?: string
    phone?: string
    status?: boolean
}

export interface IProduct {
    _id?: string
    name: string
    price: {
        $numberDecimal: number
    }
    quantity: number
    status?: boolean
}

export interface ISupplier {
    _id?: string
    social_reason: string
    representative: string
    address?: string
    email?: string
    phono: string
    status?: boolean
}

export interface IService {
    _id?: string
    description: string
    price: {
        $numberDecimal: number
    }
    status?: boolean
}