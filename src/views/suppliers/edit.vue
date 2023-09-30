<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import { useRoute } from "vue-router";
    import type { ISupplier } from '../../interfaces/index';
    import useSupplier from "@/composables/supplier";
    import IBreadcrumb from '@/components/UI/IBreadcrumb.vue';

    const route = useRoute()
    const composable = useSupplier()

    const supplierEdit = ref<ISupplier>()

    const home = ref({
        label: 'Proveedores',
        icon: 'pi pi-fw pi-truck',
        to: '/proveedores'
    })
    const items = ref([
        {
            label: 'Actualizar proveedores',
            icon: 'pi pi-fw pi-truck'
        }
    ])

    const handleSubmit = async (formData : ISupplier) => {
        const { id } = route.params
        await composable.updateSupplier(<string>id, formData)
    }

    onMounted(async () => {
        const { id } = route.params
        supplierEdit.value = await composable.getById(<string>id)
    })
</script>

<template>
    <div class="w-full custom-2 bg-white border-round shadow-1 px-5 mt-3 pb-3 md:pb-0">
        <div class="md:flex mb-5 justify-content-between pt-2">
            <h1 class="text-2xl md:text-3xl text-800">Actualizar proveedor</h1>
            <IBreadcrumb
                :home="home"
                :items="items"
            />
        </div>
        <div class="pm-4">
            <template v-if="supplierEdit">
                <FormKit
                    id="form-supplier-new"
                    type="form"
                    :actions="false"
                    incomplete-message="Revisa las notificaciones"
                    @submit="handleSubmit"
                >
                    <div class="formgrid grid">
                        <div class="field col-12 md:col-6 lg:col-4">
                            <FormKit
                                type="text"
                                label="Razón Social"
                                name="social_reason"
                                placeholder="Razón social"
                                validation="required"
                                :value="supplierEdit.social_reason"
                                :validation-messages="{
                                    required: 'La razón social es obligatorio'
                                }"
                            />
                        </div>
                        <div class="field col-12 md:col-6 lg:col-4">
                            <FormKit
                                type="text"
                                label="Representante"
                                name="representative"
                                placeholder="Representante"
                                validation="required"
                                :value="supplierEdit.representative"
                                :validation-messages="{
                                    required: 'El representante es obligatorio'
                                }"
                            />
                        </div>
                        <div class="field col-12 md:col-6 lg:col-4">
                            <FormKit
                                type="text"
                                label="Teléfono"
                                name="phono"
                                placeholder="000 000 000"
                                validation="required"
                                :value="supplierEdit.phono"
                                :validation-messages="{
                                    required: 'El teléfono es obligatorio'
                                }"
                            />
                        </div>
                        <div class="field col-12 md:col-6 lg:col-4">
                            <FormKit
                                type="text"
                                label="Dirección"
                                name="address"
                                placeholder="Dirección"
                                :value="supplierEdit.address"
                            />
                        </div>
                        <div class="field col-12 md:col-6 lg:col-4">
                            <FormKit
                                type="text"
                                label="Email"
                                name="email"
                                placeholder="Email"
                                :value="supplierEdit.email"
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
            </template>
        </div>
    </div>
</template>