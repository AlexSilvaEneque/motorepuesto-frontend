<script setup lang="ts">
    import ChatButton from '@/components/UI/ChatButton.vue'
</script>

<template>
    <div class="w-full h-screen border-2 border-blue relative">
        <div class="flex justify-content-between px-8 mt-5">
            <div>
                Donny Logo
            </div>
            <div>
                <Button
                    label="Ingresar"
                    size="small"
                    icon="pi pi-arrow-right"
                    @click="$router.push('/login')"
                />
            </div>
        </div>
        <div class="flex flex-column align-items-center mt-8">
            <h1 class="my-4 text-800">Somos Motorepuesto Donny</h1>
            <h3 class="text-600">Una empresa de venta de repuestos y servicio de mantenimiento para vehículos.</h3>
        </div>
        <div class="flex flex-column align-items-center mt-2">
            <h2 class="my-4">Servicios que ofrecemos</h2>
        </div>
        <div class="flex gap-2 w-max mx-auto flex-wrap">
            <div class="border-round p-3 border-600 shadow-2 text-700 text-center">
                <span>Venta de repuestos</span>
                <i class="pi pi-cart-plus block mt-2 text-lg"></i>
            </div>
            <div class="border-round p-3 border-600 shadow-2 text-700 text-center">
                <span>Afinamiento de motor</span>
                <i class="pi pi-wrench block mt-2 text-lg"></i>
            </div>
            <div class="border-round p-3 border-600 shadow-2 text-700 text-center">
                <span>Cambio de aceite</span>
                <i class="pi pi-cog block mt-2 text-lg"></i>
            </div>
            <div class="border-round p-3 border-600 shadow-2 text-700 text-center">
                <span>Mantenimieto general</span>
                <i class="pi pi-car block mt-2 text-lg"></i>
            </div>
        </div>
        <ChatButton />
    </div>
</template>

<style>
*, html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>