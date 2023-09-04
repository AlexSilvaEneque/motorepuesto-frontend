<script setup lang="ts">
    import { ref } from "vue"
    import IBreadcrumb from "@/components/UI/IBreadcrumb.vue"

    const home = ref({
        label: 'Clientes',
        icon: 'pi pi-fw pi-user',
        to: '/clientes'
    })
    const items = ref([
        {
            label: 'Registro clientes',
            icon: 'pi pi-fw pi-user-plus'
        }
    ])

    const options = ref([
        {
            name: 'Natural',
            code: '1'
        },
        {
            name: 'Jurídico',
            code: '2'
        }
    ])
</script>

<template>
    <div class="w-full custom-2 bg-white border-round shadow-1 px-5 mt-3 pb-3 md:pb-0">
        <div class="md:flex mb-5 justify-content-between pt-2">
            <h1 class="text-2xl md:text-3xl text-800">Registro de clientes</h1>
            <IBreadcrumb
                :home="home"
                :items="items"
            />
        </div>
        <div class="pm-4">
            <div class="formgrid grid">
                <div class="field col-12 md:col-6 lg:col-4">
                    <label>Nombres/Razón Social</label>
                    <InputText
                        class="text-base text-color p-2 w-full"
                    />
                </div>
                <div class="field col-12 md:col-6 lg:col-4">
                    <label>Tipo cliente</label>
                    <Dropdown
                        class="text-base text-color p-2 w-full h-custom"
                        :options="options"
                        optionLabel="name"
                    />
                </div>
                <div class="field col-12 md:col-6 lg:col-4">
                    <label>Documento (DNI/RUC)</label>
                    <InputText
                        class="text-base text-color p-2 w-full"
                    />
                </div>
                <div class="field col-12 md:col-6 lg:col-4">
                    <label>Dirección</label>
                    <InputText
                        class="text-base text-color p-2 w-full"
                    />
                </div>
                <div class="field col-12 md:col-6 lg:col-4">
                    <label>N° celular</label>
                    <InputMask
                        mask="999-999-999"
                        class="text-base text-color p-2 w-full"
                    />
                </div>
                <div class="field col-12 md:col-6 lg:col-4">
                    <label>Email</label>
                    <InputText
                        class="text-base text-color p-2 w-full"
                    />
                </div>
            </div>
            <Button
                label="Guardar"
                icon="pi pi-save"
            />
        </div>
    </div>
</template>
<style scoped>
.h-custom {
    height: 40px;
}
</style>