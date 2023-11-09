<script setup lang="ts">
    import { onMounted } from "vue";
    import useReports from "@/composables/reports";

    const composable = useReports()

    onMounted(async () => {
        await composable.getEmployee()
    })
</script>

<template>
    <div class="w-full">
        <h3 class="mb-2">Empleado con más ventas realizadas</h3>
        <DataTable :value="composable.responsEmployee.value" class="p-datatable-sm" tableStyle="min-width: 20rem">
            <Column header="Nombre completo">
                <template #body="prop">
                    {{ prop.data._id.name }}
                </template>
            </Column>
            <Column header="Rol">
                <template #body="prop">
                    {{ prop.data._id.role }}
                </template>
            </Column>
            <Column header="Ventas realizadas">
                <template #body="prop">
                    {{ prop.data.totalSales }}
                </template>
            </Column>
        </DataTable>
    </div>
</template>