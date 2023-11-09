<script setup lang="ts">
    import { ref } from 'vue'
    import type { Credenciales } from '../../interfaces/index'
    import useUser from '../../composables/user'

    const composable = useUser()
    const loading = ref<boolean>(false)

    const handleSubmit = async (formData : Credenciales) => {
        loading.value = true
        await composable.login(formData)
        loading.value = false
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
                :onInput="() => {}"
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
                        :onInput="() => {}"
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
                        :onInput="() => {}"
                    />
                </div>
                </div>
                <!-- <FormKit
                    type="submit"
                    label="Iniciar sesión"
                    :loading="loading"
                    :onInput="() => {}"
                /> -->
                <Button
                    class="w-full"
                    type="submit"
                    label="Iniciar sesión"
                    :loading="loading"
                />
            </FormKit>
    </div>
</template>

<style scoped>
</style>