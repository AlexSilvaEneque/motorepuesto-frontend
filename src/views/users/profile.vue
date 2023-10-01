<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import IBreadcrumb from '@/components/UI/IBreadcrumb.vue'
    import { type IRUser } from '../../interfaces/index'
    import useUser from '../../composables/user'

    const current = ref({
        label: 'Mi Perfil',
        icon: 'pi pi-fw pi-user'
    })

    const userComp = useUser()

    const userEdit = ref()

    const handleSubmit = async (dataForm : IRUser) => {
        await userComp.update(<string>userEdit.value._id, { role: userEdit.value.role._id, ... dataForm}, true)
    }

    onMounted(async() => {
        const idl = localStorage.getItem('id')
        userEdit.value = await userComp.getById(<string>idl)
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

            <FormKit
                type="form"
                :actions="false"
                incomplete-message="Revisa las notificaciones"
                @submit="handleSubmit"
                :onInput="() => {}"
            >
                <template v-if="userEdit">
                    <div class="formgrid grid">
                        <div class="field col-12 md:col-6 lg:col-4">
                            <FormKit
                                type="text"
                                label="Nombres"
                                name="first_name"
                                validation="required"
                                :value="userEdit.first_name"
                                :validation-messages="{
                                    required: 'El nombre es obligatorio'
                                }"
                                :onInput="() => {}"
                            />
                        </div>
                        <div class="field col-12 md:col-6 lg:col-4">
                            <FormKit
                                type="text"
                                label="Nombres"
                                name="last_name"
                                validation="required"
                                :value="userEdit.last_name"
                                :validation-messages="{
                                    required: 'El nombre es obligatorio'
                                }"
                                :onInput="() => {}"
                            />
                        </div>
                        <div class="field col-12 md:col-6 lg:col-4">
                            <FormKit
                                type="email"
                                label="Email"
                                name="email"
                                placeholder="Email"
                                :value="userEdit.email"
                                validation="required|email"
                                :validation-messages="{
                                    required: 'El email es obligatorio',
                                    email: 'Email no válido'
                                }"
                                :onInput="() => {}"
                            />
                        </div>
                        <div class="field col-12 md:col-6 lg:col-4">
                            <FormKit
                                type="text"
                                label="Nombre de usuario"
                                name="username"
                                :value="userEdit.username"
                                placeholder="Tu nombre de usuario"
                                :onInput="() => {}"
                            />
                        </div>
                        <div class="field col-12 md:col-6 lg:col-4">
                            <FormKit
                                type="text"
                                label="N° celular"
                                name="phone"
                                :value="userEdit.phone"
                                placeholder="000 000 000"
                                :onInput="() => {}"
                            />
                        </div>
                        <div class="field col-12 md:col-6 lg:col-4">
                            <FormKit
                                type="password"
                                name="password"
                                label="Password"
                                :onInput="() => {}"
                            />
                        </div>
                    </div>
                    <Button
                        label="Guardar cambios"
                        icon="pi pi-save"
                        type="submit"
                    />
                </template>
            </FormKit>
        </div>
    </div>
</template>