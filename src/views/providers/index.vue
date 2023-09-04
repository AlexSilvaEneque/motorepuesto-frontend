<script setup lang="ts">
    import { ref, computed } from "vue"
    import { useRouter } from "vue-router"
    import IBreadcrumb from '@/components/UI/IBreadcrumb.vue'

    const router = useRouter()

    const searchInput = ref('')

    const current = ref({
        label: 'Proveedores',
        icon: 'pi pi-fw pi-truck'
    })

    const clients = ref([
        {
            id: 1,
            name: 'Alex Silva',
            status: 1
        },
        {
            id: 2,
            name: 'Víctor Silva',
            status: 1
        },
        {
            id: 3,
            name: 'Ofelia Eneque',
            status: 1
        },
        {
            id: 4,
            name: 'Milo',
            status: 1
        },
    ])

    const filteredClients = computed(() => {
    if (searchInput.value) {
        return clients.value.filter(client => client.name.includes(searchInput.value))
    } else {
        return clients.value
    }
    })

    const goToView = () => {
        router.push({ name: 'new-providers' })
    }
</script>

<template>
    <div class="w-full card custom-2 bg-white border-round shadow-1 px-1 md:px-5 mt-3">
        <div class="md:flex mb-3 md:justify-content-between pt-2">
            <h1 class="text-2xl md:text-3xl text-800">Lista de proveedores</h1>
            <IBreadcrumb
                :home="current"
            />
        </div>
        <div class="w-full">
            <div class="md:flex justify-content-end mb-3">
                <Button
                    label="Registrar proveedor"
                    class="bg-primary no-underline text-sm md:text-md lg:text-base md:font-medium"
                    icon="pi pi-user-plus"
                    @click="goToView"
                />
            </div>

            <DataTable
                paginator
                :rows="5"
                :rowsPerPageOptions="[5,10,20]"
                :value="filteredClients"
                :global-filter-fields="['name']"
                class="p-datatable-sm width-table sm:w-auto"
                scrollable
            >
                <template #header>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="searchInput" placeholder="Buscar" />
                    </span>    
                </template>

                <template #empty>No hay data</template>

                <Column field="id" header="ID" sortable />
                <Column field="name" header="Nombre" sortable />
                <Column field="status" header="Estado" sortable />
                <Column header="Opciones">
                    <template #body>
                        <div class="flex gap-1">
                            <Button
                                icon="pi pi-eye"
                                severity="info"
                                size="small"
                                outlined
                            />
                            <Button
                                icon="pi pi-pencil"
                                severity="success"
                                size="small"
                                outlined
                            />
                            <Button
                                icon="pi pi-trash"
                                severity="danger"
                                size="small"
                                outlined
                            />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>