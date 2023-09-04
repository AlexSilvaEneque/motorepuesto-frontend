<script setup lang="ts">
    import type { Credenciales } from '../../interfaces/index'
    import useUser from '../../composables/user'

    const composable = useUser()

    const handleSubmit = async (formData : Credenciales) => {
        await composable.login(formData)
    }
</script>

<template>
    <div class="w-11 md:w-8 lg:w-6">
        <h3 class="mb-3 text-2xl text-800">Inicio de sesión</h3>
            <FormKit
                type="form"
                id="formLogin"
                :actions="false"
                incomplete-message="Hay errores al llenar los campos."
                @submit="handleSubmit"
            >
            <div class="formgrid grid">
                <div class="col-12">
                    <FormKit
                        type="text"
                        name="email"
                        label="Email"
                        placeholder="example@gmail.com"
                        validation="required|email"
                        :validationMessages="{
                            required: 'El campo email es obligatorio',
                            email: 'La cadena ingresada no es un email válido'
                        }"
                    />
                </div>
                <div class="col-12">
                    <FormKit
                        type="password"
                        name="password"
                        label="Contraseña"
                        placeholder="**********"
                        validation="required"
                        :validationMessages="{
                            required: 'La contraseña es obligatoria'
                        }"
                    />
                </div>
                </div>
                <FormKit
                    type="submit"
                    label="Iniciar sesión"
                />
            </FormKit>
    </div>
</template>

<style scoped>
</style>