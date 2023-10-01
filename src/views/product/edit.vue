<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import { useRoute } from "vue-router";
    import type { IProduct } from "@/interfaces";
    import useProduct from '../../composables/product';
    import IBreadcrumb from "@/components/UI/IBreadcrumb.vue";

    const route = useRoute()
    const composable = useProduct()

    const productEdit = ref<IProduct>()

    const home = ref({
        label: 'Productos',
        icon: 'pi pi-fw pi-qrcode',
        to: '/productos'
    })
    const items = ref([
        {
            label: 'Editar producto',
            icon: 'pi pi-fw pi-pencil'
        }
    ])

    const handleSubmit = async (formData:IProduct) => {
        const { id } = route.params
        await composable.updateProduct(<string>id, formData)
    }

    onMounted(async () => {
        const { id } = route.params
        productEdit.value = await composable.getById(<string>id)
    })
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
            <template v-if="productEdit">
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
                                name="name"
                                placeholder="Nombre"
                                validation="required"
                                :value="productEdit.name"
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
                                :value="productEdit.price.$numberDecimal.toString()"
                                :validation-messages="{
                                    required: 'El precio es obligatorio',
                                    number: 'Debe ingresar un valor válido'
                                }"
                                :onInput="() => {}"
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
                                :value="productEdit.quantity"
                                :validation-messages="{
                                    required: 'La cantidad es obligatoria'
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
            </template>
        </div>
    </div>
</template>