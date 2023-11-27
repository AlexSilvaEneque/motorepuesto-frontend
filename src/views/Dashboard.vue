<script setup lang="ts">
    import { ref, onMounted, reactive } from 'vue';
    import ICard from '@/components/Dashboard/ICard.vue'
    import SalesMonth from '@/components/Dashboard/SalesMonth.vue'
    import MostSales from '@/components/Dashboard/MostSales.vue'
    import MostClients from '@/components/Dashboard/MostClients.vue'
    import { useUserStore } from '../stores/user'
    import useDashboard from '@/composables/dashboard';

    const user = useUserStore()

    interface ResutlTotal {
        [month: string]: number | { $numberDecimal: string }
    }

    interface UserInfo {
        _id: {
            name: [],
            userId: string
        },
        totalSales: number
    }

    const dataCards = ref<{
        countClients: number,
        countPurchases: number,
        countSales: number,
        countSuppliers: number,
        resultTotal: ResutlTotal[],
        resultTotal2: ResutlTotal[],
        users: UserInfo[]
    }>()

    const { allInformationCards } = useDashboard()

    onMounted(async () => {
        dataCards.value = await allInformationCards()
        console.log(dataCards.value)
    })
</script>

<template>
    <div class="w-full grid gap-1 sm:column-gap-0 sm:row-gap-1 lg:gap-1 mx-auto mt-3">
        <ICard class="col-12 sm:col-6 lg:col">
            <template #title>
                N° de Ventas
            </template>
            <template #icon>
                <i class="pi pi-money-bill"></i>
            </template>
            <template #text-plain v-if="dataCards">
                {{ dataCards?.countSales }}
            </template>
            <template #text-plain v-else>
                <Skeleton size="2rem" class="mr-2" />
            </template>
        </ICard>

        <ICard class="col-12 sm:col-6 lg:col">
            <template #title>
                N° de Compras
            </template>
            <template #icon>
                <i class="pi pi-shopping-cart"></i>
            </template>
            <template #text-plain v-if="dataCards">
                {{ dataCards?.countPurchases }}
            </template>
            <template #text-plain v-else>
                <Skeleton size="2rem" class="mr-2" />
            </template>
        </ICard>

        <ICard class="col-12 sm:col-6 lg:col">
            <template #title>
                N° de Clientes
            </template>
            <template #icon>
                <i class="pi pi-users"></i>
            </template>
            <template #text-plain v-if="dataCards">
                {{ dataCards?.countClients }}
            </template>
            <template #text-plain v-else>
                <Skeleton size="2rem" class="mr-2" />
            </template>
        </ICard>

        <ICard class="col-12 sm:col-6 lg:col">
            <template #title>
                N° de Proveedores
            </template>
            <template #icon>
                <i class="pi pi-truck"></i>
            </template>
            <template #text-plain v-if="dataCards">
                {{ dataCards?.countSuppliers }}
            </template>
            <template #text-plain v-else>
                <Skeleton size="2rem" class="mr-2" />
            </template>
        </ICard>
    </div>

    <div class="w-full grid sm:column-gap-0 sm:row-gap-1 lg:gap-1 mx-auto mt-3">
        <div class="col-12 lg:col-7">
            <SalesMonth v-if="dataCards" :data1="dataCards?.resultTotal" :data2="dataCards?.resultTotal2" />
        </div>
        <div class="col-12 lg:col">
            <MostSales v-if="dataCards" :data="dataCards?.users" />
        </div>
    </div>

    <!-- <div class="col-12">
        <MostClients v-if="dataCards" :data="dataCards?.users" />
    </div> -->
    

</template>

<style>
*, html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.custom {
    height: calc(100vh - 6.3rem);
}

.custom-2 {
    min-height: calc(100vh - 7rem);
}

.width-table {
    width: 290px;
}

@media (min-width: 374px) {
    .width-table {
        width: 350px;
        margin: auto;
    }

}

@media (min-width: 424px) {
    .width-table {
        width: 390px;
        margin: auto;
    }

}

@media (min-width: 459px) {
    .width-table {
        width: 420px;
        margin: auto;
    }

}

@media (min-width: 535px) {
    .width-table {
        width: 490px;
        margin: auto;
    }

}
</style>