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
    first_name: string
    last_name: string
    email: string
    username?: string
    phone?: string
    password: string
}


export interface IRRol {
    description?: string
    _id?: string
    label?: string
    value?: string
}