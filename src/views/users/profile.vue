<script setup lang="ts">
    import { ref } from "vue"
    import IBreadcrumb from '@/components/UI/IBreadcrumb.vue'

    const current = ref({
        label: 'Mi Perfil',
        icon: 'pi pi-fw pi-user'
    })
</script>

<template>
    <div class="w-full custom-2 bg-white border-round shadow-1 px-5 mt-3 pb-3 md:pb-0">
        <div class="md:flex mb-5 justify-content-between pt-2">
            <h1 class="text-2xl md:text-3xl text-800">Datos personales</h1>
            <IBreadcrumb
                :home="current"
            />
        </div>
        <div class="pm-4">
            <div class="formgrid grid">
                <div class="field col-12 md:col-6 lg:col-4">
                    <label>Nombres</label>
                    <InputText
                        class="text-base text-color p-2 w-full"
                    />
                </div>
                <div class="field col-12 md:col-6 lg:col-4">
                    <label>Apellidos</label>
                    <InputText
                        class="text-base text-color p-2 w-full"
                    />
                </div>
                <div class="field col-12 md:col-6 lg:col-4">
                    <label>Email</label>
                    <InputText
                        class="text-base text-color p-2 w-full"
                    />
                </div>
                <div class="field col-12 md:col-6 lg:col-4">
                    <label>Nombre de usuario</label>
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
                    <label class="block">Nueva contraseña</label>
                    <div class="p-inputgroup flex-1">
                        <Password
                            :feedback="false"
                            toggleMask
                        />
                    </div>
                </div>
            </div>
            <Button
                label="Guardar cambios"
                icon="pi pi-save"
            />
        </div>
    </div>
</template>