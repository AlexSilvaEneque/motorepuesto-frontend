<script setup lang="ts">
    import { ref } from "vue"
    import IBreadcrumb from '@/components/UI/IBreadcrumb.vue'
    import type { IRRol } from '../../interfaces/index'
    import useRole from '../../composables/rol';

    const rolComposable = useRole()

    const home = ref({
        label: 'Roles',
        icon: 'pi pi-fw pi-briefcase',
        to: '/roles'
    })
    const items = ref([
        {
            label: 'Registro roles',
            icon: 'pi pi-fw pi-plus'
        }
    ])

    const handleSubmit = async (formData : IRRol) => {
        await rolComposable.register(formData)
    }

</script>

<template>
    <div class="w-full custom-2 bg-white border-round shadow-1 px-5 mt-3 pb-3 md:pb-0">
        <div class="md:flex mb-5 justify-content-between pt-2">
            <h1 class="text-2xl md:text-3xl text-800">Registro de roles</h1>
            <IBreadcrumb
                :home="home"
                :items="items"
            />
        </div>
        <div class="pm-4">
            <FormKit
                id="form-rol-new"
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
                            placeholder="Nombre del rol"
                            validation="required"
                            :validation-messages="{
                                required: 'El nombre del rol es obligatorio'
                            }"
                            :onInput="() => {}"
                        />
                    </div>
                </div>
                <Button
                    type="submit"
                    label="Guardar"
                    icon="pi pi-save"
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