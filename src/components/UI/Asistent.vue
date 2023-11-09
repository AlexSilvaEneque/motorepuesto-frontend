<script setup lang="ts">
    import { ref, inject, watch } from 'vue';
    import type { HelpToggle } from '../../interfaces/index';

    const help = inject('help') as HelpToggle

    const visible = ref<boolean>(false)

    watch(help.helpstate, (current) => {
        if (current) {
            visible.value = true
        }
    })
    
</script>

<template>
    <div class="absolute right-0 bottom-0 mb-4 cursor-pointer border-round-left border-primary border-2 py-2 pl-3 pr-1 bg-primary z-10 shadow-2"
        @click="visible = true"
    >
        <i class="pi pi-megaphone" style="font-size: xx-large;"></i>
    </div>

    <Dialog v-model:visible="visible" modal header="Manual de usuario" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="w-full border-round overflow-hidden">
            <div class="w-full bg-blue-50 px-1">
                <h4>- Módulos Clientes, Proveedores, Productos, Roles, Usuarios</h4>
                <p class="text-sm">
                    Encontramos, las opciones de Registrar, Ver Información, Editar y Eliminar
                </p>
                <h5 class="my-1">Descripción de cada opción</h5>
                <p class="text-sm mb-1">
                    <span class="font-semibold mr-1">Registrar:</span>
                    <span>Dirigirse al botón superior derecho de cada módulo al dar clic aparecerá el formulario correspondiente.</span>
                </p>
                <p class="text-sm mb-1">
                    <span class="font-semibold mr-1">Ver Información:</span>
                    <span>Click en botón (ícono de ojo) en la fila de la tabla y aparece un modal con información.</span>
                </p>
                <p class="text-sm mb-1">
                    <span class="font-semibold mr-1">Editar:</span>
                    <span>Click en botón (ícono de lápiz) en la fila de la tabla, redirige al formulario correspondiente.</span>
                </p>
                <p class="text-sm">
                    <span class="font-semibold mr-1">Eliminar:</span>
                    <span>Click en botón (ícono de tacho) en la fila de la tabla, sale modal de confirmación.</span>
                </p>
            </div>

            <div class="w-full bg-blue-50 px-1 pt-1">
                <h4>- Módulos Compra y Venta</h4>
                <p class="text-sm">
                    Encontramos, las opciones de Registrar, Ver Información y Eliminar
                </p>
                <h5 class="my-1">Descripción de cada opción</h5>
                <p class="text-sm mb-1">
                    <span class="font-semibold mr-1">Registrar:</span>
                    <span>Dirigirse al botón superior derecho de cada módulo al dar clic aparecerá el formulario correspondiente.</span>
                </p>
                <p class="text-sm mb-1">
                    <span class="font-semibold mr-1">Ver Información:</span>
                    <span>Click en botón (ícono de ojo) en la fila de la tabla y aparece un modal con información. <span class="font-semibold">En venta de acuerdo al estado sale un QR o la opción de pagar.</span></span>
                </p>
                <p class="text-sm">
                    <span class="font-semibold mr-1">Eliminar:</span>
                    <span>Click en botón (ícono de tacho) en la fila de la tabla, sale modal de confirmación.</span>
                </p>
            </div>

            <div class="w-full bg-blue-50 px-1 pt-1">
                <h4>- Módulo de Gastos e Ingresos</h4>
                <p class="text-sm">
                    Encontramos un panel con dos ventas <span class="font-semibold">(Registrados y Registrar)</span>
                </p>
                <h5 class="my-1">Descripción de cada opción</h5>
                <p class="text-sm mb-1">
                    <span class="font-semibold mr-1">Registrados:</span>
                    <span>Se mostrarán los registros de los balances guardados.</span>
                </p>
                <p class="text-sm">
                    <span class="font-semibold mr-1">Registrar:</span>
                    <span>Se muestra un formulario con un campo de rango de fechas para filtrar, al dar clic en el botón de filtro se calcula el número de ventas y compras y su monto, por último la utilidad generada en las fechas indicadas.</span>
                </p>
            </div>

            <div class="w-full bg-blue-50 px-1 pt-1">
                <h4>- Módulo de Perfil</h4>
                <p class="text-sm">
                    Se muestra un formulario con datos de la persona con sesión actual, se puede modificar la información.
                </p>
            </div>
        </div>
    </Dialog>
</template>