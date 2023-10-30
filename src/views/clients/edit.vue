<script setup lang="ts">
    import { ref, onMounted, type Ref } from "vue"
    import { useRoute } from 'vue-router'
    import IBreadcrumb from "@/components/UI/IBreadcrumb.vue"
    import type { IClient } from "@/interfaces"
    import useClient from '../../composables/client'

    const composable = useClient()
    const route = useRoute()

    const client = ref<IClient>()

    const home = ref({
        label: 'Clientes',
        icon: 'pi pi-fw pi-user',
        to: '/admin/clientes'
    })
    const items = ref([
        {
            label: 'Editar clientes',
            icon: 'pi pi-fw pi-user-edit'
        }
    ])

    const options = ref([
        {
            label: 'Seleccione un tipo',
            value: '',
            attrs: {
                disabled: true
            }
        },
        {
            label: 'Natural',
            value: '1'
        },
        {
            label: 'Jurídico',
            value: '2'
        }
    ])

    const handleSubmit = async (formData : IClient) => {
        const { id } = route.params
        await composable.updateClient(<string>id,formData)
    }

    onMounted(async() => {
        const { id } = route.params
        client.value = await composable.getById(<string>id)
    })
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
            <template v-if="client">
            
                <FormKit
                    id="form-client-new"
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
                                label="Nombres/Razón Social"
                                name="name"
                                placeholder="Nombre"
                                validation="required"
                                :value="client.name"
                                :validation-messages="{
                                    required: 'El nombre y/o razón social es obligatorio'
                                }"
                                :onInput="() => {}"
                            />
                        </div>
                        <div class="field col-12 md:col-6 lg:col-4">
                            <FormKit
                                type="select"
                                label="Tipo cliente"
                                name="type"
                                :options="options"
                                validation="required"
                                validation-visibility="dirty"
                                :value="client.type?.toString()"
                                :validation-messages="{
                                    required: 'Seleccione un tipo de cliente'
                                }"
                                :onInput="() => {}"
                            />
                        </div>
                        <div class="field col-12 md:col-6 lg:col-4">
                            <FormKit
                                type="text"
                                label="Documento (DNI/RUC)"
                                name="doc"
                                placeholder="DNI/RUC"
                                validation="required"
                                :value="client.doc"
                                :validation-messages="{
                                    required: 'El documento es obligatorio'
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
                                :value="client.address"
                                :onInput="() => {}"
                            />
                        </div>
                        <div class="field col-12 md:col-6 lg:col-4">
                            <FormKit
                                type="text"
                                label="N° celular"
                                name="phone"
                                placeholder="000-000-000"
                                :value="client.phone"
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
<style scoped>
.h-custom {
    height: 40px;
}
</style>