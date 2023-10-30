<script setup lang="ts">
    import { ref, computed, onMounted, onUnmounted } from 'vue';

    const show = ref<boolean>(false)
    const showResponse = ref<boolean>(false)

    const message = ref<string>('')
    const options = ref(['Horarios de atención', '¿Dónde nos encontramos?', '¿Qué servicios ofrecemos?', '¿Cómo contactarnos?'])

    const sendMessge = (param: string) => {
      showResponse.value = true
      message.value = param
    }

    const hiddenChat = () => {
      show.value = false
      showResponse.value = false
    }

    const displayResponse = computed(() => {
      if (message.value.includes('Horarios de')) {
        return 'Lunes a Sábado de 8 a.m - 12 p.m y de 2 p.m - 7 p.m'
      }
      if (message.value.includes('¿Dónde nos')) {
        return 'Nos encontramos en .... Guadalupe'
      }
      if (message.value.includes('¿Qué servicios')) {
        return 'Venta de repuestos, mantenimiento, cambio de aceite, afinamiento de motor y todo lo relacionado con automotriz'
      }
      if (message.value.includes('¿Cómo')) {
        return 'Nos puedes llamar al siguiente número +51 941 203 050'
      }
      return ''
    })

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hiddenChat()
      }
    }

    onMounted(() => {
      document.addEventListener('keydown', handleEscape)
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', handleEscape)
    })

</script>

<template>
    <div v-if="show"
        class="w-20rem h-auto mb-1 absolute right-0 m-3 position border-round shadow-2 px-3 py-4 z-5 bg-white"
        :class="[show ? 'fadein animation-duration-1000' : 'fadeout animation-duration-1000']"
    >

      <div class="flex justify-content-between align-items-center">
        <h5 class="text-800 text-base flex align-items-center">
          Hola! soy DonnyBot 🤖
          <Tag value="En línea" severity="success" rounded class="ml-2" />
        </h5>
        <i class="pi pi-times cursor-pointer text-600 font-semibold" style="font-size: 1rem" @click="hiddenChat" />
      </div>

      <h4 class="text-xs text-600 mt-1">
        {{ showResponse ? 'Espero que te ayude esto:' : 'Te puedo ayudar con lo siguiente:' }}
      </h4>

      <div class="w-full mt-3 mb-4" v-if="!showResponse">
        <div v-for="(option, index) in options" :key="index"
          class="text-sm mb-2 bg-primary-reverse"
        >
          <div @click="sendMessge(option)" class="cursor-pointer hover:bg-primary w-max border-2 p-2 border-round scalein animation-duration-1000 transition-ease-in">
            {{ option }}
          </div>
        </div>
      </div>

      <div class="w-full mt-3" v-if="showResponse">
        <div class="text-sm mb-2 bg-primary-reverse fadein animation-duration-1000">
          {{ displayResponse }}
        </div>
        <div class="w-full" @click="showResponse = false">
          <Tag value="Regresar" class="cursor-pointer" />
        </div>
      </div>

    </div>
    <div class="absolute bottom-0 right-0 m-3">
        <Button
            rounded
            severity="primary"
            label="DonnyBot 🤖"
            class="rebote"
            @click="show = !show"
        />
    </div>
</template>

<style scoped>
.position {
  bottom: 70px;
}

.rebote {
    animation: bounce 1.5s infinite backwards;
}

@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-5px);
    }
}

</style>