<script setup lang="ts">
    import { onMounted } from "vue";
    import useReports from "@/composables/reports";

    const composable = useReports()

    onMounted(async () => {
        await composable.getService()
    })
</script>

<template>
    <div class="w-full">
        <h3 class="mb-2">Servicio más solicitado</h3>
        <DataTable :value="composable.responseService.value" class="p-datatable-sm" tableStyle="min-width: 20rem">
            <Column header="Nombre del servicio">
                <template #body="prop">
                    {{ prop.data._id }}
                </template>
            </Column>
            <Column header="Cantidad">
                <template #body="prop">
                    {{ prop.data.totalSold }}
                </template>
            </Column>
        </DataTable>
    </div>
</template>