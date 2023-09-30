<script setup lang="ts">
    import { ref } from "vue";
    import type { IProduct } from "@/interfaces";
    import useProduct from '../../composables/product';
    import IBreadcrumb from "@/components/UI/IBreadcrumb.vue";

    const composable = useProduct()

    const home = ref({
        label: 'Productos',
        icon: 'pi pi-fw pi-qrcode',
        to: '/productos'
    })
    const items = ref([
        {
            label: 'Registro productos',
            icon: 'pi pi-fw pi-plus-circle'
        }
    ])

    const handleSubmit = async (formData:IProduct) => {
        await composable.register(formData)
    }
</script>

<template>
    <div class="w-full custom-2 bg-white border-round shadow-1 px-5 mt-3 pb-3 md:pb-0">
        <div class="md:flex mb-5 justify-content-between pt-2">
            <h1 class="text-2xl md:text-3xl text-800">Registro de productos</h1>
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
            >
                <div class="formgrid grid">
                    <div class="field col-12 md:col-6 lg:col-4">
                        <FormKit
                            type="text"
                            label="Nombre"
                            name="name"
                            placeholder="Nombre"
                            validation="required"
                            :validation-messages="{
                                required: 'El nombre es obligatorio'
                            }"
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
                        />
                    </div>
                    <div class="field col-12 md:col-6 lg:col-4">
                        <FormKit
                            type="number"
                            label="Cantidad"
                            name="quantity"
                            number="integer"
                            placeholder="0"
                            validation="required"
                            :validation-messages="{
                                required: 'La cantidad es obligatoria'
                            }"
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