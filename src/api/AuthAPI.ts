import api from '../lib/axios'
import type { Credenciales } from '@/interfaces'

export default {
    login(data : Credenciales) {
        return api.post('/auth/login', data)
    },
    auth() {
        return api.get('/auth/user')
    },
    admin() {
        return api.get('/auth/admin')
    }
}