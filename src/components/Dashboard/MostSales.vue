<script setup lang="ts">
    import { ref, onMounted } from "vue"

    interface UserInfo {
        _id: {
            name: String[],
            userId: string
        },
        totalSales: number
    }

    const props = defineProps<{
        data: UserInfo[]
    }>()

    const dataUsers = ref()

    onMounted(() => {
        dataUsers.value = props.data.map(item => {
            return {
                name: item._id.name[0] + " " + item._id.name[1],
                total: item.totalSales
            }
        })
    })
</script>

<template>
    <div class="card bg-white p-3 border-round shadow-1">
        <h5 class="text-700 font-semibold mb-3">Vendedores y/o usuarios con más ventas realizadas</h5>
        <DataTable :value="dataUsers" class="p-datatable-sm" tableStyle="min-width: 20rem">
            <Column header="Nombre completo">
                <template #body="prop">
                    {{ prop.data.name }}
                </template>
            </Column>
            <Column header="Ventas realizadas">
                <template #body="prop">
                    {{ prop.data.total }}
                </template>
            </Column>
        </DataTable>
    </div>
</template>