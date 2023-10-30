<script setup lang="ts">
    import { ref } from "vue"
    import type { ISupplier } from '../../interfaces/index';
    import useSupplier from "@/composables/supplier";
    import IBreadcrumb from '@/components/UI/IBreadcrumb.vue';

    const composable = useSupplier()

    const home = ref({
        label: 'Proveedores',
        icon: 'pi pi-fw pi-truck',
        to: '/admin/proveedores'
    })
    const items = ref([
        {
            label: 'Registro proveedores',
            icon: 'pi pi-fw pi-truck'
        }
    ])

    const options = ref([
        {
            name: 'Administrador',
            code: '1'
        },
        {
            name: 'Usuario',
            code: '2'
        }
    ])

    const handleSubmit = async (formData : ISupplier) => {
        await composable.registerSupplier(formData)
    }
</script>

<template>
    <div class="w-full custom-2 bg-white border-round shadow-1 px-5 mt-3 pb-3 md:pb-0">
        <div class="md:flex mb-5 justify-content-between pt-2">
            <h1 class="text-2xl md:text-3xl text-800">Registro de proveedores</h1>
            <IBreadcrumb
                :home="home"
                :items="items"
            />
        </div>
        <div class="pm-4">

            <FormKit
                id="form-supplier-new"
                type="form"
                :actions="false"
                incomplete-message="Revisa las notificaciones"
                @submit="handleSubmit"
                :onInput="() => {}"
            >
                <div class="formgrid grid">
                    <div class="field col-12 md:col-6 lg:col-4">
                        <FormKit
                            type="text"
                            label="Razón Social"
                            name="social_reason"
                            placeholder="Razón social"
                            validation="required"
                            :validation-messages="{
                                required: 'La razón social es obligatorio'
                            }"
                            :onInput="() => {}"
                        />
                    </div>
                    <div class="field col-12 md:col-6 lg:col-4">
                        <FormKit
                            type="text"
                            label="Representante"
                            name="representative"
                            placeholder="Representante"
                            validation="required"
                            :validation-messages="{
                                required: 'El representante es obligatorio'
                            }"
                            :onInput="() => {}"
                        />
                    </div>
                    <div class="field col-12 md:col-6 lg:col-4">
                        <FormKit
                            type="text"
                            label="Teléfono"
                            name="phono"
                            placeholder="000 000 000"
                            validation="required"
                            :validation-messages="{
                                required: 'El teléfono es obligatorio'
                            }"
                            :onInput="() => {}"
                        />
                    </div>
                    <div class="field col-12 md:col-6 lg:col-4">
                        <FormKit
                            type="text"
                            label="Dirección"
                            name="address"
                            placeholder="Dirección"
                            :onInput="() => {}"
                        />
                    </div>
                    <div class="field col-12 md:col-6 lg:col-4">
                        <FormKit
                            type="text"
                            label="Email"
                            name="email"
                            placeholder="Email"
                            :onInput="() => {}"
                        />
                    </div>
                </div>
                <Button
                    label="Guardar"
                    icon="pi pi-save"
                    type="submit"
                    class="block"
                />
            </FormKit>
        </div>
    </div>
</template>
<style scoped>
.h-custom {
    height: 40px;
}
</style>