<script setup lang="ts">
  import { ref } from 'vue'
  import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div class="surface-50">
    <RouterView />
  </div>
</template>

<style>
html {
  font-family: "Segoe UI";
}
*, html, body {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}
.width-custom {
  width: 100vw;
}
</style>
