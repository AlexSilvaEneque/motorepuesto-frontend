<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import ReloadPrompt from './components/ReloadPrompt.vue';

</script>

<template>
  <div class="surface-50">
    <RouterView />
    <ReloadPrompt />
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
