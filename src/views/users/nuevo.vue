<script setup lang="ts">
    import { ref } from "vue"
    import IBreadcrumb from "@/components/UI/IBreadcrumb.vue"
    import type { IRUser } from '../../interfaces/index'
    import useUser from "@/composables/user"
    import rolAPI from "@/api/rolAPI"
    import { onMounted } from "vue"
    import type { IRRol } from '../../interfaces/index'
    import type { Ref } from "vue"
    import { reset } from "@formkit/vue"

    const composable = useUser()
    const roles : Ref<IRRol[]> = ref([])

    const home = ref({
        label: 'Usuarios',
        icon: 'pi pi-fw pi-user',
        to: '/admin/usuarios'
    })
    const items = ref([
        {
            label: 'Registro usuarios',
            icon: 'pi pi-fw pi-user-plus'
        }
    ])

    const handleSubmit = async (formData : IRUser) => {
        await composable.register(formData)
        reset('form-user-new')
    }

    onMounted(async() => {
        const { data } = await rolAPI.getAll()
        roles.value = data.roles
        roles.value = roles.value.map(role => {
            return { label: role.description, value: role._id }
        })
    })
</script>

<template>
    <div class="w-full custom-2 bg-white border-round shadow-1 px-5 mt-3 pb-3 md:pb-0">
        <div class="md:flex mb-5 justify-content-between pt-2">
            <h1 class="text-2xl md:text-3xl text-800">Registro de usuarios</h1>
            <IBreadcrumb
                :home="home"
                :items="items"
            />
        </div>
        <div class="pm-4">
            
            <FormKit
                id="form-user-new"
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
                            label="Nombres"
                            name="first_name"
                            placeholder="Tu nombre"
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
                            label="Apellidos"
                            name="last_name"
                            placeholder="Tu apellido"
                            validation="required"
                            :validation-messages="{
                                required: 'El apellido es obligatorio'
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
                            placeholder="Tu nombre de usuario"
                            :onInput="() => {}"
                        />
                    </div>
                    <div class="field col-12 md:col-6 lg:col-4">
                        <FormKit
                            type="text"
                            label="N° celular"
                            name="phone"
                            placeholder="000 000 000"
                            :onInput="() => {}"
                        />
                    </div>
                    <div class="field col-12 md:col-6 lg:col-4">
                        <FormKit
                            type="select"
                            label="Rol"
                            placeholder="Seleccione un rol"
                            name="role"
                            :options="(roles as any)"
                            validation="required"
                            validation-visibility="dirty"
                            :validation-messages="{
                                required: 'Seleccione un rol'
                            }"
                            :onInput="() => {}"
                        />
                    </div>
                    <div class="field col-12 md:col-6 lg:col-4">
                        <FormKit
                            type="password"
                            name="password"
                            label="Password"
                            validation="required"
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