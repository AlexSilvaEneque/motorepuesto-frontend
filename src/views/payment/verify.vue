<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router'
import usePayment from '../../composables/usePayment';
import api from '@/lib/axios';

    const router = useRouter()
    const route = useRoute()
    const composablePayment = usePayment()

    const xs = async () => {
        const res = await api.get('https://rojas-eirl.vercel.app/api/sale/6563cc443951a93d19ce96b9')
        console.log(res)
    }

    onMounted(async () => {
        await xs()
        if (localStorage.getItem('history')) {
            const path = localStorage.getItem('history')
            const id = path!.split('/')[2]
            if (route.query.collection_status) {
                console.log('entra')
                await composablePayment.changeStatusPayment(id)
            }
            router.push(path!)
        } else {
            console.log('no history')
        }
    })
</script>

<template>
    <h1>Loading</h1>
</template>