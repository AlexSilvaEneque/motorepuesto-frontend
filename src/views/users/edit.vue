<script setup lang="ts">
    import { ref, onMounted, type Ref } from "vue"
    import type { IRRol, IRUser } from '../../interfaces/index'
    import useUser from "@/composables/user"
    import useRole from "@/composables/rol"
    import { useRoute } from 'vue-router'
    import IBreadcrumb from "@/components/UI/IBreadcrumb.vue"

    const route = useRoute()

    const userComp = useUser()
    const rolComp = useRole()
    const roles : Ref<IRRol[]> = ref([])
    const userEdit = ref()

    const home = ref({
        label: 'Usuarios',
        icon: 'pi pi-fw pi-user',
        to: '/usuarios'
    })
    const items = ref([
        {
            label: 'Editar usuario',
            icon: 'pi pi-fw pi-user-edit'
        }
    ])

    const handleSubmit = async (formData : IRUser) => {
        const { id } = route.params
        await userComp.update(<string>id, formData)
    }

    onMounted(async() => {
        roles.value = await rolComp.roleSelectList()
        const { id } = route.params
        userEdit.value = await userComp.getById(<string>id)
    })
</script>

<template>
    <div class="w-full custom-2 bg-white border-round shadow-1 px-5 mt-3 pb-3 md:pb-0">
        <div class="md:flex mb-5 justify-content-between pt-2">
            <h1 class="text-2xl md:text-3xl text-800">Editar usuario</h1>
            <IBreadcrumb
                :home="home"
                :items="items"
            />
        </div>
        <div class="pm-4">
            
            <FormKit
                id="form-user-edit"
                type="form"
                :actions="false"
                incomplete-message="Revisa las notificaciones"
                @submit="handleSubmit"
            >
            <template v-if="userEdit">
                <div class="formgrid grid">
                    <div class="field col-12 md:col-6 lg:col-4">
                        <FormKit
                            type="text"
                            label="Nombres"
                            name="first_name"
                            placeholder="Tu nombre"
                            validation="required"
                            :value="userEdit.first_name"
                            :validation-messages="{
                                required: 'El nombre es obligatorio'
                            }"
                        />
                    </div>
                    <div class="field col-12 md:col-6 lg:col-4">
                        <FormKit
                            type="text"
                            label="Apellidos"
                            name="last_name"
                            placeholder="Tu apellido"
                            validation="required"
                            :value="userEdit.last_name"
                            :validation-messages="{
                                required: 'El apellido es obligatorio'
                            }"
                        />
                    </div>
                    <div class="field col-12 md:col-6 lg:col-4">
                        <FormKit
                            type="email"
                            label="Email"
                            name="email"
                            placeholder="Email"
                            validation="required|email"
                            :value="userEdit.email"
                            :validation-messages="{
                                required: 'El email es obligatorio',
                                email: 'Email no válido'
                            }"
                        />
                    </div>
                    <div class="field col-12 md:col-6 lg:col-4">
                        <FormKit
                            type="text"
                            label="Nombre de usuario"
                            name="username"
                            :value="userEdit.username"
                            placeholder="Tu nombre de usuario"
                        />
                    </div>
                    <div class="field col-12 md:col-6 lg:col-4">
                        <FormKit
                            type="text"
                            label="N° celular"
                            name="phone"
                            :value="userEdit.phone"
                            placeholder="000 000 000"
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
                            :value="userEdit.role._id"
                            validation-visibility="dirty"
                            :validation-messages="{
                                required: 'Seleccione un rol'
                            }"
                        />
                    </div>
                    <div class="field col-12 md:col-6 lg:col-4">
                        <FormKit
                            type="password"
                            name="password"
                            label="Password"
                        />
                    </div>
                </div>
                <Button
                    label="Guardar cambios"
                    icon="pi pi-save"
                    type="submit"
                    class="block"
                />  
            </template>
            </FormKit>
        </div>
    </div>
</template>
<style scoped>
.h-custom {
    height: 40px;
}
</style>