<script setup lang="ts">
    import { onMounted } from "vue";
    import useReports from "@/composables/reports";

    const composable = useReports()

    onMounted(async () => {
        await composable.getClient()
    })
</script>

<template>
    <div class="w-full">
        <h3 class="mb-2">Clientes con más ventas</h3>
        <DataTable :value="composable.responseClient.value" class="p-datatable-sm" tableStyle="min-width: 20rem">
            <Column header="Nombre completo">
                <template #body="prop">
                    {{ prop.data._id.name }}
                </template>
            </Column>
            <Column header="Ventas">
                <template #body="prop">
                    {{ prop.data.totalSales }}
                </template>
            </Column>
        </DataTable>
    </div>
</template>