import api from "@/lib/axios";

export default {
    allInformation() {
        return api.get('/dashboard')
    }
}