<script setup lang="ts">
    import { onMounted } from "vue";
    import useReports from "@/composables/reports";

    const composable = useReports()

    onMounted(async () => {
        await composable.getProducts()
    })
</script>

<template>
    <div class="w-full">
        <h3 class="mb-2">Productos más vendidos</h3>
        <DataTable :value="composable.responseProduct.value" class="p-datatable-sm" tableStyle="min-width: 20rem">
            <Column header="Nombre del producto">
                <template #body="prop">
                    {{ prop.data._id }}
                </template>
            </Column>
            <Column header="Cantidad vendida">
                <template #body="prop">
                    {{ prop.data.totalSold }}
                </template>
            </Column>
        </DataTable>
    </div>
</template>