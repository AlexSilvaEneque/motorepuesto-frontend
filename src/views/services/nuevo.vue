<script setup lang="ts">
    import { ref } from "vue";
    import type { IService } from "@/interfaces";
    import useService from '../../composables/service';
    import IBreadcrumb from "@/components/UI/IBreadcrumb.vue";

    const composable = useService()

    const home = ref({
        label: 'Servicios',
        icon: 'pi pi-fw pi-wrench',
        to: '/servicios'
    })
    const items = ref([
        {
            label: 'Registro servicio',
            icon: 'pi pi-fw pi-plus-circle'
        }
    ])

    const handleSubmit = async (formData:IService) => {
        await composable.register(formData)
    }
</script>

<template>
    <div class="w-full custom-2 bg-white border-round shadow-1 px-5 mt-3 pb-3 md:pb-0">
        <div class="md:flex mb-5 justify-content-between pt-2">
            <h1 class="text-2xl md:text-3xl text-800">Registro de servicios</h1>
            <IBreadcrumb
                :home="home"
                :items="items"
            />
        </div>
        <div class="pm-4">

            <FormKit
                id="form-product-new"
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
                            label="Nombre"
                            name="description"
                            placeholder="Nombre"
                            validation="required"
                            :validation-messages="{
                                required: 'El nombre es obligatorio'
                            }"
                            :onInput="() => {}"
                        />
                    </div>
                    <div class="field col-12 md:col-6 lg:col-4">
                        <FormKit
                            type="text"
                            label="Precio"
                            name="price"
                            placeholder="00.00"
                            validation="required | number"
                            validation-visibility="dirty"
                            :validation-messages="{
                                required: 'El precio es obligatorio',
                                number: 'Debe ingresar un valor válido'
                            }"
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