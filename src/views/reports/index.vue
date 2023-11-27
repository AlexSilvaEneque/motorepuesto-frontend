<script setup lang="ts">
    import Sales from '@/components/Reports/Sales.vue';
    import Purchase from '@/components/Reports/Purchase.vue';
    import Products from '@/components/Reports/Products.vue';
    import Clients from '@/components/Reports/Clients.vue';
    import Employee from '@/components/Reports/Employee.vue';
    import Services from '@/components/Reports/Services.vue';
</script>

<template>
    <div class="w-full custom-2 bg-white border-round shadow-1 px-1 md:px-5 mt-3">
        <h1 class="text-xl md:text-2xl text-800 pt-2">Reportes</h1>
        <div class="card">
            <TabView>
                <TabPanel header="Operacionales">
                    <TabView>
                        <TabPanel header="Ventas">
                            <Sales />
                        </TabPanel>

                        <TabPanel header="Compras">
                            <Purchase />
                        </TabPanel>
                    </TabView>
                </TabPanel>
                <TabPanel header="Toma de decisiones">
                    <TabView>
                        <!-- <TabPanel header="Productos">
                            <Products />
                        </TabPanel>
                        <TabPanel header="Servicios">
                            <Services />
                        </TabPanel> -->
                        <TabPanel header="Clientes">
                            <Clients />
                        </TabPanel>
                        <TabPanel header="Empleados">
                            <Employee />
                        </TabPanel>
                    </TabView>
                </TabPanel>
            </TabView>
        </div>
    </div>
</template>