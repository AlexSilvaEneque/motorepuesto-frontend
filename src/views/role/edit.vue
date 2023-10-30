<script setup lang="ts">
    import { ref, onMounted, inject } from 'vue';
    import IBreadcrumb from '@/components/UI/IBreadcrumb.vue'
    import { useRouter, useRoute } from 'vue-router'
    import rolAPI from "@/api/rolAPI"

    const router = useRouter()
    const route = useRoute()
    const toast : any = inject('toast')
    const rol = ref()

    const home = ref({
        label: 'Roles',
        icon: 'pi pi-fw pi-briefcase',
        to: '/admin/roles'
    })
    const items = ref([
        {
            label: 'Registro roles',
            icon: 'pi pi-fw pi-pencil'
        }
    ])

    const handleSubmit = async (formData : any) => {
        const { id } = route.params
        try {
            const { data } = await rolAPI.update(id as string, { ...formData })
            toast.open({
                message: data.msg,
                type: 'success'
            })
            setTimeout(() => {
                router.push({ name: 'index-roles' })
            }, 2500)
        } catch (error:any) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
        
    }

    onMounted(async () => {
        const { id } = route.params
        const { data } = await rolAPI.getById(id as string)
        rol.value = data.description
    })

</script>

<template>
    <div class="w-full custom-2 bg-white border-round shadow-1 px-5 mt-3 pb-3 md:pb-0">
        <div class="md:flex mb-5 justify-content-between pt-2">
            <h1 class="text-2xl md:text-3xl text-800">Editar roles</h1>
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
                        <template v-if="rol">
                            <FormKit
                                type="text"
                                label="Nombre"
                                name="description"
                                :value="rol"
                                placeholder="Nombre del rol"
                                validation="required"
                                :validation-messages="{
                                    required: 'El nombre del rol es obligatorio'
                                }"
                                :onInput="() => {}"
                            />
                        </template>
                    </div>
                </div>
                <Button
                    type="submit"
                    label="Guardar cambios"
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