<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router'
    import type { ISale } from '../../interfaces/index';
    import useSale from '../../composables/sale';
    import SummarySale from '@/components/UI/SummarySale.vue';

    const route = useRoute()
    const composable = useSale()

    const summary = ref<ISale>()
    const loading = ref<boolean>(false)

    const getSummary = async () => {
      const { id } = route.params
      loading.value = true
      summary.value = await composable.getSaleById(<string>id)
      loading.value = false
    }

    onMounted(() => {
        getSummary()
    })
</script>

<template>
    <div class="w-full h-screen border-2 border-transparent relative">
        <div class="flex justify-content-between px-8 mt-5">
            <div>
                Donny Logo
            </div>
        </div>
        <div class="w-full px-5 mt-3 lg:mt-7 pb-3 md:pb-0 md:pt-2">
            <SummarySale v-if="summary" :summary="summary" :loading="loading" />
        </div>
    </div>
</template>

<style>
*, html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>