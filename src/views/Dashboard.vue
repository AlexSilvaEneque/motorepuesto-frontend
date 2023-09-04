<script setup lang="ts">
    import ICard from '@/components/Dashboard/ICard.vue'
    import { useUserStore } from '../stores/user'

    const user = useUserStore()
</script>

<template>
  <div class="w-full grid gap-1 sm:column-gap-0 sm:row-gap-1 lg:gap-1 mx-auto mt-3">
        <ICard class="col-12 sm:col-6 lg:col">
            <template #title>
                Ventas
            </template>
            <template #icon>
                <i class="pi pi-money-bill"></i>
            </template>
            <template #text-plain>
                125
            </template>
        </ICard>

        <ICard class="col-12 sm:col-6 lg:col">
            <template #title>
                Compras
            </template>
            <template #icon>
                <i class="pi pi-shopping-cart"></i>
            </template>
            <template #text-plain>
                2
            </template>
        </ICard>

        <ICard class="col-12 sm:col-6 lg:col">
            <template #title>
                Clientes
            </template>
            <template #icon>
                <i class="pi pi-users"></i>
            </template>
            <template #text-plain>
                2
            </template>
        </ICard>

        <ICard class="col-12 sm:col-6 lg:col">
            <template #title>
                Proveedores
            </template>
            <template #icon>
                <i class="pi pi-truck"></i>
            </template>
            <template #text-plain>
                2
            </template>
        </ICard>
    </div>
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